export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-100 bg-white px-8 py-8 md:px-14 lg:px-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-logo text-sm font-bold uppercase tracking-[0.14em] text-stone-950">
            Studio 91
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            © {year} Studio 91 — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
