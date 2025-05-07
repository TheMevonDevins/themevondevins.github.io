document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality (same as main site)
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

    // Animate resource cards when they come into view
    const resourceCards = document.querySelectorAll('.resource-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    resourceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.resource-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add ripple if it's not an external link
            if (!this.getAttribute('target') || this.getAttribute('target') !== '_blank') {
                e.preventDefault();
                
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                    if (this.href) {
                        window.location.href = this.href;
                    }
                }, 600);
            }
        });
    });
});