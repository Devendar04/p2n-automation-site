import { useState } from "react";
import { Link } from "react-router-dom";
import { Code2, Cloud, Cpu, Network, ArrowUpRight, Pin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";

const MARQUEE_ITEMS = [
  "REACT", "NODE.JS", "SUPABASE", "EMBEDDED C", "1ST PRIZE · TIE GLOBAL SUMMIT",
  "PYTHON", "AWS", "ISO 9001:2015", "TYPESCRIPT", "KUBERNETES",
  "ISTART RAJASTHAN", "MSME REGISTERED",
];

function Marquee({ reverse }) {
  const items = reverse ? [...MARQUEE_ITEMS].reverse() : MARQUEE_ITEMS;
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y-2 border-zincline bg-void py-3">
      <div className={`flex gap-8 w-max ${reverse ? "animate-marqueeReverse" : "animate-marquee"}`}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-offwhite/70 whitespace-nowrap">
            {item}
            <span className="text-acid">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  { slug: "software", icon: Code2, title: "Software Engineering", description: "Full-stack platforms and internal tooling built for scale." },
  { slug: "cloud", icon: Cloud, title: "Cloud Architecture", description: "Infrastructure design and migration for teams that can't afford downtime." },
  { slug: "hardware", icon: Cpu, title: "Hardware / IoT", description: "Sensor networks and embedded firmware, prototype to production." },
  { slug: "network", icon: Network, title: "Network Infrastructure", description: "Enterprise networking, security, and on-site rollouts." },
];

const ACADEMY_TRACKS = [
  { title: "Software Track", note: "12 weeks · React + Node", rotate: "-rotate-2" },
  { title: "Hardware Track", note: "12 weeks · IoT + Firmware", rotate: "rotate-1" },
  { title: "AI & Automation", note: "12 weeks · ML basics to deploy", rotate: "-rotate-1" },
];

export default function Home() {
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-16 overflow-hidden">
        <div className="container-page py-20 sm:py-28">
          <div className="relative">
            <h1 className="kinetic-headline text-[clamp(2.75rem,8vw,7rem)] text-offwhite">
              We build
              <br />
              <span className="font-hand normal-case tracking-normal text-acid -rotate-1 inline-block">enterprise</span> tech.
              <br />
              We <span className="font-hand normal-case tracking-normal text-offwhite rotate-1 inline-block">train</span> the
              <br />
              <span className="font-hand normal-case tracking-normal text-offwhite -rotate-1 inline-block">engineers</span> who're next.
            </h1>

            {/* Hand-drawn post-it annotation */}
            <div className="absolute -top-4 right-0 sm:right-10 hidden sm:block">
              <div className="wobble-1 bg-postit border-2 border-graphite shadow-hard-sm px-4 py-3 rotate-3 max-w-[190px]">
                <p className="font-hand text-sm text-graphite leading-snug flex items-start gap-1">
                  <Pin size={12} className="mt-1 shrink-0" />
                  interns ship real client work, not busywork
                </p>
              </div>
            </div>

            {/* Sketch note between the two headline halves */}
            <div className="relative mt-5 xl:mt-0 xl:absolute xl:right-16 xl:top-[26%] xl:w-[240px] -rotate-2">
              <p className="font-hand text-sm sm:text-base text-acid/90 leading-snug">
                ~ same backlog, same bench ~
              </p>
              <svg
                width="120"
                height="14"
                viewBox="0 0 120 14"
                fill="none"
                className="mt-0.5 text-acid/70"
              >
                <path
                  d="M2 8C20 2 40 12 60 6C80 0 100 10 118 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <p className="mt-8 text-offwhite/60 text-base sm:text-lg max-w-xl leading-relaxed font-normal normal-case tracking-normal">
            P2N Automation delivers production-grade software, cloud, and
            hardware for B2B clients — and runs the training floor where high
            school and college students learn by building that same work.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-acid text-void text-sm font-semibold uppercase px-6 py-3.5 border-2 border-acid hover:bg-void hover:text-acid transition-colors"
            >
              Hire Us for Projects <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/contact#internship"
              className="inline-flex items-center gap-2 font-hand text-graphite bg-postit border-2 border-graphite px-6 py-3.5 shadow-hard-sm rotate-1 hover:rotate-0 transition-transform"
            >
              Apply for Internships
            </Link>
          </div>
        </div>

        <Marquee />
        <Marquee reverse />
      </section>

      {/* SERVICES — Kinetic dark cards */}
      <section className="container-page py-20 sm:py-24">
        <h2 className="kinetic-headline text-3xl sm:text-4xl text-offwhite mb-12">
          Core Services
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-zincline">
          {SERVICES.map(({ slug, icon: Icon, title, description }, i) => (
            <Link
              key={title}
              to={`/services/${slug}`}
              className={`group relative p-7 border-zincline ${
                i !== SERVICES.length - 1 ? "sm:border-r-2" : ""
              } ${i % 2 === 0 ? "border-b-2 sm:border-b-0" : "border-b-2 lg:border-b-0"} bg-void hover:bg-acid transition-colors duration-200`}
            >
              <Icon size={28} className="text-acid group-hover:text-void mb-6 transition-colors" strokeWidth={1.5} />
              <h3 className="font-display font-semibold uppercase text-offwhite group-hover:text-void text-lg mb-2 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-offwhite/70 group-hover:text-void/80 leading-relaxed normal-case transition-colors">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ACADEMY — dark unified canvas, paper cards float on top */}
      <section className="bg-mist border-t-2 border-zincline py-20 sm:py-24">
        <div className="container-page">
          <span className="inline-block font-hand text-sm text-graphite bg-postit border-2 border-graphite shadow-[3px_3px_0px_0px_#111111] px-4 py-1.5 -rotate-2 mb-6">
            ★ Student Workspace
          </span>

          <h2 className="font-display font-bold uppercase text-offwhite text-3xl sm:text-5xl tracking-tight mb-3">
            The Academy &amp; Internships
          </h2>
          <p className="font-note text-[#5B6573] text-xl mb-12 max-w-xl">
            Same backlog as our clients. Real mentorship, real deadlines,
            a real certificate at the end.
          </p>

          <div className="grid sm:grid-cols-3 gap-10">
            {ACADEMY_TRACKS.map((track) => (
              <div key={track.title} className={`relative ${track.rotate}`}>
                {/* tape strip */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-postit/70 border border-graphite/20 shadow-sm -rotate-3 z-10" />
                <div
                  className="relative bg-[#F7FAFF] text-[#111111] border-[3px] border-[#111111] shadow-[5px_5px_0px_0px_#111111] px-6 py-8"
                  style={{
                    borderRadius:
                      "255px 15px 225px 15px / 15px 225px 15px 255px",
                  }}
                >
                  <h3 className="font-hand text-2xl mb-2">{track.title}</h3>
                  <p className="font-note text-[#111111]/60">{track.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Link
              to="/contact#internship"
              className="inline-flex items-center gap-2 bg-[#FF4D4D] text-white font-hand text-lg px-6 py-3 border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] -rotate-1 hover:rotate-0 hover:-translate-y-0.5 transition-transform"
              style={{
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              }}
            >
              Apply Now →
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
