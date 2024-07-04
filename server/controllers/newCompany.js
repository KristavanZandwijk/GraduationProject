import Company from '../models/Company.js';

export const createCompany = async (req, res) => {
  try {
    const {companyID, companyDataSpaceID, companyName, city, country } = req.body;

    const newCompany = new Company({
      companyID,
      companyDataSpaceID,
      companyName,
      city,
      country,
    });

    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
