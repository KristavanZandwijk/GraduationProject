import express from "express";
import{getUser2} from "../controllers/settings.js"

const router = express.Router();

router.get("/user", getUser2);

export default router;