export default function TrackItem({ number, title, artist, src }) {
  return (
    <div className="track-item">
      <div className="track-number">{number}</div>
      <div className="track-info">
        <div className="track-title">{title}</div>
        <div className="track-artist">{artist}</div>
      </div>
      <audio controls preload="metadata">
        <source src={src} type="audio/mpeg" />
        Ваш браузер не поддерживает аудио элемент.
      </audio>
    </div>
  );
}