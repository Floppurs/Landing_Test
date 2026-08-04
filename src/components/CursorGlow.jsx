import { useCursorGlow } from '../hooks/useCursorGlow.js';

export default function CursorGlow() {
  useCursorGlow();
  return <div id="cursor-glow"></div>;
}