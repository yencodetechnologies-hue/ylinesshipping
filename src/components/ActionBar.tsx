import { PlusCircle, Search, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function ActionBar() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-sm sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <input
            type="search"
            aria-label="Search services, companies, ports"
            placeholder="Search services, companies, ports…"
            className="w-full rounded-lg border border-border bg-app-bg py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </label>

        <div className="flex gap-2 sm:shrink-0">
          <Link
            to="/post-enquiry"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-secondary-dark sm:flex-none sm:text-sm"
          >
            <PlusCircle size={16} /> Post Enquiry
          </Link>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-light sm:flex-none sm:text-sm">
            <Send size={15} /> Send Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
