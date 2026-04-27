import { game } from "../models/game.js";

// Save game
export const saveGame = async (req, res) => {
  try {
    const newGame = new game(req.body);
    await newGame.save();
    res.status(201).json({ message: "Game saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get history
export const getHistory = async (req, res) => {
  try {
    const history = await game.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Game logic
export const determineRoundWinner = (p1, p2) => {
  if (p1 === p2) return "Tie";

  if (
    (p1 === "stone" && p2 === "scissors") ||
    (p1 === "scissors" && p2 === "paper") ||
    (p1 === "paper" && p2 === "stone")
  ) {
    return "Player 1";
  }

  return "Player 2";
};
