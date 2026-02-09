import { LucideIcon } from "lucide-react";
import { Button } from "../selia/button";
import { Heading } from "../selia/heading";
import { Stack } from "../selia/stack";
import ForecastItem from "./ForecastItem";

export interface ForecastDay {
  day: string;
  condition: string;
  highTemp: number;
  lowTemp: number;
  icon: LucideIcon;
  variant?:
  | "primary-subtle"
  | "warning-subtle"
  | "danger-subtle"
  | "tertiary-subtle"
  | "orange-subtle";
}

interface ForecastSummaryProps {
  forecasts: ForecastDay[];
  onViewFull?: () => void;
}

export default function ForecastSummary({
  forecasts,
  onViewFull,
}: ForecastSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between h-7">
        <Heading
          level={2}
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          5-Day Forecast
        </Heading>
        <Button
          onClick={onViewFull}
          size="sm"
          variant="plain"
          className="text-sm font-medium text-primary hover:text-blue-400 cursor-pointer"
        >
          View Full
        </Button>
      </div>

      <Stack className="bg-white dark:bg-card rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-card-border flex flex-col gap-3 h-full justify-between">
        {forecasts.map((forecast, index) => (
          <ForecastItem
            key={index}
            day={forecast.day}
            condition={forecast.condition}
            highTemp={forecast.highTemp}
            lowTemp={forecast.lowTemp}
            icon={forecast.icon}
            variant={forecast.variant}
          />
        ))}
      </Stack>
    </div>
  );
}
