// routes/building.js
import express from "express";
import { getUserBuildings, getAllBuildings } from "../controllers/building.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getAllBuildings);
router.get("/", verifyToken, getUserBuildings);

export default router;