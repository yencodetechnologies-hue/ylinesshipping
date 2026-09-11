import { motion, AnimatePresence } from "framer-motion";

interface SplashProps {
  visible: boolean;
}

export default function Splash({ visible }: SplashProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#7EC8E8]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        >
          <motion.img
            src="/images/splash/splash.jpeg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(21,101,192,0.67) 0%, rgba(21,101,192,0.2) 16%, transparent 32%, transparent 58%, rgba(13,71,161,0.8) 100%)",
            }}
          />

          <div className="relative z-10 flex h-full w-full max-w-sm flex-col px-6 py-8 sm:max-w-md">
            <motion.p
              className="text-center font-display text-sm font-semibold tracking-[0.3em] text-white/90"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              YLINE
            </motion.p>
            <motion.h1
              className="mt-1 text-center font-display text-4xl font-bold leading-tight text-white sm:text-5xl"
              style={{ textShadow: "0 3px 16px rgba(0,0,0,0.4)" }}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Shipping
            </motion.h1>
            <motion.div
              className="mx-auto mt-2.5 h-[3px] w-14 rounded-full bg-secondary"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.p
              className="mt-2.5 text-center text-[13px] font-medium text-white/95"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Connecting Your Business to the World
            </motion.p>

            <div className="flex-1" />

            <motion.div
              className="flex flex-col items-center gap-3.5 pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <span className="h-7 w-7 animate-spin rounded-full border-[2.6px] border-white/30 border-t-secondary" />
              <p className="text-[13px] font-semibold tracking-wide text-white">
                Ship Globally. Grow Locally.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
