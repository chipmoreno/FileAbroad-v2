'use client';

import { usePathname } from 'next/navigation';
import { WHATSAPP_NUMBER } from '@/lib/constants';

interface WhatsAppButtonProps {
  variant?: 'primary' | 'secondary' | 'floating';
  text?: string;
  className?: string;
}

export function WhatsAppMark({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M.057 24l1.687-6.163A11.87 11.87 0 0 1 .157 11.89C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24Zm6.597-3.807a9.86 9.86 0 0 0 5.319 1.592c5.548 0 10.061-4.512 10.063-10.066a9.99 9.99 0 0 0-2.947-7.117 9.98 9.98 0 0 0-7.115-2.946c-5.547 0-10.059 4.511-10.061 10.06 0 2.132.582 3.826 1.694 5.76l-1.112 4.06 4.18-1.097-.021-.196Zm10.769-5.777c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.522-2.961-2.638-.087-.117-.708-.941-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.001.332.005c.109.004.253-.041.397.303.145.346.491 1.197.534 1.284.043.087.073.188.014.303-.058.117-.087.188-.173.289l-.26.303c-.087.101-.177.211-.076.385.101.173.449.741.96 1.197.659.589 1.215.771 1.388.858.173.087.275.072.376-.044.101-.116.433-.505.549-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824Z" />
    </svg>
  );
}

export default function WhatsAppButton({
  variant = 'primary',
  text = 'Message Chip on WhatsApp',
  className = '',
}: WhatsAppButtonProps) {
  const pathname = usePathname();
  if (variant === 'floating' && (pathname.startsWith('/intake') || pathname.startsWith('/payment') || pathname.startsWith('/tools'))) {
    return null;
  }
  const stickyCtaPaths = ['/blog/', '/guides/', '/countries/', '/forms/', '/personas/', '/state-taxes/', '/resources/'];
  const hasStickyCta = stickyCtaPaths.some((path) => pathname.startsWith(path));
  const intent = pathname.includes('fbar')
    ? 'fbar'
    : pathname.includes('streamlined') || pathname.includes('catch-up')
      ? 'streamlined'
      : pathname.includes('feie') || pathname.includes('2555')
        ? 'feie'
        : pathname.includes('fatca') || pathname.includes('8938')
          ? 'fatca'
          : 'general_expat_tax';
  const message = intent === 'fbar'
    ? "Hi Chip — I'm checking whether I need an FBAR. Can you ask me the few questions you need to recommend the next step? [FA-FBAR-STICKY]"
    : intent === 'streamlined'
      ? "Hi Chip — I may be behind on U.S. tax filings abroad. Please ask me only for broad fit details: country/residency, years unfiled, IRS contact, income or entity types, and timing. I won't send SSNs, account numbers, or tax documents on WhatsApp. Let me know whether to book the paid consultation. [FA-STREAMLINED-STICKY]"
      : intent === 'feie'
        ? "Hi Chip — I have an FEIE or Foreign Tax Credit question. Please send me the intake questions you need before recommending a filing scope. [FA-FEIE-STICKY]"
        : intent === 'fatca'
          ? "Hi Chip — I have questions about Form 8938/FATCA reporting while living abroad. Can you help me understand what applies? [FA-FATCA-STICKY]"
          : "Hi Chip — I'm an American living abroad and would like a filing recommendation. Please ask me for my country, last year filed, and income type. [FA-GENERAL-STICKY]";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  if (variant === 'floating' && hasStickyCta) return null;

  if (variant === 'floating') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group fixed ${hasStickyCta ? 'bottom-[max(5.75rem,calc(env(safe-area-inset-bottom)+4.25rem))]' : 'bottom-[max(1.5rem,env(safe-area-inset-bottom))]'} right-[max(1.5rem,env(safe-area-inset-right))] z-[100] hidden h-13 w-13 items-center justify-center rounded-full border-2 border-white/90 bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.28)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-[0_10px_28px_rgba(37,211,102,0.36)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 md:flex ${className}`}
        aria-label={text}
        title={text}
        data-cta-location="sticky"
        data-whatsapp-intent={intent}
      >
        <WhatsAppMark className="h-6 w-6 text-white" />
        <span className="sr-only">{text}. General questions only; do not send tax documents here.</span>
      </a>
    );
  }

  if (variant === 'secondary') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={text}
        data-cta-location="inline"
        data-whatsapp-intent={intent}
        className={`inline-flex items-center justify-center gap-3 rounded-md border border-foreground/20 bg-background px-8 py-4 text-lg font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-surface-elevated ${className}`}
      >
        <WhatsAppMark className="h-5 w-5 text-[#25D366]" />
        <span>{text}</span>
      </a>
    );
  }

  // Primary variant
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text}
      data-cta-location="inline"
      data-whatsapp-intent={intent}
      className={`inline-flex items-center justify-center gap-3 rounded-md bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-[0_4px_16px_rgba(15,23,42,0.12)] transition-all hover:bg-foreground hover:shadow-[0_8px_24px_rgba(15,23,42,0.18)] ${className}`}
    >
      <WhatsAppMark className="h-6 w-6 text-white" />
      <span>{text}</span>
    </a>
  );
}
