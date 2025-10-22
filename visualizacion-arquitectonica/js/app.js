// Aplicación principal de Visualización Arquitectónica

let selectedStyle = null;
let generatedResult = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeImageHandling();
    initializeStyleSelection();
});

function initializeStyleSelection() {
    const styleCards = document.querySelectorAll('.style-card');

    styleCards.forEach(card => {
        card.addEventListener('click', function() {
            // Quitar selección anterior
            styleCards.forEach(c => c.classList.remove('selected'));

            // Seleccionar este estilo
            this.classList.add('selected');
            selectedStyle = this.dataset.style;

            // Habilitar botón de generar
            document.getElementById('btn-generate').disabled = false;
        });
    });
}

function nextToStyles() {
    if (!currentImage) {
        alert('Por favor, selecciona una imagen primero');
        return;
    }

    // Cambiar a sección de estilos
    document.getElementById('upload-section').classList.remove('active');
    document.getElementById('style-section').classList.add('active');

    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToUpload() {
    document.getElementById('style-section').classList.remove('active');
    document.getElementById('upload-section').classList.add('active');

    // Reset selección de estilo
    document.querySelectorAll('.style-card').forEach(card => {
        card.classList.remove('selected');
    });
    selectedStyle = null;
    document.getElementById('btn-generate').disabled = true;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function generateVisualization() {
    if (!selectedStyle) {
        alert('Por favor, selecciona un estilo de diseño');
        return;
    }

    const image = getCurrentImage();
    if (!image.data) {
        alert('Error: No se pudo cargar la imagen');
        return;
    }

    // Mostrar loading
    showLoading();

    try {
        // Generar visualización
        const result = await generateWithAI(image.data, selectedStyle);

        if (result.success) {
            generatedResult = result;
            displayResults(image.data, result.imageUrl, selectedStyle);
        } else {
            throw new Error(result.error || 'Error desconocido');
        }
    } catch (error) {
        hideLoading();
        alert('Error al generar la visualización: ' + error.message);
        console.error(error);
    }
}

function displayResults(originalImage, generatedImage, style) {
    hideLoading();

    const styleConfig = styleDefinitions[style];

    // Mostrar imágenes
    document.getElementById('original-image').src = originalImage;
    document.getElementById('generated-image').src = generatedImage;
    document.getElementById('style-badge').textContent = styleConfig.name;

    // Mostrar descripción
    document.getElementById('result-description').textContent = styleConfig.description;

    // Mostrar tags
    const tagsContainer = document.getElementById('result-tags');
    tagsContainer.innerHTML = '';
    styleConfig.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    // Cambiar a sección de resultados
    document.getElementById('style-section').classList.remove('active');
    document.getElementById('results-section').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadResult() {
    const generatedImage = document.getElementById('generated-image').src;

    // Crear link temporal para descargar
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `visualizacion-${selectedStyle}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function resetApp() {
    // Resetear todo
    clearImage();
    selectedStyle = null;
    generatedResult = null;

    // Limpiar selecciones
    document.querySelectorAll('.style-card').forEach(card => {
        card.classList.remove('selected');
    });

    document.getElementById('btn-generate').disabled = true;

    // Volver a la primera sección
    document.getElementById('results-section').classList.remove('active');
    document.getElementById('style-section').classList.remove('active');
    document.getElementById('upload-section').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLoading() {
    document.getElementById('loading').classList.add('active');

    // Actualizar texto de loading aleatoriamente
    const loadingTexts = [
        'Analizando la imagen con IA...',
        'Generando visualización arquitectónica...',
        'Aplicando estilo seleccionado...',
        'Renderizando espacio en 3D...',
        'Creando tu diseño personalizado...'
    ];

    let textIndex = 0;
    const loadingTextElement = document.getElementById('loading-text');

    const intervalId = setInterval(() => {
        textIndex = (textIndex + 1) % loadingTexts.length;
        loadingTextElement.textContent = loadingTexts[textIndex];
    }, 3000);

    // Guardar interval ID para poder limpiarlo después
    document.getElementById('loading').dataset.intervalId = intervalId;
}

function hideLoading() {
    const loading = document.getElementById('loading');
    const intervalId = loading.dataset.intervalId;

    if (intervalId) {
        clearInterval(parseInt(intervalId));
    }

    loading.classList.remove('active');
}

// Función de demo rápida para el stand
function quickDemo(example = 'salon-vacio', style = 'moderno') {
    console.log(`Iniciando demo rápida: ${example} -> ${style}`);

    // Seleccionar ejemplo
    selectExample(example);

    // Ir a estilos después de 1 segundo
    setTimeout(() => {
        nextToStyles();

        // Seleccionar estilo después de otro segundo
        setTimeout(() => {
            const styleCard = document.querySelector(`[data-style="${style}"]`);
            if (styleCard) {
                styleCard.click();

                // Generar después de 1 segundo más
                setTimeout(() => {
                    generateVisualization();
                }, 1000);
            }
        }, 1000);
    }, 1000);
}

// Hacer disponible en consola
window.quickDemo = quickDemo;

console.log('%cPrueba rápida: quickDemo("salon-vacio", "moderno")', 'color: #999;');
console.log('%cEjemplos: salon-vacio, terraza, cocina, plano', 'color: #999;');
console.log('%cEstilos: moderno, mediterraneo, lujo, sostenible, industrial, rustico', 'color: #999;');
