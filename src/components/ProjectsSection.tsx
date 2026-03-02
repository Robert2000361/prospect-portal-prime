import { projects } from "@/data/portfolio";
import { Github, ExternalLink, Clock } from "lucide-react";

const ProjectsSection = () => (
  <section id="projects" className="py-24">
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Featured Projects
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p.title}
            className="card-hover group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
          >
            {/* Thumbnail placeholder */}
            <div className="relative flex h-44 items-center justify-center bg-secondary/50">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {p.tags[0]}
              </span>
              {p.status === "in-progress" && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
                  <Clock className="h-3 w-3" />
                  In Progress
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {p.demo ? (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:shadow-md"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </a>
                ) : (
                  <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground cursor-not-allowed">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Coming Soon
                  </span>
                )}
                {p.github ? (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary hover:text-primary"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </a>
                ) : (
                  <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground cursor-not-allowed">
                    <Github className="h-3.5 w-3.5" />
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
