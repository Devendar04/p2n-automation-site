import { Sun, Moon } from "lucide-react";
import { useTheme } from "../lib/theme";

/** Light / dark switch. Shows the icon of the theme you will switch TO. */
export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`grid place-items-center w-9 h-9 border-2 border-zincline text-offwhite/80 hover:border-acid hover:text-acid transition-colors ${className}`}
    >
      {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}
