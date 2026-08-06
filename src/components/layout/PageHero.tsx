interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function PageHero({ label, title, description, icon }: PageHeroProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-center">
      <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 text-secondary">
        {icon}
        {label}
      </span>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-sans text-foreground">
        {title}
      </h1>
      <p className="text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
