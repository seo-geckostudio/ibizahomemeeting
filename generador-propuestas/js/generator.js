// Generador de propuestas

function generateProposal(formData) {
    const template = proposalTemplates[formData.proposalType];
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    let html = `
        <div class="doc-header">
            <div class="doc-logo">📄</div>
            <div class="doc-company">${formData.companyName}</div>
            <div class="doc-subtitle">${template.title}</div>
        </div>

        <div class="doc-date">
            ${formData.location}, ${today}
        </div>

        <div class="doc-section">
            <h2>Información del Proyecto</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Cliente</div>
                    <div class="info-value">${formData.clientName}${formData.clientCompany ? '<br>' + formData.clientCompany : ''}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Proyecto</div>
                    <div class="info-value">${formData.projectName}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Ubicación</div>
                    <div class="info-value">${formData.location}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Tipo</div>
                    <div class="info-value">${getProposalTypeName(formData.proposalType)}</div>
                </div>
            </div>
        </div>
    `;

    // Generar cada sección según la plantilla
    template.sections.forEach(section => {
        const sectionTitle = getSectionTitle(section);
        const sectionContent = generateSectionContent(section, formData);

        html += `
            <div class="doc-section">
                <h2>${sectionTitle}</h2>
                ${sectionContent}
            </div>
        `;
    });

    // Añadir notas adicionales si existen
    if (formData.additionalNotes && formData.additionalNotes.trim()) {
        html += `
            <div class="doc-section">
                <h2>Notas Adicionales</h2>
                <p>${formData.additionalNotes}</p>
            </div>
        `;
    }

    // Footer con información de contacto
    html += `
        <div class="doc-footer">
            <p><strong>Quedamos a su disposición para cualquier aclaración</strong></p>
            <div class="doc-contact">
                <div class="contact-item">
                    <span>👤</span> ${formData.contactPerson}
                </div>
                <div class="contact-item">
                    <span>📧</span> ${formData.contactEmail}
                </div>
                <div class="contact-item">
                    <span>📱</span> ${formData.contactPhone}
                </div>
            </div>
            <p style="margin-top: 30px; color: #999; font-size: 0.9em;">
                Este documento es una propuesta comercial sin valor contractual hasta la firma del contrato correspondiente.
            </p>
        </div>
    `;

    return html;
}

function getSectionTitle(section) {
    const titles = {
        'introduccion': 'Introducción',
        'alcance': 'Alcance del Proyecto',
        'servicios': 'Servicios Incluidos',
        'metodologia': 'Nuestra Metodología',
        'plazos': 'Planificación y Plazos',
        'presupuesto': 'Presupuesto',
        'condiciones': 'Condiciones',
        'garantias': 'Garantías',
        'diagnostico': 'Diagnóstico Inicial',
        'concepto': 'Concepto de Diseño',
        'proceso': 'Proceso de Trabajo',
        'entregables': 'Entregables',
        'fases': 'Fases del Proyecto',
        'equipo': 'Nuestro Equipo',
        'analisis': 'Análisis Técnico',
        'catalogo': 'Catálogo de Materiales',
        'logistica': 'Logística y Entrega',
        'siguientes-pasos': 'Siguientes Pasos'
    };
    return titles[section] || section;
}

function getProposalTypeName(type) {
    const names = {
        'construccion': 'Construcción / Obra Nueva',
        'reforma': 'Reforma Integral',
        'diseno': 'Diseño de Interiores',
        'arquitectura': 'Servicios de Arquitectura',
        'ingenieria': 'Ingeniería y Consultoría',
        'materiales': 'Suministro de Materiales'
    };
    return names[type] || type;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(amount);
}
