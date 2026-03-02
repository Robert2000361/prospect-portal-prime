import { personalInfo } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { Mail, Github, Linkedin, Send } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-24">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeading tag="contact" title="Get in Touch" />

      <div className="mx-auto max-w-2xl text-center">
        <div className="rounded-lg border border-border bg-card p-8">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
            <Send className="h-6 w-6 text-primary" />
          </div>
          <p className="mb-2 font-mono text-sm text-primary">
            Open to Junior DevOps roles
          </p>
          <p className="mb-8 text-muted-foreground">
            I'm actively looking for opportunities. Let's connect!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-6 py-3 font-mono text-sm text-secondary-foreground transition-all hover:border-primary hover:text-primary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-6 py-3 font-mono text-sm text-secondary-foreground transition-all hover:border-primary hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
