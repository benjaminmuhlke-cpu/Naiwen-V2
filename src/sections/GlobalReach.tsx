import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe } from '../components/ui/globe';
import { staggerContainer, fadeUp } from '../lib/motion';

export default function GlobalReach() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative bg-stone-900 overflow-hidden py-24 md:py-0 md:min-h-[640px] flex items-center"
    >
      <div className="max-w-screen-xl mx-auto w-full px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">

          {/* Left — editorial copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-7 relative z-10 py-16 md:py-24"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.25em] uppercase text-stone-500"
            >
              Global Presence
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.1] tracking-tight text-stone-50"
            >
              Work that reaches
              <br />
              <em>every corner.</em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-stone-400 text-base md:text-lg leading-relaxed max-w-sm font-light"
            >
              Studio Nine One partners with founders and brands across
              Europe, the Americas, and Asia-Pacific. Distance is never
              a barrier — great design travels.
            </motion.p>

            {/* Region tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-2">
              {['Europe', 'North America', 'Asia-Pacific', 'MENA', 'LATAM'].map((region) => (
                <span
                  key={region}
                  className="px-3 py-1.5 text-[10px] tracking-widest uppercase border border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300 transition-colors duration-300 cursor-default"
                >
                  {region}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Globe (desktop only) */}
          <div className="hidden md:flex items-center justify-center relative h-[540px]">
            {/* Radial gradient vignette — blends globe into dark bg */}
            <div className="absolute inset-0 pointer-events-none z-10 [background:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_40%,#1c1917_100%)]" />
            <Globe className="top-0" />
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none" />
    </section>
  );
}
