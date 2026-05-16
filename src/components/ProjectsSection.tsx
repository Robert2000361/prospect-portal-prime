import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, Images } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";
import Lightbox, { type LightboxImage } from "./Lightbox";

const ProjectsSection = () => {
  const { data, isLoading } = usePortfolioData();
  const projects = data?.projects ?? [];
  const images = data?.projectImages ?? [];

  const [lightbox, setLightbox] = useState<{
    images: LightboxImage[];
    index: number;
    title: string;
  } | null>(null);

  const galleryFor = useMemo(
    () => (projectId: string) =>
      images
        .filter((i) => i.project_id === projectId)
        .sort((a, b) =>
          a.is_cover === b.is_cover ? a.sort_order - b.sort_order : a.is_cover ? -1 : 1,
        )
        .map<LightboxImage>((i) => ({ src: i.image_url, caption: i.caption })),
    [images],
  );

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
            {projects.map((p, idx) => {
              const gallery = galleryFor(p.id);
              const cover = gallery[0];
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: idx * 0.07, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Glow */}
                  <div className="pointer-events-none absolute inset-0 -z-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/10 group-hover:via-primary/0 group-hover:to-primary/10 group-hover:opacity-100" />

                  <button
                    type="button"
                    onClick={() =>
                      gallery.length > 0 &&
                      setLightbox({ images: gallery, index: 0, title: p.title })
                    }
                    className="relative flex h-44 items-center justify-center overflow-hidden bg-secondary/50"
                    aria-label={`Open ${p.title} gallery`}
                  >
                    {cover ? (
                      <>
                        <img
                          src={cover.src}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/80 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur">
                            <Images className="h-3.5 w-3.5" />
                            View Gallery
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {p.tech_stack?.[0] ?? "Project"}
                      </span>
                    )}

                    {gallery.length > 1 && (
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur">
                        <Images className="h-3 w-3" />
                        {gallery.length}
                      </span>
                    )}

                    {p.is_featured && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary backdrop-blur">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </button>

                  <div className="relative z-10 flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
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
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:shadow-md hover:shadow-primary/30"
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
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <Lightbox
        open={!!lightbox}
        images={lightbox?.images ?? []}
        startIndex={lightbox?.index ?? 0}
        title={lightbox?.title}
        onClose={() => setLightbox(null)}
      />
    </section>
  );
};

export default ProjectsSection;
