// Plantillas de propuestas comerciales

const proposalTemplates = {
    construccion: {
        title: 'Propuesta de Construcción',
        sections: ['introduccion', 'alcance', 'metodologia', 'servicios', 'plazos', 'presupuesto', 'condiciones']
    },
    reforma: {
        title: 'Propuesta de Reforma Integral',
        sections: ['introduccion', 'diagnostico', 'alcance', 'servicios', 'plazos', 'presupuesto', 'garantias']
    },
    diseno: {
        title: 'Propuesta de Diseño de Interiores',
        sections: ['introduccion', 'concepto', 'servicios', 'proceso', 'entregables', 'presupuesto', 'siguientes-pasos']
    },
    arquitectura: {
        title: 'Propuesta de Servicios de Arquitectura',
        sections: ['introduccion', 'servicios', 'fases', 'metodologia', 'equipo', 'presupuesto', 'condiciones']
    },
    ingenieria: {
        title: 'Propuesta de Ingeniería y Consultoría',
        sections: ['introduccion', 'analisis', 'servicios', 'metodologia', 'entregables', 'presupuesto', 'garantias']
    },
    materiales: {
        title: 'Propuesta de Suministro de Materiales',
        sections: ['introduccion', 'catalogo', 'servicios', 'logistica', 'plazos', 'presupuesto', 'condiciones']
    }
};

// Contenido generado para cada sección
function generateSectionContent(sectionType, data) {
    const contents = {
        introduccion: () => `
            <p>Estimado/a ${data.clientName}${data.clientCompany ? `, ${data.clientCompany}` : ''},</p>
            <p>Es un placer para <strong>${data.companyName}</strong> presentarle nuestra propuesta para <strong>${data.projectName}</strong> en ${data.location}.</p>
            <p>${data.projectDescription}</p>
            <p>Tras analizar sus necesidades, hemos diseñado una solución integral que cumple con sus expectativas y se ajusta al presupuesto indicado de <strong>${data.budgetRange}</strong>.</p>
        `,

        alcance: () => `
            <p>El alcance del proyecto comprende:</p>
            <ul>
                ${data.services.map(service => `<li>${getServiceName(service)}</li>`).join('')}
            </ul>
            <p>Nuestro equipo se encargará de coordinar todos los aspectos del proyecto, asegurando la máxima calidad en la ejecución y el cumplimiento de los plazos establecidos.</p>
        `,

        servicios: () => `
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.services.map(service => `
                        <tr>
                            <td><strong>${getServiceName(service)}</strong></td>
                            <td>${getServiceDescription(service)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `,

        metodologia: () => `
            <p>Trabajamos siguiendo una metodología probada que garantiza resultados excepcionales:</p>
            <ul>
                <li><strong>Planificación exhaustiva:</strong> Análisis detallado de requisitos y recursos</li>
                <li><strong>Coordinación eficiente:</strong> Gestión integrada de todos los profesionales</li>
                <li><strong>Control de calidad:</strong> Supervisión continua en cada fase</li>
                <li><strong>Comunicación transparente:</strong> Informes periódicos sobre el progreso</li>
                <li><strong>Compromiso con plazos:</strong> Cronograma realista y cumplimiento riguroso</li>
            </ul>
        `,

        plazos: () => `
            <p>Estimamos los siguientes plazos para el proyecto:</p>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Inicio de obras</div>
                    <div class="info-value">A convenir tras firma</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Duración estimada</div>
                    <div class="info-value">${estimateDuration(data.proposalType)}</div>
                </div>
            </div>
            <p class="small-text">Los plazos definitivos se concretarán en el cronograma detallado tras la aprobación del proyecto.</p>
        `,

        presupuesto: () => `
            <div class="highlight-box">
                <h3>Presupuesto Estimado</h3>
                <p>Rango presupuestario: <strong>${data.budgetRange}</strong></p>
                <p>Esta propuesta está sujeta a la elaboración de un presupuesto detallado tras la visita técnica y definición final del alcance.</p>
                <p><strong>La propuesta incluye:</strong></p>
                <ul>
                    <li>Todos los servicios descritos anteriormente</li>
                    <li>Coordinación y gestión del proyecto</li>
                    <li>Seguimiento y control de calidad</li>
                    <li>Documentación técnica necesaria</li>
                </ul>
            </div>
        `,

        condiciones: () => `
            <h3>Condiciones Generales</h3>
            <ul>
                <li><strong>Validez de la propuesta:</strong> 30 días desde la fecha de emisión</li>
                <li><strong>Forma de pago:</strong> A convenir según cronograma de obra</li>
                <li><strong>Permisos y licencias:</strong> Gestión incluida en el servicio</li>
                <li><strong>Garantías:</strong> Según normativa vigente y LOE</li>
                <li><strong>Seguros:</strong> Responsabilidad civil y decenal contratados</li>
            </ul>
        `,

        garantias: () => `
            <h3>Garantías</h3>
            <p>Todos nuestros trabajos están respaldados por:</p>
            <ul>
                <li>Seguro de responsabilidad civil profesional</li>
                <li>Garantía de vicios ocultos (10 años según LOE)</li>
                <li>Certificados de materiales y trabajos realizados</li>
                <li>Soporte post-entrega durante 12 meses</li>
            </ul>
        `,

        'siguientes-pasos': () => `
            <h3>Próximos Pasos</h3>
            <ol style="padding-left: 20px;">
                <li>Revisión y aprobación de esta propuesta</li>
                <li>Reunión de definición de detalles técnicos</li>
                <li>Visita al emplazamiento (si procede)</li>
                <li>Elaboración de presupuesto definitivo</li>
                <li>Firma de contrato e inicio del proyecto</li>
            </ol>
        `
    };

    return contents[sectionType] ? contents[sectionType]() : '';
}

function getServiceName(service) {
    const names = {
        'proyecto': 'Proyecto Técnico',
        'direccion': 'Dirección de Obra',
        'gestion': 'Gestión de Permisos',
        'coordinacion': 'Coordinación General',
        'materiales': 'Suministro de Materiales',
        'mano-obra': 'Mano de Obra Especializada',
        'diseno': 'Diseño Personalizado',
        'seguimiento': 'Seguimiento Post-Obra'
    };
    return names[service] || service;
}

function getServiceDescription(service) {
    const descriptions = {
        'proyecto': 'Elaboración completa del proyecto técnico con todos los planos y memorias necesarios',
        'direccion': 'Dirección facultativa de la ejecución de obras por técnico competente',
        'gestion': 'Tramitación de licencias, permisos municipales y autorizaciones necesarias',
        'coordinacion': 'Coordinación de todos los profesionales y proveedores involucrados',
        'materiales': 'Provisión de materiales de calidad con certificados y garantías',
        'mano-obra': 'Equipo de profesionales cualificados y experimentados',
        'diseno': 'Desarrollo de diseño único adaptado a sus preferencias',
        'seguimiento': 'Asistencia y soporte tras la finalización de la obra'
    };
    return descriptions[service] || 'Servicio incluido en el alcance del proyecto';
}

function estimateDuration(type) {
    const durations = {
        'construccion': '12-18 meses',
        'reforma': '4-8 meses',
        'diseno': '2-4 meses',
        'arquitectura': '6-12 meses',
        'ingenieria': '3-6 meses',
        'materiales': '1-2 meses'
    };
    return durations[type] || '6-9 meses';
}
