import { Github, Linkedin, Mail } from "lucide-react";
import { usePortfolioData, navLinks } from "@/hooks/usePortfolioData";

const Footer = () => {
  const { data } = usePortfolioData();
  const id = data?.identity;
  const footerText =
    data?.settings.footer_text ?? `© ${new Date().getFullYear()} ${id?.name ?? ""}`;

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-primary">RK</p>
          <p className="mt-1 text-xs text-muted-foreground">{footerText}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
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

        <div className="flex gap-3">
          {id?.github_url && (
            <a
              href={id.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {id?.linkedin_url && (
            <a
              href={id.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {id?.email && (
            <a
              href={`mailto:${id.email}`}
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
