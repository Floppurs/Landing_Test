import { useEffect } from 'react';
import { initTextScramble } from '../../js/text-shuffle.js';

export function useTextScramble() {
  useEffect(() => {
    initTextScramble();
  }, []);
}