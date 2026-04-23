import express from "express";
import { Game } from "../models/Game.js";

const router = express.Router();

// POST: Save game data after 6 rounds
router.post("/save-game", async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json({ message: "Game saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch all game history
router.get("/history", async (req, res) => {
  try {
    const history = await Game.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
