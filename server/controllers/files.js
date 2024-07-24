import path from 'path';
import User from "../models/User.js";
import File from "../models/File.js";

export const createFile = async (req, res) => {
  try {
    const {fileID, fileName, fileDescription, hasOwner, considers, elementDataSpaceID, buildingDataSpaceID, companyDataSpaceID, teamDataSpaceID, relatedToProject, relatedToTeam, status } = req.body; 
    const user = req.userData;
    const filePath = path.join('public', 'assets', 'dataSpaces', user.dataSpaceID, req.file.filename);

    const newFile = new File({
      personID: user.personID,
      personalDataSpaceID: user.dataSpaceID,
      fileID: fileID, // Use the provided fileID
      fileName: req.file.originalname,
      filePath: filePath,
      hasOwner: hasOwner,
      fileDescription: fileDescription, // Set description here
      considers: considers, // Add considers field here
      elementDataSpaceID: elementDataSpaceID,
      buildingDataSpaceID: buildingDataSpaceID,
      companyDataSpaceID: companyDataSpaceID,
      relatedToProject: relatedToProject,
      relatedToTeam: relatedToTeam,
      status: status,
    });

    await newFile.save();

    res.status(201).json(newFile);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
