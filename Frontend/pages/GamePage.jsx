import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { RefreshCw, Trophy, Swords } from "lucide-react";

// Assets
import stoneHand from "../src/assets/stoneHand.png";
import paperHand from "../src/assets/paperHand.png";
import scissorHand from "../src/assets/scissorHand.png";

import { GAME_API_ENDPOINT } from "../src/utils/constants";

const GamePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [round, setRound] = useState(1);
  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);
  const [isFighting, setIsFighting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [scores, setScores] = useState({ p1: 0, p2: 0 });

  const weaponAssets = {
    stone: stoneHand,
    paper: paperHand,
    scissors: scissorHand,
  };

  // Auto-trigger fight when both select
  useEffect(() => {
    if (p1Choice && p2Choice && !isFighting) {
      handleFight();
    }
  }, [p1Choice, p2Choice]);

  const handleFight = () => {
    setIsFighting(true);

    setTimeout(() => {
      const determineWinner = (c1, c2) => {
        if (c1 === c2) return "DRAW";
        if (
          (c1 === "stone" && c2 === "scissors") ||
          (c1 === "scissors" && c2 === "paper") ||
          (c1 === "paper" && c2 === "stone")
        )
          return "P1";
        return "P2";
      };

      const result = determineWinner(p1Choice, p2Choice);
      if (result === "P1") {
        setScores((prev) => ({ ...prev, p1: prev.p1 + 1 }));
        setWinnerName(state?.player1 || "PLAYER 1");
      } else if (result === "P2") {
        setScores((prev) => ({ ...prev, p2: prev.p2 + 1 }));
        setWinnerName(state?.player2 || "PLAYER 2");
      } else {
        setWinnerName("DRAW!");
      }
      setShowResult(true);
    }, 600);
  };

  const nextRound = () => {
    setShowResult(false);
    setIsFighting(false);
    if (round < 6) {
      setRound(round + 1);
      setP1Choice(null);
      setP2Choice(null);
    } else {
      navigate("/history", {
        state: {
          winner: scores.p1 > scores.p2 ? state.player1 : state.player2,
        },
      });
    }
  };

  return (
    <div className="h-screen bg-[#0d0f16] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* --- OPPONENT SIDE (NORTH) --- */}
      <div
        className={`flex-1 relative flex flex-col items-center justify-start pt-6 transition-all duration-500 ${p2Choice ? "bg-pink-500/10" : ""}`}>
        <div className="rotate-180 flex flex-col items-center z-10">
          <h2 className="text-2xl font-black text-pink-500">
            {state?.player2 || "Player 2"}
          </h2>
          <span className="text-4xl font-mono text-pink-500/50">
            {scores.p2}
          </span>
        </div>

        <motion.img
          key={p2Choice || "waiting2"}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: isFighting ? 160 : 0,
            opacity: p2Choice ? 1 : 0.3,
            scale: isFighting ? 1.4 : 1,
            rotate: 180,
          }}
          src={weaponAssets[p2Choice] || stoneHand}
          className="w-64 h-64 md:w-80 md:h-80 object-contain absolute top-32 drop-shadow-[0_20px_50px_rgba(236,72,153,0.3)]"
        />

        {/* P2 SELECTION */}
        <div className="absolute top-4 right-4 flex flex-col gap-4 rotate-180">
          {Object.keys(weaponAssets).map((type) => (
            <button
              key={type}
              onClick={() => !isFighting && setP2Choice(type)}
              className={`p-4 rounded-3xl border-4 transition-all ${p2Choice === type ? "border-pink-500 bg-pink-500" : "border-white/10 bg-white/5"}`}>
              <img
                src={weaponAssets[type]}
                className="w-12 h-12 object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {/* --- BATTLE DIVIDER --- */}
      <div className="h-1 bg-white/10 flex items-center justify-center relative z-50">
        <div className="absolute bg-white text-black font-black px-10 py-2 rounded-full text-xl shadow-2xl">
          RD {round}
        </div>
      </div>

      {/* --- YOUR SIDE (SOUTH) --- */}
      <div
        className={`flex-1 relative flex flex-col items-center justify-end pb-6 transition-all duration-500 ${p1Choice ? "bg-cyan-500/10" : ""}`}>
        <motion.img
          key={p1Choice || "waiting1"}
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: isFighting ? -160 : 0,
            opacity: p1Choice ? 1 : 0.3,
            scale: isFighting ? 1.4 : 1,
          }}
          src={weaponAssets[p1Choice] || stoneHand}
          className="w-64 h-64 md:w-80 md:h-80 object-contain absolute bottom-32 drop-shadow-[0_-20px_50px_rgba(34,211,238,0.3)]"
        />

        {/* P1 SELECTION */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-4">
          {Object.keys(weaponAssets).map((type) => (
            <button
              key={type}
              onClick={() => !isFighting && setP1Choice(type)}
              className={`p-4 rounded-3xl border-4 transition-all ${p1Choice === type ? "border-cyan-400 bg-cyan-400" : "border-white/10 bg-white/5"}`}>
              <img
                src={weaponAssets[type]}
                className="w-12 h-12 object-contain"
              />
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center z-10">
          <span className="text-4xl font-mono text-cyan-400/50">
            {scores.p1}
          </span>
          <h2 className="text-2xl font-black text-cyan-400">
            {state?.player1 || "You"}
          </h2>
        </div>
      </div>

      {/* --- RESULT OVERLAY --- */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-[100] bg-[#0d0f16]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8">
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-center">
              <Trophy className="mx-auto text-yellow-400 mb-4" size={80} />
              <h1 className="text-6xl font-black text-white italic mb-2 tracking-tighter">
                {winnerName}
              </h1>
              <p className="text-white/40 font-bold tracking-widest uppercase mb-12">
                Round {round} Completed
              </p>

              <button
                onClick={nextRound}
                className="bg-yellow-400 text-black px-20 py-6 rounded-full font-black text-3xl shadow-[0_10px_0_#b45309] active:translate-y-2 active:shadow-none transition-all flex items-center gap-4">
                CONTINUE <RefreshCw size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePage;
