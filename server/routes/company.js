import express from "express";
import { getUserCompanies } from "../controllers/company.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserCompanies);

export default router;