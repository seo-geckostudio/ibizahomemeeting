// Motor de cálculos técnicos

function calcularInstalacion(datos) {
    const circuitos = REBT.determinarCircuitos(datos);
    const materials = [];
    let horasTrabajo = 0;

    // Cuadro eléctrico según número de circuitos
    const modulosNecesarios = circuitos.length * 2 + 4; // +4 para diferencial y general
    let cuadro = modulosNecesarios <= 12 ? 'cuadro-superficie-12' :
                 modulosNecesarios <= 24 ? 'cuadro-empotrar-24' : 'cuadro-empotrar-36';
    materials.push({ item: catalogoMateriales.cuadros[cuadro], cantidad: 1, categoria: 'Cuadro eléctrico' });
    horasTrabajo += 4;

    // Protecciones según circuitos
    circuitos.forEach(circuito => {
        const info = REBT.circuitosMinimosVivienda[circuito];
        const mag = `magnetotermico-${datos.voltage === 230 ? '1p' : '2p'}-${info.proteccion}a`;
        if (catalogoMateriales.protecciones[mag]) {
            materials.push({
                item: catalogoMateriales.protecciones[mag],
                cantidad: 1,
                categoria: 'Protecciones',
                descripcion: info.descripcion
            });
        }
    });

    // Diferenciales
    materials.push({ item: catalogoMateriales.protecciones['diferencial-2p-40a-30ma'], cantidad: 1, categoria: 'Protecciones' });
    if (datos.bathrooms > 0) {
        materials.push({ item: catalogoMateriales.protecciones['diferencial-2p-25a-30ma'], cantidad: 1, categoria: 'Protecciones' });
    }
    horasTrabajo += circuitos.length * 0.5;

    // Cables - estimación por puntos
    const metrosLuz = datos.lightingPoints * 12;
    const metrosTomas = datos.socketPoints * 8;

    materials.push({ item: catalogoMateriales.cables['cable-1.5mm-metro'], cantidad: metrosLuz, categoria: 'Cables' });
    materials.push({ item: catalogoMateriales.cables['cable-2.5mm-metro'], cantidad: metrosTomas, categoria: 'Cables' });
    materials.push({ item: catalogoMateriales.cables['tubo-corrugado-metro'], cantidad: metrosLuz + metrosTomas, categoria: 'Cables' });

    if (datos.kitchen !== 'no') {
        materials.push({ item: catalogoMateriales.cables['cable-6mm-metro'], cantidad: 15, categoria: 'Cables' });
    }

    horasTrabajo += (datos.lightingPoints + datos.socketPoints) * 0.15;

    // Mecanismos
    materials.push({ item: catalogoMateriales.mecanismos['interruptor'], cantidad: datos.lightingPoints, categoria: 'Mecanismos' });
    materials.push({ item: catalogoMateriales.mecanismos['base-enchufe'], cantidad: datos.socketPoints, categoria: 'Mecanismos' });
    materials.push({ item: catalogoMateriales.mecanismos['caja-empotrar'], cantidad: datos.lightingPoints + datos.socketPoints, categoria: 'Mecanismos' });
    materials.push({ item: catalogoMateriales.mecanismos['marco-1elemento'], cantidad: datos.lightingPoints + datos.socketPoints, categoria: 'Mecanismos' });

    horasTrabajo += (datos.lightingPoints + datos.socketPoints) * 0.2;

    // Puntos de luz
    materials.push({ item: catalogoMateriales.iluminacion['punto-luz-techo'], cantidad: datos.lightingPoints, categoria: 'Iluminación' });

    // Especiales
    if (datos.specials.includes('ve')) {
        materials.push({ item: catalogoMateriales.especiales['cargador-ve-7kw'], cantidad: 1, categoria: 'Especiales' });
        materials.push({ item: catalogoMateriales.cables['cable-10mm-metro'], cantidad: 25, categoria: 'Cables' });
        materials.push({ item: catalogoMateriales.protecciones['magnetotermico-2p-32a'], cantidad: 1, categoria: 'Protecciones' });
        horasTrabajo += 6;
    }

    if (datos.specials.includes('domotica')) {
        materials.push({ item: catalogoMateriales.especiales['sistema-domotico-basico'], cantidad: 1, categoria: 'Especiales' });
        horasTrabajo += 8;
    }

    // Material auxiliar
    materials.push({ item: catalogoMateriales.material['pequeno-material'], cantidad: 1, categoria: 'Material auxiliar' });
    materials.push({ item: catalogoMateriales.material['canalizaciones'], cantidad: 1, categoria: 'Material auxiliar' });

    // Puesta a tierra
    materials.push({ item: catalogoMateriales.especiales['puesta-tierra'], cantidad: 1, categoria: 'Puesta a tierra' });
    materials.push({ item: catalogoMateriales.especiales['caja-icp'], cantidad: 1, categoria: 'Protecciones' });
    horasTrabajo += 3;

    // Ajustar horas según tipo de proyecto
    if (datos.projectType === 'vivienda-nueva') {
        horasTrabajo *= 1.2;
    } else if (datos.projectType === 'reforma-integral') {
        horasTrabajo *= 1.4; // Más complejo por demoliciones
    }

    return {
        circuitos,
        materials,
        horasTrabajo: Math.ceil(horasTrabajo),
        potenciaRecomendada: REBT.calcularPotenciaNecesaria(datos)
    };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    }).format(amount);
}
