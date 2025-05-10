import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import itemRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js'; // Import user routes
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Define __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api', itemRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes); // Use user routes

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: 'majority' },
  })
  .then(() => {
    console.log(`Connected to MongoDB successfully`);
    console.log(`Server running on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
