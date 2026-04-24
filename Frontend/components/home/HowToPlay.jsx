import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Hand,
  ChevronLeft,
  Zap,
  Star,
  Trophy,
  Circle,
  StickyNote,
  Scissors,
} from "lucide-react";

const HowToPlay = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Choose Your Move!",
      desc: "Pick Stone, Paper, or Scissors in your head.",
      icon: <Hand className="text-pink-400" size={40} />,
      color: "from-pink-500/20 to-purple-500/20",
    },
    {
      id: 2,
      title: "Count Together!",
      desc: "Shout '1, 2, 3... SHOOT!' with your friend.",
      icon: <Zap className="text-yellow-400" size={40} />,
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      id: 3,
      title: "Reveal!",
      desc: "Show your hand at the exact same time!",
      icon: <Star className="text-cyan-400" size={40} />,
      color: "from-cyan-500/20 to-blue-500/20",
    },
  ];

  const rules = [
    {
      winner: "Stone",
      beats: "Scissors",
      icon: <Circle size={32} fill="currentColor" />,
      color: "bg-slate-500",
    },
    {
      winner: "Scissors",
      beats: "Paper",
      icon: <Scissors size={32} />,
      color: "bg-pink-500",
    },
    {
      winner: "Paper",
      beats: "Stone",
      icon: <StickyNote size={32} fill="currentColor" />,
      color: "bg-blue-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1625] text-white p-6 font-sans overflow-x-hidden">
      {/* Navigation */}
      <motion.button
        whileHover={{ x: -5 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8">
        <ChevronLeft /> Back to Game
      </motion.button>

      {/* Title Section */}
      <div className="text-center mb-12">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-4">
          <span className="text-6xl">✊📄✂️</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tight">
          HOW TO <span className="text-yellow-400">PLAY</span>
        </h1>
        <p className="text-slate-400 mt-2 font-bold">
          The Ultimate Guide for Heroes!
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Step-by-Step */}
        <section>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg">
              3
            </span>{" "}
            EASY STEPS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`bg-gradient-to-br ${step.color} border-2 border-white/10 p-6 rounded-[32px] relative overflow-hidden group`}>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {step.desc}
                </p>
                <div className="absolute -bottom-4 -right-4 text-white/5 font-black text-8xl italic">
                  {step.id}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Rules Section */}
        <section className="bg-[#2a2438] p-8 rounded-[40px] border-b-8 border-black/30">
          <h2 className="text-2xl font-black mb-8 text-center">WHO WINS? 🏆</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className="flex flex-col items-center text-center space-y-4">
                <div className={`${rule.color} p-6 rounded-full shadow-lg`}>
                  {rule.icon}
                </div>
                <div className="font-bold">
                  <span className="text-yellow-400">{rule.winner}</span>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
                    Smashingly beats
                  </p>
                  <span className="text-white">{rule.beats}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-emerald-500/10 border-2 border-emerald-500/20 p-6 rounded-3xl flex items-center gap-4">
            <div className="bg-emerald-500 p-3 rounded-2xl">🤝</div>
            <div>
              <h4 className="font-bold text-emerald-400">Play Fair!</h4>
              <p className="text-sm text-slate-300">
                Always shake hands after a match.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-purple-500/10 border-2 border-purple-500/20 p-6 rounded-3xl flex items-center gap-4">
            <div className="bg-purple-500 p-3 rounded-2xl">🔥</div>
            <div>
              <h4 className="font-bold text-purple-400">Best of Three!</h4>
              <p className="text-sm text-slate-300">
                Play 3 rounds to find the true champion.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CTA Button */}
        <div className="text-center pt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-2xl px-12 py-5 rounded-full shadow-[0_6px_0_#9a3412] flex items-center gap-3 mx-auto">
            <Trophy /> GOT IT! LET'S PLAY
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
