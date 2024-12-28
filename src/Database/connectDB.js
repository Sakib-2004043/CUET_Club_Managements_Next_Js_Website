import mongoose from "mongoose";

// const DB_URL = "mongodb+srv://sakib313:sakib313@islamiccluster.sbc761q.mongodb.net/clubDB?retryWrites=true&w=majority&appName=IslamicCluster";
const DB_URL = "mongodb://127.0.0.1:27017/clubDB";

const connectDB = async () => {
  if (!DB_URL) {
    console.error("MongoDB connection string is not defined in environment variables.");
    throw new Error("MongoDB connection string is missing");
  }

  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(DB_URL);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      throw new Error("MongoDB connection failed");
    }
    
  } 
  else {
    console.log("Already connected to MongoDB");
  }
};

export default connectDB;
