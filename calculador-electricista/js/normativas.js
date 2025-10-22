// Base de conocimiento normativa REBT (Reglamento Electrotécnico de Baja Tensión)

const REBT = {
    // ITC-BT-25: Instalaciones interiores en viviendas
    circuitosMinimosVivienda: {
        'C1': { nombre: 'Iluminación', seccion: 1.5, proteccion: 10, descripcion: 'Puntos de luz' },
        'C2': { nombre: 'Tomas generales', seccion: 2.5, proteccion: 16, descripcion: 'Tomas de corriente generales' },
        'C3': { nombre: 'Cocina y horno', seccion: 6, proteccion: 25, descripcion: 'Cocina eléctrica y horno' },
        'C4': { nombre: 'Lavadora, lavavajillas', seccion: 4, proteccion: 20, descripcion: 'Lavadora, lavavajillas y termo' },
        'C5': { nombre: 'Baños y cocina', seccion: 2.5, proteccion: 16, descripcion: 'Tomas baños y cocina' },
        'C10': { nombre: 'Secadora', seccion: 4, proteccion: 20, descripcion: 'Secadora independiente' },
        'C11': { nombre: 'Aire acondicionado', seccion: 6, proteccion: 25, descripcion: 'Climatización' },
        'C12': { nombre: 'Vehículo eléctrico', seccion: 10, proteccion: 32, descripcion: 'Cargador VE' }
    },

    // Grados de electrificación
    gradosElectrificacion: {
        'basica': {
            potencia: 5.75,
            descripcion: 'Electrificación básica',
            circuitos: ['C1', 'C2', 'C4', 'C5']
        },
        'elevada': {
            potencia: 9.2,
            descripcion: 'Electrificación elevada',
            circuitos: ['C1', 'C2', 'C3', 'C4', 'C5', 'C10', 'C11']
        }
    },

    // Protección diferencial
    diferenciales: {
        'general': { sensibilidad: 30, tipo: 'A', amperaje: 40 },
        'banos': { sensibilidad: 30, tipo: 'A', amperaje: 25 },
        'adicional': { sensibilidad: 300, tipo: 'A', amperaje: 40 }
    },

    // Secciones mínimas según potencia
    seccionCable: function(potencia, longitud = 15, voltage = 230) {
        // Cálculo simplificado de sección según ITC-BT-19
        const intensidad = (potencia * 1000) / voltage;
        const caidaTension = 3; // 3% máximo según REBT

        if (intensidad <= 10) return 1.5;
        if (intensidad <= 16) return 2.5;
        if (intensidad <= 25) return 4;
        if (intensidad <= 32) return 6;
        if (intensidad <= 40) return 10;
        return 16;
    },

    // Validar instalación
    validar: function(datos) {
        const validaciones = [];
        const warnings = [];

        // Validar potencia mínima
        const potenciaCalculada = this.calcularPotenciaNecesaria(datos);
        if (datos.power < potenciaCalculada) {
            warnings.push({
                tipo: 'warning',
                mensaje: `La potencia contratada (${datos.power} kW) podría ser insuficiente. Se recomienda al menos ${potenciaCalculada} kW`,
                normativa: 'ITC-BT-10'
            });
        }

        // Validar circuitos mínimos
        const circuitosNecesarios = this.determinarCircuitos(datos);
        validaciones.push({
            tipo: 'success',
            mensaje: `Se instalarán ${circuitosNecesarios.length} circuitos según REBT`,
            normativa: 'ITC-BT-25'
        });

        // Validar baños
        if (datos.bathrooms > 0) {
            validaciones.push({
                tipo: 'success',
                mensaje: `Baños con IP44 mínimo y diferencial 30mA tipo A`,
                normativa: 'ITC-BT-27'
            });
        }

        // Validar cargador VE si existe
        if (datos.specials.includes('ve')) {
            validaciones.push({
                tipo: 'success',
                mensaje: 'Circuito independiente para cargador VE (ITC-BT-52)',
                normativa: 'ITC-BT-52'
            });
        }

        return { validaciones, warnings };
    },

    calcularPotenciaNecesaria: function(datos) {
        let potencia = 3; // Base

        // Por superficie
        potencia += Math.ceil(datos.surface / 50) * 1.5;

        // Por especiales
        if (datos.specials.includes('aire')) potencia += 2;
        if (datos.specials.includes('calefaccion')) potencia += 3;
        if (datos.specials.includes('ve')) potencia += 7.4;
        if (datos.kitchen === 'induccion') potencia += 3.6;
        if (datos.kitchen === 'vitro') potencia += 2.5;

        return Math.ceil(potencia);
    },

    determinarCircuitos: function(datos) {
        const circuitos = [];

        // Circuitos básicos obligatorios
        circuitos.push('C1'); // Iluminación
        circuitos.push('C2'); // Tomas generales

        if (datos.bathrooms > 0) {
            circuitos.push('C5'); // Baños
        }

        // Cocina
        if (datos.kitchen !== 'no') {
            circuitos.push('C3'); // Cocina
        }

        // Electrodomésticos
        if (datos.specials.includes('lavadora') || datos.specials.includes('lavavajillas') || datos.specials.includes('termo')) {
            circuitos.push('C4');
        }

        if (datos.specials.includes('secadora')) {
            circuitos.push('C10');
        }

        // Climatización
        if (datos.specials.includes('aire') || datos.specials.includes('calefaccion')) {
            circuitos.push('C11');
        }

        // Vehículo eléctrico
        if (datos.specials.includes('ve')) {
            circuitos.push('C12');
        }

        return circuitos;
    }
};
