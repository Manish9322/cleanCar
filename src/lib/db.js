import mongoose from 'mongoose';

// A mock MONGODB_URL. In a real application, this should be in an environment variable.
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/aquashine';

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('MongoDB is already connected');
      return;
    }
    
    await mongoose.connect(MONGODB_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
