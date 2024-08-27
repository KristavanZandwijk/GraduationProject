import path from 'path';
import User from "../models/User.js";
import File from "../models/File.js";

export const createFile = async (req, res) => {
  try {
    const {fileID, fileName, fileDescription, fileOwner, considers, elementDataSpaceID, buildingDataSpaceID, companyDataSpaceID, teamDataSpaceID, relatedToProject, relatedToTeam, status } = req.body; 
    const user = req.userData;
    const filePath = path.join('public', 'assets', 'dataSpaces', user.dataSpaceID, req.file.filename);

    const newFile = new File({
      personID: user.personID,
      personalDataSpaceID: user.dataSpaceID,
      fileID: fileID, // Use the provided fileID
      fileName: req.file.originalname,
      filePath: filePath,
      fileOwner: fileOwner,
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

//Update File Status
export const updateFile = async (req, res) => {
  try {
    const { fileID } = req.params;
    const updatedFile = await File.findOneAndUpdate({ fileID }, req.body, { new: true });
    res.status(200).json(updatedFile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

