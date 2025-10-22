// Aplicación principal de la calculadora

let currentBudget = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

function initializeForm() {
    const form = document.getElementById('budget-form');
    const projectTypeSelect = document.getElementById('project-type');
    const currentStateGroup = document.getElementById('current-state-group');

    // Mostrar/ocultar campo de estado según tipo de proyecto
    projectTypeSelect.addEventListener('change', function() {
        const value = this.value;
        if (value.includes('reforma')) {
            currentStateGroup.style.display = 'block';
        } else {
            currentStateGroup.style.display = 'none';
        }
    });

    // Submit del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault;
        handleFormSubmit();
    });
}

function handleFormSubmit() {
    // Recoger datos del formulario
    const projectData = {
        projectType: document.getElementById('project-type').value,
        propertyType: document.getElementById('property-type').value,
        surface: parseInt(document.getElementById('surface').value),
        location: document.getElementById('location').value,
        quality: document.getElementById('quality').value,
        features: getCheckedValues('feature'),
        currentState: document.getElementById('current-state').value,
        description: document.getElementById('description').value
    };

    // Validar datos básicos
    if (!projectData.projectType || !projectData.propertyType || !projectData.surface ||
        !projectData.location || !projectData.quality) {
        alert('Por favor, completa todos los campos obligatorios');
        return;
    }

    if (projectData.surface < 20 || projectData.surface > 2000) {
        alert('La superficie debe estar entre 20 y 2000 m²');
        return;
    }

    // Mostrar loading
    showLoading();

    // Simular procesamiento de IA (3-5 segundos)
    setTimeout(() => {
        currentBudget = calculateBudget(projectData);
        displayResults(currentBudget);
        hideLoading();
    }, 3000 + Math.random() * 2000);
}

function getCheckedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

function displayResults(budget) {
    // Actualizar coste total
    document.getElementById('total-cost').textContent = formatCurrency(budget.totalCost);
    document.getElementById('cost-range').textContent =
        `Rango: ${formatCurrency(budget.minCost)} - ${formatCurrency(budget.maxCost)}`;

    // Actualizar detalles del resumen
    document.getElementById('summary-surface').textContent = `${formatNumber(budget.surface)} m²`;

    if (budget.costPerSqm > 0) {
        document.getElementById('cost-per-sqm').textContent = formatCurrency(budget.costPerSqm);
    } else {
        document.getElementById('cost-per-sqm').textContent = 'N/A';
    }

    document.getElementById('timeline').textContent = budget.duration.formatted;

    // Renderizar desglose
    renderBreakdown(budget.breakdown);

    // Renderizar fases
    renderPhases(budget.phases);

    // Cambiar a sección de resultados
    document.getElementById('form-section').classList.remove('active');
    document.getElementById('results-section').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderBreakdown(breakdown) {
    const container = document.getElementById('breakdown-list');
    container.innerHTML = '';

    breakdown.forEach(item => {
        const itemHTML = `
            <div class="breakdown-item">
                <div class="breakdown-header">
                    <span class="breakdown-title">${item.name}</span>
                    <span class="breakdown-cost">${formatCurrency(item.cost)}</span>
                </div>
                <div class="breakdown-description">${item.description}</div>
                <span class="breakdown-percentage">${item.percentage}% del total</span>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
}

function renderPhases(phases) {
    const container = document.getElementById('phases-list');
    container.innerHTML = '';

    phases.forEach(phase => {
        const phaseHTML = `
            <div class="phase-item">
                <div class="phase-number">${phase.number}</div>
                <div class="phase-content">
                    <div class="phase-title">${phase.name}</div>
                    <div class="phase-duration">⏱️ ${phase.duration}</div>
                </div>
            </div>
        `;
        container.innerHTML += phaseHTML;
    });
}

function resetCalculator() {
    // Limpiar formulario
    document.getElementById('budget-form').reset();
    currentBudget = null;

    // Volver a la sección de formulario
    document.getElementById('results-section').classList.remove('active');
    document.getElementById('form-section').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadPDF() {
    // En una implementación real, esto generaría un PDF
    // Por ahora, mostramos un mensaje
    alert('Funcionalidad de descarga de PDF en desarrollo.\n\nPor ahora puedes imprimir esta página (Ctrl+P) o hacer una captura de pantalla.');

    // Opcional: abrir diálogo de impresión
    // window.print();
}

function showLoading() {
    document.getElementById('loading').classList.add('active');

    const loadingTexts = [
        'Analizando proyecto con IA...',
        'Calculando costes de materiales...',
        'Estimando mano de obra...',
        'Aplicando precios de mercado Ibiza...',
        'Generando presupuesto detallado...'
    ];

    let textIndex = 0;
    const loadingTextElement = document.getElementById('loading-text');

    const intervalId = setInterval(() => {
        textIndex = (textIndex + 1) % loadingTexts.length;
        loadingTextElement.textContent = loadingTexts[textIndex];
    }, 2000);

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

// Función de demo rápida
function quickDemo(type = 'obra-nueva') {
    console.log(`Iniciando demo rápida: ${type}`);

    const demoData = {
        'obra-nueva': {
            projectType: 'obra-nueva',
            propertyType: 'villa',
            surface: 250,
            location: 'san-jose',
            quality: 'alta',
            features: ['piscina', 'jardin', 'solar', 'domotica']
        },
        'reforma': {
            projectType: 'reforma-integral',
            propertyType: 'apartamento',
            surface: 120,
            location: 'ibiza-ciudad',
            quality: 'media',
            features: ['cocina-lujo', 'banos-extra'],
            currentState: 'regular'
        },
        'piscina': {
            projectType: 'piscina',
            propertyType: 'villa',
            surface: 50,
            location: 'santa-eulalia',
            quality: 'lujo',
            features: []
        }
    };

    const data = demoData[type];
    if (data) {
        // Rellenar formulario
        document.getElementById('project-type').value = data.projectType;
        document.getElementById('property-type').value = data.propertyType;
        document.getElementById('surface').value = data.surface;
        document.getElementById('location').value = data.location;
        document.getElementById('quality').value = data.quality;

        // Trigger change event para mostrar campos condicionales
        document.getElementById('project-type').dispatchEvent(new Event('change'));

        if (data.currentState) {
            document.getElementById('current-state').value = data.currentState;
        }

        // Marcar checkboxes
        document.querySelectorAll('input[name="feature"]').forEach(cb => {
            cb.checked = data.features.includes(cb.value);
        });

        // Calcular después de 1 segundo
        setTimeout(() => {
            handleFormSubmit();
        }, 1000);
    }
}

// Hacer disponible en consola
window.quickDemo = quickDemo;

console.log('%c💰 Calculadora de Presupuestos - Gecko Studio', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cPrueba rápida: quickDemo("obra-nueva"), quickDemo("reforma") o quickDemo("piscina")', 'color: #999;');
