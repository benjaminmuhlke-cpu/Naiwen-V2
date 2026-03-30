import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = ['Work', 'About', 'Contact'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(true); // true = white text, false = dark text

  useEffect(() => {
    const darkSections = ['about']; // section ids with dark backgrounds

    const update = () => {
      const headerMid = 36; // vertical midpoint of the 72px header

      // Over hero?
      if (window.scrollY < window.innerHeight - 80) {
        setLight(true);
        return;
      }

      // Over a dark-bg section?
      for (const id of darkSections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= headerMid && bottom >= headerMid) {
          setLight(true);
          return;
        }
      }

      setLight(false);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const linkColor = light
    ? 'text-white/80 hover:text-white'
    : 'text-stone-950/70 hover:text-stone-950';

  const iconColor = light ? 'text-white' : 'text-stone-950';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent px-8 md:px-14 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex h-16 items-center justify-between md:h-[72px]">
            <a
              href="#"
              className={`font-logo text-base font-bold uppercase tracking-[0.12em] transition-colors duration-500 hover:opacity-75 ${light ? 'text-white' : 'text-[#FF642B]'}`}
            >
              Studio 91
            </a>

            <nav className="hidden items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`group relative text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${linkColor}`}
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#FF642B] transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              ))}
            </nav>

            <button
              className={`p-1 transition-colors duration-500 md:hidden ${iconColor}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-stone-950 px-8 pt-20 md:hidden"
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
                  className="font-display text-4xl font-bold uppercase tracking-[-0.03em] text-white transition-colors duration-300 hover:text-[#FF642B]"
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
                className="mt-4 inline-flex self-start bg-[#FF642B] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-stone-950"
              >
                Start a Project
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
