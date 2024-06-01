import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connection.on("connected", () => {
    console.log("Connected to database");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err);
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection failed", err);
    throw err;
  }
}
