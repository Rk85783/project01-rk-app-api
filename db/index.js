import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("Database connected successfully");
  } catch (error) {
    throw new Error('mongoose.connect(): Database connection failed, Error: ', error);
  }
}
export default connectDB;
