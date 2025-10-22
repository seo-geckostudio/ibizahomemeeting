// Aplicación principal del calculador electricista

let currentData = null;
let currentCalculos = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    initializePlanUpload();
});

function initializeForm() {
    const form = document.getElementById('electrical-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
}

function handleFormSubmit() {
    // Recoger datos
    const formData = {
        projectType: document.getElementById('project-type').value,
        surface: parseInt(document.getElementById('surface').value),
        power: parseFloat(document.getElementById('power').value),
        voltage: parseInt(document.getElementById('voltage').value),
        lightingPoints: parseInt(document.getElementById('lighting-points').value),
        socketPoints: parseInt(document.getElementById('socket-points').value),
        bathrooms: parseInt(document.getElementById('bathrooms').value),
        kitchen: document.getElementById('kitchen').value,
        specials: getCheckedValues('special'),
        quality: document.getElementById('quality').value,
        brandPreference: document.getElementById('brand-preference').value,
        companyName: document.getElementById('company-name').value,
        licenseNumber: document.getElementById('license-number').value,
        hourlyRate: document.getElementById('hourly-rate').value,
        markup: document.getElementById('markup').value
    };

    // Validar
    if (!formData.projectType || !formData.quality || !formData.companyName) {
        alert('Por favor, completa todos los campos obligatorios');
        return;
    }

    currentData = formData;

    // Mostrar loading
    showLoading();

    // Simular cálculo (2-3 segundos)
    setTimeout(() => {
        try {
            // Validar normativa
            const validacion = REBT.validar(formData);

            // Calcular instalación
            currentCalculos = calcularInstalacion(formData);

            // Generar presupuesto
            const presupuesto = generarPresupuesto(formData, currentCalculos);

            // Mostrar resultados
            displayResults(validacion, currentCalculos, presupuesto);
            hideLoading();
        } catch (error) {
            hideLoading();
            alert('Error al calcular: ' + error.message);
            console.error(error);
        }
    }, 2500);
}

function getCheckedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

function displayResults(validacion, calculos, presupuesto) {
    // Render validación normativa
    let validacionHTML = '<h3>✅ Validación Normativa REBT</h3>';
    validacion.validaciones.forEach(v => {
        validacionHTML += `<div class="validation-item">
            <span class="validation-icon">✓</span>
            <div><strong>${v.mensaje}</strong><br><small>Normativa: ${v.normativa}</small></div>
        </div>`;
    });

    if (validacion.warnings.length > 0) {
        validacionHTML += '<h4 style="color: #856404; margin-top: 15px;">⚠️ Advertencias</h4>';
        validacion.warnings.forEach(w => {
            validacionHTML += `<div class="validation-item">
                <span class="validation-icon">⚠️</span>
                <div>${w.mensaje}<br><small>Normativa: ${w.normativa}</small></div>
            </div>`;
        });
        document.getElementById('normative-validation').className = 'validation-box warning';
    } else {
        document.getElementById('normative-validation').className = 'validation-box';
    }

    document.getElementById('normative-validation').innerHTML = validacionHTML;

    // Render cálculos técnicos
    let techHTML = '<h3>🔧 Cálculos Técnicos</h3><div class="tech-grid">';
    techHTML += `<div class="tech-item"><div class="tech-label">Circuitos Necesarios</div><div class="tech-value">${calculos.circuitos.length} circuitos</div></div>`;
    techHTML += `<div class="tech-item"><div class="tech-label">Potencia Recomendada</div><div class="tech-value">${calculos.potenciaRecomendada} kW</div></div>`;
    techHTML += `<div class="tech-item"><div class="tech-label">Horas de Trabajo</div><div class="tech-value">${calculos.horasTrabajo} horas</div></div>`;
    techHTML += `<div class="tech-item"><div class="tech-label">Plazo Estimado</div><div class="tech-value">${Math.ceil(calculos.horasTrabajo/8)} días</div></div>`;
    techHTML += '</div>';

    techHTML += '<h4 style="margin-top: 20px; color: #17a2b8;">Circuitos Instalados:</h4><ul style="margin-top: 10px;">';
    calculos.circuitos.forEach(c => {
        const info = REBT.circuitosMinimosVivienda[c];
        techHTML += `<li style="padding: 5px 0;"><strong>${c}:</strong> ${info.nombre} (${info.seccion}mm², ${info.proteccion}A) - ${info.descripcion}</li>`;
    });
    techHTML += '</ul>';

    document.getElementById('technical-calcs').innerHTML = techHTML;

    // Render presupuesto
    document.getElementById('budget-detail').innerHTML = renderPresupuesto(presupuesto);

    // Cambiar sección
    document.getElementById('form-section').classList.remove('active');
    document.getElementById('results-section').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function editProject() {
    document.getElementById('results-section').classList.remove('active');
    document.getElementById('form-section').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadBudget() {
    alert('💡 Para descargar el presupuesto:\n\n1. Se abrirá el diálogo de impresión\n2. Selecciona "Guardar como PDF"\n3. Guarda el archivo\n\nPuedes también añadir tu logo y datos antes de imprimir.');
    setTimeout(() => window.print(), 500);
}

function showLoading() {
    document.getElementById('loading').classList.add('active');
    const texts = ['Validando normativa REBT...', 'Calculando circuitos...', 'Dimensionando cables...', 'Seleccionando materiales...', 'Generando presupuesto...'];
    let index = 0;
    const interval = setInterval(() => {
        document.getElementById('loading-text').textContent = texts[index];
        index = (index + 1) % texts.length;
    }, 1500);
    document.getElementById('loading').dataset.intervalId = interval;
}

function hideLoading() {
    const interval = document.getElementById('loading').dataset.intervalId;
    if (interval) clearInterval(parseInt(interval));
    document.getElementById('loading').classList.remove('active');
}

// Demo rápida
function quickDemo() {
    console.log('Iniciando demo...');
    document.getElementById('project-type').value = 'vivienda-nueva';
    document.getElementById('surface').value = '120';
    document.getElementById('power').value = '9.2';
    document.getElementById('voltage').value = '230';
    document.getElementById('lighting-points').value = '25';
    document.getElementById('socket-points').value = '35';
    document.getElementById('bathrooms').value = '2';
    document.getElementById('kitchen').value = 'induccion';
    document.querySelectorAll('input[name="special"]').forEach((cb, i) => cb.checked = i < 4);
    document.getElementById('quality').value = 'media';
    document.getElementById('brand-preference').value = 'schneider';
    document.getElementById('company-name').value = 'Instalaciones Eléctricas Ibiza SL';
    document.getElementById('license-number').value = 'BA-001234';
    document.getElementById('hourly-rate').value = '45';
    document.getElementById('markup').value = '20';
    setTimeout(() => handleFormSubmit(), 1000);
}

// Mode switching
function switchMode(mode) {
    // Update buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });

    // Hide all sections
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('ai-mode').style.display = 'none';
    document.getElementById('plan-mode').style.display = 'none';

    // Show selected section
    if (mode === 'manual') {
        document.getElementById('form-section').style.display = 'block';
    } else if (mode === 'ai') {
        document.getElementById('ai-mode').style.display = 'block';
    } else if (mode === 'plan') {
        document.getElementById('plan-mode').style.display = 'block';
    }
}

// Plan upload initialization
function initializePlanUpload() {
    const uploadZone = document.getElementById('plan-upload-zone');
    const fileInput = document.getElementById('plan-file');

    // Click to upload
    uploadZone.addEventListener('click', () => fileInput.click());

    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) handlePlanFile(file);
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handlePlanFile(file);
    });
}

function handlePlanFile(file) {
    // Validate file
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
        alert('Formato no válido. Usa JPG, PNG o PDF.');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert('Archivo muy grande. Máximo 10MB.');
        return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('plan-image');
        img.src = e.target.result;
        document.getElementById('plan-upload-zone').style.display = 'none';
        document.getElementById('plan-preview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function analyzePlan() {
    showLoading();

    // Simulate AI analysis (2-4 seconds)
    const analysisTexts = [
        'Analizando plano con visión IA...',
        'Detectando cuadro eléctrico...',
        'Contando puntos de luz...',
        'Identificando tomas de corriente...',
        'Extrayendo dimensiones...',
        'Generando datos del formulario...'
    ];

    let index = 0;
    const interval = setInterval(() => {
        document.getElementById('loading-text').textContent = analysisTexts[index];
        index = (index + 1) % analysisTexts.length;
    }, 1500);

    setTimeout(() => {
        clearInterval(interval);
        hideLoading();

        // Simulate extracted data
        alert('✅ Análisis completado\n\n🔍 Datos extraídos del plano:\n\n• Superficie: ~120 m²\n• Puntos de luz: 28\n• Tomas de corriente: 36\n• Baños detectados: 2\n• Cocina eléctrica: Sí\n\nCambiando a formulario manual con datos pre-rellenados...');

        // Switch to manual mode with pre-filled data
        switchMode('manual');
        document.getElementById('surface').value = '120';
        document.getElementById('lighting-points').value = '28';
        document.getElementById('socket-points').value = '36';
        document.getElementById('bathrooms').value = '2';
        document.getElementById('kitchen').value = 'vitro';

        window.scrollTo({ top: document.getElementById('form-section').offsetTop - 100, behavior: 'smooth' });
    }, 6000);
}

// AI Assistant message sending
function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    const messagesDiv = document.getElementById('ai-messages');
    messagesDiv.innerHTML += `
        <div class="ai-message user">
            <strong>Tú:</strong> ${message}
        </div>
    `;

    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Simulate AI response (this would use real AI in production)
    setTimeout(() => {
        const response = generateAIResponse(message);
        messagesDiv.innerHTML += `
            <div class="ai-message bot">
                <strong>Asistente:</strong> ${response}
            </div>
        `;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 1500);
}

function generateAIResponse(userMessage) {
    // Simple keyword-based responses for demo
    const msg = userMessage.toLowerCase();

    if (msg.includes('vivienda') || msg.includes('casa') || msg.includes('piso')) {
        return '¿Cuántos metros cuadrados tiene la vivienda? ¿Es una instalación nueva o una reforma?';
    } else if (msg.includes('m²') || msg.includes('metros')) {
        return 'Perfecto. ¿Cuántos puntos de luz y tomas de corriente necesitas? También dime si tiene cocina eléctrica.';
    } else if (msg.includes('local') || msg.includes('comercial') || msg.includes('negocio')) {
        return '¿Qué tipo de negocio es? ¿Necesitas instalación trifásica? ¿Cuál es la superficie aproximada?';
    } else if (msg.includes('luz') || msg.includes('enchufe') || msg.includes('toma')) {
        return 'Entendido. ¿La instalación incluye aire acondicionado, cargador de vehículo eléctrico u otros elementos especiales?';
    } else {
        return 'Entiendo. Necesito algunos datos más: superficie en m², número de baños, si tiene cocina eléctrica y si necesitas elementos especiales como aire acondicionado o cargador de VE.';
    }
}

// Make functions global
window.switchMode = switchMode;
window.analyzePlan = analyzePlan;
window.sendAIMessage = sendAIMessage;
window.quickDemo = quickDemo;

console.log('%c⚡ Calculador Electricista - Gecko Studio', 'font-size: 20px; font-weight: bold; color: #e74c3c;');
console.log('%cPrueba rápida: quickDemo()', 'color: #999;');
