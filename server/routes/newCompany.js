import express from "express";
import { createCompany } from "../controllers/newCompany.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createCompany);

export default router;
