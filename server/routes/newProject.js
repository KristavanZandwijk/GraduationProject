import express from "express";
import { createProject } from "../controllers/newProject.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createProject);

export default router;
