import { LucideIcon } from "lucide-react";
import { IconBox } from "../selia/icon-box";
import {
  Item,
  ItemAction,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../selia/item";

interface RecentLocationCardProps {
  city: string;
  condition: string;
  temperature: number;
  icon: LucideIcon;
  iconColor: string;
  onClick?: () => void;
}

export default function RecentLocationCard({
  city,
  condition,
  temperature,
  icon: Icon,
  iconColor,
  onClick,
}: RecentLocationCardProps) {
  return (
    <>
      <Item
        className="cursor-pointer hover:border-primary transition-colors group p-4"
        onClick={onClick}
      >
        <ItemContent>
          <ItemTitle>{city}</ItemTitle>
          <ItemDescription>{condition}</ItemDescription>
        </ItemContent>
        <ItemAction className="flex items-center gap-2">
          <IconBox variant="tertiary-subtle">
            <Icon size={20} className={iconColor} />
          </IconBox>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {temperature}°
          </span>
        </ItemAction>
      </Item>
    </>
  );
}
