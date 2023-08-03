import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectToMongoDB() {
  mongoose.connect(`${process.env.MONGODB_URI}`)
  console.log("Connected to MongoDB!");
}

connectToMongoDB();

export default connectToMongoDB;