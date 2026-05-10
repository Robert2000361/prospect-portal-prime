import SectionHeading from "./SectionHeading";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const SkillsSection = () => {
  const { data } = usePortfolioData();
  const skills = data?.skills ?? [];

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading tag="skills" title="Tech Stack" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="card-hover rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                {category}
              </h3>
              <div className="space-y-3">
                {items.map((s) => (
                  <div key={s.id}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-foreground">{s.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {s.proficiency_level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-primary transition-all duration-700"
                        style={{ width: `${s.proficiency_level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
