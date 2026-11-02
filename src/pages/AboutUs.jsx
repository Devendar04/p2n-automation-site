import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import { TEAM, CERTIFICATIONS, PRESS_ITEMS } from "../data/siteContent";

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

const PATENTS = [
  { label: "Low-power mesh sensor array for industrial IoT", status: "Granted" },
  { label: "Adaptive load-balancing method for edge gateways", status: "Filed" },
  { label: "Student progress-tracking engine for technical cohorts", status: "Filed" },
];

// Highlights only — the full list lives on /press
const PRESS_HIGHLIGHT_IDS = ["tie-global-summit", "itms-media-coverage", "tiecon-udaipur"];
const PRESS = PRESS_HIGHLIGHT_IDS.map((id) => PRESS_ITEMS.find((i) => i.id === id)).filter(Boolean);

export default function AboutUs() {
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* HERO */}
      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-20 sm:py-24 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-acid">About P2N Automation</span>
          <h1 className="kinetic-headline mt-4 text-3xl sm:text-6xl text-offwhite">
            Build for clients.
            <br />
            Train the builders.
          </h1>
          <p className="mt-6 text-offwhite/60 text-lg leading-relaxed normal-case font-normal tracking-normal">
            We started P2N Automation on a simple bet: the best way to train
            engineers is to let them work on real, paying client problems —
            supervised, mentored, and shipped.
          </p>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="container-page py-16 sm:py-20 border-b-2 border-zincline">
        <div className="grid lg:grid-cols-2 gap-0 border-2 border-zincline">
          <div className="p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-zincline">
            <h2 className="font-display font-semibold uppercase text-xl text-acid mb-3">Our Mission</h2>
            <p className="text-offwhite/60 leading-relaxed normal-case">
              Deliver software and hardware that enterprise teams can depend
              on, built in the open by engineers — senior and student —
              working the same backlog.
            </p>
          </div>
          <div className="p-8">
            <h2 className="font-display font-semibold uppercase text-xl text-acid mb-3">Our Vision</h2>
            <p className="text-offwhite/60 leading-relaxed normal-case">
              A future where "entry-level" doesn't mean untested — where
              every student who trains with us has already shipped
              production work before their first full-time offer.
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="container-page py-16 sm:py-20 border-b-2 border-zincline">
        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">Leadership</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {TEAM.map((member) => (
            <div key={member.name} className="border-2 border-zincline p-7 flex items-center gap-5">
              <div
                aria-hidden="true"
                className="w-20 h-20 shrink-0 grid place-items-center bg-acid text-void font-display font-bold text-2xl border-2 border-zincline"
              >
                {initials(member.name)}
              </div>
              <div>
                <h3 className="font-display font-semibold text-offwhite text-lg uppercase">{member.name}</h3>
                <p className="text-sm text-acid font-semibold uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CREDIBILITY GRID */}
      <section className="container-page py-16 sm:py-20">
        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">Credibility &amp; Trust</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          <div id="certificates">
            <h3 className="font-display font-semibold uppercase text-offwhite mb-4">Certificates</h3>
            <ul className="flex flex-col gap-3">
              {CERTIFICATIONS.map((c) => (
                <li key={c.id} className="relative">
                  <div className="border-2 border-zincline px-4 py-3 text-sm text-offwhite/70 uppercase font-semibold">
                    {c.title}
                  </div>
                  <span className="absolute -top-2 -right-2 wobble-2 bg-postit border border-graphite text-[10px] font-hand text-graphite px-2 py-0.5 rotate-6">
                    verified
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold uppercase text-offwhite mb-4">Patents &amp; IP</h3>
            <ul className="flex flex-col gap-3">
              {PATENTS.map((p) => (
                <li key={p.label} className="border-2 border-zincline px-4 py-3">
                  <p className="text-sm text-offwhite/70 normal-case">{p.label}</p>
                  <span
                    className={`inline-block mt-2 text-xs font-semibold uppercase px-2 py-0.5 ${
                      p.status === "Granted" ? "bg-acid text-void" : "border border-zincline text-offwhite/65"
                    }`}
                  >
                    {p.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div id="press">
            <h3 className="font-display font-semibold uppercase text-offwhite mb-4">Press &amp; Media</h3>
            <ul className="flex flex-col gap-3">
              {PRESS.map((p) => (
                <li key={p.id}>
                  <Link to={`/press#${p.id}`} className="group flex items-start justify-between gap-3 border-2 border-zincline px-4 py-3 hover:border-acid inview:border-acid transition-colors">
                    <div>
                      <span className="text-xs font-semibold uppercase text-acid">{p.event}</span>
                      <p className="text-sm text-offwhite/70 mt-1 leading-snug normal-case">{p.heading}</p>
                    </div>
                    <ExternalLink size={14} className="text-offwhite/65 shrink-0 mt-1 group-hover:text-acid group-inview:text-acid" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/press" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase text-acid hover:text-offwhite transition-colors">
              All press &amp; achievements <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
