import { City, ICity } from "../models/cityModels";
import { connectDB } from "./index";

const cities: ICity[] = [
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

const seedCities = async () => {
  try {
    connectDB();

    await City.deleteMany();
    console.log("Old cities removed");

    await City.insertMany(cities);
    console.log("Cities inserted successfully");

    process.exit();
  } catch (error: any) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedCities();
