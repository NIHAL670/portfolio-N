import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directories exist
const dirs = [
  path.join(__dirname, '../uploads/projects/images'),
  path.join(__dirname, '../uploads/projects/videos'),
  path.join(__dirname, '../uploads/temp'),
];
dirs.forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Server running on http://localhost:${PORT}`);
    }
  });
};

start();
