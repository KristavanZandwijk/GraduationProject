// routes/building.js
import express from "express";
import { getAllElements, updateElement } from "../controllers/element.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllElements);

//Update Element Data
router.patch('/:elementID', verifyToken, updateElement);

export default router;
