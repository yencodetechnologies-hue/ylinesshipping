import { motion } from "framer-motion";
import { Building2, MapPin, Star } from "lucide-react";
import { companies } from "../data/companies";

export default function FeaturedCompanies() {
  return (
    <section id="companies" className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">
              Featured Companies
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Verified logistics partners ready to move your cargo.
            </p>
          </div>
          <a
            href="#list-company"
            className="hidden shrink-0 text-sm font-semibold text-primary hover:underline sm:block"
          >
            View all
          </a>
        </div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
          {companies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="w-[260px] shrink-0 rounded-xl border border-border p-4 shadow-sm transition-shadow hover:shadow-md sm:w-[280px]"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 size={22} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] font-semibold text-text-primary">
                    {company.name}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-text-secondary">
                    <Star size={13} className="fill-secondary text-secondary" />
                    {company.rating}
                  </div>
                </div>
              </div>

              <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-text-secondary">
                {company.description}
              </p>

              <div className="mt-3 flex items-center gap-1 text-xs text-text-secondary">
                <MapPin size={13} /> {company.location}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {company.services.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="rounded bg-primary/8 px-2 py-0.5 text-[11px] font-medium text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
