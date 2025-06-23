import mongoose from "mongoose";
import { config } from "../config/app";

export async function dbConnection() {
  try {
    await mongoose.connect(config.db.mongo_uri);

    console.log("✅ Database connected successfully");
  } catch (err) {
    console.log("❌ Database connection failed");
    throw err;
  }
}
