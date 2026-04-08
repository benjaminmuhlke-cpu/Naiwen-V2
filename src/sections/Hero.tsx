import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function GlocalAnimation({ active }: { active: boolean }) {
  const [display, setDisplay] = useState('\u00A0');
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const add = (fn: () => void, ms: number) =>
      timers.push(setTimeout(fn, ms));

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
    typeWord('GLOCAL');

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

type StatData = { value: number | null; suffix: string; label: string; description: string };

function StatItem({ stat, active, index }: { stat: StatData; active: boolean; index: number }) {
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

      <div className="mb-2 mt-1.5" />

      <p className="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-stone-950 md:text-base">
        {stat.value !== null ? stat.label : stat.suffix}
      </p>

      <p className="mx-auto max-w-xs text-sm leading-relaxed text-stone-400 md:mx-auto">
        {stat.description}
      </p>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.2 });

  const stats: StatData[] = [
    { value: 10,  suffix: '+', label: t.hero.stats.years.label,    description: t.hero.stats.years.desc },
    { value: 150, suffix: '+', label: t.hero.stats.projects.label, description: t.hero.stats.projects.desc },
    { value: null, suffix: t.hero.stats.glocal.suffix, label: 'GLOCAL', description: t.hero.stats.glocal.desc },
  ];

  return (
    <section className="relative flex flex-col">
      <div className="flex flex-col md:flex-row h-svh">
        {/* Left — orange panel */}
        <div className="relative flex flex-col justify-center bg-[#FF642B] px-8 pb-6 pt-14 md:w-[42%] md:px-14 md:pb-8 md:pt-16 lg:px-20">
          <div className="flex flex-col gap-5">
            <h1 className="font-display text-[clamp(2rem,4vw,4rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-stone-950">
              {t.hero.heading}
            </h1>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-stone-900/70 md:text-base">
              {t.hero.sub}
            </p>
            <a
              href="#contact"
              className="inline-flex self-start items-center bg-stone-950 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-stone-950"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>

        {/* Right — editorial image */}
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
      <aside aria-label={t.hero.statsLabel} ref={statsRef} className="border-t border-stone-200 bg-white">
        <dl className="grid grid-cols-1 gap-0 px-6 md:grid-cols-3 md:px-8 lg:px-12">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <StatItem stat={stat} active={isInView} index={i} />
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
