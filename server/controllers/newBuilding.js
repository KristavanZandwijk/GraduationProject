import Building from '../models/Building.js';

export const createBuilding = async (req, res) => {
  try {
    const {buildingID, buildingDataSpaceID, archivedBuildingDataSpaceID, buildingOwner, buildingName, buildingLocation } = req.body;

    const newBuilding = new Building({
      buildingID,
      buildingDataSpaceID,
      archivedBuildingDataSpaceID,
      buildingOwner,
      buildingName,
      buildingLocation,
    });

    await newBuilding.save();
    res.status(201).json(newBuilding);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
