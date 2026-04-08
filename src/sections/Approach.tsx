import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../lib/motion';

const pillars = [
  {
    number: '01',
    title: 'Strategy',
    description:
      'We start with clarity. Understanding what a brand stands for, who it is for, and how it should move through the world, before a single mark is made.',
  },
  {
    number: '02',
    title: 'Taste',
    description:
      'Design is a point of view. We bring a refined aesthetic sensibility honed across sectors: fashion, hospitality, culture, technology, to every project.',
  },
  {
    number: '03',
    title: 'Execution',
    description:
      'Ideas are worthless without craft. We deliver at the highest level of production quality, with obsessive attention to detail across every touchpoint.',
  },
  {
    number: '04',
    title: 'Longevity',
    description:
      'We build brands that endure. Not trend-chasing, but timeless systems with the flexibility to evolve, remaining distinctive season after season.',
  },
];

export default function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="py-28 md:py-40 px-6 md:px-10 lg:px-16 bg-stone-50 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 md:mb-28">
            <div className="md:col-span-6 flex flex-col gap-3">
              <motion.p
                variants={fadeUp}
                className="text-xs tracking-[0.25em] uppercase text-stone-400"
              >
                Our Approach
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-tight tracking-tight text-stone-900"
              >
                Strategy, taste,
                <br />
                <em>and execution.</em>
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="md:col-span-5 md:col-start-8 flex items-end"
            >
              <p className="text-stone-500 text-base md:text-lg leading-relaxed font-light">
                Every great brand is built on a set of principles. Ours are
                simple: understand deeply, design distinctively, deliver
                impeccably. We exist to make brands that are irreplaceable.
              </p>
            </motion.div>
          </div>

          {/* Pillars */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8"
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.number}
                variants={fadeUp}
                className="flex flex-col gap-5 group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <span className="text-xs tracking-widest text-stone-300 font-mono">
                      {pillar.number}
                    </span>
                    <div className="h-px flex-1 bg-stone-200" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-stone-900 tracking-tight">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
