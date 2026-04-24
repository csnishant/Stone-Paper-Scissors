import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  History,
  HelpCircle,
  X,
  UserCircle2,
  Rocket,
  Star,
  Trophy,
} from "lucide-react";
import HowToPlay from "../components/home/HowToPlay";

const Home = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const navigate = useNavigate();

  const handleStartGame = () => {
    if (!player1 || !player2) return alert("Hey! Don't forget your names! 😊");
    navigate("/game", { state: { player1, player2 } });
  };

  return (
    <div className="min-h-screen bg-[#1a1625] flex items-center justify-center p-4 font-sans overflow-hidden relative">
      {/* --- Animated Background Shapes --- */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 left-10 text-pink-500 opacity-20">
        <Star size={100} fill="currentColor" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-10 right-10 text-cyan-500 opacity-20">
        <Rocket size={120} fill="currentColor" />
      </motion.div>

      {/* --- Main Card --- */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-[#2a2438] border-b-8 border-black/30 p-8 rounded-[40px] shadow-[0_20px_0_rgba(0,0,0,0.2)] relative z-10">
        {/* Header with Character Glow */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-400 blur-[60px] opacity-30" />
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-block bg-gradient-to-b from-yellow-400 to-orange-500 p-4 rounded-3xl mb-4 shadow-lg shadow-orange-500/20">
            <Gamepad2 size={48} className="text-white" strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-4xl font-black text-white italic tracking-tight drop-shadow-md">
            SUPER <span className="text-yellow-400">CLASH</span>
          </h1>
        </div>

        {/* Player Inputs */}
        <div className="space-y-4">
          <div className="relative group">
            <UserCircle2
              className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 group-focus-within:text-yellow-400 transition-colors"
              size={24}
            />
            <input
              className="w-full bg-[#352f44] text-white rounded-2xl pl-12 pr-4 py-4 outline-none border-2 border-transparent focus:border-yellow-400 transition-all font-bold placeholder:text-slate-500"
              placeholder="Player 1 Name"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
          </div>

          <div className="relative group">
            <UserCircle2
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 group-focus-within:text-yellow-400 transition-colors"
              size={24}
            />
            <input
              className="w-full bg-[#352f44] text-white rounded-2xl pl-12 pr-4 py-4 outline-none border-2 border-transparent focus:border-yellow-400 transition-all font-bold placeholder:text-slate-500"
              placeholder="Player 2 Name"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartGame}
              className="bg-gradient-to-r from-green-400 to-emerald-600 text-white font-black text-xl py-5 rounded-2xl shadow-[0_6px_0_#059669] active:shadow-none active:translate-y-1 flex items-center justify-center gap-3">
              <Trophy fill="white" /> PLAY NOW!
            </motion.button>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/history")}
                className="bg-[#413b52] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border-b-4 border-black/20">
                <History size={18} className="text-purple-400" /> Logs
              </motion.button>
              <button onClick={() => navigate("/rules")} className="btn-style">
                How To Play
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- How To Play Modal --- */}
    </div>
  );
};

export default Home;
