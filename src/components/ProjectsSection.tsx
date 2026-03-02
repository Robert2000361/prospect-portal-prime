import { projects } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { Github, ExternalLink, Clock } from "lucide-react";

const ProjectsSection = () => (
  <section id="projects" className="py-24">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeading tag="projects" title="What I've Built" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p.title}
            className="card-hover flex flex-col rounded-lg border border-border bg-card p-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
              {p.status === "in-progress" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-accent">
                  <Clock className="h-3 w-3" />
                  In Progress
                </span>
              )}
            </div>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px] text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
            {p.github ? (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-primary transition-colors hover:underline"
              >
                <Github className="h-3.5 w-3.5" />
                View on GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Github className="h-3.5 w-3.5" />
                Coming soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
