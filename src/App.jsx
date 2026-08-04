import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PlayerPage from './pages/PlayerPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/player" element={<PlayerPage />} />
    </Routes>
  );
}