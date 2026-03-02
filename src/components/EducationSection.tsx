import { education, training } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { GraduationCap, Award } from "lucide-react";

const EducationSection = () => (
  <section id="education" className="py-24">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeading tag="education" title="Education & Training" />
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {/* Education */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <GraduationCap className="h-5 w-5" />
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest">
              Education
            </h3>
          </div>
          {education.map((ed) => (
            <div key={ed.degree}>
              <p className="font-semibold text-foreground">{ed.degree}</p>
              <p className="text-sm text-muted-foreground">{ed.institution}</p>
              <p className="font-mono text-xs text-primary">{ed.date}</p>
              {ed.note && (
                <p className="mt-2 text-sm italic text-secondary-foreground">
                  {ed.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Training */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-accent">
            <Award className="h-5 w-5" />
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              Training & Courses
            </h3>
          </div>
          <ul className="space-y-2">
            {training.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-secondary-foreground"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;
