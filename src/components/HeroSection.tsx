import { ChevronDown, FileDown } from "lucide-react";
import Particles from "./Particles";
import Typewriter from "./Typewriter";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
  const { data, isLoading } = usePortfolioData();
  const id = data?.identity;
  const openToWork = data?.settings.open_to_work === "true";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Particles />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="animate-scale-in mx-auto mb-8 h-36 w-36 overflow-hidden rounded-full border-2 border-primary/40 p-1">
          {id?.avatar_url ? (
            <img src={id.avatar_url} alt={id.name} className="h-full w-full rounded-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-2xl font-bold text-primary">
              {id?.name?.charAt(0) ?? "?"}
            </div>
          )}
        </div>

        {openToWork && (
          <div className="animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Open to Work
          </div>
        )}

        {isLoading ? (
          <Skeleton className="mx-auto h-14 w-72" />
        ) : (
          <h1 className="animate-fade-in-up text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {id?.name}
          </h1>
        )}

        <p
          className="animate-fade-in-up mt-4 text-lg sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          {id?.typewriter_titles?.length ? (
            <Typewriter titles={id.typewriter_titles} />
          ) : (
            <span className="text-primary">{id?.title}</span>
          )}
        </p>

        <p
          className="animate-fade-in-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          style={{ animationDelay: "0.45s" }}
        >
          {id?.bio?.split("\n\n")[0]}
        </p>

        <div
          className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#projects"
            className="rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            View My Work
          </a>
          {id?.cv_url && (
            <a
              href={id.cv_url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-primary/60 px-7 py-3 text-sm font-medium text-primary transition-all hover:bg-primary/10"
            >
              <FileDown className="h-4 w-4" />
              CV
            </a>
          )}
        </div>

        <a
          href="#projects"
          className="mt-20 inline-block animate-bounce text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
