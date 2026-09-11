const banners = Array.from(
  { length: 8 },
  (_, i) => `/images/banners/bottom_banner${i + 1}.png`,
);

const track = [...banners, ...banners];

export default function PartnersMarquee() {
  return (
    <div className="overflow-hidden bg-app-bg py-6">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-text-secondary">
        Trusted by logistics brands worldwide
      </p>
      <div className="flex w-max animate-marquee gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] hover:[animation-play-state:paused]">
        {track.map((src, i) => (
          <div
            key={i}
            className="flex h-[50px] w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-white bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            <img src={src} alt="" className="h-full w-full object-contain" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
