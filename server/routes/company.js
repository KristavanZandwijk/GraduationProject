import express from "express";
import { getCompanyEmployees, getUserCompanies } from "../controllers/company.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserCompanies);
router.get("/employees/:companyID", verifyToken, getCompanyEmployees);




export default router;
