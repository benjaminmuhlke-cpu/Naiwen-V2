import { useEffect, useState } from 'react';

type Project = {
  category: string;
  title: string;
  images: string[];
};

const projects: Project[] = [
  {
    title: 'Maison None',
    category: 'Brand Identity',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80&auto=format&fit=crop',
    ],
  },
  {
    title: 'Clouce Coffee',
    category: 'Branding & Packaging',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1400&q=80&auto=format&fit=crop',
    ],
  },
  {
    title: 'Aesop',
    category: 'Editorial Design',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1400&q=80&auto=format&fit=crop',
    ],
  },
  {
    title: 'Forma Studio',
    category: 'Visual Identity',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80&auto=format&fit=crop',
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % project.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [project.images.length]);

  return (
    <div
      className="group relative overflow-hidden bg-stone-200"
      style={{ height: 'clamp(380px, calc(100vh - 220px), 900px)' }}
    >
      {/* Slides */}
      {project.images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${project.title} ${i + 1}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      ))}

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-stone-950/25 transition-opacity duration-300 group-hover:bg-stone-950/40" />

      {/* Title + category */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <p className="font-display text-lg font-bold uppercase leading-tight tracking-[-0.01em] text-white md:text-xl">
          {project.title}
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
          {project.category}
        </p>
      </div>

      {/* Dot indicators — bottom center */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-row items-center gap-2">
        {project.images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-2 w-2 rounded-full transition-all duration-500"
            style={{
              backgroundColor: i === active ? '#ffffff' : 'rgba(200,200,200,0.55)',
              transform: i === active ? 'scale(1.4)' : 'scale(1)',
            }}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const row1 = projects.slice(0, 2);
  const row2 = projects.slice(2, 4);

  return (
    <section id="work" className="bg-white px-8 pb-16 pt-24 md:px-14 md:pb-20 md:pt-28 lg:px-20">
      <div className="mx-auto max-w-screen-xl">

        <h2 className="mb-8 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold uppercase leading-[1] tracking-[-0.04em] text-stone-950 md:mb-10">
          Recent Projects
        </h2>

        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {row1.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>

        {/* Row 2 */}
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {row2.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>

      </div>
    </section>
  );
}
