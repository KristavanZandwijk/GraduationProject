// controllers/building.js
import Element from "../models/Elements.js";

/* READ */
export const getUserElement = async (req, res) => {
  try {
    const personID = req.userData.personID;  // user data is attached by verifyToken middleware
    const elements = await Element.find({ hasOwner: personID });

    if (!elements.length) {
      return res.status(404).json({ message: "No elements found for this user." });
    }

    res.status(200).json(elements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
