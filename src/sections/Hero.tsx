import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextScramble } from '../components/ui/text-scramble';
import { fadeUp, staggerContainer } from '../lib/motion';

const stats = [
  { value: '150+', label: 'Clients' },
  { value: '25+', label: 'Awards' },
  { value: '10+', label: 'Years of Innovation' },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [scrambleTrigger, setScrambleTrigger] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScrambleTrigger(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref} className="relative flex flex-col">
      {/* Split hero */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: '88vh' }}>
        {/* Left — orange panel */}
        <div className="relative flex flex-col justify-end bg-[#FF642B] px-8 pb-16 pt-28 md:w-[55%] md:px-14 md:pb-24 lg:px-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-10"
          >
            <motion.div variants={fadeUp}>
              <TextScramble
                as="h1"
                trigger={scrambleTrigger}
                duration={0.9}
                speed={0.03}
                className="font-display text-[clamp(3rem,7vw,6.8rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-stone-950"
              >
                Brands built to be remembered.
              </TextScramble>
            </motion.div>

            <motion.div variants={fadeUp}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border border-stone-950 bg-transparent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-stone-950 transition-colors duration-300 hover:bg-stone-950 hover:text-white"
              >
                Let's Work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — editorial image */}
        <div className="relative flex-1 bg-stone-900 md:w-[45%]" style={{ minHeight: '56vw' }}>
          <img
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&q=80&auto=format&fit=crop"
            alt="Studio 91 editorial"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 bg-stone-950/10" />
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-screen-xl grid-cols-3 divide-x divide-stone-200">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.9 + i * 0.1 }}
              className="flex flex-col gap-2 px-8 py-12 md:px-14 md:py-16 lg:px-20"
            >
              <span className="font-display text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.04em] text-stone-950">
                {stat.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
