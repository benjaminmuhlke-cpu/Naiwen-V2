import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../lib/motion';
import { InfiniteSlider } from '../components/ui/infinite-slider';

const testimonials = [
  {
    quote:
      "Studio Nine One didn't just design our identity. They articulated something we'd felt but couldn't name. The result is a brand that feels entirely inevitable.",
    author: "Margaux Delacroix",
    role: "Founder, Maison Verite",
  },
  {
    quote:
      "Working with the team was like having a creative partner who understood the brief better than we did. Sharp, fast, and deeply considered at every step.",
    author: "James Osei",
    role: "Creative Director, Oblique Coffee",
  },
  {
    quote:
      "They transformed a complicated brand problem into a simple, beautiful system. Our team can work with it. Our customers immediately understood it.",
    author: "Lena Hoffmann",
    role: "CEO, Forma Collective",
  },
];

const collaborators = [
  "Maison Verite",
  "Oblique Coffee",
  "Forma Collective",
  "Aura Interiors",
  "Sable FW",
  "Meridian Studio",
  "Reverie Agency",
  "Epoch Hospitality",
  "Soleil Collective",
  "Noire Atelier",
  "Harbour & Co",
  "Atlas Brands",
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="py-28 md:py-40 px-6 md:px-10 lg:px-16 bg-stone-900 text-stone-50 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Header */}
          <div className="flex flex-col gap-3 mb-20 md:mb-28">
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.25em] uppercase text-stone-500"
            >
              Client Words
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-tight tracking-tight text-stone-50 max-w-3xl"
            >
              What our clients
              <br />
              <em>say about us.</em>
            </motion.h2>
          </div>

          {/* Testimonial cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.author}
                variants={fadeUp}
                className="bg-stone-900 p-8 md:p-10 flex flex-col justify-between gap-10 group hover:bg-stone-800 transition-colors duration-400"
              >
                <p className="font-display text-lg md:text-xl leading-relaxed text-stone-200 italic">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex flex-col gap-1 pt-4 border-t border-stone-800 group-hover:border-stone-700 transition-colors duration-300">
                  <span className="text-sm text-stone-50 font-medium">
                    {t.author}
                  </span>
                  <span className="text-xs text-stone-500 tracking-wide">
                    {t.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Collaborators strip — InfiniteSlider */}
          <motion.div
            variants={fadeUp}
            className="mt-20 md:mt-28 pt-10 border-t border-stone-800 flex flex-col gap-8"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-stone-500 px-0">
              Selected Collaborators
            </p>
            <InfiniteSlider
              gap={60}
              duration={45}
              durationOnHover={90}
              className="w-full"
            >
              {collaborators.map((name) => (
                <span
                  key={name}
                  className="font-display text-xl md:text-2xl text-stone-600 hover:text-stone-200 transition-colors duration-500 cursor-default tracking-tight shrink-0 flex items-center gap-14"
                >
                  {name}
                  <span className="text-stone-800 text-sm select-none">·</span>
                </span>
              ))}
            </InfiniteSlider>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
