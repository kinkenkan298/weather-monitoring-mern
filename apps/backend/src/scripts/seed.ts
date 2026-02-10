import "dotenv/config";
import mongoose from "mongoose";
import { cityModel } from "../models/cityModels";

const cities = [
  {
    name: "London",
    country: "United Kingdom",
    population: 8982000,
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: "Europe/London",
  },
  {
    name: "New York",
    country: "United States",
    population: 8468000,
    latitude: 40.7128,
    longitude: -74.006,
    timezone: "America/New_York",
  },
  {
    name: "Tokyo",
    country: "Japan",
    population: 13960000,
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: "Asia/Tokyo",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI!);
    console.log("Connected to MongoDB");

    const count = await cityModel.countDocuments();
    if (count === 0) {
      console.log("Seeding cities...");
      await cityModel.insertMany(cities);
      console.log("Cities seeded successfully");
    } else {
      console.log(`Database already has ${count} cities. Skipping seed.`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

seed();
