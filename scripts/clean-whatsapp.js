const fs = require('fs');
const path = require('path');

const replacements = [
  // --- lib/constants.ts --- empty it
  {
    file: 'src/lib/constants.ts',
    old: "// wa.me requires an international number made of digits only.\nexport const WHATSAPP_NUMBER = '593962848410'\nexport const WHATSAPP_DISPLAY = '+593-096-284-8410'\nexport const WHATSAPP_MESSAGE = \"Hi Chip — I'm an American living abroad and would like a filing recommendation. Please ask me for my country, last year filed, and income type. [FA-GENERAL]\"",
    new: "// No external messaging constants.\nexport const PLACEHOLDER = '';"
  },
  // --- lib/sendEmail.ts --- remove CHIP_WHATSAPP_NUMBER
  {
    file: 'src/lib/sendEmail.ts',
    old: "export const DEFAULT_FROM =\n  process.env.RESEND_FROM_EMAIL || \"FileAbroad <noreply@ecuapass.com>\";\nexport const ADMIN_EMAIL = process.env.ADMIN_EMAIL || \"chip.moreno@gmail.com\";\nexport const CHIP_WHATSAPP_NUMBER =\n  process.env.CHIP_WHATSAPP_NUMBER || \"+593962848410\";",
    new: "export const DEFAULT_FROM =\n  process.env.RESEND_FROM_EMAIL || \"FileAbroad <noreply@ecuapass.com>\";\nexport const ADMIN_EMAIL = process.env.ADMIN_EMAIL || \"chip.moreno@gmail.com\";"
  },
  // Remove WhatsApp from email acknowledgement text
  {
    file: 'src/lib/sendEmail.ts',
    old: "    text: `Thanks, ${firstName}. I received your preliminary intake and will review it before recommending a scope. I personally review every intake and reply within one business day. Do not email or WhatsApp sensitive tax documents. Secure upload: ${secureUploadUrl}\\n\\nReference: ${submissionId}`,",
    new: "    text: `Thanks, ${firstName}. I received your preliminary intake and will review it before recommending a scope. I personally review every intake and reply within one business day. Do not email sensitive tax documents. Secure upload: ${secureUploadUrl}\\n\\nReference: ${submissionId}`,"
  },
  // --- lib/pricing.ts --- remove "WhatsApp support" mention
  {
    file: 'src/lib/pricing.ts',
    old: "WhatsApp support",
    new: "Direct email support"
  },
  // --- lib/retainerFulfillment.ts --- remove WhatsApp contact in fulfillment email
  {
    file: 'src/lib/retainerFulfillment.ts',
    old: "If anything looks off, WhatsApp Chip directly or reply to this email.",
    new: "If anything looks off, reply to this email directly."
  },
  {
    file: 'src/lib/retainerFulfillment.ts',
    old: "process.env.CHIP_WHATSAPP_NUMBER || \"+593962848410\"",
    new: "\"\""
  },
  // --- lib/mercury.ts --- remove WhatsApp number comment
  {
    file: 'src/lib/mercury.ts',
    old: "// Chip's WhatsApp: +593-096-284-8410",
    new: "// Direct contact via email: info@fileabroad.com"
  },
  // --- lib/personas.ts --- remove WhatsApp mention in consultation body
  {
    file: 'src/lib/personas.ts',
    old: "You can also WhatsApp Chip at +593-096-284-8410 if you prefer a quick async chat before committing.",
    new: "Reply to the intake confirmation email if you have questions before committing."
  },
  // --- lib/faq-data.ts --- remove WhatsApp mentions in FAQ answers
  {
    file: 'src/lib/faq-data.ts',
    old: "You can email info@fileabroad.com or WhatsApp +593-096-284-8410.",
    new: "Email info@fileabroad.com."
  },
  {
    file: 'src/lib/faq-data.ts',
    old: "WhatsApp Chip at +593-096-284-8410",
    new: "Email info@fileabroad.com"
  },
  // --- components/analytics/ConversionTracking.tsx --- remove WhatsApp conversion tracking
  {
    file: 'src/components/analytics/ConversionTracking.tsx',
    old: "| "whatsAppClick"\n  | "whatsAppMessage"",
    new: ""
  },
  // --- components/intake/IntakeFormPage.tsx --- remove WhatsApp import and error state link
  {
    file: 'src/components/intake/IntakeFormPage.tsx',
    old: "import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from \"@/lib/constants\";",
    new: ""
  },
  {
    file: 'src/components/intake/IntakeFormPage.tsx',
    old: '        <p className="text-foreground flex items-center justify-center gap-2 text-sm">\n          <Phone className="w-4 h-4 text-accent" />\n          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Chip — I had trouble submitting the intake form. Can we continue here? [FA-GENERAL]")}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold">{WHATSAPP_DISPLAY}</a>\n        </p>\n        <p className="text-foreground flex items-center justify-center gap-2 text-sm">\n          <Mail className="w-4 h-4 text-accent" />\n          <a href="mailto:info@fileabroad.com" className="text-accent hover:underline font-semibold">info@fileabroad.com</a>\n        </p>',
    new: '        <p className="text-foreground flex items-center justify-center gap-2 text-sm">\n          <Mail className="w-4 h-4 text-accent" />\n          <a href="mailto:info@fileabroad.com" className="text-accent hover:underline font-semibold">info@fileabroad.com</a>\n        </p>\n        <p className="text-sm text-muted-foreground">We typically reply within one business day.</p>'
  },
  // --- components/retainer/RetainerCheckoutForm.tsx --- remove WhatsApp payment alternative
  {
    file: 'src/components/retainer/RetainerCheckoutForm.tsx',
    old: "process.env.CHIP_WHATSAPP_NUMBER || \"+593962848410\"",
    new: "\"\""
  },
  {
    file: 'src/components/retainer/RetainerCheckoutForm.tsx',
    old: "Prefer to pay by transfer? WhatsApp Chip for direct payment instructions.",
    new: "Prefer to pay by transfer? Email info@fileabroad.com for direct payment instructions."
  },
  // --- components/pages/PaymentRetainerSuccessPageContent.tsx --- remove WhatsApp booking button
  {
    file: 'src/components/pages/PaymentRetainerSuccessPageContent.tsx',
    old: "process.env.CHIP_WHATSAPP_NUMBER || \"+593962848410\"",
    new: "\"\""
  },
  {
    file: 'src/components/pages/PaymentRetainerSuccessPageContent.tsx',
    old: "<a\n              href={`https://wa.me/${process.env.CHIP_WHATSAPP_NUMBER || \"+593962848410\"}?text=${encodeURIComponent(\"Hi Chip — I just paid the retainer for \" + serviceTitle + \". Ready to book my onboarding call. [FA-RETAINER]\")}`}\n              target=\"_blank\"\n              rel=\"noopener noreferrer\"\n              className=\"inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-semibold text-sm transition-colors px-5 py-3\"\n            >\n              WhatsApp Chip to Book\n            </a>",
    new: "<a\n              href=\"mailto:info@fileabroad.com?subject=Retainer%20Paid%20-%20Ready%20to%20Book%20Onboarding\"\n              className=\"inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white rounded-lg font-semibold text-sm transition-opacity px-5 py-3\"\n            >\n              Email to Book Onboarding\n            </a>"
  },
  // --- components/pages/HomePage.tsx --- remove WhatsApp contact link in about section
  {
    file: 'src/components/pages/HomePage.tsx',
    old: "or WhatsApp",
    new: "or email"
  },
  {
    file: 'src/components/pages/HomePage.tsx',
    old: "href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593962848410'}?text=${encodeURIComponent(\"Hi Chip — I'm considering your services and have a few questions. [FA-HOME]\")}`}",
    new: "href=\"mailto:info@fileabroad.com?subject=Questions%20About%20FileAbroad%20Services\""
  },
  // --- components/pages/HowItWorksPageContent.tsx --- remove WhatsApp references
  {
    file: 'src/components/pages/HowItWorksPageContent.tsx',
    old: "or WhatsApp",
    new: "or email"
  },
  {
    file: 'src/components/pages/HowItWorksPageContent.tsx',
    old: "href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593962848410'}?text=${encodeURIComponent(\"Hi Chip — I'm interested in working with you and have a few questions about the process. [FA-HIW]\")}`}",
    new: "href=\"mailto:info@fileabroad.com?subject=Questions%20About%20The%20Process\""
  },
  // --- components/layout/Footer.tsx --- remove WhatsApp footer link
  {
    file: 'src/components/layout/Footer.tsx',
    old: "<a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593962848410'}?text=Hi%20Chip`} target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"WhatsApp\" className=\"hover:text-accent transition-colors\">\n            <svg className=\"w-5 h-5\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\n              <path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.839h-.004c-3.849 0-7.06-3.14-7.06-7.06 0-3.92 3.14-7.06 7.06-7.06 3.92 0 7.06 3.14 7.06 7.06 0 3.92-3.14 7.06-7.06 7.06m5.882-12.953c-1.6-1.6-3.726-2.48-5.986-2.48-4.668 0-8.466 3.798-8.466 8.466 0 1.485.387 2.934 1.12 4.214l-.752 2.748 2.81-.737a8.46 8.46 0 004.288 1.17c4.668 0 8.466-3.798 8.466-8.466 0-2.26-.88-4.386-2.48-5.986\"/>\n            </svg>\n          </a>",
    new: ""
  },
  // --- components/blog/MarkdownContent.tsx --- remove WhatsApp inline rendering
  {
    file: 'src/components/blog/MarkdownContent.tsx',
    old: "<a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593962848410'}?text=${encodeURIComponent(\"Hi Chip — I read your article and have a question. [FA-BLOG]\")}`} target=\"_blank\" rel=\"noopener noreferrer\" className=\"inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white rounded-lg font-semibold text-sm transition-opacity px-5 py-3\">",
    new: "<a href=\"mailto:info@fileabroad.com?subject=Question%20About%20Blog%20Article\" className=\"inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white rounded-lg font-semibold text-sm transition-opacity px-5 py-3\">"
  },
  {
    file: 'src/components/blog/MarkdownContent.tsx',
    old: "WhatsApp Chip a Question",
    new: "Email Us a Question"
  },
  // --- components/pages/ConsultationLandingPage.tsx --- remove WhatsApp references
  {
    file: 'src/components/pages/ConsultationLandingPage.tsx',
    old: "process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593962848410'",
    new: "''"
  },
  {
    file: 'src/components/pages/ConsultationLandingPage.tsx',
    old: "Hi Chip — I just booked a consultation and would like to connect on WhatsApp. My name is [YOUR NAME]. [FA-CONSULTATION]",
    new: ""
  },
  {
    file: 'src/components/pages/ConsultationLandingPage.tsx',
    old: "WhatsApp Chip",
    new: "Email Chip"
  },
  {
    file: 'src/components/pages/ConsultationLandingPage.tsx',
    old: "href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593962848410'}?text=${encodeURIComponent(\"Hi Chip — I just booked a consultation and would like to connect on WhatsApp. My name is [YOUR NAME]. [FA-CONSULTATION]\")}`}",
    new: "href=\"mailto:info@fileabroad.com?subject=Consultation%20Booking%20Confirmation\""
  },
  // --- app/api/intake/route.ts --- remove WhatsApp from acknowledgement text
  {
    file: 'src/app/api/intake/route.ts',
    old: "Do not email or WhatsApp sensitive tax documents.",
    new: "Do not email sensitive tax documents."
  },
];

let changed = 0;
let skipped = 0;

for (const r of replacements) {
  const filePath = path.join('/Users/chipmoreno/Domain Portfolio/FileAbroad-v2', r.file);
  if (!fs.existsSync(filePath)) {
    console.log('SKIP (not found): ' + r.file);
    skipped++;
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(r.old)) {
    console.log('SKIP (pattern not found): ' + r.file);
    skipped++;
    continue;
  }
  content = content.replace(r.old, r.new);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('OK: ' + r.file);
  changed++;
}

console.log(`\nDone: ${changed} changed, ${skipped} skipped`);
