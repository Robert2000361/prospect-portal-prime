import { personalInfo } from "@/data/portfolio";
import { ChevronDown, FileDown } from "lucide-react";
import Particles from "./Particles";
import profileImg from "@/assets/profile.jpg";
const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Particles />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Avatar placeholder */}
        <div
          className="animate-scale-in mx-auto mb-8 h-36 w-36 overflow-hidden rounded-full border-2 border-primary/40 p-1"
        >
          <img src={profileImg} alt={personalInfo.name} className="h-full w-full rounded-full object-cover" />
        </div>

        <h1
          className="animate-fade-in-up text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          {personalInfo.name}
        </h1>

        <p
          className="animate-fade-in-up mt-4 text-lg text-primary sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          {personalInfo.title}
          <span className="animate-blink ml-1 text-primary">|</span>
        </p>

        <p
          className="animate-fade-in-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          style={{ animationDelay: "0.45s" }}
        >
          {personalInfo.summary}
        </p>

        <div
          className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#projects"
            className="rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            View My Work
          </a>
          <a
            href="/Robert_Kamal_CV.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md border border-primary/60 px-7 py-3 text-sm font-medium text-primary transition-all hover:bg-primary/10"
          >
            <FileDown className="h-4 w-4" />
            CV
          </a>
        </div>

        <a
          href="#projects"
          className="mt-20 inline-block animate-bounce text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
