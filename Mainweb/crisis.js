document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    const map = L.map('depletion-map').setView([37.9577, -121.2908], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add depletion areas
    const severeDepletion = L.polygon([
        [37.98, -121.31],
        [37.95, -121.28],
        [37.93, -121.32],
        [37.91, -121.35]
    ], {color: '#e74c3c', fillOpacity: 0.5}).addTo(map)
    .bindPopup('<strong>Severe Depletion</strong><br>Water table dropped >100 feet');

    const moderateDepletion = L.polygon([
        [37.91, -121.25],
        [37.89, -121.22],
        [37.87, -121.27],
        [37.85, -121.30]
    ], {color: '#f39c12', fillOpacity: 0.5}).addTo(map)
    .bindPopup('<strong>Moderate Depletion</strong><br>Water table dropped 50-100 feet');

    const stableArea = L.polygon([
        [37.84, -121.35],
        [37.82, -121.32],
        [37.80, -121.38]
    ], {color: '#27ae60', fillOpacity: 0.5}).addTo(map)
    .bindPopup('<strong>Stable Area</strong><br>Minimal water table change');

    // Create drought effects
    function createDroughtEffects() {
        const textureOverlay = document.createElement('div');
        textureOverlay.className = 'drought-overlay';
        document.body.appendChild(textureOverlay);
        
        const hero = document.querySelector('.crisis-hero .water-overlay');
        let opacity = 0.3;
        const fadeInterval = setInterval(() => {
            opacity -= 0.01;
            hero.style.opacity = opacity;
            if (opacity <= 0) clearInterval(fadeInterval);
        }, 100);
    }

    // Enhanced crack effect with content protection
    function createCrackEffect() {
        const crackOverlay = document.createElement('div');
        crackOverlay.className = 'crack-overlay';
        document.body.appendChild(crackOverlay);
        
        // Define protected areas (x1, y1, x2, y2 in %)
        const protectedAreas = [
            // Hero section content
            { x1: 15, y1: 10, x2: 85, y2: 35 },
            // Impact cards
            { x1: 5, y1: 40, x2: 95, y2: 55 },
            // Timeline
            { x1: 10, y1: 55, x2: 90, y2: 75 },
            // Water comparison
            { x1: 5, y1: 75, x2: 95, y2: 85 },
            // Testimonials
            { x1: 10, y1: 85, x2: 90, y2: 92 },
            // CTA
            { x1: 20, y1: 92, x2: 80, y2: 97 }
        ];

        function isPositionProtected(x, y) {
            return protectedAreas.some(area => 
                x >= area.x1 && x <= area.x2 && 
                y >= area.y1 && y <= area.y2
            );
        }

        function getSafePosition() {
            let x, y, attempts = 0;
            const maxAttempts = 50;
            
            do {
                x = Math.random() * 90 + 5;
                y = Math.random() * 90 + 5;
                attempts++;
            } while (isPositionProtected(x, y) && attempts < maxAttempts);
            
            return attempts < maxAttempts ? { x, y } : null;
        }

        function createCracks(container, count) {
            for (let i = 0; i < count; i++) {
                const position = getSafePosition();
                if (!position) continue;
                
                const crack = document.createElement('div');
                crack.className = 'crack';
                
                const size = 40 + Math.random() * 80;
                const rotation = (Math.random() * 60) - 30;
                
                crack.style.setProperty('--rotation', `${rotation}deg`);
                crack.style.setProperty('--size', `${size}px`);
                crack.style.left = `${position.x}%`;
                crack.style.top = `${position.y}%`;
                
                const darkness = Math.min(0.1 + (performance.now() / 900000), 0.5);
                crack.style.filter = `sepia(70%) brightness(${1 - darkness})`;
                crack.style.opacity = 0.5 - (darkness * 0.2);
                
                container.appendChild(crack);
            }
        }

        // Initial subtle cracks
        createCracks(crackOverlay, 2);
        
        // Gradual crack addition
        const crackInterval = setInterval(() => {
            createCracks(crackOverlay, 1);
            
            const existingCracks = crackOverlay.querySelectorAll('.crack');
            existingCracks.forEach(crack => {
                if (!crack.dataset.growing) {
                    crack.dataset.growing = 'true';
                    crack.style.animation = 'crack-grow 15s forwards';
                }
            });
        }, 45000);

        window.crackInterval = crackInterval;
    }

    // Animate on scroll
    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('bar')) {
                        entry.target.style.height = entry.target.dataset.percent;
                    } else if (entry.target.classList.contains('timeline-item')) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateX(0)';
                    } else {
                        entry.target.classList.add('animate-in');
                    }
                }
            });
        }, {threshold: 0.1});

        document.querySelectorAll('.impact-card, .timeline-item, .bar, .testimonial-card').forEach(el => {
            if (el.classList.contains('timeline-item')) {
                el.style.opacity = 0;
                el.style.transform = 'translateX(-20px)';
                el.style.transition = 'all 0.5s ease';
            }
            observer.observe(el);
        });
    }

    // Mobile menu
    const hamburger = document.querySelector('.hamburger-menu');
    const waveOverlay = document.querySelector('.wave-overlay');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        waveOverlay.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            this.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            this.children[1].style.opacity = '0';
            this.children[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
        } else {
            this.children[0].style.transform = 'rotate(0) translate(0)';
            this.children[1].style.opacity = '1';
            this.children[2].style.transform = 'rotate(0) translate(0)';
        }
    });

    // Mobile tooltips
    function initMobileTooltips() {
        if (window.innerWidth < 768) {
            document.querySelectorAll('.leak-graphic, .temperature-chart').forEach(el => {
                el.addEventListener('click', () => {
                    el.classList.toggle('active-tooltip');
                });
            });
        }
    }

    // Mobile swipe
    let touchStartX = 0;
    const touchZone = document.querySelector('.crisis-hero');

    touchZone.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    touchZone.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) {
            document.querySelector('#personal-impact').scrollIntoView({behavior: 'smooth'});
        }
    }, {passive: true});

    // Initialize all
    createDroughtEffects();
    animateOnScroll();
    createCrackEffect();
    initMobileTooltips();
});

