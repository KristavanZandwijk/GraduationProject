// routes/building.js
import express from "express";
import { getAllElements } from "../controllers/element.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllElements);

export default router;
