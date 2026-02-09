import { City } from "../models/cityModels";

class CityService {
  static async getAllCities() {
    return await City.find().sort({ createdAt: -1 });
  }

  static async searchCities(search: string) {
    return await City.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });
  }
}
export { CityService };
