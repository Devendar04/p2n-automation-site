import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Building2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";

const MARQUEE_PARTNERS = [
  "MLSU UDAIPUR", "IIT JODHPUR", "MICROSOFT", "AWS", "NSDC",
  "DELHI PUBLIC SCHOOL", "MNIT JAIPUR", "STARTUP INDIA", "GOOGLE CLOUD", "CISCO NETWORKING ACADEMY",
];

const ACADEMIC_PARTNERS = [
  {
    name: "MLSU Udaipur",
    type: "University",
    detail: "Joint hardware lab on campus running the Hardware Track curriculum for third-year students.",
  },
  {
    name: "MNIT Jaipur",
    type: "University",
    detail: "Placement pipeline feeding our Software Track graduates directly into pre-placement offers.",
  },
  {
    name: "Delhi Public School, Jaipur",
    type: "High School",
    detail: "After-school introductory coding and robotics workshops for grades 9–12.",
  },
  {
    name: "IIT Jodhpur",
    type: "University",
    detail: "Joint research initiative on low-power mesh sensor networks for the AI & Automation track.",
  },
];

const CORPORATE_PARTNERS = [
  {
    name: "Microsoft for Startups",
    type: "Technology Partner",
    detail: "Azure credits and technical mentorship for client cloud migrations.",
  },
  {
    name: "AWS Activate",
    type: "Cloud Partner",
    detail: "Select Consulting Partner status covering infrastructure delivery for enterprise clients.",
  },
  {
    name: "Cisco Networking Academy",
    type: "Curriculum Partner",
    detail: "Certified networking curriculum integrated into the Network Infrastructure service line.",
  },
  {
    name: "NSDC",
    type: "Skilling Partner",
    detail: "Recognised Skill India training partner for the academy's certification pathway.",
  },
];

function PartnerCard({ partner, icon: Icon }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="relative border-2 border-zincline bg-void p-6 overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="grid place-items-center w-9 h-9 border border-zincline text-acid">
          <Icon size={16} />
        </span>
        <div>
          <h3 className="font-display font-semibold text-offwhite uppercase text-base">{partner.name}</h3>
          <span className="text-xs text-offwhite/65 uppercase">{partner.type}</span>
        </div>
      </div>

      <motion.p
        variants={{
          rest: { opacity: 0, height: 0 },
          hover: { opacity: 1, height: "auto" },
        }}
        transition={{ duration: 0.25 }}
        className="text-sm text-offwhite/70 leading-relaxed normal-case overflow-hidden"
      >
        {partner.detail}
      </motion.p>

      <motion.div
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.25 }}
        style={{ originX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-acid"
      />
    </motion.div>
  );
}

function Marquee({ reverse }) {
  const items = reverse ? [...MARQUEE_PARTNERS].reverse() : MARQUEE_PARTNERS;
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y-2 border-zincline bg-void py-4">
      <div className={`flex gap-10 w-max ${reverse ? "animate-marqueeReverse" : "animate-marquee"}`}>
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-semibold uppercase tracking-widest text-offwhite/65 whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-20">
          <h1 className="kinetic-headline text-3xl sm:text-6xl text-offwhite">
            Partners &amp; Networking
          </h1>
          <p className="mt-6 text-offwhite/70 text-lg leading-relaxed normal-case max-w-xl">
            The institutions and tech partners that make both sides of the
            business — delivery and training — work.
          </p>
        </div>
      </section>

      <Marquee />
      <Marquee reverse />

      <section id="networking" className="container-page py-16 sm:py-20">
        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10 flex items-center gap-3">
          <GraduationCap size={28} className="text-acid" /> Academic Partners
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          {ACADEMIC_PARTNERS.map((p) => (
            <PartnerCard key={p.name} partner={p} icon={GraduationCap} />
          ))}
        </div>

        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10 flex items-center gap-3">
          <Building2 size={28} className="text-acid" /> Corporate Tech Partners
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {CORPORATE_PARTNERS.map((p) => (
            <PartnerCard key={p.name} partner={p} icon={Building2} />
          ))}
        </div>
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
