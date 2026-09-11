import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Home, UserPlus, LogIn, ChevronRight, Ship } from "lucide-react";
import { serviceMenuLinks } from "../data/nav";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Companies", href: "#companies" },
  { label: "List Your Company", href: "#list-company" },
  { label: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header
        id="top"
        className={`sticky top-0 z-50 bg-white transition-shadow ${
          scrolled ? "shadow-md shadow-black/5" : "shadow-none"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2 shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <Ship size={20} strokeWidth={2.25} />
            </span>
            <span className="font-display text-lg font-bold text-text-primary">
              Yline <span className="text-primary">Shipping</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-text-primary/80 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button className="rounded-lg px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/5">
              Login
            </button>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-light">
              Register
            </button>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-black/5 lg:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[70] flex w-[82%] max-w-xs flex-col overflow-y-auto bg-white shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            >
              <div className="relative bg-primary px-5 py-7">
                <button
                  aria-label="Close menu"
                  onClick={closeDrawer}
                  className="absolute right-4 top-4 text-white/80 hover:text-white"
                >
                  <X size={22} />
                </button>
                <p className="font-display text-xl font-bold text-white">Yline Shipping</p>
                <p className="mt-1 text-sm text-white/90">Contact: info@yline.shipping</p>
              </div>

              <a
                href="#top"
                onClick={closeDrawer}
                className="flex items-center gap-3 px-5 py-3.5 text-[15px] font-medium text-primary"
              >
                <Home size={19} /> Home
              </a>
              <div className="mx-5 border-t border-border" />

              <p className="px-5 pt-4 pb-1 text-sm font-bold text-primary">Services</p>
              {serviceMenuLinks.map((label) => (
                <a
                  key={label}
                  href="#services"
                  onClick={closeDrawer}
                  className="flex items-center justify-between px-5 py-3 text-[15px] text-text-primary hover:bg-black/[0.03]"
                >
                  {label}
                  <ChevronRight size={14} className="text-secondary" />
                </a>
              ))}

              <div className="mx-5 border-t border-border" />
              <button className="flex items-center gap-3 px-5 py-3.5 text-left text-[15px] font-medium text-text-primary hover:bg-black/[0.03]">
                <UserPlus size={19} /> Register
              </button>
              <button className="flex items-center gap-3 px-5 py-3.5 text-left text-[15px] font-medium text-text-primary hover:bg-black/[0.03]">
                <LogIn size={19} /> Login
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
