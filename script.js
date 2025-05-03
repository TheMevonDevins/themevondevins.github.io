document.addEventListener('DOMContentLoaded', function() {
    // Quiz Variables
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const nextBtn = document.querySelector('.quiz-next');
    const prevBtn = document.querySelector('.quiz-prev');
    const submitBtn = document.querySelector('.submit-quiz');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const quizResults = document.querySelector('.quiz-results');
    let currentQuestion = 0;
    const totalQuestions = quizQuestions.length;
    const userAnswers = {};

    // Initialize Quiz
    showQuestion(currentQuestion);

    // Option Selection
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const questionId = this.closest('.quiz-question').dataset.question;
            userAnswers[questionId] = this.dataset.value;
            
            // Update UI
            this.closest('.quiz-options').querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    // Navigation
    nextBtn.addEventListener('click', () => navigateQuiz(1));
    prevBtn.addEventListener('click', () => navigateQuiz(-1));

    // Submit Quiz
    submitBtn.addEventListener('click', showResults);

    // Retake Quiz
    document.querySelector('.retake-quiz').addEventListener('click', resetQuiz);

    function navigateQuiz(direction) {
        currentQuestion += direction;
        showQuestion(currentQuestion);
    }

    function showQuestion(index) {
        // Update visibility
        quizQuestions.forEach((q, i) => {
            q.classList.toggle('active', i === index);
        });

        // Update buttons
        prevBtn.disabled = index === 0;
        nextBtn.style.display = index === totalQuestions - 1 ? 'none' : 'block';
        submitBtn.style.display = index === totalQuestions - 1 ? 'block' : 'none';

        // Update progress
        const progress = ((index + 1) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Question ${index + 1} of ${totalQuestions}`;
    }

    function showResults() {
        // Calculate results
        const tips = {
            shower: calculateShowerTips(),
            appliances: calculateApplianceTips(),
            outdoor: calculateOutdoorTips(),
            home: calculateHomeTips()
        };

        // Display results
        document.querySelector('.shower-tips').textContent = tips.shower;
        document.querySelector('.appliance-tips').textContent = tips.appliances;
        document.querySelector('.outdoor-tips').textContent = tips.outdoor;
        document.querySelector('.home-tips').textContent = tips.home;

        // Show results section
        document.querySelector('.quiz-questions').style.display = 'none';
        document.querySelector('.quiz-navigation').style.display = 'none';
        quizResults.style.display = 'block';
    }

    function resetQuiz() {
        currentQuestion = 0;
        Object.keys(userAnswers).forEach(key => delete userAnswers[key]);
        
        // Reset UI
        quizQuestions[0].classList.add('active');
        quizOptions.forEach(opt => opt.classList.remove('selected'));
        document.querySelector('.quiz-questions').style.display = 'block';
        document.querySelector('.quiz-navigation').style.display = 'flex';
        quizResults.style.display = 'none';
        showQuestion(0);
    }

    // Calculation Functions
    function calculateShowerTips() {
        const time = parseInt(userAnswers['1']) || 10;
        const savings = (time - 5) * 2; // 2 gallons per minute
        return `Reduce your ${time}-minute showers to 5 minutes to save ${savings} gallons per shower.`;
    }

    function calculateApplianceTips() {
        const frequency = userAnswers['2'];
        if (frequency === 'half') {
            return "Running full loads only could save 15-20 gallons per wash.";
        } else if (frequency === 'medium') {
            return "Try to wait until you have full loads to maximize water savings.";
        }
        return "Great job running full loads! Consider upgrading to ENERGY STAR appliances.";
    }

    function calculateOutdoorTips() {
        const landscape = userAnswers['3'];
        const watering = userAnswers['4'];
        
        let tips = [];
        if (landscape !== 'drought') tips.push("Consider replacing 50% of lawn with drought-resistant plants");
        if (watering !== 'drip') tips.push("Switch to drip irrigation to save up to 50% on outdoor water use");
        
        return tips.length > 0 ? tips.join(". ") + "." : "Your outdoor water use is already efficient!";
    }

    function calculateHomeTips() {
        const fixtures = userAnswers['5'];
        const leaks = userAnswers['6'];
        
        let tips = [];
        if (fixtures !== 'all') tips.push("Install low-flow showerheads and faucet aerators");
        if (leaks === 'never') tips.push("Check for leaks monthly - a dripping faucet can waste 20 gallons/day");
        
        return tips.length > 0 ? "Recommendations: " + tips.join(", ") : "Your home is water-efficient!";
    }

    // Existing hamburger menu and other functionality...
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

  // Theme Switcher Elements
  const themeSwitcher = document.getElementById('theme-switcher');
  const body = document.body;
  const spaceMusic = document.getElementById('space-music');
  let musicPlaying = false;

  // Drought Meter/Lightsaber Elements
  const droughtTitle = document.querySelector('.drought-meter .section-title');
  const droughtSubtitle = document.querySelector('.drought-meter p');
  const meterLevel = document.querySelector('.meter-level');
  const meterScale = document.querySelector('.meter-scale');

  // Create music control button
  const musicControl = document.createElement('div');
  musicControl.className = 'music-control';
  musicControl.innerHTML = '<button id="music-toggle"><i class="fas fa-volume-mute"></i></button>';
  document.body.appendChild(musicControl);
  const musicToggle = document.getElementById('music-toggle');

  // Initialize with water theme
  setWaterTheme();

  // Theme Toggle Functionality
  themeSwitcher.addEventListener('click', toggleTheme);

  // Music Control
  musicToggle.addEventListener('click', toggleMusic);

  // Pause music when tab is inactive
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Drought Meter Animation
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateMeter();
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('.drought-meter'));

  // Theme Functions
  function toggleTheme() {
      if (body.classList.contains('space-theme')) {
          setWaterTheme();
      } else {
          setSpaceTheme();
          // Play lightsaber sound
          const lightsaberSound = new Audio('https://assets.codepen.io/3364143/lightsaber-on.mp3');
          lightsaberSound.volume = 0.3;
          lightsaberSound.play().catch(e => console.log("Audio play prevented:", e));
      }
  }

  function setWaterTheme() {
      body.classList.remove('space-theme');
      themeSwitcher.innerHTML = '<i class="fas fa-jedi"></i> Switch to Space Theme';
      
      // Update hero content
      document.querySelector('.hero-content h1').textContent = 'Defend Stockton\'s Water – Act Now!';
      document.querySelector('.hero-content p').textContent = 'Join the movement to protect our most precious resource';
      
      // Update drought meter
      droughtTitle.textContent = 'Current Drought Severity';
      droughtSubtitle.textContent = 'Data sourced from U.S. Drought Monitor';
      meterScale.style.background = 'linear-gradient(to right, #f6e58d, #ffbe76, #ff7979, #eb4d4b, #6a1b9a)';
      
      // Hide space elements
      document.querySelectorAll('#stars, #stars2, #stars3').forEach(el => el.style.display = 'none');
      musicControl.style.display = 'none';
      
      // Pause music
      spaceMusic.pause();
      musicPlaying = false;
      musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }

  function setSpaceTheme() {
      body.classList.add('space-theme');
      themeSwitcher.innerHTML = '<i class="fas fa-tint"></i> Switch to Water Theme';
      
      // Update hero content
      document.querySelector('.hero-content h1').textContent = 'Defend the Galaxy – Act Now!';
      document.querySelector('.hero-content p').textContent = 'Join the rebellion to protect our resources';
      
      // Transform drought meter to lightsaber
      droughtTitle.textContent = 'Force Energy Level';
      droughtSubtitle.textContent = 'Data sourced from Jedi Council Archives';
      meterScale.style.background = '#333';
      
      // Show space elements
      document.querySelectorAll('#stars, #stars2, #stars3').forEach(el => el.style.display = 'block');
      musicControl.style.display = 'block';
      
      // Auto-play music (with user gesture)
      if (!musicPlaying) {
          spaceMusic.volume = 0.3;
          spaceMusic.play().then(() => {
              musicPlaying = true;
              musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
          }).catch(e => {
              console.log("Auto-play prevented:", e);
              musicToggle.innerHTML = '<i class="fas fa-play"></i>';
          });
      }
  }

  function toggleMusic() {
      if (musicPlaying) {
          spaceMusic.pause();
          musicPlaying = false;
          musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
          spaceMusic.play();
          musicPlaying = true;
          musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
  }

  function handleVisibilityChange() {
      if (document.hidden && musicPlaying) {
          spaceMusic.pause();
      } else if (!document.hidden && body.classList.contains('space-theme') && musicPlaying) {
          spaceMusic.play();
      }
  }

  // Drought Meter/Lightsaber Animation
  function animateMeter() {
      let progress = 0;
      const targetProgress = 30;
      
      const animate = () => {
          if (progress < targetProgress) {
              progress++;
              meterLevel.style.width = `${progress}%`;
              
              // Lightsaber color effect in space theme
              if (body.classList.contains('space-theme')) {
                  const hue = 120 - (progress * 0.8); // Green to yellow
                  meterLevel.style.background = `linear-gradient(to right, hsl(${hue}, 100%, 50%), hsl(${hue + 20}, 100%, 60%)`;
                  meterLevel.style.boxShadow = `0 0 20px hsl(${hue}, 100%, 50%)`;
              }
              
              requestAnimationFrame(animate);
          }
      };
      
      animate();
  }

  // Make sure the meter resets when retaking quiz
  document.querySelector('.retake-quiz')?.addEventListener('click', () => {
      meterLevel.style.width = '0%';
      setTimeout(() => animateMeter(), 500);
  });
