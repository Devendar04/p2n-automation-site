import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Code2,
  Cloud,
  Cpu,
  Network,
  CircuitBoard,
  Bot,
  GraduationCap,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Check,
  Loader2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import RichText from "../components/RichText";
import { useService } from "../lib/content";
import { usePageMeta } from "../lib/pageMeta";
import { PROJECTS } from "../data/siteContent";

export const SERVICE_ICONS = { Code2, Cloud, Cpu, Network, CircuitBoard, Bot, GraduationCap };

function FAQ({ faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-2 border-zincline">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-offwhite text-sm sm:text-base normal-case">{f.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-acid transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm text-offwhite/70 leading-relaxed normal-case">{f.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const { service, all, loading } = useService(slug);
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  usePageMeta(service?.title, service?.seo_description || service?.tagline);

  const Icon = SERVICE_ICONS[service?.icon] ?? Code2;
  const related = (service?.related_projects ?? [])
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter(Boolean);
  const others = all.filter((s) => s.slug !== slug);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {loading ? (
        <div className="pt-40 pb-40 grid place-items-center text-offwhite/65">
          <Loader2 className="animate-spin" size={26} />
        </div>
      ) : !service ? (
        <section className="pt-32 pb-32 container-page text-center">
          <h1 className="kinetic-headline text-3xl sm:text-5xl text-offwhite">Service not found</h1>
          <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-acid font-semibold uppercase text-sm">
            <ArrowLeft size={16} /> All services
          </Link>
        </section>
      ) : (
        <>
          {/* HERO */}
          <section className="pt-16 border-b-2 border-zincline">
            <div className="container-page py-14 sm:py-20">
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-offwhite/65 hover:text-acid transition-colors mb-8"
              >
                <ArrowLeft size={14} /> All services
              </Link>

              <div className="flex items-start gap-5">
                <span className="hidden sm:grid place-items-center w-16 h-16 shrink-0 border-2 border-acid text-acid">
                  <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="max-w-3xl">
                  <span className="inline-block font-hand text-sm text-graphite bg-postit border-2 border-graphite shadow-[3px_3px_0px_0px_#111111] px-4 py-1.5 -rotate-2 mb-6">
                    ★ Service {String(service.sort_order ?? "").padStart(2, "0")}
                  </span>
                  <h1 className="kinetic-headline text-4xl sm:text-6xl text-offwhite">{service.title}</h1>
                  <p className="mt-6 text-lg text-offwhite/70 leading-relaxed normal-case max-w-2xl">
                    {service.tagline}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      onClick={() => setSchedulerOpen(true)}
                      className="inline-flex items-center gap-2 bg-acid text-void text-sm font-semibold uppercase px-6 py-3 border-2 border-acid hover:bg-void hover:text-acid transition-colors"
                    >
                      Talk to our team <ArrowUpRight size={16} />
                    </button>
                    {related.length > 0 && (
                      <a
                        href="#related"
                        className="inline-flex items-center gap-2 text-sm font-semibold uppercase px-6 py-3 border-2 border-zincline text-offwhite hover:border-acid hover:text-acid transition-colors"
                      >
                        See our work
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* OVERVIEW + AT A GLANCE */}
          <section className="container-page py-16 sm:py-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
            <RichText text={service.intro} className="text-base sm:text-lg" />

            <aside className="flex flex-col gap-6 border-2 border-zincline p-6 self-start">
              {service.deliverables.length > 0 && (
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-acid mb-3">What you receive</h2>
                  <ul className="flex flex-col gap-2.5">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-offwhite/80 normal-case">
                        <Check size={16} className="mt-0.5 shrink-0 text-acid" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {service.tech_stack.length > 0 && (
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-acid mb-3">Tools &amp; technology</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tech_stack.map((t) => (
                      <span
                        key={t}
                        className="font-hand text-xs text-graphite bg-postit border border-graphite px-2 py-1 -rotate-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </section>

          {/* CAPABILITIES */}
          {service.capabilities.length > 0 && (
            <section className="bg-mist border-y-2 border-zincline">
              <div className="container-page py-16 sm:py-20">
                <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">What we do</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[2px] border-2 border-zincline bg-zincline">
                  {service.capabilities.map((c, i) => (
                    <div
                      key={c.title}
                      className="group p-7 bg-void hover:bg-acid inview:bg-acid transition-colors duration-200"
                    >
                      <span className="font-display font-semibold text-3xl text-offwhite/20 group-hover:text-void/30 group-inview:text-void/30 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 mb-2 font-display font-semibold uppercase text-offwhite group-hover:text-void group-inview:text-void text-lg leading-snug transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-sm text-offwhite/70 group-hover:text-void/85 group-inview:text-void/85 leading-relaxed normal-case transition-colors">
                        {c.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* PROCESS */}
          {service.process.length > 0 && (
            <section className="container-page py-16 sm:py-20">
              <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">How we work</h2>
              <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.process.map((step, i) => (
                  <li key={step.title} className="relative border-2 border-zincline p-6 pt-8">
                    <span className="absolute -top-4 left-5 grid place-items-center w-9 h-9 bg-acid text-void font-display font-bold text-sm">
                      {i + 1}
                    </span>
                    <h3 className="font-display font-semibold uppercase text-offwhite mb-2">{step.title}</h3>
                    <p className="text-sm text-offwhite/70 leading-relaxed normal-case">{step.description}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* RELATED PROJECTS */}
          {related.length > 0 && (
            <section id="related" className="scroll-mt-24 bg-mist border-y-2 border-zincline">
              <div className="container-page py-16 sm:py-20">
                <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">Related work</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {related.map((p) => (
                    <Link
                      key={p.id}
                      to={`/projects#${p.id}`}
                      className="group border-2 border-zincline bg-void flex flex-col transition-shadow hover:shadow-[6px_6px_0px_0px_#017AFB] inview:shadow-[6px_6px_0px_0px_#017AFB]"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-void relative">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-cover bg-center blur-2xl scale-125 opacity-40"
                          style={{ backgroundImage: `url(${p.images[0].src})` }}
                        />
                        <img
                          src={p.images[0].src}
                          alt={p.images[0].alt}
                          loading="lazy"
                          className="relative w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-5 border-t-2 border-zincline flex-1 flex flex-col">
                        <h3 className="font-display font-semibold uppercase text-offwhite text-sm leading-snug">
                          <span aria-hidden="true" className="mr-1.5">{p.emoji}</span>
                          {p.heading}
                        </h3>
                        <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase text-acid">
                          View project <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          {service.faqs.length > 0 && (
            <section className="container-page py-16 sm:py-20 max-w-4xl">
              <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-8">Questions we hear</h2>
              <FAQ faqs={service.faqs} />
            </section>
          )}

          {/* CTA + OTHER SERVICES */}
          <section className="bg-acid">
            <div className="container-page py-14 sm:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="kinetic-headline text-2xl sm:text-4xl text-void">
                  Planning a {service.title.toLowerCase()} project?
                </h2>
                <p className="mt-3 text-void/85 normal-case">
                  Tell us what you are trying to achieve and we will suggest a sensible first step.
                </p>
              </div>
              <button
                onClick={() => setSchedulerOpen(true)}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-void text-acid text-sm font-semibold uppercase px-7 py-4 border-2 border-void hover:bg-transparent hover:text-void transition-colors"
              >
                Book a conversation <ArrowUpRight size={16} />
              </button>
            </div>
          </section>

          {others.length > 0 && (
            <section className="container-page py-12">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-offwhite/65 mb-4">Other services</h2>
              <div className="flex flex-wrap gap-3">
                {others.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2 border-2 border-zincline px-4 py-2.5 text-sm font-semibold uppercase text-offwhite hover:border-acid hover:text-acid transition-colors"
                  >
                    {s.title} <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
