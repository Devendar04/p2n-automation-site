import { Fragment } from "react";

/**
 * Tiny, safe renderer for admin-written text (no HTML is ever injected).
 *   blank line → new paragraph · "## " → heading · "- " lines → bullet list · **bold**
 */
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-offwhite">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function RichText({ text = "", className = "" }) {
  const blocks = String(text)
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className={`flex flex-col gap-5 normal-case ${className}`}>
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="font-display font-semibold uppercase text-offwhite text-xl sm:text-2xl mt-4 first:mt-0">
              {block.slice(3)}
            </h2>
          );
        }
        const lines = block.split("\n");
        if (lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i} className="flex flex-col gap-2.5 pl-5 list-disc marker:text-acid text-offwhite/80 leading-relaxed">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.trim().slice(2))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-offwhite/80 leading-relaxed whitespace-pre-line">
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}
