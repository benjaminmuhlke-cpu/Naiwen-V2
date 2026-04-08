import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';


const stats = [
  {
    value: 10,
    suffix: '+',
    label: 'Years',
    description: 'Across branding, packaging, and visual systems.',
  },
  {
    value: 150,
    suffix: '+',
    label: 'Projects',
    description: 'Across branding, packaging, and real-world application.',
  },
  {
    value: null,
    suffix: 'PERSPECTIVE',
    label: 'GLOCAL',
    description: 'Working between Asian and international markets, translating across different cultural contexts.',
  },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function GlocalAnimation({ active }: { active: boolean }) {
  const [display, setDisplay] = useState('\u00A0'); // non-breaking space keeps height
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const add = (fn: () => void, ms: number) =>
      timers.push(setTimeout(fn, ms));

    // Timings tuned so GLOCAL finishes at ~1800ms (same as number count-up):
    // type GLOBAL(6×55) + hold(140) + delete(6×42) + gap(25)
    // + type LOCAL(5×55) + hold(140) + delete(5×42) + gap(25)
    // + type GLOCAL(6×55) = ~1780ms ✓
    const TYPE_MS   = 72;
    const DELETE_MS = 55;
    const HOLD_MS   = 182;
    const GAP_MS    = 33;

    let t = 0;

    const typeWord = (word: string) => {
      for (let i = 1; i <= word.length; i++) {
        const s = word.slice(0, i);
        add(() => setDisplay(s), t);
        t += TYPE_MS;
      }
    };

    const deleteWord = (word: string) => {
      t += HOLD_MS;
      for (let i = word.length - 1; i >= 0; i--) {
        const s = i === 0 ? '\u00A0' : word.slice(0, i);
        add(() => setDisplay(s), t);
        t += DELETE_MS;
      }
      t += GAP_MS;
    };

    typeWord('GLOBAL');
    deleteWord('GLOBAL');
    typeWord('LOCAL');
    deleteWord('LOCAL');
    typeWord('GLOCAL'); // final — stays

    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <span
      className="font-display font-bold tracking-[-0.04em] text-stone-950 leading-none"
      style={{ fontSize: 'clamp(3.2rem, 7vw, 6.2rem)' }}
    >
      {display}
    </span>
  );
}

function StatItem({ stat, active, index }: { stat: typeof stats[0]; active: boolean; index: number }) {
  const count = useCountUp(stat.value ?? 0, active, 2080 + index * 130);

  return (
    <div
      className="flex flex-col gap-0 py-10 text-center md:py-14"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
    >
      {/* Big number + suffix — fixed minHeight so YEARS/PROJECTS/PERSPECTIVE all sit at same y */}
      <div
        className="flex items-end justify-center leading-none"
        style={{ minHeight: 'clamp(3.5rem, 8vw, 7rem)' }}
      >
        {stat.value !== null ? (
          <>
            <span className="font-display text-[clamp(3.5rem,8vw,7rem)] font-bold tracking-[-0.04em] text-stone-950">
              {count}
            </span>
            <span className="self-start font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-[-0.02em] text-stone-950">
              {stat.suffix}
            </span>
          </>
        ) : (
          <GlocalAnimation active={active} />
        )}
      </div>

      {/* Divider */}
      <div className="mb-2 mt-1.5" />

      {/* Label — for numeric stats show the label; for text stats show the suffix as sublabel */}
      <p className="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-stone-950 md:text-base">
        {stat.value !== null ? stat.label : stat.suffix}
      </p>

      {/* Description */}
      <p className="mx-auto max-w-xs text-sm leading-relaxed text-stone-400 md:mx-auto">
        {stat.description}
      </p>
    </div>
  );
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.2 });

  return (
    <section className="relative flex flex-col">
      {/* Split hero — exactly fills the viewport */}
      <div className="flex flex-col md:flex-row h-svh">
        {/* Left — orange panel */}
        <div className="relative flex flex-col justify-center bg-[#FF642B] px-8 pb-6 pt-14 md:w-[42%] md:px-14 md:pb-8 md:pt-16 lg:px-20">
          <div className="flex flex-col gap-5">
            <h1 className="font-display text-[clamp(2rem,4vw,4rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-stone-950">
              BRANDS BUILT TO BE FELT AND REMEMBERED.
            </h1>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-stone-900/70 md:text-base">
              Branding, packaging, and creative direction for F&B, lifestyle, and culture-led brands, built with a clear point of view and designed to work in real situations.  </p>
            <a
              href="#contact"
              className="inline-flex self-start items-center bg-stone-950 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-stone-950"
            >
              Start a Project
            </a>
          </div>
        </div>

        {/* Right — editorial image, full bleed to bottom of viewport */}
        <div className="relative flex-1 bg-stone-900 md:w-[58%]">
          <img
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1800&q=90&auto=format&fit=crop"
            alt="Editorial portrait representing Studio 91's aesthetic — refined, minimal, culture-led"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-stone-950/10" />
        </div>
      </div>

      {/* Stats strip */}
      <aside aria-label="Studio 91 at a glance" ref={statsRef} className="border-t border-stone-200 bg-white">
        <dl className="grid grid-cols-1 gap-0 px-6 md:grid-cols-3 md:px-8 lg:px-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="">

              <StatItem stat={stat} active={isInView} index={i} />
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
