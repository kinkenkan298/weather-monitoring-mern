import { Heading } from "@/components/selia/heading";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/selia/select";
import { Text } from "@/components/selia/text";
import CurrentWeather from "@/components/weather/CurrentWeather";
import ForecastSummary, {
  ForecastDay,
} from "@/components/weather/ForecastSummary";
import RecentLocations, {
  Location,
} from "@/components/weather/RecentLocations";
import { CityApiResponse, WeatherApiResponse } from "@/types/api-response";
import { getWeatherCondition } from "@/utils/weather-code";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Cloud, CloudRainIcon, CloudSunIcon } from "lucide-react";
import { Activity, useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: async () => {
    const response = await fetch("http://localhost:3001/v1/cities");
    const { data, message } = (await response.json()) as CityApiResponse;
    if (!response.ok) {
      throw new Error(message);
    }
    const cities = data.map((city) => {
      return {
        value: city.name,
        label: city.name,
      };
    });
    return {
      cities,
    };
  },
});

const mockRecentLocations: Location[] = [
  {
    city: "New York",
    condition: "Clear Sky",
    temperature: 68,
    icon: CloudSunIcon,
    iconColor: "text-yellow-500",
  },
  {
    city: "Tokyo",
    condition: "Rainy",
    temperature: 62,
    icon: CloudRainIcon,
    iconColor: "text-blue-400",
  },
  {
    city: "Paris",
    condition: "Cloudy",
    temperature: 59,
    icon: Cloud,
    iconColor: "text-gray-400",
  },
];

function HomePage() {
  const { cities } = Route.useLoaderData();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (
      "geolocation" in navigator &&
      navigator.geolocation.getCurrentPosition
    ) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const fetchWeather = async (location: {
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

  const { data: weather } = useQuery({
    queryKey: ["weather", location],
    queryFn: () => {
      if (!location) return;
      return fetchWeather(location);
    },
    enabled: !!location,
  });

  const currentData = weather?.data.weather.current;
  const dailyData = weather?.data.weather.daily;

  const currentCondition = currentData
    ? getWeatherCondition(currentData.weatherCode)
    : { condition: "Unknown", icon: Cloud };

  const forecastData: ForecastDay[] = dailyData
    ? dailyData.time.map((time, index) => {
      const date = new Date(time);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      const code = dailyData.weatherCode[index];
      const { condition, icon, variant } = getWeatherCondition(code);
      return {
        day,
        condition,
        highTemp: dailyData.temperatureMax
          ? Math.round(dailyData.temperatureMax[index])
          : 0,
        lowTemp: dailyData.temperatureMin
          ? Math.round(dailyData.temperatureMin[index])
          : 0,
        icon,
        variant,
      };
    })
    : [];

  return (
    <div className="max-w-7xl w-full  flex flex-col gap-8">
      <div className="relative w-full rounded-2xl overflow-hidden bg-linear-to-br from-blue-600 to-indigo-900 shadow-xl">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          data-alt="Abstract cloudy sky background"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRigwEQYSMjNOSHIHvWLgyPKlY5PH524aNTWK53VgNvs9PP-TVsEhQbQPUpt4_o2nJwa77SWlbJjRxrF7bw7cBaiYtqeioquScdGyUTV1SvGu3AK5zgBoHpJ1n7Zh0RyThn6n_vbxjH9m7Ruel7z5SWCLInNXRRrncfhbXV7xEGP3raMN_-nUwc3VTxk9opkKFQaLc9yn3HHGtDd6_YHXCeGmi7MQ3UPbFF9rSLDKyaETyyURVHH7zFJeWSJYCSRz7oLxedWVQhTA")',
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6 gap-6 text-center h-70 rounded-xl">
          <div className="flex flex-col gap-2">
            <Heading
              size="lg"
              className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight"
            >
              Global Weather Monitoring
            </Heading>
            <Text className="text-blue-100 text-sm md:text-base font-medium max-w-xl">
              Get real-time weather updates for any location
            </Text>
          </div>
          <div className="w-full max-w-xl relative group">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectPopup>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </div>
        </div>
      </div>
      <Activity mode={location ? "visible" : "hidden"}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {currentData && (
            <CurrentWeather
              city={weather?.data.weather.location.city ?? "Unknown"}
              region={weather?.data.weather.location.country ?? "Unknown"}
              dateTime={new Date(currentData.time).toLocaleString("en-US", {
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
              })}
              condition={currentCondition.condition}
              temperature={Math.round(currentData.temperature)}
              feelsLike={Math.round(currentData.apparentTemperature)}
              weatherIcon={currentCondition.icon}
              humidity={currentData.humidity}
              windSpeed={currentData.windSpeed}
              pressure={currentData.precipitation}
              isFavorite={true}
            />
          )}

          <ForecastSummary forecasts={forecastData} />
        </div>
      </Activity>

      <RecentLocations locations={mockRecentLocations} />
    </div>
  );
}
