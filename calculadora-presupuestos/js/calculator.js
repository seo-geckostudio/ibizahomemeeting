// Lógica de cálculo de presupuestos

function calculateBudget(projectData) {
    const {
        projectType,
        propertyType,
        surface,
        location,
        quality,
        features,
        currentState,
        description
    } = projectData;

    // 1. Coste base
    let basePrice = basePrices[projectType][quality];
    let baseCost = 0;

    if (projectType === 'piscina') {
        // Para piscinas, precio fijo
        baseCost = basePrice;
    } else {
        // Para otros, precio por m²
        baseCost = basePrice * surface;
    }

    // 2. Aplicar multiplicador de ubicación
    const locationMult = locationMultipliers[location] || 1.0;
    baseCost *= locationMult;

    // 3. Aplicar multiplicador de tipo de inmueble
    if (projectType !== 'piscina' && projectType !== 'jardin') {
        const propertyMult = propertyMultipliers[propertyType] || 1.0;
        baseCost *= propertyMult;
    }

    // 4. Aplicar multiplicador por estado (solo reformas)
    if (projectType.includes('reforma') && currentState) {
        const stateMult = currentStateMultipliers[currentState] || 1.0;
        baseCost *= stateMult;
    }

    // 5. Añadir costes de características especiales
    let featuresCost = 0;
    const featuresList = [];

    features.forEach(feature => {
        if (featureCosts[feature]) {
            let cost = featureCosts[feature][quality];

            // Para jardín, calcular según superficie
            if (feature === 'jardin') {
                const gardenSurface = Math.floor(surface * 0.3); // Asumimos 30% de la superficie
                cost = cost * gardenSurface;
                featuresList.push({
                    name: `Jardín diseñado (${gardenSurface}m²)`,
                    cost: cost
                });
            } else if (feature === 'piscina' && projectType !== 'piscina') {
                featuresList.push({
                    name: 'Piscina',
                    cost: cost
                });
            } else {
                const featureNames = {
                    'domotica': 'Domótica',
                    'solar': 'Paneles solares',
                    'climatizacion': 'Climatización premium',
                    'cocina-lujo': 'Cocina de lujo',
                    'banos-extra': 'Baño adicional',
                    'garaje': 'Garaje/Aparcamiento'
                };
                featuresList.push({
                    name: featureNames[feature] || feature,
                    cost: cost
                });
            }

            featuresCost += cost;
        }
    });

    // 6. Coste total
    const totalCost = baseCost + featuresCost;

    // 7. Rango de variación (±15%)
    const minCost = Math.floor(totalCost * 0.85);
    const maxCost = Math.floor(totalCost * 1.15);

    // 8. Calcular duración
    const duration = calculateDuration(projectType, surface, features);

    // 9. Desglose por categorías
    const breakdown = calculateBreakdown(projectType, totalCost);

    // 10. Fases del proyecto
    const phases = calculatePhases(projectType, duration);

    return {
        baseCost: Math.floor(baseCost),
        featuresCost: Math.floor(featuresCost),
        totalCost: Math.floor(totalCost),
        minCost: minCost,
        maxCost: maxCost,
        costPerSqm: projectType !== 'piscina' ? Math.floor(totalCost / surface) : 0,
        duration: duration,
        breakdown: breakdown,
        phases: phases,
        featuresList: featuresList,
        surface: surface
    };
}

function calculateDuration(projectType, surface, features) {
    const durationData = projectDurations[projectType];
    let months = durationData.base;

    // Añadir tiempo según superficie
    months += surface * durationData.perSqm;

    // Añadir tiempo por características especiales
    if (features.includes('piscina')) months += 2;
    if (features.includes('jardin')) months += 0.5;
    if (features.includes('domotica')) months += 1;

    // Redondear a 0.5 meses
    months = Math.ceil(months * 2) / 2;

    return {
        months: months,
        formatted: formatDuration(months)
    };
}

function formatDuration(months) {
    if (months < 1) {
        return `${Math.ceil(months * 4)} semanas`;
    } else if (months === 1) {
        return '1 mes';
    } else if (months < 12) {
        const fullMonths = Math.floor(months);
        const weeks = Math.round((months - fullMonths) * 4);
        if (weeks > 0) {
            return `${fullMonths} meses y ${weeks} semanas`;
        }
        return `${fullMonths} meses`;
    } else {
        const years = Math.floor(months / 12);
        const remainingMonths = Math.floor(months % 12);
        if (remainingMonths > 0) {
            return `${years} año${years > 1 ? 's' : ''} y ${remainingMonths} meses`;
        }
        return `${years} año${years > 1 ? 's' : ''}`;
    }
}

function calculateBreakdown(projectType, totalCost) {
    const categories = categoryBreakdown[projectType];
    const breakdown = [];

    for (const [key, data] of Object.entries(categories)) {
        const cost = Math.floor(totalCost * (data.percentage / 100));
        breakdown.push({
            category: key,
            name: getCategoryName(key),
            cost: cost,
            percentage: data.percentage,
            description: data.description
        });
    }

    return breakdown;
}

function getCategoryName(key) {
    const names = {
        'estructura': 'Estructura',
        'albanileria': 'Albañilería',
        'instalaciones': 'Instalaciones',
        'carpinteria': 'Carpintería',
        'acabados': 'Acabados',
        'otros': 'Otros conceptos',
        'demolicion': 'Demolición',
        'trabajos-obra': 'Trabajos de obra',
        'cerramientos': 'Cerramientos',
        'consolidacion': 'Consolidación',
        'restauracion': 'Restauración',
        'excavacion': 'Excavación',
        'preparacion': 'Preparación',
        'plantacion': 'Plantación',
        'riego': 'Sistema de riego',
        'elementos': 'Elementos decorativos',
        'ampliacion': 'Ampliación'
    };
    return names[key] || key;
}

function calculatePhases(projectType, duration) {
    const phasesList = projectPhases[projectType];
    const phases = [];

    phasesList.forEach((phase, index) => {
        const phaseDuration = duration.months * (phase.percentage / 100);
        phases.push({
            number: index + 1,
            name: phase.name,
            duration: formatDuration(phaseDuration)
        });
    });

    return phases;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('es-ES').format(number);
}
