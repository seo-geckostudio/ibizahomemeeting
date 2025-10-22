// Generador de visualizaciones con IA

// Imágenes de resultado demo (simuladas)
const demoResults = {
    'salon-vacio': {
        'moderno': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%220%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23ffffff;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23f0f0f0;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad)%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23e8e8e8%22 x=%22100%22 y=%22400%22 width=%22600%22 height=%2220%22/%3E%3Crect fill=%22%23333%22 x=%22150%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%2210%22/%3E%3Crect fill=%22%23555%22 x=%22450%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%2210%22/%3E%3Ccircle fill=%22%23ffd700%22 cx=%22400%22 cy=%2280%22 r=%2230%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23999%22%3ESalón Moderno Minimalista%3C/text%3E%3C/svg%3E',
        'mediterraneo': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23ffffff%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%234a90e2%22 x=%22100%22 y=%22400%22 width=%22600%22 height=%2220%22/%3E%3Crect fill=%22%23a0d4f7%22 x=%22150%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%2210%22/%3E%3Crect fill=%22%23ffffff%22 x=%22450%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%2210%22/%3E%3Ccircle fill=%22%23ffd700%22 cx=%22700%22 cy=%2280%22 r=%2240%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%234a90e2%22%3ESalón Mediterráneo%3C/text%3E%3C/svg%3E',
        'lujo': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Cdefs%3E%3ClinearGradient id=%22luxgrad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23d4af37;stop-opacity:0.3%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23f8f8f8;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23luxgrad)%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23d4af37%22 x=%22100%22 y=%22400%22 width=%22600%22 height=%2215%22/%3E%3Crect fill=%22%23654321%22 x=%22150%22 y=%22240%22 width=%22220%22 height=%22160%22 rx=%2215%22/%3E%3Crect fill=%22%23556b2f%22 x=%22430%22 y=%22240%22 width=%22220%22 height=%22160%22 rx=%2215%22/%3E%3Ccircle fill=%22%23ffd700%22 cx=%22400%22 cy=%2270%22 r=%2235%22 opacity=%220.8%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23d4af37%22%3ESalón Premium Luxury%3C/text%3E%3C/svg%3E',
        'sostenible': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23f5f5dc%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%238b7355%22 x=%22100%22 y=%22400%22 width=%22600%22 height=%2230%22/%3E%3Crect fill=%22%23daa520%22 x=%22150%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%228%22/%3E%3Crect fill=%22%23cd853f%22 x=%22450%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%228%22/%3E%3Ccircle fill=%22%2328a745%22 cx=%22250%22 cy=%22150%22 r=%2230%22/%3E%3Ccircle fill=%22%2328a745%22 cx=%22550%22 cy=%22150%22 r=%2225%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23228b22%22%3ESalón Sostenible Eco%3C/text%3E%3C/svg%3E',
        'industrial': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23808080%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23696969%22 x=%22100%22 y=%22400%22 width=%22600%22 height=%2240%22/%3E%3Crect fill=%22%23a9a9a9%22 x=%22150%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%225%22/%3E%3Crect fill=%22%23708090%22 x=%22450%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%225%22/%3E%3Crect fill=%22%23000%22 x=%22100%22 y=%2280%22 width=%22600%22 height=%2210%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23c0c0c0%22%3ESalón Industrial Loft%3C/text%3E%3C/svg%3E',
        'rustico': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23fffaf0%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23d2b48c%22 x=%22100%22 y=%22400%22 width=%22600%22 height=%2235%22/%3E%3Crect fill=%22%23deb887%22 x=%22150%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%2212%22/%3E%3Crect fill=%22%23bc8f8f%22 x=%22450%22 y=%22250%22 width=%22200%22 height=%22150%22 rx=%2212%22/%3E%3Crect fill=%22%238b4513%22 x=%2250%22 y=%2270%22 width=%22700%22 height=%2215%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%238b4513%22%3ESalón Rústico Ibicenco%3C/text%3E%3C/svg%3E'
    },
    'terraza': {
        'moderno': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23e8f4f8%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23333%22 x=%22100%22 y=%22450%22 width=%22600%22 height=%2215%22/%3E%3Crect fill=%22%23555%22 x=%22150%22 y=%22350%22 width=%22150%22 height=%22100%22 rx=%2210%22/%3E%3Crect fill=%22%23555%22 x=%22500%22 y=%22350%22 width=%22150%22 height=%22100%22 rx=%2210%22/%3E%3Ccircle fill=%22%23ffd700%22 cx=%22650%22 cy=%22100%22 r=%2250%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23666%22%3ETerraza Moderna%3C/text%3E%3C/svg%3E',
        'mediterraneo': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23e8f4f8%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%234a90e2%22 x=%22100%22 y=%22450%22 width=%22600%22 height=%2220%22/%3E%3Crect fill=%22%23ffffff%22 x=%22150%22 y=%22350%22 width=%22150%22 height=%22100%22 rx=%2210%22/%3E%3Crect fill=%22%23a0d4f7%22 x=%22500%22 y=%22350%22 width=%22150%22 height=%22100%22 rx=%2210%22/%3E%3Ccircle fill=%22%23ffd700%22 cx=%22650%22 cy=%22100%22 r=%2255%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%234a90e2%22%3ETerraza Mediterránea%3C/text%3E%3C/svg%3E',
        'lujo': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23f0f8ff%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23d4af37%22 x=%22100%22 y=%22450%22 width=%22600%22 height=%2220%22/%3E%3Crect fill=%22%23654321%22 x=%22150%22 y=%22340%22 width=%22160%22 height=%22110%22 rx=%2212%22/%3E%3Crect fill=%22%23556b2f%22 x=%22490%22 y=%22340%22 width=%22160%22 height=%22110%22 rx=%2212%22/%3E%3Ccircle fill=%22%23ffd700%22 cx=%22650%22 cy=%22100%22 r=%2255%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23d4af37%22%3ETerraza Premium%3C/text%3E%3C/svg%3E'
    },
    'cocina': {
        'moderno': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23ffffff%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23333%22 x=%22100%22 y=%22200%22 width=%22250%22 height=%22300%22 rx=%225%22/%3E%3Crect fill=%22%23444%22 x=%22450%22 y=%22200%22 width=%22250%22 height=%22300%22 rx=%225%22/%3E%3Crect fill=%22%23888%22 x=%22360%22 y=%22280%22 width=%2280%22 height=%2280%22 rx=%2210%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23555%22%3ECocina Moderna%3C/text%3E%3C/svg%3E',
        'mediterraneo': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23ffffff%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23a0d4f7%22 x=%22100%22 y=%22200%22 width=%22250%22 height=%22300%22 rx=%2210%22/%3E%3Crect fill=%22%23ffffff%22 x=%22450%22 y=%22200%22 width=%22250%22 height=%22300%22 rx=%2210%22/%3E%3Crect fill=%22%234a90e2%22 x=%22360%22 y=%22280%22 width=%2280%22 height=%2280%22 rx=%2210%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%234a90e2%22%3ECocina Mediterránea%3C/text%3E%3C/svg%3E',
        'lujo': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23f8f8f8%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23654321%22 x=%22100%22 y=%22200%22 width=%22250%22 height=%22300%22 rx=%2210%22/%3E%3Crect fill=%22%23d4af37%22 x=%22450%22 y=%22200%22 width=%22250%22 height=%22300%22 rx=%2210%22/%3E%3Crect fill=%22%23c0c0c0%22 x=%22360%22 y=%22280%22 width=%2280%22 height=%2280%22 rx=%2212%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23d4af37%22%3ECocina Premium%3C/text%3E%3C/svg%3E'
    },
    'plano': {
        'moderno': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22 viewBox=%220 0 800 600%22%3E%3Cdefs%3E%3Cpattern id=%22grid%22 width=%2220%22 height=%2220%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 20 0 L 0 0 0 20%22 fill=%22none%22 stroke=%22%23f0f0f0%22 stroke-width=%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=%22%23fafafa%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22url(%23grid)%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23e8e8e8%22 x=%22150%22 y=%22150%22 width=%22500%22 height=%22350%22 stroke=%22%23333%22 stroke-width=%223%22/%3E%3Crect fill=%22%23d0d0d0%22 x=%22150%22 y=%22150%22 width=%22250%22 height=%22175%22 stroke=%22%23666%22 stroke-width=%222%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23666%22%3ERender 3D Moderno desde Plano%3C/text%3E%3C/svg%3E',
        'mediterraneo': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23e8f4f8%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23ffffff%22 x=%22150%22 y=%22150%22 width=%22500%22 height=%22350%22 stroke=%22%234a90e2%22 stroke-width=%223%22/%3E%3Crect fill=%22%23a0d4f7%22 x=%22150%22 y=%22150%22 width=%22250%22 height=%22175%22 stroke=%22%234a90e2%22 stroke-width=%222%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%234a90e2%22%3ERender Mediterráneo desde Plano%3C/text%3E%3C/svg%3E'
    }
};

async function generateWithAI(imageData, style) {
    const styleConfig = styleDefinitions[style];

    if (appConfig.mode === 'demo') {
        // Modo demo: devolver imagen simulada
        return generateDemoResult(imageData, style);
    } else {
        // Modo producción: llamar a API real
        return generateWithAPI(imageData, style, styleConfig);
    }
}

function generateDemoResult(imageData, style) {
    return new Promise((resolve) => {
        // Simular tiempo de procesamiento (10-15 segundos)
        const processingTime = 10000 + Math.random() * 5000;

        setTimeout(() => {
            const image = getCurrentImage();
            let resultImage = null;

            // Buscar resultado demo correspondiente
            if (demoResults[image.id] && demoResults[image.id][style]) {
                resultImage = demoResults[image.id][style];
            } else {
                // Fallback: generar resultado genérico
                resultImage = generateFallbackResult(style);
            }

            resolve({
                success: true,
                imageUrl: resultImage,
                mode: 'demo'
            });
        }, processingTime);
    });
}

function generateFallbackResult(style) {
    // Generar imagen SVG genérica basada en el estilo
    const colors = {
        'moderno': '#555555',
        'mediterraneo': '#4a90e2',
        'lujo': '#d4af37',
        'sostenible': '#28a745',
        'industrial': '#808080',
        'rustico': '#8b4513'
    };

    const color = colors[style] || '#667eea';
    const styleName = styleDefinitions[style].name;

    return `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22${encodeURIComponent(color)}%22 x=%22100%22 y=%22100%22 width=%22600%22 height=%22400%22 rx=%2215%22 opacity=%220.2%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 font-size=%2232%22 fill=%22${encodeURIComponent(color)}%22%3E${encodeURIComponent(styleName)}%3C/text%3E%3C/svg%3E`;
}

async function generateWithAPI(imageData, style, styleConfig) {
    // Implementación para APIs reales (OpenAI, Stability AI, etc.)
    // Este código se ejecutaría en modo producción con API key válida

    try {
        let result;

        switch (appConfig.apiProvider) {
            case 'openai':
                result = await generateWithOpenAI(imageData, styleConfig);
                break;
            case 'stability':
                result = await generateWithStabilityAI(imageData, styleConfig);
                break;
            case 'replicate':
                result = await generateWithReplicate(imageData, styleConfig);
                break;
            default:
                throw new Error('Proveedor de API no soportado');
        }

        return {
            success: true,
            imageUrl: result,
            mode: 'production'
        };

    } catch (error) {
        console.error('Error al generar con API:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Funciones placeholder para APIs reales (implementar según documentación)
async function generateWithOpenAI(imageData, styleConfig) {
    // TODO: Implementar llamada a OpenAI DALL-E API
    throw new Error('API OpenAI no configurada');
}

async function generateWithStabilityAI(imageData, styleConfig) {
    // TODO: Implementar llamada a Stability AI API
    throw new Error('API Stability AI no configurada');
}

async function generateWithReplicate(imageData, styleConfig) {
    // TODO: Implementar llamada a Replicate API
    throw new Error('API Replicate no configurada');
}
