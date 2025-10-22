// Aplicación principal del calculador electricista

let currentData = null;
let currentCalculos = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
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

window.quickDemo = quickDemo;
console.log('%c⚡ Calculador Electricista - Gecko Studio', 'font-size: 20px; font-weight: bold; color: #e74c3c;');
console.log('%cPrueba rápida: quickDemo()', 'color: #999;');
