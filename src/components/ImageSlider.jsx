import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Responsive image slider.
 *  - Native scroll-snap → swipe on touch + trackpad; click-and-drag with a mouse
 *  - Arrow buttons, dot pagination and ←/→ keyboard support
 *  - Photos are never cropped: each sits `object-contain` over a blurred copy
 *    of itself, so portrait and landscape shots can share one frame
 *  - A single image renders with no controls
 *
 * Props
 *  images   [{ src, alt, width, height }]
 *  aspect   Tailwind aspect class for the frame (default 4/3)
 *  variant  "kinetic" (acid / void) | "paper" (graphite / post-it)
 *  label    accessible name for the carousel region
 *  eager    load the first slide immediately (above-the-fold usage)
 */
export default function ImageSlider({
  images,
  aspect = "aspect-[4/3]",
  variant = "kinetic",
  label = "Image gallery",
  eager = false,
  className = "",
}) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const count = images.length;
  const multiple = count > 1;

  const goTo = useCallback(
    (i) => {
      const el = trackRef.current;
      if (!el) return;
      const next = (i + count) % count;
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
    },
    [count]
  );

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  /* ---- mouse drag-to-scroll (touch/trackpad already scroll natively) ---- */
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e) => {
    if (!multiple || e.pointerType !== "mouse" || e.button !== 0) return;
    const el = trackRef.current;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture?.(e.pointerId);
    setDragging(true); // also switches snapping off so the track follows the cursor
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    trackRef.current.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = (e) => {
    if (!drag.current.active) return;
    const moved = e.type === "pointercancel" ? 0 : e.clientX - drag.current.startX;
    drag.current.active = false;
    setDragging(false);
    const el = trackRef.current;
    // a flick of ~15% of the frame moves one slide; otherwise snap back to the nearest
    const base = Math.round(drag.current.startLeft / el.clientWidth);
    const step = Math.abs(moved) > el.clientWidth * 0.15 ? (moved < 0 ? 1 : -1) : 0;
    goTo(Math.min(count - 1, Math.max(0, base + step)));
  };

  const handleKeyDown = (e) => {
    if (!multiple) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const isPaper = variant === "paper";
  const btn = isPaper
    ? "bg-postit text-graphite border-2 border-graphite hover:bg-graphite hover:text-postit"
    : "bg-void/80 text-offwhite border-2 border-zincline hover:bg-acid hover:text-void hover:border-acid";

  return (
    <div
      className={`relative ${aspect} overflow-hidden bg-void group ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={multiple ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`absolute inset-0 flex overflow-x-auto no-scrollbar select-none ${
          multiple ? (dragging ? "cursor-grabbing" : "cursor-grab") : ""
        } ${dragging ? "" : "snap-x snap-mandatory"}`}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="relative shrink-0 basis-full h-full snap-center"
          >
            {/* blurred backdrop fills the frame without cropping the photo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center blur-2xl scale-125 opacity-40"
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
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
            className={`absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 transition-colors ${btn}`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
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
                className={`h-2 transition-all border ${
                  isPaper ? "border-graphite" : "border-void"
                } ${
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
