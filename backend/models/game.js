import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
  roundNumber: Number,
  player1Choice: String,
  player2Choice: String,
  winner: String, // 'Player 1', 'Player 2', or 'Tie'
});

const gameSchema = new mongoose.Schema({
  player1Name: { type: String, required: true },
  player2Name: { type: String, required: true },
  rounds: [roundSchema],
  finalWinner: String,
  createdAt: { type: Date, default: Date.now },
});

export const Game = mongoose.model("Game", gameSchema);
