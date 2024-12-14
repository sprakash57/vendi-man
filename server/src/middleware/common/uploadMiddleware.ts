import multer from 'multer';
import fs from 'fs';
import path from 'path';

const createUploadMiddleware = () => {
  // Define storage configuration for Multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '/uploads');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  // Create Multer instance with the storage configuration
  const upload = multer({ storage });

  // Return the Multer middleware
  return upload.array('files', 5);
};

export default createUploadMiddleware;
