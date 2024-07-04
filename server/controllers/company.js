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

    res.status(200).json(company.employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveEmployee = async (req, res) => {
  try {
    const { companyID, employeeID } = req.params;
    const company = await Company.findById(companyID);
    const employee = await User.findById(employeeID);

    if (!company || !employee) {
      return res.status(404).json({ message: "Company or employee not found" });
    }

    if (company.employees.includes(employeeID)) {
      company.employees = company.employees.filter(companyID => companyID !== employeeID);
      employee.employees = employee.employees.filter(companyID => companyID !== companyID);
    } else {
      company.employees.push(employeeID);
      employee.employees.push(companyID);
    }
    await company.save();
    await employee.save();

    const employees = await Promise.all(company.employees.map(companyID => User.findById(companyID)));
    const formattedEmployees = employees.map(({ personID, firstName, lastName, city, country, picturePath }) => ({
      personID, firstName, lastName, city, country, picturePath
    }));

    res.status(200).json(formattedEmployees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
