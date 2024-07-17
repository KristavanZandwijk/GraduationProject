// routes/project.js
import express from "express";
import { getCompanyProjects } from "../controllers/project.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getCompanyProjects);


export default router;
