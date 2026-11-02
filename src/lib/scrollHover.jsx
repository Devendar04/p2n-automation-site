import { useEffect } from "react";

/**
 * Touch screens have no hover, so cards would never show their hover styling.
 * On those devices this marks whichever card is crossing the middle band of the
 * screen with data-inview="true"; Tailwind's `inview:` / `group-inview:` variants
 * (see tailwind.config.js) then reuse the card's hover look while it is there,
 * and release it as the card scrolls away.
 *
 * Observed elements: anything whose class list contains an `inview:` utility,
 * plus every `.group` (the parent of `group-inview:` children).
 */
const SELECTOR = '[class*="inview:"], .group';

export default function ScrollHover() {
  useEffect(() => {
    // desktop / mouse devices keep the normal :hover behaviour
    if (!window.matchMedia("(hover: none)").matches) return undefined;
    if (!("IntersectionObserver" in window)) return undefined;

    const seen = new WeakSet();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.dataset.inview = e.isIntersecting ? "true" : "false";
        });
      },
      // only the middle ~16% of the screen counts as "in view"
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    const scan = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });

    scan();
    let raf = 0;
    // pages render after navigation, so keep picking up new cards
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
