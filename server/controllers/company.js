import Company from "../models/Company.js";
import User from "../models/User.js";

/* READ */
export const getUserCompanies = async (req, res) => {
  try {
    const personID = req.userData.personID;
    const companies = await Company.find({ 'employees.personID': personID });

    if (!companies.length) {
      return res.status(404).json({ message: "No companies found for this user." });
    }

    // Fetch detailed employee data for each company
    for (let company of companies) {
      const employees = await User.find({
        personID: { $in: company.employees.map(emp => emp.personID) }
      });
      company._doc.employees = employees;
    }

    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCompanyEmployees = async (req, res) => {
  try {
    const { companyID } = req.params;
    const company = await Company.findById(companyID);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const employees = await User.find({
      personID: { $in: company.employees.map(emp => emp.personID) }
    });

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    if (!companies.length) {
      return res.status(404).json({ message: "No companies found." });
    }

    for (let company of companies) {
      const employees = await User.find({
        personID: { $in: company.employees.map(emp => emp.personID) }
      });
      company._doc.employees = employees;
    }

    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Update Company Employees
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
