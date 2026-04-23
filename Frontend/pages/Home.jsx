import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import GameButton from "../components/GameButton";

const Home = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (!player1 || !player2) {
      alert("Please enter both player names");
      return;
    }
    navigate("/game", { state: { player1, player2 } });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-black text-center mb-8 text-white tracking-tight">
          STONE <span className="text-cyan-500">PAPER</span> SCISSORS
        </h1>

        <div className="flex flex-col gap-6">
          <InputField
            label="Player 1"
            placeholder="Enter Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />

          <InputField
            label="Player 2"
            placeholder="Enter Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />

          <div className="grid grid-cols-1 gap-3 mt-4">
            <GameButton onClick={handleStartGame}>Start New Game</GameButton>

            <GameButton
              onClick={() => navigate("/history")}
              variant="secondary">
              View Game History
            </GameButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
