// JavaScript for Anandhi - Life Coach Website

// Global variables
let isFormSubmitting = false;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize all functionality
    initNavigation();
    initFormValidation();
    initLoadingAnimations();
    initSmoothScrolling();
    initInteractiveElements();
    
    console.log('All functionality initialized');
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    console.log('Initializing navigation...');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav toggle clicked');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Nav link clicked:', this.getAttribute('href'));
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(107, 70, 193, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Initialize all interactive elements
function initInteractiveElements() {
    console.log('Initializing interactive elements...');
    
    // Hero CTA button
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hero CTA clicked');
            scrollToSection('contact');
        });
    }
    
    // Service CTA buttons
    const serviceCTAs = document.querySelectorAll('.service-cta');
    serviceCTAs.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Service CTA clicked');
            scrollToSection('contact');
        });
    });
    
    // Instagram links
    const instagramLinks = document.querySelectorAll('.instagram-link');
    instagramLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Instagram link clicked');
            // Let the default behavior happen (open in new tab)
        });
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    console.log('Initializing smooth scrolling...');
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the #
            console.log('Scrolling to:', targetId);
            scrollToSection(targetId);
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    console.log('Attempting to scroll to section:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        console.log('Scrolling to position:', targetPosition);
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        console.error('Section not found:', sectionId);
    }
}

// Form validation and submission
function initFormValidation() {
    console.log('Initializing form validation...');
    
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error('Contact form not found');
        return;
    }
    
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    
    // Check if form fields exist
    if (!nameField || !emailField || !phoneField || !messageField) {
        console.error('Some form fields not found');
        return;
    }
    
    console.log('Form fields found, setting up validation...');
    
    // Real-time validation
    nameField.addEventListener('blur', () => {
        console.log('Name field blur event');
        validateName();
    });
    nameField.addEventListener('input', () => {
        clearError('nameError');
    });
    
    emailField.addEventListener('blur', () => {
        console.log('Email field blur event');
        validateEmail();
    });
    emailField.addEventListener('input', () => {
        clearError('emailError');
    });
    
    phoneField.addEventListener('blur', () => {
        console.log('Phone field blur event');
        validatePhone();
    });
    phoneField.addEventListener('input', () => {
        clearError('phoneError');
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        if (isFormSubmitting) {
            console.log('Form already submitting, ignoring...');
            return;
        }
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        
        console.log('Validation results:', { isNameValid, isEmailValid, isPhoneValid });
        
        if (isNameValid && isEmailValid && isPhoneValid) {
            submitToWhatsApp();
        } else {
            // Focus on first error field
            const firstError = form.querySelector('.form-control.error');
            if (firstError) {
                firstError.focus();
                console.log('Focused on first error field');
            }
        }
    });
}

// Individual field validation functions
function validateName() {
    const nameField = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    
    if (!nameField || !nameError) {
        console.error('Name validation elements not found');
        return false;
    }
    
    const name = nameField.value.trim();
    
    if (!name) {
        showError(nameField, nameError, 'Please enter your name');
        return false;
    } else if (name.length < 2) {
        showError(nameField, nameError, 'Name must be at least 2 characters');
        return false;
    } else {
        clearError('nameError');
        nameField.classList.remove('error');
        return true;
    }
}

function validateEmail() {
    const emailField = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    if (!emailField || !emailError) {
        console.error('Email validation elements not found');
        return false;
    }
    
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError(emailField, emailError, 'Please enter your email address');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailField, emailError, 'Please enter a valid email address');
        return false;
    } else {
        clearError('emailError');
        emailField.classList.remove('error');
        return true;
    }
}

function validatePhone() {
    const phoneField = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    
    if (!phoneField || !phoneError) {
        console.error('Phone validation elements not found');
        return false;
    }
    
    const phone = phoneField.value.trim();
    
    // Phone is optional, so only validate if provided
    if (phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showError(phoneField, phoneError, 'Please enter a valid phone number');
            return false;
        }
    }
    
    clearError('phoneError');
    phoneField.classList.remove('error');
    return true;
}

// Helper functions for error handling
function showError(field, errorElement, message) {
    console.log('Showing error:', message);
    field.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// WhatsApp submission
function submitToWhatsApp() {
    console.log('Submitting to WhatsApp...');
    
    isFormSubmitting = true;
    
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    
    if (!nameField || !emailField || !phoneField || !messageField) {
        console.error('Form fields not found during submission');
        isFormSubmitting = false;
        return;
    }
    
    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const phone = phoneField.value.trim();
    const userMessage = messageField.value.trim();
    
    // Construct the WhatsApp message
    let whatsappMessage = "Hi Anandhi, I'm interested in your life coaching services. I'd like to schedule a consultation.\n\n";
    whatsappMessage += `My details:\n`;
    whatsappMessage += `Name: ${name}\n`;
    whatsappMessage += `Email: ${email}\n`;
    
    if (phone) {
        whatsappMessage += `Phone: ${phone}\n`;
    }
    
    if (userMessage) {
        whatsappMessage += `\nMessage: ${userMessage}`;
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    
    // Show loading state
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
        submitButton.disabled = true;
        
        console.log('Opening WhatsApp URL:', whatsappURL);
        
        // Delay to show loading state, then redirect
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            
            // Reset button and form
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            isFormSubmitting = false;
            
            // Clear form
            document.getElementById('contactForm').reset();
            
            // Show success message
            showSuccessMessage();
        }, 1000);
    } else {
        console.error('Submit button not found');
        isFormSubmitting = false;
    }
}

// Show success message after form submission
function showSuccessMessage() {
    console.log('Showing success message...');
    
    // Remove any existing success messages
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #10B981, #34D399);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            text-align: center;
            box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
            animation: slideIn 0.3s ease;
        ">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            WhatsApp opened successfully! Your message is ready to send.
        </div>
    `;
    
    const form = document.getElementById('contactForm');
    if (form) {
        form.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.remove();
            }
        }, 5000);
    }
}

// Loading animations
function initLoadingAnimations() {
    console.log('Initializing loading animations...');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for loading animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards and other elements
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .reason, .feature');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Add CSS animation for success message and mobile menu
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .form-control:invalid {
        box-shadow: none;
    }
    
    .form-control:valid:not(:placeholder-shown) {
        border-color: #10B981;
    }
    
    .form-control.error {
        border-color: #EF4444 !important;
        background-color: #FEF2F2;
    }
    
    .error-message {
        display: block;
        color: #EF4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        min-height: 1.25rem;
    }
    
    @media (max-width: 767px) {
        .nav-menu.active {
            display: block;
            animation: slideDown 0.3s ease;
        }
        
        .nav-toggle {
            z-index: 1001;
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);

// Performance optimization: Lazy load non-critical elements
function lazyLoadElements() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    if (lazyElements.length === 0) return;
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.getAttribute('data-lazy');
                
                if (src) {
                    element.src = src;
                    element.removeAttribute('data-lazy');
                }
                
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Initialize lazy loading
lazyLoadElements();

// Global function to make it available for onclick handlers
window.scrollToSection = scrollToSection;

console.log('JavaScript file loaded successfully');
