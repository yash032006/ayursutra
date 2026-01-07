// Hospitals and booking system for AyurSutra

class HospitalSystem {
    constructor() {
        this.hospitals = [];
        this.currentHospital = null;
        this.filteredHospitals = [];
        this.init();
    }

    init() {
        this.loadHospitalData();
        this.bindEvents();
        this.displayHospitals();
        console.log('Hospital system initialized with', this.hospitals.length, 'hospitals');
    }

    loadHospitalData() {
        // Sample hospital data (in production, this would come from an API)
        this.hospitals = [
            {
                id: 'h001',
                name: 'AyurHeal Center Mumbai',
                address: '123 Health Street, Andheri, Mumbai, Maharashtra 400069',
                phone: '+91 9876543210',
                email: 'info@ayurheal-mumbai.com',
                city: 'mumbai',
                specialty: 'panchkarma',
                rating: 4.8,
                reviewCount: 324,
                description: 'Premier Panchkarma treatment center with state-of-the-art facilities and experienced practitioners.',
                facilities: ['24/7 Care', 'Modern Equipment', 'Experienced Staff', 'Hygienic Environment'],
                treatments: ['Vaman', 'Virechan', 'Basti', 'Nasya', 'Raktamokshana'],
                operatingHours: 'Mon-Sat: 9 AM - 8 PM, Sun: Closed',
                doctors: [
                    {
                        id: 'D001',
                        name: 'Dr. Priya Sharma',
                        specialization: 'Panchkarma Specialist',
                        experience: '15 years',
                        patientsHandled: 2500,
                        currentPatients: 45,
                        rating: 4.9,
                        image: 'images/dr-priya.jpg'
                    },
                    {
                        id: 'D004',
                        name: 'Dr. Rajesh Kumar',
                        specialization: 'General Ayurveda',
                        experience: '12 years',
                        patientsHandled: 1800,
                        currentPatients: 38,
                        rating: 4.7,
                        image: 'images/dr-rajesh.jpg'
                    }
                ],
                gallery: {
                    images: ['images/hospital1-1.jpg', 'images/hospital1-2.jpg', 'images/hospital1-3.jpg'],
                    videos: ['videos/hospital1-tour.mp4']
                },
                reviews: [
                    { patient: 'Raj K.', rating: 5, comment: 'Excellent treatment and care. Dr. Priya is very knowledgeable.' },
                    { patient: 'Anita S.', rating: 5, comment: 'Clean facilities and professional staff. Highly recommended.' },
                    { patient: 'Suresh M.', rating: 4, comment: 'Good experience overall. Treatment was effective.' }
                ]
            },
            {
                id: 'h002',
                name: 'Kerala Panchkarma Hospital',
                address: '456 Ayurveda Lane, Kochi, Kerala 682001',
                phone: '+91 9876543211',
                email: 'contact@kerala-panchkarma.com',
                city: 'kerala',
                specialty: 'panchkarma',
                rating: 4.9,
                reviewCount: 289,
                description: 'Traditional Kerala Ayurvedic hospital following authentic treatment protocols.',
                facilities: ['Traditional Methods', 'Herbal Gardens', 'Meditation Center', 'Yoga Classes'],
                treatments: ['Complete Panchkarma', 'Abhyanga', 'Shirodhara', 'Pizhichil'],
                operatingHours: 'Mon-Sat: 8 AM - 7 PM, Sun: Closed',
                doctors: [
                    {
                        id: 'D002',
                        name: 'Dr. Ravi Menon',
                        specialization: 'Traditional Panchkarma',
                        experience: '20 years',
                        patientsHandled: 3200,
                        currentPatients: 52,
                        rating: 4.9,
                        image: 'images/dr-ravi.jpg'
                    },
                    {
                        id: 'D005',
                        name: 'Dr. Lakshmi Nair',
                        specialization: 'Women\'s Ayurvedic Health',
                        experience: '18 years',
                        patientsHandled: 2100,
                        currentPatients: 41,
                        rating: 4.8,
                        image: 'images/dr-lakshmi.jpg'
                    }
                ],
                gallery: {
                    images: ['images/hospital2-1.jpg', 'images/hospital2-2.jpg', 'images/hospital2-3.jpg'],
                    videos: ['videos/hospital2-kerala.mp4']
                },
                reviews: [
                    { patient: 'Maya P.', rating: 5, comment: 'Authentic Kerala treatment. Feel completely rejuvenated.' },
                    { patient: 'Vikram T.', rating: 5, comment: 'Dr. Ravi\'s expertise is exceptional. Great results.' },
                    { patient: 'Priya R.', rating: 5, comment: 'Peaceful environment and excellent care.' }
                ]
            },
            {
                id: 'h003',
                name: 'Wellness Ayurveda Pune',
                address: '789 Wellness Road, Koregaon Park, Pune, Maharashtra 411001',
                phone: '+91 9876543212',
                email: 'info@wellness-pune.com',
                city: 'pune',
                specialty: 'wellness',
                rating: 4.6,
                reviewCount: 156,
                description: 'Modern wellness center combining traditional Ayurveda with contemporary healthcare.',
                facilities: ['Spa Services', 'Consultation Rooms', 'Pharmacy', 'Cafeteria'],
                treatments: ['Detox Programs', 'Stress Management', 'Weight Loss', 'Skin Care'],
                operatingHours: 'Mon-Sun: 7 AM - 9 PM',
                doctors: [
                    {
                        id: 'D006',
                        name: 'Dr. Amit Joshi',
                        specialization: 'Wellness & Lifestyle',
                        experience: '10 years',
                        patientsHandled: 1200,
                        currentPatients: 28,
                        rating: 4.6,
                        image: 'images/dr-amit.jpg'
                    }
                ],
                gallery: {
                    images: ['images/hospital3-1.jpg', 'images/hospital3-2.jpg'],
                    videos: []
                },
                reviews: [
                    { patient: 'Neha K.', rating: 5, comment: 'Great for stress relief and wellness programs.' },
                    { patient: 'Rohit S.', rating: 4, comment: 'Modern facilities with traditional approach.' }
                ]
            },
            {
                id: 'h004',
                name: 'Bangalore Ayurveda Institute',
                address: '321 Health Avenue, Whitefield, Bangalore, Karnataka 560066',
                phone: '+91 9876543213',
                email: 'contact@bangalore-ayurveda.com',
                city: 'bangalore',
                specialty: 'general',
                rating: 4.7,
                reviewCount: 201,
                description: 'Comprehensive Ayurvedic healthcare with research and education facilities.',
                facilities: ['Research Center', 'Teaching Hospital', 'Laboratory', 'Library'],
                treatments: ['All Panchkarma', 'Chronic Diseases', 'Pain Management', 'Consultation'],
                operatingHours: 'Mon-Sat: 9 AM - 6 PM, Sun: Emergency Only',
                doctors: [
                    {
                        id: 'D007',
                        name: 'Dr. Suresh Babu',
                        specialization: 'Chronic Disease Management',
                        experience: '22 years',
                        patientsHandled: 4500,
                        currentPatients: 68,
                        rating: 4.8,
                        image: 'images/dr-suresh.jpg'
                    },
                    {
                        id: 'D008',
                        name: 'Dr. Kavitha Rao',
                        specialization: 'Pain Management',
                        experience: '14 years',
                        patientsHandled: 1900,
                        currentPatients: 35,
                        rating: 4.7,
                        image: 'images/dr-kavitha.jpg'
                    }
                ],
                gallery: {
                    images: ['images/hospital4-1.jpg', 'images/hospital4-2.jpg', 'images/hospital4-3.jpg'],
                    videos: ['videos/hospital4-research.mp4']
                },
                reviews: [
                    { patient: 'Arjun M.', rating: 5, comment: 'Excellent for chronic conditions. Dr. Suresh is amazing.' },
                    { patient: 'Deepa L.', rating: 4, comment: 'Professional service and good facilities.' }
                ]
            }
        ];

        this.filteredHospitals = [...this.hospitals];
    }

    bindEvents() {
        // Filter events
        const searchInput = document.getElementById('searchHospital');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
        }

        const cityFilter = document.getElementById('cityFilter');
        if (cityFilter) {
            cityFilter.addEventListener('change', () => this.applyFilters());
        }

        const specialtyFilter = document.getElementById('specialtyFilter');
        if (specialtyFilter) {
            specialtyFilter.addEventListener('change', () => this.applyFilters());
        }

        // Check for selected treatment from home page
        const selectedTreatment = sessionStorage.getItem('selectedTreatment');
        if (selectedTreatment) {
            this.highlightTreatment(selectedTreatment);
            sessionStorage.removeItem('selectedTreatment');
        }
    }

    highlightTreatment(treatmentName) {
        // Show notification about selected treatment
        showNotification(`Showing hospitals for ${treatmentName} treatment`, 'info', 5000);
        
        // Filter hospitals that offer this treatment
        // In a real implementation, this would be more sophisticated
        this.applyFilters();
    }

    applyFilters() {
        const searchTerm = document.getElementById('searchHospital')?.value.toLowerCase() || '';
        const cityFilter = document.getElementById('cityFilter')?.value || '';
        const specialtyFilter = document.getElementById('specialtyFilter')?.value || '';

        this.filteredHospitals = this.hospitals.filter(hospital => {
            const matchesSearch = hospital.name.toLowerCase().includes(searchTerm) ||
                                hospital.address.toLowerCase().includes(searchTerm) ||
                                hospital.description.toLowerCase().includes(searchTerm);
            
            const matchesCity = !cityFilter || hospital.city === cityFilter;
            const matchesSpecialty = !specialtyFilter || hospital.specialty === specialtyFilter;

            return matchesSearch && matchesCity && matchesSpecialty;
        });

        this.displayHospitals();
    }

    displayHospitals() {
        const container = document.getElementById('hospitalsContainer');
        if (!container) return;

        if (this.filteredHospitals.length === 0) {
            container.innerHTML = `
                <div class="no-hospitals-found">
                    <i class="fas fa-hospital-alt"></i>
                    <h3>No Hospitals Found</h3>
                    <p>Try adjusting your search criteria or browse all hospitals.</p>
                    <button onclick="clearFilters()" class="btn-primary">Clear Filters</button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredHospitals.map(hospital => this.createHospitalCard(hospital)).join('');
    }

    createHospitalCard(hospital) {
        const stars = '★'.repeat(Math.floor(hospital.rating)) + '☆'.repeat(5 - Math.floor(hospital.rating));
        
        return `
            <div class="hospital-card" data-hospital-id="${hospital.id}">
                <div class="hospital-header">
                    <h3>${hospital.name}</h3>
                    <div class="hospital-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-text">${hospital.rating} (${hospital.reviewCount} reviews)</span>
                    </div>
                </div>

                <div class="hospital-info">
                    <p class="hospital-address">
                        <i class="fas fa-map-marker-alt"></i>
                        ${hospital.address}
                    </p>
                    <p class="hospital-phone">
                        <i class="fas fa-phone"></i>
                        ${hospital.phone}
                    </p>
                    <p class="hospital-hours">
                        <i class="fas fa-clock"></i>
                        ${hospital.operatingHours}
                    </p>
                </div>

                <div class="hospital-description">
                    <p>${hospital.description}</p>
                </div>

                <div class="hospital-facilities">
                    <h4>Facilities:</h4>
                    <div class="facilities-tags">
                        ${hospital.facilities.map(facility => `<span class="facility-tag">${facility}</span>`).join('')}
                    </div>
                </div>

                <div class="hospital-treatments">
                    <h4>Treatments:</h4>
                    <div class="treatments-tags">
                        ${hospital.treatments.map(treatment => `<span class="treatment-tag">${treatment}</span>`).join('')}
                    </div>
                </div>

                <div class="hospital-doctors">
                    <h4>Doctors (${hospital.doctors.length}):</h4>
                    <div class="doctors-preview">
                        ${hospital.doctors.slice(0, 2).map(doctor => `
                            <div class="doctor-preview">
                                <div class="doctor-info">
                                    <strong>${doctor.name}</strong>
                                    <small>${doctor.specialization}</small>
                                    <span class="doctor-stats">${doctor.experience} exp • ${doctor.patientsHandled}+ treated</span>
                                </div>
                                <div class="doctor-rating">★ ${doctor.rating}</div>
                            </div>
                        `).join('')}
                        ${hospital.doctors.length > 2 ? `<p class="more-doctors">+${hospital.doctors.length - 2} more doctors</p>` : ''}
                    </div>
                </div>

                <div class="hospital-actions">
                    <button onclick="viewHospitalDetails('${hospital.id}')" class="btn-secondary">
                        <i class="fas fa-info-circle"></i> View Details
                    </button>
                    <button onclick="openBookingModal('${hospital.id}')" class="btn-primary">
                        <i class="fas fa-calendar-plus"></i> Book Appointment
                    </button>
                </div>
            </div>
        `;
    }

    viewHospitalDetails(hospitalId) {
        const hospital = this.hospitals.find(h => h.id === hospitalId);
        if (!hospital) return;

        const modal = document.getElementById('hospitalModal');
        const details = document.getElementById('hospitalDetails');
        
        details.innerHTML = `
            <div class="hospital-detail-header">
                <h2>${hospital.name}</h2>
                <div class="hospital-rating-large">
                    <span class="rating-stars">★★★★★</span>
                    <span class="rating-number">${hospital.rating}/5</span>
                    <span class="rating-count">(${hospital.reviewCount} reviews)</span>
                </div>
            </div>

            <div class="hospital-detail-tabs">
                <button class="tab-btn active" onclick="showHospitalTab('overview')">Overview</button>
                <button class="tab-btn" onclick="showHospitalTab('doctors')">Doctors</button>
                <button class="tab-btn" onclick="showHospitalTab('gallery')">Gallery</button>
                <button class="tab-btn" onclick="showHospitalTab('reviews')">Reviews</button>
            </div>

            <div class="hospital-tab-content">
                <div id="overview" class="tab-content active">
                    <div class="overview-grid">
                        <div class="overview-info">
                            <h4>Contact Information</h4>
                            <p><i class="fas fa-map-marker-alt"></i> ${hospital.address}</p>
                            <p><i class="fas fa-phone"></i> ${hospital.phone}</p>
                            <p><i class="fas fa-envelope"></i> ${hospital.email}</p>
                            <p><i class="fas fa-clock"></i> ${hospital.operatingHours}</p>
                        </div>
                        
                        <div class="overview-facilities">
                            <h4>Facilities</h4>
                            <ul>
                                ${hospital.facilities.map(facility => `<li><i class="fas fa-check"></i> ${facility}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="overview-treatments">
                            <h4>Available Treatments</h4>
                            <div class="treatments-list">
                                ${hospital.treatments.map(treatment => `<span class="treatment-badge">${treatment}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="doctors" class="tab-content">
                    <div class="doctors-list">
                        ${hospital.doctors.map(doctor => `
                            <div class="doctor-card">
                                <div class="doctor-details">
                                    <h4>${doctor.name}</h4>
                                    <p class="specialization">${doctor.specialization}</p>
                                    <p class="experience">Experience: ${doctor.experience}</p>
                                    <p class="patients">Patients Treated: ${doctor.patientsHandled}</p>
                                    <p class="current">Currently Treating: ${doctor.currentPatients}</p>
                                    <div class="doctor-rating">Rating: ★ ${doctor.rating}/5</div>
                                </div>
                                <button onclick="bookWithDoctor('${hospital.id}', '${doctor.id}')" class="btn-primary">
                                    Book with ${doctor.name.split(' ').pop()}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div id="gallery" class="tab-content">
                    <div class="gallery-section">
                        <h4>Images</h4>
                        <div class="image-gallery">
                            ${hospital.gallery.images.map(image => `
                                <div class="gallery-item">
                                    <div class="image-placeholder">
                                        <i class="fas fa-image"></i>
                                        <p>Hospital Image</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        ${hospital.gallery.videos.length > 0 ? `
                            <h4>Videos</h4>
                            <div class="video-gallery">
                                ${hospital.gallery.videos.map(video => `
                                    <div class="gallery-item">
                                        <div class="video-placeholder">
                                            <i class="fas fa-video"></i>
                                            <p>Virtual Tour</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div id="reviews" class="tab-content">
                    <div class="reviews-section">
                        ${hospital.reviews.map(review => `
                            <div class="review-item">
                                <div class="review-header">
                                    <strong>${review.patient}</strong>
                                    <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                                </div>
                                <p class="review-comment">${review.comment}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    openBookingModal(hospitalId, doctorId = null) {
        this.currentHospital = this.hospitals.find(h => h.id === hospitalId);
        const modal = document.getElementById('bookingModal');
        
        // Pre-fill doctor if specified
        if (doctorId) {
            const doctor = this.currentHospital.doctors.find(d => d.id === doctorId);
            if (doctor) {
                // Store doctor selection
                sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
            }
        }

        modal.style.display = 'block';
    }
}

// OTP System
class OTPSystem {
    constructor() {
        this.currentOTP = null;
        this.phoneNumber = null;
        this.isVerified = false;
    }

    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async sendOTP() {
        const phoneInput = document.getElementById('phoneNumber');
        const phone = phoneInput.value.trim();

        if (!validatePhoneNumber(phoneInput)) {
            return;
        }

        this.phoneNumber = phone;
        this.currentOTP = this.generateOTP();
        
        // Show OTP group
        const otpGroup = document.getElementById('otpGroup');
        otpGroup.style.display = 'block';

        // Simulate API call
        const sendBtn = document.getElementById('sendOtp');
        showLoading(sendBtn, 'Sending...');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // In production, this would send actual SMS
            console.log('OTP sent to', phone, ':', this.currentOTP);
            
            showNotification(`OTP sent to ${formatPhoneNumber(phone)} (Demo OTP: ${this.currentOTP})`, 'info', 8000);
            
            sendBtn.textContent = 'Resend OTP';
            
        } catch (error) {
            showNotification('Failed to send OTP. Please try again.', 'error');
        } finally {
            hideLoading(sendBtn);
        }
    }

    verifyOTP() {
        const otpInput = document.getElementById('otpCode');
        const enteredOTP = otpInput.value.trim();

        if (!enteredOTP) {
            showNotification('Please enter the OTP', 'error');
            return;
        }

        if (enteredOTP === this.currentOTP) {
            this.isVerified = true;
            showNotification('Phone number verified successfully!', 'success');
            
            // Visual feedback
            otpInput.style.borderColor = '#28a745';
            const verifyBtn = document.querySelector('#otpGroup button');
            verifyBtn.innerHTML = '<i class="fas fa-check"></i> Verified';
            verifyBtn.disabled = true;
            verifyBtn.style.background = '#28a745';
            
        } else {
            showNotification('Invalid OTP. Please try again.', 'error');
            otpInput.style.borderColor = '#dc3545';
        }
    }
}

// Global functions
function clearFilters() {
    document.getElementById('searchHospital').value = '';
    document.getElementById('cityFilter').value = '';
    document.getElementById('specialtyFilter').value = '';
    
    if (window.hospitalSystem) {
        window.hospitalSystem.applyFilters();
    }
}

function viewHospitalDetails(hospitalId) {
    if (window.hospitalSystem) {
        window.hospitalSystem.viewHospitalDetails(hospitalId);
    }
}

function openBookingModal(hospitalId) {
    if (window.hospitalSystem) {
        window.hospitalSystem.openBookingModal(hospitalId);
    }
}

function bookWithDoctor(hospitalId, doctorId) {
    // Close hospital details modal first
    closeHospitalModal();
    
    setTimeout(() => {
        if (window.hospitalSystem) {
            window.hospitalSystem.openBookingModal(hospitalId, doctorId);
        }
    }, 300);
}

function closeHospitalModal() {
    const modal = document.getElementById('hospitalModal');
    modal.style.display = 'none';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
}

function showHospitalTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
        
        // Add active class to clicked button
        event.target.classList.add('active');
    }
}

function sendOTP() {
    if (window.otpSystem) {
        window.otpSystem.sendOTP();
    }
}

function verifyOTP() {
    if (window.otpSystem) {
        window.otpSystem.verifyOTP();
    }
}

function applyFilters() {
    if (window.hospitalSystem) {
        window.hospitalSystem.applyFilters();
    }
}

// Initialize systems
document.addEventListener('DOMContentLoaded', function() {
    window.hospitalSystem = new HospitalSystem();
    window.otpSystem = new OTPSystem();
    
    // Handle booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
    }
});

async function handleBookingSubmission(event) {
    event.preventDefault();
    
    if (!window.otpSystem.isVerified) {
        showNotification('Please verify your phone number first', 'error');
        return;
    }
    
    const formData = {
        hospitalId: window.hospitalSystem.currentHospital?.id,
        patientName: document.getElementById('patientName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        timeSlot: document.getElementById('timeSlot').value,
        issueDescription: document.getElementById('issueDescription').value
    };
    
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    showLoading(submitBtn, 'Booking...');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showNotification('Appointment request submitted successfully! You will be contacted soon.', 'success');
        closeBookingModal();
        
        // Reset form
        bookingForm.reset();
        window.otpSystem.isVerified = false;
        document.getElementById('otpGroup').style.display = 'none';
        
    } catch (error) {
        showNotification('Failed to submit appointment request. Please try again.', 'error');
    } finally {
        hideLoading(submitBtn);
    }
}

// CSS for hospitals page
const style = document.createElement('style');
style.textContent = `
.hospital-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 1.5rem;
    margin-bottom: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hospital-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.15);
}

.hospital-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.hospital-rating .stars {
    color: #FFD700;
    font-size: 1.1rem;
}

.hospital-info p {
    margin: 0.5rem 0;
    color: #666;
}

.hospital-info i {
    margin-right: 0.5rem;
    color: #2E7D32;
    width: 16px;
}

.facilities-tags, .treatments-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.facility-tag {
    background: #E8F5E9;
    color: #2E7D32;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
}

.treatment-tag {
    background: #FFF3E0;
    color: #F57C00;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
}

.doctors-preview {
    margin-top: 0.5rem;
}

.doctor-preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: #F8F9FA;
    border-radius: 8px;
    margin-bottom: 0.5rem;
}

.doctor-info small {
    display: block;
    color: #666;
    font-size: 0.8rem;
}

.doctor-stats {
    font-size: 0.75rem;
    color: #888;
}

.doctor-rating {
    color: #FFD700;
    font-weight: bold;
}

.hospital-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: center;
}

.no-hospitals-found {
    text-align: center;
    padding: 3rem;
    color: #666;
}

.no-hospitals-found i {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: #ccc;
}

.search-filters {
    background: #F8F9FA;
    padding: 2rem 0;
}

.filter-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 1rem;
    align-items: center;
}

.search-input, .filter-select {
    padding: 0.75rem;
    border: 2px solid #E0E0E0;
    border-radius: 8px;
    font-size: 1rem;
}

.search-input:focus, .filter-select:focus {
    border-color: #2E7D32;
    outline: none;
}

.hospitals-container {
    display: grid;
    gap: 2rem;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    .filter-row {
        grid-template-columns: 1fr;
    }
    
    .hospital-header {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .hospital-actions {
        flex-direction: column;
    }
    
    .facilities-tags, .treatments-tags {
        justify-content: center;
    }
}

.modal-content.booking-modal,
.modal-content.hospital-modal {
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
}

.booking-form .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.otp-group {
    background: #F0F8FF;
    padding: 1rem;
    border-radius: 8px;
    border-left: 4px solid #2196F3;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2rem;
}

.hospital-detail-tabs {
    display: flex;
    border-bottom: 2px solid #E0E0E0;
    margin: 1rem 0;
}

.hospital-detail-tabs .tab-btn {
    background: none;
    border: none;
    padding: 1rem 1.5rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}

.hospital-detail-tabs .tab-btn.active {
    border-bottom-color: #2E7D32;
    color: #2E7D32;
}

.overview-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 1rem 0;
}

.overview-info h4,
.overview-facilities h4,
.overview-treatments h4 {
    color: #2E7D32;
    margin-bottom: 0.5rem;
}

.treatments-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.treatment-badge {
    background: linear-gradient(135deg, #2E7D32, #4CAF50);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
}

.doctors-list {
    display: grid;
    gap: 1rem;
}

.doctor-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 2px solid #E0E0E0;
    border-radius: 12px;
}

.gallery-section {
    padding: 1rem 0;
}

.image-gallery, .video-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.gallery-item {
    aspect-ratio: 16/9;
    background: #F5F5F5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #666;
}

.reviews-section {
    padding: 1rem 0;
}

.review-item {
    padding: 1rem;
    border-bottom: 1px solid #E0E0E0;
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.review-rating {
    color: #FFD700;
}
`;

document.head.appendChild(style);