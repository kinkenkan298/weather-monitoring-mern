import { cityModel } from "../models/cityModels";

class CityService {
  static async getAllCities() {
    return await cityModel.find().sort({ createdAt: -1 });
  }

  static async searchCities(search: string) {
    return await cityModel
      .find({
        name: { $regex: search, $options: "i" },
      })
      .sort({ createdAt: -1 });
  }
}
export { CityService };
