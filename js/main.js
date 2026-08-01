/**
 * Main entry point — инициализация всех модулей
 */
import { initCursorGlow } from './cursor-glow.js';
import { initParticles } from './particles.js';
import { initNavbar, initSmoothScroll } from './navbar.js';
import { initScrollAnimations, initHeroParallax } from './animations.js';
import { initPlanet } from './planet.js';
import { initTextScramble } from './text-shuffle.js';
import { initTvOnEffect } from './tv-on-effect.js';

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initParticles();
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initHeroParallax();
    initPlanet();
    initTextScramble();
    initTvOnEffect();

    console.log('🚀 Портфолио загружено!');
});
