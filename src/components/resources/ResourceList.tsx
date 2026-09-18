import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { directoryIndex, directoryLists, type DirectoryEntry } from "../../data/resources/lists";

function matches(entry: DirectoryEntry, q: string) {
  const hay = `${entry.name} ${entry.location} ${entry.phone ?? ""} ${entry.email ?? ""} ${entry.notes ?? ""}`.toLowerCase();
  return hay.includes(q);
}

export default function ResourceList({ slug }: { slug: string }) {
  const [q, setQ] = useState("");
  const entries = directoryLists[slug] ?? [];
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return entries;
    return entries.filter((e) => matches(e, query));
  }, [entries, q]);

  if (slug === "directory") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {directoryIndex.map((item) => (
          <Link
            key={item.slug}
            to={`/resources/${item.slug}`}
            className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-text-primary shadow-sm hover:border-primary/30"
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      <label className="relative block">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, city, or notes"
          className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
        />
      </label>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {filtered.map((entry) => (
          <article key={entry.name} className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <h3 className="font-display text-sm font-semibold text-text-primary">{entry.name}</h3>
            <p className="mt-1 text-xs text-text-secondary">{entry.location}</p>
            {entry.phone && <p className="mt-2 text-sm">{entry.phone}</p>}
            {entry.email && <p className="text-sm text-primary">{entry.email}</p>}
            {entry.notes && <p className="mt-2 text-xs text-text-secondary">{entry.notes}</p>}
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-text-secondary">No matching records in this sample list.</p>
        )}
      </div>
    </div>
  );
}
