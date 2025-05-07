document.addEventListener('DOMContentLoaded', function() {
    // Core Elements
    const mainContent = document.getElementById('main-content');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Initialize functions
    initMobileMenu();
    initPortfolioFilter();
    initInteractiveElements();
    initNavbarEffects();
    initScrollEffects();
    initDecryptAnimations();
    createFloatingCode();

    // ======================
    // MOBILE MENU
    // ======================
    function initMobileMenu() {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.classList.toggle('text-[#02A9F7]');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('text-[#02A9F7]');
            });
        });
    }

    // ======================
    // PORTFOLIO FILTER
    // ======================
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.portfolio-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active-filter'));
                this.classList.add('active-filter');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // ======================
    // INTERACTIVE ELEMENTS
    // ======================
    function initInteractiveElements() {
        // Tech buttons hover effect
        const techButtons = document.querySelectorAll('.tech-button');
        techButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                button.style.setProperty('--mouse-x', `${x}px`);
                button.style.setProperty('--mouse-y', `${y}px`);
            });

            // Click effect
            button.addEventListener('mousedown', () => {
                button.style.transform = 'scale(0.95)';
            });
            button.addEventListener('mouseup', () => {
                button.style.transform = '';
            });
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });

        // Project cards hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Testimonial cards hover effect
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 25px rgba(2, 169, 247, 0.3)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    // ======================
    // NAVBAR EFFECTS
    // ======================
    function initNavbarEffects() {
        const nav = document.querySelector('nav');
        const navLogo = document.querySelector('.nav-logo');
        const navLinks = document.querySelectorAll('.nav-link');

        // Logo animation
        if (navLogo) {
            navLogo.addEventListener('mouseenter', () => {
                navLogo.style.transform = 'rotate(-10deg) scale(1.1)';
            });
            navLogo.addEventListener('mouseleave', () => {
                navLogo.style.transform = '';
            });
        }

        // Navbar scroll effect
        let lastScrollPosition = 0;
        window.addEventListener('scroll', () => {
            const currentScrollPosition = window.pageYOffset;
            if (currentScrollPosition > lastScrollPosition) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }

            // Add shadow when scrolled
            if (currentScrollPosition > 10) {
                nav.style.boxShadow = '0 0 30px rgba(2, 169, 247, 0.3)';
            } else {
                nav.style.boxShadow = '0 0 20px rgba(2, 169, 247, 0.1)';
            }
            lastScrollPosition = currentScrollPosition;
        });
    }

    // ======================
    // SCROLL EFFECTS
    // ======================
    function initScrollEffects() {
        // Scroll reveal animation
        const scrollElements = document.querySelectorAll('.project-card, .testimonial-card, section');
        const elementInView = (el) => {
            const elementTop = el.getBoundingClientRect().top;
            return (elementTop <= (window.innerHeight || document.documentElement.clientHeight));
        };

        const displayScrollElement = (element) => {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 100)) {
                    displayScrollElement(el);
                }
            });
        };

        // Initialize check
        handleScrollAnimation();
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
    }

    // ======================
    // DECRYPT ANIMATIONS
    // ======================
    function initDecryptAnimations() {
        // Animate all elements with decrypt-text class
        const decryptElements = document.querySelectorAll('.decrypt-text');
        decryptElements.forEach((el, index) => {
            // If no specific delay class exists, add staggered delay
            if (!el.classList.contains('decrypt-delay-1') &&
                !el.classList.contains('decrypt-delay-2') &&
                !el.classList.contains('decrypt-delay-3')) {
                el.style.animationDelay = `${index * 0.2}s`;
            }

            // For terminal-like typing effect
            if (el.classList.contains('terminal-type')) {
                const text = el.textContent;
                el.textContent = '';
                el.style.width = '0';
                setTimeout(() => {
                    el.textContent = text;
                    el.style.width = '100%';
                    el.style.overflow = 'visible';
                    el.style.whiteSpace = 'normal';
                }, index * 200);
            }
        });
    }

    // ======================
    // FLOATING CODE ELEMENTS
    // ======================
    function createFloatingCode() {
        const codeChars = ['{', '}', '<', '>', '(', ')', ';', '=', '/', '\\', '[', ']'];
        const colors = ['#89D6FB', '#02A9F7', '#d4f0fc'];

        for (let i = 0; i < 20; i++) {
            const code = document.createElement('div');
            code.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
            code.style.position = 'fixed';
            code.style.color = colors[Math.floor(Math.random() * colors.length)];
            code.style.fontFamily = 'monospace';
            code.style.fontSize = `${Math.random() * 10 + 10}px`;
            code.style.opacity = '0.7';
            code.style.zIndex = '-1';
            code.style.userSelect = 'none';
            code.style.pointerEvents = 'none';

            // Random starting position
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            code.style.left = `${startX}px`;
            code.style.top = `${startY}px`;
            document.body.appendChild(code);

            // Animate floating
            animateCode(code);
        }
    }

    function animateCode(element) {
        const duration = 30000 + Math.random() * 30000;
        const startX = parseFloat(element.style.left);
        const startY = parseFloat(element.style.top);
        const keyframes = [
            { transform: `translate(0, 0)`, opacity: 0.7 },
            { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`, opacity: 0.5 },
            { transform: `translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px)`, opacity: 0.3 },
            { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`, opacity: 0.7 }
        ];
        const options = {
            duration: duration,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        };
        element.animate(keyframes, options);

        // Random flicker effect
        setInterval(() => {
            if (Math.random() > 0.7) {
                element.style.opacity = Math.random() > 0.5 ? '0.9' : '0.3';
                setTimeout(() => {
                    element.style.opacity = '0.7';
                }, 200);
            }
        }, 1000);
    }
});