import express from "express";
import { createBuilding } from "../controllers/newBuilding.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createBuilding);

export default router;
