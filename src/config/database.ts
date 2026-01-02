import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27018/favorite-recipes';

export const connectDatabase = async (): Promise<void> => {
  try {
    // If already connected, return early
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit process in serverless environment (Vercel)
    if (process.env.VERCEL !== '1' && !process.env.VERCEL_ENV) {
      process.exit(1);
    }
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

