import { Ship } from "lucide-react";
import { footerLinks } from "../data/nav";

export default function Footer() {
  return (
    <footer id="footer" className="mt-auto bg-primary py-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          <Ship size={20} />
          <span className="font-display text-lg font-bold">Yline Shipping</span>
        </div>

        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#top"
              className="text-sm text-white/90 underline-offset-4 hover:underline"
            >
              {link}
            </a>
          ))}
        </nav>

        <p className="mt-8 text-center text-xs text-white/80">
          © {new Date().getFullYear()} Yline Shipping. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
