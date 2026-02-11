import { CloudFog } from "lucide-react";
import { IconBox } from "./selia/icon-box";

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-separator bg-white dark:bg-background px-10 py-3 sticky top-0">
      <div className="flex items-center gap-4 text-slate-900 dark:text-white">
        <IconBox>
          <CloudFog />
        </IconBox>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          WeatherApp
        </h2>
      </div>
    </header>
  );
}
