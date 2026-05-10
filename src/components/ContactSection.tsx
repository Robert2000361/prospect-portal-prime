import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const ContactSection = () => {
  const { data } = usePortfolioData();
  const id = data?.identity;
  if (!id) return null;

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Let's Connect
        </h2>

        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-lg font-medium text-foreground">Have a project in mind?</p>
            <p className="mb-8 text-muted-foreground">
              I'm always interested in hearing about new DevOps challenges, infrastructure projects, and
              collaboration opportunities. Feel free to reach out!
            </p>
            {id.email && (
              <a
                href={`mailto:${id.email}`}
                className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <Mail className="h-4 w-4" />
                Send Message
              </a>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="mb-2 text-lg font-semibold text-foreground">Get in Touch</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Open to Junior DevOps roles — let's build something reliable together.
            </p>

            <div className="mb-6 space-y-2 text-sm text-muted-foreground">
              {id.email && (
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {id.email}
                </p>
              )}
              {id.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  {id.phone}
                </p>
              )}
              {id.location && (
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {id.location}
                </p>
              )}
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Follow Me
            </p>

            <div className="flex flex-wrap gap-3">
              {id.github_url && (
                <a
                  href={id.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {id.linkedin_url && (
                <a
                  href={id.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
