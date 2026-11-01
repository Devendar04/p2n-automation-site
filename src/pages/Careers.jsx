import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Briefcase, Gauge } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";

const OPENINGS = [
  {
    role: "Full-Stack Engineer",
    department: "Software",
    location: "Jaipur",
    experience: "2–4 yrs",
    responsibilities: [
      "Own feature delivery across React/Node client engagements",
      "Pair with interns on the same backlog as a mentor",
      "Review PRs and set technical direction for a small squad",
    ],
    perks: ["Health cover", "Flexible hours", "Annual learning budget"],
  },
  {
    role: "Embedded Systems Engineer",
    department: "Hardware",
    location: "Udaipur",
    experience: "3–5 yrs",
    responsibilities: [
      "Design and prototype IoT sensor firmware for client deployments",
      "Lead the Hardware Track curriculum for each cohort",
      "Own component sourcing and lead-time planning",
    ],
    perks: ["Hardware lab access", "Relocation support", "Health cover"],
  },
  {
    role: "Technical Mentor — Academy",
    department: "Mentorship",
    location: "Remote",
    experience: "4+ yrs",
    responsibilities: [
      "Run weekly code reviews and 1:1s for a cohort of 8–10 students",
      "Design capstone project briefs alongside client delivery leads",
      "Track student progress against certification milestones",
    ],
    perks: ["Remote-first", "Flexible hours", "Mentorship stipend"],
  },
  {
    role: "Cloud Infrastructure Intern",
    department: "Software",
    location: "Jaipur",
    experience: "Entry level",
    responsibilities: [
      "Support cloud migration work under senior engineer supervision",
      "Complete the 12-week Software Track curriculum",
      "Ship one client-facing feature by the end of the program",
    ],
    perks: ["Paid internship", "Certificate on completion", "Full-time consideration"],
  },
];

function JobCard({ job, isOpen, onToggle }) {
  return (
    <motion.div layout className="border-2 border-zincline bg-void overflow-hidden">
      <motion.button
        layout
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <div>
          <h3 className="font-display font-semibold text-offwhite text-lg uppercase">{job.role}</h3>
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-offwhite/60 uppercase">
            <span className="flex items-center gap-1.5">
              <Briefcase size={13} /> {job.department}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Gauge size={13} /> {job.experience}
            </span>
          </div>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-acid">
          <ChevronDown size={20} />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 border-t-2 border-zincline">
              <h4 className="text-xs font-semibold uppercase text-acid mb-2 mt-4">Key Responsibilities</h4>
              <ul className="text-sm text-offwhite/70 normal-case space-y-1.5 mb-5 list-disc list-inside">
                {job.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>

              <h4 className="text-xs font-semibold uppercase text-acid mb-2">Perks</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.perks.map((p) => (
                  <span key={p} className="text-xs text-offwhite/70 border border-zincline px-2.5 py-1 uppercase">
                    {p}
                  </span>
                ))}
              </div>

              <button className="bg-acid text-void text-sm font-semibold uppercase px-6 py-2.5 hover:bg-offwhite transition-colors">
                Apply for Role
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Careers() {
  const [openRole, setOpenRole] = useState(null);
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-20">
          <motion.span
            initial={{ opacity: 0, rotate: -6 }}
            animate={{ opacity: 1, rotate: -2 }}
            transition={{ duration: 0.4 }}
            className="inline-block font-hand text-sm text-white bg-correction border-2 border-graphite shadow-[3px_3px_0px_0px_#111111] px-4 py-1.5 mb-6"
          >
            We're Hiring!
          </motion.span>
          <h1 className="kinetic-headline text-3xl sm:text-6xl text-offwhite">
            Join the Team &amp; Academy
          </h1>
          <p className="mt-6 text-offwhite/70 text-lg leading-relaxed normal-case max-w-xl">
            Full-time roles on the delivery bench, and mentorship roles
            shaping the next cohort — pick your track.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-4">
          {OPENINGS.map((job) => (
            <JobCard
              key={job.role}
              job={job}
              isOpen={openRole === job.role}
              onToggle={() => setOpenRole(openRole === job.role ? null : job.role)}
            />
          ))}
        </div>
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
