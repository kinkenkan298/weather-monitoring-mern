import { City, ICity } from "../models/CityModels";

class CityService {
  async getAllCities() {
    return await City.find().sort({ createdAt: -1 });
  }

  async getCityById(id: string) {
    return await City.findById(id);
  }

  async createCity(city: ICity) {
    return await City.create(city);
  }

  async updateCity(id: string, city: ICity) {
    return await City.findByIdAndUpdate(id, city, { new: true });
  }

  async deleteCity(id: string) {
    return await City.findByIdAndDelete(id);
  }
}
export { CityService };
