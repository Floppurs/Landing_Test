/**
 * Animations — Intersection Observer для появления элементов при скролле
 */
export function initScrollAnimations() {
    // Portfolio cards animation
    const cards = document.querySelectorAll('.portfolio-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.classList.remove('visible');
        cardObserver.observe(card);
    });

    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        headerObserver.observe(header);
    });
}

/**
 * Parallax — движение hero-фигур за курсором
 */
export function initHeroParallax() {
    const heroShapes = document.querySelectorAll('.hero-shape');
    if (!heroShapes.length) return;

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        heroShapes.forEach((shape, i) => {
            const speed = (i + 1) * 8;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}