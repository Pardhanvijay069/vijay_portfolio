// ==================== Utility Functions ====================

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ==================== Navigation & Scrolling ====================

class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinksContainer = document.querySelector('.nav-links');

        this.init();
    }

    init() {
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                this.updateActiveLink(section.id);
            }
        });
    }

    updateActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    handleNavClick(e) {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            // Close mobile menu if open
            if (this.navLinksContainer.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
    }

    toggleMobileMenu() {
        this.navLinksContainer.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
    }
}

// ==================== GSAP Animations ====================

class Animations {
    constructor() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        this.init();
    }

    init() {
        this.animateHero();
        this.animateScrollElements();
        this.animateSkillTags();
        this.animateTimelineItems();
        this.animateProjectCards();
        this.animateContactForm();
        this.parallaxEffect();
    }

    animateHero() {
        const tl = gsap.timeline();

        tl.fromTo('.greeting',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            0
        );

        tl.fromTo('.hero-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.2
        );

        tl.fromTo('.hero-subtitle',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.4
        );

        tl.fromTo('.hero-cta',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.6
        );

        // Floating cards animation
        const cards = document.querySelectorAll('.floating-card');
        cards.forEach((card, index) => {
            tl.fromTo(card,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.6 },
                0.3 + index * 0.1
            );
        });
    }

    animateScrollElements() {
        // Animate on scroll
        gsap.utils.toArray('[class*="section"]').forEach(element => {
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                },
            });
        });
    }

    animateSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');

        skillTags.forEach((tag, index) => {
            gsap.fromTo(tag,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: tag,
                        start: 'top 90%',
                    },
                    delay: index * 0.05,
                }
            );

            tag.addEventListener('mouseenter', () => {
                gsap.to(tag, {
                    y: -5,
                    boxShadow: '0 10px 25px rgba(99, 102, 241, 0.2)',
                    duration: 0.3,
                });
            });

            tag.addEventListener('mouseleave', () => {
                gsap.to(tag, {
                    y: 0,
                    boxShadow: 'none',
                    duration: 0.3,
                });
            });
        });
    }

    animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        timelineItems.forEach((item, index) => {
            const isEven = index % 2 === 0;

            gsap.fromTo(item,
                {
                    opacity: 0,
                    x: isEven ? -50 : 50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                    },
                    delay: index * 0.1,
                }
            );

            const content = item.querySelector('.timeline-content');
            if (content) {
                content.addEventListener('mouseenter', () => {
                    gsap.to(content, {
                        y: -10,
                        boxShadow: '0 15px 40px rgba(99, 102, 241, 0.1)',
                        duration: 0.3,
                    });
                });

                content.addEventListener('mouseleave', () => {
                    gsap.to(content, {
                        y: 0,
                        duration: 0.3,
                    });
                });
            }
        });
    }

    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    },
                    delay: index * 0.15,
                }
            );

            const image = card.querySelector('.project-image');
            if (image) {
                card.addEventListener('mouseenter', () => {
                    gsap.to(image, {
                        duration: 0.4,
                    });
                });
            }
        });
    }

    animateContactForm() {
        const formGroups = document.querySelectorAll('.form-group');

        formGroups.forEach((group, index) => {
            gsap.fromTo(group,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: group,
                        start: 'top 90%',
                    },
                    delay: index * 0.1,
                }
            );
        });

        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    duration: 0.3,
                });
            });

            input.addEventListener('blur', () => {
                gsap.to(input, {
                    duration: 0.3,
                });
            });
        });
    }

    parallaxEffect() {
        const parallaxElements = document.querySelectorAll('[data-speed]');

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed);

            gsap.to(element, {
                y: () => window.innerHeight * speed,
                scrollTrigger: {
                    trigger: element,
                    scrub: 1,
                    start: 'top bottom',
                    end: 'bottom top',
                },
            });
        });
    }
}

// ==================== Stats Counter Animation ====================

class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat');
        this.init();
    }

    init() {
        this.stats.forEach(stat => {
            const h3 = stat.querySelector('h3');
            const targetValue = parseInt(h3.textContent);

            ScrollTrigger.create({
                trigger: stat,
                onEnter: () => this.animateCounter(h3, targetValue),
                once: true,
            });
        });
    }

    animateCounter(element, target) {
        gsap.to({ value: 0 }, {
            value: target,
            duration: 2,
            ease: 'power1.out',
            onUpdate: function () {
                element.textContent = Math.floor(this.targets()[0].value) + '+';
            },
        });
    }
}

// ==================== Form Handling ====================

class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        // choose provider from config (defaults to 'emailjs')
        this.form = document.getElementById('contactForm');
        this.provider = (window.FORM_CONFIG && window.FORM_CONFIG.provider) || 'emailjs';

        if (this.form) {
            this.init();
        }

        // Initialize EmailJS only when using EmailJS and the SDK is available
        if (this.provider === 'emailjs' && window.EMAILJS_CONFIG && typeof emailjs !== 'undefined') {
            try {
                if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
                    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
                }
            } catch (err) {
                console.warn('EmailJS initialization failed', err);
            }
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Simple client-side validation
        if (!data.name || !data.email || !data.message) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        if (!this.isValidEmail(data.email)) {
            this.showMessage('Please enter a valid email', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const provider = (window.FORM_CONFIG && window.FORM_CONFIG.provider) || this.provider || 'emailjs';

            if (provider === 'formspree') {
                const endpoint = (window.FORM_CONFIG && window.FORM_CONFIG.formspreeEndpoint) || '';
                if (!endpoint) {
                    this.showMessage('Formspree endpoint not configured. Set FORM_CONFIG.formspreeEndpoint in config.js', 'error');
                } else {
                    // POST to Formspree
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                        body: new FormData(this.form)
                    });

                    if (response.ok) {
                        this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                        gsap.to(this.form, {
                            opacity: 0.5,
                            duration: 0.3,
                            onComplete: () => {
                                this.form.reset();
                                gsap.to(this.form, { opacity: 1, duration: 0.3 });
                            }
                        });
                    } else {
                        const err = await response.json().catch(() => ({}));
                        console.error('Formspree error', err);
                        this.showMessage('Failed to send message via Formspree. Please try again.', 'error');
                    }
                }

            } else if (provider === 'emailjs') {
                // If EmailJS placeholders are still present, run in test mode
                const cfg = window.EMAILJS_CONFIG || {};
                const placeholders = cfg.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || cfg.SERVICE_ID === 'YOUR_SERVICE_ID' || cfg.TEMPLATE_ID === 'YOUR_TEMPLATE_ID';

                if (placeholders || typeof emailjs === 'undefined') {
                    console.log('Form data (test):', data);
                    this.showMessage('✅ Form working! Configure EmailJS in config.js to send real emails.', 'success');
                    gsap.to(this.form, {
                        opacity: 0.5,
                        duration: 0.3,
                        onComplete: () => {
                            this.form.reset();
                            gsap.to(this.form, { opacity: 1, duration: 0.3 });
                        }
                    });
                } else {
                    // Send email using EmailJS
                    await emailjs.send(
                        cfg.SERVICE_ID,
                        cfg.TEMPLATE_ID,
                        {
                            from_name: data.name,
                            from_email: data.email,
                            message: data.message,
                            to_name: 'Vijay Kumar',
                        }
                    );

                    this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                    gsap.to(this.form, {
                        opacity: 0.5,
                        duration: 0.3,
                        onComplete: () => {
                            this.form.reset();
                            gsap.to(this.form, { opacity: 1, duration: 0.3 });
                        }
                    });
                }

            } else {
                this.showMessage('No email provider configured. Set FORM_CONFIG.provider in config.js', 'error');
            }

        } catch (error) {
            console.error('Form send error:', error);
            this.showMessage('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 500;
        `;

        document.body.appendChild(messageEl);

        gsap.fromTo(messageEl,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.4 }
        );

        setTimeout(() => {
            gsap.to(messageEl, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                onComplete: () => messageEl.remove(),
            });
        }, 3000);
    }
}

// ==================== Smooth Scroll Behavior ====================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: target,
                offsetY: 70,
            },
            ease: 'power2.inOut',
        });
    }
}

// ==================== Micro-interactions ====================

class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.addButtonHover();
        this.addLinkUnderlines();
        this.addScrollReveal();
    }

    addButtonHover() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.3,
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                });
            });
        });
    }

    addLinkUnderlines() {
        const links = document.querySelectorAll('a:not(.nav-link):not(.btn):not([class*="project"])');

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    color: 'var(--primary-dark)',
                    duration: 0.3,
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    color: 'var(--primary)',
                    duration: 0.3,
                });
            });
        });
    }

    addScrollReveal() {
        gsap.utils.toArray('.stat, .skill-category, .timeline-item, .project-card').forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                onEnter: () => {
                    element.classList.add('revealed');
                },
                once: true,
            });
        });
    }
}

// ==================== Performance Optimization ====================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.reduceMotionPreference();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    reduceMotionPreference() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            gsap.globalTimeline.timeScale(0.5);
            document.documentElement.style.setProperty('--transition', 'all 0.1s linear');
        }
    }
}

// ==================== Initialization ====================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new Animations();
    new StatsCounter();
    new FormHandler();
    new SmoothScroll();
    new MicroInteractions();
    new PerformanceOptimizer();

    // Log initialization
    console.log('✨ Portfolio loaded successfully');
});

// ==================== Scroll Speed Plugin (GSAP) ====================

gsap.registerPlugin(ScrollTrigger);

// Update scroll trigger on resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
