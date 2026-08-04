import { useEffect } from 'react';
import { initNavbar, initJsScroll } from '../../js/navbar.js';

export function useNavbar() {
  useEffect(() => {
    initNavbar();
    initJsScroll();
  }, []);
}