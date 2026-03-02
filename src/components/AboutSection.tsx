import { personalInfo, education, training, techStackBadges } from "@/data/portfolio";
import { GraduationCap, Award } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About Me
      </h2>

      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
        {/* Left: About text + Education */}
        <div>
          <div className="mb-8 space-y-4">
            {personalInfo.about.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground">
            <GraduationCap className="h-4 w-4 text-primary" />
            Education & Training
          </h3>

          <ul className="space-y-3">
            {education.map((ed) => (
              <li
                key={ed.degree}
                className="flex items-start gap-3 text-sm text-secondary-foreground"
              >
                <span className="mt-1.5 text-primary">→</span>
                <div>
                  <span className="font-medium text-foreground">{ed.degree}</span>
                  {" — "}
                  {ed.institution}
                  <span className="ml-1 text-muted-foreground">({ed.date})</span>
                </div>
              </li>
            ))}
            {training.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-secondary-foreground"
              >
                <span className="mt-0.5 text-primary">→</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Tech Stack */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
            <Award className="mr-2 inline h-4 w-4 text-primary" />
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techStackBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
