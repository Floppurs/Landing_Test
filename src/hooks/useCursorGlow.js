import { useEffect } from 'react';
import { initCursorGlow } from '../../js/cursor-glow.js';

export function useCursorGlow() {
  useEffect(() => {
    initCursorGlow();
  }, []);
}