import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gamepad2,
  History as HistoryIcon,
  UserCircle2,
  Rocket,
  Star,
  Trophy,
  Zap,
  BookOpen,
} from "lucide-react";

const Home = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (!player1 || !player2) return alert("Hey! Don't forget your names! 😊");
    navigate("/game", { state: { player1, player2 } });
  };

  return (
    <div className="min-h-screen bg-[#2d1b4e] flex items-center justify-center p-4 font-sans overflow-hidden relative">
      {/* --- Floating Background Stickers --- */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 left-10 text-yellow-400 opacity-20 hidden md:block">
        <Star size={120} fill="currentColor" strokeWidth={0} />
      </motion.div>

      <motion.div
        animate={{ x: [0, 30, 0], rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 text-pink-500 opacity-20">
        <Zap size={100} fill="currentColor" strokeWidth={0} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-10 left-20 text-cyan-400 opacity-20">
        <Rocket size={130} fill="currentColor" strokeWidth={0} />
      </motion.div>

      {/* --- Main Game Card --- */}
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white border-[6px] border-black rounded-[50px] shadow-[12px_12px_0_#000] p-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 relative">
          <motion.div
            whileHover={{ scale: 1.2, rotate: -10 }}
            className="inline-block bg-yellow-400 border-4 border-black p-5 rounded-3xl mb-4 shadow-[6px_6px_0_#000]">
            <Gamepad2 size={50} className="text-black" strokeWidth={3} />
          </motion.div>

          <h1 className="flex flex-col items-center gap-1">
            {/* First Line: STONE vs PAPER */}
            <span className="text-5xl md:text-6xl font-[1000] italic tracking-tighter leading-none flex items-center gap-2">
              <span className="text-cyan-500 drop-shadow-[4px_4px_0_#000] uppercase">
                Stone
              </span>
             
              <span className="text-yellow-400 drop-shadow-[4px_4px_0_#000] uppercase">
                Paper
              </span>
            </span>

            {/* Second Line: SCISSORS with an explosion effect */}
            <div className="relative mt-2">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="block text-6xl md:text-7xl font-[1000] text-pink-500 italic tracking-tighter leading-none drop-shadow-[5px_5px_0_#000] uppercase">
                SCISSORS!
              </motion.span>

              {/* Small decorative "BAM" lines */}
              <div className="absolute -top-2 -right-4 bg-black text-white text-[10px] px-2 py-0.5 rounded-md font-black uppercase rotate-12">
                Fight!
              </div>
            </div>
          </h1>
          <div className="mt-2 inline-block bg-cyan-400 text-black px-4 py-1 rounded-full border-2 border-black font-black text-xs uppercase italic">
            Epic Battle Arena
          </div>
        </div>

        {/* Player Name Inputs */}
        <div className="space-y-5">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border-2 border-black p-1.5 rounded-lg z-10">
              <UserCircle2
                className="text-pink-500"
                size={20}
                strokeWidth={3}
              />
            </div>
            <input
              className="w-full bg-slate-100 text-black rounded-[20px] pl-14 pr-4 py-5 outline-none border-[3px] border-black focus:bg-cyan-50 transition-all font-black placeholder:text-slate-400 shadow-[4px_4px_0_#000] focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
              placeholder="Hero 1 Name..."
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border-2 border-black p-1.5 rounded-lg z-10">
              <UserCircle2
                className="text-cyan-500"
                size={20}
                strokeWidth={3}
              />
            </div>
            <input
              className="w-full bg-slate-100 text-black rounded-[20px] pl-14 pr-4 py-5 outline-none border-[3px] border-black focus:bg-pink-50 transition-all font-black placeholder:text-slate-400 shadow-[4px_4px_0_#000] focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
              placeholder="Hero 2 Name..."
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
          </div>

          {/* Action Area */}
          <div className="flex flex-col gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartGame}
              className="bg-green-400 text-black font-[1000] text-2xl py-6 rounded-3xl border-4 border-black shadow-[8px_8px_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-3 group">
              <Trophy
                className="group-hover:rotate-12 transition-transform"
                strokeWidth={3}
              />
              LET'S FIGHT!
            </motion.button>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/history")}
                className="bg-yellow-400 text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2 border-[3px] border-black shadow-[4px_4px_0_#000] active:shadow-none active:translate-y-1 transition-all">
                <HistoryIcon size={20} strokeWidth={3} /> LOGS
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/rules")}
                className="bg-white text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2 border-[3px] border-black shadow-[4px_4px_0_#000] active:shadow-none active:translate-y-1 transition-all">
                <BookOpen size={20} strokeWidth={3} /> RULES
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Small Credits Sticker */}
      <div className="absolute bottom-4 text-white/30 font-black text-[10px] uppercase tracking-widest">
        v2.0 • Ready to Rumble
      </div>
    </div>
  );
};

export default Home;
