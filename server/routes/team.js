import express from "express";
import { getAllTeams } from "../controllers/team.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllTeams);

export default router;
