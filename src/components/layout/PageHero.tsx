interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function PageHero({ label, title, description, icon }: PageHeroProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8 text-center">
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3 text-secondary">
        {icon}
        {label}
      </span>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-sans text-foreground">
        {title}
      </h1>
      <p className="text-base max-w-3xl mx-auto leading-relaxed text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
