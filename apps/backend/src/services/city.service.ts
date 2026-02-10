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
  }): Promise<ICityDocument> {
    if (!lat || !lng) {
      throw new Error("Latitude and longitude are required");
    }
    const city = await cityModel.findOne({
      latitude: Number(lat),
      longitude: Number(lng),
    });
    if (city) {
      return city;
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
