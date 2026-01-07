// Login system for AyurSutra website

class LoginSystem {
    constructor() {
        this.captchaText = '';
        this.currentRole = '';
        this.loginAttempts = 0;
        this.maxAttempts = 3;
        this.lockoutTime = 15 * 60 * 1000; // 15 minutes
        this.init();
    }

    init() {
        this.generateCaptcha();
        this.bindEvents();
        this.checkLockout();
        console.log('Login system initialized');
    }

    // Sample user data (in real implementation, this would come from a secure backend)
    getSampleUsers() {
        return {
            // Patient credentials
            patients: {
                'P001': { password: 'patient123', name: 'Raj Kumar', hospital: 'AyurHeal Center Mumbai', doctor: 'Dr. Priya Sharma' },
                'P002': { password: 'patient456', name: 'Anita Singh', hospital: 'Kerala Panchkarma Hospital', doctor: 'Dr. Ravi Menon' },
                'P003': { password: 'demo123', name: 'Demo Patient', hospital: 'Demo Hospital', doctor: 'Dr. Demo' }
            },
            // Doctor credentials  
            doctors: {
                'D001': { password: 'doctor123', name: 'Dr. Priya Sharma', hospital: 'AyurHeal Center Mumbai', specialization: 'Panchkarma' },
                'D002': { password: 'doctor456', name: 'Dr. Ravi Menon', hospital: 'Kerala Panchkarma Hospital', specialization: 'General Ayurveda' },
                'D003': { password: 'demo123', name: 'Dr. Demo', hospital: 'Demo Hospital', specialization: 'All Treatments' }
            },
            // Admin credentials
            admins: {
                'A001': { password: 'admin123', name: 'Hospital Admin', hospital: 'AyurHeal Center Mumbai' },
                'A002': { password: 'admin456', name: 'System Admin', hospital: 'Kerala Panchkarma Hospital' },
                'A003': { password: 'demo123', name: 'Demo Admin', hospital: 'Demo Hospital' }
            }
        };
    }

    bindEvents() {
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Role selection change
        const roleSelect = document.getElementById('userRole');
        if (roleSelect) {
            roleSelect.addEventListener('change', (e) => {
                this.currentRole = e.target.value;
                this.updateLoginForm();
            });
        }

        // Password toggle
        const togglePassword = document.querySelector('.toggle-password');
        if (togglePassword) {
            togglePassword.addEventListener('click', this.togglePasswordVisibility);
        }

        // Captcha refresh
        const refreshCaptcha = document.querySelector('.refresh-captcha');
        if (refreshCaptcha) {
            refreshCaptcha.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateCaptcha();
            });
        }
    }

    updateLoginForm() {
        const userIdInput = document.getElementById('userId');
        const placeholders = {
            patient: 'Enter Patient ID (e.g., P001)',
            doctor: 'Enter Doctor ID (e.g., D001)',
            admin: 'Enter Admin ID (e.g., A001)'
        };

        if (userIdInput && this.currentRole) {
            userIdInput.placeholder = placeholders[this.currentRole];
        }

        // Update demo credentials display
        this.showDemoCredentials();
    }

    showDemoCredentials() {
        const demoInfo = {
            patient: { id: 'P003', password: 'demo123' },
            doctor: { id: 'D003', password: 'demo123' },
            admin: { id: 'A003', password: 'demo123' }
        };

        const existingDemo = document.querySelector('.demo-credentials');
        if (existingDemo) {
            existingDemo.remove();
        }

        if (this.currentRole && demoInfo[this.currentRole]) {
            const demo = demoInfo[this.currentRole];
            const demoDiv = document.createElement('div');
            demoDiv.className = 'demo-credentials';
            demoDiv.innerHTML = `
                <div class="demo-info">
                    <h4><i class="fas fa-info-circle"></i> Demo Credentials</h4>
                    <p><strong>User ID:</strong> ${demo.id}</p>
                    <p><strong>Password:</strong> ${demo.password}</p>
                    <button type="button" onclick="fillDemoCredentials('${demo.id}', '${demo.password}')" class="btn-secondary">
                        Use Demo Login
                    </button>
                </div>
            `;
            
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.appendChild(demoDiv);
            }
        }
    }

    generateCaptcha() {
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        this.captchaText = result;
        
        const captchaDisplay = document.getElementById('captchaText');
        if (captchaDisplay) {
            captchaDisplay.textContent = result;
            captchaDisplay.style.fontFamily = 'monospace';
            captchaDisplay.style.fontSize = '18px';
            captchaDisplay.style.fontWeight = 'bold';
            captchaDisplay.style.letterSpacing = '3px';
            captchaDisplay.style.color = '#2E7D32';
            captchaDisplay.style.backgroundColor = '#F1F8E9';
            captchaDisplay.style.padding = '10px';
            captchaDisplay.style.borderRadius = '5px';
        }
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.querySelector('.toggle-password');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    }

    validateForm() {
        const role = document.getElementById('userRole').value;
        const userId = document.getElementById('userId').value.trim();
        const password = document.getElementById('password').value;
        const captchaInput = document.getElementById('captcha').value;

        // Reset previous errors
        this.clearErrors();

        let isValid = true;
        const errors = [];

        // Validate role
        if (!role) {
            errors.push('Please select your role');
            isValid = false;
        }

        // Validate user ID
        if (!userId) {
            errors.push('User ID is required');
            isValid = false;
        } else if (userId.length < 3) {
            errors.push('User ID must be at least 3 characters');
            isValid = false;
        }

        // Validate password
        if (!password) {
            errors.push('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            errors.push('Password must be at least 6 characters');
            isValid = false;
        }

        // Validate captcha
        if (!captchaInput) {
            errors.push('Please enter the captcha');
            isValid = false;
        } else if (captchaInput !== this.captchaText) {
            errors.push('Captcha is incorrect');
            this.generateCaptcha(); // Generate new captcha on error
            isValid = false;
        }

        if (!isValid) {
            this.showError(errors.join(', '));
        }

        return isValid;
    }

    async handleLogin() {
        if (this.isLockedOut()) {
            this.showError('Account temporarily locked. Please try again later.');
            return;
        }

        if (!this.validateForm()) {
            this.loginAttempts++;
            this.saveAttemptData();
            return;
        }

        const loginBtn = document.querySelector('.login-btn-submit');
        showLoading(loginBtn, 'Signing In...');

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const role = document.getElementById('userRole').value;
            const userId = document.getElementById('userId').value.trim();
            const password = document.getElementById('password').value;

            const user = this.authenticateUser(role, userId, password);

            if (user) {
                this.loginSuccess(user, role);
            } else {
                this.loginFailure();
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('Login failed. Please try again.');
        } finally {
            hideLoading(loginBtn);
        }
    }

    authenticateUser(role, userId, password) {
        const users = this.getSampleUsers();
        const roleUsers = users[role + 's']; // Convert role to plural (patient -> patients)
        
        if (roleUsers && roleUsers[userId] && roleUsers[userId].password === password) {
            return { ...roleUsers[userId], id: userId, role: role };
        }
        
        return null;
    }

    loginSuccess(user, role) {
        // Clear login attempts
        this.loginAttempts = 0;
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockoutTime');

        // Store user session
        const sessionData = {
            id: user.id,
            name: user.name,
            role: role,
            hospital: user.hospital,
            doctor: user.doctor || null,
            specialization: user.specialization || null,
            loginTime: new Date().toISOString()
        };

        Storage.set('user', sessionData);
        Storage.set('token', this.generateToken());

        // Show success message
        showNotification('Login successful! Redirecting...', 'success');

        // Redirect after delay
        setTimeout(() => {
            Session.redirectToDashboard(role);
        }, 1500);
    }

    loginFailure() {
        this.loginAttempts++;
        this.saveAttemptData();

        const remainingAttempts = this.maxAttempts - this.loginAttempts;
        
        if (remainingAttempts > 0) {
            this.showError(`Invalid credentials. ${remainingAttempts} attempt(s) remaining.`);
        } else {
            // Lock account
            const lockoutTime = Date.now() + this.lockoutTime;
            localStorage.setItem('lockoutTime', lockoutTime.toString());
            this.showError('Too many failed attempts. Account locked for 15 minutes.');
        }

        this.generateCaptcha(); // Generate new captcha on failed login
    }

    saveAttemptData() {
        localStorage.setItem('loginAttempts', this.loginAttempts.toString());
    }

    checkLockout() {
        const lockoutTime = localStorage.getItem('lockoutTime');
        const attempts = localStorage.getItem('loginAttempts');
        
        if (lockoutTime && Date.now() < parseInt(lockoutTime)) {
            const remainingTime = Math.ceil((parseInt(lockoutTime) - Date.now()) / 60000);
            this.showError(`Account locked. Try again in ${remainingTime} minute(s).`);
        } else {
            // Clear expired lockout
            localStorage.removeItem('lockoutTime');
            localStorage.removeItem('loginAttempts');
            this.loginAttempts = 0;
        }
        
        if (attempts) {
            this.loginAttempts = parseInt(attempts);
        }
    }

    isLockedOut() {
        const lockoutTime = localStorage.getItem('lockoutTime');
        return lockoutTime && Date.now() < parseInt(lockoutTime);
    }

    generateToken() {
        // Simple token generation (in production, use proper JWT)
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 32; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorDiv && errorMessage) {
            errorMessage.textContent = message;
            errorDiv.style.display = 'flex';
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        }
    }

    clearErrors() {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }
}

// Global functions for HTML
function generateCaptcha() {
    if (window.loginSystem) {
        window.loginSystem.generateCaptcha();
    }
}

function updateLoginForm() {
    if (window.loginSystem) {
        window.loginSystem.updateLoginForm();
    }
}

function togglePassword() {
    if (window.loginSystem) {
        window.loginSystem.togglePasswordVisibility();
    }
}

function fillDemoCredentials(userId, password) {
    document.getElementById('userId').value = userId;
    document.getElementById('password').value = password;
    showNotification('Demo credentials filled! Click Sign In to continue.', 'info');
}

// Initialize login system
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (Session.isLoggedIn()) {
        const user = Session.getUser();
        showNotification('You are already logged in. Redirecting...', 'info');
        setTimeout(() => {
            Session.redirectToDashboard(user.role);
        }, 1500);
        return;
    }

    // Initialize login system
    window.loginSystem = new LoginSystem();
});

// Add CSS styles for demo credentials
const style = document.createElement('style');
style.textContent = `
.demo-credentials {
    margin-top: 1rem;
    padding: 1rem;
    background: linear-gradient(135deg, #E8F5E8, #F1F8E9);
    border-radius: 8px;
    border-left: 4px solid #4CAF50;
}

.demo-info h4 {
    color: #2E7D32;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.demo-info p {
    margin: 0.25rem 0;
    font-size: 0.85rem;
    color: #558B2F;
}

.demo-info button {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
}

.error-message {
    color: #E53E3E;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    display: block;
}

.form-group input.error {
    border-color: #E53E3E;
}

#loginError {
    background: #FED7D7;
    color: #C53030;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    display: none;
    align-items: center;
    gap: 0.5rem;
}

.captcha-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.refresh-captcha {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.refresh-captcha:hover {
    background: #45a049;
}

.input-wrapper {
    position: relative;
}

.input-wrapper i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
}

.input-wrapper input {
    padding-left: 3rem;
}

.toggle-password {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #666;
}

.toggle-password:hover {
    color: #2E7D32;
}
`;

document.head.appendChild(style);