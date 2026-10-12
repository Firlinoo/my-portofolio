// ========================================
// SCROLL & ANIMATIONS
// ========================================

// Intersection Observer for scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-item')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with reveal class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll(
        '.about-content, .portfolio-item, .service-card, .skill-item, .testimonial-card, .contact-form, .contact-info'
    );
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });

    // Initialize skill bars
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        observer.observe(item);
    });
});

// ========================================
// NAVBAR FUNCTIONALITY
// ========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - navbar.offsetHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// PORTFOLIO FILTER
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Portfolio item click to open modal
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const modal = document.getElementById('portfolioModal');
        const image = item.querySelector('.portfolio-image img');
        const title = item.querySelector('.portfolio-content h3');
        const category = item.querySelector('.category-tag');
        const description = item.querySelector('.portfolio-content p');

        document.getElementById('modalImage').src = image.src;
        document.getElementById('modalImage').alt = image.alt;
        document.getElementById('modalTitle').textContent = title.textContent;
        document.getElementById('modalCategory').textContent = 'Category: ' + category.textContent;
        document.getElementById('modalDescription').textContent = description.textContent;

        modal.classList.add('active');
    });
});

// Close modal
const modalClose = document.getElementById('modalClose');
const modal = document.getElementById('portfolioModal');

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.style.display = 'none');
    if (index >= testimonialCards.length) {
        currentTestimonial = 0;
    } else if (index < 0) {
        currentTestimonial = testimonialCards.length - 1;
    } else {
        currentTestimonial = index;
    }
    
    // Show 3 cards at a time on desktop, 1 on mobile
    const itemsToShow = window.innerWidth > 768 ? 3 : 1;
    for (let i = 0; i < itemsToShow && (currentTestimonial + i) < testimonialCards.length; i++) {
        testimonialCards[currentTestimonial + i].style.display = 'grid';
    }
}

prevSlideBtn.addEventListener('click', () => {
    const itemsToShow = window.innerWidth > 768 ? 3 : 1;
    showTestimonial(currentTestimonial - itemsToShow);
});

nextSlideBtn.addEventListener('click', () => {
    const itemsToShow = window.innerWidth > 768 ? 3 : 1;
    showTestimonial(currentTestimonial + itemsToShow);
});

// Initialize testimonials display
showTestimonial(0);

// ========================================
// CONTACT FORM VALIDATION
// ========================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Validation functions
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateForm = () => {
    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '' || nameInput.value.trim().length < 2) {
        showError('nameError', 'Please enter a valid name');
        isValid = false;
    } else {
        hideError('nameError');
    }

    // Validate email
    if (!validateEmail(emailInput.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError('emailError');
    }

    // Validate subject
    if (subjectInput.value.trim() === '' || subjectInput.value.trim().length < 3) {
        showError('subjectError', 'Please enter a subject');
        isValid = false;
    } else {
        hideError('subjectError');
    }

    // Validate message
    if (messageInput.value.trim() === '' || messageInput.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        hideError('messageError');
    }

    return isValid;
};

const showError = (errorId, message) => {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
};

const hideError = (errorId) => {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    errorElement.classList.remove('show');
};

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Hide all errors
        ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => {
            hideError(id);
        });
    }
});

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() === '' || nameInput.value.trim().length < 2) {
        showError('nameError', 'Please enter a valid name');
    } else {
        hideError('nameError');
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError('emailError', 'Please enter a valid email address');
    } else {
        hideError('emailError');
    }
});

subjectInput.addEventListener('blur', () => {
    if (subjectInput.value.trim() === '' || subjectInput.value.trim().length < 3) {
        showError('subjectError', 'Please enter a subject');
    } else {
        hideError('subjectError');
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim() === '' || messageInput.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
    } else {
        hideError('messageError');
    }
});

// ========================================
// BACK TO TOP BUTTON
// ========================================

const backToTopBtn = document.getElementById('backToTop');

// Show button when scroll down
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Scroll to top on click
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images
const images = document.querySelectorAll('img');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src || img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// RESPONSIVE UTILITIES
// ========================================

// Handle window resize for responsive behavior
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize testimonials on resize
        showTestimonial(0);
    }, 250);
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    const modal = document.getElementById('portfolioModal');
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }

    // Navigate testimonials with arrow keys
    if (e.key === 'ArrowLeft') {
        prevSlideBtn.click();
    }
    if (e.key === 'ArrowRight') {
        nextSlideBtn.click();
    }
});

// ========================================
// THEME & PREFERENCES
// ========================================

// Check for saved theme preference or default to 'dark' mode
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%cWelcome to Firlino\'s Portfolio!', 'font-size: 20px; color: #3B82F6; font-weight: bold;');
console.log('%cLet\'s create something amazing together! 🎨', 'font-size: 14px; color: #B0B0B0;');

// ========================================
// MOBILE PERFORMANCE OPTIMIZATION
// ========================================

// Reduce animations on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-base', '0.01ms');
    document.documentElement.style.setProperty('--transition-smooth', '0.01ms');
}
