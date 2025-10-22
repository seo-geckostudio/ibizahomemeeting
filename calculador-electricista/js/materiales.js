// Catálogo de materiales eléctricos con precios PVP (aproximados mercado 2024-2025)

const catalogoMateriales = {
    // Cuadros eléctricos
    cuadros: {
        'cuadro-superficie-12': { nombre: 'Cuadro superficie 12 módulos', precio: { basica: 25, media: 40, alta: 65 }, marca: 'Schneider/ABB' },
        'cuadro-empotrar-24': { nombre: 'Cuadro empotrar 24 módulos', precio: { basica: 45, media: 70, alta: 110 }, marca: 'Schneider/ABB' },
        'cuadro-empotrar-36': { nombre: 'Cuadro empotrar 36 módulos', precio: { basica: 65, media: 95, alta: 150 }, marca: 'Schneider/ABB' }
    },

    // Protecciones
    protecciones: {
        'magnetotermico-1p-10a': { nombre: 'Magnetotérmico 1P 10A', precio: { basica: 8, media: 15, alta: 25 }, marca: 'Schneider/ABB' },
        'magnetotermico-1p-16a': { nombre: 'Magnetotérmico 1P 16A', precio: { basica: 8, media: 15, alta: 25 }, marca: 'Schneider/ABB' },
        'magnetotermico-2p-20a': { nombre: 'Magnetotérmico 2P 20A', precio: { basica: 12, media: 22, alta: 35 }, marca: 'Schneider/ABB' },
        'magnetotermico-2p-25a': { nombre: 'Magnetotérmico 2P 25A', precio: { basica: 14, media: 25, alta: 40 }, marca: 'Schneider/ABB' },
        'magnetotermico-2p-32a': { nombre: 'Magnetotérmico 2P 32A', precio: { basica: 16, media: 28, alta: 45 }, marca: 'Schneider/ABB' },
        'diferencial-2p-40a-30ma': { nombre: 'Diferencial 2P 40A 30mA tipo A', precio: { basica: 35, media: 55, alta: 85 }, marca: 'Schneider/ABB' },
        'diferencial-2p-25a-30ma': { nombre: 'Diferencial 2P 25A 30mA tipo A', precio: { basica: 32, media: 50, alta: 75 }, marca: 'Schneider/ABB' },
        'diferencial-4p-40a-300ma': { nombre: 'Diferencial 4P 40A 300mA tipo A', precio: { basica: 85, media: 125, alta: 180 }, marca: 'Schneider/ABB' }
    },

    // Cables
    cables: {
        'cable-1.5mm-metro': { nombre: 'Cable 1,5mm² (metro)', precio: { basica: 0.4, media: 0.6, alta: 0.8 }, marca: 'Prysmian/General Cable' },
        'cable-2.5mm-metro': { nombre: 'Cable 2,5mm² (metro)', precio: { basica: 0.6, media: 0.9, alta: 1.2 }, marca: 'Prysmian/General Cable' },
        'cable-4mm-metro': { nombre: 'Cable 4mm² (metro)', precio: { basica: 1, media: 1.5, alta: 2 }, marca: 'Prysmian/General Cable' },
        'cable-6mm-metro': { nombre: 'Cable 6mm² (metro)', precio: { basica: 1.6, media: 2.2, alta: 3 }, marca: 'Prysmian/General Cable' },
        'cable-10mm-metro': { nombre: 'Cable 10mm² (metro)', precio: { basica: 2.8, media: 3.8, alta: 5 }, marca: 'Prysmian/General Cable' },
        'tubo-corrugado-metro': { nombre: 'Tubo corrugado 20mm (metro)', precio: { basica: 0.3, media: 0.4, alta: 0.5 }, marca: 'General' }
    },

    // Mecanismos
    mecanismos: {
        'interruptor': { nombre: 'Interruptor', precio: { basica: 3, media: 8, alta: 18 }, marca: 'Simon/Legrand/Jung' },
        'conmutador': { nombre: 'Conmutador', precio: { basica: 4, media: 10, alta: 22 }, marca: 'Simon/Legrand/Jung' },
        'pulsador': { nombre: 'Pulsador', precio: { basica: 3.5, media: 9, alta: 20 }, marca: 'Simon/Legrand/Jung' },
        'base-enchufe': { nombre: 'Base enchufe schuko', precio: { basica: 4, media: 10, alta: 25 }, marca: 'Simon/Legrand/Jung' },
        'base-enchufe-ttl': { nombre: 'Base enchufe TTL (baño)', precio: { basica: 8, media: 15, alta: 32 }, marca: 'Simon/Legrand/Jung' },
        'marco-1elemento': { nombre: 'Marco 1 elemento', precio: { basica: 1.5, media: 6, alta: 15 }, marca: 'Simon/Legrand/Jung' },
        'marco-2elementos': { nombre: 'Marco 2 elementos', precio: { basica: 2, media: 8, alta: 20 }, marca: 'Simon/Legrand/Jung' },
        'caja-empotrar': { nombre: 'Caja empotrar universal', precio: { basica: 0.8, media: 1.2, alta: 2 }, marca: 'General' }
    },

    // Iluminación
    iluminacion: {
        'punto-luz-techo': { nombre: 'Punto luz techo (caja+cable)', precio: { basica: 8, media: 12, alta: 20 }, marca: 'Instalación' },
        'downlight-led': { nombre: 'Downlight LED empotrable', precio: { basica: 12, media: 25, alta: 45 }, marca: 'Philips/Osram' },
        'regleta-led': { nombre: 'Regleta LED superficie', precio: { basica: 18, media: 35, alta: 60 }, marca: 'Philips/Osram' }
    },

    // Especiales
    especiales: {
        'caja-icp': { nombre: 'Caja ICP', precio: { basica: 15, media: 25, alta: 40 }, marca: 'Schneider' },
        'puesta-tierra': { nombre: 'Puesta a tierra (pica+cable)', precio: { basica: 45, media: 65, alta: 95 }, marca: 'General' },
        'cargador-ve-7kw': { nombre: 'Cargador VE 7kW', precio: { basica: 650, media: 950, alta: 1400 }, marca: 'Wallbox/Circutor' },
        'sistema-domotico-basico': { nombre: 'Sistema domótico básico', precio: { basica: 450, media: 850, alta: 1500 }, marca: 'KNX/Loxone' }
    },

    // Pequeño material
    material: {
        'pequeno-material': { nombre: 'Pequeño material (regletas, cajas derivación, etc.)', precio: { basica: 50, media: 80, alta: 120 }, marca: 'Varios', porProyecto: true },
        'canalizaciones': { nombre: 'Canalizaciones y fijaciones', precio: { basica: 80, media: 120, alta: 180 }, marca: 'Varios', porProyecto: true }
    }
};

// Multiplicadores por ubicación (sobrecosto insular Ibiza)
const multiplicadorIbiza = 1.15; // +15% transporte y logística

// Función para obtener precio según calidad
function getPrecioMaterial(item, calidad) {
    if (item.porProyecto) {
        return item.precio[calidad];
    }
    return item.precio[calidad] * multiplicadorIbiza;
}
