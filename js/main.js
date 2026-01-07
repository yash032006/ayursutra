// Main JavaScript file for AyurSutra website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    initMobileMenu();
    initSmoothScrolling();
    initFormValidations();
    updateCurrentYear();
    
    // Set minimum date for appointment booking
    setMinimumDate();
    
    console.log('AyurSutra website initialized successfully');
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation utilities
function initFormValidations() {
    // Phone number validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            validatePhoneNumber(this);
        });
    });
    
    // Date validation
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.addEventListener('change', function() {
            validateDate(this);
        });
    });
}

// Validate phone number
function validatePhoneNumber(input) {
    const phoneRegex = /^[6-9]\d{9}$/;
    const value = input.value.replace(/\D/g, '');
    
    if (value.length > 10) {
        input.value = value.slice(0, 10);
    }
    
    const isValid = phoneRegex.test(input.value);
    toggleInputError(input, !isValid && input.value.length === 10, 'Please enter a valid Indian mobile number');
    
    return isValid;
}

// Validate date
function validateDate(input) {
    const selectedDate = new Date(input.value);
    const today = new Date();
    const dayOfWeek = selectedDate.getDay();
    
    // Reset time to compare only dates
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    let errorMessage = '';
    
    if (selectedDate < today) {
        errorMessage = 'Please select a future date';
    } else if (dayOfWeek === 0) { // Sunday
        errorMessage = 'Appointments are not available on Sundays';
    }
    
    toggleInputError(input, !!errorMessage, errorMessage);
    return !errorMessage;
}

// Toggle input error state
function toggleInputError(input, hasError, message) {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');
    
    if (hasError) {
        input.classList.add('error');
        if (!existingError) {
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            formGroup.appendChild(errorElement);
        }
    } else {
        input.classList.remove('error');
        if (existingError) {
            existingError.remove();
        }
    }
}

// Set minimum date for date inputs
function setMinimumDate() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.setAttribute('min', minDate);
    });
}

// Update current year in copyright
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Show loading state
function showLoading(element, text = 'Loading...') {
    const originalContent = element.innerHTML;
    element.dataset.originalContent = originalContent;
    element.innerHTML = `
        <span class="loading"></span>
        <span>${text}</span>
    `;
    element.disabled = true;
}

// Hide loading state
function hideLoading(element) {
    const originalContent = element.dataset.originalContent;
    if (originalContent) {
        element.innerHTML = originalContent;
        element.disabled = false;
    }
}

// Show notification
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} slide-up`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            closeNotification(notification.querySelector('.notification-close'));
        }, duration);
    }
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

// Close notification
function closeNotification(button) {
    const notification = button.closest('.notification');
    notification.style.animation = 'slideDown 0.3s ease-out';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Generate random ID
function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Format date for display
function formatDate(date, includeTime = false) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
    
    return new Date(date).toLocaleDateString('en-IN', options);
}

// Format phone number for display
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.replace(/(\d{5})(\d{5})/, '$1 $2');
}

// Local Storage utilities
const Storage = {
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error writing to localStorage:', e);
            return false;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },
    
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing localStorage:', e);
            return false;
        }
    }
};

// Session Management
const Session = {
    isLoggedIn: function() {
        return !!Storage.get('user');
    },
    
    getUser: function() {
        return Storage.get('user');
    },
    
    setUser: function(user) {
        return Storage.set('user', user);
    },
    
    logout: function() {
        Storage.remove('user');
        Storage.remove('token');
        window.location.href = 'login.html';
    },
    
    redirectIfNotLoggedIn: function() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },
    
    redirectToDashboard: function(userType) {
        const dashboards = {
            patient: 'patient-dashboard.html',
            doctor: 'doctor-dashboard.html',
            admin: 'admin-dashboard.html'
        };
        
        if (dashboards[userType]) {
            window.location.href = dashboards[userType];
        }
    }
};

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        Session.logout();
    }
}

// Dashboard utilities
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update sidebar navigation
    document.querySelectorAll('.sidebar-nav li').forEach(li => {
        li.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`)?.parentElement;
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Optionally show user-friendly error message
});

// API utilities
const API = {
    baseURL: '', // Would be set to actual API endpoint
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        const token = Storage.get('token');
        if (token) {
            defaultOptions.headers.Authorization = `Bearer ${token}`;
        }
        
        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    get(endpoint) {
        return this.request(endpoint);
    },
    
    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    
    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    
    delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
};

// Utility functions for animations
function animateElement(element, animationClass, duration = 1000) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

// Copy to clipboard utility
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success', 2000);
        return true;
    } catch (err) {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy to clipboard', 'error', 3000);
        return false;
    }
}

// Print utility
function printPage() {
    window.print();
}

// Export functions for other scripts to use
window.AyurSutra = {
    showLoading,
    hideLoading,
    showNotification,
    formatDate,
    formatPhoneNumber,
    Storage,
    Session,
    API,
    showSection,
    validatePhoneNumber,
    validateDate,
    generateId,
    animateElement,
    copyToClipboard,
    printPage
};