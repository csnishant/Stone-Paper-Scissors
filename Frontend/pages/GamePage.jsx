import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { GAME_API_ENDPOINT } from "../src/utils/constants";
import ChoiceCard from "../components/game/ChoiceCard";

const GamePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [round, setRound] = useState(1);
  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);
  const [roundsHistory, setRoundsHistory] = useState([]);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });

  // Game Logic
  const determineWinner = (c1, c2) => {
    if (c1 === c2) return "Tie";
    if (
      (c1 === "stone" && c2 === "scissors") ||
      (c1 === "scissors" && c2 === "paper") ||
      (c1 === "paper" && c2 === "stone")
    )
      return "Player 1";
    return "Player 2";
  };

  const handleNextRound = async () => {
    const winner = determineWinner(p1Choice, p2Choice);
    const newRoundData = {
      roundNumber: round,
      player1Choice: p1Choice,
      player2Choice: p2Choice,
      winner: winner,
    };

    const updatedHistory = [...roundsHistory, newRoundData];
    setRoundsHistory(updatedHistory);

    // Update Scores
    if (winner === "Player 1") setScores((s) => ({ ...s, p1: s.p1 + 1 }));
    if (winner === "Player 2") setScores((s) => ({ ...s, p2: s.p2 + 1 }));

    if (round < 6) {
      setRound(round + 1);
      setP1Choice(null);
      setP2Choice(null);
    } else {
      // 6 Rounds complete - Final Winner & Save to DB
      const finalWinner =
        scores.p1 > scores.p2
          ? state.player1
          : scores.p2 > scores.p1
            ? state.player2
            : "It's a Tie!";
      await saveGameToDB(updatedHistory, finalWinner);
    }
  };

  const saveGameToDB = async (history, finalWinner) => {
    try {
      await axios.post(`${GAME_API_ENDPOINT}/save-game`, {
        player1Name: state.player1,
        player2Name: state.player2,
        rounds: history,
        finalWinner: finalWinner,
      });
      alert(`Game Over! Winner: ${finalWinner}`);
      navigate("/history");
    } catch (err) {
      console.error("Error saving game:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="text-center">
            <p className="text-cyan-500 font-bold uppercase text-sm tracking-widest">
              Player 1
            </p>
            <h2 className="text-2xl font-black">{state?.player1}</h2>
            <p className="text-3xl font-mono mt-2">{scores.p1}</p>
          </div>
          <div className="text-center">
            <span className="bg-slate-800 px-4 py-2 rounded-full text-xs font-bold border border-slate-700">
              ROUND {round}/6
            </span>
          </div>
          <div className="text-center">
            <p className="text-pink-500 font-bold uppercase text-sm tracking-widest">
              Player 2
            </p>
            <h2 className="text-2xl font-black">{state?.player2}</h2>
            <p className="text-3xl font-mono mt-2">{scores.p2}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Player 1 Section */}
          <div className="space-y-6">
            <h3 className="text-center text-gray-400 font-medium">
              {state?.player1}'s Turn
            </h3>
            <div className="flex justify-center gap-4">
              {["stone", "paper", "scissors"].map((item) => (
                <ChoiceCard
                  key={item}
                  type={item}
                  selected={p1Choice === item}
                  onClick={setP1Choice}
                />
              ))}
            </div>
          </div>

          {/* Player 2 Section */}
          <div className="space-y-6">
            <h3 className="text-center text-gray-400 font-medium">
              {state?.player2}'s Turn
            </h3>
            <div className="flex justify-center gap-4">
              {["stone", "paper", "scissors"].map((item) => (
                <ChoiceCard
                  key={item}
                  type={item}
                  selected={p2Choice === item}
                  onClick={setP2Choice}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={handleNextRound}
            disabled={!p1Choice || !p2Choice}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 px-12 py-4 rounded-full font-black text-lg uppercase tracking-tighter hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all disabled:opacity-30 disabled:cursor-not-allowed">
            {round === 6 ? "Finish Game" : "Lock Choices"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
