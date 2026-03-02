import { useState } from "react";
import { navLinks } from "@/data/portfolio";
import { Menu, X, FileDown } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#" className="font-mono text-sm font-bold tracking-wider text-primary">
          {">"} robert_kamal
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Robert_Kamal_CV.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            <FileDown className="h-3.5 w-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Robert_Kamal_CV.pdf"
            download
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground"
          >
            <FileDown className="h-3.5 w-3.5" />
            Resume
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
