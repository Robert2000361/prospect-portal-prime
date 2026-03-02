import { personalInfo, navLinks } from "@/data/portfolio";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
      {/* Left */}
      <div className="text-center md:text-left">
        <p className="text-lg font-bold text-primary">RK</p>
        <p className="mt-1 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
      </div>

      {/* Center — Quick links */}
      <div className="flex gap-6">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Right — Social */}
      <div className="flex gap-3">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Email"
        >
          <Mail className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
