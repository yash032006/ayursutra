// Treatment information system for Panchkarma therapies

// Treatment data
const TREATMENTS = {
    vaman: {
        name: 'Vaman (Therapeutic Vomiting)',
        icon: 'fas fa-wind',
        description: 'Vaman is a controlled therapeutic vomiting procedure that eliminates excess kapha dosha from the respiratory and digestive systems.',
        benefits: [
            'Eliminates excess mucus from respiratory system',
            'Treats bronchial asthma and chronic cough',
            'Improves digestion and metabolism',
            'Reduces allergic reactions',
            'Helps in weight management',
            'Enhances immune system function'
        ],
        process: [
            'Pre-treatment preparation (Poorva Karma) - 3-7 days',
            'Oleation therapy with medicated ghee',
            'Steam therapy (Swedana) to prepare the body',
            'Administration of emetic medicines',
            'Controlled vomiting under medical supervision',
            'Post-treatment care and dietary guidelines'
        ],
        duration: '7-10 days',
        suitableFor: [
            'Respiratory disorders (Asthma, Bronchitis)',
            'Skin diseases and allergies',
            'Digestive disorders',
            'Obesity and metabolic disorders',
            'Chronic headaches and migraines',
            'Psychological disorders related to kapha'
        ],
        contraindications: [
            'Heart diseases',
            'Pregnancy',
            'Age below 12 and above 70',
            'Severe weakness',
            'Acute fever',
            'Recent surgery'
        ],
        precautions: [
            'Strict dietary restrictions during treatment',
            'Avoid physical exertion',
            'Follow prescribed medication schedule',
            'Regular monitoring by qualified physician',
            'Maintain proper hygiene',
            'Avoid cold and heavy foods'
        ]
    },
    virechan: {
        name: 'Virechan (Purgation Therapy)',
        icon: 'fas fa-seedling',
        description: 'Virechan is a medicated purgation therapy that removes excess pitta dosha from the liver, gallbladder, and digestive system.',
        benefits: [
            'Detoxifies liver and digestive system',
            'Treats skin diseases and inflammation',
            'Balances metabolism and improves digestion',
            'Reduces acidity and gastritis',
            'Helps in treating diabetes',
            'Improves mental clarity and focus'
        ],
        process: [
            'Pre-treatment oleation for 3-5 days',
            'Internal administration of medicated ghee',
            'Steam therapy to enhance drug absorption',
            'Administration of purgative medicines',
            'Controlled bowel evacuation',
            'Post-treatment rehabilitation and diet'
        ],
        duration: '5-7 days',
        suitableFor: [
            'Liver disorders and jaundice',
            'Skin diseases (Psoriasis, Eczema)',
            'Digestive disorders and constipation',
            'Diabetes and metabolic syndrome',
            'Inflammatory conditions',
            'Chronic fever and infections'
        ],
        contraindications: [
            'Severe dehydration',
            'Pregnancy and menstruation',
            'Acute diarrhea',
            'Severe weakness',
            'Heart conditions',
            'Age extremes (very young or old)'
        ],
        precautions: [
            'Maintain adequate hydration',
            'Follow prescribed dietary guidelines',
            'Avoid spicy and oily foods',
            'Rest and avoid stress',
            'Monitor electrolyte balance',
            'Regular medical supervision'
        ]
    },
    basti: {
        name: 'Basti (Medicated Enema)',
        icon: 'fas fa-tint',
        description: 'Basti is a medicated enema therapy that balances vata dosha and cleanses the colon, considered the most important among Panchkarma treatments.',
        benefits: [
            'Balances vata dosha effectively',
            'Strengthens nervous system',
            'Improves joint mobility and reduces pain',
            'Enhances reproductive health',
            'Treats paralysis and neurological disorders',
            'Promotes longevity and vitality'
        ],
        process: [
            'Assessment of patient constitution',
            'Preparation of medicated enema solutions',
            'Pre-treatment oleation if required',
            'Administration of medicated enema',
            'Retention for specified duration',
            'Post-treatment monitoring and care'
        ],
        duration: '8-16 days',
        suitableFor: [
            'Joint disorders and arthritis',
            'Neurological conditions',
            'Paralysis and muscle weakness',
            'Chronic constipation',
            'Reproductive system disorders',
            'Mental health conditions'
        ],
        contraindications: [
            'Acute diarrhea and dysentery',
            'Rectal bleeding or tumors',
            'Severe dehydration',
            'Pregnancy (certain types)',
            'Acute fever',
            'Recent abdominal surgery'
        ],
        precautions: [
            'Use only prescribed medications',
            'Maintain proper hygiene',
            'Follow specific dietary restrictions',
            'Avoid excessive physical activity',
            'Regular monitoring of vital signs',
            'Proper positioning during treatment'
        ]
    },
    nasya: {
        name: 'Nasya (Nasal Administration)',
        icon: 'fas fa-lungs',
        description: 'Nasya is the administration of medicated substances through the nasal passages to treat disorders of the head and neck region.',
        benefits: [
            'Clears sinuses and nasal passages',
            'Treats headaches and migraines',
            'Improves mental clarity and concentration',
            'Strengthens sensory organs',
            'Prevents premature graying and hair loss',
            'Enhances voice quality'
        ],
        process: [
            'Patient positioning in supine position',
            'Gentle massage of head and neck',
            'Steam application to face and head',
            'Instillation of medicated drops/oils',
            'Gentle massage after administration',
            'Post-treatment rest and observation'
        ],
        duration: '3-7 days',
        suitableFor: [
            'Chronic sinusitis and rhinitis',
            'Headaches and migraines',
            'Cervical spondylosis',
            'Mental disorders and stress',
            'Hair and scalp disorders',
            'ENT (Ear, Nose, Throat) conditions'
        ],
        contraindications: [
            'Acute sinusitis with infection',
            'Nasal polyps or tumors',
            'Recent head injury',
            'Pregnancy',
            'Acute fever',
            'Severe hypertension'
        ],
        precautions: [
            'Use sterile instruments and medications',
            'Proper patient positioning',
            'Avoid cold exposure after treatment',
            'Monitor for adverse reactions',
            'Maintain nasal hygiene',
            'Follow up care as prescribed'
        ]
    },
    raktamokshana: {
        name: 'Raktamokshana (Bloodletting)',
        icon: 'fas fa-heart',
        description: 'Raktamokshana is a blood purification therapy that removes impure blood to treat various blood-related disorders.',
        benefits: [
            'Purifies blood and removes toxins',
            'Treats skin diseases effectively',
            'Reduces inflammation and swelling',
            'Improves circulation',
            'Treats localized disorders',
            'Balances pitta dosha'
        ],
        process: [
            'Patient assessment and selection',
            'Preparation of treatment site',
            'Application of leeches or surgical methods',
            'Controlled blood removal',
            'Post-treatment wound care',
            'Monitoring and follow-up'
        ],
        duration: '1-3 sessions',
        suitableFor: [
            'Chronic skin diseases',
            'Localized inflammation',
            'Varicose veins',
            'Gout and joint swelling',
            'Certain blood disorders',
            'Localized infections'
        ],
        contraindications: [
            'Anemia and blood disorders',
            'Pregnancy and menstruation',
            'Severe weakness',
            'Heart conditions',
            'Use of blood thinners',
            'Infectious diseases'
        ],
        precautions: [
            'Strict sterile conditions',
            'Experienced practitioner only',
            'Pre-treatment blood tests',
            'Post-treatment infection prevention',
            'Proper nutrition and rest',
            'Regular monitoring of healing'
        ]
    }
};

// Open treatment modal
function openTreatmentModal(treatmentId) {
    const treatment = TREATMENTS[treatmentId];
    if (!treatment) {
        console.error('Treatment not found:', treatmentId);
        return;
    }

    const modal = document.getElementById('treatmentModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = generateTreatmentContent(treatment);
    modal.style.display = 'block';
    
    // Add fade-in animation
    setTimeout(() => {
        modal.classList.add('fade-in');
    }, 10);
}

// Close treatment modal
function closeTreatmentModal() {
    const modal = document.getElementById('treatmentModal');
    modal.style.display = 'none';
    modal.classList.remove('fade-in');
}

// Generate treatment content HTML
function generateTreatmentContent(treatment) {
    return `
        <div class="treatment-detail-content">
            <div class="treatment-header">
                <div class="treatment-icon-large">
                    <i class="${treatment.icon}"></i>
                </div>
                <h2>${treatment.name}</h2>
                <p class="treatment-description">${treatment.description}</p>
            </div>

            <div class="treatment-tabs">
                <button class="tab-btn active" onclick="showTreatmentTab('overview-${Date.now()}')">Overview</button>
                <button class="tab-btn" onclick="showTreatmentTab('process-${Date.now()}')">Process</button>
                <button class="tab-btn" onclick="showTreatmentTab('precautions-${Date.now()}')">Safety</button>
            </div>

            <div class="treatment-tab-content">
                <div id="overview-${Date.now()}" class="tab-content active">
                    <div class="treatment-info-grid">
                        <div class="info-card">
                            <h4><i class="fas fa-clock"></i> Duration</h4>
                            <p>${treatment.duration}</p>
                        </div>
                        
                        <div class="info-section">
                            <h4><i class="fas fa-heart-pulse"></i> Health Benefits</h4>
                            <ul class="benefits-list">
                                ${treatment.benefits.map(benefit => `<li><i class="fas fa-check"></i> ${benefit}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="info-section">
                            <h4><i class="fas fa-user-check"></i> Suitable For</h4>
                            <ul class="suitable-list">
                                ${treatment.suitableFor.map(condition => `<li><i class="fas fa-arrow-right"></i> ${condition}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="process-${Date.now()}" class="tab-content">
                    <div class="process-timeline">
                        <h4><i class="fas fa-list-ol"></i> Treatment Process</h4>
                        <ol class="process-steps">
                            ${treatment.process.map((step, index) => `
                                <li class="process-step">
                                    <div class="step-number">${index + 1}</div>
                                    <div class="step-content">${step}</div>
                                </li>
                            `).join('')}
                        </ol>
                    </div>
                </div>

                <div id="precautions-${Date.now()}" class="tab-content">
                    <div class="safety-info">
                        <div class="contraindications">
                            <h4><i class="fas fa-exclamation-triangle"></i> Contraindications</h4>
                            <ul class="warning-list">
                                ${treatment.contraindications.map(item => `<li><i class="fas fa-times-circle"></i> ${item}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="precautions">
                            <h4><i class="fas fa-shield-alt"></i> Precautions</h4>
                            <ul class="precaution-list">
                                ${treatment.precautions.map(item => `<li><i class="fas fa-info-circle"></i> ${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="treatment-actions">
                <button class="btn-primary" onclick="bookTreatmentAppointment('${treatment.name}')">
                    <i class="fas fa-calendar-plus"></i> Book Consultation
                </button>
                <button class="btn-secondary" onclick="closeTreatmentModal()">
                    Close
                </button>
            </div>
        </div>
    `;
}

// Show treatment tab
function showTreatmentTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Book treatment appointment
function bookTreatmentAppointment(treatmentName) {
    // Store the selected treatment
    sessionStorage.setItem('selectedTreatment', treatmentName);
    
    // Close modal
    closeTreatmentModal();
    
    // Redirect to hospitals page
    window.location.href = 'hospitals.html';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('treatmentModal');
    if (event.target === modal) {
        closeTreatmentModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('treatmentModal');
        if (modal && modal.style.display === 'block') {
            closeTreatmentModal();
        }
    }
});

// Search treatments
function searchTreatments(query) {
    const treatments = Object.keys(TREATMENTS);
    const results = [];
    
    treatments.forEach(treatmentId => {
        const treatment = TREATMENTS[treatmentId];
        const searchableText = `
            ${treatment.name} 
            ${treatment.description} 
            ${treatment.benefits.join(' ')} 
            ${treatment.suitableFor.join(' ')}
        `.toLowerCase();
        
        if (searchableText.includes(query.toLowerCase())) {
            results.push({
                id: treatmentId,
                ...treatment
            });
        }
    });
    
    return results;
}

// Get treatment by ID
function getTreatment(treatmentId) {
    return TREATMENTS[treatmentId] || null;
}

// Get all treatments
function getAllTreatments() {
    return Object.keys(TREATMENTS).map(id => ({
        id,
        ...TREATMENTS[id]
    }));
}

// Treatment recommendation based on symptoms
function recommendTreatments(symptoms) {
    const recommendations = [];
    const symptomsLower = symptoms.map(s => s.toLowerCase());
    
    Object.keys(TREATMENTS).forEach(treatmentId => {
        const treatment = TREATMENTS[treatmentId];
        let matchCount = 0;
        
        treatment.suitableFor.forEach(condition => {
            symptomsLower.forEach(symptom => {
                if (condition.toLowerCase().includes(symptom)) {
                    matchCount++;
                }
            });
        });
        
        if (matchCount > 0) {
            recommendations.push({
                id: treatmentId,
                treatment: treatment,
                relevance: matchCount
            });
        }
    });
    
    // Sort by relevance
    return recommendations.sort((a, b) => b.relevance - a.relevance);
}

// Export functions for use in other scripts
window.TreatmentSystem = {
    openTreatmentModal,
    closeTreatmentModal,
    getTreatment,
    getAllTreatments,
    searchTreatments,
    recommendTreatments,
    bookTreatmentAppointment
};

// Initialize treatment cards with hover effects
document.addEventListener('DOMContentLoaded', function() {
    const treatmentCards = document.querySelectorAll('.treatment-card');
    
    treatmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});