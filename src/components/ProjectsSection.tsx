import { Github, ExternalLink, Star } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectsSection = () => {
  const { data, isLoading } = usePortfolioData();
  const projects = data?.projects ?? [];
  const images = data?.projectImages ?? [];

  const coverFor = (projectId: string) =>
    images.find((i) => i.project_id === projectId && i.is_cover) ??
    images.find((i) => i.project_id === projectId);

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Featured Projects
        </h2>

        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const cover = coverFor(p.id);
              return (
                <div
                  key={p.id}
                  className="card-hover group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
                >
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-secondary/50">
                    {cover ? (
                      <img src={cover.image_url} alt={p.title} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {p.tech_stack?.[0] ?? "Project"}
                      </span>
                    )}
                    {p.is_featured && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {p.tech_stack?.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {p.live_url ? (
                        <a
                          href={p.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:shadow-md"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live Demo
                        </a>
                      ) : (
                        <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground">
                          <ExternalLink className="h-3.5 w-3.5" />
                          Coming Soon
                        </span>
                      )}
                      {p.github_url ? (
                        <a
                          href={p.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary hover:text-primary"
                        >
                          <Github className="h-3.5 w-3.5" />
                          Code
                        </a>
                      ) : (
                        <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground">
                          <Github className="h-3.5 w-3.5" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
