import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Глобальные стили (общие для всех страниц)
import '../css/main.css';
import '../css/reset.css';
import '../css/components/portfolio.css';
import '../css/components/player.css';

// Тематические стили подключаются в страницах:
// - main-green.css → HomePage (главная)
// - player-cream.css → PlayerPage (плеер)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);