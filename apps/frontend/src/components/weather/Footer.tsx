export default function Footer() {
  return (
    <footer className="mt-8 py-6 border-t border-gray-200 dark:border-separator flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-muted">
      <p>© 2023 WeatherApp. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a className="hover:text-slate-900 dark:hover:text-white" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-slate-900 dark:hover:text-white" href="#">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
