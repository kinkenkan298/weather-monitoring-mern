import { LucideIcon } from "lucide-react";
import { IconBox } from "../selia/icon-box";
import {
  Item,
  ItemAction,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../selia/item";

interface ForecastItemProps {
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

export default function ForecastItem({
  day,
  condition,
  highTemp,
  lowTemp,
  icon: Icon,
  variant,
}: ForecastItemProps) {
  return (
    <>
      <Item
        className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
        variant="outline"
      >
        <ItemMedia className="flex flex-col group-hover:scale-110 transition-transform">
          <IconBox
            variant={variant}
            className="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <Icon size={20} />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{day}</ItemTitle>
          <ItemDescription>{condition}</ItemDescription>
        </ItemContent>
        <ItemAction>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {highTemp}°
          </span>
          <span className="text-slate-400 dark:text-slate-600">{lowTemp}°</span>
        </ItemAction>
      </Item>
    </>
  );
}
