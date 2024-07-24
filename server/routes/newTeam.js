import express from "express";
import { createTeam } from "../controllers/newTeam.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createTeam);

export default router;
