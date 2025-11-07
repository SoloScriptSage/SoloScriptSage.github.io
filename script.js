// Smooth scroll functionality
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile menu toggle
const nav = document.querySelector('nav ul');
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '&#9776;';
document.querySelector('nav').prepend(hamburger);

hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('show');
    });
});

// Typing effect for hero section (only on home page)
if (document.querySelector('.hero')) {
    const lines = [
        { selector: 'h1', text: 'VLADYSLAV HIRCHUK', delay: 200 },
        { selector: '.subtitle', text: 'Embedded Software Engineer | C++ Developer', delay: 2000 },
        { selector: '.terminal-line:nth-of-type(1)', text: '$ cat location.txt', delay: 3500 },
        { selector: '.terminal-line:nth-of-type(2)', text: '📍 Gdynia, Poland', delay: 4500 },
        { selector: '.terminal-line:nth-of-type(3)', text: '$ echo $SPECIALIZATION', delay: 5500 },
        { selector: '.terminal-line:nth-of-type(4)', text: 'System Programming • Computer Vision • Algorithm Design', delay: 6500 }
    ];

    lines.forEach(line => {
        const el = document.querySelector(line.selector);
        if (!el) return;
        
        // Clear element content
        el.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            function type() {
                if (i < line.text.length) {
                    el.textContent += line.text.charAt(i);
                    i++;
                    setTimeout(type, 50); // typing speed (50ms per character)
                }
            }
            type();
        }, line.delay);
    });

    // Calculate when last line finishes typing and show cursor
    const lastLine = lines[lines.length - 1];
    const lastText = lastLine.text;
    const typingDuration = lastText.length * 50; // 50ms per character
    const showCursorAt = lastLine.delay + typingDuration + 200; // +200ms buffer

    setTimeout(() => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.opacity = '1';
            cursor.style.animation = 'blink 1s infinite';
        }
    }, showCursorAt);
}

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
});

// Add animation on scroll for cards (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.skill-card, .experience-card, .education-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});