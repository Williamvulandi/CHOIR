// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Simple interaction for buttons
    const buttons = document.querySelectorAll('.add-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.textContent = 'Added!';
            this.style.background = '#10B981'; // Success Green
            this.style.borderColor = '#10B981';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = 'Add to Order';
                this.style.background = '';
                this.style.borderColor = '';
                this.style.color = '';
            }, 2000);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
