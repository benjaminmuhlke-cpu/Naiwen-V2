import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = ['About', 'Work', 'Contact'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-stone-200 bg-white/95 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-screen-xl px-8 md:px-14 lg:px-20">
          <div className="flex h-16 items-center justify-between md:h-[72px]">
            <a
              href="#"
              className="font-logo text-base font-bold uppercase tracking-[0.12em] text-[#FF642B] transition-opacity duration-300 hover:opacity-75"
            >
              Studio 91
            </a>

            <nav className="hidden items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="group relative text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 transition-colors duration-300 hover:text-stone-950"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#FF642B] transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden items-center md:flex">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-stone-950"
                style={{ backgroundColor: '#FF642B' }}
              >
                Let's Talk
              </a>
            </div>

            <button
              className="p-1 text-stone-900 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-white px-8 pt-20 md:hidden"
          >
            <nav className="mt-8 flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl font-bold uppercase tracking-[-0.03em] text-stone-950 transition-colors duration-300 hover:text-[#FF642B]"
                >
                  {link}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex self-start px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-stone-950"
                style={{ backgroundColor: '#FF642B' }}
              >
                Let's Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
