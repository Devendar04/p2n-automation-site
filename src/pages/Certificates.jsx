import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, FileBadge2, BadgeCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import { CERTIFICATIONS } from "../data/siteContent";

const PATENTS = [
  { title: "Low-power mesh sensor array for industrial IoT", authority: "Indian Patent Office", verificationId: "IN-PAT-402918", date: "Granted · Dec 2024" },
  { title: "Adaptive load-balancing method for edge gateways", authority: "Indian Patent Office", verificationId: "IN-APP-511207", date: "Filed · Jul 2025" },
  { title: "Student progress-tracking engine for technical cohorts", authority: "Indian Patent Office", verificationId: "IN-APP-518834", date: "Filed · Feb 2026" },
];

function CredCard({ item, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ rotate: 1, scale: 1.03 }}
      className="relative wobble-1 bg-[#F7FAFF] text-graphite border-[3px] border-graphite shadow-[5px_5px_0px_0px_#111111] px-6 py-7"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-postit/80 border border-graphite/20 -rotate-2 shadow-sm" />

      <BadgeCheck size={22} className="text-ballpoint mb-4" />
      <h3 className="font-hand text-xl leading-snug mb-3">{item.title}</h3>
      <dl className="text-sm font-note text-graphite/70 space-y-1">
        <div className="flex justify-between gap-2">
          <dt>Issuing Authority</dt>
          <dd className="text-right">{item.authority}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Verification ID</dt>
          <dd className="text-right">{item.verificationId}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Date</dt>
          <dd className="text-right">{item.date}</dd>
        </div>
      </dl>
    </motion.div>
  );
}

function LogoCredCard({ item, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ rotate: 1, scale: 1.03 }}
      className="relative wobble-1 bg-[#F7FAFF] text-graphite border-[3px] border-graphite shadow-[5px_5px_0px_0px_#111111] px-6 py-7 flex flex-col items-center text-center"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-postit/80 border border-graphite/20 -rotate-2 shadow-sm" />

      <div className="w-full h-44 bg-white border-2 border-graphite/15 p-4 mb-5 overflow-hidden">
        <img
          src={item.logo}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-contain"
        />
      </div>
      <h3 className="font-hand text-xl leading-snug">{item.title}</h3>
    </motion.div>
  );
}

export default function Certificates() {
  const [tab, setTab] = useState("certifications");
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-20">
          <span className="inline-block font-hand text-sm text-graphite bg-postit border-2 border-graphite shadow-[3px_3px_0px_0px_#111111] px-4 py-1.5 -rotate-2 mb-6">
            ★ Verified &amp; On File
          </span>
          <h1 className="kinetic-headline text-3xl sm:text-6xl text-offwhite">
            Certificates &amp; Patents
          </h1>
          <p className="mt-6 text-offwhite/70 text-lg leading-relaxed normal-case max-w-xl">
            The registrations, recognitions, and quality certifications that back
            every engagement we take on.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="inline-flex border-2 border-zincline mb-10">
          <button
            onClick={() => setTab("certifications")}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold uppercase transition-colors ${
              tab === "certifications" ? "bg-acid text-void" : "text-offwhite/70 hover:text-offwhite"
            }`}
          >
            <ShieldCheck size={16} /> Certifications &amp; Recognitions
          </button>
          <button
            onClick={() => setTab("patents")}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold uppercase transition-colors border-l-2 border-zincline ${
              tab === "patents" ? "bg-postit text-graphite" : "text-offwhite/70 hover:text-offwhite"
            }`}
          >
            <FileBadge2 size={16} /> Patents &amp; IP
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 py-2">
            {tab === "certifications"
              ? CERTIFICATIONS.map((item, i) => (
                  <LogoCredCard key={item.id} item={item} index={i} />
                ))
              : PATENTS.map((item, i) => (
                  <CredCard key={item.verificationId} item={item} index={i} />
                ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
