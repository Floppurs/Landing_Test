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
 * JS-скролл к секциям с временным отключением sticky.
 *
 * Проблема: position: sticky + z-index ломают нативную прокрутку к якорям —
 * браузер видит секцию визуально на top: 0 и не прокручивает, хотя она
 * перекрыта другой sticky-секцией с большим z-index.
 *
 * Решение: при клике временно переключаем sticky → static, измеряем истинную
 * позицию через getBoundingClientRect(), возвращаем sticky и прокручиваем.
 * Всё синхронно — без визуального скачка.
 */
export function initJsScroll() {
    document.querySelectorAll('a[data-scroll]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            // Временно отключаем sticky для точного измерения
            const originalPosition = target.style.position;
            target.style.position = 'static';
            const top = target.getBoundingClientRect().top + window.scrollY;
            target.style.position = originalPosition;

            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });
}

