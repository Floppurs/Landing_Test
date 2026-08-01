/**
 * TV-On Effect — анимация включения/выключения изображения в карточках портфолио.
 *
 * Использует Web Animations API: смена playbackRate с 1 на -1 мгновенно меняет
 * направление анимации, продолжая с текущего кадра. Никаких скачков.
 *
 * Наведение:  прямая анимация (точка → полоса → фото) с текущего кадра.
 * Снятие:    обратная анимация (фото → полоса → точка) с текущего кадра.
 */

export function initTvOnEffect() {
    const visuals = document.querySelectorAll('.portfolio-visual');

    const keyframes = [
        { width: '3px', height: '3px', filter: 'brightness(0) invert(1)' },
        { width: '100%', height: '3px', filter: 'brightness(0) invert(1)', offset: 0.5 },
        { width: '100%', height: '100%', filter: 'brightness(1) invert(0)' }
    ];

    const options = { duration: 500, easing: 'ease-in-out', fill: 'both' };

    visuals.forEach(visual => {
        const img = visual.querySelector('img');
        if (!img) return;

        let anim = null;

        // Наведение курсора — прямая анимация с текущего кадра
        visual.addEventListener('mouseenter', () => {
            if (!anim) {
                anim = img.animate(keyframes, options);
            }
            anim.playbackRate = 1;
            anim.play();
        });

        // Снятие курсора — обратная анимация с текущего кадра
        visual.addEventListener('mouseleave', () => {
            if (anim) {
                anim.playbackRate = -1;
                anim.play();
            }
        });
    });
}