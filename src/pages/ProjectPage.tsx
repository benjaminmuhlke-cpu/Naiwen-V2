import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ─── Project data ──────────────────────────────────────────────────────────────

const allProjects = [
  {
    slug: 'tafe-warner-hp',
    title: 'TAFE BUTTERBEER PASTRY',
    category: 'Packaging',
    client: 'TAFE × Warner Bros.',
    year: '2024',
    role: 'Lead Studio',
    deliverables: 'Identity, Packaging, Retail',
    overviewTitle: 'A product that feels like it belongs in the wizarding world.',
    overview:
      'A collaboration between TAFE and Warner Bros. HP, bringing the magic of the wizarding world into a tangible, collectible product line. The brief demanded authenticity to the IP while carving out space for a distinct brand voice.',
    overviewSub:
      'Every touchpoint, from packaging structure to typographic language, was designed to feel like it had been pulled from a Hogwarts shelf. The system balances fantasy and craft without tipping into novelty.',
    tags: ['Brand Identity', 'Packaging', 'Art Direction', 'Retail', 'Collaboration'],
    heroImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=900&q=85&auto=format&fit=crop',
    ],
    closingTitle: 'Where licensing ends and craft begins.',
    closingText1: 'The biggest challenge with IP-led work is avoiding the trap of pure reproduction. We pushed for a design language that felt native to the world, not applied on top of it.',
    closingText2: 'The result is a product line that fans want to own, not because of the logo, but because of how it feels in their hands.',
    next: 'starbucks',
  },
  {
    slug: 'starbucks',
    title: 'STARBUCKS',
    category: 'Limited Edition Packaging',
    client: 'Starbucks',
    year: '2024',
    role: 'Packaging Direction',
    deliverables: 'Packaging, Campaign, Retail',
    overviewTitle: 'China-exclusive holiday packaging for Starbucks, centered around a limited-edition cup.',
    overview:
      'The challenge was to bring together Christmas, New Year, and Chinese New Year within a single object, while maintaining brand clarity and a strong winter atmosphere.',
    overviewSub: '',
    tags: ['Packaging Design', 'Limited Edition', 'Cultural', 'Campaign', 'Retail'],
    heroImage: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=85&auto=format&fit=crop',
    ],
    closingTitle: 'The idea builds around "winter as a shared feeling", anchored by the phrase 冬暖雪融.',
    closingText1: 'Elements like calligraphy, seals, engraving textures, paper cutting, and Chinese knots are integrated into the design, not as decoration, but as part of the visual system, allowing the cup to hold multiple cultural references while still feeling unmistakably Starbucks.',
    closingText2: '',
    next: 'be-kind',
  },
  {
    slug: 'be-kind',
    title: 'BE-KIND',
    category: 'Campaign & Packaging',
    client: 'Kind Snacks',
    year: '2024',
    role: 'Campaign Direction',
    deliverables: 'Packaging, Campaign, Digital',
    overviewTitle: 'A Chinese New Year gift box designed as BE-KIND\'s entry into the Chinese market.',
    overview:
      'The challenge was to bring a global health brand into a local gifting culture, while working within a fixed box structure and maintaining the brand\'s original tone.',
    overviewSub: '',
    tags: ['Campaign', 'Packaging', 'Cultural', 'Seasonal', 'Art Direction'],
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=900&q=85&auto=format&fit=crop',
    ],
    closingTitle: 'The direction focuses on everyday neighborhood interactions during the holiday.',
    closingText1: 'Within the limited packaging format, details such as layout, messaging, and custom stickers are used to create small moments of exchange. Making the gift feel less formal, and closer to how people actually share and connect during Chinese New Year.',
    closingText2: '',
    next: 'yeah-right',
  },
  {
    slug: 'yeah-right',
    title: 'YEAH RIGHT',
    category: 'Brand Identity',
    client: 'Yeah Right',
    year: '2023',
    role: 'Brand Direction',
    deliverables: 'Identity, Print, Digital',
    overviewTitle: 'A brand identity redesign for a burger food truck, focused on clarifying a previously inconsistent visual system.',
    overview:
      'The brand sits between two strong influences: American burger culture and a highly local Taiwanese street environment. The challenge was not to merge them, but to allow both to exist without losing clarity.',
    overviewSub: '',
    tags: ['Brand Identity', 'Art Direction', 'Cultural', 'Print', 'Digital'],
    heroImage: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85&auto=format&fit=crop',
    ],
    closingTitle: 'The design leans into this contrast.',
    closingText1: 'A black and yellow palette creates strong visibility, while the logo introduces a sharp "slice" of light, echoing the feeling of a burger layer, but also reading as a small signal in the night, like something you come across on your way home.',
    closingText2: '',
    next: 'energy',
  },
  {
    slug: 'energy',
    title: 'ENERGY',
    category: 'Digital & Motion',
    client: 'Energy Cosmetics',
    year: '2023',
    role: 'Creative Direction',
    deliverables: 'Digital, Motion, Packaging',
    overviewTitle: 'A brand identity developed for the beauty category, positioned for Western markets and Amazon.',
    overview:
      'The challenge was to stand out in a fast-moving digital environment, where products are seen quickly and competition is high.',
    overviewSub: '',
    tags: ['Digital', 'Motion', 'Packaging', 'Beauty', 'Creative Direction'],
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=900&q=85&auto=format&fit=crop',
    ],
    closingTitle: 'The concept translates makeup in motion into a visual system.',
    closingText1: 'Through color combinations, lighting, and photography direction, the brand expresses movement and transformation, creating a balance between energy and control, while remaining clear and impactful across digital shelves.',
    closingText2: '',
    next: 'la-festin',
  },
  {
    slug: 'la-festin',
    title: 'LA FESTIN',
    category: 'Brand Identity',
    client: 'La Festin',
    year: '2023',
    role: 'Brand Direction',
    deliverables: 'Identity, Print, Packaging',
    overviewTitle: 'A rebranding exploring how a French-inspired brand can exist in the Chinese market.',
    overview:
      'The challenge was to move away from familiar French clichés and define a more distinct and contemporary identity, while allowing room for future expansion.',
    overviewSub: '',
    tags: ['Brand Identity', 'Packaging', 'Print', 'Food & Beverage', 'Art Direction'],
    heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=85&auto=format&fit=crop',
    ],
    closingTitle: 'The direction draws from French New Wave cinema, not as a literal theme, but as a mindset.',
    closingText1: 'Through casting, styling, composition, and layout, the system allows different moods and expressions to exist together, without becoming overly stylized or constrained.',
    closingText2: '',
    next: 'tafe-warner-hp',
  },
];

const projectMap = Object.fromEntries(allProjects.map((p) => [p.slug, p]));

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

// ─── Main component ────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const project = slug ? projectMap[slug] : null;
  const nextProject = project ? projectMap[project.next] : null;
  const [onDark, setOnDark] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    if (project) document.title = `${project.title} | Studio 91`;
    return () => { document.title = 'Studio 91 | Brand Identity, Packaging & Creative Direction'; };
  }, [project]);

  useEffect(() => {
    const update = () => {
      // Hero is 100vh dark; after that background is light (stone-50)
      setOnDark(window.scrollY < window.innerHeight - 80);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

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

      {/* ── NAV ─────────────────────────────────────────────── */}
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

      {/* ── HERO ────────────────────────────────────────────── */}
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

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <Marquee />

      {/* ── OVERVIEW ────────────────────────────────────────── */}
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
                  {project.tags.map((tag) => (
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

      {/* ── 1. BIG HORIZONTAL IMAGE ──────────────────────────── */}
      <Reveal className="px-8 py-4 md:px-14 lg:px-20">
        <div className="mx-auto max-w-screen-xl overflow-hidden bg-stone-200 aspect-[3/2] md:aspect-auto md:h-svh">
          <img src={project.images[0]} alt="Project overview" className="h-full w-full object-cover" />
        </div>
      </Reveal>

      {/* ── 2. LEFT IMAGE + RIGHT TEXT ───────────────────────── */}
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

      {/* ── 3. BIG HORIZONTAL IMAGE ──────────────────────────── */}
      <Reveal className="px-8 py-4 md:px-14 lg:px-20">
        <div className="mx-auto max-w-screen-xl overflow-hidden bg-stone-200 aspect-[3/2] md:aspect-auto md:h-svh">
          <img src={project.images[2]} alt="" className="h-full w-full object-cover" />
        </div>
      </Reveal>

      {/* ── 4. TWO IMAGES SIDE BY SIDE ───────────────────────── */}
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

      {/* ── NEXT PROJECT ─────────────────────────────────────── */}
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

      {/* ── FOOTER ──────────────────────────────────────────── */}
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
