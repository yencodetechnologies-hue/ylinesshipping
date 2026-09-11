import { motion } from "framer-motion";
import { services } from "../data/services";

export default function ServiceGrid() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">
            Explore Our Services
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Everything you need to move cargo, worldwide.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {services.map((service, i) => (
          <motion.button
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md sm:p-5"
          >
            <span className="h-16 w-16 overflow-hidden rounded-xl border border-border bg-app-bg transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
              <img
                src={service.image}
                alt={service.label}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </span>
            <span>
              <p className="font-display text-sm font-semibold text-text-primary">
                {service.label}
              </p>
              <p className="mt-0.5 hidden text-xs text-text-secondary sm:block">
                {service.description}
              </p>
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
