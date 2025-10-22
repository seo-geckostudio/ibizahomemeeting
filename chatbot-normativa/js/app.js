// Aplicación principal del chatbot

let messageCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
});

function initializeChat() {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('message-input');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = input.value.trim();

        if (message) {
            sendMessage(message);
            input.value = '';
        }
    });

    // Auto-focus en el input
    input.focus();
}

function sendMessage(message) {
    // Añadir mensaje del usuario
    addMessage(message, 'user');

    // Ocultar sugerencias
    hideSuggestions();

    // Mostrar indicador de escritura
    showTyping();

    // Simular delay de procesamiento (1-2 segundos)
    setTimeout(() => {
        const match = findBestMatch(message);
        const sentiment = analyzeSentiment(message);
        const sentimentPrefix = getSentimentResponse(sentiment);

        let response = sentimentPrefix + formatResponse(match);

        // Añadir preguntas relacionadas si aplica
        const related = generateRelatedQuestions(match);
        if (related.length > 0) {
            response += '<br><br><strong>También podrías preguntar:</strong><br>';
            related.forEach(q => {
                response += `• ${q}<br>`;
            });
        }

        hideTyping();
        addMessage(response, 'bot');

        messageCount++;
    }, 1000 + Math.random() * 1000);
}

function addMessage(text, sender) {
    const container = document.getElementById('messages-container');
    const time = getCurrentTime();

    const messageHTML = `
        <div class="message ${sender}-message">
            <div class="message-avatar">${sender === 'bot' ? '🤖' : '👤'}</div>
            <div class="message-content">
                <div class="message-text">${sender === 'user' ? escapeHtml(text) : text}</div>
                <div class="message-time">${time}</div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

function showTyping() {
    document.getElementById('typing-indicator').style.display = 'block';
    scrollToBottom();
}

function hideTyping() {
    document.getElementById('typing-indicator').style.display = 'none';
}

function scrollToBottom() {
    const container = document.getElementById('messages-container');
    container.scrollTop = container.scrollHeight;
}

function hideSuggestions() {
    const suggestions = document.getElementById('suggestions-area');
    if (suggestions) {
        suggestions.classList.add('hidden');
    }
}

function askQuickQuestion(question) {
    document.getElementById('message-input').value = question;
    sendMessage(question);
}

function clearChat() {
    const container = document.getElementById('messages-container');

    // Confirmar
    if (messageCount > 0) {
        if (!confirm('¿Estás seguro de que quieres limpiar el chat?')) {
            return;
        }
    }

    // Limpiar todos los mensajes excepto el de bienvenida
    const messages = container.querySelectorAll('.message');
    messages.forEach((msg, index) => {
        if (index > 0) { // Mantener primer mensaje (bienvenida)
            msg.remove();
        }
    });

    messageCount = 0;

    // Mostrar sugerencias de nuevo
    const suggestions = document.getElementById('suggestions-area');
    if (suggestions) {
        suggestions.classList.remove('hidden');
    }
}

// Demo rápida
function quickDemo() {
    console.log('Iniciando demo del chatbot...');

    const demoQuestions = [
        '¿Qué es el PTI?',
        'Necesito información sobre permisos',
        '¿Puedo construir una piscina?',
        'Gracias!'
    ];

    let delay = 1000;
    demoQuestions.forEach((question, index) => {
        setTimeout(() => {
            document.getElementById('message-input').value = question;
            sendMessage(question);
        }, delay);
        delay += 4000; // 4 segundos entre preguntas
    });
}

// Hacer disponible en consola
window.quickDemo = quickDemo;

console.log('%c📋 Chatbot Normativa Ibiza - Gecko Studio', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cPrueba rápida: quickDemo()', 'color: #999;');
console.log('%cBase de conocimiento con ' + knowledgeBase.length + ' temas principales', 'color: #666;');
