import { CloudSunIcon, LocateFixedIcon } from "lucide-react";
import WeatherStats from "./WeatherStats";

interface CurrentWeatherProps {
  city: string;
  region: string;
  dateTime: string;
  condition: string;
  temperature: number;
  feelsLike: number;
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export default function CurrentWeather({
  city,
  region,
  dateTime,
  condition,
  temperature,
  feelsLike,
  weatherIcon,
  humidity,
  windSpeed,
  pressure,
  isFavorite = false,
  onFavoriteToggle,
}: CurrentWeatherProps) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <LocateFixedIcon />
          Current Weather
        </h2>
        <span className="text-sm text-slate-500 dark:text-muted bg-slate-100 dark:bg-accent px-3 py-1 rounded-full">
          Updated 5m ago
        </span>
      </div>
      <div className="bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-card-border relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {city}, {region}
              </h3>
              <button
                className={`transition-colors cursor-pointer ${isFavorite
                    ? "text-yellow-400"
                    : "text-slate-300 dark:text-gray-600 hover:text-yellow-400 dark:hover:text-yellow-400"
                  }`}
                title="Add to Favorites"
                onClick={onFavoriteToggle}
              >
                <CloudSunIcon className="text-yellow-400" />
              </button>
            </div>
            <p className="text-slate-500 dark:text-muted text-sm font-medium mb-6">
              {dateTime} • {condition}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter">
                {temperature}°
              </span>
              <div className="flex flex-col justify-center h-full pt-2">
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  F
                </span>
                <span className="text-sm text-slate-500 dark:text-muted">
                  Feels like {feelsLike}°
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <CloudSunIcon className="text-yellow-400 " size={80} />
            <span className="text-lg font-bold text-slate-900 dark:text-white mt-2">
              {condition}
            </span>
          </div>
        </div>

        <WeatherStats
          humidity={humidity}
          windSpeed={windSpeed}
          pressure={pressure}
        />
      </div>
    </div>
  );
}
