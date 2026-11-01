import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_STRUCTURE = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    items: [
      { label: "Press & Media", to: "/press" },
      { label: "Certificates", to: "/certificates" },
      { label: "Blog", to: "/blog" },
      { label: "FAQ", to: "/blog#faq" },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "Software Engineering", to: "/services/software" },
      { label: "Cloud Architecture", to: "/services/cloud" },
      { label: "Hardware / IoT", to: "/services/hardware" },
      { label: "Network Infrastructure", to: "/services/network" },
    ],
  },
  { label: "Vision", to: "/about#vision" },
  {
    label: "Works",
    items: [
      { label: "Enterprise Projects", to: "/works#enterprise" },
      { label: "Student Capstones", to: "/works#students" },
    ],
  },
  {
    label: "Contact Us",
    items: [
      { label: "Careers", to: "/careers" },
      { label: "Partners", to: "/partners" },
      { label: "Internship", to: "/contact#internship" },
    ],
  },
];

function DesktopDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const handleEnter = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  };

  if (!item.items) {
    return (
      <Link
        to={item.to}
        className="text-sm font-semibold uppercase tracking-wide text-offwhite/80 hover:text-acid transition-colors px-3 py-2"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-offwhite/80 hover:text-acid transition-colors px-3 py-2"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2 min-w-[210px]">
          <div className="border-2 border-zincline bg-void">
            {item.items.map((sub) => (
              <Link
                key={sub.label}
                to={sub.to}
                className="block px-4 py-3 text-sm text-offwhite/75 hover:text-void hover:bg-acid transition-colors border-b border-zincline last:border-b-0"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileAccordionItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false);

  if (!item.items) {
    return (
      <Link
        to={item.to}
        onClick={onNavigate}
        className="block py-4 text-lg font-semibold uppercase text-offwhite border-b-2 border-zincline"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b-2 border-zincline">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-lg font-semibold uppercase text-offwhite"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown size={18} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-3 pl-3 flex flex-col gap-1">
          {item.items.map((sub) => (
            <Link key={sub.label} to={sub.to} onClick={onNavigate} className="py-2.5 text-sm text-offwhite/65">
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-void border-b-2 border-zincline">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0">
<img src="/logo-mark.png" alt="" width="683" height="588" className="h-9 w-auto dark:hidden" />
          <img src="/logo-mark-dark.png" alt="" width="683" height="588" className="h-9 w-auto hidden dark:block" />
          <span className="font-display font-semibold text-offwhite text-lg uppercase tracking-tight">
            P2N Automation
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_STRUCTURE.map((item) => (
            <DesktopDropdown key={item.label} item={item} />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/contact#internship"
            className="text-xs font-hand text-graphite bg-postit border-2 border-graphite px-4 py-2 -rotate-2 hover:rotate-0 transition-transform"
          >
            Apply for Internships
          </Link>
          <Link
            to="/services"
            className="text-sm font-semibold uppercase text-void bg-acid px-4 py-2 border-2 border-acid hover:bg-void hover:text-acid transition-colors"
          >
            Hire Us
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setDrawerOpen(true)} className="text-offwhite p-2 -mr-2" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/70" onClick={() => setDrawerOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-void border-l-2 border-zincline px-6 pt-6 pb-10 overflow-y-auto transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-display font-semibold text-offwhite text-lg uppercase">Menu</span>
            <button onClick={() => setDrawerOpen(false)} className="text-offwhite p-2 -mr-2" aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          {NAV_STRUCTURE.map((item) => (
            <MobileAccordionItem key={item.label} item={item} onNavigate={() => setDrawerOpen(false)} />
          ))}
          <div className="flex flex-col gap-3 mt-6">
            <Link
              to="/contact#internship"
              onClick={() => setDrawerOpen(false)}
              className="text-center text-sm font-hand text-graphite bg-postit border-2 border-graphite px-4 py-3"
            >
              Apply for Internships
            </Link>
            <Link
              to="/services"
              onClick={() => setDrawerOpen(false)}
              className="text-center text-sm font-semibold uppercase text-void bg-acid px-4 py-3 border-2 border-acid"
            >
              Hire Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
