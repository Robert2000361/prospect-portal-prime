import { personalInfo } from "@/data/portfolio";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <p className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} {personalInfo.name} — Built with React & Tailwind
      </p>
    </div>
  </footer>
);

export default Footer;
