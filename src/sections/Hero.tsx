import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  {
    value: 150,
    suffix: '+',
    label: 'Clients',
    description: 'From global lifestyle brands to emerging independents — each treated as our only client.',
  },
  {
    value: 25,
    suffix: '+',
    label: 'Awards',
    description: 'Industry recognition for craft, strategy, and design that moves culture forward.',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years of Innovation',
    description: 'A decade of building brands that last across fashion, culture, and lifestyle.',
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

function StatItem({ stat, active, index }: { stat: typeof stats[0]; active: boolean; index: number }) {
  const count = useCountUp(stat.value, active, 1600 + index * 100);

  return (
    <div
      className="flex flex-col gap-0 py-10 md:py-14"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
    >
      {/* Big number + suffix */}
      <div className="flex items-start leading-none">
        <span className="font-display text-[clamp(3.5rem,8vw,7rem)] font-bold tracking-[-0.04em] text-stone-950">
          {count}
        </span>
        <span className="mt-2 font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-[-0.02em] text-stone-950">
          {stat.suffix}
        </span>
      </div>

      {/* Divider */}
      <div className="mb-4 mt-3 h-px w-full bg-stone-200" />

      {/* Label */}
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-stone-950 md:text-base">
        {stat.label}
      </p>

      {/* Description */}
      <p className="max-w-xs text-sm leading-relaxed text-stone-400">
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
      <div className="flex flex-col md:flex-row" style={{ height: '100vh' }}>
        {/* Left — orange panel */}
        <div className="relative flex flex-col justify-center bg-[#FF642B] px-8 pb-6 pt-14 md:w-[42%] md:px-14 md:pb-8 md:pt-16 lg:px-20">
          <div className="flex flex-col gap-5">
            <h1 className="font-display text-[clamp(3rem,6.5vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-stone-950">
              Brands built to be remembered.
            </h1>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-stone-900/70 md:text-base">
              Independent brand studio crafting distinctive identities for lifestyle, fashion, and culture brands worldwide.
            </p>
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
            alt="Studio 91 editorial"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 bg-stone-950/10" />
        </div>
      </div>

      {/* Stats strip */}
      <div ref={statsRef} className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-0 divide-y divide-stone-100 px-8 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-14 lg:px-20">
          {stats.map((stat, i) => (
            <div key={stat.label} className={i > 0 ? 'md:pl-10 lg:pl-14' : ''}>
              <StatItem stat={stat} active={isInView} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
