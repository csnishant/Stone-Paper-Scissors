import React from "react";
import { motion } from "framer-motion";
import { Trophy, Swords, Zap, Star, Sparkles } from "lucide-react";

const GameRow = ({ game, index }) => {
  const date = new Date(game.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  const isDraw = game.finalWinner === "Draw";

  // Child-friendly winner display
  const winMessage = isDraw ? "Same Power!" : `${game.finalWinner} Won!`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        bounce: 0.6, // Bouncy effect for kids
      }}
      whileHover={{ scale: 1.02, rotate: 1 }}
      className="relative mb-6">
      {/* Date Sticker (Floating on top) */}
      <div className="absolute -top-3 -left-2 z-20 bg-yellow-400 border-4 border-black px-4 py-1 rounded-full shadow-[4px_4px_0_#000] rotate-[-5deg]">
        <span className="font-black text-black text-xs italic flex items-center gap-1 uppercase">
          <Zap size={12} fill="black" /> {date}
        </span>
      </div>

      {/* Main Cartoon Card */}
      <div className="bg-white border-[6px] border-black rounded-[40px] shadow-[10px_10px_0_#1a1625] overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left Player (Hero) */}
          <div className="flex-1 p-6 bg-cyan-100 flex flex-col items-center justify-center border-b-[6px] md:border-b-0 md:border-r-[6px] border-black relative overflow-hidden group">
            <div className="absolute top-0 left-0 opacity-10 group-hover:rotate-12 transition-transform">
              <Sparkles size={100} className="text-cyan-600" />
            </div>
            <p className="text-[10px] font-black text-cyan-600 uppercase tracking-[.2em] mb-1">
              Player 1
            </p>
            <h3 className="text-2xl font-black text-cyan-700 uppercase italic tracking-tighter truncate w-full text-center">
              {game.player1Name}
            </h3>
          </div>

          {/* --- VS Center Section (Big & Bold Cartoon Style) --- */}
          <div className="relative flex items-center justify-center h-20 md:h-auto md:w-24 bg-white">
            {/* Horizontal Line for Desktop Backdrop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-2 bg-black hidden md:block"></div>
            </div>

            {/* Big VS Container */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="relative z-10">
              {/* Background Outline Layer (for that extra pop) */}
              <div className="absolute inset-0 bg-black rounded-xl translate-x-1 translate-y-1"></div>

              {/* Main Yellow Box */}
              <div className="relative bg-yellow-400 border-[4px] border-black px-4 py-2 rounded-xl flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-[1000] text-black italic tracking-tighter leading-none select-none">
                  VS
                </span>
              </div>

              {/* Small Decorative "Action" Sparks */}
              <div className="absolute -top-3 -right-3">
                <Zap
                  size={24}
                  className="text-pink-500 fill-pink-500 rotate-12"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Player (Rival) */}
          <div className="flex-1 p-6 bg-pink-100 flex flex-col items-center justify-center border-t-[6px] md:border-t-0 md:border-l-[6px] border-black relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:-rotate-12 transition-transform">
              <Star size={100} className="text-pink-600 fill-pink-600" />
            </div>
            <p className="text-[10px] font-black text-pink-600 uppercase tracking-[.2em] mb-1">
              Player 2
            </p>
            <h3 className="text-2xl font-black text-pink-700 uppercase italic tracking-tighter truncate w-full text-center">
              {game.player2Name}
            </h3>
          </div>

          {/* Winner Section (The Prize) */}
          <div
            className={`
            p-6 flex flex-col items-center justify-center min-w-[220px] 
            ${isDraw ? "bg-slate-200" : "bg-yellow-300"} 
            border-t-[6px] md:border-t-0 md:border-l-[6px] border-black
          `}>
            <div className="mb-2">
              {isDraw ? (
                <div className="flex gap-1">
                  <span className="text-2xl">🤝</span>
                </div>
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Trophy
                    size={32}
                    className="text-orange-600 fill-orange-400"
                    strokeWidth={3}
                  />
                </motion.div>
              )}
            </div>

            <div className="bg-black text-white px-4 py-2 rounded-2xl rotate-[2deg] shadow-[4px_4px_0_#4ade80]">
              <p className="text-sm font-black italic uppercase whitespace-nowrap">
                {winMessage}
              </p>
            </div>

            <p className="mt-3 text-[10px] font-black text-black/40 uppercase">
              {game.rounds?.length || 0} Epic Rounds
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameRow;
