import { FormEvent, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../lib/motion';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';

const projectTypes = [
  'Brand Identity',
  'Packaging & Campaign',
  'Digital Experience',
  'Art Direction',
  'Strategy & Positioning',
  'Other',
];

const inputClass =
  'w-full border border-stone-200 bg-[#f5f5f5] px-4 py-3 font-sans text-sm text-stone-900 outline-none transition-colors duration-200 placeholder:text-stone-400 focus:border-stone-950 focus:bg-white';

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('_subject', 'New Studio 91 inquiry');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-white px-8 pb-8 pt-16 md:px-14 md:pb-10 md:pt-20 lg:px-20"
    >
      <div className="mx-auto max-w-screen-xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20"
        >
          {/* Left — headline */}
          <div className="flex flex-col gap-6">
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-[0.28em] text-stone-400"
            >
              Contact
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-stone-950"
            >
              Start a<br />project.
            </motion.h2>

            <motion.p variants={fadeUp} className="text-sm leading-relaxed text-stone-500">
              Share your contact info and a short description of what you need.
              We'll respond within{' '}
              <span className="font-semibold text-stone-800">48 hours</span>.
            </motion.p>

            <motion.a
              variants={fadeUp}
              href="mailto:naiwen1991@gmail.com"
              className="font-display text-[1.35rem] font-bold tracking-[-0.02em] text-stone-950 transition-colors duration-300 hover:text-[#FF642B] md:text-[1.6rem]"
            >
              naiwen1991@gmail.com
            </motion.a>
          </div>

          {/* Right — form */}
          <motion.form variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-stone-700">
                  Name
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  className={inputClass}
                  placeholder="Your name"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-stone-700">
                  Email
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-stone-700">
                Brand / Company
              </span>
              <input
                name="company"
                type="text"
                className={inputClass}
                placeholder="Optional"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-stone-700">
                Project Type
              </span>
              <select
                required
                name="projectType"
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  Select a type
                </option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-stone-700">
                Brief
              </span>
              <textarea
                required
                name="brief"
                rows={3}
                className={inputClass}
                placeholder="Briefly describe your project and goals"
              />
            </label>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center bg-[#FF642B] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-stone-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending...' : 'Submit'}
              </button>

              {status === 'success' && (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                  Sent. We'll be in touch soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
