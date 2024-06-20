// routes/building.js
import express from "express";
import { getUserBuildings } from "../controllers/building.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserBuildings);

export default router;
