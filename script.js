// Navbar scroll effect and mobile menu
const headerBand = document.querySelector('.header-band');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');
const welcomeSection = document.getElementById('welcome-section');
const scrollIndicator = document.querySelector('.scroll-indicator');
let timeout;

welcomeSection.addEventListener('mousemove', (e) => {
    if (timeout) clearTimeout(timeout);
    
    const rect = welcomeSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate movement range (px)
    const moveRange = 50;
    
    // Calculate movement based on mouse position
    const moveX = (((x / rect.width) - 0.5) * moveRange).toFixed(1);
    const moveY = (((y / rect.height) - 0.5) * moveRange).toFixed(1);
    
    // Apply smooth transform
    scrollIndicator.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px)`;
    
    // Reset position after mouse stops moving
    timeout = setTimeout(() => {
        scrollIndicator.style.transform = 'translateX(-50%)';
    }, 1000);
});

welcomeSection.addEventListener('mouseleave', () => {
    scrollIndicator.style.transform = 'translateX(-50%)';
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinksContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');
    }
});

// Scroll effects
window.addEventListener('scroll', () => {
    // Header band visibility
    if (window.scrollY > 50) {
        headerBand.classList.add('visible');
    } else {
        headerBand.classList.remove('visible');
    }

    // Update active nav link
    const sections = ['welcome-section', 'about', 'projects', 'socials'];
    let current = '';

    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                current = section;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        mobileMenuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-content, .project-tile, .footer-content').forEach(el => {
    observer.observe(el);
});