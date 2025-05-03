document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Email form submission
    const emailForm = document.querySelector('.email-form');
    const sendEmailBtn = document.querySelector('.send-email');
    
    sendEmailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real implementation, this would send to a server
        // For demo purposes, we'll just show a confirmation
        alert(`Thank you, ${name}! Your message has been prepared for sending. In a live version, this would email the Stockton City Council.`);
        
        // Reset form
        emailForm.reset();
    });
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.action-card, .event-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.dataset.content;
            navigator.clipboard.writeText(content).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
    
    // Set initial state for animation
    document.querySelectorAll('.action-card, .event-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    animateOnScroll();
    
    // Existing hamburger menu functionality (copied from main JS)
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
});