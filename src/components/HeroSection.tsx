import { personalInfo } from "@/data/portfolio";
import { Github, Linkedin, Mail, MapPin, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="animate-fade-in-up mb-4 font-mono text-sm tracking-widest text-primary">
          {"// hello world"}
        </p>

        <h1 className="animate-fade-in-up text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl" style={{ animationDelay: "0.1s" }}>
          {personalInfo.name}
        </h1>

        <div className="animate-fade-in-up mt-4 flex items-center justify-center gap-2 font-mono text-lg text-primary sm:text-xl" style={{ animationDelay: "0.2s" }}>
          <span className="text-glow-cyan">{personalInfo.title}</span>
          <span className="animate-blink text-primary">_</span>
        </div>

        <div className="animate-fade-in-up mt-3 flex items-center justify-center gap-1 text-sm text-muted-foreground" style={{ animationDelay: "0.3s" }}>
          <MapPin className="h-3.5 w-3.5" />
          {personalInfo.location}
        </div>

        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-secondary-foreground" style={{ animationDelay: "0.4s" }}>
          {personalInfo.summary}
        </p>

        <div className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "0.5s" }}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 font-mono text-sm text-secondary-foreground transition-all hover:border-primary hover:text-primary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 font-mono text-sm text-secondary-foreground transition-all hover:border-primary hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </a>
        </div>

        <a
          href="#about"
          className="mt-16 inline-block animate-bounce text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
