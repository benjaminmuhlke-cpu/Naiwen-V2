import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { sanityClient, PROJECTS_QUERY } from '../lib/sanity';

type Project = {
  category: string;
  title: string;
  slug: string;
  images: string[];
};

function ProjectCard({ project, categoryLabel }: { project: Project; categoryLabel: string }) {
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

        <div className="pointer-events-none absolute inset-0 bg-stone-950/25 transition-opacity duration-300 group-hover:bg-stone-950/45" />

        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <p className="font-display text-lg font-bold uppercase leading-tight tracking-[-0.01em] text-white md:text-xl">
            {project.title}
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
            {categoryLabel}
          </p>
        </div>

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
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient.fetch<Project[]>(PROJECTS_QUERY)
      .then((data) => {
        setProjects(data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const row1 = projects.slice(0, 2);
  const row2 = projects.slice(2, 4);
  const row3 = projects.slice(4, 6);

  const catLabel = (cat: string) =>
    (t.showcase.categories as Record<string, string>)[cat] ?? cat;

  return (
    <section id="work" className="bg-white px-8 pb-16 pt-24 md:px-14 md:pb-20 md:pt-28 lg:px-20">
      <div className="mx-auto max-w-screen-xl">

        <h2 className="mb-8 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold uppercase leading-[1] tracking-[-0.04em] text-stone-950 md:mb-10">
          {t.showcase.heading}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-stone-100"
                style={{ height: 'clamp(220px, 38vw, 600px)' }}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {row1.map((p) => <ProjectCard key={p.slug} project={p} categoryLabel={catLabel(p.category)} />)}
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
              {row2.map((p) => <ProjectCard key={p.slug} project={p} categoryLabel={catLabel(p.category)} />)}
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
              {row3.map((p) => <ProjectCard key={p.slug} project={p} categoryLabel={catLabel(p.category)} />)}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
