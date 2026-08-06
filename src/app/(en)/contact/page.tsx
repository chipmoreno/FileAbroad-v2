import { Metadata } from 'next';
import ContactPageContent from '@/components/pages/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with FileAbroad. Questions about expat taxes? Send a message and we will reply within one business day.',
  alternates: {
    canonical: 'https://fileabroad.com/contact',
  },
};

export default function ContactPage() {
  return <ContactPageContent locale="en" />;
}
