import { useState, useEffect, useMemo } from "react";
import { Github, ExternalLink, Award, Star, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import { supabase } from "../lib/supabaseClient";

const CATEGORIES_BY_VIEW = {
  client: ["All", "Software", "Hardware/IoT", "AI & Automation"],
  student: ["All", "Software", "Hardware/IoT", "AI & Automation", "Student Innovations"],
};

function EnterpriseCard({ project }) {
  return (
    <div className="border-2 border-zincline bg-void flex flex-col">
      {project.thumbnail_url && <img src={project.thumbnail_url} alt="" className="w-full h-40 object-cover" />}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase text-acid border border-acid px-2 py-1 w-fit mb-3">
          {project.category}
        </span>
        <h3 className="font-display font-semibold text-offwhite text-lg uppercase mb-2">{project.title}</h3>
        {project.solution_delivered && (
          <p className="text-sm text-offwhite/70 leading-relaxed normal-case mb-4 flex-1">
            {project.solution_delivered}
          </p>
        )}
        {project.tech_stack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech_stack.map((t) => (
              <span key={t} className="text-xs text-offwhite/65 border border-zincline px-2 py-1 uppercase">
                {t}
              </span>
            ))}
          </div>
        )}
        {project.testimonial_quote && (
          <p className="text-sm italic text-offwhite/65 normal-case mb-4 border-l-2 border-acid pl-3">
            "{project.testimonial_quote}"
          </p>
        )}
        {project.case_study_url && (
          <a
            href={project.case_study_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-4 border-t-2 border-zincline text-sm font-semibold uppercase text-acid hover:text-offwhite flex items-center gap-1.5 w-fit"
          >
            View Case Study <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

function StudentCard({ project }) {
  return (
    <div className="relative wobble-2 bg-paper border-2 border-graphite shadow-hard p-6 -rotate-1 hover:rotate-0 transition-transform">
      {project.hiring_badge && (
        <span className="absolute -top-3 -right-3 bg-correction text-white text-[10px] font-hand px-2 py-1 border-2 border-graphite rotate-6 flex items-center gap-1">
          <Award size={10} /> hired!
        </span>
      )}
      <h3 className="font-hand text-xl text-graphite mb-1">{project.title}</h3>
      <p className="text-xs font-note text-graphite/60 uppercase mb-3">{project.category}</p>
      {project.solution_delivered && (
        <p className="text-sm font-note text-graphite/70 leading-relaxed mb-4">{project.solution_delivered}</p>
      )}
      {project.tech_stack?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.map((t) => (
            <span key={t} className="text-xs font-note bg-ballpoint/10 text-ballpoint px-2 py-1 wobble-1">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 pt-3 border-t-2 border-graphite/20">
        {project.demo_url && (
          <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-sm font-note text-ballpoint hover:underline flex items-center gap-1">
            Live Demo <ExternalLink size={13} />
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-sm font-note text-graphite/70 hover:text-graphite flex items-center gap-1">
            <Github size={13} /> Repo
          </a>
        )}
      </div>
    </div>
  );
}

function TestimonialStrip({ testimonials }) {
  if (testimonials.length === 0) return null;
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {testimonials.slice(0, 4).map((t) => (
        <div key={t.id} className="border-2 border-zincline bg-void p-6">
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className={i < t.testimonial_rating ? "text-acid fill-acid" : "text-zincline fill-zincline"} />
            ))}
          </div>
          <p className="text-offwhite/70 leading-relaxed normal-case mb-4">"{t.testimonial_quote}"</p>
          <p className="text-sm font-semibold text-offwhite uppercase">{t.testimonial_author}</p>
          <p className="text-xs text-offwhite/65 normal-case">{t.testimonial_role}</p>
        </div>
      ))}
    </div>
  );
}

export default function Works() {
  const [viewType, setViewType] = useState("client");
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      setProjects(data || []);
      setLoading(false);
    })();
  }, []);

  useEffect(() => setActiveCategory("All"), [viewType]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (p.view_type !== viewType) return false;
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
      return true;
    });
  }, [projects, viewType, activeCategory]);

  const testimonials = useMemo(() => projects.filter((p) => p.testimonial_quote), [projects]);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-20 max-w-2xl">
          <h1 className="kinetic-headline text-3xl sm:text-5xl text-offwhite">Works &amp; Showcase</h1>
          <p className="mt-4 text-offwhite/60 leading-relaxed normal-case">
            Enterprise delivery and student capstones — built the same way,
            by the same bench.
          </p>
        </div>
      </section>

      <section id="projects" className="container-page py-16">
        <div className="inline-flex border-2 border-zincline mb-8">
          <button
            id="enterprise"
            onClick={() => setViewType("client")}
            className={`px-5 py-2.5 text-sm font-semibold uppercase transition-colors ${
              viewType === "client" ? "bg-acid text-void" : "text-offwhite/60 hover:text-offwhite"
            }`}
          >
            Enterprise B2B Projects
          </button>
          <button
            id="students"
            onClick={() => setViewType("student")}
            className={`px-5 py-2.5 text-sm font-semibold uppercase transition-colors border-l-2 border-zincline ${
              viewType === "student" ? "bg-postit text-graphite" : "text-offwhite/60 hover:text-offwhite"
            }`}
          >
            Student Capstone Innovations
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES_BY_VIEW[viewType].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-semibold uppercase border-2 transition-colors ${
                activeCategory === cat
                  ? "bg-offwhite text-void border-offwhite"
                  : "bg-void border-zincline text-offwhite/65 hover:border-offwhite/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-offwhite/65">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-offwhite/65 py-16 text-center">No projects published in this category yet.</p>
        ) : viewType === "client" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <EnterpriseCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 py-4">
            {filtered.map((project) => (
              <StudentCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <section className="container-page py-16 border-t-2 border-zincline">
        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">
          What Clients &amp; Students Say
        </h2>
        <TestimonialStrip testimonials={testimonials} />
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
