// Admin Dashboard System for AyurSutra

class AdminDashboard {
    constructor() {
        this.admin = null;
        this.appointments = [];
        this.doctors = [];
        this.patients = [];
        this.notifications = [];
        this.hospitalInfo = {};
        this.init();
    }

    init() {
        if (!Session.redirectIfNotLoggedIn()) return;
        
        const user = Session.getUser();
        if (user.role !== 'admin') {
            showNotification('Access denied. Admin login required.', 'error');
            Session.logout();
            return;
        }

        this.admin = user;
        this.loadAdminData();
        this.bindEvents();
        this.updateDashboard();
        console.log('Admin dashboard initialized for:', user.name);
    }

    loadAdminData() {
        // Sample data
        this.appointments = [
            {
                id: 'req001',
                patientName: 'Priya Sharma',
                phone: '9876543214',
                date: '2024-02-01',
                timeSlot: 'morning',
                treatmentType: 'Vaman Therapy',
                description: 'Chronic respiratory issues',
                status: 'pending',
                submittedAt: new Date()
            },
            {
                id: 'req002',
                patientName: 'Amit Patel',
                phone: '9876543215',
                date: '2024-02-02',
                timeSlot: 'afternoon',
                treatmentType: 'Virechan Therapy',
                description: 'Digestive problems',
                status: 'pending',
                submittedAt: new Date(Date.now() - 86400000)
            }
        ];

        this.doctors = [
            {
                id: 'D001',
                name: 'Dr. Priya Sharma',
                specialization: 'Panchkarma Specialist',
                experience: '15 years',
                phone: '9876543220',
                email: 'priya.sharma@ayurheal.com',
                patientsHandled: 2500,
                currentPatients: 45,
                rating: 4.9,
                status: 'active'
            },
            {
                id: 'D002',
                name: 'Dr. Ravi Menon',
                specialization: 'Traditional Panchkarma',
                experience: '20 years',
                phone: '9876543221',
                email: 'ravi.menon@ayurheal.com',
                patientsHandled: 3200,
                currentPatients: 52,
                rating: 4.9,
                status: 'active'
            }
        ];

        this.patients = [
            {
                id: 'P001',
                name: 'Raj Kumar',
                phone: '9876543210',
                assignedDoctor: 'Dr. Priya Sharma',
                treatment: 'Vaman Therapy',
                status: 'active',
                hasCredentials: true
            },
            {
                id: 'P002',
                name: 'Anita Singh',
                phone: '9876543211',
                assignedDoctor: 'Dr. Ravi Menon',
                treatment: 'Virechan Therapy',
                status: 'active',
                hasCredentials: true
            }
        ];

        this.notifications = [
            {
                id: 'not001',
                title: 'New Appointment Request',
                message: 'Priya Sharma has requested an appointment for Vaman therapy.',
                type: 'appointment',
                date: new Date(),
                read: false,
                priority: 'high'
            },
            {
                id: 'not002',
                title: 'System Maintenance',
                message: 'Scheduled system maintenance on Sunday 3 AM - 5 AM.',
                type: 'system',
                date: new Date(Date.now() - 86400000),
                read: false,
                priority: 'medium'
            }
        ];

        this.hospitalInfo = {
            name: 'AyurHeal Center Mumbai',
            phone: '+91 9876543210',
            address: '123 Health Street, Andheri, Mumbai, Maharashtra 400069',
            description: 'Premier Panchkarma treatment center with state-of-the-art facilities and experienced practitioners.',
            operatingHours: 'Mon-Sat: 9 AM - 8 PM, Sun: Closed',
            facilities: ['24/7 Care', 'Modern Equipment', 'Experienced Staff', 'Hygienic Environment'],
            images: ['hospital1-1.jpg', 'hospital1-2.jpg', 'hospital1-3.jpg'],
            videos: ['hospital-tour.mp4']
        };
    }

    bindEvents() {
        // Add doctor form
        const addDoctorForm = document.getElementById('addDoctorForm');
        if (addDoctorForm) {
            addDoctorForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addNewDoctor();
            });
        }

        // Assign patient form
        const assignPatientForm = document.getElementById('assignPatientForm');
        if (assignPatientForm) {
            assignPatientForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.assignPatientToDoctor();
            });
        }

        // Hospital info form
        const hospitalInfoForm = document.getElementById('hospitalInfoForm');
        if (hospitalInfoForm) {
            hospitalInfoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveHospitalInfo();
            });
        }
    }

    updateDashboard() {
        this.updateAdminInfo();
        this.updateStats();
        this.updateAppointmentRequests();
        this.updateDoctorsList();
        this.updatePatientsList();
        this.updateNotifications();
        this.updateHospitalInfo();
        this.updateSystemActivity();
    }

    updateAdminInfo() {
        document.getElementById('adminName').textContent = this.admin.name;
    }

    updateStats() {
        const pendingCount = this.appointments.filter(apt => apt.status === 'pending').length;
        document.getElementById('pendingAppointments').textContent = pendingCount;
        document.getElementById('totalDoctors').textContent = this.doctors.filter(d => d.status === 'active').length;
        document.getElementById('totalPatients').textContent = this.patients.length;
        
        const avgRating = this.doctors.length > 0 ? 
            (this.doctors.reduce((sum, doc) => sum + doc.rating, 0) / this.doctors.length).toFixed(1) : '0.0';
        document.getElementById('hospitalRating').textContent = avgRating;
    }

    updateAppointmentRequests() {
        const container = document.getElementById('appointmentsList');
        const recentRequests = document.getElementById('recentRequests');

        if (recentRequests) {
            recentRequests.innerHTML = this.appointments.slice(0, 3).map(request => `
                <div class="request-item">
                    <div class="request-info">
                        <h4>${request.patientName}</h4>
                        <p>${request.treatmentType} - ${formatDate(request.date)}</p>
                    </div>
                    <div class="request-status status-${request.status}">
                        ${request.status}
                    </div>
                </div>
            `).join('');
        }

        if (container) {
            container.innerHTML = this.appointments.map(request => `
                <div class="appointment-request-card">
                    <div class="request-header">
                        <h3>${request.patientName}</h3>
                        <div class="request-status status-${request.status}">${request.status}</div>
                    </div>
                    
                    <div class="request-details">
                        <div class="detail-row">
                            <span class="label">Phone:</span>
                            <span>${formatPhoneNumber(request.phone)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Treatment:</span>
                            <span>${request.treatmentType}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Preferred Date:</span>
                            <span>${formatDate(request.date)} (${request.timeSlot})</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Description:</span>
                            <span>${request.description}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Submitted:</span>
                            <span>${formatDate(request.submittedAt)}</span>
                        </div>
                    </div>

                    ${request.status === 'pending' ? `
                        <div class="request-actions">
                            <button onclick="approveAppointment('${request.id}')" class="btn-sm btn-success">
                                <i class="fas fa-check"></i> Approve
                            </button>
                            <button onclick="rejectAppointment('${request.id}')" class="btn-sm btn-danger">
                                <i class="fas fa-times"></i> Reject
                            </button>
                            <button onclick="contactPatient('${request.phone}')" class="btn-sm btn-secondary">
                                <i class="fas fa-phone"></i> Contact
                            </button>
                        </div>
                    ` : ''}
                </div>
            `).join('');
        }
    }

    updateDoctorsList() {
        const container = document.getElementById('doctorsList');
        if (!container) return;

        container.innerHTML = this.doctors.map(doctor => `
            <div class="doctor-management-card">
                <div class="doctor-header">
                    <h3>${doctor.name}</h3>
                    <div class="doctor-status status-${doctor.status}">${doctor.status}</div>
                </div>
                
                <div class="doctor-info">
                    <p><i class="fas fa-stethoscope"></i> ${doctor.specialization}</p>
                    <p><i class="fas fa-clock"></i> ${doctor.experience} experience</p>
                    <p><i class="fas fa-phone"></i> ${formatPhoneNumber(doctor.phone)}</p>
                    <p><i class="fas fa-envelope"></i> ${doctor.email}</p>
                </div>
                
                <div class="doctor-stats">
                    <div class="stat-item">
                        <strong>${doctor.patientsHandled}</strong>
                        <span>Patients Treated</span>
                    </div>
                    <div class="stat-item">
                        <strong>${doctor.currentPatients}</strong>
                        <span>Active Patients</span>
                    </div>
                    <div class="stat-item">
                        <strong>${doctor.rating}</strong>
                        <span>Rating</span>
                    </div>
                </div>
                
                <div class="doctor-actions">
                    <button onclick="editDoctor('${doctor.id}')" class="btn-sm btn-secondary">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="viewDoctorSchedule('${doctor.id}')" class="btn-sm btn-primary">
                        <i class="fas fa-calendar"></i> Schedule
                    </button>
                    <button onclick="generateDoctorCredentials('${doctor.id}')" class="btn-sm btn-info">
                        <i class="fas fa-key"></i> Credentials
                    </button>
                </div>
            </div>
        `).join('');
    }

    updatePatientsList() {
        const container = document.getElementById('patientsList');
        if (!container) return;

        container.innerHTML = this.patients.map(patient => `
            <div class="patient-management-card">
                <div class="patient-header">
                    <h3>${patient.name}</h3>
                    <div class="patient-status status-${patient.status}">${patient.status}</div>
                </div>
                
                <div class="patient-info">
                    <p><i class="fas fa-phone"></i> ${formatPhoneNumber(patient.phone)}</p>
                    <p><i class="fas fa-user-md"></i> ${patient.assignedDoctor}</p>
                    <p><i class="fas fa-prescription"></i> ${patient.treatment}</p>
                    <p><i class="fas fa-key"></i> Credentials: ${patient.hasCredentials ? 'Generated' : 'Pending'}</p>
                </div>
                
                <div class="patient-actions">
                    <button onclick="viewPatientDetails('${patient.id}')" class="btn-sm btn-secondary">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button onclick="reassignPatient('${patient.id}')" class="btn-sm btn-primary">
                        <i class="fas fa-exchange-alt"></i> Reassign
                    </button>
                    ${!patient.hasCredentials ? `
                        <button onclick="generatePatientCredentials('${patient.id}')" class="btn-sm btn-success">
                            <i class="fas fa-key"></i> Generate Login
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    updateNotifications() {
        const notificationsList = document.getElementById('notificationsList');
        const notificationCount = document.getElementById('notificationCount');

        const unreadCount = this.notifications.filter(n => !n.read).length;
        if (notificationCount) {
            notificationCount.textContent = unreadCount;
            notificationCount.style.display = unreadCount > 0 ? 'block' : 'none';
        }

        if (notificationsList) {
            notificationsList.innerHTML = this.notifications.map(notification => `
                <div class="notification-item ${notification.read ? 'read' : 'unread'}">
                    <div class="notification-icon">
                        <i class="fas fa-${this.getNotificationIcon(notification.type)}"></i>
                    </div>
                    <div class="notification-content">
                        <h4>${notification.title}</h4>
                        <p>${notification.message}</p>
                        <span class="notification-time">${formatDate(notification.date)}</span>
                    </div>
                    <div class="notification-actions">
                        ${!notification.read ? `<button onclick="markNotificationRead('${notification.id}')">Mark Read</button>` : ''}
                    </div>
                </div>
            `).join('');
        }
    }

    updateHospitalInfo() {
        document.getElementById('hospitalName').value = this.hospitalInfo.name;
        document.getElementById('hospitalPhone').value = this.hospitalInfo.phone;
        document.getElementById('hospitalAddress').value = this.hospitalInfo.address;
        document.getElementById('hospitalDescription').value = this.hospitalInfo.description;
        document.getElementById('operatingHours').value = this.hospitalInfo.operatingHours;

        this.updateFacilities();
        this.updateMediaGallery();
    }

    updateFacilities() {
        const container = document.getElementById('facilitiesContainer');
        if (!container) return;

        container.innerHTML = this.hospitalInfo.facilities.map((facility, index) => `
            <div class="facility-item">
                <input type="text" value="${facility}" onchange="updateFacility(${index}, this.value)">
                <button type="button" onclick="removeFacility(${index})" class="btn-sm btn-danger">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    updateMediaGallery() {
        const imageGallery = document.getElementById('imageGallery');
        const videoGallery = document.getElementById('videoGallery');

        if (imageGallery) {
            imageGallery.innerHTML = this.hospitalInfo.images.map((image, index) => `
                <div class="media-item">
                    <div class="image-preview">
                        <i class="fas fa-image"></i>
                        <span>${image}</span>
                    </div>
                    <button type="button" onclick="removeImage(${index})" class="btn-sm btn-danger">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }

        if (videoGallery) {
            videoGallery.innerHTML = this.hospitalInfo.videos.map((video, index) => `
                <div class="media-item">
                    <div class="video-preview">
                        <i class="fas fa-video"></i>
                        <span>${video}</span>
                    </div>
                    <button type="button" onclick="removeVideo(${index})" class="btn-sm btn-danger">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateSystemActivity() {
        const container = document.getElementById('systemActivity');
        if (!container) return;

        const activities = [
            'New patient registration: Priya Sharma',
            'Doctor schedule updated: Dr. Ravi Menon',
            'System backup completed successfully',
            'New appointment request received'
        ];

        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <i class="fas fa-circle"></i>
                <span>${activity}</span>
            </div>
        `).join('');
    }

    getNotificationIcon(type) {
        const icons = {
            appointment: 'calendar-check',
            system: 'cog',
            patient: 'user-plus',
            doctor: 'user-md'
        };
        return icons[type] || 'bell';
    }

    async approveAppointment(appointmentId) {
        const appointment = this.appointments.find(apt => apt.id === appointmentId);
        if (!appointment) return;

        try {
            appointment.status = 'approved';
            this.updateAppointmentRequests();
            
            // Add to patients list if not exists
            const newPatient = {
                id: 'P' + String(this.patients.length + 1).padStart(3, '0'),
                name: appointment.patientName,
                phone: appointment.phone,
                assignedDoctor: null,
                treatment: appointment.treatmentType,
                status: 'pending_assignment',
                hasCredentials: false
            };
            
            this.patients.push(newPatient);
            this.updatePatientsList();
            this.updateStats();

            showNotification(`Appointment approved for ${appointment.patientName}`, 'success');
            
        } catch (error) {
            showNotification('Failed to approve appointment', 'error');
        }
    }

    async rejectAppointment(appointmentId) {
        const appointment = this.appointments.find(apt => apt.id === appointmentId);
        if (!appointment) return;

        if (confirm(`Are you sure you want to reject the appointment for ${appointment.patientName}?`)) {
            appointment.status = 'rejected';
            this.updateAppointmentRequests();
            showNotification(`Appointment rejected for ${appointment.patientName}`, 'info');
        }
    }

    async addNewDoctor() {
        const formData = {
            name: document.getElementById('doctorName').value,
            specialization: document.getElementById('doctorSpecialization').value,
            experience: document.getElementById('doctorExperience').value,
            phone: document.getElementById('doctorPhone').value,
            email: document.getElementById('doctorEmail').value
        };

        const submitBtn = document.querySelector('#addDoctorForm button[type="submit"]');
        showLoading(submitBtn, 'Adding...');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const newDoctor = {
                id: 'D' + String(this.doctors.length + 1).padStart(3, '0'),
                ...formData,
                experience: formData.experience + ' years',
                patientsHandled: 0,
                currentPatients: 0,
                rating: 0.0,
                status: 'active'
            };

            this.doctors.push(newDoctor);
            this.updateDoctorsList();
            this.updateStats();

            showNotification(`Doctor ${formData.name} added successfully!`, 'success');
            closeAddDoctorModal();
            document.getElementById('addDoctorForm').reset();

        } catch (error) {
            showNotification('Failed to add doctor. Please try again.', 'error');
        } finally {
            hideLoading(submitBtn);
        }
    }
}

// Global functions
function addNewDoctor() {
    document.getElementById('addDoctorModal').style.display = 'block';
}

function closeAddDoctorModal() {
    document.getElementById('addDoctorModal').style.display = 'none';
}

function assignPatient() {
    document.getElementById('assignPatientModal').style.display = 'block';
}

function closeAssignPatientModal() {
    document.getElementById('assignPatientModal').style.display = 'none';
}

function updateHospitalInfo() {
    showSection('hospital-info');
}

function saveHospitalInfo() {
    if (window.adminDashboard) {
        showNotification('Hospital information saved successfully!', 'success');
    }
}

function approveAppointment(appointmentId) {
    if (window.adminDashboard) {
        window.adminDashboard.approveAppointment(appointmentId);
    }
}

function rejectAppointment(appointmentId) {
    if (window.adminDashboard) {
        window.adminDashboard.rejectAppointment(appointmentId);
    }
}

function contactPatient(phone) {
    window.location.href = `tel:${phone}`;
}

function generateReport() {
    showNotification('Generating comprehensive hospital report...', 'info');
}

function refreshDashboard() {
    if (window.adminDashboard) {
        window.adminDashboard.updateDashboard();
        showNotification('Dashboard refreshed', 'success');
    }
}

function generatePatientCredentials(patientId) {
    if (patientId) {
        const patient = window.adminDashboard.patients.find(p => p.id === patientId);
        if (patient) {
            patient.hasCredentials = true;
            window.adminDashboard.updatePatientsList();
            showNotification(`Login credentials generated for ${patient.name}`, 'success');
        }
    } else {
        showNotification('Patient credentials generation system activated', 'info');
    }
}

function sendNotification() {
    showNotification('Notification broadcast system opened', 'info');
}

function toggleNotifications() {
    console.log('Toggle notifications dropdown');
}

function markAllAsRead() {
    if (window.adminDashboard) {
        window.adminDashboard.notifications.forEach(n => n.read = true);
        window.adminDashboard.updateNotifications();
        showNotification('All notifications marked as read', 'success');
    }
}

function addFacility() {
    if (window.adminDashboard) {
        window.adminDashboard.hospitalInfo.facilities.push('New Facility');
        window.adminDashboard.updateFacilities();
    }
}

function uploadImage() {
    showNotification('Image upload functionality would open file dialog', 'info');
}

function uploadVideo() {
    showNotification('Video upload functionality would open file dialog', 'info');
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    window.adminDashboard = new AdminDashboard();
});