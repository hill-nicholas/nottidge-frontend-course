import React, { useState, useEffect } from "react";

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

    if (
      input === String(expression[0] + expression[1]) &&
      round <= 3
    ) {
      if (round === 3) {
        setTotalTime(Date.now() - startTime);
      }
      setRound((prevRound) => prevRound + 1);
      setUserAnswer("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-2xl">
      {round <= 3 ? (

        <div className="flex items-center gap-2">
          <p className="text-center">
            {expression[0]} + {expression[1]} = 
          </p>

          <input
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-[50px] h-[50px] text-center"
          />
        </div>

      ) : (
        <div className="flex items-center gap-2">
          <h1 className="font-bold">Game Over</h1>
          <p>Total Time: {totalTime} ms</p>
        </ div>
      )}
    </div>
  );
};

export default Game;
