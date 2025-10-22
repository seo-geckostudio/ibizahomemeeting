// Base de datos de precios para construcción en Ibiza
// Precios en €/m² (actualizados para mercado ibicenco con sobrecosto insular)

const basePrices = {
    'obra-nueva': {
        'basica': 1400,
        'media': 1800,
        'alta': 2400,
        'lujo': 3500
    },
    'reforma-integral': {
        'basica': 900,
        'media': 1200,
        'alta': 1600,
        'lujo': 2400
    },
    'reforma-parcial': {
        'basica': 600,
        'media': 800,
        'alta': 1100,
        'lujo': 1600
    },
    'ampliacion': {
        'basica': 1200,
        'media': 1500,
        'alta': 2000,
        'lujo': 3000
    },
    'rehabilitacion': {
        'basica': 1000,
        'media': 1300,
        'alta': 1800,
        'lujo': 2600
    },
    'piscina': {
        // Para piscinas, precio fijo base + extras
        'basica': 25000,
        'media': 40000,
        'alta': 65000,
        'lujo': 100000
    },
    'jardin': {
        // Para jardines, €/m²
        'basica': 80,
        'media': 150,
        'alta': 250,
        'lujo': 400
    }
};

// Multiplicadores por zona (logística y demanda)
const locationMultipliers = {
    'ibiza-ciudad': 1.15,
    'santa-eulalia': 1.12,
    'san-antonio': 1.08,
    'san-jose': 1.20, // Zona premium
    'norte': 1.18, // Acceso más complicado
    'interior': 1.05
};

// Multiplicadores por tipo de inmueble
const propertyMultipliers = {
    'villa': 1.15,
    'apartamento': 1.0,
    'local': 0.95,
    'oficina': 0.90,
    'terreno': 1.10
};

// Costes extras por características
const featureCosts = {
    'piscina': {
        'basica': 30000,
        'media': 50000,
        'alta': 80000,
        'lujo': 120000
    },
    'jardin': {
        // Coste por m² adicional
        'basica': 100,
        'media': 180,
        'alta': 300,
        'lujo': 500
    },
    'domotica': {
        'basica': 8000,
        'media': 15000,
        'alta': 25000,
        'lujo': 50000
    },
    'solar': {
        'basica': 12000,
        'media': 18000,
        'alta': 25000,
        'lujo': 40000
    },
    'climatizacion': {
        'basica': 8000,
        'media': 15000,
        'alta': 25000,
        'lujo': 40000
    },
    'cocina-lujo': {
        'basica': 15000,
        'media': 25000,
        'alta': 45000,
        'lujo': 80000
    },
    'banos-extra': {
        'basica': 8000,
        'media': 12000,
        'alta': 18000,
        'lujo': 30000
    },
    'garaje': {
        'basica': 15000,
        'media': 25000,
        'alta': 40000,
        'lujo': 60000
    }
};

// Multiplicador por estado actual (solo para reformas)
const currentStateMultipliers = {
    'bueno': 0.9,
    'regular': 1.0,
    'malo': 1.25
};

// Duración estimada en meses
const projectDurations = {
    'obra-nueva': {
        base: 12,
        perSqm: 0.01 // meses adicionales por m²
    },
    'reforma-integral': {
        base: 6,
        perSqm: 0.008
    },
    'reforma-parcial': {
        base: 3,
        perSqm: 0.005
    },
    'ampliacion': {
        base: 8,
        perSqm: 0.012
    },
    'rehabilitacion': {
        base: 9,
        perSqm: 0.01
    },
    'piscina': {
        base: 2,
        perSqm: 0
    },
    'jardin': {
        base: 1,
        perSqm: 0.002
    }
};

// Desglose por categorías (porcentajes del total)
const categoryBreakdown = {
    'obra-nueva': {
        'estructura': { percentage: 25, description: 'Cimentación, estructura, muros' },
        'albanileria': { percentage: 18, description: 'Tabiquería, revestimientos, solados' },
        'instalaciones': { percentage: 22, description: 'Fontanería, electricidad, climatización' },
        'carpinteria': { percentage: 12, description: 'Puertas, ventanas, armarios' },
        'acabados': { percentage: 15, description: 'Pintura, pavimentos, sanitarios' },
        'otros': { percentage: 8, description: 'Permisos, gestión, imprevistos' }
    },
    'reforma-integral': {
        'demolicion': { percentage: 10, description: 'Demolición y retirada de escombros' },
        'albanileria': { percentage: 25, description: 'Tabiquería, revestimientos' },
        'instalaciones': { percentage: 30, description: 'Renovación completa instalaciones' },
        'carpinteria': { percentage: 15, description: 'Carpintería interior y exterior' },
        'acabados': { percentage: 15, description: 'Pavimentos, pintura, sanitarios' },
        'otros': { percentage: 5, description: 'Gestión y permisos' }
    },
    'reforma-parcial': {
        'trabajos-obra': { percentage: 35, description: 'Obras de albañilería necesarias' },
        'instalaciones': { percentage: 25, description: 'Actualizaciones puntuales' },
        'acabados': { percentage: 30, description: 'Pinturas, pavimentos, detalles' },
        'otros': { percentage: 10, description: 'Gestión e imprevistos' }
    },
    'ampliacion': {
        'estructura': { percentage: 30, description: 'Nueva estructura y cimentación' },
        'cerramientos': { percentage: 20, description: 'Muros, cubiertas' },
        'instalaciones': { percentage: 20, description: 'Extensión de instalaciones' },
        'acabados': { percentage: 25, description: 'Acabados del espacio nuevo' },
        'otros': { percentage: 5, description: 'Permisos y coordinación' }
    },
    'rehabilitacion': {
        'consolidacion': { percentage: 30, description: 'Consolidación estructural' },
        'restauracion': { percentage: 25, description: 'Restauración de elementos' },
        'instalaciones': { percentage: 20, description: 'Instalaciones actualizadas' },
        'acabados': { percentage: 20, description: 'Acabados respetando estilo' },
        'otros': { percentage: 5, description: 'Permisos especiales' }
    },
    'piscina': {
        'excavacion': { percentage: 15, description: 'Excavación y movimiento tierras' },
        'estructura': { percentage: 35, description: 'Vaso, impermeabilización' },
        'instalaciones': { percentage: 25, description: 'Depuración, iluminación' },
        'acabados': { percentage: 20, description: 'Revestimiento, entorno' },
        'otros': { percentage: 5, description: 'Legalización' }
    },
    'jardin': {
        'preparacion': { percentage: 20, description: 'Preparación terreno, drenaje' },
        'plantacion': { percentage: 30, description: 'Plantas y árboles' },
        'riego': { percentage: 20, description: 'Sistema de riego automático' },
        'elementos': { percentage: 25, description: 'Caminos, iluminación, mobiliario' },
        'otros': { percentage: 5, description: 'Mantenimiento inicial' }
    }
};

// Fases del proyecto
const projectPhases = {
    'obra-nueva': [
        { name: 'Proyecto y permisos', percentage: 10 },
        { name: 'Cimentación y estructura', percentage: 25 },
        { name: 'Cerramientos y cubiertas', percentage: 20 },
        { name: 'Instalaciones', percentage: 20 },
        { name: 'Acabados', percentage: 20 },
        { name: 'Recepción y entrega', percentage: 5 }
    ],
    'reforma-integral': [
        { name: 'Proyecto y permisos', percentage: 8 },
        { name: 'Demolición', percentage: 12 },
        { name: 'Obra gruesa', percentage: 30 },
        { name: 'Instalaciones', percentage: 25 },
        { name: 'Acabados', percentage: 20 },
        { name: 'Limpieza y entrega', percentage: 5 }
    ],
    'reforma-parcial': [
        { name: 'Planificación', percentage: 10 },
        { name: 'Trabajos de obra', percentage: 40 },
        { name: 'Instalaciones', percentage: 25 },
        { name: 'Acabados', percentage: 25 }
    ],
    'ampliacion': [
        { name: 'Proyecto y licencias', percentage: 12 },
        { name: 'Cimentación y estructura', percentage: 30 },
        { name: 'Cerramientos', percentage: 20 },
        { name: 'Instalaciones', percentage: 18 },
        { name: 'Acabados', percentage: 15 },
        { name: 'Integración con existente', percentage: 5 }
    ],
    'rehabilitacion': [
        { name: 'Estudio y proyecto', percentage: 15 },
        { name: 'Consolidación estructural', percentage: 30 },
        { name: 'Restauración elementos', percentage: 25 },
        { name: 'Instalaciones', percentage: 15 },
        { name: 'Acabados', percentage: 15 }
    ],
    'piscina': [
        { name: 'Proyecto y permisos', percentage: 10 },
        { name: 'Excavación', percentage: 15 },
        { name: 'Construcción vaso', percentage: 40 },
        { name: 'Instalaciones', percentage: 20 },
        { name: 'Acabados y puesta en marcha', percentage: 15 }
    ],
    'jardin': [
        { name: 'Diseño paisajístico', percentage: 15 },
        { name: 'Preparación terreno', percentage: 25 },
        { name: 'Instalación riego', percentage: 20 },
        { name: 'Plantación', percentage: 30 },
        { name: 'Elementos decorativos', percentage: 10 }
    ]
};
