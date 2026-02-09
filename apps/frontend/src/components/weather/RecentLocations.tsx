import { LucideIcon, PlusCircleIcon } from "lucide-react";
import { Heading } from "../selia/heading";
import RecentLocationCard from "./RecentLocationCard";

export interface Location {
  city: string;
  condition: string;
  temperature: number;
  icon: LucideIcon;
  iconColor: string;
}

interface RecentLocationsProps {
  locations: Location[];
  onLocationClick?: (city: string) => void;
  onAddLocation?: () => void;
}

export default function RecentLocations({
  locations,
  onLocationClick,
  onAddLocation,
}: RecentLocationsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        level={2}
        className="text-xl font-bold text-slate-900 dark:text-white"
      >
        Recent Locations
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {locations.map((location, index) => (
          <RecentLocationCard
            key={index}
            city={location.city}
            condition={location.condition}
            temperature={location.temperature}
            icon={location.icon}
            iconColor={location.iconColor}
            onClick={() => onLocationClick?.(location.city)}
          />
        ))}
        <div
          className="bg-white dark:bg-card rounded-xl p-4 border border-dashed border-gray-300 dark:border-card-border flex items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-muted hover:text-primary"
          onClick={onAddLocation}
        >
          <div className="flex items-center gap-2">
            <PlusCircleIcon size={20} />
            <span className="text-sm font-bold">Add Location</span>
          </div>
        </div>
      </div>
    </div>
  );
}
