import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Project = {
  category: string;
  title: string;
  slug: string;
  images: string[];
};

const projects: Project[] = [
  {
    title: 'TAFE BUTTERBEER PASTRY',
    category: 'Packaging',
    slug: 'tafe-warner-hp',
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400&q=80&auto=format&fit=crop',
    ],
  },
  {
    title: 'STARBUCKS',
    category: 'Limited Edition Packaging',
    slug: 'starbucks',
    images: [
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=80&auto=format&fit=crop',
    ],
  },
  {
    title: 'BE-KIND',
    category: 'Campaign & Packaging',
    slug: 'be-kind',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=1400&q=80&auto=format&fit=crop',
    ],
  },
  {
    title: 'YEAH RIGHT',
    category: 'Brand Identity',
    slug: 'yeah-right',
    images: [
      'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80&auto=format&fit=crop',
    ],
  },
  {
    title: 'ENERGY',
    category: 'Digital & Motion',
    slug: 'energy',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1400&q=80&auto=format&fit=crop',
    ],
  },
  {
    title: 'LA FESTIN',
    category: 'Brand Identity',
    slug: 'la-festin',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1400&q=80&auto=format&fit=crop',
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
    <Link to={`/projects/${project.slug}`} className="block" aria-label={`View ${project.title} — ${project.category} case study`}>
      <div
        className="group relative cursor-pointer overflow-hidden bg-stone-200"
        style={{ height: 'clamp(220px, 38vw, 600px)' }}
      >
        {/* Slides */}
        {project.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${project.title} — ${project.category}, image ${i + 1}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: i === active ? 1 : 0,
              transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        ))}

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-stone-950/25 transition-opacity duration-300 group-hover:bg-stone-950/45" />

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
              onClick={(e) => { e.preventDefault(); setActive(i); }}
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
    </Link>
  );
}

export default function ProjectShowcase() {
  const row1 = projects.slice(0, 2);
  const row2 = projects.slice(2, 4);
  const row3 = projects.slice(4, 6);

  return (
    <section id="work" className="bg-white px-8 pb-16 pt-24 md:px-14 md:pb-20 md:pt-28 lg:px-20">
      <div className="mx-auto max-w-screen-xl">

        <h2 className="mb-8 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold uppercase leading-[1] tracking-[-0.04em] text-stone-950 md:mb-10">
          Work
        </h2>

        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {row1.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>

        {/* Row 2 */}
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {row2.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>

        {/* Row 3 */}
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {row3.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>

      </div>
    </section>
  );
}
