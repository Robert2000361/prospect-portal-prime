interface Props {
  tag: string;
  title: string;
}

const SectionHeading = ({ tag, title }: Props) => (
  <div className="mb-12 text-center">
    <p className="mb-2 font-mono text-xs tracking-widest text-primary">
      {"// "}{tag}
    </p>
    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      {title}
    </h2>
    <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
  </div>
);

export default SectionHeading;
