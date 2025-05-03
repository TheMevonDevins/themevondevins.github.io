document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
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

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            waveOverlay.classList.remove('active');
            hamburger.children[0].style.transform = 'rotate(0) translate(0)';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'rotate(0) translate(0)';
        });
    });

    // Leak Detector Tool
    const leakTestSteps = document.querySelectorAll('.leak-test-step');
    const nextStepButtons = document.querySelectorAll('.next-step');
    const prevStepButtons = document.querySelectorAll('.prev-step');
    const leakOptions = document.querySelectorAll('.leak-option');
    const leakResults = document.querySelector('.leak-results');
    const resultLeak = document.querySelector('.result-leak');
    const resultNoLeak = document.querySelector('.result-no-leak');
    
    let currentStep = 1;
    
    // Initialize first step
    document.querySelector('.leak-test-step[data-step="1"]').classList.add('active');
    
    // Next step functionality
    nextStepButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep < 4) {
                document.querySelector(`.leak-test-step[data-step="${currentStep}"]`).classList.remove('active');
                currentStep++;
                document.querySelector(`.leak-test-step[data-step="${currentStep}"]`).classList.add('active');
                
                // Scroll to the top of the next step
                document.querySelector(`.leak-test-step[data-step="${currentStep}"]`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Previous step functionality
    prevStepButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 1) {
                document.querySelector(`.leak-test-step[data-step="${currentStep}"]`).classList.remove('active');
                currentStep--;
                document.querySelector(`.leak-test-step[data-step="${currentStep}"]`).classList.add('active');
                
                // Scroll to the top of the previous step
                document.querySelector(`.leak-test-step[data-step="${currentStep}"]`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle leak test results
    leakOptions.forEach(option => {
        option.addEventListener('click', function() {
            const hasLeak = this.dataset.result === 'leak';
            
            document.querySelector('.leak-test-container').style.display = 'none';
            leakResults.style.display = 'block';
            
            if (hasLeak) {
                resultLeak.style.display = 'block';
                resultNoLeak.style.display = 'none';
            } else {
                resultLeak.style.display = 'none';
                resultNoLeak.style.display = 'block';
            }
            
            // Scroll to results
            leakResults.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Retest functionality - fixed to work for both buttons
    document.querySelectorAll('.retest-leak').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('.leak-test-container').style.display = 'block';
            leakResults.style.display = 'none';
            currentStep = 1;
            
            leakTestSteps.forEach(step => {
                step.classList.remove('active');
            });
            
            document.querySelector('.leak-test-step[data-step="1"]').classList.add('active');
            
            // Scroll back to top
            document.querySelector('.leak-test-step[data-step="1"]').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Savings Calculator
    const estimateBtn = document.getElementById('estimate-usage');
    const calculateBtn = document.getElementById('calculate-savings');
    const householdSize = document.getElementById('household-size');
    const currentUsage = document.getElementById('current-usage');
    const waterSaved = document.getElementById('water-saved');
    const moneySaved = document.getElementById('money-saved');
    const annualSavings = document.getElementById('annual-savings');
    const currentDrop = document.getElementById('current-drop');
    const potentialDrop = document.getElementById('potential-drop');
    const comparisonText = document.getElementById('comparison-text');
    
    // Estimate usage based on household size
    estimateBtn.addEventListener('click', function() {
        const size = parseInt(householdSize.value);
        if (isNaN(size) || size < 1) {
            householdSize.value = 1;
            return;
        }
        const estimatedUsage = size * 5236; // Average 5236 gallons per person per month
        currentUsage.value = estimatedUsage;
        
        // Show animation
        this.textContent = 'Estimated!';
        setTimeout(() => {
            this.textContent = 'Estimate My Usage';
        }, 1000);
    });
    
    // Calculate savings
    calculateBtn.addEventListener('click', function() {
        const usage = parseInt(currentUsage.value) || 4000;
        let savings = 0;
        
        // Calculate savings based on selected measures
        if (document.getElementById('low-flow-shower').checked) {
            savings += usage * 0.15; // 15% savings
        }
        if (document.getElementById('fix-leaks').checked) {
            savings += usage * 0.10; // 10% savings
        }
        if (document.getElementById('efficient-appliances').checked) {
            savings += usage * 0.20; // 20% savings
        }
        if (document.getElementById('drought-landscaping').checked) {
            savings += usage * 0.30; // 30% savings (outdoor use)
        }
        
        // Cap savings at 60% of total usage
        savings = Math.min(savings, usage * 0.6);
        
        // Update display
        waterSaved.textContent = `${Math.round(savings)} gallons/month`;
        moneySaved.textContent = `$${(savings * 0.005).toFixed(2)}/month`;
        annualSavings.textContent = `$${(savings * 0.005 * 12).toFixed(2)}/year`;
        
        // Update visualization
        const currentHeight = 150;
        const potentialHeight = currentHeight * (1 - (savings / usage));
        
        currentDrop.style.height = `${currentHeight}px`;
        potentialDrop.style.height = `${potentialHeight}px`;
        
        comparisonText.textContent = `You could reduce your water usage by ${Math.round((savings / usage) * 100)}%!`;
        
        // Show animation
        this.textContent = 'Calculated!';
        setTimeout(() => {
            this.textContent = 'Calculate My Savings';
        }, 1000);
        
        // Scroll to results if on mobile
        if (window.innerWidth < 900) {
            document.querySelector('.calculator-results').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Initialize water drop visualization
    currentDrop.style.height = '0px';
    potentialDrop.style.height = '0px';
    
    setTimeout(() => {
        currentDrop.style.height = '150px';
        potentialDrop.style.height = '150px';
    }, 500);

    // Water Quality Charts
    if (document.getElementById('contaminantChart')) {
        const contaminantCtx = document.getElementById('contaminantChart').getContext('2d');
        const sourceCtx = document.getElementById('sourceChart').getContext('2d');
        const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
        
        // Contaminant Chart
        const contaminantChart = new Chart(contaminantCtx, {
            type: 'bar',
            data: {
                labels: ['Arsenic', 'Lead', 'Nitrates', 'Trihalomethanes'],
                datasets: [{
                    label: 'Detected Level',
                    data: [3, 1.2, 4.5, 35],
                    backgroundColor: 'rgba(26, 111, 201, 0.7)',
                    borderColor: 'rgba(26, 111, 201, 1)',
                    borderWidth: 1
                }, {
                    label: 'EPA Limit',
                    data: [10, 15, 10, 80],
                    backgroundColor: 'rgba(231, 76, 60, 0.7)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Parts per Billion (ppb)'
                        }
                    }
                },
                animation: {
                    duration: 2000
                }
            }
        });
        
        // Source Chart
        const sourceChart = new Chart(sourceCtx, {
            type: 'pie',
            data: {
                labels: ['Delta Water', 'Groundwater', 'Surface Water'],
                datasets: [{
                    data: [60, 30, 10],
                    backgroundColor: [
                        'rgba(26, 111, 201, 0.7)',
                        'rgba(79, 163, 227, 0.7)',
                        'rgba(13, 75, 138, 0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                animation: {
                    duration: 2000
                }
            }
        });
        
        // Comparison Chart
        const comparisonChart = new Chart(comparisonCtx, {
            type: 'radar',
            data: {
                labels: ['Quality', 'Cost', 'Availability', 'Taste', 'Safety'],
                datasets: [{
                    label: 'Stockton',
                    data: [78, 65, 72, 80, 75],
                    backgroundColor: 'rgba(26, 111, 201, 0.2)',
                    borderColor: 'rgba(26, 111, 201, 1)',
                    pointBackgroundColor: 'rgba(26, 111, 201, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(26, 111, 201, 1)'
                }, {
                    label: 'CA Average',
                    data: [73, 70, 65, 75, 70],
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    pointBackgroundColor: 'rgba(231, 76, 60, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(231, 76, 60, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                },
                animation: {
                    duration: 2000
                }
            }
        });
    }

    // Water Quality Tabs
    const qualityTabs = document.querySelectorAll('.quality-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    qualityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab
            qualityTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tab === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove any existing ripple
            const existingRipple = this.querySelector('.ripple-effect');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            // Create new ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // Position ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

// Water Conservation Game
const gameContainer = document.getElementById('conservation-game');
const gameIntro = document.getElementById('game-intro');
const gameScreen = document.getElementById('game-screen');
const gameQuestion = document.getElementById('game-question');
const gameOptions = document.getElementById('game-options');
const gameFeedback = document.getElementById('game-feedback');
const feedbackContent = document.getElementById('feedback-content');
const nextQuestionBtn = document.getElementById('next-question');
const gameResults = document.getElementById('game-results');
const finalWaterSaved = document.getElementById('final-water');
const resultBadge = document.getElementById('result-badge');
const resultTips = document.getElementById('result-tips');
const playAgainBtn = document.getElementById('play-again');
const currentQuestionDisplay = document.getElementById('current-question');
const waterSavedDisplay = document.getElementById('water-saved');
const gameProgress = document.getElementById('game-progress');

// Game questions with separate feedback for correct/incorrect answers
const questions = [
    {
        question: "How much water can you save by turning off the tap while brushing your teeth?",
        options: [
            "2 gallons per day",
            "5 gallons per day",
            "8 gallons per day",
            "12 gallons per day"
        ],
        correct: 2,
        correctFeedback: "Great job! You're right - turning off the tap while brushing can save up to 8 gallons per day per person.",
        incorrectFeedback: "Actually, the correct answer is 8 gallons per day. Turning off the tap while brushing makes a big difference!",
        waterSaved: 8
    },
    {
        question: "What uses less water: a 5-minute shower or a full bath?",
        options: [
            "5-minute shower",
            "Full bath",
            "They use about the same",
            "Depends on the showerhead"
        ],
        correct: 0,
        correctFeedback: "Exactly right! A 5-minute shower typically uses 10-25 gallons compared to 30-50 gallons for a bath.",
        incorrectFeedback: "Actually, a 5-minute shower uses significantly less water than a full bath (10-25 gallons vs 30-50 gallons).",
        waterSaved: 20
    },
    {
        question: "Which of these saves the most water?",
        options: [
            "Fixing a leaky toilet",
            "Using a broom instead of a hose to clean driveways",
            "Installing a low-flow showerhead",
            "Watering plants in the early morning"
        ],
        correct: 0,
        correctFeedback: "Correct! A leaky toilet can waste up to 200 gallons per day, making it the biggest water saver to fix.",
        incorrectFeedback: "The most impactful action is fixing a leaky toilet, which can waste up to 200 gallons per day.",
        waterSaved: 50
    },
    {
        question: "How much water does a standard washing machine use per load?",
        options: [
            "10-15 gallons",
            "20-30 gallons",
            "35-50 gallons",
            "55-70 gallons"
        ],
        correct: 2,
        correctFeedback: "That's right! Older washing machines use about 35-50 gallons per load. Newer ENERGY STAR models use less.",
        incorrectFeedback: "The correct answer is 35-50 gallons. Newer ENERGY STAR models use about 15-30 gallons per load.",
        waterSaved: 15
    },
    {
        question: "Which of these foods has the highest water footprint?",
        options: [
            "Lettuce",
            "Chicken",
            "Rice",
            "Beef"
        ],
        correct: 3,
        correctFeedback: "Correct! Beef has the highest water footprint at about 1,800 gallons per pound.",
        incorrectFeedback: "Actually, beef has the highest water footprint at about 1,800 gallons per pound.",
        waterSaved: 10
    }
];

let currentQuestion = 0;
let totalWaterSaved = 0;
let correctAnswers = 0;

// Start game
document.getElementById('start-game').addEventListener('click', function() {
    gameIntro.style.display = 'none';
    gameScreen.style.display = 'block';
    loadQuestion();
});

// Load question
function loadQuestion() {
    const q = questions[currentQuestion];
    gameQuestion.textContent = q.question;
    gameOptions.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'game-option';
        button.textContent = option;
        button.dataset.index = index;
        button.addEventListener('click', selectAnswer);
        gameOptions.appendChild(button);
    });
    
    currentQuestionDisplay.textContent = currentQuestion + 1;
    gameProgress.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

// Select answer
function selectAnswer(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    const q = questions[currentQuestion];
    
    // Disable all options
    document.querySelectorAll('.game-option').forEach(opt => {
        opt.disabled = true;
        opt.classList.remove('selected');
    });
    
    // Highlight selected
    e.target.classList.add('selected');
    
    // Check if correct
    const isCorrect = selectedIndex === q.correct;
    
    // Show appropriate feedback
    if (isCorrect) {
        feedbackContent.innerHTML = `
            <div class="feedback-icon correct"><i class="fas fa-check-circle"></i></div>
            <div class="feedback-text">
                <p class="feedback-title">Correct!</p>
                <p>${q.correctFeedback}</p>
            </div>
        `;
        feedbackContent.className = 'feedback-content correct';
        totalWaterSaved += q.waterSaved;
        waterSavedDisplay.textContent = totalWaterSaved;
        correctAnswers++;
    } else {
        const correctAnswer = q.options[q.correct];
        feedbackContent.innerHTML = `
            <div class="feedback-icon incorrect"><i class="fas fa-times-circle"></i></div>
            <div class="feedback-text">
                <p class="feedback-title">Not Quite Right</p>
                <p>The correct answer was: <strong>${correctAnswer}</strong></p>
                <p>${q.incorrectFeedback}</p>
            </div>
        `;
        feedbackContent.className = 'feedback-content incorrect';
    }
    
    gameFeedback.style.display = 'block';
}

// Next question
nextQuestionBtn.addEventListener('click', function() {
    gameFeedback.style.display = 'none';
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
});

// End game
function endGame() {
    gameScreen.style.display = 'none';
    gameResults.style.display = 'block';
    
    finalWaterSaved.textContent = totalWaterSaved;
    
    // Set badge based on performance
    const percentage = (correctAnswers / questions.length) * 100;
    if (percentage >= 80) {
        resultBadge.innerHTML = '<i class="fas fa-trophy"></i><span>Water Expert</span>';
    } else if (percentage >= 50) {
        resultBadge.innerHTML = '<i class="fas fa-medal"></i><span>Water Saver</span>';
    } else {
        resultBadge.innerHTML = '<i class="fas fa-seedling"></i><span>Water Learner</span>';
    }
    
    // Add tips
    resultTips.innerHTML = `
        <h4>Keep Saving Water:</h4>
        <ul>
            <li>Fix leaks promptly - they can waste hundreds of gallons</li>
            <li>Install water-efficient fixtures</li>
            <li>Water plants in the early morning to reduce evaporation</li>
            <li>Only run full loads in dishwashers and washing machines</li>
        </ul>
    `;
}

// Play again
playAgainBtn.addEventListener('click', function() {
    currentQuestion = 0;
    totalWaterSaved = 0;
    correctAnswers = 0;
    waterSavedDisplay.textContent = '0';
    
    gameResults.style.display = 'none';
    gameIntro.style.display = 'block';
});

    // Initialize the map
    function initMap() {
        // Default coordinates for Stockton, CA
        const stocktonCoords = [37.9577, -121.2908];
        
        // Create the map centered on Stockton
        const map = L.map('water-map').setView(stocktonCoords, 12);

        // Add the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add markers for water features (example points - adjust as needed)
        const waterFeatures = [
            {
                name: "Stockton Delta Water Supply",
                coords: [38.043739456207135, -121.49815501556057],
                type: "source",
                description: "Primary source of drinking water for the region"
            },
            {
                name: "Stockton Regional Wastewater Facility",
                coords: [37.93733011370202, -121.32745366161363],
                type: "plant",
                description: "Treats 30 million gallons of wastewater daily"
            },
            {
                name: "Mokelumne River",
                coords: [38.111150236848516, -121.57436044372004],
                type: "river",
                description: "Critical water source and wildlife habitat"
            }
        ];

        // Create different icons for different types
        const iconColors = {
            source: 'blue',
            plant: 'green',
            river: 'lightblue',
            conservation: 'red'
        };

        // Add markers for each feature
        waterFeatures.forEach(feature => {
            const icon = L.divIcon({
                className: `water-marker ${feature.type}`,
                html: `<div style="background-color: ${iconColors[feature.type] || 'blue'}"></div>`,
                iconSize: [20, 20]
            });

            L.marker(feature.coords, { icon: icon })
                .addTo(map)
                .bindPopup(`<strong>${feature.name}</strong><br>${feature.description}`);
        });

        // Handle the "View on Map" buttons
        document.querySelectorAll('.feature-locate').forEach(button => {
            button.addEventListener('click', function() {
                const coords = JSON.parse(this.dataset.location);
                map.setView(coords, 14);
                
                // Open the popup if it exists
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        const markerCoords = layer.getLatLng();
                        if (markerCoords.lat === coords[0] && markerCoords.lng === coords[1]) {
                            layer.openPopup();
                        }
                    }
                });
            });
        });

        // Handle layer toggles
        const layerControls = {
            'layer-rivers': 'river',
            'layer-reservoirs': 'source',
            'layer-plants': 'plant',
            'layer-conservation': 'conservation'
        };

        Object.entries(layerControls).forEach(([id, type]) => {
            document.getElementById(id).addEventListener('change', function() {
                const isChecked = this.checked;
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker && layer.options.icon.options.className.includes(type)) {
                        if (isChecked) {
                            map.addLayer(layer);
                        } else {
                            map.removeLayer(layer);
                        }
                    }
                });
            });
        });
    }

    // Initialize the map
    initMap();
});