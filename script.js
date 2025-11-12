// Smooth scrolling
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

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Waitlist form submission
document.querySelector('.waitlist-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.email-input').value;
    if (email) {
        // Here you would typically send the email to your backend
        alert('Thank you for joining our waitlist! We\'ll be in touch soon. 🌸');
        this.querySelector('.email-input').value = '';
    }
});

// Simple animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Quiz functionality
class MomMatchingQuiz {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 5;
        this.answers = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
    }

    bindEvents() {
        // Option selection
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectOption(e.target);
            });
        });

        // Navigation
        document.querySelector('.next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.querySelector('.prev-btn').addEventListener('click', () => {
            this.previousQuestion();
        });

        // Join community button
        document.querySelector('.join-community').addEventListener('click', () => {
            document.querySelector('#waitlist').scrollIntoView({ behavior: 'smooth' });
        });
    }

    selectOption(button) {
        // Remove selected class from all options in current question
        const currentQuestion = document.querySelector(`.question[data-question="${this.currentQuestion}"]`);
        currentQuestion.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Add selected class to clicked option
        button.classList.add('selected');

        // Store answer
        this.answers[this.currentQuestion] = button.dataset.value;

        // Enable next button
        document.querySelector('.next-btn').disabled = false;
    }

    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions) {
            this.hideQuestion(this.currentQuestion);
            this.currentQuestion++;
            this.showQuestion(this.currentQuestion);
            this.updateProgress();
            this.updateNavigation();
        } else {
            this.showResults();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 1) {
            this.hideQuestion(this.currentQuestion);
            this.currentQuestion--;
            this.showQuestion(this.currentQuestion);
            this.updateProgress();
            this.updateNavigation();
        }
    }

    hideQuestion(questionNum) {
        const question = document.querySelector(`.question[data-question="${questionNum}"]`);
        question.classList.remove('active');
    }

    showQuestion(questionNum) {
        const question = document.querySelector(`.question[data-question="${questionNum}"]`);
        question.classList.add('active');

        // Restore selected option if exists
        if (this.answers[questionNum]) {
            const selectedOption = question.querySelector(`[data-value="${this.answers[questionNum]}"]`);
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
    }

    updateNavigation() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        prevBtn.disabled = this.currentQuestion === 1;

        if (this.currentQuestion === this.totalQuestions) {
            nextBtn.textContent = 'See Results';
        } else {
            nextBtn.textContent = 'Next';
        }

        // Disable next if no option selected (except for last question)
        if (this.currentQuestion < this.totalQuestions) {
            nextBtn.disabled = !this.answers[this.currentQuestion];
        }
    }

    showResults() {
        document.querySelector('.quiz-content').style.display = 'none';
        document.querySelector('.quiz-result').style.display = 'block';
        document.querySelector('.quiz-navigation').style.display = 'none';
        document.querySelector('.quiz-progress').style.display = 'none';
    }
}

// For Quiz
document.addEventListener('DOMContentLoaded', function() {
    new MomMatchingQuiz();
});

// Hamburger menu functionality (for mobile)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}
