// Gestión de la aplicación

document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const profileSection = document.getElementById('profile-section');
    const resultsSection = document.getElementById('results-section');
    const loading = document.getElementById('loading');
    const matchesContainer = document.getElementById('matches-container');

    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
});

function handleFormSubmit() {
    // Recoger datos del formulario
    const userProfile = {
        name: document.getElementById('name').value,
        type: document.getElementById('type').value,
        specialties: getCheckedValues('specialty'),
        location: document.getElementById('location').value,
        projects: document.getElementById('projects').value,
        lookingFor: document.getElementById('looking-for').value
    };

    // Validar que al menos una especialidad esté seleccionada
    if (userProfile.specialties.length === 0) {
        alert('Por favor, selecciona al menos una especialidad');
        return;
    }

    // Mostrar loading
    showLoading();

    // Simular procesamiento de IA (2 segundos)
    setTimeout(() => {
        const matches = findMatches(userProfile);
        displayResults(matches);
        hideLoading();
    }, 2000);
}

function getCheckedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

function showLoading() {
    document.getElementById('loading').classList.add('active');
}

function hideLoading() {
    document.getElementById('loading').classList.remove('active');
}

function displayResults(matches) {
    const matchesContainer = document.getElementById('matches-container');
    const profileSection = document.getElementById('profile-section');
    const resultsSection = document.getElementById('results-section');

    // Limpiar resultados anteriores
    matchesContainer.innerHTML = '';

    if (matches.length === 0) {
        matchesContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <h3>No se encontraron matches en este momento</h3>
                <p>Prueba ajustando tu perfil o vuelve más tarde cuando haya más asistentes registrados.</p>
            </div>
        `;
    } else {
        // Renderizar cada match
        matches.forEach(match => {
            matchesContainer.innerHTML += renderMatch(match);
        });
    }

    // Cambiar de sección
    profileSection.classList.remove('active');
    resultsSection.classList.add('active');

    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetApp() {
    const profileSection = document.getElementById('profile-section');
    const resultsSection = document.getElementById('results-section');
    const form = document.getElementById('profile-form');

    // Limpiar formulario
    form.reset();

    // Volver a la sección de perfil
    resultsSection.classList.remove('active');
    profileSection.classList.add('active');

    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para rellenar automáticamente el formulario (útil para demos rápidas)
function quickDemo(type) {
    const demos = {
        arquitecto: {
            name: "Tu Estudio de Arquitectura",
            type: "arquitecto",
            specialties: ["residencial", "lujo", "sostenible"],
            location: "toda-ibiza",
            projects: "Diseñamos villas de lujo con enfoque sostenible",
            lookingFor: "colaboradores"
        },
        constructor: {
            name: "Tu Constructora",
            type: "constructor",
            specialties: ["obra-nueva", "lujo", "residencial"],
            location: "santa-eulalia",
            projects: "Construcción de villas premium",
            lookingFor: "proveedores"
        },
        proveedor: {
            name: "Tu Empresa de Materiales",
            type: "proveedor",
            specialties: ["sostenible", "lujo"],
            location: "toda-ibiza",
            projects: "Materiales sostenibles de alta calidad",
            lookingFor: "clientes"
        }
    };

    const demo = demos[type];
    if (demo) {
        document.getElementById('name').value = demo.name;
        document.getElementById('type').value = demo.type;
        document.getElementById('location').value = demo.location;
        document.getElementById('projects').value = demo.projects;
        document.getElementById('looking-for').value = demo.lookingFor;

        // Marcar checkboxes
        document.querySelectorAll('input[name="specialty"]').forEach(cb => {
            cb.checked = demo.specialties.includes(cb.value);
        });
    }
}

// Hacer disponible en consola para demos rápidas
window.quickDemo = quickDemo;

// Mensaje de bienvenida en consola
console.log('%c🤝 Networking Inteligente - Gecko Studio', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cPrueba rápida: quickDemo("arquitecto"), quickDemo("constructor") o quickDemo("proveedor")', 'color: #666;');
