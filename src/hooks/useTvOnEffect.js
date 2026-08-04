import { useEffect } from 'react';
import { initTvOnEffect } from '../../js/tv-on-effect.js';

export function useTvOnEffect() {
  useEffect(() => {
    initTvOnEffect();
  }, []);
}