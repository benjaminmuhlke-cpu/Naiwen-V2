import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../lib/motion';
import { InfiniteSlider } from '../components/ui/infinite-slider';

const testimonials = [
  {
    quote:
      "Studio91 didn't just design our identity. They clarified our positioning and made the brand feel immediately more credible.",
    author: 'Margaux Delacroix',
    role: 'Founder, Maison Verite',
  },
  {
    quote:
      'Working with the team felt like having a creative partner who understood the brief quickly and translated it into sharp, usable direction.',
    author: 'James Osei',
    role: 'Creative Director, Oblique Coffee',
  },
  {
    quote:
      'They turned a complicated brand problem into a clean system our team could actually use. It gave us confidence right away.',
    author: 'Lena Hoffmann',
    role: 'CEO, Forma Collective',
  },
];

const collaborators = [
  { kind: 'wordmark', label: 'Maison Verite' },
  { kind: 'badge', label: 'OC', sublabel: 'Oblique Coffee' },
  { kind: 'wordmark', label: 'Forma Collective' },
  { kind: 'badge', label: 'AI', sublabel: 'Aura Interiors' },
  { kind: 'wordmark', label: 'Sable FW' },
  { kind: 'badge', label: 'MS', sublabel: 'Meridian Studio' },
  { kind: 'wordmark', label: 'Reverie Agency' },
  { kind: 'badge', label: 'EH', sublabel: 'Epoch Hospitality' },
  { kind: 'wordmark', label: 'Soleil Collective' },
  { kind: 'badge', label: 'NA', sublabel: 'Noire Atelier' },
  { kind: 'wordmark', label: 'Harbour & Co' },
  { kind: 'badge', label: 'AB', sublabel: 'Atlas Brands' },
] as const;

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-stone-900 px-6 py-24 text-stone-50 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-screen-xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div className="mb-20 flex flex-col gap-3 md:mb-28">
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium uppercase tracking-[0.25em] text-stone-500"
            >
              Trusted By Founders
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display max-w-4xl text-[clamp(2.2rem,5vw,4.75rem)] font-semibold leading-[1] tracking-[-0.05em] text-stone-50"
            >
              Social proof that helps clients
              <br />
              trust the process quickly.
            </motion.h2>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-px bg-stone-800 md:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={fadeUp}
                className="group flex flex-col justify-between gap-10 bg-stone-900 p-8 transition-colors duration-400 hover:bg-stone-800 md:p-10"
              >
                <p className="text-lg leading-relaxed text-stone-200 md:text-xl">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex flex-col gap-1 border-t border-stone-800 pt-4 transition-colors duration-300 group-hover:border-stone-700">
                  <span className="text-sm font-semibold text-stone-50">
                    {testimonial.author}
                  </span>
                  <span className="text-xs tracking-wide text-stone-500">
                    {testimonial.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-20 flex flex-col gap-8 border-t border-stone-800 pt-10 md:mt-28"
          >
            <p className="px-0 text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
              Selected Collaborators
            </p>
            <InfiniteSlider gap={60} duration={45} durationOnHover={90} className="w-full">
              {collaborators.map((item) => (
                <div key={`${item.kind}-${item.label}`} className="flex shrink-0 items-center gap-14">
                  {item.kind === 'badge' ? (
                    <div className="flex min-w-[150px] items-center gap-3 rounded-full border border-[#FF642B]/40 bg-[#FF642B]/10 px-4 py-2 text-[#FF642B]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FF642B]/60 text-sm font-bold uppercase tracking-[0.2em]">
                        {item.label}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                        {item.sublabel}
                      </span>
                    </div>
                  ) : (
                    <span className="font-display text-xl font-semibold tracking-[-0.04em] text-[#FF642B] md:text-2xl">
                      {item.label}
                    </span>
                  )}
                  <span className="select-none text-sm text-[#FF642B]/45">·</span>
                </div>
              ))}
            </InfiniteSlider>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
