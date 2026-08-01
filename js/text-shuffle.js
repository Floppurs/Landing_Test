/**
 * Text Scramble — эффект "бегущей буквы" для .nav-links a
 * При наведении первая буква слова циклически перемещается в конец,
 * пока не пройдёт полный цикл (длина_слова шагов).
 * Каждая ссылка имеет свой флаг блокировки — повторный hover на неё
 * во время анимации игнорируется.
 */
export function initTextScramble() {
    const links = document.querySelectorAll('.navbar a');

    // настройка сетапа для анимации
    links.forEach(link => {
        let isAnimating = false;
        let originalText = '';

        link.addEventListener('mouseenter', () => {
            if (isAnimating) return;

            const text = link.textContent.trim();

            if (text.length <= 1) return;

            originalText = text;

            // начинаем анимайию
            isAnimating = true;
            let step = 0;
            const totalSteps = text.length;

            const first = text[0];
            const rest = text.slice(1);

            const interval = setInterval(() => {

                const left = rest.slice(0, rest.length - step);
                const right = rest.slice(rest.length - step);

                link.textContent = left + first + right;

                step++;
                // const first = chars.shift();
                // chars.push(first);
                // link.textContent = chars.join('');

                if (step >= totalSteps) {
                    clearInterval(interval);
                    link.textContent = originalText;
                    isAnimating = false;

                }
            }, 50);
        });
    });
}