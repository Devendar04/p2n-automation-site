import { useEffect } from "react";

/**
 * "Scroll-hover" for phones and tablets.
 *
 * Touch screens have no hover, so every :hover style on the site would never be seen.
 * On those screens this makes the element that is crossing the middle of the screen
 * behave as if it were hovered, and releases it as you scroll on.
 *
 * It is automatic and site-wide — no per-component work:
 *   1. Reads the page's own stylesheets and, for every rule that contains `:hover`
 *      (Tailwind `hover:*` and `group-hover:*` utilities, and any custom CSS), adds a
 *      twin rule that uses `[data-inview="true"]` instead of `:hover`.
 *   2. Finds every element those rules apply to and watches it with an
 *      IntersectionObserver, setting data-inview="true" while it is in the middle band.
 *
 * Active when the device has no hover (phones/tablets) OR the window is phone-width,
 * so it can also be previewed by narrowing a desktop browser. Mouse users on wider
 * windows keep ordinary hover.
 */
const MEDIA = "(hover: none), (max-width: 767px)";
const STYLE_ID = "p2n-scroll-hover";
const ATTR = "data-inview";

/** split "a, b:not(.c, .d), e" on top-level commas */
function splitSelectors(text) {
  const out = [];
  let depth = 0;
  let cur = "";
  for (const ch of text) {
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

// a real ":hover" pseudo-class — not the ":hover" inside an escaped class name such as
// `.sm\:hover\:bg-acid:hover` (there the colon is preceded by a backslash)
const HOVER = /(?<!\\):hover(?![\w-])/g;

const validSelector = (sel) => {
  try {
    document.createDocumentFragment().querySelector(sel);
    return true;
  } catch {
    return false;
  }
};

/** Build the twin CSS plus the list of selectors whose elements should be watched. */
function buildTwinRules() {
  const targets = new Set(); // selectors for the element that would be :hover-ed
  let css = "";

  const walk = (rules, wrappers) => {
    for (const rule of rules) {
      if (rule.type === 1 /* style rule */) {
        const sel = rule.selectorText;
        if (!sel || !new RegExp(HOVER.source).test(sel)) continue;
        const parts = splitSelectors(sel).filter((p) => new RegExp(HOVER.source).test(p));
        const twins = [];
        for (const part of parts) {
          // the thing being hovered is everything before each ":hover"
          for (const match of part.matchAll(HOVER)) {
            const before = part.slice(0, match.index).trim();
            if (before && validSelector(before)) targets.add(before);
          }
          twins.push(part.replace(HOVER, `[${ATTR}="true"]`));
        }
        const body = `${twins.join(",")}{${rule.style.cssText}}`;
        css += wrappers.reduceRight((inner, w) => `${w}{${inner}}`, body);
      } else if (rule.type === 4 /* @media */) {
        // "(hover: hover)" would hide the twin on touch screens — drop that condition
        const cond = rule.media.mediaText;
        const keep = /hover\s*:\s*hover/.test(cond) ? wrappers : [...wrappers, `@media ${cond}`];
        walk(rule.cssRules, keep);
      } else if (rule.type === 12 /* @supports */) {
        walk(rule.cssRules, [...wrappers, `@supports ${rule.conditionText}`]);
      } else if (rule.cssRules && rule.type !== 7 /* keyframes */) {
        walk(rule.cssRules, wrappers); // @layer and similar grouping rules
      }
    }
  };

  for (const sheet of document.styleSheets) {
    if (sheet.ownerNode?.id === STYLE_ID) continue;
    let rules;
    try {
      rules = sheet.cssRules; // cross-origin sheets (e.g. web fonts) throw — skip them
    } catch {
      continue;
    }
    walk(rules, []);
  }
  return { css, targets: [...targets] };
}

export default function ScrollHover() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const mq = window.matchMedia(MEDIA);

    let io = null;
    let mo = null;
    let raf = 0;
    let styleEl = null;
    let selector = "";
    let seen = new WeakSet();

    const scan = () => {
      if (!io || !selector) return;
      document.querySelectorAll(selector).forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    };

    const start = () => {
      const { css, targets } = buildTwinRules();
      if (!css) return;
      styleEl = document.getElementById(STYLE_ID) || document.createElement("style");
      styleEl.id = STYLE_ID;
      styleEl.textContent = css;
      document.head.appendChild(styleEl);
      // `inview:` utilities (explicit opt-in) are watched too
      selector = [...targets, '[class*="inview:"]'].join(",");

      seen = new WeakSet();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => e.target.setAttribute(ATTR, e.isIntersecting ? "true" : "false"));
        },
        // only the middle ~16% of the screen counts as "in view"
        { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
      );
      scan();
      // pages render after navigation, so keep picking up new elements
      mo = new MutationObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(scan);
      });
      mo.observe(document.body, { childList: true, subtree: true });
    };

    const stop = () => {
      io?.disconnect();
      mo?.disconnect();
      cancelAnimationFrame(raf);
      io = mo = null;
      document.querySelectorAll(`[${ATTR}]`).forEach((el) => el.removeAttribute(ATTR));
      document.getElementById(STYLE_ID)?.remove();
    };

    const sync = () => {
      stop();
      if (mq.matches) start();
    };

    // stylesheets must be loaded before they can be read
    const onLoad = () => sync();
    sync();
    if (document.readyState !== "complete") window.addEventListener("load", onLoad, { once: true });
    mq.addEventListener?.("change", sync);

    return () => {
      window.removeEventListener("load", onLoad);
      mq.removeEventListener?.("change", sync);
      stop();
    };
  }, []);

  return null;
}
