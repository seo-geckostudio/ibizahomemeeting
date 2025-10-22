// Motor del chatbot con matching de preguntas y respuestas

function findBestMatch(userMessage) {
    const normalizedMessage = userMessage.toLowerCase().trim();

    // 1. Revisar respuestas genéricas primero
    for (const [key, topic] of Object.entries(genericTopics)) {
        if (topic.keywords.some(keyword => normalizedMessage.includes(keyword))) {
            return {
                type: 'generic',
                answer: topic.response,
                confidence: 0.9
            };
        }
    }

    // 2. Buscar en la base de conocimiento
    let bestMatch = null;
    let bestScore = 0;

    knowledgeBase.forEach(item => {
        let score = 0;
        const keywordMatches = [];

        // Contar keywords que coinciden
        item.keywords.forEach(keyword => {
            if (normalizedMessage.includes(keyword)) {
                score += 1;
                keywordMatches.push(keyword);
            }
        });

        // Bonus por pregunta similar
        if (item.question && normalizedMessage.includes(item.question.toLowerCase().substring(0, 15))) {
            score += 2;
        }

        if (score > bestScore) {
            bestScore = score;
            bestMatch = {
                type: 'knowledge',
                answer: item.answer,
                question: item.question,
                confidence: Math.min(score / item.keywords.length, 1),
                matchedKeywords: keywordMatches
            };
        }
    });

    // 3. Si hay una coincidencia razonable, devolverla
    if (bestMatch && bestScore >= 1) {
        return bestMatch;
    }

    // 4. Si no hay coincidencia, respuesta por defecto
    return {
        type: 'fallback',
        answer: generateFallbackResponse(normalizedMessage),
        confidence: 0
    };
}

function generateFallbackResponse(message) {
    const suggestions = [
        '¿Qué es el PTI?',
        '¿Qué permisos necesito para construir?',
        '¿Cómo certificar un edificio sostenible?',
        '¿Puedo construir en suelo rústico?'
    ];

    let response = `No tengo información específica sobre eso, pero puedo ayudarte con temas como:

- Plan Territorial de Ibiza (PTI)
- Permisos y licencias de construcción
- Certificaciones sostenibles
- Normativa para suelo rústico
- Regulación de piscinas
- Áreas protegidas (ANEI)
- Patrimonio (Dalt Vila)
- Alquiler turístico

¿Quieres que te explique alguno de estos temas?`;

    return response;
}

function formatResponse(match) {
    let formattedAnswer = match.answer;

    // Asegurar saltos de línea correctos
    formattedAnswer = formattedAnswer.replace(/\n\n/g, '<br><br>');
    formattedAnswer = formattedAnswer.replace(/\n/g, '<br>');

    // Formatear negritas
    formattedAnswer = formattedAnswer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return formattedAnswer;
}

function analyzeSentiment(message) {
    const urgentWords = ['urgente', 'rápido', 'ya', 'inmediato'];
    const confusedWords = ['no entiendo', 'confuso', 'complicado', 'difícil'];

    const normalized = message.toLowerCase();

    if (urgentWords.some(word => normalized.includes(word))) {
        return 'urgent';
    }

    if (confusedWords.some(word => normalized.includes(word))) {
        return 'confused';
    }

    return 'normal';
}

function getSentimentResponse(sentiment) {
    const responses = {
        urgent: 'Entiendo que es urgente. ',
        confused: 'Déjame explicártelo de forma más clara. ',
        normal: ''
    };

    return responses[sentiment] || '';
}

// Generar sugerencias relacionadas
function generateRelatedQuestions(match) {
    if (!match || match.type === 'fallback') {
        return [];
    }

    const related = [];
    const currentKeywords = match.matchedKeywords || [];

    // Buscar preguntas relacionadas
    knowledgeBase.forEach(item => {
        if (item.question === match.question) return; // Skip current

        const hasRelated = item.keywords.some(keyword =>
            currentKeywords.includes(keyword)
        );

        if (hasRelated && related.length < 3) {
            related.push(item.question);
        }
    });

    return related;
}

// Funciones de utilidad
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
