// FAQ system for AyurSutra website

class FAQSystem {
    constructor() {
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.faqItems = [];
        this.init();
    }

    init() {
        this.collectFAQItems();
        this.bindEvents();
        this.initializeSearch();
        console.log('FAQ system initialized with', this.faqItems.length, 'items');
    }

    collectFAQItems() {
        const faqElements = document.querySelectorAll('.faq-item');
        this.faqItems = Array.from(faqElements).map((element, index) => ({
            id: index,
            element: element,
            question: element.querySelector('.faq-question h3').textContent,
            answer: element.querySelector('.faq-answer').textContent,
            category: element.dataset.category || 'general',
            isOpen: false,
            searchScore: 0
        }));
    }

    bindEvents() {
        // FAQ item click handlers
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', (e) => {
                this.toggleFAQ(e.currentTarget);
            });
        });

        // Category filter buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.textContent.toLowerCase();
                this.filterCategory(category === 'all' ? 'all' : category);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('faqSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Search button
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const searchInput = document.getElementById('faqSearch');
                if (searchInput) {
                    this.handleSearch(searchInput.value);
                }
            });
        }

        // Keyboard navigation for search
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                const searchInput = document.getElementById('faqSearch');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    }

    initializeSearch() {
        // Add search suggestions
        this.addSearchSuggestions();
        
        // Highlight search terms if coming from search
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        if (searchTerm) {
            const searchInput = document.getElementById('faqSearch');
            if (searchInput) {
                searchInput.value = searchTerm;
                this.handleSearch(searchTerm);
            }
        }
    }

    addSearchSuggestions() {
        const searchInput = document.getElementById('faqSearch');
        if (!searchInput) return;

        const suggestions = [
            'How to book appointment',
            'Login credentials',
            'Panchkarma treatments',
            'Reschedule appointment',
            'Treatment cost',
            'Contact support',
            'Safety measures',
            'Treatment duration'
        ];

        // Create datalist for suggestions
        const datalist = document.createElement('datalist');
        datalist.id = 'search-suggestions';
        
        suggestions.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = suggestion;
            datalist.appendChild(option);
        });

        searchInput.setAttribute('list', 'search-suggestions');
        document.body.appendChild(datalist);
    }

    toggleFAQ(questionElement) {
        const faqItem = questionElement.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const icon = questionElement.querySelector('i');
        
        const isOpen = faqItem.classList.contains('active');
        
        if (isOpen) {
            // Close FAQ
            faqItem.classList.remove('active');
            answer.style.maxHeight = '0px';
            icon.style.transform = 'rotate(0deg)';
            
            // Update internal state
            const faqData = this.faqItems.find(item => item.element === faqItem);
            if (faqData) faqData.isOpen = false;
        } else {
            // Open FAQ
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(45deg)';
            
            // Update internal state
            const faqData = this.faqItems.find(item => item.element === faqItem);
            if (faqData) faqData.isOpen = true;
            
            // Smooth scroll to question
            setTimeout(() => {
                questionElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
        
        // Track analytics
        this.trackFAQInteraction(questionElement.querySelector('h3').textContent, !isOpen);
    }

    filterCategory(category) {
        this.currentFilter = category;
        
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = Array.from(document.querySelectorAll('.category-btn')).find(btn => 
            btn.textContent.toLowerCase() === category || (category === 'all' && btn.textContent === 'All')
        );
        
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Filter FAQ items
        this.applyFilters();
        
        // Show filter feedback
        this.showFilterFeedback(category);
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase().trim();
        
        if (this.searchQuery.length > 0) {
            // Calculate search scores for each FAQ
            this.faqItems.forEach(item => {
                item.searchScore = this.calculateSearchScore(item, this.searchQuery);
            });
            
            // Auto-expand matching items if search is specific
            if (this.searchQuery.length > 3) {
                this.autoExpandRelevantFAQs();
            }
        } else {
            // Reset search scores
            this.faqItems.forEach(item => {
                item.searchScore = 0;
            });
        }
        
        this.applyFilters();
        
        // Show search feedback
        if (this.searchQuery.length > 0) {
            this.showSearchFeedback();
        }
    }

    calculateSearchScore(faqItem, query) {
        let score = 0;
        const queryWords = query.split(' ').filter(word => word.length > 2);
        
        queryWords.forEach(word => {
            // Check question title (higher weight)
            if (faqItem.question.toLowerCase().includes(word)) {
                score += 10;
            }
            
            // Check answer content (lower weight)
            if (faqItem.answer.toLowerCase().includes(word)) {
                score += 5;
            }
            
            // Exact phrase matches (bonus points)
            if (faqItem.question.toLowerCase().includes(query)) {
                score += 20;
            }
            
            if (faqItem.answer.toLowerCase().includes(query)) {
                score += 10;
            }
        });
        
        return score;
    }

    applyFilters() {
        let visibleCount = 0;
        
        this.faqItems.forEach(item => {
            let shouldShow = true;
            
            // Apply category filter
            if (this.currentFilter !== 'all' && item.category !== this.currentFilter) {
                shouldShow = false;
            }
            
            // Apply search filter
            if (this.searchQuery.length > 0) {
                if (item.searchScore === 0) {
                    shouldShow = false;
                }
            }
            
            // Show/hide item
            if (shouldShow) {
                item.element.style.display = 'block';
                item.element.classList.add('fade-in');
                visibleCount++;
                
                // Highlight search terms
                if (this.searchQuery.length > 0) {
                    this.highlightSearchTerms(item.element, this.searchQuery);
                }
            } else {
                item.element.style.display = 'none';
                item.element.classList.remove('fade-in');
            }
        });
        
        // Show "no results" message if needed
        this.showNoResultsMessage(visibleCount === 0);
        
        // Sort by relevance if searching
        if (this.searchQuery.length > 0) {
            this.sortByRelevance();
        }
    }

    sortByRelevance() {
        const container = document.querySelector('.faq-accordion');
        const visibleItems = this.faqItems
            .filter(item => item.searchScore > 0)
            .sort((a, b) => b.searchScore - a.searchScore);
        
        visibleItems.forEach(item => {
            container.appendChild(item.element);
        });
    }

    highlightSearchTerms(element, query) {
        const questionTitle = element.querySelector('.faq-question h3');
        const originalText = questionTitle.dataset.originalText || questionTitle.textContent;
        
        if (!questionTitle.dataset.originalText) {
            questionTitle.dataset.originalText = originalText;
        }
        
        if (query.length > 2) {
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            const highlightedText = originalText.replace(regex, '<mark>$1</mark>');
            questionTitle.innerHTML = highlightedText;
        } else {
            questionTitle.textContent = originalText;
        }
    }

    autoExpandRelevantFAQs() {
        const topMatches = this.faqItems
            .filter(item => item.searchScore >= 15)
            .slice(0, 3);
        
        topMatches.forEach(item => {
            if (!item.isOpen) {
                const questionElement = item.element.querySelector('.faq-question');
                this.toggleFAQ(questionElement);
            }
        });
    }

    showSearchFeedback() {
        const matchingItems = this.faqItems.filter(item => item.searchScore > 0);
        const feedbackMsg = matchingItems.length > 0 
            ? `Found ${matchingItems.length} result(s) for "${this.searchQuery}"`
            : `No results found for "${this.searchQuery}"`;
        
        this.showTempMessage(feedbackMsg, matchingItems.length > 0 ? 'success' : 'info');
    }

    showFilterFeedback(category) {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        const message = category === 'all' 
            ? 'Showing all FAQs'
            : `Filtered by: ${categoryName}`;
        
        this.showTempMessage(message, 'info');
    }

    showNoResultsMessage(show) {
        let noResultsDiv = document.querySelector('.no-results-message');
        
        if (show && !noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results-message';
            noResultsDiv.innerHTML = `
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>No FAQs Found</h3>
                    <p>Try adjusting your search terms or browse different categories.</p>
                    <div class="no-results-actions">
                        <button onclick="clearSearch()" class="btn-secondary">Clear Search</button>
                        <button onclick="contactSupport()" class="btn-primary">Contact Support</button>
                    </div>
                </div>
            `;
            
            document.querySelector('.faq-accordion').appendChild(noResultsDiv);
        } else if (!show && noResultsDiv) {
            noResultsDiv.remove();
        }
    }

    showTempMessage(message, type) {
        // Remove existing temp message
        const existing = document.querySelector('.temp-message');
        if (existing) existing.remove();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `temp-message temp-${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        const container = document.querySelector('.faq-content .container');
        container.insertBefore(messageDiv, document.querySelector('.faq-accordion'));
        
        setTimeout(() => messageDiv.remove(), 3000);
    }

    trackFAQInteraction(question, opened) {
        // Analytics tracking (would integrate with actual analytics service)
        console.log(`FAQ ${opened ? 'opened' : 'closed'}: ${question}`);
        
        // Store popular questions in localStorage
        const analytics = JSON.parse(localStorage.getItem('faq_analytics') || '{}');
        if (!analytics[question]) {
            analytics[question] = 0;
        }
        analytics[question]++;
        localStorage.setItem('faq_analytics', JSON.stringify(analytics));
    }

    getPopularQuestions(limit = 5) {
        const analytics = JSON.parse(localStorage.getItem('faq_analytics') || '{}');
        return Object.entries(analytics)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(entry => entry[0]);
    }

    // Search suggestions based on popular questions
    updateSearchSuggestions() {
        const popular = this.getPopularQuestions();
        const datalist = document.getElementById('search-suggestions');
        
        if (datalist && popular.length > 0) {
            // Clear existing options
            datalist.innerHTML = '';
            
            // Add popular questions as suggestions
            popular.forEach(question => {
                const option = document.createElement('option');
                option.value = question;
                datalist.appendChild(option);
            });
        }
    }

    // Export FAQ content for sharing
    exportFAQContent() {
        const visibleFAQs = this.faqItems.filter(item => 
            item.element.style.display !== 'none'
        );
        
        let content = 'AyurSutra - Frequently Asked Questions\n\n';
        
        visibleFAQs.forEach((faq, index) => {
            content += `${index + 1}. ${faq.question}\n`;
            content += `${faq.answer}\n\n`;
        });
        
        return content;
    }
}

// Global functions for HTML
function toggleFAQ(questionElement) {
    if (window.faqSystem) {
        window.faqSystem.toggleFAQ(questionElement);
    }
}

function filterCategory(category) {
    if (window.faqSystem) {
        window.faqSystem.filterCategory(category);
    }
}

function searchFAQ() {
    const searchInput = document.getElementById('faqSearch');
    if (searchInput && window.faqSystem) {
        window.faqSystem.handleSearch(searchInput.value);
    }
}

function clearSearch() {
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        searchInput.value = '';
        if (window.faqSystem) {
            window.faqSystem.handleSearch('');
        }
    }
}

function contactSupport() {
    // Open contact options
    const actions = [
        { text: 'Call Support', action: () => window.location.href = 'tel:+919876543210' },
        { text: 'Chat with AyurBot', action: () => toggleChat() },
        { text: 'Send Email', action: () => window.location.href = 'mailto:info@ayursutra.com' }
    ];
    
    showContactModal(actions);
}

function showContactModal(actions) {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Contact Support</h3>
            <p>Choose how you'd like to get help:</p>
            <div class="contact-options">
                ${actions.map(action => 
                    `<button onclick="this.closest('.contact-modal').remove(); (${action.action})()" class="btn-primary">${action.text}</button>`
                ).join('')}
            </div>
            <button onclick="this.closest('.contact-modal').remove()" class="close-modal">×</button>
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

// Initialize FAQ system
document.addEventListener('DOMContentLoaded', function() {
    window.faqSystem = new FAQSystem();
});

// Add CSS for FAQ functionality
const style = document.createElement('style');
style.textContent = `
.temp-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    font-size: 0.9rem;
}

.temp-success {
    background: #D4EDDA;
    color: #155724;
    border-left: 4px solid #28A745;
}

.temp-info {
    background: #CCE7FF;
    color: #004085;
    border-left: 4px solid #007BFF;
}

.no-results-message {
    text-align: center;
    padding: 3rem 2rem;
    background: #F8F9FA;
    border-radius: 12px;
    margin: 2rem 0;
}

.no-results-content i {
    font-size: 3rem;
    color: #6C757D;
    margin-bottom: 1rem;
}

.no-results-content h3 {
    color: #495057;
    margin-bottom: 0.5rem;
}

.no-results-actions {
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.contact-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.contact-modal .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
    position: relative;
}

.contact-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1.5rem 0;
}

.close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

mark {
    background: #FFD700;
    padding: 0.1em 0.2em;
    border-radius: 3px;
}

.search-box {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
}

.search-box input {
    width: 100%;
    padding: 1rem 3rem 1rem 3rem;
    border: 2px solid #C8E6C9;
    border-radius: 50px;
    font-size: 1rem;
}

.search-box i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #2E7D32;
}

.search-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.5rem 1.5rem;
    background: #2E7D32;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
}

.category-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
    flex-wrap: wrap;
}

.category-btn {
    padding: 0.5rem 1.5rem;
    background: white;
    color: #2E7D32;
    border: 2px solid #C8E6C9;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.category-btn:hover,
.category-btn.active {
    background: #2E7D32;
    color: white;
}

@media (max-width: 768px) {
    .no-results-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .category-filters {
        gap: 0.5rem;
    }
    
    .category-btn {
        font-size: 0.9rem;
        padding: 0.4rem 1rem;
    }
}
`;

document.head.appendChild(style);