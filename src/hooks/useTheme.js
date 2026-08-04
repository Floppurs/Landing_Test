import { useEffect } from 'react';

/**
 * Динамически подключает CSS-тему при монтировании страницы
 * и удаляет её при размонтировании.
 * Это позволяет переключать темы между страницами без конфликтов.
 */
export function useTheme(cssContent) {
  useEffect(() => {
    if (!cssContent) return;

    const style = document.createElement('style');
    style.setAttribute('data-theme', 'dynamic');
    style.textContent = cssContent;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [cssContent]);
}