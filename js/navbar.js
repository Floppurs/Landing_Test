/**
 * Navbar — эффект скролла, мобильное меню
 */
export function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (!navbar) return;

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile hamburger toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }
}

/**
 * Smooth scroll for anchor links
 * Использует обход offsetParent для вычисления абсолютной позиции,
 * игнорируя sticky-сдвиг. Это решает проблему прокрутки к секциям,
 * которые перекрыты другими sticky-секциями с большим z-index.
 */
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Абсолютная позиция через обход offsetParent (игнорирует sticky)
                let top = 0;
                let el = target;
                while (el) {
                    top += el.offsetTop;
                    el = el.offsetParent;
                }
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });
}

