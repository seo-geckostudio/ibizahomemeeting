// Aplicación principal del generador de propuestas

let currentProposal = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

function initializeForm() {
    const form = document.getElementById('proposal-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
}

function handleFormSubmit() {
    // Recoger datos del formulario
    const formData = {
        proposalType: document.getElementById('proposal-type').value,
        clientName: document.getElementById('client-name').value,
        clientCompany: document.getElementById('client-company').value,
        projectName: document.getElementById('project-name').value,
        projectDescription: document.getElementById('project-description').value,
        location: document.getElementById('project-location').value,
        budgetRange: document.getElementById('budget-range').value,
        services: getCheckedValues('service'),
        companyName: document.getElementById('company-name').value,
        contactPerson: document.getElementById('contact-person').value,
        contactEmail: document.getElementById('contact-email').value,
        contactPhone: document.getElementById('contact-phone').value,
        additionalNotes: document.getElementById('additional-notes').value
    };

    // Validar datos básicos
    if (!formData.proposalType || !formData.clientName || !formData.projectName ||
        !formData.location || !formData.budgetRange) {
        alert('Por favor, completa todos los campos obligatorios');
        return;
    }

    if (formData.services.length === 0) {
        alert('Por favor, selecciona al menos un servicio');
        return;
    }

    // Mostrar loading
    showLoading();

    // Simular generación con IA (2-3 segundos)
    setTimeout(() => {
        currentProposal = formData;
        const proposalHTML = generateProposal(formData);
        displayProposal(proposalHTML);
        hideLoading();
    }, 2000 + Math.random() * 1000);
}

function getCheckedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

function displayProposal(html) {
    document.getElementById('document-preview').innerHTML = html;

    // Cambiar a sección de preview
    document.getElementById('form-section').classList.remove('active');
    document.getElementById('preview-section').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function editProposal() {
    // Volver al formulario
    document.getElementById('preview-section').classList.remove('active');
    document.getElementById('form-section').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadProposal() {
    // En producción, esto generaría un PDF real
    // Por ahora, usar la función de impresión del navegador
    alert('💡 Función de descarga PDF:\n\n' +
          '1. Se abrirá el diálogo de impresión\n' +
          '2. Selecciona "Guardar como PDF"\n' +
          '3. Elige la ubicación y guarda\n\n' +
          'En una implementación real, esto generaría automáticamente un PDF profesional.');

    setTimeout(() => {
        window.print();
    }, 500);
}

function showLoading() {
    document.getElementById('loading').classList.add('active');

    const loadingTexts = [
        'Generando propuesta con IA...',
        'Personalizando contenido...',
        'Estructurando documento...',
        'Aplicando formato profesional...',
        'Finalizando propuesta...'
    ];

    let textIndex = 0;
    const loadingTextElement = document.getElementById('loading-text');

    const intervalId = setInterval(() => {
        textIndex = (textIndex + 1) % loadingTexts.length;
        loadingTextElement.textContent = loadingTexts[textIndex];
    }, 1500);

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

// Demo rápida
function quickDemo(type = 'construccion') {
    console.log(`Iniciando demo rápida: ${type}`);

    const demoData = {
        construccion: {
            proposalType: 'construccion',
            clientName: 'María Rodríguez',
            clientCompany: 'Inversiones Costa Ibiza SL',
            projectName: 'Villa moderna con vistas al mar',
            projectDescription: 'Construcción de villa de lujo de 300m² en primera línea, con piscina infinity, diseño contemporáneo y materiales premium. El proyecto incluye todas las instalaciones, jardín mediterráneo y acabados de alta gama.',
            location: 'San José',
            budgetRange: 'Más de 500.000€',
            companyName: 'Gecko Studio',
            contactPerson: 'Miguel Ángel García',
            contactEmail: 'miguelangel@geckostudio.es',
            contactPhone: '+34 971 123 456',
            additionalNotes: 'El cliente valora especialmente la sostenibilidad y la eficiencia energética. Interesado en certificación PassivHaus.'
        },
        reforma: {
            proposalType: 'reforma',
            clientName: 'Carlos Martínez',
            clientCompany: '',
            projectName: 'Reforma integral apartamento centro',
            projectDescription: 'Reforma completa de apartamento de 120m² en Dalt Vila. Actualización de instalaciones, redistribución de espacios y acabados modernos respetando elementos históricos.',
            location: 'Ibiza ciudad',
            budgetRange: '100.000€ - 250.000€',
            companyName: 'Gecko Studio',
            contactPerson: 'Miguel Ángel García',
            contactEmail: 'miguelangel@geckostudio.es',
            contactPhone: '+34 971 123 456',
            additionalNotes: 'Reforma en edificio catalogado. Necesario proyecto de patrimonio.'
        },
        diseno: {
            proposalType: 'diseno',
            clientName: 'Laura Sánchez',
            clientCompany: 'Hotel Boutique Ibiza',
            projectName: 'Interiorismo hotel boutique',
            projectDescription: 'Diseño de interiores para 12 habitaciones y zonas comunes de hotel boutique. Estilo mediterráneo contemporáneo con toques de lujo.',
            location: 'Santa Eulalia',
            budgetRange: '250.000€ - 500.000€',
            companyName: 'Gecko Studio',
            contactPerson: 'Miguel Ángel García',
            contactEmail: 'miguelangel@geckostudio.es',
            contactPhone: '+34 971 123 456',
            additionalNotes: ''
        }
    };

    const data = demoData[type];
    if (data) {
        // Rellenar formulario
        document.getElementById('proposal-type').value = data.proposalType;
        document.getElementById('client-name').value = data.clientName;
        document.getElementById('client-company').value = data.clientCompany;
        document.getElementById('project-name').value = data.projectName;
        document.getElementById('project-description').value = data.projectDescription;
        document.getElementById('project-location').value = data.location;
        document.getElementById('budget-range').value = data.budgetRange;
        document.getElementById('company-name').value = data.companyName;
        document.getElementById('contact-person').value = data.contactPerson;
        document.getElementById('contact-email').value = data.contactEmail;
        document.getElementById('contact-phone').value = data.contactPhone;
        document.getElementById('additional-notes').value = data.additionalNotes;

        // Marcar servicios por defecto
        document.querySelectorAll('input[name="service"]').forEach((cb, index) => {
            cb.checked = index < 4; // Marcar los primeros 4
        });

        // Generar después de 1 segundo
        setTimeout(() => {
            handleFormSubmit();
        }, 1000);
    }
}

// Hacer disponible en consola
window.quickDemo = quickDemo;

console.log('%c📄 Generador de Propuestas - Gecko Studio', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cPrueba rápida: quickDemo("construccion"), quickDemo("reforma") o quickDemo("diseno")', 'color: #999;');
