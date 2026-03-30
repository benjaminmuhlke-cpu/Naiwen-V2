import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/motion';

type Project = {
  category: string;
  title: string;
  image: string;
};

const row1: [Project, Project, Project] = [
  {
    category: 'Brand Identity',
    title: 'Maison None',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80&auto=format&fit=crop',
  },
  {
    category: 'Editorial Design',
    title: 'Aesop',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=80&auto=format&fit=crop',
  },
  {
    category: 'Branding & Packaging',
    title: 'Clouce Coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80&auto=format&fit=crop',
  },
];

const row2: [Project, Project, Project] = [
  {
    category: 'Brand Identity',
    title: 'Maison None',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80&auto=format&fit=crop',
  },
  {
    category: 'Editorial Design',
    title: 'Aesop',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=80&auto=format&fit=crop',
  },
  {
    category: 'Branding & Packaging',
    title: 'Clouce Coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80&auto=format&fit=crop',
  },
];

function ProjectCard({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <div className={`group relative overflow-hidden bg-stone-200 ${className}`}>
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-stone-950/20 transition-opacity duration-300 group-hover:bg-stone-950/40" />
      <div className="absolute bottom-0 left-0 p-5">
        <p className="font-display text-base font-bold uppercase leading-tight tracking-[-0.01em] text-white md:text-lg">
          {project.title}
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
          {project.category}
        </p>
      </div>
    </div>
  );
}

function ProjectRow({ projects }: { projects: [Project, Project, Project] }) {
  return (
    <div className="flex" style={{ height: 'clamp(260px, 34vh, 420px)' }}>
      {/* Wide left image */}
      <ProjectCard project={projects[0]} className="w-1/2" />
      {/* Two stacked right images */}
      <div className="flex w-1/2 flex-col">
        <ProjectCard project={projects[1]} className="flex-1 border-l border-t border-white/10" />
        <ProjectCard project={projects[2]} className="flex-1 border-l border-t border-white/10" />
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  return (
    <section className="bg-white px-8 pb-24 pt-20 md:px-14 md:pb-28 md:pt-24 lg:px-20">
      <div className="mx-auto max-w-screen-xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mb-10 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-[0.28em] text-stone-400"
            >
              Selected Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold uppercase leading-[1] tracking-[-0.04em] text-stone-950"
            >
              Recent projects
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            href="#contact"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 transition-colors duration-300 hover:text-[#FF642B]"
          >
            Start a project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col gap-1"
        >
          <ProjectRow projects={row1} />
          <ProjectRow projects={row2} />
        </motion.div>
      </div>
    </section>
  );
}
