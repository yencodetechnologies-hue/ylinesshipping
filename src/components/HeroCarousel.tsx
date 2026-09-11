import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  { src: "/images/banners/b1.jpeg", alt: "International Export — connecting your business to the world" },
  { src: "/images/banners/b2.jpeg", alt: "International Export Solutions — expand globally, deliver excellence" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border-2 border-white shadow-lg sm:aspect-[2/1] lg:aspect-[2.4/1]">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={slides[index].src}
            alt={slides[index].alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
