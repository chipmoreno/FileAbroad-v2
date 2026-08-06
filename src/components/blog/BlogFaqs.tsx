import { Card, CardContent } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogFaqsProps {
  faqs: FAQItem[];
  title: string;
}

export default function BlogFaqs({ faqs, title }: BlogFaqsProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="article-faq-heading">
      <h2 id="article-faq-heading" className="mb-6 font-sans text-2xl font-bold text-foreground">
        {title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.question} className="border-border">
            <CardContent className="p-5">
              <h3 className="mb-2 font-semibold text-foreground">{faq.question}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
