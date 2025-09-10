import mongoose from 'mongoose';

// A mock MONGODB_URL. In a real application, this should be in an environment variable.
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env');
}


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
