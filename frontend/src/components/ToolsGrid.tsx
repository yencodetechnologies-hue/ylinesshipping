import { Link } from "react-router-dom";
import { tools } from "../data/tools";

const track = [...tools, ...tools];

export default function ToolsGrid() {
  return (
    <section id="resources" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">
          Trade Resources
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Tools, directories, and reference lists for exporters and logistics teams.
        </p>
      </div>

      <div className="overflow-hidden [container-type:inline-size]">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-3 hover:[animation-play-state:paused] sm:gap-4">
          {track.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Link
                key={`${tool.id}-${i}`}
                to={`/resources/${tool.slug}`}
                className="group flex w-[calc((100cqi-5*0.75rem)/6)] shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-[#29b6f6] p-2 text-center shadow-sm transition-colors hover:bg-[#03a9f4] sm:w-[calc((100cqi-5*1rem)/6)] sm:gap-2 sm:p-3"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-white/40 sm:h-16 sm:w-16">
                  <Icon size={32} strokeWidth={1.75} />
                </span>
                <span className="font-display text-[11px] font-semibold leading-tight text-white sm:text-xs">
                  {tool.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
