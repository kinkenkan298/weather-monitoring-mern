import { LucideIcon } from "lucide-react";

type IconColor = "orange" | "blue" | "gray" | "yellow";

interface ForecastItemProps {
  day: string;
  condition: string;
  highTemp: number;
  lowTemp: number;
  icon: LucideIcon;
  iconColor: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  orange:
    "bg-orange-100 dark:bg-orange-500/20 text-orange-500 dark:text-orange-400",
  blue: "bg-blue-100 dark:bg-blue-500/20 text-blue-500 dark:text-blue-400",
  gray: "bg-gray-100 dark:bg-gray-500/20 text-gray-500 dark:text-gray-400",
  yellow:
    "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-500 dark:text-yellow-400",
};

export default function ForecastItem({
  day,
  condition,
  highTemp,
  lowTemp,
  icon: Icon,
  iconColor,
}: ForecastItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${colorClasses[iconColor]}`}
        >
          <Icon size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {day}
          </span>
          <span className="text-xs text-slate-500 dark:text-muted">
            {condition}
          </span>
        </div>
      </div>
      <div className="flex gap-3 text-sm">
        <span className="font-bold text-slate-900 dark:text-white">
          {highTemp}°
        </span>
        <span className="text-slate-400 dark:text-slate-600">{lowTemp}°</span>
      </div>
    </div>
  );
}
