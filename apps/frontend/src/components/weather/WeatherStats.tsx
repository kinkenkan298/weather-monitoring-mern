import { CompassIcon, DropletsIcon, Wind } from "lucide-react";

interface WeatherStatsProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
}

export default function WeatherStats({
  humidity,
  windSpeed,
  pressure,
}: WeatherStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6">
      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-white/5">
        <DropletsIcon className="text-blue-400 mb-1" />
        <span className="text-xs text-slate-500 dark:text-muted uppercase tracking-wider font-semibold">
          Humidity
        </span>
        <span className="text-lg font-bold text-slate-900 dark:text-white">
          {humidity}%
        </span>
      </div>
      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-white/5">
        <Wind className="text-teal-400 mb-1" />
        <span className="text-xs text-slate-500 dark:text-muted uppercase tracking-wider font-semibold">
          Wind
        </span>
        <span className="text-lg font-bold text-slate-900 dark:text-white">
          {windSpeed} <span className="text-xs font-normal">mph</span>
        </span>
      </div>
      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-white/5">
        <CompassIcon className="text-purple-400 mb-1" />
        <span className="text-xs text-slate-500 dark:text-muted uppercase tracking-wider font-semibold">
          Pressure
        </span>
        <span className="text-lg font-bold text-slate-900 dark:text-white">
          {pressure} <span className="text-xs font-normal">hPa</span>
        </span>
      </div>
    </div>
  );
}
