/**
 * TV-On Effect — анимация включения/выключения изображения в карточках портфолио.
 *
 * При наведении: прямая анимация (точка → полоса → фото) доигрывает до конца,
 * даже если курсор убран до завершения.
 * При снятии ховера: обратная анимация (фото → полоса → точка) без рывков.
 */

export function initTvOnEffect() {
    const visuals = document.querySelectorAll('.portfolio-visual');

    visuals.forEach(visual => {
        const img = visual.querySelector('img');
        if (!img) return;

        let isStretching = false;
        let shouldShrink = false;

        // Наведение курсора — запускаем прямую анимацию
        visual.addEventListener('mouseenter', () => {
            // Останавливаем обратную анимацию, если она идёт
            img.classList.remove('is-shrinking');
            // Перезапускаем прямую анимацию
            img.classList.remove('is-stretching');
            void img.offsetWidth; // принудительный reflow для перезапуска анимации
            img.classList.add('is-stretching');
            isStretching = true;
            shouldShrink = false;
        });

        // Снятие курсора — запускаем обратную анимацию или ждём завершения прямой
        visual.addEventListener('mouseleave', () => {
            if (isStretching) {
                // Прямая анимация ещё идёт — отметим, что нужно сжать после
                shouldShrink = true;
            } else {
                // Прямая завершена — запускаем обратную
                img.classList.remove('is-stretching');
                img.classList.add('is-shrinking');
            }
        });

        // Обработка завершения анимаций
        img.addEventListener('animationend', (e) => {
            if (e.animationName === 'stretch-image') {
                isStretching = false;
                if (shouldShrink) {
                    // Прямая доиграла, курсор уже убран — запускаем обратную
                    shouldShrink = false;
                    img.classList.remove('is-stretching');
                    img.classList.add('is-shrinking');
                }
                // Иначе: оставляем .is-stretching (forwards держит 100%)
            } else if (e.animationName === 'shrink-image') {
                img.classList.remove('is-shrinking');
                // Возврат к базовому состоянию
            }
        });
    });
}