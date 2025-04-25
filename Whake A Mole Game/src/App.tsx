import './App.css';
import React, { useState, useEffect } from 'react';

const Grid_Size = 5;
document.body.style.backgroundColor = "#808080";
const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [intervalTime, setIntervalTime] = useState(2000);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsGameRunning(true);
  };

  const endGame = () => {
    setIsGameRunning(false);
    setActiveCell(null);
    alert(`Time's up! Your score: ${score}`);
  };

  const handleCellClick = (index: number) => {
    if (index === activeCell) {
      setScore((prev) => prev + 1);
      setActiveCell(null);
    }
  };

  useEffect(() => {
    if (!isGameRunning) return;
    
    const moleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * Grid_Size * Grid_Size);
      setActiveCell(randomIndex);
    }, intervalTime);

    return () => clearInterval(moleInterval);
  }, [isGameRunning, intervalTime]);

  useEffect(() => {
    if (!isGameRunning || timeLeft <= 0) {
      if (timeLeft === 0) endGame();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameRunning, timeLeft]);

  return (
    <div className="App">
      <h1>Whack-a-Mole</h1>
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}s</p>
      <div className="controls">
        {!isGameRunning && (
          <button onClick={startGame}>Start Game</button>
        )}
        <button onClick={() => setIntervalTime(2000)}>Easy</button>
        <button onClick={() => setIntervalTime(1000)}>Medium</button>
        <button onClick={() => setIntervalTime(500)}>Hard</button>
      </div>
      <div className="grid">
        {Array.from({ length: Grid_Size * Grid_Size }).map((_, index) => (
          <div
            key={index}
            className={`cell ${activeCell === index ? 'active' : ''}`}
            onClick={() => handleCellClick(index)}
          ></div>
        ))}
      </div>
      {!isGameRunning && (
        <button className="restart" onClick={startGame}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default App;
