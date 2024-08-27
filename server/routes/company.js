import express from "express";
import { getAllCompanies, getCompanyEmployees, getUserCompanies, updateCompany } from "../controllers/company.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserCompanies);
router.get("/employees/:companyID", verifyToken, getCompanyEmployees);
router.get("/all", verifyToken, getAllCompanies);

/* UPDATE */
router.patch('/:id', verifyToken, updateCompany);

export default router;

