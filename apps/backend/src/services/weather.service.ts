import { fetchWeatherApi } from "openmeteo";

export class weatherService {
  static async getWeather(lat: string, lng: string) {
    const params = {
      latitude: lat,
      longitude: lng,
      daily: "sunset",
      timezone: "Asia/Singapore",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const resp = responses[0];

    if (!resp) {
      throw new Error("Failed to fetch weather data");
    }

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const daily = resp.daily();
    const dailySunset = daily?.time();

    return { dailySunset };
  }
}
