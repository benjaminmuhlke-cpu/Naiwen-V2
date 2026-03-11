import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-10 lg:px-16 py-10 md:py-14 bg-stone-50 border-t border-stone-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Logo / Name */}
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="font-display text-xl text-stone-900 hover:text-stone-500 transition-colors duration-300 tracking-tight"
            >
              Studio Nine One
            </a>
            <p className="text-xs text-stone-400 tracking-wide">
              A multidisciplinary creative studio.
            </p>
          </div>

          {/* Center links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            {['Work', 'Services', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social + email */}
          <div className="flex flex-col gap-3 items-start md:items-end">
            <div className="flex items-center gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center border border-stone-300 hover:border-stone-900 text-stone-500 hover:text-stone-900 transition-all duration-300"
              >
                <Instagram size={13} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                aria-label="LinkedIn"
                className="w-8 h-8 flex items-center justify-center border border-stone-300 hover:border-stone-900 text-stone-500 hover:text-stone-900 transition-all duration-300"
              >
                <Linkedin size={13} />
              </motion.a>
            </div>
            <a
              href="mailto:hello@studionioneone.com"
              className="text-xs text-stone-400 hover:text-stone-700 transition-colors duration-300 tracking-wide"
            >
              hello@studionioneone.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-stone-400">
            © {year} Studio Nine One. All rights reserved.
          </p>
          <p className="text-xs text-stone-300 tracking-widest uppercase">
            Design & Identity
          </p>
        </div>
      </div>
    </footer>
  );
}
