// Doctor Dashboard System for AyurSutra

class DoctorDashboard {
    constructor() {
        this.doctor = null;
        this.patients = [];
        this.schedule = [];
        this.notifications = [];
        this.feedback = [];
        this.init();
    }

    init() {
        if (!Session.redirectIfNotLoggedIn()) return;
        
        const user = Session.getUser();
        if (user.role !== 'doctor') {
            showNotification('Access denied. Doctor login required.', 'error');
            Session.logout();
            return;
        }

        this.doctor = user;
        this.loadDoctorData();
        this.bindEvents();
        this.updateDashboard();
        console.log('Doctor dashboard initialized for:', user.name);
    }

    loadDoctorData() {
        // Sample data
        this.patients = [
            {
                id: 'P001',
                name: 'Raj Kumar',
                age: 45,
                gender: 'male',
                phone: '9876543210',
                condition: 'Chronic Asthma & Digestive Issues',
                treatment: 'Vaman Therapy',
                status: 'active',
                progress: 60,
                startDate: '2024-01-15',
                nextSession: '2024-02-01'
            },
            {
                id: 'P002',
                name: 'Anita Singh',
                age: 38,
                gender: 'female',
                phone: '9876543211',
                condition: 'Skin disorders and allergies',
                treatment: 'Virechan Therapy',
                status: 'active',
                progress: 80,
                startDate: '2024-01-10',
                nextSession: '2024-02-02'
            }
        ];

        this.schedule = [
            {
                id: 'sch001',
                patientId: 'P001',
                patientName: 'Raj Kumar',
                date: new Date().toISOString().split('T')[0],
                time: '10:00',
                type: 'Follow-up Consultation',
                status: 'scheduled'
            },
            {
                id: 'sch002',
                patientId: 'P002',
                patientName: 'Anita Singh',
                date: new Date().toISOString().split('T')[0],
                time: '11:00',
                type: 'Virechan Session',
                status: 'scheduled'
            }
        ];

        this.notifications = [
            {
                id: 'not001',
                title: 'Schedule Change Request',
                message: 'Raj Kumar has requested to reschedule tomorrow\'s appointment.',
                type: 'schedule',
                date: new Date(),
                read: false,
                priority: 'high'
            },
            {
                id: 'not002',
                title: 'New Patient Assignment',
                message: 'New patient Priya Sharma has been assigned to you.',
                type: 'patient',
                date: new Date(Date.now() - 86400000),
                read: false,
                priority: 'medium'
            }
        ];

        this.feedback = [
            {
                id: 'fb001',
                patientName: 'Raj Kumar',
                rating: 5,
                category: 'treatment',
                message: 'Excellent treatment and care. Dr. Priya is very knowledgeable.',
                date: new Date(Date.now() - 172800000)
            },
            {
                id: 'fb002',
                patientName: 'Anita Singh',
                rating: 5,
                category: 'service',
                message: 'Very satisfied with the treatment progress.',
                date: new Date(Date.now() - 259200000)
            }
        ];
    }

    bindEvents() {
        // Add patient form
        const addPatientForm = document.getElementById('addPatientForm');
        if (addPatientForm) {
            addPatientForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addNewPatient();
            });
        }

        // Reschedule form
        const rescheduleForm = document.getElementById('rescheduleForm');
        if (rescheduleForm) {
            rescheduleForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.rescheduleSession();
            });
        }

        // Set today's date
        const scheduleDate = document.getElementById('scheduleDate');
        if (scheduleDate) {
            scheduleDate.value = new Date().toISOString().split('T')[0];
        }

        // Search and filter events
        const patientSearch = document.getElementById('patientSearch');
        if (patientSearch) {
            patientSearch.addEventListener('input', () => this.filterPatients());
        }

        const patientFilter = document.getElementById('patientFilter');
        if (patientFilter) {
            patientFilter.addEventListener('change', () => this.filterPatients());
        }
    }

    updateDashboard() {
        this.updateDoctorInfo();
        this.updateStats();
        this.updateSchedule();
        this.updatePatientsList();
        this.updateNotifications();
        this.updateFeedback();
    }

    updateDoctorInfo() {
        document.getElementById('doctorName').textContent = this.doctor.name;
    }

    updateStats() {
        const todayAppointments = this.schedule.filter(s => 
            s.date === new Date().toISOString().split('T')[0]
        ).length;

        document.getElementById('todayAppointments').textContent = todayAppointments;
        document.getElementById('totalPatients').textContent = this.patients.length;
        document.getElementById('activePatients').textContent = 
            this.patients.filter(p => p.status === 'active').length;

        const avgRating = this.feedback.length > 0 ? 
            (this.feedback.reduce((sum, fb) => sum + fb.rating, 0) / this.feedback.length).toFixed(1) : '0.0';
        document.getElementById('averageRating').textContent = avgRating;
    }

    updateSchedule() {
        const today = new Date().toISOString().split('T')[0];
        const todaySchedule = this.schedule.filter(s => s.date === today);
        
        const upcomingSessions = document.getElementById('upcomingSessions');
        const scheduleList = document.getElementById('scheduleList');

        if (upcomingSessions) {
            upcomingSessions.innerHTML = todaySchedule.slice(0, 3).map(session => `
                <div class="session-item">
                    <div class="session-time">${this.formatTime(session.time)}</div>
                    <div class="session-details">
                        <h4>${session.patientName}</h4>
                        <p>${session.type}</p>
                    </div>
                    <div class="session-status status-${session.status}">
                        ${session.status}
                    </div>
                </div>
            `).join('');
        }

        if (scheduleList) {
            scheduleList.innerHTML = todaySchedule.map(session => `
                <div class="schedule-item">
                    <div class="schedule-time">${this.formatTime(session.time)}</div>
                    <div class="schedule-content">
                        <h4>${session.patientName}</h4>
                        <p>${session.type}</p>
                        <div class="schedule-actions">
                            <button onclick="viewPatientDetails('${session.patientId}')" class="btn-sm btn-secondary">View Patient</button>
                            <button onclick="markSessionComplete('${session.id}')" class="btn-sm btn-primary">Complete</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    updatePatientsList() {
        const container = document.getElementById('patientsList');
        if (!container) return;

        container.innerHTML = this.patients.map(patient => `
            <div class="patient-card" onclick="viewPatientDetails('${patient.id}')">
                <div class="patient-header">
                    <h3>${patient.name}</h3>
                    <div class="patient-status status-${patient.status}">${patient.status}</div>
                </div>
                <div class="patient-info">
                    <p><i class="fas fa-user"></i> ${patient.age} years, ${patient.gender}</p>
                    <p><i class="fas fa-phone"></i> ${formatPhoneNumber(patient.phone)}</p>
                    <p><i class="fas fa-stethoscope"></i> ${patient.condition}</p>
                    <p><i class="fas fa-prescription"></i> ${patient.treatment}</p>
                </div>
                <div class="patient-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${patient.progress}%"></div>
                    </div>
                    <span>${patient.progress}% Complete</span>
                </div>
                <div class="patient-actions">
                    <button onclick="event.stopPropagation(); editTreatmentPlan('${patient.id}')" class="btn-sm btn-secondary">Edit Plan</button>
                    <button onclick="event.stopPropagation(); scheduleSession('${patient.id}')" class="btn-sm btn-primary">Schedule</button>
                </div>
            </div>
        `).join('');
    }

    updateNotifications() {
        const notificationsList = document.getElementById('notificationsList');
        const quickNotifications = document.getElementById('quickNotifications');
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

        if (quickNotifications) {
            quickNotifications.innerHTML = this.notifications.slice(0, 3).map(notification => `
                <div class="quick-notification ${notification.read ? 'read' : 'unread'}">
                    <strong>${notification.title}</strong>
                    <p>${notification.message}</p>
                </div>
            `).join('');
        }
    }

    updateFeedback() {
        const feedbackList = document.getElementById('feedbackList');
        const recentFeedback = document.getElementById('recentFeedback');

        if (recentFeedback) {
            recentFeedback.innerHTML = this.feedback.slice(0, 3).map(fb => `
                <div class="feedback-item">
                    <div class="feedback-rating">${'★'.repeat(fb.rating)}</div>
                    <p>${fb.message}</p>
                    <span class="feedback-patient">- ${fb.patientName}</span>
                </div>
            `).join('');
        }

        if (feedbackList) {
            feedbackList.innerHTML = this.feedback.map(fb => `
                <div class="feedback-card">
                    <div class="feedback-header">
                        <div class="feedback-rating">${'★'.repeat(fb.rating)}</div>
                        <span class="feedback-date">${formatDate(fb.date)}</span>
                    </div>
                    <h4>${fb.patientName}</h4>
                    <p class="feedback-category">Category: ${fb.category}</p>
                    <p class="feedback-message">${fb.message}</p>
                </div>
            `).join('');
        }
    }

    formatTime(time24) {
        const [hours, minutes] = time24.split(':');
        const hour12 = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hour12}:${minutes} ${ampm}`;
    }

    getNotificationIcon(type) {
        const icons = {
            schedule: 'calendar-alt',
            patient: 'user-plus',
            treatment: 'prescription-bottle-alt',
            system: 'info-circle'
        };
        return icons[type] || 'bell';
    }

    async addNewPatient() {
        const formData = {
            name: document.getElementById('newPatientName').value,
            phone: document.getElementById('newPatientPhone').value,
            age: document.getElementById('newPatientAge').value,
            gender: document.getElementById('newPatientGender').value,
            condition: document.getElementById('newPatientCondition').value,
            treatment: document.getElementById('newPatientTreatment').value
        };

        const submitBtn = document.querySelector('#addPatientForm button[type="submit"]');
        showLoading(submitBtn, 'Adding...');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const newPatient = {
                id: 'P' + String(this.patients.length + 1).padStart(3, '0'),
                ...formData,
                status: 'pending',
                progress: 0,
                startDate: new Date().toISOString().split('T')[0],
                nextSession: null
            };

            this.patients.push(newPatient);
            this.updatePatientsList();
            this.updateStats();

            showNotification(`Patient ${formData.name} added successfully!`, 'success');
            closeAddPatientModal();
            document.getElementById('addPatientForm').reset();

        } catch (error) {
            showNotification('Failed to add patient. Please try again.', 'error');
        } finally {
            hideLoading(submitBtn);
        }
    }

    filterPatients() {
        // Implementation for patient filtering would go here
        console.log('Filtering patients...');
    }
}

// Global functions
function addNewPatient() {
    document.getElementById('addPatientModal').style.display = 'block';
}

function closeAddPatientModal() {
    document.getElementById('addPatientModal').style.display = 'none';
}

function rescheduleSession() {
    document.getElementById('rescheduleModal').style.display = 'block';
}

function closeRescheduleModal() {
    document.getElementById('rescheduleModal').style.display = 'none';
}

function viewPatientDetails(patientId) {
    console.log('View patient details:', patientId);
}

function scheduleAppointment() {
    console.log('Schedule appointment');
}

function viewTreatmentPlans() {
    showSection('treatments');
}

function refreshDashboard() {
    if (window.doctorDashboard) {
        window.doctorDashboard.updateDashboard();
        showNotification('Dashboard refreshed', 'success');
    }
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('active');
}

function markNotificationRead(notificationId) {
    if (window.doctorDashboard) {
        const notification = window.doctorDashboard.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            window.doctorDashboard.updateNotifications();
        }
    }
}

function markAllNotificationsRead() {
    if (window.doctorDashboard) {
        window.doctorDashboard.notifications.forEach(n => n.read = true);
        window.doctorDashboard.updateNotifications();
        showNotification('All notifications marked as read', 'success');
    }
}

function loadScheduleForDate() {
    console.log('Loading schedule for selected date');
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    window.doctorDashboard = new DoctorDashboard();
});