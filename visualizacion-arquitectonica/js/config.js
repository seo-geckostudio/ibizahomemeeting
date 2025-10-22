// Configuración de API y modo de funcionamiento

const appConfig = {
    mode: 'demo', // 'demo' o 'production'
    apiProvider: 'demo',
    apiKey: null
};

// Estilos disponibles con sus prompts
const styleDefinitions = {
    'moderno': {
        name: 'Moderno Minimalista',
        prompt: 'modern minimalist interior design, clean lines, neutral colors, open space, contemporary furniture, natural light',
        tags: ['Minimalista', 'Contemporáneo', 'Espacios abiertos'],
        description: 'Diseño minimalista con líneas limpias, paleta de colores neutros y énfasis en la funcionalidad. Espacios abiertos con abundante luz natural.'
    },
    'mediterraneo': {
        name: 'Mediterráneo',
        prompt: 'mediterranean style interior, white and blue colors, natural materials, bright, airy, coastal design',
        tags: ['Costero', 'Luminoso', 'Blanco y azul'],
        description: 'Estilo mediterráneo con predominancia de blanco y azul, materiales naturales como la madera y piedra, diseño luminoso y aireado ideal para Ibiza.'
    },
    'lujo': {
        name: 'Lujo Premium',
        prompt: 'luxury premium interior design, high-end materials, marble, elegant furniture, sophisticated, upscale',
        tags: ['Premium', 'Elegante', 'Materiales nobles'],
        description: 'Diseño de alto standing con materiales premium como mármol, maderas nobles y acabados sofisticados. Mobiliario elegante y detalles exclusivos.'
    },
    'sostenible': {
        name: 'Sostenible Eco',
        prompt: 'sustainable eco-friendly interior design, natural wood, stone, plants, energy efficient, biophilic design',
        tags: ['Ecológico', 'Natural', 'Biofílico'],
        description: 'Diseño sostenible con materiales ecológicos, abundante madera y piedra natural, integración de plantas y soluciones energéticamente eficientes.'
    },
    'industrial': {
        name: 'Industrial',
        prompt: 'industrial loft interior design, exposed brick, concrete, metal, open space, modern industrial style',
        tags: ['Loft', 'Urbano', 'Materiales industriales'],
        description: 'Estilo industrial tipo loft con hormigón visto, estructura metálica expuesta, espacios abiertos y estética urbana contemporánea.'
    },
    'rustico': {
        name: 'Rústico Ibicenco',
        prompt: 'rustic ibiza style interior, traditional balearic design, white walls, wooden beams, stone, mediterranean rustic',
        tags: ['Tradicional', 'Ibicenco', 'Auténtico'],
        description: 'Estilo rústico tradicional de Ibiza con paredes blancas encaladas, vigas de madera, piedra natural y elementos auténticos de la arquitectura balear.'
    }
};

function saveApiConfig() {
    const provider = document.getElementById('api-provider').value;
    const apiKey = document.getElementById('api-key').value;

    if (provider === 'demo') {
        appConfig.mode = 'demo';
        appConfig.apiProvider = 'demo';
        appConfig.apiKey = null;
        alert('Modo demo activado. Se usarán imágenes de ejemplo.');
    } else {
        if (!apiKey) {
            alert('Por favor, introduce una API key válida');
            return;
        }
        appConfig.mode = 'production';
        appConfig.apiProvider = provider;
        appConfig.apiKey = apiKey;
        alert('Configuración guardada. Se usará la API real.');
    }

    closeApiModal();
}

function openApiModal() {
    document.getElementById('api-modal').classList.add('active');
}

function closeApiModal() {
    document.getElementById('api-modal').classList.remove('active');
}

// Mensaje en consola sobre el modo demo
console.log('%c🏗️ Visualización Arquitectónica - Gecko Studio', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cModo: ' + appConfig.mode.toUpperCase(), 'color: #666; font-size: 14px;');
console.log('%cPara configurar API real: openApiModal()', 'color: #999;');
