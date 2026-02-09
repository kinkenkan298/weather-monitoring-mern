import CurrentWeather from "@/components/weather/CurrentWeather";
import ForecastSummary, {
  ForecastDay,
} from "@/components/weather/ForecastSummary";
import RecentLocations, {
  Location,
} from "@/components/weather/RecentLocations";
import { createFileRoute } from "@tanstack/react-router";
import { Cloud, CloudRainIcon, CloudSunIcon } from "lucide-react";

export const Route = createFileRoute("/")({ component: HomePage });

const mockForecastData: ForecastDay[] = [
  {
    day: "Wed",
    condition: "Sunny",
    highTemp: 74,
    lowTemp: 58,
    icon: CloudSunIcon,
    variant: "warning-subtle",
  },
  {
    day: "Thu",
    condition: "Showers",
    highTemp: 68,
    lowTemp: 55,
    icon: CloudRainIcon,
    variant: "primary-subtle",
  },
  {
    day: "Fri",
    condition: "Cloudy",
    highTemp: 70,
    lowTemp: 60,
    icon: Cloud,
    variant: "tertiary-subtle",
  },
  {
    day: "Sat",
    condition: "Partial",
    highTemp: 72,
    lowTemp: 62,
    icon: CloudSunIcon,
    variant: "orange-subtle",
  },
  {
    day: "Sun",
    condition: "Sunny",
    highTemp: 75,
    lowTemp: 64,
    icon: CloudSunIcon,
    variant: "warning-subtle",
  },
];

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
  return (
    <div className="max-w-7xl w-full  flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CurrentWeather
          city="San Francisco"
          region="CA"
          dateTime="Tuesday, 10:42 AM"
          condition="Partly Cloudy"
          temperature={64}
          feelsLike={62}
          weatherIcon={CloudSunIcon}
          humidity={45}
          windSpeed={12}
          pressure={1015}
          isFavorite={true}
        />

        <ForecastSummary forecasts={mockForecastData} />
      </div>

      <RecentLocations locations={mockRecentLocations} />
    </div>
  );
}
