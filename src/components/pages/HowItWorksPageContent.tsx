import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { SiteDictionary } from '@/lib/i18n/types';
import { Locale } from '@/lib/i18n/config';
import {
  MessageCircle,
  FileText,
  CheckCircle,
  Send,
  Clock,
  Shield,
  Users,
  ArrowRight,
} from '@/components/icons';

interface Props {
  dict: SiteDictionary;
  locale: Locale;
}

const stepIcons = [MessageCircle, FileText, CheckCircle, Send];
const benefitIcons = [Clock, Shield, Users];

export default function HowItWorksPageContent({ dict, locale }: Props) {
  const d = dict.howItWorks;

  const steps = [
    {
      number: '01',
      icon: stepIcons[0],
      title: d.step1Title,
      description: d.step1Description,
      details: d.step1Details,
    },
    {
      number: '02',
      icon: stepIcons[1],
      title: d.step2Title,
      description: d.step2Description,
      details: d.step2Details,
    },
    {
      number: '03',
      icon: stepIcons[2],
      title: d.step3Title,
      description: d.step3Description,
      details: d.step3Details,
    },
    {
      number: '04',
      icon: stepIcons[3],
      title: d.step4Title,
      description: d.step4Description,
      details: d.step4Details,
    },
  ];

  const benefits = [
    {
      icon: benefitIcons[0],
      title: d.benefit1Title,
      description: d.benefit1Description,
    },
    {
      icon: benefitIcons[1],
      title: d.benefit2Title,
      description: d.benefit2Description,
    },
    {
      icon: benefitIcons[2],
      title: d.benefit3Title,
      description: d.benefit3Description,
    },
  ];

  const timeline = d.timelineItems.map((item) => {
    const [phase, duration] = item.split(': ');
    return { phase, duration };
  });

  const faqs = [
    { question: d.faq1Question, answer: d.faq1Answer },
    { question: d.faq2Question, answer: d.faq2Answer },
    { question: d.faq3Question, answer: d.faq3Answer },
    { question: d.faq4Question, answer: d.faq4Answer },
  ];

  return (
    <>
      <PageHero label={d.heroLabel} title={d.heroTitle} description={d.heroDescription} />

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative bg-primary">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-secondary">
                    {step.number}
                  </span>
                </div>
              </div>
              <Card className="flex-grow rounded-md p-8">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold mb-4 font-sans text-foreground">{step.title}</h2>
                  <p className="text-lg mb-6 text-muted-foreground">{step.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-muted rounded-md p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-6 text-center font-sans text-foreground">{d.timelineTitle}</h2>
          <p className="text-center mb-8 text-muted-foreground">{d.timelineSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {timeline.map((item, index) => (
              <div key={item.phase} className="flex items-center">
                <div className="bg-card rounded-lg px-4 py-2 text-center">
                  <div className="text-sm font-semibold text-foreground">{item.phase}</div>
                  <div className="text-xs text-secondary">{item.duration}</div>
                </div>
                {index < timeline.length - 1 && <ArrowRight className="w-5 h-5 mx-2 text-secondary" />}
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-muted-foreground">{d.timelineNote}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center font-sans text-foreground">{d.benefitsTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="rounded-md p-6 text-center">
              <CardContent className="p-0">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary">
                  <benefit.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-sans text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What You Need */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <Card className="rounded-md p-8 md:p-10">
          <CardContent className="p-0">
            <h2 className="text-3xl font-bold mb-6 font-sans text-foreground">{d.whatYouNeedTitle}</h2>
            <p className="text-lg mb-6 text-muted-foreground">{d.whatYouNeedSubtitle}</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-3 text-foreground">{d.whatYouNeedIncomeTitle}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {d.whatYouNeedIncomeItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-foreground">{d.whatYouNeedForeignTitle}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {d.whatYouNeedForeignItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-foreground">{d.whatYouNeedPersonalTitle}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {d.whatYouNeedPersonalItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-foreground">{d.whatYouNeedPriorTitle}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {d.whatYouNeedPriorItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 border-l-2 border-secondary pl-4 text-sm leading-relaxed text-muted-foreground">
              Prepare these items, but do not upload SSNs, passports, tax returns, or financial statements through this page, email, or WhatsApp. Secure Encyro upload instructions are provided after the engagement is accepted.
            </p>
            <p className="mt-8 text-sm text-muted-foreground">{d.whatYouNeedClosing}</p>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center font-sans text-foreground">{d.faqTitle}</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <Card key={faq.question} className="rounded-md p-6">
              <CardContent className="p-0">
                <h3 className="font-bold text-lg mb-2 text-foreground">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTASection title={d.ctaTitle} description={d.ctaDescription} buttonText="Get Started" buttonHref="/intake" />
    </>
  );
}
