import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { TextScramble } from '../components/ui/text-scramble';
import { fadeUp, staggerContainer } from '../lib/motion';

const stats = [
  { value: '60+', label: 'Projects Delivered' },
  { value: '14', label: 'Industry Sectors' },
  { value: '8', label: 'Years of Practice' },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [scrambleTriggerSecond, setScrambleTriggerSecond] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScrambleTrigger(true), 600);
    const timerSecond = setTimeout(() => setScrambleTriggerSecond(true), 760);
    return () => {
      clearTimeout(timer);
      clearTimeout(timerSecond);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-stone-50 px-6 pb-20 pt-32 md:px-10 md:pb-28 lg:px-16"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
        className="absolute right-0 top-0 h-px w-1/2 origin-right bg-stone-300"
      />

      <div className="mx-auto w-full max-w-screen-xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-10 md:gap-14"
        >
          <div className="flex flex-col gap-4">
            <motion.div variants={fadeUp}>
              <TextScramble
                as="h1"
                trigger={scrambleTrigger}
                duration={0.8}
                speed={0.035}
                className="font-display max-w-5xl text-[clamp(3.2rem,8vw,7.2rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-stone-950"
              >
                Building identities
              </TextScramble>
            </motion.div>

            <motion.div variants={fadeUp}>
              <TextScramble
                as="h1"
                trigger={scrambleTriggerSecond}
                duration={0.8}
                speed={0.035}
                className="font-display max-w-5xl text-[clamp(3.2rem,8vw,7.2rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-stone-950"
              >
                that earn trust fast.
              </TextScramble>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
          >
            <p className="max-w-lg text-base leading-relaxed text-stone-500 md:text-lg">
              Studio91 shapes clear, credible brands for founders and growing
              businesses across identity, digital presence, and launch
              materials, with a focus on work that feels premium from day one.
            </p>

            <div className="flex items-center gap-5 shrink-0">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#e55720]"
                style={{ backgroundColor: '#FF642B' }}
              >
                Start A Project
                <ArrowDownRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#about"
                className="text-sm font-medium uppercase tracking-[0.14em] text-stone-600 underline decoration-stone-300 underline-offset-4 transition-colors duration-300 hover:text-[#FF642B] hover:decoration-[#FF642B]"
              >
                About Studio91
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
          className="mt-16 h-px w-full bg-stone-200"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 flex flex-wrap justify-center gap-12 md:gap-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-[160px] flex-col items-center gap-1 text-center"
            >
              <span className="font-display text-3xl font-semibold tracking-[-0.05em] text-stone-950 md:text-4xl">
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
