import { MessageCircle, CalendarClock } from "lucide-react";
import { CONTACT } from "../data/siteContent";

const WHATSAPP_NUMBER = CONTACT.whatsappNumber;
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi P2N Automation, I'd like to know more about your services."
);

export default function FloatingActions({ onOpenScheduler }) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <button
        onClick={onOpenScheduler}
        className="group flex items-center gap-2 bg-acid text-void border-2 border-acid pl-4 pr-5 py-3 shadow-hard hover:bg-void hover:text-acid transition-colors"
      >
        <CalendarClock size={18} />
        <span className="text-sm font-semibold uppercase hidden sm:inline">Quick Contact</span>
      </button>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid place-items-center w-14 h-14 bg-void border-2 border-zincline text-offwhite shadow-hard hover:border-acid hover:text-acid transition-colors"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
