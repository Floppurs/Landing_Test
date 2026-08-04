import { useParticles } from '../hooks/useParticles.js';

export default function ParticlesCanvas() {
  useParticles();
  return <canvas id="particles-canvas"></canvas>;
}