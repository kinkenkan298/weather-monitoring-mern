import { ApiResponse, City, WeatherApiResponse } from "@/types/api-response";

export const fetchWeather = async (location: {
  latitude: number;
  longitude: number;
}): Promise<WeatherApiResponse> => {
  const response = await fetch(
    `http://localhost:3001/v1/weather?lat=${location.latitude}&lon=${location.longitude}`,
    {
      method: "GET",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data = await response.json();
  return data;
};
export const fetchCityData = async (selectedCity: string) => {
  const searchCity = await fetch(
    `http://localhost:3001/v1/cities?search=${selectedCity}`,
  );
  const searchCityData = (await searchCity.json()) as ApiResponse<City[]>;
  return searchCityData;
};
