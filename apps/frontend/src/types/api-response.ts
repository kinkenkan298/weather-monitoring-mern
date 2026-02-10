export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface City {
  _id: string;
  name: string;
  country: string;
  population: number;
  latitude: number;
  longitude: number;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export type CityApiResponse = ApiResponse<City[]>;

export interface WeatherLocation {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezoneAbbreviation: string | null;
  utcOffsetSeconds: number;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  humidity: number;
  apparentTemperature: number;
  isDay: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
}

export interface DailyWeather {
  time: string[];
  weatherCode: number[];
  temperatureMax: number[];
  temperatureMin: number[];
}

export interface WeatherData {
  location: WeatherLocation;
  current: CurrentWeather;
  daily: DailyWeather;
}

export type WeatherApiResponse = ApiResponse<{ weather: WeatherData }>;
