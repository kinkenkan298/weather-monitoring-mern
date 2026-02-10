import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  LucideIcon,
  Sun,
} from "lucide-react";

export function getWeatherCondition(code: number): {
  condition: string;
  icon: LucideIcon;
  variant?:
  | "primary-subtle"
  | "warning-subtle"
  | "danger-subtle"
  | "tertiary-subtle"
  | "orange-subtle";
} {
  switch (code) {
    case 0:
      return { condition: "Clear Sky", icon: Sun, variant: "orange-subtle" };
    case 1:
      return {
        condition: "Mainly Clear",
        icon: CloudSun,
        variant: "warning-subtle",
      };
    case 2:
      return {
        condition: "Partly Cloudy",
        icon: CloudSun,
        variant: "warning-subtle",
      };
    case 3:
      return { condition: "Overcast", icon: Cloud, variant: "orange-subtle" };
    case 45:
    case 48:
      return { condition: "Foggy", icon: CloudFog, variant: "primary-subtle" };
    case 51:
    case 53:
    case 55:
      return {
        condition: "Drizzle",
        icon: CloudDrizzle,
        variant: "warning-subtle",
      };
    case 61:
    case 63:
    case 65:
      return { condition: "Rain", icon: CloudRain, variant: "tertiary-subtle" };
    case 71:
    case 73:
    case 75:
      return { condition: "Snow", icon: CloudSnow, variant: "primary-subtle" };
    case 77:
      return {
        condition: "Snow Grains",
        icon: CloudSnow,
        variant: "primary-subtle",
      };
    case 80:
    case 81:
    case 82:
      return {
        condition: "Rain Showers",
        icon: CloudRain,
        variant: "primary-subtle",
      };
    case 85:
    case 86:
      return {
        condition: "Snow Showers",
        icon: CloudSnow,
        variant: "primary-subtle",
      };
    case 95:
    case 96:
    case 99:
      return {
        condition: "Thunderstorm",
        icon: CloudLightning,
        variant: "primary-subtle",
      };
    default:
      return { condition: "Unknown", icon: Cloud, variant: "tertiary-subtle" };
  }
}
