// controllers/building.js
import Building from "../models/Building.js";

/* READ */
export const getUserBuildings = async (req, res) => {
  try {
    const personID = req.userData.personID;  // user data is attached by verifyToken middleware
    const buildings = await Building.find({ hasOwner: personID });

    if (!buildings.length) {
      return res.status(404).json({ message: "No buildings found for this user." });
    }

    res.status(200).json(buildings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
