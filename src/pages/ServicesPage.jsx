import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Cpu,
  CircuitBoard,
  Bot,
  Cloud,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import { useServices } from "../lib/content";
import { SERVICE_ICONS } from "./ServiceDetail";

const SERVICES = [
  {
    number: "01",
    icon: Code2,
    title: "Custom Software & Web Applications",
    scope: [
      "Full-stack platform architecture and API design",
      "React / Node.js application development",
      "Cloud-native deployment pipelines",
    ],
    deliverables: "Production codebase, CI/CD pipeline, technical documentation",
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    number: "02",
    icon: Cpu,
    title: "Embedded Systems & Firmware Development",
    scope: [
      "Microcontroller firmware architecture",
      "RTOS integration for real-time constraints",
      "Low-level driver and protocol development",
    ],
    deliverables: "Firmware source, hardware bring-up report, test coverage",
    stack: ["C/C++", "RTOS", "STM32", "FreeRTOS"],
  },
  {
    number: "03",
    icon: CircuitBoard,
    title: "IoT Hardware Prototyping & PCB Design",
    scope: [
      "Sensor selection and signal chain design",
      "PCB schematic and layout",
      "Prototype-to-production hardware iteration",
    ],
    deliverables: "PCB design files, BOM, working prototype units",
    stack: ["ESP32", "Raspberry Pi", "KiCad", "Sensors"],
  },
  {
    number: "04",
    icon: Bot,
    title: "Industrial AI & Process Automation",
    scope: [
      "Computer vision inspection systems",
      "Predictive maintenance model development",
      "Process automation & control logic",
    ],
    deliverables: "Trained models, deployment pipeline, monitoring dashboard",
    stack: ["Python", "PyTorch", "OpenCV", "MLOps"],
  },
  {
    number: "05",
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    scope: [
      "AWS infrastructure design and migration",
      "Containerization and orchestration",
      "Security audits and compliance hardening",
    ],
    deliverables: "IaC templates, security audit report, runbooks",
    stack: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    number: "06",
    icon: GraduationCap,
    title: "Corporate Tech Mentorship & Academy Integration",
    scope: [
      "Custom internal training curriculum design",
      "Embedded mentors for junior engineering teams",
      "Academy talent pipeline integration for hiring",
    ],
    deliverables: "Curriculum plan, mentor cadence, hiring pipeline access",
    stack: ["Mentorship", "Curriculum", "Hiring"],
  },
];

function ServiceCard({ service }) {
  const { number, icon: Icon, title, scope, deliverables, stack } = service;
  return (
    <div className="group relative border-2 border-zincline bg-void p-7 flex flex-col transition-colors duration-200 hover:bg-acid inview:bg-acid">
      <div className="flex items-start justify-between mb-6">
        <span className="font-display font-semibold text-4xl text-offwhite/20 group-hover:text-void/30 group-inview:text-void/30 transition-colors">
          {number}
        </span>
        <Icon size={26} className="text-acid group-hover:text-void group-inview:text-void transition-colors" strokeWidth={1.5} />
      </div>

      <h3 className="font-display font-semibold uppercase text-offwhite group-hover:text-void group-inview:text-void text-lg leading-snug mb-4 transition-colors">
        {title}
      </h3>

      <ul className="text-sm text-offwhite/70 group-hover:text-void/80 group-inview:text-void/80 leading-relaxed normal-case space-y-1.5 mb-5 list-disc list-inside transition-colors">
        {scope.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <p className="text-xs uppercase font-semibold text-offwhite/65 group-hover:text-void/60 group-inview:text-void/60 mb-5 transition-colors">
        Deliverables: <span className="normal-case font-normal">{deliverables}</span>
      </p>

      {/* hand-drawn tech stack badge */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {stack.map((t) => (
          <span
            key={t}
            className="font-hand text-xs text-graphite bg-postit border border-graphite px-2 py-1 -rotate-1"
          >
            {t}
          </span>
        ))}
      </div>

      <Link
        to="/careers#hire"
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold uppercase text-acid group-hover:text-void group-inview:text-void w-fit transition-colors"
      >
        Request Proposal
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-inview:translate-x-0.5 group-hover:-translate-y-0.5 group-inview:-translate-y-0.5" />
      </Link>
    </div>
  );
}

export default function ServicesPage() {
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const { services: core } = useServices();

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* HERO */}
      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-24 max-w-3xl">
          <span className="inline-block font-hand text-sm text-graphite bg-postit border-2 border-graphite shadow-[3px_3px_0px_0px_#111111] px-4 py-1.5 -rotate-2 mb-6">
            ★ What We Build
          </span>
          <h1 className="kinetic-headline text-3xl sm:text-6xl text-offwhite">
            Engineering &amp; Automation Services
          </h1>
          <p className="mt-6 text-offwhite/70 text-lg leading-relaxed normal-case max-w-xl">
            Custom software architecture, hardware prototyping, and automated
            IoT systems tailored for enterprise scaling.
          </p>
        </div>
      </section>

      {/* THE FOUR CORE PRACTICES — each has its own page */}
      <section className="container-page py-16 sm:py-20">
        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">Core practices</h2>
        <div className="grid sm:grid-cols-2 gap-[2px] border-2 border-zincline bg-zincline">
          {core.map((svc) => {
            const CoreIcon = SERVICE_ICONS[svc.icon] ?? Code2;
            return (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}`}
                className="group bg-void p-8 flex flex-col gap-4 hover:bg-acid inview:bg-acid transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <CoreIcon size={30} strokeWidth={1.5} className="text-acid group-hover:text-void group-inview:text-void transition-colors" aria-hidden="true" />
                  <ArrowUpRight size={20} className="text-offwhite/40 group-hover:text-void group-inview:text-void transition-colors" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold uppercase text-offwhite group-hover:text-void group-inview:text-void text-xl transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-offwhite/70 group-hover:text-void/85 group-inview:text-void/85 leading-relaxed normal-case transition-colors">
                  {svc.tagline}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SPECIALIST CAPABILITIES */}
      <section className="container-page pb-16 sm:pb-20">
        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">Specialist capabilities</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </div>
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
