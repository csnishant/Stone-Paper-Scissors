import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Trophy, Swords, Zap } from "lucide-react";

// Assets
import stoneHand from "../src/assets/stoneHand.png";
import paperHand from "../src/assets/paperHand.png";
import scissorHand from "../src/assets/scissorHand.png";

const GamePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [round, setRound] = useState(1);
  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);
  const [isFighting, setIsFighting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [roundWinner, setRoundWinner] = useState(null); // 'P1', 'P2', or 'DRAW'
  const [scores, setScores] = useState({ p1: 0, p2: 0 });

  const weaponAssets = {
    stone: stoneHand,
    paper: paperHand,
    scissors: scissorHand,
  };

  useEffect(() => {
    if (p1Choice && p2Choice && !isFighting) {
      handleFight();
    }
  }, [p1Choice, p2Choice]);

  const handleFight = () => {
    setIsFighting(true);

    // Battle logic after animation delay
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
      setRoundWinner(result);

      if (result === "P1") setScores((prev) => ({ ...prev, p1: prev.p1 + 1 }));
      if (result === "P2") setScores((prev) => ({ ...prev, p2: prev.p2 + 1 }));

      setShowResult(true);
    }, 800);
  };

  const nextRound = () => {
    setShowResult(false);
    setIsFighting(false);
    setRoundWinner(null);
    if (round < 5) {
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
    <div className="h-screen bg-[#08090d] text-white flex flex-col overflow-hidden font-sans relative">
      {/* Background Glows */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 opacity-20 ${p1Choice ? "bg-cyan-500" : ""}`}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 opacity-20 ${p2Choice ? "bg-pink-500" : ""}`}
      />

      {/* --- P2 SIDE --- */}
      <div className="flex-1 flex flex-col items-center justify-start pt-12 relative">
        <div className="rotate-180 text-center z-10">
          <p className="text-pink-500 font-black tracking-widest text-sm uppercase opacity-60">
            Opponent
          </p>
          <h2 className="text-3xl font-black text-pink-500 mt-1">
            {state?.player2 || "PLAYER 2"}
          </h2>
          <div className="text-5xl font-mono text-pink-500/30 font-black">
            {scores.p2}
          </div>
        </div>

        <AnimatePresence>
          <motion.img
            key={p2Choice || "p2-idle"}
            initial={{ y: -100, opacity: 0, rotate: 180 }}
            animate={{
              y: isFighting ? 180 : 20,
              opacity: p2Choice ? 1 : 0.2,
              scale: isFighting ? 1.2 : 1,
              rotate: 180,
            }}
            transition={{ type: "spring", stiffness: 100 }}
            src={weaponAssets[p2Choice] || stoneHand}
            className="w-56 h-56 md:w-72 md:h-72 object-contain absolute top-40 drop-shadow-[0_0_40px_rgba(236,72,153,0.4)]"
          />
        </AnimatePresence>

        {/* P2 Selection HUD */}
        <div className="absolute top-10 right-6 flex flex-col gap-3 rotate-180">
          {Object.keys(weaponAssets).map((type) => (
            <button
              key={type}
              onClick={() => !isFighting && setP2Choice(type)}
              className={`p-3 rounded-2xl border-2 transition-all ${p2Choice === type ? "border-pink-500 bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]" : "border-white/5 bg-white/5 opacity-40 hover:opacity-100"}`}>
              <img src={weaponAssets[type]} className="w-8 h-8" alt={type} />
            </button>
          ))}
        </div>
      </div>

      {/* --- DIVIDER & ROUND INFO --- */}
      <div className="h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent flex items-center justify-center relative z-50">
        <motion.div
          animate={isFighting ? { scale: [1, 1.2, 1] } : {}}
          className="bg-white text-black font-black px-8 py-2 rounded-xl italic text-2xl shadow-2xl border-4 border-black">
          ROUND {round}
        </motion.div>
      </div>

      {/* --- P1 SIDE --- */}
      <div className="flex-1 flex flex-col items-center justify-end pb-12 relative">
        <motion.img
          key={p1Choice || "p1-idle"}
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: isFighting ? -180 : -20,
            opacity: p1Choice ? 1 : 0.2,
            scale: isFighting ? 1.2 : 1,
          }}
          transition={{ type: "spring", stiffness: 100 }}
          src={weaponAssets[p1Choice] || stoneHand}
          className="w-56 h-56 md:w-72 md:h-72 object-contain absolute bottom-40 drop-shadow-[0_0_40px_rgba(34,211,238,0.4)]"
        />

        {/* P1 Selection HUD */}
        <div className="absolute bottom-10 left-6 flex flex-col gap-3">
          {Object.keys(weaponAssets).map((type) => (
            <button
              key={type}
              onClick={() => !isFighting && setP1Choice(type)}
              className={`p-3 rounded-2xl border-2 transition-all ${p1Choice === type ? "border-cyan-400 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]" : "border-white/5 bg-white/5 opacity-40 hover:opacity-100"}`}>
              <img src={weaponAssets[type]} className="w-8 h-8" alt={type} />
            </button>
          ))}
        </div>

        <div className="text-center z-10">
          <div className="text-5xl font-mono text-cyan-400/30 font-black">
            {scores.p1}
          </div>
          <h2 className="text-3xl font-black text-cyan-400 mt-1">
            {state?.player1 || "YOU"}
          </h2>
          <p className="text-cyan-400 font-black tracking-widest text-sm uppercase opacity-60">
            Challenger
          </p>
        </div>
      </div>

      {/* --- WINNER OVERLAY (MODAL) --- */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6">
            {/* Winner's Weapon Show-off */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="relative mb-8">
              <div
                className={`absolute inset-0 blur-[100px] rounded-full ${roundWinner === "P1" ? "bg-cyan-500/50" : roundWinner === "P2" ? "bg-pink-500/50" : "bg-yellow-500/30"}`}
              />
              <img
                src={
                  roundWinner === "P2"
                    ? weaponAssets[p2Choice]
                    : weaponAssets[p1Choice]
                }
                className={`w-64 h-64 object-contain relative z-10 ${roundWinner === "P2" ? "rotate-180" : ""}`}
                alt="Winner Weapon"
              />
              {roundWinner === "DRAW" && (
                <img
                  src={weaponAssets[p2Choice]}
                  className="w-48 h-48 object-contain absolute top-0 left-20 opacity-50 rotate-180"
                />
              )}
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center">
              <h3 className="text-2xl font-bold text-white/50 uppercase tracking-[0.3em] mb-2">
                Winner
              </h3>
              <h1
                className={`text-7xl font-black italic mb-8 tracking-tighter ${roundWinner === "P1" ? "text-cyan-400" : roundWinner === "P2" ? "text-pink-500" : "text-yellow-400"}`}>
                {roundWinner === "P1"
                  ? state?.player1 || "PLAYER 1"
                  : roundWinner === "P2"
                    ? state?.player2 || "PLAYER 2"
                    : "IT'S A DRAW!"}
              </h1>

              <button
                onClick={nextRound}
                className="group relative bg-white text-black px-16 py-5 rounded-2xl font-black text-2xl transition-all hover:scale-105 active:scale-95 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  {round < 5 ? "NEXT ROUND" : "SEE FINAL RESULT"}{" "}
                  <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Particles/Flash effect */}
      {isFighting && !showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          className="absolute inset-0 bg-white z-[60] pointer-events-none"
        />
      )}
    </div>
  );
};

export default GamePage;
