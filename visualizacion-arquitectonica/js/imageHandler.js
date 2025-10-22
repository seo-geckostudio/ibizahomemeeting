// Manejo de carga y visualización de imágenes

let currentImage = null;
let currentImageData = null;

// Imágenes de ejemplo embebidas en base64 (placeholders pequeños)
const exampleImages = {
    'salon-vacio': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23e0e0e0%22 x=%22100%22 y=%22400%22 width=%22600%22 height=%22200%22/%3E%3Crect fill=%22%23d0d0d0%22 x=%22150%22 y=%22150%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 font-size=%2232%22 fill=%22%23999%22%3ESalón vacío para diseño%3C/text%3E%3C/svg%3E',
    'terraza': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23e8f4f8%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23c0c0c0%22 x=%22100%22 y=%22450%22 width=%22600%22 height=%22150%22/%3E%3Ccircle fill=%22%23ffd700%22 cx=%22650%22 cy=%22100%22 r=%2250%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 font-size=%2232%22 fill=%22%23666%22%3ETerraza con vistas%3C/text%3E%3C/svg%3E',
    'cocina': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23ffffff%22 width=%22800%22 height=%22600%22/%3E%3Crect fill=%22%23d4d4d4%22 x=%22100%22 y=%22200%22 width=%22200%22 height=%22300%22/%3E%3Crect fill=%22%23d4d4d4%22 x=%22500%22 y=%22200%22 width=%22200%22 height=%22300%22/%3E%3Crect fill=%22%23a0a0a0%22 x=%22320%22 y=%22300%22 width=%22160%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 font-size=%2232%22 fill=%22%23777%22%3ECocina por diseñar%3C/text%3E%3C/svg%3E',
    'plano': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23ffffff%22 width=%22800%22 height=%22600%22/%3E%3Cline x1=%22100%22 y1=%22100%22 x2=%22700%22 y2=%22100%22 stroke=%22%23000%22 stroke-width=%223%22/%3E%3Cline x1=%22700%22 y1=%22100%22 x2=%22700%22 y2=%22500%22 stroke=%22%23000%22 stroke-width=%223%22/%3E%3Cline x1=%22700%22 y1=%22500%22 x2=%22100%22 y2=%22500%22 stroke=%22%23000%22 stroke-width=%223%22/%3E%3Cline x1=%22100%22 y1=%22500%22 x2=%22100%22 y2=%22100%22 stroke=%22%23000%22 stroke-width=%223%22/%3E%3Cline x1=%22100%22 y1=%22300%22 x2=%22400%22 y2=%22300%22 stroke=%22%23666%22 stroke-width=%222%22/%3E%3Cline x1=%22400%22 y1=%22100%22 x2=%22400%22 y2=%22500%22 stroke=%22%23666%22 stroke-width=%222%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 font-size=%2224%22 fill=%22%23999%22%3EPlano arquitectónico%3C/text%3E%3C/svg%3E'
};

function initializeImageHandling() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');

    // Click en el área de upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Cambio de archivo
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        } else {
            alert('Por favor, sube una imagen válida');
        }
    });
}

function handleFile(file) {
    // Validar tamaño (máx 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Máximo 10MB');
        return;
    }

    // Leer el archivo
    const reader = new FileReader();
    reader.onload = (e) => {
        currentImageData = e.target.result;
        currentImage = 'uploaded';
        showPreview(currentImageData);
        enableNextButton();
    };
    reader.readAsDataURL(file);
}

function selectExample(exampleId) {
    // Quitar selección anterior
    document.querySelectorAll('.example-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Marcar como seleccionado
    event.target.closest('.example-card').classList.add('selected');

    // Cargar imagen de ejemplo
    currentImage = exampleId;
    currentImageData = exampleImages[exampleId];
    showPreview(currentImageData);
    enableNextButton();
}

function showPreview(imageData) {
    const uploadArea = document.getElementById('upload-area');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');

    uploadArea.style.display = 'none';
    previewContainer.style.display = 'block';
    previewImage.src = imageData;
}

function clearImage() {
    const uploadArea = document.getElementById('upload-area');
    const previewContainer = document.getElementById('preview-container');

    currentImage = null;
    currentImageData = null;

    uploadArea.style.display = 'block';
    previewContainer.style.display = 'none';

    document.querySelectorAll('.example-card').forEach(card => {
        card.classList.remove('selected');
    });

    disableNextButton();
}

function enableNextButton() {
    document.getElementById('btn-next-styles').disabled = false;
}

function disableNextButton() {
    document.getElementById('btn-next-styles').disabled = true;
}

function getCurrentImage() {
    return {
        id: currentImage,
        data: currentImageData
    };
}
