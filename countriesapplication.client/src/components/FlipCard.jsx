import './FlipCard.css'

function FlipCard({ isFlipped, front, back, onClick }) {
  return (
    <div className="flip-card" onClick={onClick}>
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
    </div>
  );
}

export default FlipCard;