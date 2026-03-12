export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-50 px-6 py-8 md:px-10 md:py-10 lg:px-16">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="font-display text-lg font-semibold tracking-[-0.04em] text-stone-950">
            Studio91
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
            © {year} Studio91
          </p>
        </div>
      </div>
    </footer>
  );
}
