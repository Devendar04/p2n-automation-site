import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Newspaper } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import ImageSlider from "../components/ImageSlider";
import { PRESS_ITEMS } from "../data/siteContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.15 },
  variants: fadeUp,
};

/** Emoji from the content brief is decorative; the heading text carries the meaning. */
function ItemHeading({ item, as: Tag = "h3", className = "" }) {
  return (
    <Tag className={className}>
      <span aria-hidden="true" className="mr-2 normal-case">
        {item.emoji}
      </span>
      {item.heading}
    </Tag>
  );
}

function EventChip({ children, icon: Icon = Newspaper }) {
  return (
    <span className="inline-flex items-center gap-1.5 w-fit text-xs font-semibold uppercase tracking-wide text-acid border border-acid px-2 py-1">
      <Icon size={12} aria-hidden="true" /> {children}
    </span>
  );
}

/* Large feature row — slider left, text right */
function LeadFeature({ item }) {
  return (
    <motion.article
      id={item.id}
      {...reveal}
      className="scroll-mt-24 grid lg:grid-cols-2 border-2 border-zincline bg-void"
    >
      <ImageSlider
        images={item.images}
        label={`${item.event} photos`}
        aspect="aspect-[4/3] lg:aspect-auto lg:min-h-[460px]"
        eager
      />
      <div className="p-7 sm:p-10 flex flex-col justify-center gap-5 border-t-2 lg:border-t-0 lg:border-l-2 border-zincline">
        <EventChip icon={Trophy}>{item.event}</EventChip>
        <ItemHeading
          item={item}
          as="h2"
          className="kinetic-headline text-3xl sm:text-4xl text-offwhite !leading-[0.95]"
        />
        <p className="text-sm font-semibold uppercase tracking-wide text-acid">
          {item.subheading}
        </p>
        <p className="text-offwhite/70 leading-relaxed normal-case">{item.description}</p>
      </div>
    </motion.article>
  );
}

/* Grid card — slider on top, text below */
function PressCard({ item, index }) {
  return (
    <motion.article
      id={item.id}
      custom={index}
      {...reveal}
      className="scroll-mt-24 border-2 border-zincline bg-void flex flex-col transition-shadow duration-200 hover:shadow-[6px_6px_0px_0px_#017AFB]"
    >
      <ImageSlider images={item.images} label={`${item.event} photos`} />
      <div className="p-6 flex flex-col gap-3 flex-1 border-t-2 border-zincline">
        <EventChip>{item.event}</EventChip>
        <ItemHeading
          item={item}
          className="font-display font-semibold text-offwhite text-xl leading-snug uppercase"
        />
        <p className="text-xs font-semibold uppercase tracking-wide text-acid">
          {item.subheading}
        </p>
        <p className="text-sm text-offwhite/70 leading-relaxed normal-case">{item.description}</p>
      </div>
    </motion.article>
  );
}

/* Feature row for a tall press clipping — text left, portrait image right */
function PortraitFeature({ item }) {
  return (
    <motion.article
      id={item.id}
      {...reveal}
      className="scroll-mt-24 grid lg:grid-cols-[1fr_minmax(0,380px)] border-2 border-zincline bg-void"
    >
      <div className="p-7 sm:p-10 flex flex-col justify-center gap-5">
        <EventChip>{item.event}</EventChip>
        <ItemHeading
          item={item}
          as="h2"
          className="kinetic-headline text-3xl sm:text-4xl text-offwhite !leading-[0.95]"
        />
        <p className="text-sm font-semibold uppercase tracking-wide text-acid">
          {item.subheading}
        </p>
        <p className="text-offwhite/70 leading-relaxed normal-case max-w-xl">{item.description}</p>
      </div>
      <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-zincline">
        <ImageSlider
          images={item.images}
          label={`${item.event} press clipping`}
          aspect="aspect-[9/16]"
          className="max-w-sm mx-auto lg:max-w-none"
        />
      </div>
    </motion.article>
  );
}

export default function PressAndMedia() {
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  const lead = PRESS_ITEMS.find((i) => i.layout === "lead");
  const cards = PRESS_ITEMS.filter((i) => i.layout === "card");
  const portrait = PRESS_ITEMS.find((i) => i.layout === "portrait");

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-20">
          <motion.span
            initial={{ opacity: 0, y: -10, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.4 }}
            className="inline-block font-hand text-sm text-graphite bg-postit border-2 border-graphite shadow-[3px_3px_0px_0px_#111111] px-4 py-1.5 mb-6"
          >
            ★ In The News
          </motion.span>
          <h1 className="kinetic-headline text-3xl sm:text-6xl text-offwhite">
            Press, Media &amp; Achievements
          </h1>
          <p className="mt-6 text-offwhite/70 text-lg leading-relaxed normal-case max-w-xl">
            Hackathon wins, startup showcases, and the press coverage behind the
            systems we build.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 flex flex-col gap-8">
        {lead && <LeadFeature item={lead} />}

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((item, i) => (
            <PressCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {portrait && <PortraitFeature item={portrait} />}
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </div>
  );
}
