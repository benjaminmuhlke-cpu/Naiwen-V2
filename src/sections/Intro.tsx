import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/motion';
import { Globe } from '../components/ui/globe';

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="about"
      className="overflow-hidden bg-white px-8 py-24 md:px-14 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-12">
          {/* Left — text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-7"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-stone-400">
                About
              </p>
              <div className="h-px w-10 bg-[#FF642B]" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.2rem,4.8vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.04em] text-stone-950"
            >
              Independent.
              <br />
              International.
              <br />
              Detail-driven.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-lg text-base leading-relaxed text-stone-500"
            >
              We craft distinctive identities and visual worlds for lifestyle,
              fashion, and culture brands globally. Our approach is collaborative,
              intentional, and quality-focused.
            </motion.p>

            <motion.a
              variants={fadeUp}
              href="#contact"
              className="group inline-flex items-center gap-3 self-start bg-[#FF642B] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-stone-950"
            >
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
          </motion.div>

          {/* Right — globe */}
          <div className="relative hidden h-[480px] items-center justify-center md:flex">
            <div className="pointer-events-none absolute inset-0 z-10 [background:radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,white_100%)]" />
            <Globe className="top-1/2 max-w-[440px] -translate-y-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
}
