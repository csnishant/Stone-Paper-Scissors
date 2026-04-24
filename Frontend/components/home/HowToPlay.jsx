import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Trophy, Hand, Zap, Star } from "lucide-react";

// Image Assets Import (Inhe apne path ke hisaab se adjust karein)
import RockWinImg from "../../src/assets/stone.png";
import PaperWinImg from "../../src/assets/paper.png";
import ScissorsWinImg from "../../src/assets/scissor.png";

const HowToPlay = () => {
  const navigate = useNavigate();

  const rules = [
    {
      title: "Rock Smashes Scissors",
      image: RockWinImg,
      winner: "Stone",
      beats: "Scissors",
      color: "border-blue-500 shadow-blue-500/20",
    },
    {
      title: "Scissors Cuts Paper",
      image: ScissorsWinImg,
      winner: "Scissors",
      beats: "Paper",
      color: "border-pink-500 shadow-pink-500/20",
    },
    {
      title: "Paper Covers Rock",
      image: PaperWinImg,
      winner: "Paper",
      beats: "Stone",
      color: "border-yellow-500 shadow-yellow-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1625] text-white p-6 font-sans">
      <motion.button
        whileHover={{ x: -5 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8">
        <ChevronLeft /> Back to Game
      </motion.button>

      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-5xl font-black italic tracking-tighter">
            GAME <span className="text-yellow-400">RULES</span>
          </h1>
        </header>

        {/* Win/Lose Rules Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              className={`bg-[#2a2438] rounded-[32px] overflow-hidden border-2 ${rule.color} shadow-xl`}>
              <img
                src={rule.image}
                alt={rule.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-black text-white uppercase italic">
                  <span className="text-yellow-400">{rule.winner}</span> Beats{" "}
                  {rule.beats}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Draw Rule Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-800 to-slate-900 p-8 rounded-[40px] border-2 border-white/10 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 text-4xl">
              <span>✊</span> <span>vs</span> <span>✊</span>
            </div>
            <h2 className="text-3xl font-black italic">
              IT'S A <span className="text-cyan-400">DRAW!</span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Agar dono players ne same sign dikhaya (e.g., Rock vs Rock), toh
              match tie ho jata hai. Aise mein round ko **Rematch** karein!
            </p>
          </div>
        </motion.section>

        {/* Footer CTA */}
        <div className="flex justify-center pb-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-black font-black text-2xl px-12 py-5 rounded-full shadow-[0_6px_0_#b45309] active:translate-y-1 active:shadow-none transition-all flex items-center gap-3">
            <Trophy size={28} /> READY TO BATTLE?
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
