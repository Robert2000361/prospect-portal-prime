import SectionHeading from "./SectionHeading";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const EducationSection = () => {
  const { data } = usePortfolioData();
  const education = data?.education ?? [];
  const certs = data?.certifications ?? [];
  const learning = data?.currentStudy ?? [];

  return (
    <section id="education" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading tag="education" title="Education & Credentials" />
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <GraduationCap className="h-5 w-5" />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((ed) => (
                <div key={ed.id}>
                  <p className="font-semibold text-foreground">{ed.degree}</p>
                  <p className="text-sm text-muted-foreground">{ed.institution}</p>
                  <p className="font-mono text-xs text-primary">
                    {ed.start_year} — {ed.is_current ? "Present" : ed.end_year}
                  </p>
                  {ed.description && (
                    <p className="mt-2 text-sm italic text-secondary-foreground">{ed.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-accent">
              <Award className="h-5 w-5" />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Certifications
              </h3>
            </div>
            <ul className="space-y-2">
              {certs.map((c) => (
                <li key={c.id} className="flex items-start gap-2 text-sm text-secondary-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>
                    <span className="font-medium text-foreground">{c.name}</span>
                    {c.issuer && <span className="text-muted-foreground"> · {c.issuer}</span>}
                  </span>
                </li>
              ))}
              {!certs.length && <li className="text-sm text-muted-foreground">No certifications yet.</li>}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest">Currently Learning</h3>
            </div>
            <ul className="space-y-3">
              {learning.map((l) => (
                <li key={l.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{l.title}</span>
                    <span className="font-mono text-xs text-primary">{l.progress_percent}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${l.progress_percent}%` }}
                    />
                  </div>
                  {l.platform && <p className="mt-1 text-xs text-muted-foreground">{l.platform}</p>}
                </li>
              ))}
              {!learning.length && (
                <li className="text-sm text-muted-foreground">Nothing in progress yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
