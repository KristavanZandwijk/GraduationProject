// controllers/building.js
import Building from "../models/Building.js";
import File from "../models/File.js";

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

export const getAllBuildings = async (req, res) => {
  try {
    const publicFiles = await File.find({ status: 'public' });
    const buildingIDs = [...new Set(publicFiles.map(file => file.buildingDataSpaceID))];
    const buildings = await Building.find({ buildingDataSpaceID: { $in: buildingIDs } });

    if (!buildings.length) {
      return res.status(404).json({ message: "No buildings found at all" });
    }

    res.status(200).json(buildings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
