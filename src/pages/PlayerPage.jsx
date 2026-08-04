// Тема страницы плеера (кремовая) — подключается динамически
import themeCss from '../../css/player-cream.css?raw';
import { useTheme } from '../hooks/useTheme.js';

import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import ParticlesCanvas from '../components/ParticlesCanvas.jsx';
import TrackItem from '../components/TrackItem.jsx';

export default function PlayerPage() {
  useTheme(themeCss);

  return (
    <div className="player-page">
      <ParticlesCanvas />
      <Navbar variant="player" />

      <section className="music-player-section" id="music-player">
        <div className="player-header">
          <h1>
            <span className="highlight">Музыкальный</span><br />
            Плеер
          </h1>
          <p className="player-subtitle">
            Слушайте избранные треки
          </p>
        </div>

        <div className="player-list">
          <TrackItem number="01" title="Первый трек" artist="Artists Name" src="assets/audio/track1.mp3" />
          <TrackItem number="02" title="Второй трек" artist="Artists Name" src="assets/audio/track2.mp3" />
          <TrackItem number="03" title="Третий трек" artist="Artists Name" src="assets/audio/track3.mp3" />
        </div>

        <Link to="/#player" className="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Вернуться на главную</span>
        </Link>
      </section>
    </div>
  );
}