import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Star, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import { supabase } from "../lib/supabaseClient";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "Software", label: "Software Services" },
  { key: "Hardware/IoT", label: "Hardware & IoT" },
  { key: "Student Innovations", label: "Student Innovations" },
];

function ProjectCard({ project, onOpen }) {
  return (
    <motion.button
      layoutId={`card-${project.id}`}
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="text-left border-2 border-zincline bg-void overflow-hidden flex flex-col hover:border-acid transition-colors"
    >
      {project.thumbnail_url && (
        <motion.img
          layoutId={`thumb-${project.id}`}
          src={project.thumbnail_url}
          alt=""
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase text-acid border border-acid px-2 py-1 w-fit mb-3">
          {project.category}
        </span>
        <h3 className="font-display font-semibold text-offwhite text-lg uppercase mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-offwhite/70 leading-relaxed normal-case mb-4 flex-1 line-clamp-2">
          {project.problem_statement}
        </p>
        {project.tech_stack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((t) => (
              <span key={t} className="text-xs text-offwhite/60 border border-zincline px-2 py-1 uppercase">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          layoutId={`card-${project.id}`}
          className="relative w-full max-w-2xl bg-void border-2 border-zincline max-h-[85vh] overflow-y-auto"
        >
          {project.thumbnail_url && (
            <motion.img
              layoutId={`thumb-${project.id}`}
              src={project.thumbnail_url}
              alt=""
              className="w-full h-56 object-cover"
            />
          )}
          <div className="p-8">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-offwhite/60 hover:text-offwhite"
              aria-label="Close project details"
            >
              <X size={20} />
            </button>

            <span className="text-xs font-semibold uppercase text-acid border border-acid px-2 py-1 w-fit">
              {project.category}
            </span>
            <h2 className="mt-4 font-display font-semibold text-2xl text-offwhite uppercase">
              {project.title}
            </h2>

            <div className="mt-6 flex flex-col gap-5 text-sm">
              {project.problem_statement && (
                <div>
                  <h4 className="font-semibold uppercase text-offwhite/80 mb-1">Problem</h4>
                  <p className="text-offwhite/70 leading-relaxed normal-case">{project.problem_statement}</p>
                </div>
              )}
              {project.solution_delivered && (
                <div>
                  <h4 className="font-semibold uppercase text-offwhite/80 mb-1">System Architecture</h4>
                  <p className="text-offwhite/70 leading-relaxed normal-case">{project.solution_delivered}</p>
                </div>
              )}
              {project.tech_stack?.length > 0 && (
                <div>
                  <h4 className="font-semibold uppercase text-offwhite/80 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack.map((t) => (
                      <span key={t} className="text-xs text-offwhite/60 border border-zincline px-2 py-1 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.testimonial_quote && (
                <div className="border-l-2 border-acid pl-4">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < project.testimonial_rating ? "text-acid fill-acid" : "text-zincline fill-zincline"}
                      />
                    ))}
                  </div>
                  <p className="italic text-offwhite/70 normal-case">"{project.testimonial_quote}"</p>
                  <p className="mt-2 text-xs text-offwhite/65 uppercase">
                    {project.testimonial_author} — {project.testimonial_role}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-2">
                {project.case_study_url && (
                  <a href={project.case_study_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-acid text-void text-sm font-semibold uppercase px-5 py-2.5">
                    Full Case Study <ExternalLink size={14} />
                  </a>
                )}
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase text-offwhite/80 hover:text-offwhite">
                    Live Demo <ExternalLink size={14} />
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase text-offwhite/80 hover:text-offwhite">
                    <Github size={14} /> Repo
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      setProjects(data || []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-20">
          <h1 className="kinetic-headline text-3xl sm:text-6xl text-offwhite">
            Projects &amp; Works
          </h1>
          <p className="mt-6 text-offwhite/70 text-lg leading-relaxed normal-case max-w-xl">
            Enterprise delivery and student capstones, filtered your way.
          </p>
        </div>
      </section>

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

        {loading ? (
          <div className="flex justify-center py-16 text-offwhite/65">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-offwhite/65 py-16 text-center">
            No projects published in this category yet.
          </p>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={setSelected} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
