import { cityModel } from "@/models/cityModels";
import { type IWeather, Weather } from "@/models/weatherModels";
import { weatherCodeToText } from "@/utils/weather-code";
import type { QueryFilter } from "mongoose";
import { fetchWeatherApi } from "openmeteo";
import { CityService } from "./city.service";
export class weatherService {
  static async getWeather(lat: string, lng: string) {
    const { weather } = await getWeather({ lat, lng });
    return {
      weather,
    };
  }

  static async getWeatherHistory(city?: string) {
    let filter: QueryFilter<IWeather> = {};
    if (city) {
      const cityData = await cityModel.findOne({ name: city });
      if (!cityData) {
        throw new Error("City not found");
      }
      filter = { cityId: cityData._id };
    }

    const weather = await Weather.find(filter)
      .populate("cityId", "name country timezone")
      .sort({ createdAt: -1 })
      .limit(50);
    return {
      weather,
      count: weather.length,
    };
  }
}

async function getWeather({ lat, lng }: { lat: string; lng: string }) {
  const params = {
    latitude: lat,
    longitude: lng,
    daily: [
      "weather_code",
      "sunrise",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "sunset",
    ],
    hourly: ["temperature_2m", "weather_code"],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ],
    timezone: "auto",
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const resp = responses[0];

  if (!resp) {
    throw new Error("Failed to fetch weather data");
  }
  const latitude = resp.latitude();
  const longitude = resp.longitude();
  const elevation = resp.elevation();
  const timezone = resp.timezone();
  const timezoneAbbreviation = resp.timezoneAbbreviation();
  const utcOffsetSeconds = resp.utcOffsetSeconds();

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const current = resp.current()!;
  const daily = resp.daily()!;

  const weatherData = {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    temperature: current.variables(0)!.value(),
    humidity: current.variables(1)!.value(),
    apparentTemperature: current.variables(2)!.value(),
    isDay: current.variables(3)!.value(),
    precipitation: current.variables(4)!.value(),
    rain: current.variables(5)!.value(),
    showers: current.variables(6)!.value(),
    snowfall: current.variables(7)!.value(),
    weatherCode: current.variables(8)!.value(),
    windSpeed: current.variables(9)!.value(),
    windDirection: current.variables(10)!.value(),
    pressure: current.variables(11)!.value(),
    surfacePressure: current.variables(12)!.value(),
    cloudCover: current.variables(13)!.value(),
    windGusts: current.variables(14)!.value(),
  };

  const city = await CityService.getCity({
    lat,
    lng,
    timezone: timezone || "",
  });

  try {
    await new Weather({
      cityId: city?._id,
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      weatherDescription: weatherCodeToText(weatherData.weatherCode),
      timestamp: weatherData.time,
    }).save();
  } catch (error) {
    console.error("Failed to save weather data:", error);
  }

  const location = {
    latitude,
    longitude,
    elevation,
    city: city?.name ?? "Unknown",
    country: city?.country ?? "Unknown",
    timezone,
    timezoneAbbreviation,
    utcOffsetSeconds,
  };
  const weather = {
    location,
    current: weatherData,
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperatureMax: daily.variables(1)!.valuesArray()!,
      temperatureMin: daily.variables(2)!.valuesArray()!,
    },
  };
  return { weather };
}
