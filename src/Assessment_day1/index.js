import React, { useState, useEffect } from "react";
import "./style.css";

const GameLogic = {
  generateRandomDigits: () => [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ],
};

const Game = () => {
  const [round, setRound] = useState(1);
  const [expression, setExpression] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(null);

  useEffect(() => {
    if (round === 1) {
      setStartTime(Date.now());
    }
    setExpression(GameLogic.generateRandomDigits());
  }, [round]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserAnswer(input);

    if (input === String(expression[0] + expression[1]) && round <= 3) {
      if (round === 3) {
        setTotalTime(Date.now() - startTime);
      }
      setRound((prevRound) => prevRound + 1);
      setUserAnswer("");
    }
  };

  return (
    <div className="game-container">
      {round <= 3 ? (
        <div className="expression-container">
          <p className="expression">
            {expression[0]} + {expression[1]} =
          </p>
          <input
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
            className="input-box"
          />
        </div>
      ) : (
        <div className="game-over-container">
          <h1 className="game-over-title">Game Over</h1>
          <p>Total Time: {totalTime} ms</p>
        </div>
      )}
    </div>
  );
};

export default Game;