import express from 'express';
import multer from 'multer';
import { convertIfcToRdf } from '../controllers/dataPrivacy.js';

const router = express.Router();

// Set up multer for file upload handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/converterfiles');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original file name
    },
});

const upload = multer({ storage });

router.post('/', upload.single('ifcFile'), convertIfcToRdf);

export default router;
