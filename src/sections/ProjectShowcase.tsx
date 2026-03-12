import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Project = {
  category: string;
  title: string;
  image: string;
};

const slides: Project[] = [
  {
    category: 'Brand Identity',
    title: 'Maison Verite',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=2000&q=80&auto=format&fit=crop',
  },
  {
    category: 'Packaging + Campaign',
    title: 'Oblique Coffee',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=2000&q=80&auto=format&fit=crop',
  },
  {
    category: 'Digital Experience',
    title: 'Forma Collective',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=2000&q=80&auto=format&fit=crop',
  },
  {
    category: 'Art Direction',
    title: 'Aura Interiors',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=2000&q=80&auto=format&fit=crop',
  },
  {
    category: 'Campaign',
    title: 'Sable FW',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2000&q=80&auto=format&fit=crop',
  },
];

const AUTO_ADVANCE_MS = 5000;

export default function ProjectShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const slideCount = slides.length;
  const activeSlide = slides[activeIndex];

  const trackStyle = useMemo(() => {
    return {
      transform: `translateX(-${activeIndex * 100}%)`,
      transition: shouldReduceMotion ? 'none' : 'transform 2700ms cubic-bezier(0.19, 1, 0.22, 1)',
    } as const;
  }, [activeIndex, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (isPaused) return;
    const id = window.setInterval(() => {
      setActiveIndex((idx) => (idx + 1) % slideCount);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [isPaused, shouldReduceMotion, slideCount]);

  return (
    <section className="bg-stone-50 px-6 py-24 md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
              Selected Projects
            </p>
            <h2 className="mt-4 text-[clamp(2.1rem,4.6vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-stone-950">
              A few projects,
              <br />
              shown slowly.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-stone-500">
            A single image at a time, cycling through selected work.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
          className="group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden bg-stone-200">
            <div className="flex w-full" style={trackStyle}>
              {slides.map((slide) => (
                <div key={slide.title} className="w-full shrink-0">
                  <div className="relative h-[clamp(220px,34vh,380px)] w-full overflow-hidden bg-stone-200 md:h-[clamp(260px,36vh,420px)]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-stone-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF642B]">
                {activeSlide.category}
              </p>
              <p className="mt-2 text-2xl font-medium tracking-[-0.02em] text-stone-950">
                {activeSlide.title}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              {slides.map((slide, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={slide.title}
                    type="button"
                    aria-label={`Go to project ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className="h-3 w-3 rounded-full transition-colors duration-200"
                    style={{
                      backgroundColor: active ? '#FF642B' : '#a8a29e',
                      opacity: active ? 1 : 0.7,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
