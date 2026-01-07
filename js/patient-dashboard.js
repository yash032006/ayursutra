// Patient Dashboard System for AyurSutra

class PatientDashboard {
    constructor() {
        this.patient = null;
        this.treatmentData = null;
        this.appointments = [];
        this.notifications = [];
        this.feedbackHistory = [];
        this.init();
    }

    init() {
        // Check authentication
        if (!Session.redirectIfNotLoggedIn()) return;
        
        const user = Session.getUser();
        if (user.role !== 'patient') {
            showNotification('Access denied. Patient login required.', 'error');
            Session.logout();
            return;
        }

        this.patient = user;
        this.loadPatientData();
        this.bindEvents();
        this.updateDashboard();
        console.log('Patient dashboard initialized for:', user.name);
    }

    loadPatientData() {
        // Sample patient treatment data
        this.treatmentData = {
            type: 'Panchkarma - Vaman Therapy',
            startDate: '2024-01-15',
            expectedEndDate: '2024-02-15',
            currentProgress: 60,
            completedSessions: 6,
            totalSessions: 10,
            condition: 'Chronic Asthma & Digestive Issues',
            nextSessionDate: '2024-02-01',
            nextSessionTime: '10:00 AM',
            steps: [
                {
                    id: 1,
                    title: 'Initial Consultation',
                    date: '2024-01-15',
                    time: '9:00 AM',
                    status: 'completed',
                    details: 'Complete health assessment and treatment plan discussion.',
                    precautions: 'Light diet recommended before starting treatment.'
                },
                {
                    id: 2,
                    title: 'Preparatory Phase (Purvakarma)',
                    date: '2024-01-16',
                    time: '10:00 AM',
                    status: 'completed',
                    details: 'Oleation therapy with medicated ghee for 3 days.',
                    precautions: 'Avoid cold foods and drinks. Rest well.'
                },
                {
                    id: 3,
                    title: 'Steam Therapy (Swedana) - Day 1',
                    date: '2024-01-19',
                    time: '11:00 AM',
                    status: 'completed',
                    details: 'Herbal steam therapy to prepare body for main treatment.',
                    precautions: 'Drink warm water only. No heavy physical activity.'
                },
                {
                    id: 4,
                    title: 'Vaman Therapy - Session 1',
                    date: '2024-01-20',
                    time: '10:00 AM',
                    status: 'completed',
                    details: 'First therapeutic vomiting session. Excellent response.',
                    precautions: 'Complete rest for the day. Light khichdi only.'
                },
                {
                    id: 5,
                    title: 'Recovery & Assessment',
                    date: '2024-01-22',
                    time: '9:30 AM',
                    status: 'completed',
                    details: 'Post-therapy assessment and gradual diet introduction.',
                    precautions: 'Continue light diet. Monitor any unusual symptoms.'
                },
                {
                    id: 6,
                    title: 'Vaman Therapy - Session 2',
                    date: '2024-01-25',
                    time: '10:00 AM',
                    status: 'completed',
                    details: 'Second session with improved tolerance and results.',
                    precautions: 'Maintain diet restrictions. Adequate rest required.'
                },
                {
                    id: 7,
                    title: 'Follow-up Consultation',
                    date: '2024-02-01',
                    time: '10:00 AM',
                    status: 'current',
                    details: 'Progress evaluation and treatment plan adjustment.',
                    precautions: 'Bring previous session reports. Fasting required.'
                },
                {
                    id: 8,
                    title: 'Supportive Therapy',
                    date: '2024-02-05',
                    time: '11:00 AM',
                    status: 'pending',
                    details: 'Herbal medications and lifestyle counseling.',
                    precautions: 'Follow dietary guidelines strictly.'
                },
                {
                    id: 9,
                    title: 'Final Assessment',
                    date: '2024-02-10',
                    time: '9:00 AM',
                    status: 'pending',
                    details: 'Complete health evaluation and treatment outcome analysis.',
                    precautions: 'Prepare list of any concerns or questions.'
                },
                {
                    id: 10,
                    title: 'Discharge & Home Care Plan',
                    date: '2024-02-15',
                    time: '10:00 AM',
                    status: 'pending',
                    details: 'Treatment completion and future care instructions.',
                    precautions: 'Collect all reports and follow-up schedule.'
                }
            ]
        };

        // Sample appointments data
        this.appointments = [
            {
                id: 'apt001',
                date: '2024-02-01',
                time: '10:00 AM',
                doctor: 'Dr. Priya Sharma',
                type: 'Follow-up Consultation',
                status: 'upcoming',
                location: 'Room 101, AyurHeal Center Mumbai'
            },
            {
                id: 'apt002',
                date: '2024-02-05',
                time: '11:00 AM',
                doctor: 'Dr. Priya Sharma',
                type: 'Supportive Therapy',
                status: 'upcoming',
                location: 'Room 101, AyurHeal Center Mumbai'
            },
            {
                id: 'apt003',
                date: '2024-01-25',
                time: '10:00 AM',
                doctor: 'Dr. Priya Sharma',
                type: 'Vaman Therapy - Session 2',
                status: 'completed',
                location: 'Treatment Room 3, AyurHeal Center Mumbai'
            }
        ];

        // Sample notifications
        this.notifications = [
            {
                id: 'not001',
                title: 'Upcoming Appointment Reminder',
                message: 'Your follow-up consultation is scheduled for Feb 1, 2024 at 10:00 AM',
                type: 'appointment',
                date: new Date(),
                read: false,
                priority: 'high'
            },
            {
                id: 'not002',
                title: 'Dietary Guidelines Updated',
                message: 'Dr. Priya has updated your dietary recommendations. Please check the details.',
                type: 'treatment',
                date: new Date(Date.now() - 86400000), // 1 day ago
                read: false,
                priority: 'medium'
            },
            {
                id: 'not003',
                title: 'Feedback Request',
                message: 'Please provide feedback for your recent Vaman therapy session.',
                type: 'feedback',
                date: new Date(Date.now() - 172800000), // 2 days ago
                read: true,
                priority: 'low'
            }
        ];
    }

    bindEvents() {
        // Treatment progress click handlers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.treatment-step')) {
                const stepId = e.target.closest('.treatment-step').dataset.stepId;
                this.showStepDetails(stepId);
            }
        });

        // Feedback form submission
        const feedbackForm = document.getElementById('feedbackForm');
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitFeedback();
            });
        }

        // Rating stars interaction
        document.querySelectorAll('.rating-stars i').forEach(star => {
            star.addEventListener('click', (e) => {
                this.setRating(parseInt(e.target.dataset.rating));
            });
        });

        // Schedule change form
        const scheduleChangeForm = document.getElementById('scheduleChangeForm');
        if (scheduleChangeForm) {
            scheduleChangeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitScheduleChangeRequest();
            });
        }
    }

    updateDashboard() {
        this.updatePatientInfo();
        this.updateTreatmentProgress();
        this.updateAppointments();
        this.updateNotifications();
        this.loadPreviousFeedback();
    }

    updatePatientInfo() {
        // Update header
        const patientNameElements = document.querySelectorAll('#patientName');
        patientNameElements.forEach(el => {
            el.textContent = this.patient.name;
        });

        // Update overview cards
        document.getElementById('doctorName').textContent = this.patient.doctor;
        document.getElementById('hospitalName').textContent = this.patient.hospital;
        document.getElementById('treatmentType').textContent = this.treatmentData.type;
        document.getElementById('nextSession').textContent = `${this.treatmentData.nextSessionDate} ${this.treatmentData.nextSessionTime}`;

        // Update patient info card
        document.getElementById('patientId').textContent = this.patient.id;
        document.getElementById('patientCondition').textContent = this.treatmentData.condition;
        document.getElementById('treatmentStart').textContent = formatDate(this.treatmentData.startDate);
        document.getElementById('treatmentEnd').textContent = formatDate(this.treatmentData.expectedEndDate);

        // Update feedback form doctor name
        const feedbackDoctor = document.getElementById('feedbackDoctor');
        if (feedbackDoctor) {
            feedbackDoctor.value = this.patient.doctor;
        }
    }

    updateTreatmentProgress() {
        // Update progress stats
        document.getElementById('overallProgress').textContent = `${this.treatmentData.currentProgress}%`;
        document.getElementById('completedSessions').textContent = this.treatmentData.completedSessions;
        document.getElementById('totalSessions').textContent = this.treatmentData.totalSessions;

        // Generate treatment steps
        const stepsContainer = document.getElementById('treatmentSteps');
        if (stepsContainer) {
            stepsContainer.innerHTML = this.treatmentData.steps.map(step => this.createStepElement(step)).join('');
        }
    }

    createStepElement(step) {
        const statusIcon = {
            completed: 'fas fa-check-circle text-success',
            current: 'fas fa-clock text-warning',
            pending: 'fas fa-circle text-muted'
        };

        const statusClass = {
            completed: 'step-completed',
            current: 'step-current',
            pending: 'step-pending'
        };

        return `
            <div class="treatment-step ${statusClass[step.status]}" data-step-id="${step.id}">
                <div class="step-indicator">
                    <i class="${statusIcon[step.status]}"></i>
                    <span class="step-number">${step.id}</span>
                </div>
                <div class="step-content">
                    <h4>${step.title}</h4>
                    <p class="step-date">
                        <i class="fas fa-calendar"></i> ${formatDate(step.date)}
                        <i class="fas fa-clock"></i> ${step.time}
                    </p>
                    <p class="step-description">${step.details}</p>
                </div>
                <div class="step-actions">
                    <button class="btn-sm btn-secondary" onclick="showStepDetails('${step.id}')">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    showStepDetails(stepId) {
        const step = this.treatmentData.steps.find(s => s.id == stepId);
        if (!step) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2>${step.title}</h2>
                <div class="step-detail-content">
                    <div class="detail-section">
                        <h4><i class="fas fa-calendar-alt"></i> Schedule</h4>
                        <p><strong>Date:</strong> ${formatDate(step.date)}</p>
                        <p><strong>Time:</strong> ${step.time}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${step.status}">${step.status.toUpperCase()}</span></p>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-info-circle"></i> Details</h4>
                        <p>${step.details}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-shield-alt"></i> Precautions</h4>
                        <p>${step.precautions}</p>
                    </div>
                    
                    ${step.status === 'current' || step.status === 'pending' ? `
                        <div class="step-actions-modal">
                            <button onclick="requestScheduleChange()" class="btn-secondary">
                                <i class="fas fa-calendar-alt"></i> Request Reschedule
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    updateAppointments() {
        const upcomingContainer = document.getElementById('upcomingAppointments');
        const completedContainer = document.getElementById('completedAppointments');

        if (upcomingContainer) {
            const upcomingAppts = this.appointments.filter(apt => apt.status === 'upcoming');
            upcomingContainer.innerHTML = upcomingAppts.map(apt => this.createAppointmentCard(apt)).join('') || 
                '<p class="no-appointments">No upcoming appointments</p>';
        }

        if (completedContainer) {
            const completedAppts = this.appointments.filter(apt => apt.status === 'completed');
            completedContainer.innerHTML = completedAppts.map(apt => this.createAppointmentCard(apt)).join('') ||
                '<p class="no-appointments">No completed appointments</p>';
        }
    }

    createAppointmentCard(appointment) {
        const statusIcon = appointment.status === 'upcoming' ? 'fas fa-clock text-warning' : 'fas fa-check-circle text-success';
        
        return `
            <div class="appointment-card">
                <div class="appointment-header">
                    <h4>${appointment.type}</h4>
                    <i class="${statusIcon}"></i>
                </div>
                <div class="appointment-details">
                    <p><i class="fas fa-calendar"></i> ${formatDate(appointment.date)}</p>
                    <p><i class="fas fa-clock"></i> ${appointment.time}</p>
                    <p><i class="fas fa-user-md"></i> ${appointment.doctor}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${appointment.location}</p>
                </div>
                ${appointment.status === 'upcoming' ? `
                    <div class="appointment-actions">
                        <button onclick="requestScheduleChange('${appointment.id}')" class="btn-sm btn-secondary">
                            Reschedule
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    updateNotifications() {
        const notificationsList = document.getElementById('notificationsList');
        const quickNotifications = document.getElementById('quickNotifications');
        const notificationCount = document.getElementById('notificationCount');

        // Update count
        const unreadCount = this.notifications.filter(n => !n.read).length;
        if (notificationCount) {
            notificationCount.textContent = unreadCount;
            notificationCount.style.display = unreadCount > 0 ? 'block' : 'none';
        }

        // Full notifications list
        if (notificationsList) {
            notificationsList.innerHTML = this.notifications.map(notification => this.createNotificationItem(notification)).join('');
        }

        // Quick notifications (recent 3)
        if (quickNotifications) {
            const recentNotifications = this.notifications.slice(0, 3);
            quickNotifications.innerHTML = recentNotifications.map(notification => this.createQuickNotificationItem(notification)).join('');
        }
    }

    createNotificationItem(notification) {
        const priorityClass = {
            high: 'notification-high',
            medium: 'notification-medium',
            low: 'notification-low'
        };

        const typeIcon = {
            appointment: 'fas fa-calendar-check',
            treatment: 'fas fa-prescription-bottle-alt',
            feedback: 'fas fa-comment-medical',
            system: 'fas fa-info-circle'
        };

        return `
            <div class="notification-item ${notification.read ? 'notification-read' : 'notification-unread'} ${priorityClass[notification.priority]}">
                <div class="notification-icon">
                    <i class="${typeIcon[notification.type]}"></i>
                </div>
                <div class="notification-content">
                    <h4>${notification.title}</h4>
                    <p>${notification.message}</p>
                    <span class="notification-time">${this.getRelativeTime(notification.date)}</span>
                </div>
                <div class="notification-actions">
                    ${!notification.read ? `<button onclick="markNotificationRead('${notification.id}')" class="btn-sm btn-primary">Mark Read</button>` : ''}
                    <button onclick="deleteNotification('${notification.id}')" class="btn-sm btn-text">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    createQuickNotificationItem(notification) {
        return `
            <div class="quick-notification ${notification.read ? 'read' : 'unread'}">
                <div class="notification-dot ${notification.priority}"></div>
                <div class="notification-text">
                    <strong>${notification.title}</strong>
                    <p>${notification.message}</p>
                </div>
            </div>
        `;
    }

    getRelativeTime(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return formatDate(date);
    }

    setRating(rating) {
        document.querySelectorAll('.rating-stars i').forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    async submitFeedback() {
        const feedbackData = {
            doctor: document.getElementById('feedbackDoctor').value,
            rating: document.querySelectorAll('.rating-stars i.active').length,
            category: document.getElementById('feedbackCategory').value,
            message: document.getElementById('feedbackMessage').value
        };

        if (feedbackData.rating === 0) {
            showNotification('Please provide a rating', 'error');
            return;
        }

        if (!feedbackData.message.trim()) {
            showNotification('Please provide feedback message', 'error');
            return;
        }

        const submitBtn = document.querySelector('#feedbackForm button[type="submit"]');
        showLoading(submitBtn, 'Submitting...');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Feedback submitted successfully!', 'success');
            
            // Reset form
            document.getElementById('feedbackForm').reset();
            this.setRating(0);
            
            // Add to history
            this.feedbackHistory.unshift({
                ...feedbackData,
                date: new Date(),
                id: generateId('fb')
            });
            
            this.loadPreviousFeedback();
            
        } catch (error) {
            showNotification('Failed to submit feedback. Please try again.', 'error');
        } finally {
            hideLoading(submitBtn);
        }
    }

    loadPreviousFeedback() {
        const container = document.getElementById('previousFeedback');
        if (!container) return;

        if (this.feedbackHistory.length === 0) {
            container.innerHTML = '<p class="no-feedback">No previous feedback submitted</p>';
            return;
        }

        container.innerHTML = this.feedbackHistory.map(feedback => `
            <div class="feedback-item">
                <div class="feedback-header">
                    <div class="feedback-rating">
                        ${'★'.repeat(feedback.rating)}${'☆'.repeat(5-feedback.rating)}
                    </div>
                    <span class="feedback-date">${formatDate(feedback.date)}</span>
                </div>
                <p class="feedback-category"><strong>Category:</strong> ${feedback.category}</p>
                <p class="feedback-message">${feedback.message}</p>
            </div>
        `).join('');
    }

    async submitScheduleChangeRequest() {
        const requestData = {
            reason: document.getElementById('changeReason').value,
            details: document.getElementById('changeDetails').value
        };

        if (!requestData.details.trim()) {
            showNotification('Please provide details for the schedule change request', 'error');
            return;
        }

        const submitBtn = document.querySelector('#scheduleChangeForm button[type="submit"]');
        showLoading(submitBtn, 'Submitting...');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Schedule change request submitted. You will be contacted soon.', 'success');
            closeScheduleChangeModal();
            
            // Add notification
            this.notifications.unshift({
                id: generateId('not'),
                title: 'Schedule Change Request Submitted',
                message: `Your request has been sent to ${this.patient.doctor}. You will be contacted within 24 hours.`,
                type: 'system',
                date: new Date(),
                read: false,
                priority: 'medium'
            });
            
            this.updateNotifications();
            
        } catch (error) {
            showNotification('Failed to submit request. Please try again.', 'error');
        } finally {
            hideLoading(submitBtn);
        }
    }
}

// Global functions
function showAppointmentTab(tabName) {
    document.querySelectorAll('.appointments-list').forEach(list => {
        list.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName + 'Appointments').classList.add('active');
    event.target.classList.add('active');
}

function requestScheduleChange(appointmentId = null) {
    const modal = document.getElementById('scheduleChangeModal');
    modal.style.display = 'block';
    
    // Store appointment ID if provided
    if (appointmentId) {
        modal.dataset.appointmentId = appointmentId;
    }
}

function closeScheduleChangeModal() {
    const modal = document.getElementById('scheduleChangeModal');
    modal.style.display = 'none';
    document.getElementById('scheduleChangeForm').reset();
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('active');
}

function markNotificationRead(notificationId) {
    if (window.patientDashboard) {
        const notification = window.patientDashboard.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            window.patientDashboard.updateNotifications();
        }
    }
}

function markAllAsRead() {
    if (window.patientDashboard) {
        window.patientDashboard.notifications.forEach(n => n.read = true);
        window.patientDashboard.updateNotifications();
        showNotification('All notifications marked as read', 'success');
    }
}

function deleteNotification(notificationId) {
    if (window.patientDashboard) {
        const index = window.patientDashboard.notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            window.patientDashboard.notifications.splice(index, 1);
            window.patientDashboard.updateNotifications();
        }
    }
}

function showStepDetails(stepId) {
    if (window.patientDashboard) {
        window.patientDashboard.showStepDetails(stepId);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    window.patientDashboard = new PatientDashboard();
});

// Close modals on outside click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});