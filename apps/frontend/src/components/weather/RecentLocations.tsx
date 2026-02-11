import { Heading } from "../selia/heading";
import RecentLocationCard from "./RecentLocationCard";
import { HistoryWeather } from "@/types/api-response";
import { getWeatherCondition } from "@/utils/weather-code";

interface RecentLocationsProps {
  locations: HistoryWeather[];
}

export default function RecentLocations({ locations }: RecentLocationsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        level={2}
        className="text-xl font-bold text-slate-900 dark:text-white"
      >
        Recent Locations
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {locations.map((location, index) => {
          const { condition, icon, variant } = getWeatherCondition(
            location.weatherCode,
          );
          return (
            <RecentLocationCard
              key={index}
              city={location.cityId.name}
              condition={condition}
              temperature={Math.round(location.temperature)}
              icon={icon}
              variant={variant}
            />
          );
        })}
      </div>
    </div>
  );
}
