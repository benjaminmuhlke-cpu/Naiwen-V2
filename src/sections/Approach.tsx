import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../lib/motion';
import { useLanguage } from '../context/LanguageContext';

const numbers = ['01', '02', '03', '04'];

export default function Approach() {
  const { t } = useLanguage();
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
                {t.approach.label}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-tight tracking-tight text-stone-900"
              >
                {t.approach.heading1}
                <br />
                <em>{t.approach.heading2}</em>
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="md:col-span-5 md:col-start-8 flex items-end"
            >
              <p className="text-stone-500 text-base md:text-lg leading-relaxed font-light">
                {t.approach.intro}
              </p>
            </motion.div>
          </div>

          {/* Pillars */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8"
          >
            {t.approach.pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="flex flex-col gap-5 group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <span className="text-xs tracking-widest text-stone-300 font-mono">
                      {numbers[index]}
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
