import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Trophy, Star, Sparkles, Smile, RefreshCw, Zap } from "lucide-react";

// Image Assets
import RockImg from "../../src/assets/stone.png";
import PaperImg from "../../src/assets/paper.png";
import ScissorsImg from "../../src/assets/scissor.png";

const HowToPlay = () => {
  const navigate = useNavigate();

  const rules = [
    {
      title: "Strong Rock!",
      image: RockImg,
      winner: "ROCK",
      action: "SMASHES",
      beats: "SCISSORS",
      color: "bg-blue-500",
      border: "border-blue-400",
      shadow: "shadow-blue-900/50",
    },
    {
      title: "Smart Scissors!",
      image: ScissorsImg,
      winner: "SCISSORS",
      action: "CUTS",
      beats: "PAPER",
      color: "bg-pink-500",
      border: "border-pink-400",
      shadow: "shadow-pink-900/50",
    },
    {
      title: "Super Paper!",
      image: PaperImg,
      winner: "PAPER",
      action: "COVERS",
      beats: "ROCK",
      color: "bg-yellow-400",
      border: "border-yellow-300",
      shadow: "shadow-yellow-900/50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2d1b4e] text-white p-6 font-sans overflow-x-hidden">
      {/* Floating Background Shapes for Fun */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500 rounded-full blur-2xl" />
      </div>

      <motion.button
        whileHover={{ x: -5, scale: 1.1 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-2xl text-white font-black mb-8 border-b-4 border-black/30 active:translate-y-1 active:border-b-0 transition-all">
        <ChevronLeft /> GO BACK
      </motion.button>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <header className="text-center">
          <motion.div
            initial={{ y: -50, rotate: -2 }}
            animate={{ y: 0, rotate: 0 }}
            className="inline-block">
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter drop-shadow-[0_8px_0_#1a0f2e]">
              HOW TO <span className="text-yellow-400">PLAY!</span>
            </h1>
            <div className="flex justify-center gap-2 mt-2">
              <Star className="text-yellow-400 fill-yellow-400" />
              <Star className="text-yellow-400 fill-yellow-400" />
              <Star className="text-yellow-400 fill-yellow-400" />
            </div>
          </motion.div>
        </header>

        {/* Win/Lose Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 0.5,
                rotate: index % 2 === 0 ? -5 : 5,
              }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              className={`${rule.color} rounded-[40px] p-2 border-b-[12px] border-black/20 shadow-2xl flex flex-col`}>
              <div
                className={`bg-white rounded-[35px] overflow-hidden border-4 ${rule.border} h-full flex flex-col`}>
                {/* --- Full Size Image Section --- */}
                <div className="w-full bg-slate-100 relative overflow-hidden">
                  <img
                    src={rule.image}
                    alt={rule.title}
                    // w-full aur object-cover se image poora area fill karegi
                    className="w-full h-full min-h-[200px] object-cover display-block"
                  />
                  {/* Optional: Ek halka sa overlay taaki text aur image alag dikhein */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </div>

                {/* --- Text Section --- */}
                <div className="p-6 text-center mt-auto">
                  <h3 className="text-2xl font-black text-slate-800 uppercase leading-tight">
                    <span
                      className={
                        rule.winner === "PAPER"
                          ? "text-orange-500"
                          : rule.winner === "ROCK"
                            ? "text-blue-600"
                            : "text-pink-600"
                      }>
                      {rule.winner}
                    </span>
                    <br />
                    <span className="text-slate-400 text-lg">
                      {rule.action}
                    </span>
                    <br />
                    <span className="text-slate-900">{rule.beats}!</span>
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tie Rule Card */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-400 to-cyan-500 p-8 md:p-12 rounded-[50px] border-b-[12px] border-cyan-700 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Background Icons */}
          <div className="absolute -left-4 -top-4 opacity-10 rotate-12">
            <RefreshCw size={120} strokeWidth={3} />
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 -rotate-12">
            <Smile size={120} strokeWidth={3} />
          </div>

          <div className="flex flex-col items-center gap-6 relative z-10">
            {/* Big Tie Icon Container */}
            <div className="flex items-center gap-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="bg-white p-4 rounded-full shadow-lg">
                <RefreshCw
                  size={40}
                  className="text-cyan-500"
                  strokeWidth={3}
                />
              </motion.div>

              <div className="bg-white/30 p-2 rounded-2xl backdrop-blur-md">
                <div className="bg-white px-6 py-2 rounded-xl">
                  <span className="text-4xl font-black text-cyan-600">=</span>
                </div>
              </div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="bg-white p-4 rounded-full shadow-lg">
                <RefreshCw
                  size={40}
                  className="text-cyan-500"
                  strokeWidth={3}
                />
              </motion.div>
            </div>

            {/* Simple Rule Text */}
            <div className="space-y-3">
              <h2 className="text-5xl md:text-6xl font-black italic text-cyan-900 tracking-tighter uppercase">
                IT'S A <span className="text-white drop-shadow-md">TIE!</span>
              </h2>

              <div className="flex items-center justify-center gap-2">
                <Sparkles
                  size={20}
                  className="text-yellow-300 fill-yellow-300"
                />
                <p className="text-white font-black text-xl md:text-2xl uppercase tracking-tight">
                  Double Trouble!
                </p>
                <Sparkles
                  size={20}
                  className="text-yellow-300 fill-yellow-300"
                />
              </div>
            </div>

            {/* The Core Rule */}
            <div className="bg-cyan-900/10 border-2 border-white/20 p-6 rounded-[30px] max-w-lg">
              <p className="text-cyan-900 font-bold text-lg md:text-xl leading-snug">
                If you both pick the{" "}
                <span className="text-white px-2 py-0.5 bg-cyan-800 rounded-md">
                  SAME SIGN
                </span>
                , nobody wins. Don't worry! Just spin around and play the round
                again!
              </p>

              <div className="mt-4 flex items-center justify-center gap-3 text-white font-black text-2xl italic uppercase">
                <Zap size={24} className="fill-yellow-300 text-yellow-300" />
                REMATCH TIME!
                <Zap size={24} className="fill-yellow-300 text-yellow-300" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Big Happy CTA */}
        <div className="flex justify-center pb-20">
          <motion.button
            whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-black font-black text-3xl px-16 py-6 rounded-full shadow-[0_12px_0_#b45309] border-4 border-white active:translate-y-2 active:shadow-none transition-all flex items-center gap-4 group">
            <Sparkles className="group-hover:animate-spin" size={32} />
            LET'S PLAY!
            <Trophy size={32} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
