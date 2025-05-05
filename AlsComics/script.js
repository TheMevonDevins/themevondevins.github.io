// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show the selected slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    // Auto-advance slides every 5 seconds
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Set up auto-advance
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-advance when hovering over slider
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
    hero.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Click on indicators to go to specific slide
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Accessibility Panel Functionality
    const accessibilityBtn = document.getElementById('accessibility-btn');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const closeAccessibility = document.getElementById('close-accessibility');
    
    accessibilityBtn.addEventListener('click', function() {
        accessibilityPanel.style.display = 'block';
        // Hide first visit tooltip if it's visible
        firstVisitTooltip.style.display = 'none';
        localStorage.setItem('firstVisit', 'false');
    });
    
    closeAccessibility.addEventListener('click', function() {
        accessibilityPanel.style.display = 'none';
    });
    
    // Close panel when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === accessibilityPanel) {
            accessibilityPanel.style.display = 'none';
        }
    });
    
    // Accessibility Settings Functionality
    const colorblindBtn = document.getElementById('colorblind-btn');
    const highContrastBtn = document.getElementById('high-contrast-btn');
    const resetColorBtn = document.getElementById('reset-color-btn');
    const dyslexiaBtn = document.getElementById('dyslexia-btn');
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const fontSizeDisplay = document.getElementById('font-size-display');
    
    // Colorblind Mode
    colorblindBtn.addEventListener('click', function() {
        document.body.classList.toggle('colorblind-mode');
        this.classList.toggle('active');
    });
    
    // High Contrast Mode
    highContrastBtn.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        this.classList.toggle('active');
    });
    
    // Reset Color Modes
    resetColorBtn.addEventListener('click', function() {
        document.body.classList.remove('colorblind-mode', 'high-contrast');
        colorblindBtn.classList.remove('active');
        highContrastBtn.classList.remove('active');
    });
    
    // Dyslexia Mode
    dyslexiaBtn.addEventListener('click', function() {
        document.body.classList.toggle('dyslexia-mode');
        this.classList.toggle('active');
    });
    
    // Font Size Controls
    const fontSizes = ['Small', 'Medium', 'Large', 'XLarge'];
    let currentFontSize = 1; // Default to Medium
    
    function updateFontSize() {
        // Remove all font size classes
        document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
        
        // Add the current font size class
        switch(currentFontSize) {
            case 0:
                document.body.classList.add('font-small');
                break;
            case 1:
                document.body.classList.add('font-medium');
                break;
            case 2:
                document.body.classList.add('font-large');
                break;
            case 3:
                document.body.classList.add('font-xlarge');
                break;
        }
        
        // Update the display
        fontSizeDisplay.textContent = fontSizes[currentFontSize];
    }
    
    increaseFontBtn.addEventListener('click', function() {
        if (currentFontSize < fontSizes.length - 1) {
            currentFontSize++;
            updateFontSize();
        }
    });
    
    decreaseFontBtn.addEventListener('click', function() {
        if (currentFontSize > 0) {
            currentFontSize--;
            updateFontSize();
        }
    });
    
    // First Visit Tooltip
    const firstVisitTooltip = document.getElementById('first-visit-tooltip');
    const closeTooltip = document.getElementById('close-tooltip');
    
    // Check if it's the user's first visit
    if (!localStorage.getItem('firstVisit')) {
        // Show tooltip after a short delay
        setTimeout(() => {
            firstVisitTooltip.style.display = 'block';
        }, 2000);
    }
    
    closeTooltip.addEventListener('click', function() {
        firstVisitTooltip.style.display = 'none';
        localStorage.setItem('firstVisit', 'false');
    });
    
    // Comic Book Animations - POW effect on click
    document.addEventListener('click', function(e) {
        // Don't trigger on accessibility buttons or nav toggle
        if (e.target.closest('.accessibility-btn, .accessibility-panel, .nav-toggle')) return;
        
        const pow = document.querySelector('.pow-effect');
        pow.style.display = 'block';
        pow.style.left = (e.pageX - 100) + 'px';
        pow.style.top = (e.pageY - 100) + 'px';
        
        // Reset animation
        pow.style.animation = 'none';
        void pow.offsetWidth; // Trigger reflow
        pow.style.animation = 'powAnimation 1s ease-out';
        
        // Hide after animation
        setTimeout(() => {
            pow.style.display = 'none';
        }, 1000);
    });
    
    // Add comic book "turn page" sound effect on navigation
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only play for internal links that aren't accessibility settings
            if (this.href && this.href.includes(window.location.hostname) && 
                !this.classList.contains('setting-btn') && 
                !this.classList.contains('size-btn') &&
                !this.classList.contains('tooltip-close')) {
                // Create audio context (browsers require user interaction first)
                try {
                    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    
                    oscillator.type = 'square';
                    oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
                    
                    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    
                    oscillator.start();
                    oscillator.stop(audioCtx.currentTime + 0.2);
                } catch (e) {
                    console.log('Audio not supported or not allowed yet');
                }
            }
        });
    });
    
    // Initialize font size
    updateFontSize();
});