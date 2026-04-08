import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Lang } from '../i18n';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(true);

  useEffect(() => {
    const darkSections = ['about'];

    const update = () => {
      const headerMid = 36;

      if (window.scrollY < window.innerHeight - 80) {
        setLight(true);
        return;
      }

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

  const navLinks = [
    { key: 'work', label: t.nav.work },
    { key: 'about', label: t.nav.about },
    { key: 'contact', label: t.nav.contact },
  ];

  const linkColor = light
    ? 'text-white/80 hover:text-white'
    : 'text-stone-950/70 hover:text-stone-950';

  const iconColor = light ? 'text-white' : 'text-stone-950';

  const langs: Lang[] = ['en', 'fr'];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent px-8 md:px-14 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex h-16 items-center justify-between md:h-[72px]">
            <a
              href="/"
              aria-label="Studio 91 — Back to homepage"
              className={`font-logo text-base font-bold uppercase tracking-[0.12em] transition-colors duration-500 hover:opacity-75 ${light ? 'text-white' : 'text-[#FF642B]'}`}
            >
              Studio 91
            </a>

            <nav aria-label="Main navigation" className="hidden items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={`#${link.key}`}
                  aria-label={`Navigate to ${link.label} section`}
                  className={`group relative text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${linkColor}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#FF642B] transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              ))}

              {/* Language toggle */}
              <div className={`flex items-center gap-2 border-l pl-6 transition-colors duration-500 ${light ? 'border-white/20' : 'border-stone-950/20'}`}>
                {langs.map((l, i) => (
                  <span key={l} className="flex items-center gap-2">
                    {i > 0 && <span className={`text-[10px] ${light ? 'text-white/20' : 'text-stone-950/20'}`}>/</span>}
                    <button
                      onClick={() => setLang(l)}
                      className={`group relative text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                        l === lang
                          ? light ? 'text-white' : 'text-stone-950'
                          : light ? 'text-white/35 hover:text-white' : 'text-stone-950/30 hover:text-stone-950'
                      }`}
                    >
                      {l}
                      {l === lang && (
                        <span className="absolute -bottom-1 left-0 h-px w-full bg-[#FF642B]" />
                      )}
                    </button>
                  </span>
                ))}
              </div>
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
            <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={`#${link.key}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl font-bold uppercase tracking-[-0.03em] text-white transition-colors duration-300 hover:text-[#FF642B]"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Language toggle — mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="flex items-center gap-4 border-t border-white/10 pt-6"
              >
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                      l === lang ? 'text-[#FF642B]' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </motion.div>

              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex self-start bg-[#FF642B] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-stone-950"
              >
                {t.nav.cta}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
