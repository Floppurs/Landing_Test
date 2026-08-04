// Тема главной страницы (зелёная) — подключается динамически
import themeCss from '../../css/main-green.css?raw';
import { useTheme } from '../hooks/useTheme.js';

import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import PortfolioSection from '../components/PortfolioSection.jsx';
import Footer from '../components/Footer.jsx';
import CursorGlow from '../components/CursorGlow.jsx';
import ParticlesCanvas from '../components/ParticlesCanvas.jsx';
import { useEffect } from 'react';
import { useAnimations } from '../hooks/useAnimations.js';
import { useTvOnEffect } from '../hooks/useTvOnEffect.js';

export default function HomePage() {
  useTheme(themeCss);
  useAnimations();
  useTvOnEffect();

  // Скролл к секции при переходе с плеера (например /#petshop)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.querySelector(hash);
    if (!target) return;

    // Ждём полный рендер и применяем тот же приём, что в initJsScroll
    const frame = requestAnimationFrame(() => {
      const originalPosition = target.style.position;
      target.style.position = 'static';
      const top = target.getBoundingClientRect().top + window.scrollY;
      target.style.position = originalPosition;

      window.scrollTo({ top, behavior: 'smooth' });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <CursorGlow />
      <ParticlesCanvas />
      <Navbar variant="home" />

      <Hero />

      <PortfolioSection
        id="player"
        tag="Проект 01"
        title={<>Музыкальный <span className="highlight">плеер</span></>}
        desc="Интерактивный плеер с возможностью прослушивания треков"
        delay="0"
        image="assets/images/player.jpg"
        alt="Музыкальный плеер"
        overlayTag="🎵 Открыть плеер"
        number="01"
        category="Audio / Music Player"
        name="Music Player"
        text="Интерактивный музыкальный плеер с возможностью прослушивания избранных треков. Поддержка управления воспроизведением, адаптивный дизайн для всех устройств. Переход на отдельную страницу плеера для полного опыта."
        tech={['HTML/CSS', 'JavaScript', 'Audio API']}
        link="/player"
        linkText="Открыть плеер"
      />

      <PortfolioSection
        id="petshop"
        tag="Проект 02"
        title={<>Зоомагазин <span className="highlight">PetShop</span></>}
        desc="Яркий и дружелюбный сайт для зоотоваров"
        delay="200"
        reverse
        image="assets/images/petshop.jpg"
        alt="Зоомагазин"
        overlayTag="🔗 Открыть сайт"
        number="02"
        category="Animals / E-commerce"
        name="Happy Pet"
        text="Сайт зоомагазина с тёплой цветовой палитрой, иллюстрациями животных и удобным каталогом. Интерактивные карточки товаров, фильтры и простая навигация для заботливых хозяев."
        tech={['HTML/CSS', 'JavaScript', 'React', 'Tailwind']}
        link="https://example.com/pet-shop"
        linkText="Посмотреть сайт"
      />

      <PortfolioSection
        id="bakery"
        tag="Проект 03"
        title={<>Кондитерская <span className="highlight">Bakery</span></>}
        desc="Аппетитный сайт для домашней выпечки"
        delay="400"
        image="assets/images/bakery.jpg"
        alt="Кондитерская"
        overlayTag="🔗 Открыть сайт"
        number="03"
        category="Food / Landing Page"
        name="Sweet Dream"
        text="Уютный лендинг для кондитерской с фотографиями десертов, параллакс-эффектами и анимацией появления блюд. Интегрирован онлайн-заказ и карта с расположением пекарни."
        tech={['HTML/CSS', 'JavaScript', 'GSAP', 'SASS']}
        link="https://example.com/bakery"
        linkText="Посмотреть сайт"
      />

      <Footer />
    </>
  );
}