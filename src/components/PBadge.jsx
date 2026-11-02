/**
 * The script "P" + star badge as inline SVG with a transparent background.
 * It is drawn in `currentColor`, so it follows the text colour of whatever it
 * sits in (black on the light theme, white on the dark theme).
 * Standalone copy: public/images/brand/footer-badge.svg
 */
export default function PBadge({ className = "" }) {
  return (
    <svg viewBox="0 0 97 92" className={className} role="img" aria-label="Script letter P over an outlined star">
      <polygon
        points="64.40,12.50 71.17,31.98 91.79,32.40 75.36,44.86 81.33,64.60 64.40,52.82 47.47,64.60 53.44,44.86 37.01,32.40 57.63,31.98"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.15"
      />
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24.00 39.50C23.92 38.38 23.08 35.33 23.50 32.75C23.92 30.17 24.48 27.08 26.50 24.00C28.52 20.92 32.17 16.83 35.62 14.25C39.08 11.67 43.40 9.83 47.25 8.50C51.10 7.17 55.27 6.54 58.75 6.25C62.23 5.96 65.35 5.88 68.12 6.75C70.90 7.62 73.60 9.29 75.38 11.50C77.15 13.71 78.44 17.08 78.75 20.00C79.06 22.92 78.25 25.67 77.25 29.00C76.25 32.33 74.71 36.29 72.75 40.00C70.79 43.71 68.33 47.58 65.50 51.25C62.67 54.92 59.25 58.75 55.75 62.00C52.25 65.25 48.25 68.25 44.50 70.75C40.75 73.25 36.58 75.46 33.25 77.00C29.92 78.54 26.75 79.62 24.50 80.00C22.25 80.38 20.96 79.83 19.75 79.25C18.54 78.67 17.71 77.46 17.25 76.50C16.79 75.54 17.04 74.00 17.00 73.50" strokeWidth="2.7" />
        <path d="M54.00 3.75C51.88 8.71 45.58 23.38 41.25 33.50C36.92 43.62 31.71 56.75 28.00 64.50C24.29 72.25 21.21 75.71 19.00 80.00C16.79 84.29 15.46 88.54 14.75 90.25" strokeWidth="2.3" />
      </g>
    </svg>
  );
}
