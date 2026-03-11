import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, staggerContainer, lineReveal } from '../lib/motion';

const disciplines = [
  'Branding',
  'Strategy',
  'Identity Systems',
  'Art Direction',
  'Campaigns',
  'Digital',
];

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="about"
      className="py-28 md:py-40 px-6 md:px-10 lg:px-16 bg-stone-900 text-stone-50 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8"
        >
          {/* Left label */}
          <motion.div variants={fadeUp} className="md:col-span-3 flex flex-col justify-start pt-2">
            <p className="text-xs tracking-[0.25em] uppercase text-stone-400 font-medium">
              Who We Are
            </p>
            <motion.div
              variants={lineReveal}
              className="mt-4 h-px bg-stone-700 w-12"
            />
          </motion.div>

          {/* Main content */}
          <div className="md:col-span-9 flex flex-col gap-10">
            <motion.p
              variants={fadeUp}
              className="font-display text-[clamp(1.8rem,4.5vw,4rem)] leading-[1.15] text-stone-50 tracking-tight max-w-3xl"
            >
              We are a multidisciplinary creative studio built on the belief
              that{' '}
              <em>great design is the intersection of strategy, taste, and
              execution.</em>
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl font-light"
            >
              Studio Nine One works with founders, brands, and institutions at
              critical junctures — launches, repositions, and evolutions.
              We bring clarity to complex identities and craft experiences that
              are distinctively theirs.
            </motion.p>

            {/* Disciplines */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-2">
              {disciplines.map((d) => (
                <span
                  key={d}
                  className="px-4 py-2 text-xs tracking-widest uppercase border border-stone-700 text-stone-300 hover:border-stone-400 hover:text-stone-50 transition-colors duration-300 cursor-default"
                >
                  {d}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
