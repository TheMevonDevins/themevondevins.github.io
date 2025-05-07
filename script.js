document.addEventListener('DOMContentLoaded', function() {
    // Core Elements
    const splashScreen = document.getElementById('splash-screen');
    const loadingProgress = document.getElementById('loading-progress');
    const mascotLoading = document.getElementById('mascot-loading');
    const mainContent = document.getElementById('main-content');
    const splashAudio = document.getElementById('splash-audio');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // State Variables
    let loaded = false;
    let minTimePassed = false;
    let lastScrollPosition = 0;

    // ======================
    // INITIAL LOAD SEQUENCE
    // ======================

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.classList.toggle('text-highlight-2');
        mobileMenuButton.classList.toggle('rotate-90');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.classList.remove('text-highlight-2');
            mobileMenuButton.classList.remove('rotate-90');
        });
    });

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        loadingProgress.style.width = `${progress}%`;
        
        // Gradually reveal the mascot image
        mascotLoading.style.opacity = `${progress / 100}`;
        
        if (progress === 100) {
            loaded = true;
            clearInterval(loadingInterval);
            checkLoadingComplete();
        }
    }, 300);

    // Ensure minimum 5 seconds loading time
    setTimeout(() => {
        minTimePassed = true;
        checkLoadingComplete();
    }, 5000);

    function checkLoadingComplete() {
        if (loaded && minTimePassed) {
            // Mascot pop animation
            mascotLoading.classList.add('animate__animated', 'animate__bounce');
            
            // Add glow effect
            setTimeout(() => {
                mascotLoading.classList.add('glow-text');
                
                // Play audio
                splashAudio.play().catch(e => console.log("Audio play failed:", e));
                
                // Fade out splash screen and show main content
                setTimeout(() => {
                    splashScreen.style.opacity = '0';
                    setTimeout(() => {
                        splashScreen.style.display = 'none';
                        mainContent.classList.remove('opacity-0');
                        mainContent.classList.add('dissolve-in');
                        
                        // Initialize all interactive elements
                        initInteractiveElements();
                        initNavbarEffects();
                        initScrollEffects();
                        initNoiseEffect();
                    }, 1000);
                }, 1000);
            }, 500);
        }
    }

    // ======================
    // INTERACTIVE ELEMENTS
    // ======================

    function initInteractiveElements() {
        // Cyber buttons hover effect
        const cyberButtons = document.querySelectorAll('.cyber-button');
        cyberButtons.forEach(button => {
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

        // Service cards hover effect
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const glow = card.querySelector('.cyberpunk-border');
                if (glow) {
                    glow.style.boxShadow = `
                        0 0 15px rgba(217, 176, 140, 0.6),
                        inset 0 0 15px rgba(255, 203, 154, 0.4),
                        ${x - rect.width/2}px ${y - rect.height/2}px 30px rgba(255, 203, 154, 0.2)
                    `;
                }
            });

            card.addEventListener('mouseleave', () => {
                const glow = card.querySelector('.cyberpunk-border');
                if (glow) {
                    glow.style.boxShadow = `
                        0 0 10px var(--highlight-2),
                        inset 0 0 10px var(--highlight-2)
                    `;
                }
            });
        });

        // Social icons hover effect
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                const svg = icon.querySelector('svg');
                if (svg) {
                    svg.style.transform = 'rotate(10deg)';
                    svg.style.filter = 'drop-shadow(0 0 8px var(--highlight-2))';
                }
            });
            icon.addEventListener('mouseleave', () => {
                const svg = icon.querySelector('svg');
                if (svg) {
                    svg.style.transform = '';
                    svg.style.filter = '';
                }
            });
        });

        // Add glitch effect to headings on hover
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.addEventListener('mouseenter', () => {
                heading.classList.add('glitch');
                heading.setAttribute('data-text', heading.textContent);
            });
            heading.addEventListener('mouseleave', () => {
                heading.classList.remove('glitch');
            });
        });

        // Mascot parallax effect
        const mascotGif = document.querySelector('.mascot-gif');
        if (mascotGif) {
            window.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                mascotGif.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
            });
        }
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
                navLogo.style.filter = 'drop-shadow(0 0 10px var(--highlight-2))';
            });
            navLogo.addEventListener('mouseleave', () => {
                navLogo.style.transform = '';
                navLogo.style.filter = 'drop-shadow(0 0 5px rgba(255, 203, 154, 0.5))';
            });
        }

        // Nav link hover effects
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (!link.classList.contains('active-nav')) {
                    link.style.color = 'var(--highlight-2)';
                }
            });
            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active-nav')) {
                    link.style.color = 'var(--secondary)';
                }
            });

            // Click effect
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active-nav'));
                link.classList.add('active-nav');
                
                // Pulse animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 200);
            });
        });

        // Navbar scroll effect
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
                nav.style.boxShadow = '0 0 30px rgba(217, 176, 140, 0.5)';
            } else {
                nav.style.boxShadow = '0 0 20px rgba(217, 176, 140, 0.3)';
            }
            
            lastScrollPosition = currentScrollPosition;
        });
    }

    // ======================
    // SCROLL EFFECTS
    // ======================

    function initScrollEffects() {
        // Scroll reveal animation
        const scrollElements = document.querySelectorAll('.service-card, .social-icon, section');
        
        const elementInView = (el) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight)
            );
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
    // VISUAL EFFECTS
    // ======================

    function initBackgroundEffects() {
        // Create canvas for dynamic noise effect
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2';
        canvas.style.opacity = '0.03';
        canvas.style.pointerEvents = 'none';
        canvas.style.mixBlendMode = 'overlay';
        document.body.appendChild(canvas);
    
        const ctx = canvas.getContext('2d');
        
        // Dynamic grid effect
        const gridCanvas = document.createElement('canvas');
        gridCanvas.style.position = 'fixed';
        gridCanvas.style.top = '0';
        gridCanvas.style.left = '0';
        gridCanvas.style.width = '100%';
        gridCanvas.style.height = '100%';
        gridCanvas.style.zIndex = '-1';
        gridCanvas.style.opacity = '0.15';
        gridCanvas.style.pointerEvents = 'none';
        document.body.appendChild(gridCanvas);
        
        const gridCtx = gridCanvas.getContext('2d');
        let gridSize = 40;
        
        function resizeCanvases() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gridCanvas.width = window.innerWidth;
            gridCanvas.height = window.innerHeight;
            drawNoise();
            drawGrid();
        }
        
        function drawNoise() {
            const w = ctx.canvas.width;
            const h = ctx.canvas.height;
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;
            
            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.05) {
                    buffer32[i] = 0xff000000;
                }
            }
            
            ctx.putImageData(idata, 0, 0);
        }
        
        function drawGrid() {
            gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
            gridCtx.strokeStyle = `rgba(209, 232, 226, 0.2)`;
            gridCtx.lineWidth = 0.5;
            
            // Vertical lines
            for (let x = 0; x <= gridCanvas.width; x += gridSize) {
                gridCtx.beginPath();
                gridCtx.moveTo(x, 0);
                gridCtx.lineTo(x, gridCanvas.height);
                gridCtx.stroke();
            }
            
            // Horizontal lines
            for (let y = 0; y <= gridCanvas.height; y += gridSize) {
                gridCtx.beginPath();
                gridCtx.moveTo(0, y);
                gridCtx.lineTo(gridCanvas.width, y);
                gridCtx.stroke();
            }
            
            // Pulse effect on grid
            gridSize = 40 + Math.sin(Date.now() / 3000) * 5;
        }
        
        // Initialize and animate
        resizeCanvases();
        window.addEventListener('resize', resizeCanvases);
        
        // Animate noise and grid
        function animateBackground() {
            drawNoise();
            drawGrid();
            requestAnimationFrame(animateBackground);
        }
        
        animateBackground();
        
        // Create floating binary code elements
        createFloatingCode();
    }
    
    function createFloatingCode() {
        const binaryChars = ['0', '1', '#'];
        const colors = ['var(--highlight-1)', 'var(--highlight-2)', 'var(--secondary)'];
        
        for (let i = 0; i < 30; i++) {
            const binary = document.createElement('div');
            binary.textContent = binaryChars[Math.floor(Math.random() * binaryChars.length)];
            binary.style.position = 'fixed';
            binary.style.color = colors[Math.floor(Math.random() * colors.length)];
            binary.style.fontFamily = 'monospace';
            binary.style.fontSize = `${Math.random() * 10 + 10}px`;
            binary.style.opacity = '0.7';
            binary.style.zIndex = '-1';
            binary.style.textShadow = `0 0 5px currentColor`;
            binary.style.userSelect = 'none';
            binary.style.pointerEvents = 'none';
            
            // Random starting position
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            binary.style.left = `${startX}px`;
            binary.style.top = `${startY}px`;
            
            document.body.appendChild(binary);
            
            // Animate floating
            animateBinary(binary);
        }
    }
    
    function animateBinary(element) {
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

    // ======================
    // CURSOR EFFECTS
    // ======================

    // Custom cyberpunk cursor
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(255, 203, 154, 0.5)';
    cursor.style.border = '2px solid var(--highlight-1)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.mixBlendMode = 'exclusion';
    cursor.style.transition = 'transform 0.1s, width 0.3s, height 0.3s, background-color 0.3s';
    document.body.appendChild(cursor);

    // Cursor follower dot
    const cursorFollower = document.createElement('div');
    cursorFollower.style.position = 'fixed';
    cursorFollower.style.width = '8px';
    cursorFollower.style.height = '8px';
    cursorFollower.style.borderRadius = '50%';
    cursorFollower.style.backgroundColor = 'var(--highlight-2)';
    cursorFollower.style.pointerEvents = 'none';
    cursorFollower.style.zIndex = '9998';
    cursorFollower.style.transform = 'translate(-50%, -50%)';
    cursorFollower.style.transition = 'transform 0.3s, width 0.3s, height 0.3s';
    document.body.appendChild(cursorFollower);

    // Track cursor position
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let speed = 0.1;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        // Calculate distance between cursor and follower
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;
        
        // Move follower
        followerX += distX * speed;
        followerY += distY * speed;
        
        // Update positions
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .cyber-button, .service-card, .social-icon');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.backgroundColor = 'rgba(217, 176, 140, 0.3)';
            cursorFollower.style.width = '15px';
            cursorFollower.style.height = '15px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(255, 203, 154, 0.5)';
            cursorFollower.style.width = '8px';
            cursorFollower.style.height = '8px';
        });
    });
});