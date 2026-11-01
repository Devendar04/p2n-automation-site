import { useState, useMemo } from "react";
import { ShieldCheck, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import ImageSlider from "../components/ImageSlider";
import { PROJECTS, PROJECT_FILTERS as FILTERS } from "../data/siteContent";

const TICKER_ITEMS = [
  {
    quote: "P2N delivered our IoT firmware 3 weeks ahead of deadline.",
    author: "Tech Director, Jaipur Labs",
  },
  {
    quote: "Best full-stack engineering team we have worked with.",
    author: "Founder, Automation Works",
  },
  {
    quote: "The student capstone project turned into a patent-pending product!",
    author: "Director, Academic Partner",
  },
  {
    quote: "Cloud migration finished with zero downtime, ahead of schedule.",
    author: "VP Engineering, Nimbus Retail",
  },
  {
    quote: "Their hardware bench feels like an in-house team, not a vendor.",
    author: "Head of Product, Delta Sensors",
  },
];

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden bg-acid border-y-2 border-graphite">
      <div className="flex gap-0 w-max animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-sm font-semibold text-void px-8 py-3 border-r-2 border-graphite/20 whitespace-nowrap"
          >
            <span className="tracking-tight">★★★★★</span>
            <span>"{item.quote}"</span>
            <span className="font-normal normal-case text-void/70">— {item.author}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    quote: "P2N's team embedded with ours for six weeks and it genuinely felt like an internal squad, not an agency.",
    author: "Ritika Shah",
    role: "VP Engineering, Nimbus Retail",
    verified: true,
  },
  {
    quote: "We came in wanting a vendor and left with a long-term hardware partner.",
    author: "Arjun Mehta",
    role: "Founder, Automation Works",
    verified: true,
  },
  {
    quote: "The interns on our capstone project outperformed some full-time hires we've made elsewhere.",
    author: "Dr. Kavita Rao",
    role: "Director, Academic Partner Program",
    verified: true,
  },
];

function ProjectCard({ project }) {
  return (
    <article id={project.id} className="relative scroll-mt-24 -rotate-1 hover:rotate-0 transition-transform">
      {/* tape strip sits outside the clipped card so it isn't cut off */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-postit/80 border border-graphite/20 shadow-sm -rotate-2 z-10" />

      <div className="wobble-1 bg-[#F7FAFF] border-[3px] border-graphite shadow-[5px_5px_0px_0px_#111111] overflow-hidden h-full flex flex-col">
        <ImageSlider
          images={project.images}
          variant="paper"
          label={`${project.title} images`}
          className="border-b-[3px] border-graphite"
        />

        <div className="p-6 flex flex-col flex-1">
          <span className="inline-block w-fit font-hand text-xs text-graphite bg-postit border border-graphite px-2.5 py-1 -rotate-1 mb-3">
            {project.tag}
          </span>

          <p className="text-xs font-note uppercase tracking-wide text-graphite/65 mb-1">
            {project.title}
          </p>
          <h3 className="font-hand text-2xl text-graphite mb-3 leading-snug">
            <span aria-hidden="true" className="mr-1.5">{project.emoji}</span>
            {project.heading}
          </h3>

          <p className="text-sm font-note text-graphite/70 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function TestimonialBubble({ t }) {
  return (
    <div
      className="relative bg-[#F7FAFF] border-[3px] border-graphite shadow-[4px_4px_0px_0px_#111111] p-6"
      style={{ borderRadius: "30px 30px 30px 4px" }}
    >
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="text-academy fill-academy" />
        ))}
      </div>
      <p className="font-note text-graphite/80 leading-relaxed mb-4">"{t.quote}"</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-hand text-graphite text-lg leading-none">{t.author}</p>
          <p className="text-xs font-note text-graphite/65 mt-1">{t.role}</p>
        </div>
        {t.verified && (
          <span className="flex items-center gap-1 text-xs font-hand text-ballpoint bg-ballpoint/10 px-2 py-1">
            <ShieldCheck size={12} /> Verified
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  const filtered = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* HERO */}
      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-20">
          <h1 className="kinetic-headline text-3xl sm:text-6xl text-offwhite">
            Our Projects
          </h1>
          <p className="mt-6 text-offwhite/70 text-lg leading-relaxed normal-case max-w-xl">
            Smart-city AI, defence hardware, spatial computing, and
            industrial design — filtered your way.
          </p>
        </div>
      </section>

      <Ticker />

      {/* FILTER + GRID */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-sm font-semibold uppercase border-2 transition-colors ${
                filter === f.key
                  ? "bg-acid text-void border-acid"
                  : "bg-void border-zincline text-offwhite/70 hover:border-acid"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-offwhite/65 py-16 text-center normal-case">
            No projects in this category yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 py-4">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* TESTIMONIAL SPEECH BUBBLES */}
      <section className="container-page py-16 sm:py-20 border-t-2 border-zincline">
        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">
          What Clients Say
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <TestimonialBubble key={t.author} t={t} />
          ))}
        </div>
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
