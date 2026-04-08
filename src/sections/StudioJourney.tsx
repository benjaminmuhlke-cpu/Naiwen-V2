import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Timeline } from '../components/ui/timeline';
import { staggerContainer, fadeUp } from '../lib/motion';
import { useLanguage } from '../context/LanguageContext';

const timelineImages = [
  [
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop', alt: 'Studio founding' },
    { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80&auto=format&fit=crop', alt: 'Early studio work' },
  ],
  [
    { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80&auto=format&fit=crop', alt: 'Brand strategy work 2021' },
    { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&auto=format&fit=crop', alt: 'International clients' },
  ],
  [
    { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop', alt: 'Packaging systems 2022' },
    { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop', alt: 'Digital experiences' },
  ],
  [
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop', alt: 'Global studio 2023' },
    { src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&auto=format&fit=crop', alt: 'Studio Nine One today' },
  ],
];

const years = ['2020', '2021', '2022', '2023'];

export default function StudioJourney() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const timelineData = years.map((year, i) => ({
    title: year,
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light max-w-xl">
          {t.journey.years[i]}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {timelineImages[i].map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="rounded-none object-cover h-32 md:h-48 w-full grayscale"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section ref={ref} className="bg-stone-100 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 pt-28 md:pt-40">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end gap-6 md:gap-20 mb-16"
        >
          <div className="flex flex-col gap-3 flex-1">
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.25em] uppercase text-stone-400"
            >
              {t.journey.label}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-tight tracking-tight text-stone-900"
            >
              {t.journey.heading1}
              <br />
              <em>{t.journey.heading2}</em>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-stone-500 text-base md:text-lg leading-relaxed max-w-md font-light flex-1"
          >
            {t.journey.intro}
          </motion.p>
        </motion.div>
      </div>

      <Timeline data={timelineData} />
    </section>
  );
}
