import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sanityClient, PROJECT_BY_SLUG_QUERY } from '../lib/sanity';

// ─── Types ─────────────────────────────────────────────────────────────────────

type Project = {
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  role: string;
  deliverables: string;
  overviewTitle: string;
  overview: string;
  overviewSub: string;
  tags: string[];
  heroImage: string;
  images: string[];
  closingTitle: string;
  closingText1: string;
  closingText2: string;
  next: string | null;
};

// ─── Animation helpers ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.19, 1, 0.22, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

const marqueeItems = ['Brand Identity', '✦', 'Art Direction', '✦', 'Visual Systems', '✦', 'Typography', '✦', 'Packaging', '✦', 'Strategy', '✦'];

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden bg-[#FF642B] py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`px-6 font-display text-lg font-black uppercase tracking-wide md:text-2xl ${item === '✦' ? 'text-stone-900/30' : 'text-stone-900'}`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Skeleton loader ───────────────────────────────────────────────────────────

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-stone-50 animate-pulse">
      <div className="h-svh bg-stone-900" />
      <div className="h-14 bg-orange-200" />
      <div className="px-8 py-36 md:px-14 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="h-8 w-1/3 rounded bg-stone-200 mb-8" />
          <div className="h-16 w-2/3 rounded bg-stone-200" />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [onDark, setOnDark] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setProject(null);
    setNextProject(null);
    sanityClient
      .fetch<Project>(PROJECT_BY_SLUG_QUERY, { slug })
      .then((data) => {
        setProject(data ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!project?.next) return;
    sanityClient
      .fetch<Project>(PROJECT_BY_SLUG_QUERY, { slug: project.next })
      .then((data) => setNextProject(data ?? null))
      .catch(() => {});
  }, [project?.next]);

  useEffect(() => {
    if (project) document.title = `${project.title} | Studio 91`;
    return () => { document.title = 'Studio 91 | Brand Identity, Packaging & Creative Direction'; };
  }, [project]);

  useEffect(() => {
    const update = () => {
      setOnDark(window.scrollY < window.innerHeight - 80);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (loading) return <SkeletonLoader />;

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <p className="mb-4 text-stone-400">Project not found.</p>
        <Link to="/" className="text-sm font-bold uppercase tracking-widest text-stone-900 underline">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">

      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-5 md:px-14 lg:px-20">
        <Link
          to="/"
          className={`py-3 -my-3 font-display text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${onDark ? 'text-white' : 'text-[#FF642B]'}`}
        >
          Studio 91
        </Link>
        <a
          href="/#work"
          className={`flex items-center gap-2 py-3 -my-3 text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${onDark ? 'text-white/80 hover:text-white' : 'text-[#FF642B]/80 hover:text-[#FF642B]'}`}
        >
          <ArrowLeft size={13} /> {t.project.allProjects}
        </a>
      </nav>

      <section className="relative min-h-[560px] h-svh overflow-hidden bg-stone-950">
        <div className="absolute inset-0 opacity-50">
          <img src={project.heroImage} alt={project.title} className="h-full w-full object-cover" />
        </div>
        <motion.div
          className="relative z-10 flex h-full flex-col justify-end px-8 pb-16 md:px-14 md:pb-24 lg:px-20"
          initial="hidden" animate="visible" variants={stagger}
        >
          <motion.p variants={fadeUp} className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#FF642B]">
            {project.category}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold uppercase leading-none tracking-tight text-white"
            style={{ fontSize: 'clamp(2.2rem, 8vw, 9rem)' }}
          >
            {project.title}
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            {[
              { label: t.project.client, value: project.client },
              { label: t.project.year, value: project.year },
              { label: t.project.services, value: project.deliverables },
              { label: t.project.role, value: project.role },
            ].map((item) => (
              <div key={item.label}>
                <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/40">{item.label}</p>
                <p className="text-sm font-medium text-white">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Marquee />

      <section className="px-8 py-16 md:px-14 md:py-36 lg:px-20">
        <Reveal>
          <div className="mx-auto max-w-screen-xl">
            <p className="mb-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-stone-400">{t.project.overview}</p>
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
              <div>
                <h2
                  className="font-display font-bold leading-tight tracking-tight text-stone-900"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {project.overviewTitle}
                </h2>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span key={tag} className="bg-stone-900 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 leading-relaxed text-stone-900">{project.overview}</p>
                <p className="leading-relaxed text-stone-900">{project.overviewSub}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal className="px-8 py-4 md:px-14 lg:px-20">
        <div className="mx-auto max-w-screen-xl overflow-hidden bg-stone-200 aspect-[3/2] md:aspect-auto md:h-svh">
          <img src={project.images[0]} alt="Project overview" className="h-full w-full object-cover" />
        </div>
      </Reveal>

      <Reveal className="px-8 py-4 md:px-14 lg:px-20">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden bg-stone-200 aspect-[4/3] sm:aspect-auto sm:h-svh">
            <img src={project.images[1]} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center bg-stone-950 px-10 py-16 md:px-14 sm:h-svh">
            <p className="mb-6 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#FF642B]">{t.project.behind}</p>
            <h3 className="mb-6 font-display font-bold uppercase leading-tight text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
              {project.closingTitle}
            </h3>
            <p className="mb-4 leading-relaxed text-stone-400">{project.closingText1}</p>
            <p className="leading-relaxed text-stone-400">{project.closingText2}</p>
          </div>
        </div>
      </Reveal>

      <Reveal className="px-8 py-4 md:px-14 lg:px-20">
        <div className="mx-auto max-w-screen-xl overflow-hidden bg-stone-200 aspect-[3/2] md:aspect-auto md:h-svh">
          <img src={project.images[2]} alt="" className="h-full w-full object-cover" />
        </div>
      </Reveal>

      <Reveal className="px-8 py-4 pb-16 md:px-14 md:pb-24 lg:px-20">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden bg-stone-200 aspect-[3/2] sm:aspect-auto sm:h-svh">
            <img src={project.images[3]} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden bg-stone-200 aspect-[3/2] sm:aspect-auto sm:h-svh">
            <img src={project.images[4]} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </Reveal>

      {nextProject && (
        <Link
          to={`/projects/${nextProject.slug}`}
          className="group relative flex flex-col items-center justify-center overflow-hidden bg-stone-950 px-6 py-32 text-center text-white md:py-48"
        >
          <div className="absolute inset-0 opacity-25">
            <img src={nextProject.heroImage} alt={nextProject.title} className="h-full w-full object-cover" />
          </div>
          <p className="relative mb-4 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/40">{t.project.next}</p>
          <h2
            className="relative font-display font-bold uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#FF642B]"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
          >
            {nextProject.title}
          </h2>
          <span className="relative mt-6 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/50 transition-all duration-300 group-hover:gap-4 group-hover:text-white">
            {t.project.view} <ArrowUpRight size={13} />
          </span>
        </Link>
      )}

      <footer className="bg-stone-950 px-8 py-8 md:px-14 lg:px-20">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { label: 'Instagram', href: 'https://instagram.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'Spotify', href: 'https://spotify.com' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 transition-colors duration-300 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
          <a
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 transition-colors duration-300 hover:text-white"
          >
            {t.project.back}
          </a>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-600">
            © {new Date().getFullYear()} Studio 91. {t.footer.rights}
          </p>
        </div>
      </footer>

    </div>
  );
}
