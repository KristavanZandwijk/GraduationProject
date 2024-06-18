import path from 'path';
import User from "../models/User.js";
import File from "../models/File.js";

export const createFile = async (req, res) => {
  try {
    const { description, fileID } = req.body; // Extract fileID and description from request body
    const user = req.userData;
    const filePath = path.join('public', 'assets', 'dataSpaces', user.dataSpaceID, req.file.filename);

    const newFile = new File({
      userId: user._id,
      personID: user.personID,
      dataSpaceID: user.dataSpaceID,
      fileID: fileID, // Use the provided fileID
      fileName: req.file.originalname,
      filePath: filePath,
      description: description, // Set description here
    });

    await newFile.save();

    res.status(201).json(newFile);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
