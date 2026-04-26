import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const db = async () => {
  try {
    const connDB = await mongoose.connect(process.env.MONGODB_STR);
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

export default db;