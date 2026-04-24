import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Swords,
  Trophy,
  Sparkles,
  ChevronLeft,
  ScrollText,
  Zap,
} from "lucide-react";

import GameRow from "../components/history/GameRow";
import { GAME_API_ENDPOINT } from "../src/utils/constants";

const History = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${GAME_API_ENDPOINT}/history`);
        setGames(response.data);
      } catch (err) {
        console.error("Error fetching battle logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1135] text-white p-4 md:p-10 relative overflow-x-hidden">
      {/* Dynamic Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-pink-600/20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation & Title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
              <div className="bg-gradient-to-b from-yellow-300 to-orange-500 p-3 rounded-2xl shadow-[0_5px_0_#9a3412] rotate-[-5deg]">
                <ScrollText className="text-white" size={32} strokeWidth={3} />
              </div>
              <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase drop-shadow-[0_5px_0_#000]">
                CLASH <span className="text-yellow-400">LOGS</span>
              </h1>
            </div>
            <div className="bg-black/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2 border border-white/10">
              <Zap size={14} className="text-cyan-400 fill-cyan-400" />
              <p className="text-cyan-400 font-black text-xs uppercase tracking-[0.2em]">
                Stone • Paper • Scissors World
              </p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="group bg-pink-500 text-white px-10 py-4 rounded-[2rem] font-black uppercase text-xl shadow-[0_8px_0_#9d174d] border-4 border-white/20 hover:bg-pink-400 transition-all active:translate-y-2 active:shadow-none">
            <div className="flex items-center gap-2">
              <ChevronLeft strokeWidth={4} /> BACK TO ARENA
            </div>
          </motion.button>
        </div>

        {/* Legend / Info Bar */}
        <div className="bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-3xl p-4 mb-8 flex justify-around items-center text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
            Player 1
          </div>
          <Swords size={16} className="text-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]" />
            Player 2
          </div>
          <Swords size={16} className="text-white/20" />
          <div className="flex items-center gap-2 text-yellow-400">
            <Trophy size={16} />
            Grand Winner
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ repeat: Infinity, duration: 2 }}>
              <Zap
                size={80}
                className="text-yellow-400 fill-yellow-400 filter drop-shadow-[0_0_20px_#facc15]"
              />
            </motion.div>
            <h2 className="text-3xl font-black italic tracking-widest animate-pulse text-cyan-400">
              OPENING SCROLLS...
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 pb-20">
            {games.length > 0 ? (
              games.map((game, index) => (
                <GameRow key={game._id} game={game} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/5 border-4 border-dashed border-white/10 p-24 rounded-[50px] text-center">
                <div className="relative inline-block mb-6">
                  <Swords size={100} className="text-white/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">❓</span>
                  </div>
                </div>
                <h2 className="text-4xl font-black italic text-white/40 uppercase">
                  No Battles Found!
                </h2>
                <p className="text-gray-500 font-bold mt-4 uppercase tracking-tighter">
                  The Arena is waiting for its first hero. Is it you?
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
