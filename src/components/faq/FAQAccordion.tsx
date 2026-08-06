interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  faqs: FAQ[];
}

export default function FAQAccordion({ categories }: { categories: FAQCategory[] }) {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category.name}>
          <h2 className="mb-6 text-2xl font-medium tracking-tight text-foreground">{category.name}</h2>
          <div className="rounded-xl border border-muted bg-surface px-6">
            {category.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-muted py-5 last:border-b-0">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-medium text-foreground">
                  {faq.question}<span aria-hidden="true" className="text-muted-foreground transition-transform group-open:rotate-180">↓</span>
                </summary>
                <p className="mt-4 max-w-3xl pb-1 leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
