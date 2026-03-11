import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = ['Work', 'Services', 'About', 'Contact'];

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
            ? 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-display text-base md:text-lg tracking-tight text-stone-900 hover:text-stone-600 transition-colors duration-300"
            >
              Studio Nine One
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm tracking-wide text-stone-600 hover:text-stone-900 transition-colors duration-300 relative group"
                >
                  {link}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-900 group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center px-5 py-2 text-sm tracking-wide bg-stone-900 text-stone-50 hover:bg-stone-700 transition-colors duration-300"
              >
                Let's Talk
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-stone-900 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 bg-stone-50 flex flex-col pt-20 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-8 mt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl text-stone-900 hover:text-stone-500 transition-colors duration-300"
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
                className="mt-4 inline-flex items-center justify-center px-8 py-4 text-sm tracking-wide bg-stone-900 text-stone-50 hover:bg-stone-700 transition-colors duration-300 self-start"
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
