import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

// ─── Project data ──────────────────────────────────────────────────────────────

const allProjects = [
  {
    slug: 'maison-none',
    title: 'Maison None',
    category: 'Brand Identity',
    client: 'Maison None',
    year: '2024',
    role: 'Lead Studio',
    deliverables: 'Identity, Print, Retail',
    overview:
      'A complete visual identity system built for a contemporary Parisian interior house. The brief called for something timeless yet modern — a brand that lives across print, digital, and retail without losing its character.',
    overviewSub:
      'We developed a refined typographic system, a restrained palette inspired by Nordic interiors, and a packaging language that elevates every touchpoint.',
    challenge:
      'Maison None needed to stand apart in a saturated luxury market while remaining approachable to a younger, global audience. The visual language had to feel heritage-rich without feeling nostalgic.',
    approach:
      'We stripped the identity back to its essentials — precise typography, deliberate white space, and one signature material texture. Every element was designed as part of a unified system.',
    heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=900&q=85&auto=format&fit=crop',
    ],
    tags: ['Brand Strategy', 'Visual Identity', 'Art Direction', 'Print', 'Retail'],
    closingTitle: 'A system built to grow with the brand.',
    closingText1: 'The identity was designed not as a snapshot but as a living system — one that adapts across formats, scales, and contexts while staying immediately recognisable.',
    closingText2: 'From flagship retail to digital campaigns, every application was tested against the full range of brand touchpoints before release.',
    next: 'clouce-coffee',
  },
  {
    slug: 'clouce-coffee',
    title: 'Clouce Coffee',
    category: 'Branding & Packaging',
    client: 'Clouce Coffee',
    year: '2024',
    role: 'Brand & Packaging',
    deliverables: 'Identity, Packaging, Web',
    overview:
      'Clouce Coffee came to us with great beans and no visual voice. We built a brand world from scratch — one that communicates craft, origin, and warmth across every surface.',
    overviewSub:
      'From the logo mark to the bag design, every element was created to feel tactile and premium while staying accessible. The system scales from single-origin bags to full café fitouts.',
    challenge:
      'The specialty coffee market is crowded with sameness — muted palettes, minimal sans-serifs, and generic origin storytelling. Clouce needed a brand that could cut through with personality.',
    approach:
      'We anchored the identity in warmth and texture — a bold wordmark, earthy colour system, and tactile packaging finishes. The tone of voice was set to feel like a conversation, not a pitch.',
    heroImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=900&q=85&auto=format&fit=crop',
    ],
    tags: ['Brand Identity', 'Packaging Design', 'Art Direction', 'Typography', 'Web'],
    closingTitle: 'More than a logo — a full brand world.',
    closingText1: 'We built Clouce Coffee from the ground up: naming architecture, tone of voice, packaging system, and a digital presence that feels as considered as the coffee itself.',
    closingText2: 'The result is a brand that punches above its weight — boutique in feel, scalable in execution.',
    next: 'aesop',
  },
  {
    slug: 'aesop',
    title: 'Aesop',
    category: 'Editorial Design',
    client: 'Aesop',
    year: '2023',
    role: 'Editorial Direction',
    deliverables: 'Editorial, Campaign, Digital',
    overview:
      'A seasonal editorial campaign built around Aesop\'s philosophy of rigour and restraint. The work spans print, digital, and in-store — all speaking in one coherent visual language.',
    overviewSub:
      'We worked closely with Aesop\'s internal team to push their editorial voice into new territory — more human, more textured, without compromising the precision the brand is known for.',
    challenge:
      'Aesop\'s visual identity is deeply established. The challenge was to add a new editorial layer that felt fresh and surprising, without disrupting the brand\'s carefully built aesthetic integrity.',
    approach:
      'We focused on contrast: pairing the brand\'s cool, clinical precision with warmer, more intimate photography. The layouts were built on a strict grid but broken by unexpected scale shifts.',
    heroImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=900&q=85&auto=format&fit=crop',
    ],
    tags: ['Editorial Design', 'Campaign', 'Art Direction', 'Print', 'Digital'],
    closingTitle: 'Pushing the editorial voice forward.',
    closingText1: 'Working within an established brand requires a different kind of discipline. Every choice had to feel like Aesop — measured, precise, quietly confident.',
    closingText2: 'The campaign ran across print, in-store, and digital, with each format adapted without dilution. The result extended the brand\'s reach without compromising its integrity.',
    next: 'forma-studio',
  },
  {
    slug: 'forma-studio',
    title: 'Forma Studio',
    category: 'Visual Identity',
    client: 'Forma Collective',
    year: '2023',
    role: 'Brand Direction',
    deliverables: 'Identity, Digital, Motion',
    overview:
      'Forma Studio is an architecture and interiors collective that needed a brand to match the ambition of their work. We built an identity system that is structural, modular, and alive.',
    overviewSub:
      'The system is built on a flexible grid logic that mirrors Forma\'s spatial thinking. It adapts across print, digital, and motion — always feeling considered, never rigid.',
    challenge:
      'Architecture branding often falls into one of two traps: overly cold minimalism or overly decorative expressionism. Forma needed something in between — structured but warm, confident but not arrogant.',
    approach:
      'We drew from the language of architectural drawing — line weight, proportion, negative space. The palette was pulled from raw materials: concrete, steel, warm wood. The result is restrained but rich.',
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1800&q=90&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=900&q=85&auto=format&fit=crop',
    ],
    tags: ['Visual Identity', 'Brand Strategy', 'Digital', 'Motion', 'Print'],
    closingTitle: 'Structure as a design principle.',
    closingText1: 'Forma\'s identity is built on the same logic as their buildings — modular, intentional, and honest about its materials. Nothing decorative. Everything purposeful.',
    closingText2: 'The system ships with a full set of usage guidelines, motion principles, and digital templates so the team can maintain consistency without our involvement.',
    next: 'maison-none',
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
  const navigate = useNavigate();
  const project = slug ? projectMap[slug] : null;
  const nextProject = project ? projectMap[project.next] : null;
  const [onDark, setOnDark] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

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
          className={`font-display text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${onDark ? 'text-white' : 'text-[#FF642B]'}`}
        >
          Studio 91
        </Link>
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${onDark ? 'text-white/80 hover:text-white' : 'text-[#FF642B]/80 hover:text-[#FF642B]'}`}
        >
          <ArrowLeft size={13} /> All Work
        </button>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-[560px] overflow-hidden bg-stone-950" style={{ height: '100vh' }}>
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
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
          >
            {project.title}
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-8 border-t border-white/20 pt-6">
            {[
              { label: 'Client', value: project.client },
              { label: 'Year', value: project.year },
              { label: 'Services', value: project.deliverables },
              { label: 'Role', value: project.role },
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
      <section className="px-8 py-24 md:px-14 md:py-36 lg:px-20">
        <Reveal>
          <div className="mx-auto grid max-w-screen-xl grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-stone-400">Overview</p>
              <h2
                className="font-display font-bold uppercase leading-none tracking-tight text-stone-900"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                A bold identity<br />built to last.
              </h2>
            </div>
            <div className="pt-2">
              <p className="mb-4 leading-relaxed text-stone-500">{project.overview}</p>
              <p className="leading-relaxed text-stone-500">{project.overviewSub}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-stone-200 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-stone-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FULL-WIDTH IMAGE ─────────────────────────────────── */}
      <Reveal className="px-8 py-4 md:px-14 lg:px-20">
        <div className="mx-auto max-w-screen-xl overflow-hidden bg-stone-200" style={{ height: '100vh' }}>
          <img src={project.images[0]} alt="Project overview" className="h-full w-full object-cover" />
        </div>
      </Reveal>

      {/* ── TWO-COL PORTRAIT IMAGES ──────────────────────────── */}
      <Reveal className="px-8 py-4 md:px-14 lg:px-20">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden bg-stone-200" style={{ height: '100vh' }}>
            <img src={project.images[1]} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden bg-stone-200" style={{ height: '100vh' }}>
            <img src={project.images[2]} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </Reveal>

      {/* ── CAPTIONED IMAGE ──────────────────────────────────── */}
      <Reveal className="px-8 py-4 md:px-14 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="w-full overflow-hidden bg-stone-200" style={{ height: '100vh' }}>
            <img src={project.images[3]} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </Reveal>

      {/* ── FINAL ROW: image + text ───────────────────────────── */}
      <Reveal className="px-8 py-4 pb-16 md:px-14 md:pb-24 lg:px-20">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden bg-stone-200" style={{ height: '100vh' }}>
            <img src={project.images[4]} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center bg-stone-950 px-10 py-16 md:px-14" style={{ height: '100vh' }}>
            <p className="mb-6 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#FF642B]">Behind the work</p>
            <h3 className="mb-6 font-display font-bold uppercase leading-tight text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
              {project.closingTitle}
            </h3>
            <p className="mb-4 leading-relaxed text-stone-400">{project.closingText1}</p>
            <p className="leading-relaxed text-stone-400">{project.closingText2}</p>
          </div>
        </div>
      </Reveal>

      {/* ── NEXT PROJECT ─────────────────────────────────────── */}
      {nextProject && (
        <Link
          to={`/projects/${nextProject.slug}`}
          className="group relative flex flex-col items-center justify-center overflow-hidden bg-stone-950 px-6 py-32 text-center text-white md:py-48"
        >
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-25">
            <img src={nextProject.heroImage} alt={nextProject.title} className="h-full w-full object-cover" />
          </div>
          <p className="relative mb-4 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/40">Next Project</p>
          <h2
            className="relative font-display font-bold uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#FF642B]"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
          >
            {nextProject.title}
          </h2>
          <span className="relative mt-6 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/50 transition-all duration-300 group-hover:gap-4 group-hover:text-white">
            View project <ArrowUpRight size={13} />
          </span>
        </Link>
      )}

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-8 py-6 md:px-14 lg:px-20">
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-stone-400">© {new Date().getFullYear()} Studio 91</span>
        <Link to="/" className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-stone-400 transition-colors duration-200 hover:text-stone-900">
          Back to Home
        </Link>
      </footer>

    </div>
  );
}
