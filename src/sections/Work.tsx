import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeUp } from '../lib/motion';

const projects = [
  {
    id: '01',
    name: 'Maison Verité',
    category: 'Brand Identity',
    description: 'Complete visual identity for a luxury Parisian fragrance house.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=85&auto=format&fit=crop',
    aspect: 'tall',
  },
  {
    id: '02',
    name: 'Aura Interiors',
    category: 'Art Direction',
    description: 'Campaign art direction for a high-end residential studio.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85&auto=format&fit=crop',
    aspect: 'wide',
  },
  {
    id: '03',
    name: 'Oblique Coffee',
    category: 'Packaging & Brand',
    description: 'Packaging system and brand world for a specialty roaster.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85&auto=format&fit=crop',
    aspect: 'tall',
  },
  {
    id: '04',
    name: 'Forma Collective',
    category: 'Digital Experience',
    description: 'Website and digital identity for an architecture collective.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85&auto=format&fit=crop',
    aspect: 'wide',
  },
  {
    id: '05',
    name: 'Sable Fashion Week',
    category: 'Campaign',
    description: 'Brand campaign and visual language for an annual fashion event.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop',
    aspect: 'tall',
  },
];

interface ProjectCardProps {
  project: typeof projects[number];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="group relative overflow-hidden cursor-pointer"
    >
      {/* Image container */}
      <div
        className={`relative overflow-hidden bg-stone-200 ${
          project.aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'
        }`}
      >
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-all duration-500" />
        {/* Arrow on hover */}
        <motion.div
          initial={{ opacity: 0, x: -8, y: 8 }}
          whileHover={{ opacity: 1, x: 0, y: 0 }}
          className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div className="w-10 h-10 bg-stone-50 flex items-center justify-center">
            <ArrowUpRight size={16} className="text-stone-900" />
          </div>
        </motion.div>
      </div>

      {/* Meta */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-widest text-stone-400 uppercase">
              {project.id}
            </span>
            <span className="w-4 h-px bg-stone-300" />
            <span className="text-xs tracking-wider text-stone-400 uppercase">
              {project.category}
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl text-stone-900 tracking-tight mt-1">
            {project.name}
          </h3>
          <p className="text-sm text-stone-500 font-light mt-0.5">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="work"
      className="py-28 md:py-40 px-6 md:px-10 lg:px-16 bg-stone-50 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24"
        >
          <div className="flex flex-col gap-3">
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.25em] uppercase text-stone-400"
            >
              Selected Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-tight tracking-tight text-stone-900"
            >
              Projects we're
              <br />
              <em>proud of.</em>
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            href="#contact"
            className="self-start md:self-end text-sm tracking-wide text-stone-600 hover:text-stone-900 transition-colors duration-300 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900"
          >
            View full archive →
          </motion.a>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
