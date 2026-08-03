/**
 * Main entry point — инициализация всех модулей
 */
import { initCursorGlow } from './cursor-glow.js';
import { initParticles } from './particles.js';
import { initNavbar, initJsScroll } from './navbar.js';
import { initScrollAnimations, initHeroParallax } from './animations.js';
import { initPlanet } from './planet.js';
import { initCassette } from './cassette.js';
import { initTextScramble } from './text-shuffle.js';
import { initTvOnEffect } from './tv-on-effect.js';

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initParticles();
    initNavbar();
    initJsScroll();
    initScrollAnimations();
    initHeroParallax();
    initPlanet();
    initCassette();
    initTextScramble();
    initTvOnEffect();

    console.log('🚀 Портфолио загружено!');
});
