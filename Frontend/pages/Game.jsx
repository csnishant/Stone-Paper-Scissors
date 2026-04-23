import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import GameButton from "../components/GameButton";
import { GAME_API_ENDPOINT } from "../src/utils/constants";

const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Home page se aaye hue names yahan milenge
  const { player1, player2 } = location.state || {
    player1: "P1",
    player2: "P2",
  };

  const [rounds, setRounds] = useState([]); // Rounds ka data store karne ke liye
  const [currentRound, setCurrentRound] = useState(1);
  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  const choices = ["stone", "paper", "scissors"];

  // Winner decide karne ka logic
  const getRoundWinner = (c1, c2) => {
    if (c1 === c2) return "Tie";
    if (
      (c1 === "stone" && c2 === "scissors") ||
      (c1 === "scissors" && c2 === "paper") ||
      (c1 === "paper" && c2 === "stone")
    )
      return player1;
    return player2;
  };

  const handleNextRound = () => {
    const winner = getRoundWinner(p1Choice, p2Choice);
    const roundData = {
      roundNumber: currentRound,
      player1Choice: p1Choice,
      player2Choice: p2Choice,
      winner: winner,
    };

    const updatedRounds = [...rounds, roundData];
    setRounds(updatedRounds);

    if (currentRound < 6) {
      setCurrentRound(currentRound + 1);
      setP1Choice(null);
      setP2Choice(null);
    } else {
      setGameFinished(true);
      saveGameToDB(updatedRounds);
    }
  };

  const saveGameToDB = async (finalRounds) => {
    // Final Winner Calculate karein (Example: Jisne zyada rounds jeete)
    const p1Wins = finalRounds.filter((r) => r.winner === player1).length;
    const p2Wins = finalRounds.filter((r) => r.winner === player2).length;
    const finalWinner =
      p1Wins > p2Wins ? player1 : p1Wins < p2Wins ? player2 : "Tie";

    const payload = {
      player1Name: player1,
      player2Name: player2,
      rounds: finalRounds,
      finalWinner: finalWinner,
    };

    try {
      await axios.post(`${GAME_API_ENDPOINT}/save-game`, payload);
      alert("Game Saved to Database!");
    } catch (err) {
      console.error("Error saving game:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Round {currentRound} / 6</h2>

      <div className="flex gap-20 mb-10">
        {/* Player 1 Section */}
        <div className="text-center">
          <p className="mb-4 text-cyan-400 font-bold">{player1}</p>
          <div className="flex flex-col gap-2">
            {choices.map((c) => (
              <button
                key={c}
                onClick={() => setP1Choice(c)}
                className={`p-2 border rounded ${p1Choice === c ? "bg-cyan-600" : "bg-slate-800"}`}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Player 2 Section */}
        <div className="text-center">
          <p className="mb-4 text-pink-400 font-bold">{player2}</p>
          <div className="flex flex-col gap-2">
            {choices.map((c) => (
              <button
                key={c}
                onClick={() => setP2Choice(c)}
                className={`p-2 border rounded ${p2Choice === c ? "bg-pink-600" : "bg-slate-800"}`}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {p1Choice && p2Choice && !gameFinished && (
        <GameButton onClick={handleNextRound}>
          {currentRound === 6 ? "Finish & Save" : "Next Round"}
        </GameButton>
      )}

      {gameFinished && (
        <GameButton onClick={() => navigate("/history")} variant="secondary">
          View History
        </GameButton>
      )}
    </div>
  );
};

export default GamePage;
