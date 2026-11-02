import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Auto-scrolling image carousel (horizontal).
 *
 *  - Slides advance by themselves every few seconds and loop forever.
 *  - Autoplay pauses while the pointer is over it, while it has keyboard focus,
 *    for a few seconds after a touch, when it is off-screen and when the browser
 *    tab is hidden. It never autoplays for visitors who prefer reduced motion.
 *  - Still swipeable on touch, with arrows, dots and ←/→ keys.
 *  - Fixed frame size (taller on phones, so photos are big). Photos are never
 *    cropped: each sits `object-contain` over a blurred copy of itself.
 *  - One image = static frame, no controls.
 *
 * Props
 *  images    [{ src, alt, width, height }]
 *  aspect    Tailwind aspect classes for the frame
 *  variant   "kinetic" (default) | "paper"
 *  interval  ms between slides (default 3500)
 *  eager     load the first slide immediately (above-the-fold usage)
 */
export default function ImageCarousel({
  images,
  aspect = "aspect-[4/5] sm:aspect-[4/3]",
  variant = "kinetic",
  label = "Photos",
  eager = false,
  interval = 3000,
  className = "",
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const count = images.length;
  const multiple = count > 1;

  // reasons autoplay is currently paused
  const hold = useRef({
    hover: false,
    focus: false,
    touch: false,
    inView: false,
  });
  const touchTimer = useRef(0);

  const reducedMotion = () =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const goTo = useCallback(
    (i) => {
      const el = trackRef.current;
      if (!el) return;
      const next = ((i % count) + count) % count;
      el.scrollTo({
        left: next * el.clientWidth,
        behavior: reducedMotion() ? "auto" : "smooth",
      });
    },
    [count],
  );

  const current = () => {
    const el = trackRef.current;
    return el && el.clientWidth
      ? Math.round(el.scrollLeft / el.clientWidth)
      : 0;
  };

  // ---- autoplay ----
  useEffect(() => {
    if (!multiple || reducedMotion()) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        hold.current.inView = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    if (wrapRef.current) io.observe(wrapRef.current);

    let timer = 0;
    // random head start, so several carousels on one page don't move in lock-step
    const start = setTimeout(() => {
      timer = setInterval(() => {
        const h = hold.current;
        if (h.hover || h.focus || h.touch || !h.inView || document.hidden)
          return;
        goTo(current() + 1);
      }, interval);
    }, Math.random() * 1500);

    return () => {
      io.disconnect();
      clearTimeout(start);
      clearInterval(timer);
      clearTimeout(touchTimer.current);
    };
  }, [multiple, interval, goTo]);

  const handleScroll = () => setIndex(current());

  const handleKeyDown = (e) => {
    if (!multiple) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(current() + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(current() - 1);
    }
  };

  const onPointerEnter = (e) => {
    if (e.pointerType === "mouse") hold.current.hover = true;
  };
  const onPointerLeave = (e) => {
    if (e.pointerType === "mouse") hold.current.hover = false;
  };
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse") return;
    hold.current.touch = true;
    clearTimeout(touchTimer.current);
  };
  const onPointerUp = (e) => {
    if (e.pointerType === "mouse") return;
    // give the visitor a few seconds to look before autoplay resumes
    touchTimer.current = setTimeout(() => {
      hold.current.touch = false;
    }, 5000);
  };

  const isPaper = variant === "paper";
  const btn = isPaper
    ? "bg-postit text-graphite border-2 border-graphite hover:bg-graphite hover:text-postit"
    : "bg-void/80 text-offwhite border-2 border-zincline hover:bg-acid hover:text-void hover:border-acid";

  return (
    <div
      ref={wrapRef}
      className={`relative ${aspect} overflow-hidden bg-void ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={multiple ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onFocus={() => (hold.current.focus = true)}
      onBlur={() => (hold.current.focus = false)}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="absolute inset-0 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar"
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="relative shrink-0 basis-full h-full snap-center overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center blur-2xl scale-125 opacity-60"
              style={{ backgroundImage: `url(${img.src})` }}
            />
            <img
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading={eager && i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className="relative w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {multiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(current() - 1)}
            aria-label="Previous image"
            className={`absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 transition-colors ${btn}`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => goTo(current() + 1)}
            aria-label="Next image"
            className={`absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 transition-colors ${btn}`}
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={`h-2 transition-all border ${isPaper ? "border-graphite" : "border-void"} ${
                  i === index
                    ? `w-6 ${isPaper ? "bg-graphite" : "bg-acid"}`
                    : `w-2 ${isPaper ? "bg-postit" : "bg-offwhite/70"}`
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
