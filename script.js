// Create enhanced animated particles with colors
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 80;
    const particleTypes = ['particle-small', 'particle-medium', 'particle-large', 'particle-glow'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const randomType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        particle.className = `particle ${randomType}`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Enhanced Navigation Functionality
function initializeNavigation() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scrollProgress');
    const sections = document.querySelectorAll('section[id]');

    // Scroll progress bar
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // Header scroll effects
    function handleHeaderScroll() {
        const scrolled = window.pageYOffset > 50;
        header.classList.toggle('scrolled', scrolled);
    }

    // Active navigation highlighting
    function updateActiveNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll with offset for fixed header
    function smoothScrollToSection(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Enhanced click handlers for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            smoothScrollToSection(targetId);

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            if (mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Enhanced hover effects
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        link.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });

    // Scroll event listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        handleHeaderScroll();
        updateActiveNavigation();
    });

    // Initialize on load
    updateActiveNavigation();
    handleHeaderScroll();
}

// Enhanced Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    mobileMenuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }

        // Add haptic feedback (vibration) on mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Enhanced mobile menu link interactions
    const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 107, 53, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Logo interactions
function initializeLogoInteractions() {
    const logo = document.querySelector('.logo');

    logo.addEventListener('click', function () {
        // Scroll to top with animation
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Add click animation
        this.style.transform = 'scale(0.95) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });

    // Random sparkle effect on hover
    logo.addEventListener('mouseenter', function () {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createSparkle(this);
            }, i * 100);
        }
    });
}

function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#ff6b35';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';

    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    sparkle.style.zIndex = '1002';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// CTA Button enhancements
function initializeCTAButton() {
    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('mouseenter', function () {
        // Add pulse effect
        this.style.animation = 'pulse 0.6s ease-in-out';
    });

    ctaButton.addEventListener('animationend', function () {
        this.style.animation = '';
    });

    ctaButton.addEventListener('click', function (e) {
        // Create expanding circle effect
        const circle = document.createElement('span');
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = diameter + 'px';
        circle.style.left = (e.clientX - this.offsetLeft - radius) + 'px';
        circle.style.top = (e.clientY - this.offsetTop - radius) + 'px';
        circle.classList.add('ripple-effect');

        this.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
    });
}

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header background opacity on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    const opacity = Math.min(scrolled / 100, 1);
    header.style.background = `rgba(15, 15, 35, ${0.8 + opacity * 0.2})`;
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Demo form functionality
const demoForm = document.getElementById('demoForm');
const resultDisplay = document.getElementById('resultDisplay');
const resultScore = document.getElementById('resultScore');
const resultDetails = document.getElementById('resultDetails');

demoForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const button = this.querySelector('.predict-button');
    const buttonText = button.querySelector('.button-text');
    const loading = button.querySelector('.loading');

    // Show loading state
    buttonText.style.display = 'none';
    loading.style.display = 'inline-block';
    button.disabled = true;

    try{
    // Get form data
    const formData = {
        /* applicantName: document.getElementById('applicantName').value,
         age: parseInt(document.getElementById('age').value),
         gender: document.getElementById('gender').value,
         dependents: document.getElementById('dependents').value,
         education: document.getElementById('education').value,
         employment: document.getElementById('employment').value,
         applicantIncome: parseInt(document.getElementById('applicantIncome').value),
         loanAmount: parseInt(document.getElementById('loanAmount').value),
         loanTerm: document.getElementById('loanTerm').value,
         creditHistory: document.getElementById('creditHistory').value,
         propertyArea: document.getElementById('propertyArea').value */

        Gender: document.getElementById('gender').value === 'male' ? 1 : 0,
        Married: document.getElementById('maritalStatus')?.value === 'married' ? 1 : 0,
        Dependents: parseInt(document.getElementById('dependents').value) || 0,
        Education: document.getElementById('education').value === 'graduate' ? 0 : 1,
        Self_Employed: document.getElementById('employment').value === 'self-employed' ? 1 : 0,
        ApplicantIncome: parseFloat(document.getElementById('applicantIncome').value),
        CoapplicantIncome: 0, // No field in your form for co-applicant income
        LoanAmount: parseFloat(document.getElementById('loanAmount').value),
        Loan_Amount_Term: parseFloat(document.getElementById('loanTerm').value),
        Credit_History: document.getElementById('creditHistory').value === 'yes' ? 1 : 0,
        Property_Area: document.getElementById('propertyArea').value === 'urban'
            ? 2
            : document.getElementById('propertyArea').value === 'semiurban'
                ? 1
                : 0

    };

    console.log('Sending form data', formData);

    const response = await fetch('http://13.234.27.236:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const data = await response.json();
    displayPredictionResult(data.prediction);
    }
     catch (error) {
      console.error(error);
      displayPredictionResult('Error contacting prediction server. Please try again later.');
    } finally {
      buttonText.style.display = 'inline';
      loading.style.display = 'none';
      button.disabled = false;
    }
  });
    // Simulate AI prediction with realistic algorithm
   /* setTimeout(() => {
        const prediction = calculateLoanPrediction(formData);

        // Hide loading state
        buttonText.style.display = 'inline';
        loading.style.display = 'none';
        button.disabled = false;

        // Show results
        displayPredictionResult(prediction);
    }, 2000);
});*/

/*function calculateLoanPrediction(data) {
    let score = 0;
    let factors = [];

    // Credit History impact (35% weight)
    if (data.creditHistory === 'yes') {
        score += 35;
        factors.push("Good credit history");
    } else {
        score += 10;
        factors.push("Poor credit history affects approval");
    }

    // Income to loan ratio (25% weight)
    const monthlyIncome = data.applicantIncome;
    const debtToIncomeRatio = data.loanAmount / (monthlyIncome * 12);
    if (debtToIncomeRatio <= 3) {
        score += 25;
        factors.push("Excellent income-to-loan ratio");
    } else if (debtToIncomeRatio <= 5) {
        score += 20;
        factors.push("Good income-to-loan ratio");
    } else if (debtToIncomeRatio <= 8) {
        score += 15;
        factors.push("Moderate income-to-loan ratio");
    } else {
        score += 5;
        factors.push("High loan amount relative to income");
    }

    // Employment status (15% weight)
    if (data.employment === 'not-self-employed') {
        score += 15;
        factors.push("Stable employment status");
    } else {
        score += 10;
        factors.push("Self-employed status");
    }

    // Education level (10% weight)
    if (data.education === 'graduate') {
        score += 10;
        factors.push("Graduate education level");
    } else {
        score += 5;
        factors.push("Non-graduate education level");
    }

    // Property area (8% weight)
    switch (data.propertyArea) {
        case 'urban':
            score += 8;
            factors.push("Urban property location");
            break;
        case 'semiurban':
            score += 6;
            factors.push("Semi-urban property location");
            break;
        case 'rural':
            score += 4;
            factors.push("Rural property location");
            break;
    }

    // Dependents impact (4% weight)
    const dependentsCount = parseInt(data.dependents) || 0;
    if (dependentsCount === 0) {
        score += 4;
        factors.push("No dependents");
    } else if (dependentsCount <= 2) {
        score += 3;
        factors.push(`${dependentsCount} dependent(s)`);
    } else {
        score += 1;
        factors.push("Multiple dependents");
    }

    // Age factor (3% weight)
    const age = parseInt(data.age);
    if (age >= 25 && age <= 50) {
        score += 3;
        factors.push("Optimal age range for lending");
    } else if (age >= 21 && age <= 60) {
        score += 2;
        factors.push("Acceptable age for lending");
    } else {
        score += 1;
        factors.push("Age may affect loan terms");
    }

    // Loan term consideration (bonus/penalty)
    const loanTermMonths = parseInt(data.loanTerm);
    if (loanTermMonths <= 60) {
        factors.push("Short-term loan (lower risk)");
    } else if (loanTermMonths <= 180) {
        factors.push("Medium-term loan");
    } else {
        score -= 2;
        factors.push("Long-term loan (higher risk)");
    }

    // Determine approval status
    let status, message, recommendations = [];

    if (score >= 80) {
        status = 'approved';
        message = 'Loan Approved';
    } else if (score >= 60) {
        status = 'pending';
        message = 'Under Review';
        recommendations.push("Consider providing additional income documentation");
        recommendations.push("A co-signer might improve approval chances");
    } else {
        status = 'rejected';
        message = 'Loan Declined';
        recommendations.push("Improve credit history before reapplying");
        recommendations.push("Consider a smaller loan amount");
        recommendations.push("Increase income or reduce existing debts");
        if (data.education === 'not-graduate') {
            recommendations.push("Consider skill development programs");
        }
    }

    return {
        score: Math.min(100, Math.round(score)),
        status,
        message,
        factors,
        recommendations,
        confidence: Math.min(95, 75 + Math.random() * 20)
    };
}*/

function displayPredictionResult(prediction) {
    /*resultScore.textContent = prediction.message;
    resultScore.className = `result-score result-${prediction.status}`;

    let detailsHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
                    <div>
                        <h4 style="color: #ff6b35; margin-bottom: 1rem;">Prediction Score</h4>
                        <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px;">
                            <div style="font-size: 2rem; font-weight: bold; color: #ffffff;">${prediction.score}/100</div>
                            <div style="color: #b0b0b0;">Confidence: ${prediction.confidence.toFixed(1)}%</div>
                        </div>
                    </div>
                    <div>
                        <h4 style="color: #ff6b35; margin-bottom: 1rem;">Key Factors</h4>
                        <ul style="list-style: none; padding: 0;">
                            ${prediction.factors.map(factor => `
                                <li style="background: rgba(255,255,255,0.05); padding: 0.5rem; margin-bottom: 0.5rem; border-radius: 5px; border-left: 3px solid #ff6b35;">
                                    ${factor}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;

    if (prediction.recommendations.length > 0) {
        detailsHTML += `
                    <div style="margin-top: 2rem;">
                        <h4 style="color: #ff6b35; margin-bottom: 1rem;">Recommendations</h4>
                        <ul style="list-style: none; padding: 0;">
                            ${prediction.recommendations.map(rec => `
                                <li style="background: rgba(255,255,255,0.05); padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 5px; border-left: 3px solid #fee140;">
                                    💡 ${rec}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
    }

    resultDetails.innerHTML = detailsHTML;
    resultDisplay.classList.add('show');

    // Scroll to results
    resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
}*/

resultDisplay.classList.add('show');
    resultScore.textContent = `Loan Prediction: ${prediction}`;
    resultScore.className = `result-score result-${prediction.toLowerCase()}`;
    resultDetails.innerHTML = `
      <p style="color: #b0b0b0;">
        Based on the details you provided, our AI model predicts your loan application will be 
        <strong style="color: #ff6b35;">${prediction}</strong>.
      </p>
      <p style="color: #b0b0b0;">
        This is an estimate. Actual approval may depend on additional verification and lender policies.
      </p>
    `;
    resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
   

// Typewriter effect for hero section
const lines = [
    "Revolutionizing financial decisions with cutting-edge artificial intelligence.",
    "Get instant, accurate loan predictions and risk assessments.",
    "Advanced ML algorithms built for the digital age."
];

const container = document.getElementById('typewriter');
let lineIndex = 0;
let charIndex = 0;
let currentSpan = null;

function typeNextChar() {
    if (!currentSpan) {
        currentSpan = document.createElement('span');
        currentSpan.classList.add('typewriter-line', 'cursor');
        container.appendChild(currentSpan);
    }

    const currentLine = lines[lineIndex];
    currentSpan.textContent += currentLine.charAt(charIndex);
    charIndex++;

    if (charIndex < currentLine.length) {
        setTimeout(typeNextChar, 50);
    } else {
        currentSpan.classList.remove('cursor');
        lineIndex++;
        charIndex = 0;
        currentSpan = null;
        if (lineIndex < lines.length) {
            setTimeout(typeNextChar, 1000);
        }
    }
}

// Form validation and UX improvements
function setupFormValidation() {
    const inputs = document.querySelectorAll('#demoForm input, #demoForm select');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.id) {
        case 'applicantName':
            if (!value || value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter a valid full name (minimum 2 characters)';
            }
            break;
        case 'age':
            const age = parseInt(value);
            if (!value || age < 18 || age > 80) {
                isValid = false;
                errorMessage = 'Age must be between 18 and 80 years';
            }
            break;
        case 'applicantIncome':
            if (!value || parseInt(value) < 1000) {
                isValid = false;
                errorMessage = 'Please enter a valid monthly income (minimum $1,000)';
            }
            break;
        case 'loanAmount':
            if (!value || parseInt(value) < 10000) {
                isValid = false;
                errorMessage = 'Please enter a valid loan amount (minimum $10,000)';
            }
            break;
        case 'gender':
        case 'dependents':
        case 'education':
        case 'employment':
        case 'loanTerm':
        case 'creditHistory':
        case 'propertyArea':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select an option';
            }
            break;
    }

    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add error styling if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#f5576c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorDiv);
    }

    return isValid;
}

// Analytics Dashboard Functionality
function initializeAnalyticsDashboard() {
    // Add SVG gradients for circular chart
    const circularChartSvg = document.querySelector('.circular-chart-svg');
    if (circularChartSvg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'circularGradient');
        gradient.innerHTML = `
                    <stop offset="0%" style="stop-color:#ff6b35;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f7931e;stop-opacity:1" />
                `;
        defs.appendChild(gradient);
        circularChartSvg.appendChild(defs);
    }
}

function animateCircularChart() {
    const circularChart = document.querySelector('.circular-chart');
    if (!circularChart) return;

    const circle = circularChart.querySelector('.circle');
    const percentage = parseFloat(circularChart.dataset.percentage);
    const circumference = 2 * Math.PI * 15.9155;
    const offset = circumference - (percentage / 100) * circumference;

    // Animate the circle
    setTimeout(() => {
        circle.style.strokeDasharray = `${circumference}, ${circumference}`;
        circle.style.strokeDashoffset = offset;
    }, 500);
}

function animateLiveCounter() {
    const counterElement = document.getElementById('liveCounter');
    if (!counterElement) return;

    let currentCount = 50247;

    setInterval(() => {
        const increment = Math.floor(Math.random() * 3) + 1;
        currentCount += increment;
        counterElement.textContent = currentCount.toLocaleString();

        // Show increment animation
        const incrementElement = counterElement.nextElementSibling;
        if (incrementElement) {
            incrementElement.textContent = `+${increment}`;
            incrementElement.style.animation = 'none';
            setTimeout(() => {
                incrementElement.style.animation = 'counterPop 2s ease-in-out';
            }, 10);
        }
    }, 3000);
}

function animateActivityMonitor() {
    const activityItems = document.querySelectorAll('.activity-item');
    if (!activityItems.length) return;

    setInterval(() => {
        // Remove all active states
        activityItems.forEach(item => {
            item.querySelector('.activity-dot').classList.remove('active');
        });

        // Add active state to random items
        const randomIndices = [];
        const numActive = Math.floor(Math.random() * 2) + 1;

        for (let i = 0; i < numActive; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * activityItems.length);
            } while (randomIndices.includes(randomIndex));

            randomIndices.push(randomIndex);
            activityItems[randomIndex].querySelector('.activity-dot').classList.add('active');
        }
    }, 2500);
}

function createFloatingDataPoints() {
    const chartContainers = document.querySelectorAll('.chart-container');

    setInterval(() => {
        chartContainers.forEach(container => {
            if (Math.random() > 0.7) { // 30% chance to create a floating point
                const floatingData = document.createElement('div');
                floatingData.className = 'floating-data';
                floatingData.textContent = `+${Math.floor(Math.random() * 50) + 1}`;
                floatingData.style.left = Math.random() * 80 + 10 + '%';
                floatingData.style.bottom = '20px';

                container.style.position = 'relative';
                container.appendChild(floatingData);

                // Remove after animation
                setTimeout(() => {
                    if (floatingData.parentNode) {
                        floatingData.parentNode.removeChild(floatingData);
                    }
                }, 3000);
            }
        });
    }, 4000);
}

function setupAnalyticsIntersectionObserver() {
    const analyticsSection = document.querySelector('.analytics-dashboard');
    if (!analyticsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger all animations
                setTimeout(animateCircularChart, 200);
                setTimeout(animateLiveCounter, 400);
                setTimeout(animateActivityMonitor, 600);
                setTimeout(createFloatingDataPoints, 800);

                // Only observe once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(analyticsSection);
}

// Enhanced chart interactions
function addChartInteractions() {
    const chartContainers = document.querySelectorAll('.chart-container');

    chartContainers.forEach(container => {
        container.addEventListener('mouseenter', function () {
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.2), 0 0 30px rgba(255, 107, 53, 0.1)';

            // Scale chart elements slightly
            const circularChart = this.querySelector('.circular-chart');
            const counterNumber = this.querySelector('.counter-number');
            const lineChart = this.querySelector('.line-chart-svg');

            if (circularChart) {
                circularChart.style.transform = 'scale(1.05)';
            }
            if (counterNumber) {
                counterNumber.style.transform = 'scale(1.1)';
            }
            if (lineChart) {
                lineChart.style.transform = 'scale(1.02)';
            }
        });

        container.addEventListener('mouseleave', function () {
            // Remove glow effect
            this.style.boxShadow = '';

            // Reset scale
            const circularChart = this.querySelector('.circular-chart');
            const counterNumber = this.querySelector('.counter-number');
            const lineChart = this.querySelector('.line-chart-svg');

            if (circularChart) {
                circularChart.style.transform = 'scale(1)';
            }
            if (counterNumber) {
                counterNumber.style.transform = 'scale(1)';
            }
            if (lineChart) {
                lineChart.style.transform = 'scale(1)';
            }
        });
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const inputs = contactForm.querySelectorAll('input, select, textarea');

    // Form validation
    function validateContactField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'text':
                if (field.required && !value) {
                    isValid = false;
                    errorMessage = 'This field is required';
                }
                break;
            case 'textarea':
                if (field.required && (!value || value.length < 10)) {
                    isValid = false;
                    errorMessage = 'Please enter at least 10 characters';
                }
                break;
            default:
                if (field.required && !value) {
                    isValid = false;
                    errorMessage = 'Please select an option';
                }
        }

        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    // Add validation listeners
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateContactField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateContactField(this);
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateContactField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        const submitButton = this.querySelector('.submit-button');
        const buttonText = submitButton.querySelector('.button-text');
        const loading = submitButton.querySelector('.loading');

        // Show loading state
        buttonText.style.display = 'none';
        loading.style.display = 'inline-block';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Hide loading state
            buttonText.style.display = 'inline';
            loading.style.display = 'none';
            submitButton.disabled = false;

            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset form after showing success
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.style.display = 'none';
            }, 5000);

        }, 2000);
    });
}

// Social Media Links Animation
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            // Add floating animation
            this.style.animation = 'float 2s ease-in-out infinite';
        });

        link.addEventListener('mouseleave', function () {
            this.style.animation = '';
        });

        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Simulate external link opening
            console.log('Opening social media link:', this.classList[1]);
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    setupFormValidation();
    typeNextChar();

    // Initialize enhanced navigation
    initializeNavigation();
    initializeMobileMenu();
    initializeLogoInteractions();
    initializeCTAButton();

    // Initialize contact form and social links
    initializeContactForm();
    initializeSocialLinks();

    // Initialize analytics dashboard
    initializeAnalyticsDashboard();
    setupAnalyticsIntersectionObserver();
    addChartInteractions();

    // Setup scroll reveal
    const animatedElements = document.querySelectorAll('.scroll-reveal');
    animatedElements.forEach(el => observer.observe(el));

    // Add hover effects to floating elements
    document.querySelectorAll('.floating-element').forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.2) rotate(180deg)';
            this.style.opacity = '0.3';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.opacity = '0.1';
        });
    });
    // Add CSS for enhanced navigation animations
    const style = document.createElement('style');
    style.textContent = `
                .form-group input.error,
                .form-group select.error {
                    border-color: #f5576c;
                    box-shadow: 0 0 0 2px rgba(245, 87, 108, 0.2);
                }
                
                .form-group input:focus,
                .form-group select:focus {
                    transform: translateY(-2px);
                }
                
                .predict-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none !important;
                }
                
                .demo-container {
                    animation: slideInUp 0.8s ease-out;
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .feature-card {
                    animation: slideInScale 0.6s ease-out;
                    animation-fill-mode: both;
                }
                
                .feature-card:nth-child(1) { animation-delay: 0.1s; }
                .feature-card:nth-child(2) { animation-delay: 0.2s; }
                .feature-card:nth-child(3) { animation-delay: 0.3s; }
                .feature-card:nth-child(4) { animation-delay: 0.4s; }
                .feature-card:nth-child(5) { animation-delay: 0.5s; }
                .feature-card:nth-child(6) { animation-delay: 0.6s; }
                
                @keyframes slideInScale {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }

                @keyframes sparkle {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1) rotate(180deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }

                .ripple-effect {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }

                /* Enhanced navigation animations */
                .nav-links a {
                    position: relative;
                    overflow: hidden;
                }

                .nav-links a.active {
                    background: rgba(255, 107, 53, 0.15);
                }

                /* Mobile menu slide-in animation enhancement */
                .mobile-menu.active .nav-links a:hover {
                    transform: translateX(10px) scale(1.02);
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
                }

                /* Scroll progress styling */
                .scroll-progress {
                    box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
                }

                /* Header glow effect on scroll */
                header.scrolled {
                    box-shadow: 0 0 30px rgba(255, 107, 53, 0.1);
                }
            `;
    document.head.appendChild(style);
});

// Add particles interaction
document.addEventListener('mousemove', function (e) {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        particle.style.transform += ` translate(${x}px, ${y}px)`;
    });
});