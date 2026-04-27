import express from "express";
import { getHistory, saveGame } from "../controllers/gameController.js";

const router = express.Router();

router.post("/save-game", saveGame);
router.get("/history", getHistory);

export default router;
