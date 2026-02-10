import type { GeoCityResponse } from "@/utils/api-response";
import { cityModel, type ICityDocument } from "../models/cityModels";

class CityService {
  static async getAllCities() {
    return await cityModel.find().sort({ name: -1 });
  }

  static async searchCities(search: string) {
    return await cityModel
      .find({
        name: { $regex: search, $options: "i" },
      })
      .sort({ createdAt: -1 });
  }
  static async getCity({
    lat,
    lng,
    timezone,
  }: {
    lat: string;
    lng: string;
    timezone: string;
  }): Promise<ICityDocument | null> {
    if (!lat || !lng) {
      throw new Error("Latitude and longitude are required");
    }
    const cities = await cityModel.find();
    let nearestCityId = "";
    let minDistance = Infinity;

    for (const city of cities) {
      const dist = Math.sqrt(
        Math.pow(city.latitude - Number(lat), 2) +
        Math.pow(city.longitude - Number(lng), 2),
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearestCityId = city._id as unknown as string;
      }
    }
    if (nearestCityId && minDistance < 0.5) {
      return await cityModel.findById(nearestCityId);
    }

    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=698b6edd8a3e4925527618cince5994`,
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch city data");
    }
    const data = (await response.json()) as GeoCityResponse;

    return await cityModel.create({
      name: data.address.city,
      latitude: Number(data.lat),
      longitude: Number(data.lon),
      country: data.address.country,
      timezone,
    });
  }
}
export { CityService };
