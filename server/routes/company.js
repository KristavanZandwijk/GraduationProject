import express from "express";
import { getAllCompanies, getCompanyEmployees, getUserCompanies } from "../controllers/company.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserCompanies);
router.get("/employees/:companyID", verifyToken, getCompanyEmployees);
router.get("/all", verifyToken, getAllCompanies);




export default router;
