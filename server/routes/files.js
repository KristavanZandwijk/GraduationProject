// server/routes/files.js
import express from 'express';
import { createFile, updateFile } from '../controllers/files.js';
import { verifyToken } from '../middleware/auth.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import File from '../models/File.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const user = req.userData;
    const userFolder = path.join('public', 'assets', 'dataSpaces', user.dataSpaceID);

    // Ensure the directory exists
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    cb(null, userFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Route to create a file
router.post('/', verifyToken, upload.single('data'), createFile);

// Route to fetch files for a user
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const files = await File.find({ userId: req.params.userId });
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { relatedTo } = req.query;
    const query = relatedTo ? { relatedTo } : {};
    const files = await File.find(query);
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch file by ID
router.get('/:fileID', verifyToken, async (req, res) => {
  try {
    const fileRecord = await File.findOne({ fileID: req.params.fileID });
    if (!fileRecord) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = fileRecord.filePath;
    const fileContent = fs.readFileSync(path.resolve(filePath), 'utf-8');
    
    // Include metadata in the response
    const metadata = {
      filename: path.basename(filePath),
      size: fs.statSync(filePath).size,
      createdAt: fileRecord.createdAt,
      owner: fileRecord.personID,
    };

    res.status(200).json({ content: fileContent, metadata });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Fetch file metadata
router.get('/metadata/:fileID', verifyToken, async (req, res) => {
  try {
    const fileRecord = await File.findOne({ fileID: req.params.fileID });
    if (!fileRecord) {
      return res.status(404).json({ message: 'File not found' });
    }

    const metadata = {
      filename: fileRecord.fileName,
      size: fs.statSync(fileRecord.filePath).size,
      createdAt: fileRecord.createdAt,
      owner: fileRecord.fileOwner,
    };

    res.status(200).json(metadata);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//Update File Data
router.patch('/:fileID', verifyToken, updateFile);


export default router;
