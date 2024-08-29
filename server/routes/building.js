// routes/building.js
import express from "express";
import { getUserBuildings, getAllBuildings, getUrbanBuildings, updateBuilding } from "../controllers/building.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getAllBuildings);
router.get("/urban", verifyToken, getUrbanBuildings);
router.get("/", verifyToken, getUserBuildings);

//Update Building Data
router.patch('/:buildingID', verifyToken, updateBuilding);

export default router;