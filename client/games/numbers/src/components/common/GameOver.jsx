import "./GameOver.css";
import { speak } from "../../utils/speak";
import { useEffect } from "react";

export default function GameOver({ onRestart, onExit }) {
  useEffect(() => {
    window.speechSynthesis.cancel();
    speak("Oops! No more lives left. Let's try again!");
  }, []);

  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <div className="broken-heart-container">
          <svg className="broken-heart" viewBox="0 0 100 100">
            <path fill="#FF5252" d="M50,30 q0,-20 -20,-20 a20,20 0 0,0 -20,20 q0,30 40,50 q0,-20 10,-20 q-10,-10 -10,-10" />
            <path fill="#FF5252" d="M50,30 q0,-20 20,-20 a20,20 0 0,1 20,20 q0,30 -40,50 q0,-20 -10,-20 q10,-10 10,-10" />
            <path fill="none" stroke="#FFF" strokeWidth="2" d="M50,30 l-10,10 l20,10 l-20,10 l20,10" />
          </svg>
        </div>
        
        <h2 className="game-over-title">Game Over</h2>
        <p className="game-over-text">Keep practicing, you're doing great!</p>
        
        <div className="game-over-actions">
          <button className="restart-btn" onClick={onRestart}>
            Try Again 🔄
          </button>
          <button className="exit-btn" onClick={onExit}>
            Go Back 🏠
          </button>
        </div>
      </div>
    </div>
  );
}
