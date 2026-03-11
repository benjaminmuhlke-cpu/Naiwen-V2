import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Timeline } from '../components/ui/timeline';
import { staggerContainer, fadeUp } from '../lib/motion';

const timelineData = [
  {
    title: '2020',
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light max-w-xl">
          Studio Nine One is established in London. The first year is devoted entirely to craft — building a small, obsessive team focused on brand identity and visual language. Our first clients: an architecture practice and a specialty food producer.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop"
            alt="Studio founding"
            className="rounded-none object-cover h-32 md:h-48 w-full grayscale"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80&auto=format&fit=crop"
            alt="Early studio work"
            className="rounded-none object-cover h-32 md:h-48 w-full grayscale"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: '2021',
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light max-w-xl">
          We expand into brand strategy and positioning — moving upstream in the creative process. First international mandates arrive from France and the UAE. The team grows to eight. We begin our work in packaging and art direction.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80&auto=format&fit=crop"
            alt="Brand strategy work 2021"
            className="rounded-none object-cover h-32 md:h-48 w-full grayscale"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&auto=format&fit=crop"
            alt="International clients"
            className="rounded-none object-cover h-32 md:h-48 w-full grayscale"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: '2022',
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light max-w-xl">
          A year of systems-thinking. We formalise our approach to identity systems — moving beyond logos into the rules, rhythms, and behaviours that define how a brand lives. Campaign work begins. Digital experiences become a core offering.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop"
            alt="Packaging systems 2022"
            className="rounded-none object-cover h-32 md:h-48 w-full grayscale"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop"
            alt="Digital experiences"
            className="rounded-none object-cover h-32 md:h-48 w-full grayscale"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: '2023 —',
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light max-w-xl">
          Studio Nine One operates across 14 industry sectors with partners on five continents. We have shaped over 60 brands — from luxury hospitality to technology startups to cultural institutions. The work continues.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop"
            alt="Global studio 2023"
            className="rounded-none object-cover h-32 md:h-48 w-full grayscale"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&auto=format&fit=crop"
            alt="Studio Nine One today"
            className="rounded-none object-cover h-32 md:h-48 w-full grayscale"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
];

export default function StudioJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-stone-100 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 pt-28 md:pt-40">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end gap-6 md:gap-20 mb-16"
        >
          <div className="flex flex-col gap-3 flex-1">
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.25em] uppercase text-stone-400"
            >
              Our Story
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-tight tracking-tight text-stone-900"
            >
              Built over
              <br />
              <em>four years.</em>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-stone-500 text-base md:text-lg leading-relaxed max-w-md font-light flex-1"
          >
            Every studio has an origin. Ours began with a simple conviction:
            that the most important thing a brand can be is itself — clearly,
            confidently, and consistently.
          </motion.p>
        </motion.div>
      </div>

      {/* Timeline */}
      <Timeline data={timelineData} />
    </section>
  );
}
