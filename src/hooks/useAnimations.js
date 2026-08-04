import { useEffect } from 'react';
import { initScrollAnimations, initHeroParallax } from '../../js/animations.js';

export function useAnimations() {
  useEffect(() => {
    initScrollAnimations();
    initHeroParallax();
  }, []);
}