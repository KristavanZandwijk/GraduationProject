import express from "express";
import { getUserTeam } from "../controllers/team.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserTeam);

export default router;
