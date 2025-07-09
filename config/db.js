import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

// Export the function so server.js can use it
export default connectDB;

