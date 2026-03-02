import { experience } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

const ExperienceSection = () => (
  <section id="experience" className="py-24 bg-card/30">
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Experience
      </h2>

      <div className="mx-auto max-w-3xl space-y-8">
        {experience.map((exp) => (
          <div
            key={exp.role}
            className="relative border-l-2 border-primary/30 pl-8"
          >
            <div className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background">
              <Briefcase className="h-2 w-2 text-primary" />
            </div>
            <p className="font-mono text-xs text-primary">{exp.date}</p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">
              {exp.role}
            </h3>
            <p className="text-sm text-muted-foreground">{exp.company}</p>
            <ul className="mt-3 space-y-2">
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-secondary-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
