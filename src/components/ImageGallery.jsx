/**
 * Fixed (non-scrolling) image gallery.
 *
 *  - Every photo is visible at once — nothing scrolls or swipes.
 *  - Photos are never cropped: each sits `object-contain` over a blurred copy of
 *    itself, so portrait and landscape shots can share a frame.
 *  - Mobile: images stack full-width, so they are as large as the screen allows.
 *    ≥ sm: 1 image = full width · 2 images = side by side ·
 *    3+ images = the widest photo spans the top, the rest sit below it.
 *
 * Props
 *  images    [{ src, alt, width, height }]
 *  variant   "kinetic" (default) | "paper"  → colour of the thin divider lines
 *  uncapped  let a single tall image (e.g. a press clipping) grow to full height
 *  eager     load the first image immediately (above-the-fold usage)
 */
const ratioOf = (img) => (img.width && img.height ? img.width / img.height : 4 / 3);

/** Tile shape that suits this set of photos: tall for portraits, wide for landscapes. */
const tileRatio = (imgs) => {
  const avg = imgs.reduce((sum, i) => sum + ratioOf(i), 0) / imgs.length;
  return Math.min(1.33, Math.max(0.8, avg));
};

function Frame({ img, ratio, maxHeight, eager = false, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-void ${className}`}
      style={{ aspectRatio: ratio, maxHeight }}
    >
      {/* blurred copy fills the frame so the real photo never has to be cropped */}
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
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="relative block w-full h-full object-contain"
      />
    </div>
  );
}

export default function ImageGallery({
  images,
  variant = "kinetic",
  label = "Photos",
  eager = false,
  uncapped = false,
  className = "",
}) {
  if (!images?.length) return null;

  const divider = variant === "paper" ? "bg-graphite" : "bg-zincline";
  const cap = uncapped ? undefined : "34rem";
  const grid = `grid grid-cols-1 sm:grid-cols-2 gap-[2px] ${divider}`;

  let body;
  if (images.length === 1) {
    body = <Frame img={images[0]} ratio={ratioOf(images[0])} maxHeight={cap} eager={eager} />;
  } else if (images.length === 2) {
    const tile = tileRatio(images);
    body = (
      <div className={grid}>
        {images.map((img, i) => (
          <Frame key={img.src} img={img} ratio={tile} eager={eager && i === 0} />
        ))}
      </div>
    );
  } else {
    // the widest photo becomes the banner; the others follow in their original order
    const heroIdx = images.reduce((best, img, i) => (ratioOf(img) > ratioOf(images[best]) ? i : best), 0);
    const hero = images[heroIdx];
    const rest = images.filter((_, i) => i !== heroIdx);
    const tile = tileRatio(rest);
    body = (
      <div className={grid}>
        <Frame
          img={hero}
          ratio={Math.max(ratioOf(hero), 1.2)}
          maxHeight={cap}
          eager={eager}
          className="sm:col-span-2"
        />
        {rest.map((img) => (
          <Frame key={img.src} img={img} ratio={tile} />
        ))}
      </div>
    );
  }

  return (
    <div role="group" aria-label={label} className={`bg-void ${className}`}>
      {body}
    </div>
  );
}
