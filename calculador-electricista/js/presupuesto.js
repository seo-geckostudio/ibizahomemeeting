// Generador de presupuesto profesional

function generarPresupuesto(datos, calculos) {
    const calidad = datos.quality;
    let totalMateriales = 0;
    const materialesPorCategoria = {};

    // Agrupar materiales por categoría
    calculos.materials.forEach(mat => {
        const precio = getPrecioMaterial(mat.item, calidad);
        const subtotal = precio * mat.cantidad;
        totalMateriales += subtotal;

        if (!materialesPorCategoria[mat.categoria]) {
            materialesPorCategoria[mat.categoria] = [];
        }

        materialesPorCategoria[mat.categoria].push({
            descripcion: mat.descripcion || mat.item.nombre,
            cantidad: mat.cantidad,
            precio: precio,
            subtotal: subtotal
        });
    });

    // Aplicar margen a materiales
    const margenMateriales = parseFloat(datos.markup) / 100;
    const totalMaterialesConMargen = totalMateriales * (1 + margenMateriales);

    // Calcular mano de obra
    const tarifaHora = parseFloat(datos.hourlyRate);
    const totalManoObra = calculos.horasTrabajo * tarifaHora;

    // Otros conceptos
    const gestionPermisos = 180; // Boletín, permisos, etc.
    const desplazamientos = 120; // Desplazamientos en Ibiza

    // Totales
    const subtotal = totalMaterialesConMargen + totalManoObra + gestionPermisos + desplazamientos;
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    return {
        materialesPorCategoria,
        totalMateriales,
        margenMateriales: totalMateriales * margenMateriales,
        totalMaterialesConMargen,
        horasTrabajo: calculos.horasTrabajo,
        tarifaHora,
        totalManoObra,
        gestionPermisos,
        desplazamientos,
        subtotal,
        iva,
        total
    };
}

function renderPresupuesto(presupuesto) {
    let html = '<div class="budget-section"><h3>📋 Materiales por Categoría</h3>';

    Object.keys(presupuesto.materialesPorCategoria).forEach(categoria => {
        html += `<h4 style="color: #666; margin: 20px 0 10px;">${categoria}</h4>`;
        html += '<table class="budget-table"><thead><tr>';
        html += '<th>Descripción</th><th class="qty">Cantidad</th><th class="price">Precio</th><th class="total">Subtotal</th>';
        html += '</tr></thead><tbody>';

        presupuesto.materialesPorCategoria[categoria].forEach(item => {
            const unidad = item.cantidad % 1 === 0 ? 'ud' : 'm';
            html += `<tr>
                <td>${item.descripcion}</td>
                <td class="qty">${item.cantidad.toFixed(item.cantidad < 10 ? 0 : 0)} ${unidad}</td>
                <td class="price">${formatCurrency(item.precio)}</td>
                <td class="total">${formatCurrency(item.subtotal)}</td>
            </tr>`;
        });

        html += '</tbody></table>';
    });

    html += '</div><div class="budget-section"><h3>💰 Resumen del Presupuesto</h3>';
    html += '<div class="budget-summary">';
    html += `<div class="summary-line"><span>Total Materiales (PVP)</span><span>${formatCurrency(presupuesto.totalMateriales)}</span></div>`;
    html += `<div class="summary-line"><span>Margen Materiales (${parseFloat(currentData.markup)}%)</span><span>${formatCurrency(presupuesto.margenMateriales)}</span></div>`;
    html += `<div class="summary-line"><span>Mano de Obra (${presupuesto.horasTrabajo}h × ${formatCurrency(presupuesto.tarifaHora)})</span><span>${formatCurrency(presupuesto.totalManoObra)}</span></div>`;
    html += `<div class="summary-line"><span>Gestión y Permisos (Boletín)</span><span>${formatCurrency(presupuesto.gestionPermisos)}</span></div>`;
    html += `<div class="summary-line"><span>Desplazamientos</span><span>${formatCurrency(presupuesto.desplazamientos)}</span></div>`;
    html += `<div class="summary-line" style="border-top: 2px solid #ddd; padding-top: 10px; margin-top: 10px;"><span><strong>Subtotal</strong></span><span><strong>${formatCurrency(presupuesto.subtotal)}</strong></span></div>`;
    html += `<div class="summary-line"><span>IVA (21%)</span><span>${formatCurrency(presupuesto.iva)}</span></div>`;
    html += `<div class="summary-line total"><span>TOTAL PRESUPUESTO</span><span>${formatCurrency(presupuesto.total)}</span></div>`;
    html += '</div></div>';

    html += '<div class="budget-section"><h3>📝 Condiciones</h3>';
    html += '<ul style="line-height: 1.8; color: #666;">';
    html += '<li>Validez del presupuesto: 30 días</li>';
    html += '<li>Forma de pago: 40% al inicio, 40% durante ejecución, 20% a la entrega</li>';
    html += '<li>Plazo de ejecución: ' + Math.ceil(presupuesto.horasTrabajo / 8) + ' días laborables</li>';
    html += '<li>Incluye boletín eléctrico y legalización ante organismo competente</li>';
    html += '<li>Garantía de instalación: 2 años</li>';
    html += '<li>No incluye: obra civil, pinturas ni acabados</li>';
    html += '</ul></div>';

    return html;
}
