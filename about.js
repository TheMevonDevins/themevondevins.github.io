document.addEventListener('DOMContentLoaded', function() {
    // Random photo selection for Chris Dosier
    const chrisPhotos = [
        'img/chris1.jpg',
        'img/chris2.jpg'
    ];
    
    // Select a random photo and set it as the source
    const chrisPhotoElement = document.getElementById('chris-photo');
    if (chrisPhotoElement) {
        const randomIndex = Math.floor(Math.random() * chrisPhotos.length);
        chrisPhotoElement.src = chrisPhotos[randomIndex];
        
        // Add error handling in case the image fails to load
        chrisPhotoElement.onerror = function() {
            console.log('Failed to load Chris photo, using fallback');
            this.src = 'img/default-profile.jpg'; // Add a fallback image
        };
    }

    // Jennifer's peek animation
    const jenniferCard = document.getElementById('jennifer-card');
    if (jenniferCard) {
        jenniferCard.addEventListener('mouseenter', function() {
            const peekImg = this.querySelector('.peek-image');
            if (peekImg) {
                // Random delay to make it feel more playful
                const delay = Math.random() * 0.5;
                peekImg.style.transitionDelay = `${delay}s`;
            }
        });
    }
    // Reset Spider-Man animation when hover ends
    document.getElementById('roy-card').addEventListener('mouseleave', function() {
        const spiderman = this.querySelector('.spiderman');
        if (spiderman) {
            spiderman.style.animation = 'none';
            void spiderman.offsetWidth; // Trigger reflow
            spiderman.style.animation = '';
        }
    });

    // Adrian's Hacking Effect
document.addEventListener('DOMContentLoaded', function() {
    const adrianCard = document.getElementById('adrian-card');
    if (!adrianCard) return;

    // Initialize text storage
    const hackElements = adrianCard.querySelectorAll('.hack-target');
    hackElements.forEach(el => {
        el.setAttribute('data-text', el.textContent);
    });

    // Corruption characters
    const corruptChars = "01█▓▒░╚╝╣║╗╔╩╦╠═╬▄▌▐▀αβγπΣσµτΦδ∞⌂⌐¬√≈≡≪≫◊♫♂♀☼↕¶§▬↨↑↓→←∟↔▲►▼◄";
    let isHovering = false;

    // Hover start
    adrianCard.addEventListener('mouseenter', function() {
        isHovering = true;
        
        // Start binary flicker effect
        adrianCard.style.animation = 'binary-flicker 0.5s infinite';
        
        // Start corruption interval
        const corruptInterval = setInterval(() => {
            if (!isHovering) {
                clearInterval(corruptInterval);
                return;
            }
            
            hackElements.forEach(el => {
                // Apply glitch animation randomly
                if (Math.random() > 0.7) {
                    el.style.animation = 'glitch 0.3s';
                }
                
                // Apply text corruption
                if (Math.random() > 0.6) {
                    const original = el.getAttribute('data-text');
                    let corrupted = '';
                    for (let i = 0; i < original.length; i++) {
                        corrupted += Math.random() > 0.7 
                            ? corruptChars[Math.floor(Math.random() * corruptChars.length)] 
                            : original[i];
                    }
                    el.textContent = corrupted;
                }
            });
        }, 150);
        
        this.dataset.corruptInterval = corruptInterval;
    });

    // Hover end
    adrianCard.addEventListener('mouseleave', function() {
        isHovering = false;
        clearInterval(this.dataset.corruptInterval);
        adrianCard.style.animation = '';
        
        // Restore original text
        hackElements.forEach(el => {
            el.style.animation = '';
            el.textContent = el.getAttribute('data-text');
        });
    });
});

    // Water drop animation for team members
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const drops = this.querySelectorAll('.drop');
            drops.forEach(drop => {
                drop.style.animationPlayState = 'running';
            });
        });
        
        member.addEventListener('mouseleave', function() {
            const drops = this.querySelectorAll('.drop');
            drops.forEach(drop => {
                drop.style.animationPlayState = 'paused';
            });
        });
    });
    
    // Animate fact cards on scroll
    const factCards = document.querySelectorAll('.fact-card');
    const factObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.5s ease 0.1s'; // Add slight delay
            }
        });
    }, { threshold: 0.1 });
    
    factCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        factObserver.observe(card);
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const waveOverlay = document.querySelector('.wave-overlay');
    
    if (hamburger && waveOverlay) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            waveOverlay.classList.toggle('active');
            
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
            } else {
                bars[0].style.transform = 'rotate(0) translate(0)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(0) translate(0)';
            }
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Preload images for better performance
    function preloadImages(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Preload Chris's potential photos
    preloadImages(chrisPhotos);
});