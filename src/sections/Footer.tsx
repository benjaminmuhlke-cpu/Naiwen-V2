const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Spotify', href: 'https://spotify.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 px-8 py-8 md:px-14 lg:px-20">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-4 text-center">

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {socials.map((s) => (
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

        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-600">
          © {year} Studio 91 — All rights reserved
        </p>

      </div>
    </footer>
  );
}
