import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { CONTACT, SOCIAL_LINKS } from "../data/siteContent";
import PBadge from "./PBadge";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Vision", to: "/about#vision" },
  { label: "Works", to: "/works" },
  { label: "Careers", to: "/careers" },
  { label: "FAQ", to: "/blog#faq" },
];

const SERVICES = [
  { label: "Software Engineering", to: "/services/software" },
  { label: "Cloud Architecture", to: "/services/cloud" },
  { label: "Hardware / IoT", to: "/services/hardware" },
  { label: "Network Infrastructure", to: "/services/network" },
  { label: "Internships", to: "/contact#internship" },
];

const SOCIALS = [
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-mist border-t-2 border-zincline text-offwhite/70">
      <div className="container-page py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
<img src="/logo-mark.png" alt="" width="683" height="588" className="h-10 w-auto dark:hidden" />
            <img src="/logo-mark-dark.png" alt="" width="683" height="588" className="h-10 w-auto hidden dark:block" />
            <span className="font-display font-semibold text-offwhite text-lg uppercase">
              P2N Automation
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            P2N Automation — Udaipur, Rajasthan, India.
          </p>
        </div>

        <div>
          <h4 className="text-offwhite font-display text-sm font-semibold tracking-wide uppercase mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-acid transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-offwhite font-display text-sm font-semibold tracking-wide uppercase mb-4">
            Services
          </h4>
          <ul className="space-y-2.5 text-sm">
            {SERVICES.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-acid transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-offwhite font-display text-sm font-semibold tracking-wide uppercase mb-4">
            Follow Along
          </h4>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid place-items-center w-9 h-9 border-2 border-zincline hover:border-acid hover:text-acid transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <address className="mt-6 not-italic flex flex-col gap-3 text-sm normal-case">
            <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2.5 hover:text-acid transition-colors break-all">
              <Mail size={15} className="mt-0.5 shrink-0 text-acid" aria-hidden="true" />
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="flex items-start gap-2.5 hover:text-acid transition-colors">
              <Phone size={15} className="mt-0.5 shrink-0 text-acid" aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
            <p className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-acid" aria-hidden="true" />
              {CONTACT.address}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t-2 border-zincline">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-offwhite/65">
          <div className="flex items-center gap-3">
            <PBadge className="h-10 w-auto shrink-0 text-offwhite" />
            <span>© {new Date().getFullYear()} P2N Automation. All rights reserved.</span>
          </div>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-offwhite/70">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-offwhite/70">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
