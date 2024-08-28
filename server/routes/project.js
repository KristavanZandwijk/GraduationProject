// routes/project.js
import express from "express";
import { getAllProjects, getUserProjects, updateProject } from "../controllers/project.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllProjects);
router.get("/:projectID", verifyToken, getAllProjects);
router.get("/employee", verifyToken, getUserProjects);

/* UPDATE */
router.patch('/:id', verifyToken, updateProject);



export default router;
