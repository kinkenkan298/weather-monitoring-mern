import { SearchInputCity } from "@/components/input-search-city";
import { Button } from "@/components/selia/button";
import { Heading } from "@/components/selia/heading";
import { InputGroup, InputGroupAddon } from "@/components/selia/input-group";
import { Text } from "@/components/selia/text";
import CurrentWeather from "@/components/weather/CurrentWeather";
import ForecastSummary, {
  ForecastDay,
} from "@/components/weather/ForecastSummary";
import RecentLocations, {
  Location,
} from "@/components/weather/RecentLocations";
import { CityApiResponse } from "@/types/api-response";
import { createFileRoute } from "@tanstack/react-router";
import { Cloud, CloudRainIcon, CloudSunIcon, SearchIcon } from "lucide-react";
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

  // const { data } = useQuery({
  //   queryKey: ["weather", location],
  //   queryFn: () => fetchWeather(location),
  //   enabled: !!location,
  // });

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
            <InputGroup>
              <InputGroupAddon align="start">
                <SearchIcon />
              </InputGroupAddon>
              <SearchInputCity cities={cities} />
              <InputGroupAddon align="end">
                <Button size="lg" variant="primary">
                  <SearchIcon />
                  Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
      <Activity mode={location ? "visible" : "hidden"}>
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
      </Activity>

      <RecentLocations locations={mockRecentLocations} />
    </div>
  );
}
