// routes/building.js
import express from "express";
import { getUserElement } from "../controllers/element.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserElement);

export default router;
