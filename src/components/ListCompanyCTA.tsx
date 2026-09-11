import { motion } from "framer-motion";
import { Building } from "lucide-react";

export default function ListCompanyCTA() {
  return (
    <section id="list-company" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-10 text-center shadow-sm">
        <p className="mb-5 max-w-md px-6 text-sm text-text-secondary">
          Join thousands of freight forwarders, carriers and agents already listed.
        </p>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 3, boxShadow: "0 0 0 0 rgba(8,46,107,1)" }}
          className="group relative"
          style={{ boxShadow: "0 6px 0 0 #082e6b" }}
        >
          <span className="relative flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-white transition-colors group-hover:bg-primary-light sm:px-14">
            <Building size={22} />
            <span className="font-playful text-xl tracking-wide sm:text-2xl">
              List Your Company for Free
            </span>
          </span>
        </motion.button>
      </div>
    </section>
  );
}
