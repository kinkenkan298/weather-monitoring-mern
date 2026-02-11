import { LucideIcon } from "lucide-react";
import { IconBox } from "../selia/icon-box";
import {
  Item,
  ItemAction,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../selia/item";
import { IconVariant } from "@/types/icon-variant";

interface RecentLocationCardProps {
  city: string;
  condition: string;
  temperature: number;
  icon: LucideIcon;
  variant?: IconVariant;
}

export default function RecentLocationCard({
  city,
  condition,
  temperature,
  icon: Icon,
  variant,
}: RecentLocationCardProps) {
  return (
    <>
      <Item className="cursor-pointer hover:border-primary transition-colors group p-4">
        <ItemContent>
          <ItemTitle>{city}</ItemTitle>
          <ItemDescription>{condition}</ItemDescription>
        </ItemContent>
        <ItemAction className="flex items-center gap-2">
          <IconBox variant={variant}>
            <Icon size={20} />
          </IconBox>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {temperature}°
          </span>
        </ItemAction>
      </Item>
    </>
  );
}
