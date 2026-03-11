import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TextScramble } from '../components/ui/text-scramble';
import { staggerContainer, fadeUp } from '../lib/motion';

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <section
      ref={ref}
      id="contact"
      className="py-32 md:py-48 px-6 md:px-10 lg:px-16 bg-stone-50 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="flex flex-col items-center text-center gap-10 md:gap-14"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.25em] uppercase text-stone-400"
          >
            Let's Build Something
          </motion.p>

          {/* Main heading with TextScramble */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <TextScramble
              as="h2"
              trigger={isInView}
              duration={1.4}
              speed={0.04}
              className="font-display text-[clamp(2.8rem,8vw,8rem)] leading-[0.9] tracking-tight text-stone-900"
            >
              Ready to begin?
            </TextScramble>
          </motion.div>

          {/* Sub copy */}
          <motion.p
            variants={fadeUp}
            className="text-stone-500 text-base md:text-xl leading-relaxed max-w-xl font-light"
          >
            Tell us about your project. We'll respond within 24 hours with a
            perspective on how we can help.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeUp}>
            <motion.a
              href="mailto:hello@studionioneone.com"
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-stone-900 text-stone-50 text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors duration-300 group"
            >
              <TextScramble
                trigger={buttonHovered}
                duration={0.5}
                speed={0.03}
                characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                className="tracking-widest"
              >
                Start a Project
              </TextScramble>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </motion.a>
          </motion.div>

          {/* Email link */}
          <motion.a
            variants={fadeUp}
            href="mailto:hello@studionioneone.com"
            className="text-sm text-stone-400 hover:text-stone-700 transition-colors duration-300 tracking-wide"
          >
            hello@studionioneone.com
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative horizontal line */}
      <motion.div
        initial={{ scaleX: 0, originX: 0.5 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
        className="max-w-screen-xl mx-auto mt-24 h-px bg-stone-200"
      />
    </section>
  );
}
