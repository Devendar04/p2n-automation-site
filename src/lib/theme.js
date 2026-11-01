import { useCallback, useEffect, useState } from "react";

const KEY = "p2n-theme";

/** "light" | "dark" — reads what index.html already applied before first paint. */
const current = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#09090B" : "#FFFFFF");
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* private mode — theme still applies for this session */
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(current);

  // keep every toggle on the page in sync (navbar + drawer + admin)
  useEffect(() => {
    const sync = () => setTheme(current());
    window.addEventListener("p2n-theme-change", sync);
    return () => window.removeEventListener("p2n-theme-change", sync);
  }, []);

  const toggle = useCallback(() => {
    const next = current() === "dark" ? "light" : "dark";
    applyTheme(next);
    window.dispatchEvent(new Event("p2n-theme-change"));
  }, []);

  return { theme, toggle };
}
