import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { TextScramble } from '../components/ui/text-scramble';
import { fadeUp, staggerContainer } from '../lib/motion';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [scrambleTrigger, setScrambleTrigger] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScrambleTrigger(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-28 pt-32 px-6 md:px-10 lg:px-16 bg-stone-50 overflow-hidden"
    >
      {/* Thin rule top-right */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
        className="absolute top-0 right-0 h-px w-1/2 bg-stone-300 origin-right"
      />

      {/* Studio label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-24 md:top-28 right-6 md:right-10 lg:right-16 text-xs tracking-[0.25em] uppercase text-stone-400 font-medium"
      >
        Est. 2024 — Creative Studio
      </motion.p>

      <div className="max-w-screen-xl mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-10 md:gap-14"
        >
          {/* Headline */}
          <div className="flex flex-col gap-3">
            <motion.div variants={fadeUp}>
              <TextScramble
                as="h1"
                trigger={scrambleTrigger}
                duration={1.6}
                speed={0.035}
                className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-tight text-stone-900 max-w-5xl"
              >
                Designing brands
              </TextScramble>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-tight text-stone-900 max-w-5xl italic"
            >
              that move culture.
            </motion.h1>
          </div>

          {/* Bottom row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            {/* Supporting copy */}
            <p className="text-stone-500 text-base md:text-lg leading-relaxed max-w-md font-light">
              Studio Nine One is a multidisciplinary creative studio working
              across branding, visual identity, campaigns, and digital
              experiences — for brands that want to matter.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-5 shrink-0">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 text-stone-50 text-sm tracking-wide hover:bg-stone-700 transition-colors duration-300 group"
              >
                See Our Work
                <ArrowDownRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300"
                />
              </a>
              <a
                href="#contact"
                className="text-sm tracking-wide text-stone-600 hover:text-stone-900 transition-colors duration-300 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Horizontal rule */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
          className="mt-16 h-px w-full bg-stone-200"
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 flex flex-wrap gap-12 md:gap-20"
        >
          {[
            { value: '60+', label: 'Projects Delivered' },
            { value: '14', label: 'Industry Sectors' },
            { value: '8', label: 'Years of Practice' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-display text-3xl md:text-4xl text-stone-900 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs tracking-widest uppercase text-stone-400">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
