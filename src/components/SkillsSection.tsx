import { skills } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

const SkillsSection = () => (
  <section id="skills" className="py-24">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeading tag="skills" title="Tech Stack" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.category}
            className="card-hover rounded-lg border border-border bg-card p-6"
          >
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
