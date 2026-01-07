// AyurBot - Intelligent Chatbot for AyurSutra

class AyurBot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.currentContext = 'general';
        this.userName = null;
        this.responses = this.initializeResponses();
        this.keywordMap = this.initializeKeywordMap();
        this.fallbackResponses = [
            "I'm here to help! Could you please rephrase your question?",
            "I might not have understood that correctly. Can you ask in a different way?",
            "Let me connect you with our support team for better assistance. Call +91 9876543210",
            "For detailed information, please check our FAQ section or contact our helpline."
        ];
        
        this.init();
    }

    init() {
        this.createChatInterface();
        this.bindEvents();
        this.loadConversationHistory();
        console.log('AyurBot initialized successfully');
    }

    initializeResponses() {
        return {
            greetings: [
                "Hello! I'm AyurBot, your Ayurvedic assistant. How can I help you today?",
                "Hi there! Welcome to AyurSutra. What information can I provide for you?",
                "Namaste! I'm here to help you with any questions about our Ayurvedic treatments.",
                "Welcome! I can help you with appointments, treatments, or general information."
            ],
            
            appointments: {
                book: "To book an appointment:\n1. Visit our Hospitals page\n2. Choose a hospital and doctor\n3. Fill in your details\n4. Select preferred date and time\n5. Submit your request\n\nWould you like me to take you to the Hospitals page?",
                reschedule: "To reschedule your appointment:\n• Login to your patient dashboard\n• Go to 'Treatment Progress' section\n• Click 'Request Schedule Change'\n• Provide reason and details\n\nOr call the hospital directly for immediate assistance.",
                cancel: "To cancel an appointment, please contact the hospital directly or use your patient dashboard to request changes. Our support team at +91 9876543210 can also assist you.",
                status: "You can check your appointment status by:\n• Logging into your patient dashboard\n• Checking the 'Appointments' section\n• Or calling your assigned hospital directly"
            },
            
            treatments: {
                panchkarma: "Panchkarma includes 5 main treatments:\n\n🌬️ **Vaman** - Therapeutic vomiting for kapha disorders\n🌱 **Virechan** - Purgation therapy for pitta conditions\n💧 **Basti** - Medicated enema for vata balance\n👃 **Nasya** - Nasal administration for head/neck issues\n❤️ **Raktamokshana** - Blood purification therapy\n\nWhich treatment would you like to know more about?",
                vaman: "**Vaman (Therapeutic Vomiting)**\n\n✅ **Good for:** Asthma, allergies, obesity, skin diseases\n⏱️ **Duration:** 7-10 days\n🚫 **Avoid if:** Heart disease, pregnancy, severe weakness\n\nWould you like to book a consultation for Vaman therapy?",
                virechan: "**Virechan (Purgation Therapy)**\n\n✅ **Good for:** Liver disorders, skin diseases, diabetes, acidity\n⏱️ **Duration:** 5-7 days\n🚫 **Avoid if:** Dehydration, pregnancy, severe weakness\n\nInterested in learning more about Virechan?",
                basti: "**Basti (Medicated Enema)**\n\n✅ **Good for:** Joint pain, paralysis, constipation, neurological conditions\n⏱️ **Duration:** 8-16 days\n🚫 **Avoid if:** Acute diarrhea, rectal bleeding, fever\n\nThis is considered the most important Panchkarma treatment!",
                nasya: "**Nasya (Nasal Administration)**\n\n✅ **Good for:** Headaches, sinusitis, stress, hair problems\n⏱️ **Duration:** 3-7 days\n🚫 **Avoid if:** Nasal infection, head injury, fever\n\nGreat for mental clarity and sinus relief!",
                raktamokshana: "**Raktamokshana (Bloodletting)**\n\n✅ **Good for:** Skin diseases, inflammation, blood disorders\n⏱️ **Duration:** 1-3 sessions\n🚫 **Avoid if:** Anemia, pregnancy, blood thinners\n\nA specialized therapy for blood purification."
            },
            
            login: {
                credentials: "Login credentials are provided by:\n\n👨‍⚕️ **Patients:** Your doctor or hospital admin after appointment confirmation\n🏥 **Doctors:** Hospital administration during onboarding\n🔧 **Admins:** System administrator\n\nIf you haven't received your credentials, contact your hospital or our support team.",
                forgot: "If you forgot your login details:\n1. Contact your assigned hospital\n2. Speak with your doctor or admin\n3. Call our support: +91 9876543210\n4. Visit the hospital in person with ID proof\n\nWe'll help you recover your access quickly!",
                issues: "Having login troubles?\n• Check if Caps Lock is on\n• Ensure correct role is selected\n• Try refreshing the page\n• Clear browser cache\n• Contact support if issues persist"
            },
            
            support: {
                hours: "Our support is available:\n📞 **Phone:** 24/7 helpline at +91 9876543210\n💬 **Chat:** I'm always here to help!\n📧 **Email:** info@ayursutra.com\n🏥 **Hospital:** Direct contact during operating hours",
                emergency: "For medical emergencies:\n🚨 **Immediate:** Call 108 or visit nearest emergency room\n📞 **Non-urgent:** Contact your assigned hospital\n💬 **General queries:** I'm here to help anytime!\n\nYour health is our priority!",
                contact: "Contact AyurSutra:\n📞 Phone: +91 9876543210\n📧 Email: info@ayursutra.com\n🌐 Website: www.ayursutra.com\n\n🏥 For treatment-related queries, contact your assigned hospital directly."
            },
            
            general: {
                about: "AyurSutra connects you with authentic Ayurvedic healthcare:\n\n🌿 **Traditional treatments** with modern management\n🏥 **Partner hospitals** across India\n👨‍⚕️ **Qualified practitioners** and doctors\n📱 **Easy scheduling** and progress tracking\n🔄 **Complete treatment** cycle management\n\nExperience the wisdom of Ayurveda!",
                safety: "Your safety is paramount:\n✅ Only qualified Ayurvedic practitioners\n✅ Sterile equipment and procedures\n✅ Personalized treatment plans\n✅ Continuous monitoring during treatment\n✅ Emergency support available\n\nAll our partner hospitals maintain high safety standards.",
                cost: "Treatment costs vary based on:\n• Type of therapy needed\n• Duration of treatment\n• Hospital location\n• Additional services\n\nFor specific pricing, please contact the hospital directly or book a consultation to discuss your needs."
            }
        };
    }

    initializeKeywordMap() {
        return {
            // // Greetings
            // ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening']: 'greetings',
            
            // // Appointments
            // ['book appointment', 'schedule', 'appointment', 'book', 'reserve']: 'appointments.book',
            // ['reschedule', 'change appointment', 'modify booking']: 'appointments.reschedule',
            // ['cancel appointment', 'cancel booking']: 'appointments.cancel',
            // ['appointment status', 'booking status']: 'appointments.status',
            
            // // Treatments
            // ['panchkarma', 'treatments', 'therapy', 'ayurvedic treatment']: 'treatments.panchkarma',
            // ['vaman', 'vomiting therapy', 'emesis']: 'treatments.vaman',
            // ['virechan', 'purgation', 'purging']: 'treatments.virechan',
            // ['basti', 'enema', 'medicated enema']: 'treatments.basti',
            // ['nasya', 'nasal', 'nasal drops']: 'treatments.nasya',
            // ['raktamokshana', 'bloodletting', 'blood purification']: 'treatments.raktamokshana',
            
            // // Login
            // ['login', 'sign in', 'credentials', 'password', 'username']: 'login.credentials',
            // ['forgot password', 'reset password', 'forgot login']: 'login.forgot',
            // ['login problem', 'cannot login', 'login error']: 'login.issues',
            
            // // Support
            // ['support', 'help', 'assistance', 'contact', 'phone']: 'support.contact',
            // ['emergency', 'urgent', 'immediate help']: 'support.emergency',
            // ['hours', 'time', 'available', 'open']: 'support.hours',
            
            // // General
            // ['about', 'ayursutra', 'information', 'what is']: 'general.about',
            // ['safe', 'safety', 'secure', 'risk']: 'general.safety',
            // ['cost', 'price', 'fee', 'charges', 'expensive']: 'general.cost'
        };
    }

    createChatInterface() {
        // Chat interface is already created in HTML
        // This method handles any dynamic interface updates
        this.updateNotificationBadge();
    }

    bindEvents() {
        // Chat input event listener
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleUserMessage();
                }
            });
        }

        // Send button event listener  
        const sendButton = document.querySelector('.chat-input button');
        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.handleUserMessage();
            });
        }
    }

    toggleChat() {
        const chatbot = document.getElementById('chatbot');
        const chatBody = document.getElementById('chatbotBody');
        
        if (this.isOpen) {
            chatBody.style.display = 'none';
            chatbot.classList.remove('active');
            this.isOpen = false;
        } else {
            chatBody.style.display = 'flex';
            chatbot.classList.add('active');
            this.isOpen = true;
            this.clearNotificationBadge();
            this.scrollToBottom();
        }
    }

    handleUserMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        chatInput.value = '';
        
        // Process and respond
        setTimeout(() => {
            const response = this.processMessage(message);
            this.addMessage(response, 'bot');
            this.scrollToBottom();
        }, 500);
        
        // Store in conversation history
        this.conversationHistory.push({
            user: message,
            bot: response,
            timestamp: new Date()
        });
        
        this.saveConversationHistory();
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase().trim();
        
        // Check for greetings first
        if (this.isGreeting(lowerMessage)) {
            return this.getRandomResponse(this.responses.greetings);
        }
        
        // Find matching response
        for (const [keywords, responsePath] of Object.entries(this.keywordMap)) {
            for (const keyword of keywords) {
                if (lowerMessage.includes(keyword)) {
                    return this.getResponseByPath(responsePath);
                }
            }
        }
        
        // Contextual responses based on current page
        const contextualResponse = this.getContextualResponse(lowerMessage);
        if (contextualResponse) return contextualResponse;
        
        // Return fallback response
        return this.getRandomResponse(this.fallbackResponses);
    }

    isGreeting(message) {
        const greetings = ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening'];
        return greetings.some(greeting => message.includes(greeting));
    }

    getResponseByPath(path) {
        const parts = path.split('.');
        let response = this.responses;
        
        for (const part of parts) {
            response = response[part];
            if (!response) break;
        }
        
        if (typeof response === 'string') {
            return response;
        } else if (Array.isArray(response)) {
            return this.getRandomResponse(response);
        }
        
        return this.getRandomResponse(this.fallbackResponses);
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getContextualResponse(message) {
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('hospitals') && message.includes('book')) {
            return "I see you're on the Hospitals page! To book an appointment:\n1. Select a hospital\n2. Choose a doctor\n3. Click 'Book Appointment'\n4. Fill in your details\n\nNeed help finding the right treatment?";
        }
        
        if (currentPage.includes('login') && (message.includes('login') || message.includes('password'))) {
            return "Having trouble logging in?\n• Make sure you select the correct role (Patient/Doctor/Admin)\n• Check your credentials with your hospital\n• Try refreshing the page\n\nCredentials are provided by your hospital after appointment confirmation.";
        }
        
        if (currentPage.includes('faq')) {
            return "You're on our FAQ page! Use the search box above to find specific answers, or browse by category. If you can't find what you're looking for, I'm here to help!";
        }
        
        return null;
    }

    addMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `<p>${this.formatMessage(message)}</p>`;
        } else {
            messageDiv.innerHTML = `<p>${message}</p>`;
        }
        
        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(message) {
        // Format message with basic markdown-like syntax
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/• /g, '&bull; ');
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    updateNotificationBadge() {
        const badge = document.getElementById('chatNotification');
        if (badge && !this.isOpen) {
            badge.style.display = 'block';
            badge.textContent = '1';
        }
    }

    clearNotificationBadge() {
        const badge = document.getElementById('chatNotification');
        if (badge) {
            badge.style.display = 'none';
        }
    }

    saveConversationHistory() {
        try {
            localStorage.setItem('ayurbot_history', JSON.stringify(this.conversationHistory.slice(-20))); // Keep last 20 messages
        } catch (e) {
            console.error('Could not save conversation history:', e);
        }
    }

    loadConversationHistory() {
        try {
            const history = localStorage.getItem('ayurbot_history');
            if (history) {
                this.conversationHistory = JSON.parse(history);
            }
        } catch (e) {
            console.error('Could not load conversation history:', e);
        }
    }

    // Quick action methods
    showHospitals() {
        window.location.href = 'hospitals.html';
    }

    showFAQ() {
        window.location.href = 'faq.html';
    }

    callSupport() {
        window.location.href = 'tel:+919876543210';
    }

    // Method to add quick action buttons to responses
    addQuickActions(message, actions) {
        let buttonsHtml = '<div class="quick-actions">';
        actions.forEach(action => {
            buttonsHtml += `<button class="quick-action-btn" onclick="ayurBot.${action.method}()">${action.text}</button>`;
        });
        buttonsHtml += '</div>';
        
        return message + buttonsHtml;
    }
}

// Global functions for HTML onclick events
function toggleChat() {
    if (window.ayurBot) {
        window.ayurBot.toggleChat();
    }
}

function sendMessage() {
    if (window.ayurBot) {
        window.ayurBot.handleUserMessage();
    }
}

// Initialize AyurBot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.ayurBot = new AyurBot();
    
    // Add initial greeting with delay for better UX
    setTimeout(() => {
        if (window.ayurBot) {
            window.ayurBot.updateNotificationBadge();
        }
    }, 2000);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AyurBot;
}