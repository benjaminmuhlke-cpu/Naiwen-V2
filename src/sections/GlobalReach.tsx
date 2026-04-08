import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/motion';

const markets = [
  { city: 'Shanghai', region: 'Asia' },
  { city: 'Taipei', region: 'Asia' },
  { city: 'Paris', region: 'Europe' },
  { city: 'Amsterdam', region: 'Europe' },
  { city: 'New York', region: 'Americas' },
  { city: 'Tokyo', region: 'Asia' },
];

export default function GlobalReach() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      id="reach"
      className="border-t border-stone-100 bg-white px-8 py-16 md:px-14 md:py-20 lg:px-20"
    >
      <div className="mx-auto max-w-screen-xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16"
        >
          <div className="shrink-0">
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-[0.28em] text-stone-400"
            >
              Global Inspiration
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-xs text-base font-semibold leading-snug tracking-[-0.02em] text-stone-950"
            >
              A glocal point of view shaped by world capitals.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-3 md:gap-x-16"
          >
            {markets.map((m) => (
              <div key={m.city} className="flex items-baseline gap-2">
                <span className="text-sm font-semibold tracking-[-0.01em] text-stone-800">
                  {m.city}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
                  {m.region}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
