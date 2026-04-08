import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Layers,
  Fingerprint,
  Camera,
  Package,
  Monitor,
  Megaphone,
} from 'lucide-react';
import { staggerContainer, fadeUp } from '../lib/motion';
import { useLanguage } from '../context/LanguageContext';

const icons = [Layers, Fingerprint, Camera, Package, Monitor, Megaphone];

export default function Services() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="services"
      className="py-28 md:py-40 px-6 md:px-10 lg:px-16 bg-stone-100 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-20 mb-16 md:mb-24">
            <div className="flex flex-col gap-3 flex-1">
              <motion.p
                variants={fadeUp}
                className="text-xs tracking-[0.25em] uppercase text-stone-400"
              >
                {t.services.label}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-tight tracking-tight text-stone-900"
              >
                {t.services.heading1}
                <br />
                <em>{t.services.heading2}</em>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="text-stone-500 text-base md:text-lg leading-relaxed max-w-md font-light flex-1"
            >
              {t.services.intro}
            </motion.p>
          </div>

          {/* Service grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-300"
          >
            {t.services.items.map((service, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  className="bg-stone-100 p-8 md:p-10 flex flex-col gap-5 group hover:bg-stone-50 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 flex items-center justify-center border border-stone-300 group-hover:border-stone-900 transition-colors duration-300">
                      <Icon size={18} className="text-stone-600 group-hover:text-stone-900 transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xl tracking-tight text-stone-900">
                      {service.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4">
                    <span className="text-xs tracking-widest uppercase text-stone-400 group-hover:text-stone-700 transition-colors duration-300">
                      {t.services.learnMore}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
