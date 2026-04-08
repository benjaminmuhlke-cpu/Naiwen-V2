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
      className="overflow-hidden bg-stone-950 px-8 sm:px-10 md:px-14 lg:px-20 flex items-center min-h-svh"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 items-center gap-16 sm:grid-cols-2 sm:gap-12">
          {/* Left — text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-7"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-stone-500">
                About
              </p>
              <div className="h-px w-10 bg-[#FF642B]" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.2rem,4.8vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.04em] text-white"
            >
              Independent.
              <br />
              International.
              <br />
              Built on clear ideas.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-4 max-w-lg text-base leading-relaxed text-stone-400"
            >
              <p>We design brand identities and visual systems for lifestyle, F&amp;B, and culture-led brands.</p>
              <p>The focus is not just how things look, but how they hold together across packaging, spaces, and real-world use.</p>
              <p>Based between Shanghai and Taipei, working across different markets and contexts.</p>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#contact"
              className="group inline-flex items-center gap-3 self-start bg-[#FF642B] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-stone-950"
            >
              Start a Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
          </motion.div>

          {/* Right — globe */}
          <div role="img" aria-label="Interactive globe showing Studio 91's international reach across Shanghai and Taipei" className="relative hidden h-[480px] items-center justify-center sm:flex">
            <div className="pointer-events-none absolute inset-0 z-10 [background:radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgb(9,9,11)_100%)]" />
            <Globe className="top-1/2 max-w-[440px] -translate-y-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
}
