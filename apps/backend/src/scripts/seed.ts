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
  {
    name: "Jakarta",
    latitude: -6.2,
    longitude: 106.816666,
    country: "Indonesia",
    timezone: "Asia/Jakarta",
    population: 1000000,
  },
  {
    name: "Bandung",
    latitude: -6.914744,
    longitude: 107.60981,
    country: "Indonesia",
    timezone: "Asia/Jakarta",
    population: 1000000,
  },
  {
    name: "Surabaya",
    latitude: -7.250445,
    longitude: 112.768845,
    country: "Indonesia",
    timezone: "Asia/Jakarta",
    population: 1000000,
  },
  {
    name: "Makassar",
    latitude: -5.147665,
    longitude: 119.432732,
    country: "Indonesia",
    timezone: "Asia/Makassar",
    population: 1000000,
  },
  {
    name: "Jayapura",
    latitude: -2.533333,
    longitude: 140.716667,
    country: "Indonesia",
    timezone: "Asia/Jayapura",
    population: 1000000,
  },
  {
    name: "Medan",
    latitude: 3.5952,
    longitude: 98.6722,
    country: "Indonesia",
    timezone: "Asia/Jakarta",
    population: 1000000,
  },
  {
    name: "Palembang",
    latitude: -2.9761,
    longitude: 104.7754,
    country: "Indonesia",
    timezone: "Asia/Jakarta",
    population: 1000000,
  },
  {
    name: "Semarang",
    latitude: -6.9667,
    longitude: 110.4167,
    country: "Indonesia",
    population: 1000000,
    timezone: "Asia/Jakarta",
  },
  {
    name: "Yogyakarta",
    latitude: -7.7956,
    longitude: 110.3695,
    country: "Indonesia",
    timezone: "Asia/Jakarta",
    population: 1000000,
  },
  {
    name: "Denpasar",
    latitude: -8.6705,
    longitude: 115.2126,
    country: "Indonesia",
    timezone: "Asia/Makassar",
    population: 1000000,
  },
  {
    name: "Mataram",
    latitude: -8.5799,
    longitude: 116.0991,
    country: "Indonesia",
    timezone: "Asia/Makassar",
    population: 1000000,
  },
  {
    name: "Kupang",
    latitude: -10.1772,
    longitude: 123.607,
    country: "Indonesia",
    timezone: "Asia/Makassar",
    population: 1000000,
  },
  {
    name: "Pontianak",
    latitude: -0.0263,
    longitude: 109.3425,
    country: "Indonesia",
    timezone: "Asia/Jakarta",
    population: 1000000,
  },
  {
    name: "Banjarmasin",
    latitude: -3.3167,
    longitude: 114.59,
    country: "Indonesia",
    timezone: "Asia/Makassar",
    population: 1000000,
  },
  {
    name: "Samarinda",
    latitude: -0.4949,
    longitude: 117.1492,
    country: "Indonesia",
    timezone: "Asia/Makassar",
    population: 1000000,
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
