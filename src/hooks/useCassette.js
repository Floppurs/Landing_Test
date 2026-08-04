import { useEffect } from 'react';
import { initCassette } from '../../js/cassette.js';

export function useCassette() {
  useEffect(() => {
    const cleanup = initCassette();
    return cleanup;
  }, []);
}