# FileAbroad Direct-Response Copy Audit & Rewrites
## Honest, No-Systems Rewrite Plan

**Constraints honored:**
- You are **not** an Enrolled Agent. The site is correct. No credential inflation.
- **No fabricated social proof** — no fake numbers, no fake testimonials.
- **No bandwidth for mechanics** — no email sequences, no funnel builds.
- **No deliverables promised for the intake alone.** The intake is how they reach out. You read it and reply. The written scope is delivered as part of a **paid consultation**, not for free.
- **Consultations have a fee.** No "free consultation" language.
- **Copy-only changes.** Headlines, subheads, bullets, CTAs, value props. Paste into your existing files.

---

## 1. THE CORE PROBLEM

Your current copy explains your process. It does not name the visitor's problem.

An expat landing on your site is not thinking: *"I wish I had a consultation-first tax preparer with clear scope documentation."*

They are thinking:
- *"Am I going to get penalized for not filing FBAR?"*
- *"Is California still going to tax me even though I moved?"*
- *"Am I overpaying because I don't understand FEIE vs. FTC?"*
- *"I haven't filed in 3 years. Is there a way back in without penalties?"*

Your copy needs to name these fears, then position you as the person who resolves them — honestly, through a paid consultation, with direct communication.

---

## 2. YOUR REAL AUTHORITY ANGLE (Own It)

You think the lack of an EA/CPA is a weakness. It's not. Your differentiation is this:

> **"Most 'expat tax firms' are call centers in Ohio. You fill out a form, a junior preparer you've never met does your return, and you get a bill. I do the opposite. You work directly with me — Chip Moreno — from the first fact review to the final filing. I live in Cuenca, Ecuador. I file my own expat return and FBAR every year. I know what a cédula is, why your Ecuadorian pension isn't a 401(k), and which travel days count for the Physical Presence Test — because I count my own."**

That is not a weakness. That is a **niche dominance story.** Use it.

---

## 3. REWRITE: HOMEPAGE HERO
**File:** `src/components/pages/HomePage.tsx` (lines ~48–78)

### CURRENT (What's rendered on screen)
```tsx
<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
  U.S. Expat Tax Services from Ecuador
</p>
<h1 className="mt-6 max-w-4xl text-5xl font-light leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
  Tax filing for Americans living abroad.
</h1>
<p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
  Work directly with one preparer for annual returns, FBAR, FATCA, foreign tax credits, and carefully screened catch-up filings.
</p>
<div className="mt-8">
  <Link href="/intake" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90">
    Get Started<ArrowRight className="h-4 w-4" />
  </Link>
</div>
<ul className="mt-10 grid gap-5 sm:grid-cols-3">
  <li className="border-l border-muted pl-6 text-sm leading-relaxed text-muted-foreground">Work directly with Chip</li>
  <li className="border-l border-muted pl-6 text-sm leading-relaxed text-muted-foreground">Fixed scope before work</li>
  <li className="border-l border-muted pl-6 text-sm leading-relaxed text-muted-foreground">You review the return before submission</li>
</ul>
```

### REWRITE
```tsx
<p className="text-xs font-semibold uppercase tracking-widest text-accent">
  U.S. Expat Tax Prep — Based in Cuenca, Ecuador
</p>
<h1 className="mt-6 max-w-4xl text-5xl font-light leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
  Stop overpaying — or under-filing — the IRS while living abroad.
</h1>
<p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
  Most expats either miss credits that would save them thousands, or forget a form that carries a $10,000+ penalty. I live in Ecuador, file my own expat return every year, and work directly with you from first review to filing. Every engagement starts with a paid consultation so we can map your exact situation before any preparation begins.
</p>
<div className="mt-8 flex flex-col sm:flex-row gap-4">
  <Link href="/intake" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90">
    Reach Out About Your Filing<ArrowRight className="h-4 w-4" />
  </Link>
  <Link href="/consultation" className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-6 py-3 font-semibold text-accent transition-opacity hover:bg-accent/5">
    See How Consultations Work
  </Link>
</div>
<ul className="mt-10 grid gap-5 sm:grid-cols-3">
  <li className="border-l-2 border-accent pl-6 text-sm leading-relaxed text-muted-foreground">
    <strong className="block text-foreground">One person, start to finish</strong>
    You work directly with Chip — not a call center, not a junior preparer.
  </li>
  <li className="border-l-2 border-accent pl-6 text-sm leading-relaxed text-muted-foreground">
    <strong className="block text-foreground">Scope before preparation</strong>
    After the consultation, you receive a written scope and flat quote. You approve it before any work begins.
  </li>
  <li className="border-l-2 border-accent pl-6 text-sm leading-relaxed text-muted-foreground">
    <strong className="block text-foreground">Expat life, firsthand</strong>
    PTIN holder and IRS e-file provider, living in Ecuador and filing the same forms you do.
  </li>
</ul>
```

**What changed:**
- Headline names the two worst outcomes (overpaying + under-filing) instead of the service category.
- Subhead leads with the emotional problem, then your real angle, then transparently states that consultations are paid.
- Primary CTA is honest about what happens: they reach out. No fake deliverable promised.
- Secondary CTA links to consultation page to learn about the paid process.
- Trust points are specific and lead with the benefit, not the feature.

---

## 4. REWRITE: HOMEPAGE SERVICES SECTION
**File:** `src/components/pages/HomePage.tsx` (lines ~88–113) and/or `src/lib/i18n/dictionaries/en.ts`

### CURRENT (Annual Expat Return)
```tsx
<span>Form 1040</span>
<h3>Annual Expat Return</h3>
<p>A straightforward federal return after the facts and accepted scope are reviewed.</p>
<span>Learn more →</span>
```

### REWRITE
```tsx
<span className="text-xs font-semibold uppercase tracking-widest text-accent">FORM 1040</span>
<h3 className="mt-8 text-xl font-medium text-foreground">Annual Expat Return: Are You Paying More Than You Owe?</h3>
<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
  Most expats qualify to pay little or no U.S. tax — but only if Form 2555 or 1116 is filed correctly and supported by the right records. I review your Physical Presence Test, foreign residence status, and every credit you qualify for before any preparation begins.
</p>
<span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">See how this works →<ArrowRight className="h-4 w-4" /></span>
```

### CURRENT (FBAR)
```tsx
<span>FinCEN 114</span>
<h3>FBAR Filing</h3>
<p>Report your foreign bank accounts with FinCEN Form 114. Required if your foreign accounts exceed $10,000 at any point during the year.</p>
```

### REWRITE
```tsx
<span className="text-xs font-semibold uppercase tracking-widest text-accent">FINCEN 114</span>
<h3 className="mt-8 text-xl font-medium text-foreground">FBAR: The $10,000+ Penalty Most Expats Discover Too Late</h3>
<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
  If your foreign accounts totaled over $10,000 at any point — even for one day — you generally must file FBAR. The penalty for non-willful violations starts at $10,000 per account. I review your account history, aggregate the values correctly, and file before the deadline.
</p>
<span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">Learn about FBAR filing →<ArrowRight className="h-4 w-4" /></span>
```

### CURRENT (Streamlined Catch-Up)
```tsx
<span>Catch-up</span>
<h3>Streamlined Catch-Up</h3>
<p>Preparation for qualifying Streamlined Foreign Offshore cases after a focused assessment.</p>
```

### REWRITE
```tsx
<span className="text-xs font-semibold uppercase tracking-widest text-accent">CATCH-UP FILING</span>
<h3 className="mt-8 text-xl font-medium text-foreground">Streamlined: A Path Back for Expats Who Fell Behind</h3>
<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
  The IRS Streamlined Foreign Offshore procedure allows some expats to file past returns without certain penalties — but eligibility is strict, and the non-willful certification is your responsibility. I review your facts in a paid consultation to see if this path fits before any preparation begins.
</p>
<span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">See if this path applies to you →<ArrowRight className="h-4 w-4" /></span>
```

**What changed:**
- Headlines name the stakes (paying more than owed, $10K penalty, falling behind) instead of the service name.
- Descriptions explain the consequence of getting it wrong + the honest process (paid consultation first).
- CTAs are curiosity-driven but honest — no promise of a free assessment.

---

## 5. REWRITE: NEWSLETTER / LEAD MAGNET
**File:** `src/components/forms/NewsletterSignup.tsx` (lines ~70–128)

### CURRENT
```tsx
<h3 className="font-sans text-2xl font-bold text-foreground">
  The FileAbroad Brief
</h3>
<p className="text-sm mt-1 text-muted-foreground">
  Get the 2026 Expat Filing Deadline Calendar — FEIE limits, FBAR dates, and extension rules on one page. Occasional updates after that; no automated sequence.
</p>
<button>Subscribe</button>
```

### REWRITE
```tsx
<h3 className="font-sans text-2xl font-bold text-foreground">
  Get the 2026 Expat Filing Deadline Calendar
</h3>
<p className="text-sm mt-1 text-muted-foreground">
  One page with the deadlines most expats miss: FEIE limits, FBAR due dates, extension rules, and the form that triggers automatic penalties if forgotten. I send occasional filing reminders only when deadlines approach. No automated sequence.
</p>
<button className="whitespace-nowrap bg-primary px-5 text-white hover:bg-foreground">
  Send Me the Calendar
  <ArrowRight className="w-4 h-4 ml-2" />
</button>
<p className="text-xs mt-3 text-muted-foreground">
  Occasional filing updates. Unsubscribe anytime. No tax details are collected here.
</p>
```

**What changed:**
- Title leads with the deliverable, not the brand.
- Description adds the stakes ("the form that triggers automatic penalties") — this is honest, factual, and high-converting.
- Button shifts from "Subscribe" to "Send Me the Calendar" — a request for a gift, not a commitment to a list.
- Microcopy reassures against spam fear.

---

## 6. REWRITE: CONSULTATION LANDING PAGE HERO
**File:** `src/components/pages/ConsultationLandingPage.tsx` (lines ~71–90)

### CURRENT
```tsx
<p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
  {data.label} · consultation-first process
</p>
<h1 className="max-w-4xl font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl">
  {data.title}
</h1>
<p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
  {data.description}
</p>
<div className="mt-8">
  <Link href="/intake" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-lg font-bold text-primary-foreground hover:bg-foreground">
    Get Started <ArrowRight className="h-5 w-5" />
  </Link>
</div>
<p className="mt-4 text-sm text-muted-foreground">
  Share broad facts first. The accepted scope, documents, and next step are confirmed in writing.
</p>
```

### REWRITE
```tsx
<p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
  {data.label} · paid consultation · written scope
</p>
<h1 className="max-w-4xl font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl">
  {data.title}
</h1>
<p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
  {data.description}
</p>
<div className="mt-8">
  <Link href="/intake" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-lg font-bold text-primary-foreground hover:bg-foreground">
    Start an Intake <ArrowRight className="h-5 w-5" />
  </Link>
</div>
<p className="mt-4 text-sm text-muted-foreground">
  I review every intake personally and reply within one business day. If FileAbroad can accept the work, we schedule a paid consultation where you receive a written scope, document checklist, and flat quote — all yours to keep even if you do not proceed.
</p>
```

**What changed:**
- Label transparently says "paid consultation" — no bait-and-switch.
- CTA says what actually happens: they start an intake. No fake deliverable.
- Microcopy is your best conversion line on the entire site: the scope, checklist, and quote are yours to keep even if you don't hire him. That's a real, honest risk reversal. Use it everywhere.

---

## 7. REWRITE: CONSULTATION PATHWAY TITLES & DESCRIPTIONS
**File:** `src/lib/consultation.ts` (lines ~11–55)

### CURRENT (General)
```ts
{
  slug: 'general',
  label: 'General consultation',
  title: 'Get a written scope for your U.S. expat tax situation',
  description: 'Start with a focused consultation when your income, accounts, filing history, or move makes the next step difficult to identify.',
  questions: [
    'Which years and returns may need attention?',
    'Which forms, accounts, or income sources should be reviewed?',
    'Is FileAbroad the right fit, or is another professional needed?',
  ],
}
```

### REWRITE
```ts
{
  slug: 'general',
  label: 'General consultation',
  title: 'Map Your Expat Filing Situation Before You Spend a Dollar on Preparation',
  description: 'Most expats either over-file or under-file. In a paid consultation, I review your country, income, accounts, and filing history to map exactly what is required — and what is not — before any preparation work begins.',
  questions: [
    'Which years and returns may need attention?',
    'Which forms, accounts, or income sources should be reviewed?',
    'Is FileAbroad the right fit, or is another professional needed?',
  ],
}
```

### CURRENT (Streamlined)
```ts
{
  slug: 'streamlined',
  label: 'Streamlined consultation',
  title: 'Map your catch-up filing path before preparing anything',
  description: 'Use this path when you may need Streamlined Foreign Offshore Procedures, prior returns, FBARs, or a careful review of facts that FileAbroad cannot decide for you.',
  questions: [
    'Which filing years and FBAR periods are potentially incomplete?',
    'What facts and records are available for the required certification?',
    'Is a tax attorney or other representative needed before filing?',
  ],
}
```

### REWRITE
```ts
{
  slug: 'streamlined',
  label: 'Streamlined consultation',
  title: 'The Penalty-Free Catch-Up Window: Do You Qualify?',
  description: 'The IRS Streamlined program allows some expats to file past returns without certain penalties — but eligibility is strict and the certification is your responsibility. In a paid consultation, I review your facts to see if this path fits and what records you will need.',
  questions: [
    'Which filing years and FBAR periods are potentially incomplete?',
    'What facts and records are available for the required certification?',
    'Is a tax attorney or other representative needed before filing?',
  ],
}
```

### CURRENT (PFIC)
```ts
{
  slug: 'pfic',
  label: 'PFIC consultation',
  title: 'Review foreign funds before PFIC reporting becomes a surprise',
  description: 'Use this path if you hold foreign mutual funds, ETFs, unit trusts, insurance products, or pension investments and need to map the Form 8621 questions.',
}
```

### REWRITE
```ts
{
  slug: 'pfic',
  label: 'PFIC consultation',
  title: 'Foreign Funds and PFICs: The Surprise Tax Bill Most Expats Never See Coming',
  description: 'Foreign mutual funds, ETFs, and pension investments can trigger PFIC rules and Form 8621 — often with harsh tax consequences. If you hold foreign investment products, use this paid consultation path to map the reporting questions before they become a problem.',
}
```

### CURRENT (Business Abroad)
```ts
{
  slug: 'business-abroad',
  label: 'Business abroad consultation',
  title: 'Scope foreign business and entity reporting before filing',
  description: 'Use this path if you own or operate a foreign company, partnership, online business, or investment vehicle and need to identify the reporting questions first.',
}
```

### REWRITE
```ts
{
  slug: 'business-abroad',
  label: 'Business abroad consultation',
  title: 'Own a Business Abroad? The Reporting Rules Are a Minefield.',
  description: 'Foreign companies, partnerships, and online businesses can trigger Forms 5471, 8858, 8865, and 8992 — often without the owner realizing it. In a paid consultation, I identify the entity and ownership questions that must be answered before any return can be prepared.',
}
```

**What changed:**
- Titles lead with the problem or stakes, not the process.
- Descriptions explicitly say "paid consultation" — transparency builds trust.
- Emotional hooks are honest ("surprise tax bill," "minefield") but grounded in real risk.

---

## 8. REWRITE: STICKY CTA BAR (MOBILE)
**File:** `src/components/layout/StickyCTABar.tsx` (lines ~104–136)

### CURRENT
```tsx
<p className="text-sm font-semibold text-foreground">
  Not sure which filing path fits?
</p>
<p className="text-xs text-muted-foreground">
  Ask a general question. Do not send tax documents here.
</p>
```

### REWRITE
```tsx
<p className="text-sm font-semibold text-foreground">
  Unsure about your expat filing situation?
</p>
<p className="text-xs text-muted-foreground">
  Reach out and I will personally review your facts. No tax documents here.
</p>
```

**What changed:**
- "Ask a general question" is passive. "Reach out and I will personally review" names the action and the promise (personal attention).
- Keeps the document warning — that's a good trust signal.

---

## 9. REWRITE: EXIT INTENT MODAL
**File:** `src/components/layout/StickyCTABar.tsx` (lines ~92–101)

### CURRENT
```tsx
<h2 id="exit-intent-title">Your situation deserves a written next step.</h2>
<p>Book a consultation to review the facts behind your filing path. Do not send Social Security numbers, account numbers, passports, or tax documents through this page.</p>
<Link href="/consultation">Get Started</Link>
```

### REWRITE
```tsx
<h2 id="exit-intent-title">Before You Go: Are You Sure You Know What You Owe?</h2>
<p>Most expats either overpay by thousands or miss a form that triggers penalties. I review your situation personally and reply within one business day. No tax documents here — just the facts.</p>
<Link href="/intake">Reach Out About Your Filing</Link>
```

**What changed:**
- Headline names the fear ("Are you sure you know what you owe?") instead of corporate speak ("deserves a written next step").
- Body leads with the problem, then the personal promise, then the safety reminder.
- CTA matches the intake action honestly.

---

## 10. REWRITE: CTAS SECTION (Bottom of pages)
**File:** `src/components/layout/CTASection.tsx` (lines ~13–47)

### CURRENT
```tsx
<p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">Consultation first · Written scope</p>
<h2 className="mb-4 font-sans text-4xl font-normal leading-tight tracking-[-0.03em] text-white md:text-5xl">
  {title}
</h2>
<p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
  {description}
</p>
<Link href={buttonHref} className="...">
  <span>{buttonText}</span>
  <ArrowRight className="w-5 h-5" />
</Link>
```

### REWRITE — Only the default props need changing:

**Current default:**
```tsx
buttonText = 'Start the 3-Minute Intake'
```

**Keep this.** "Start the 3-Minute Intake" is already honest, low-friction, and time-bounded. It's the best CTA on your site. Use it consistently instead of "Get Started."

**Current metadata title in `app/(en)/page.tsx`:**
```tsx
title: 'US Expat Tax Prep | FBAR, FEIE & Catch-Up Filing',
```

### REWRITE
```tsx
title: 'US Expat Tax Prep by Chip Moreno | Ecuador-Based PTIN Holder for Americans Abroad',
```

**What changed:**
- Adds your real credential (PTIN holder) + location (Ecuador) — instant differentiation in search results.
- Removes generic keyword stuffing that every competitor uses.

---

## 11. HOMEPAGE `en.ts` DICTIONARY OVERRIDES FIX
**File:** `src/components/pages/HomePage.tsx`

You are currently hard-coding weaker English copy that overrides your `en.ts` dictionary. The hard-coded text is:
- `'U.S. Expat Tax Services from Ecuador'`
- `'Tax filing for Americans living abroad.'`
- `'Work directly with one preparer...'`
- `'Get Started'`

**Fix:** Either:
1. Remove the `isEnglish ? ... : ...` ternaries and always use the dictionary values, OR
2. Update the hard-coded strings to match the rewrites above.

The `en.ts` values are already slightly better than your hard-codes:
- `heroCtaPrimary: 'Start a free filing review'` — but you can't say "free" because there is a consultation fee.
- `heroTitle: 'A clear U.S. tax filing path for Americans abroad.'` — still mild, but not as bad as "Tax filing for Americans living abroad."

**Recommended:** Update `en.ts` to the honest, high-stakes copy below, then remove all `isEnglish` hard-code overrides in `HomePage.tsx` so the dictionary is always used:

**File:** `src/lib/i18n/dictionaries/en.ts` (lines ~35–114)

### REWRITE KEY `home` KEYS
```ts
home: {
  heroLabel: 'U.S. Expat Tax Prep — Based in Cuenca, Ecuador',
  heroTitle: 'Stop overpaying — or under-filing — the IRS while living abroad.',
  heroTitleEmphasis: '',
  heroDescription:
    'Most expats either miss credits that would save them thousands, or forget a form that carries a $10,000+ penalty. I live in Ecuador, file my own expat return every year, and work directly with you from first review to filing. Every engagement starts with a paid consultation so we can map your exact situation before any preparation begins.',
  heroCtaPrimary: 'Reach Out About Your Filing',
  heroCtaSecondary: 'See How Consultations Work',
  heroMicrocopy: 'I review every intake personally and reply within one business day',
  heroTrustPoint1: 'Work directly with Chip — not a call center',
  heroTrustPoint2: 'You approve the scope and price before preparation begins',
  heroTrustPoint3: 'PTIN holder and IRS e-file provider, living in Ecuador',
  // ... rest of keys remain as-is unless you want to update services descriptions too
```

---

## 12. QUICK-WINS CHECKLIST (HONEST + NO SYSTEMS)

1. **HomePage.tsx** — Replace hard-coded hero text with dictionary-driven rewrites. 30 min.
2. **en.ts home keys** — Update hero label, title, description, CTA, trust points. 20 min.
3. **Service cards** — Rewrite the 4 service headlines + descriptions in `HomePage.tsx` and/or `en.ts`. 45 min.
4. **consultation.ts** — Update all 4 pathway titles + descriptions. 20 min.
5. **NewsletterSignup.tsx** — Rewrite title, description, button. 15 min.
6. **ConsultationLandingPage.tsx** — Update hero label + microcopy. 15 min.
7. **StickyCTABar.tsx** — Update sticky bar text + exit intent. 15 min.
8. **CTASection.tsx defaults** — Keep "Start the 3-Minute Intake" as the consistent default. Replace all other "Get Started" instances sitewide. 20 min.
9. **Metadata** — Update `app/(en)/page.tsx` title to include "Chip Moreno" + "Ecuador." 5 min.

**Total copy work:** ~2.5 hours. No new files. No new systems. No fake claims. Paste, commit, deploy.

---

## FINAL PRINCIPLE

The difference between explaining and converting is simple:

**Explaining:** *"I offer tax preparation services for expats."*

**Converting:** *"Most expats overpay or get penalized because no one explains the rules. I live in Ecuador and file these same forms every year. Reach out and I will personally review your situation."*

Lead with the problem. Name the stakes. Be honest about the paid consultation. Make the intake feel like starting a conversation with a person who understands — because that's exactly what it is.

— End of Audit —
