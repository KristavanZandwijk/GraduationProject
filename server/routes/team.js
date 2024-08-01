// routes/team.js
import express from "express";
import { getAllTeams, getUserTeams } from "../controllers/team.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllTeams);
router.get("/user", verifyToken, getUserTeams);

export default router;
