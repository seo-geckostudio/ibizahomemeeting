// Algoritmo de matching inteligente

function calculateMatchScore(userProfile, candidateProfile) {
    let score = 0;
    const reasons = [];

    // 1. Compatibilidad por tipo de empresa (40 puntos)
    const typeCompatibility = {
        'constructor': ['arquitecto', 'ingeniero', 'proveedor', 'promotor'],
        'arquitecto': ['constructor', 'interiorista', 'ingeniero', 'promotor'],
        'interiorista': ['arquitecto', 'reformas', 'proveedor'],
        'proveedor': ['constructor', 'arquitecto', 'reformas', 'interiorista'],
        'ingeniero': ['constructor', 'arquitecto', 'promotor'],
        'promotor': ['arquitecto', 'constructor', 'ingeniero'],
        'reformas': ['interiorista', 'proveedor', 'arquitecto'],
        'paisajista': ['arquitecto', 'constructor', 'promotor']
    };

    if (typeCompatibility[userProfile.type]?.includes(candidateProfile.type)) {
        score += 40;
        reasons.push(`Colaboración natural: ${getTypeName(userProfile.type)} + ${getTypeName(candidateProfile.type)}`);
    }

    // 2. Especialidades compartidas (30 puntos)
    const sharedSpecialties = userProfile.specialties.filter(s =>
        candidateProfile.specialties.includes(s)
    );

    if (sharedSpecialties.length > 0) {
        const specialtyScore = Math.min(30, sharedSpecialties.length * 10);
        score += specialtyScore;
        reasons.push(`${sharedSpecialties.length} especialidad(es) en común: ${sharedSpecialties.map(s => getSpecialtyName(s)).join(', ')}`);
    }

    // 3. Zona geográfica (15 puntos)
    if (userProfile.location === candidateProfile.location ||
        userProfile.location === 'toda-ibiza' ||
        candidateProfile.location === 'toda-ibiza') {
        score += 15;
        reasons.push(`Trabajan en la misma zona: ${getLocationName(candidateProfile.location)}`);
    }

    // 4. Objetivos complementarios (15 puntos)
    const goalCompatibility = {
        'clientes': ['proveedores', 'colaboradores'],
        'colaboradores': ['colaboradores', 'clientes', 'subcontratas'],
        'proveedores': ['clientes', 'colaboradores'],
        'subcontratas': ['colaboradores', 'clientes'],
        'inversores': ['promotores'],
        'networking': ['networking', 'colaboradores', 'clientes']
    };

    if (goalCompatibility[userProfile.lookingFor]?.includes(candidateProfile.lookingFor)) {
        score += 15;
        reasons.push('Objetivos complementarios en el evento');
    }

    // 5. Análisis de texto de proyectos (bonus hasta 20 puntos)
    const projectKeywords = extractKeywords(userProfile.projects);
    const candidateKeywords = extractKeywords(candidateProfile.projects);
    const matchingKeywords = projectKeywords.filter(k => candidateKeywords.includes(k));

    if (matchingKeywords.length > 0) {
        const keywordScore = Math.min(20, matchingKeywords.length * 5);
        score += keywordScore;
        reasons.push(`Intereses compartidos en proyectos: ${matchingKeywords.slice(0, 3).join(', ')}`);
    }

    return {
        score: Math.min(100, score),
        reasons: reasons
    };
}

function extractKeywords(text) {
    if (!text) return [];

    const keywords = [
        'sostenible', 'lujo', 'premium', 'villa', 'moderno', 'rehabilitación',
        'eco', 'certificación', 'madera', 'piedra', 'solar', 'domótica',
        'piscina', 'jardín', 'interiorismo', 'diseño', 'construcción'
    ];

    return keywords.filter(keyword =>
        text.toLowerCase().includes(keyword)
    );
}

function getTypeName(type) {
    const names = {
        'constructor': 'Constructor',
        'arquitecto': 'Arquitecto',
        'interiorista': 'Diseñador de interiores',
        'proveedor': 'Proveedor',
        'ingeniero': 'Ingeniero',
        'promotor': 'Promotor',
        'reformas': 'Reformas',
        'paisajista': 'Paisajista'
    };
    return names[type] || type;
}

function getSpecialtyName(specialty) {
    const names = {
        'residencial': 'Residencial',
        'comercial': 'Comercial',
        'lujo': 'Lujo/Premium',
        'sostenible': 'Sostenible',
        'rehabilitacion': 'Rehabilitación',
        'obra-nueva': 'Obra nueva',
        'piscinas': 'Piscinas',
        'madera': 'Madera'
    };
    return names[specialty] || specialty;
}

function getLocationName(location) {
    const names = {
        'toda-ibiza': 'Toda Ibiza',
        'ibiza-ciudad': 'Ibiza ciudad',
        'santa-eulalia': 'Santa Eulalia',
        'san-antonio': 'San Antonio',
        'san-jose': 'San José',
        'norte': 'Norte de Ibiza'
    };
    return names[location] || location;
}

function findMatches(userProfile) {
    // Calcular score para cada perfil
    const matches = demoProfiles.map(profile => {
        const matchResult = calculateMatchScore(userProfile, profile);
        return {
            profile: profile,
            score: matchResult.score,
            reasons: matchResult.reasons
        };
    });

    // Ordenar por score descendente
    matches.sort((a, b) => b.score - a.score);

    // Filtrar matches con score mínimo de 30 y devolver top 5
    return matches
        .filter(match => match.score >= 30)
        .slice(0, 5);
}

function renderMatch(match) {
    const profile = match.profile;
    const specialtyTags = profile.specialties
        .map(s => `<span class="tag">${getSpecialtyName(s)}</span>`)
        .join('');

    return `
        <div class="match-card">
            <div class="match-score">${match.score}% Match</div>
            <h3>${profile.name}</h3>
            <div class="match-type">${getTypeName(profile.type)}</div>

            <div class="match-details">
                <strong>Zona:</strong> ${getLocationName(profile.location)}<br>
                <strong>Proyectos:</strong> ${profile.projects}<br>
                <strong>Contacto:</strong> ${profile.contact}
            </div>

            <div class="match-reason">
                <strong>💡 Por qué es un buen match:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    ${match.reasons.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>

            <div class="match-tags">
                ${specialtyTags}
            </div>
        </div>
    `;
}
