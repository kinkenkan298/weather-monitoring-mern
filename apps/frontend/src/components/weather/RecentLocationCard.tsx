import { LucideIcon } from "lucide-react";

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
    <div
      className="bg-white dark:bg-card rounded-xl p-4 border border-gray-100 dark:border-card-border flex items-center justify-between cursor-pointer hover:border-primary transition-colors group"
      onClick={onClick}
    >
      <div className="flex flex-col">
        <span className="font-bold text-slate-900 dark:text-white">{city}</span>
        <span className="text-xs text-slate-500 dark:text-muted">
          {condition}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Icon size={20} className={iconColor} />
        <span className="text-lg font-bold text-slate-900 dark:text-white">
          {temperature}°
        </span>
      </div>
    </div>
  );
}
