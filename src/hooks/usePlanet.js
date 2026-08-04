import { useEffect } from 'react';
import { initPlanet } from '../../js/planet.js';

export function usePlanet() {
  useEffect(() => {
    const cleanup = initPlanet();
    return cleanup;
  }, []);
}