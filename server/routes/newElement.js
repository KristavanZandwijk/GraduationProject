import express from "express";
import { createElement } from "../controllers/newElement.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createElement);

export default router;
