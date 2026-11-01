import { useEffect } from "react";

/** Sets <title> and the meta description for the current page (client-side SEO). */
export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = `${title} | P2N Automation`;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
      }
      m.setAttribute("content", description);
    }
  }, [title, description]);
}
