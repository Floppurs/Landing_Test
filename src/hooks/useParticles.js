import { useEffect } from 'react';
import { initParticles } from '../../js/particles.js';

export function useParticles() {
  useEffect(() => {
    initParticles();
  }, []);
}