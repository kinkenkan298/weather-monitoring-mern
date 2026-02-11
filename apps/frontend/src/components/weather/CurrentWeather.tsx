import { LocateFixedIcon, LucideIcon } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "../selia/badge";
import { Card, CardBody } from "../selia/card";
import { Separator } from "../selia/separator";
import WeatherStats from "./WeatherStats";

export interface CurrentWeatherProps {
  city: string;
  region: string;
  dateTime: string;
  condition: string;
  temperature: number;
  feelsLike: number;
  weatherIcon: LucideIcon;
  humidity: number;
  windSpeed: number;
  pressure: number;
  isFavorite?: boolean;
  updateAt?: Date;
}

export default function CurrentWeather({
  city,
  region,
  dateTime,
  condition,
  temperature,
  feelsLike,
  weatherIcon: Icon,
  humidity,
  windSpeed,
  pressure,
  isFavorite = false,
  updateAt,
}: CurrentWeatherProps) {
  const iconColor = isFavorite
    ? "text-yellow-400"
    : "text-slate-300 dark:text-gray-600 hover:text-yellow-400 dark:hover:text-yellow-400";
  const now = new Date();
  const differenceInMilliseconds = now.getTime() - updateAt!.getTime();
  let updateAtText = "";
  if (differenceInMilliseconds < 1) {
    updateAtText = "Just now";
  } else if (differenceInMilliseconds < 60) {
    updateAtText = `${differenceInMilliseconds} seconds ago`;
  } else if (differenceInMilliseconds < 60 * 60) {
    updateAtText = `${Math.floor(differenceInMilliseconds / 60)} minutes ago`;
  } else if (differenceInMilliseconds < 60 * 60 * 24) {
    updateAtText = `${Math.floor(differenceInMilliseconds / (60 * 60))} hours ago`;
  } else {
    updateAtText = `${Math.floor(differenceInMilliseconds / (60 * 60 * 24))} days ago`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const differenceInMilliseconds = now.getTime() - updateAt!.getTime();
      if (differenceInMilliseconds < 1) {
        updateAtText = "Just now";
      } else if (differenceInMilliseconds < 60) {
        updateAtText = `${differenceInMilliseconds} seconds ago`;
      } else if (differenceInMilliseconds < 60 * 60) {
        updateAtText = `${Math.floor(differenceInMilliseconds / 60)} minutes ago`;
      } else if (differenceInMilliseconds < 60 * 60 * 24) {
        updateAtText = `${Math.floor(differenceInMilliseconds / (60 * 60))} hours ago`;
      } else {
        updateAtText = `${Math.floor(differenceInMilliseconds / (60 * 60 * 24))} days ago`;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [updateAt]);

  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <LocateFixedIcon className="text-blue-500" />
          Current Weather
        </h2>

        <Badge variant="secondary" className="py-1 px-3 text-slate-500">
          Updated {updateAtText}
        </Badge>
      </div>

      <Card className="bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-card-border relative overflow-hidden group">
        <CardBody className="flex flex-col md:flex-row  justify-between items-start md:items-center relative z-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {city}, {region}
              </h3>
              <button
                className={`transition-colors cursor-pointer ${iconColor}`}
                title="Add to Favorites"
              >
                <Icon className={iconColor} size={20} />
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
            <Icon className={iconColor} size={80} />
            <span className="text-lg font-bold text-slate-900 dark:text-white mt-2">
              {condition}
            </span>
          </div>
        </CardBody>
        <Separator />
        <WeatherStats
          humidity={humidity}
          windSpeed={windSpeed}
          pressure={pressure}
        />
      </Card>
    </div>
  );
}
