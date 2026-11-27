import type { Metadata } from "next";
import Link from "next/link";
import { faq, support } from "@/lib/content";
import { site } from "@/config/site";
import CopyEmail from "@/components/CopyEmail";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Support",
  description: `Direct, human support for every Mirel customer. ${support.responseTime}, ${support.hours}.`,
  alternates: { canonical: "/support" },
};

// A less-than sign turned into its JSON escape (built from char codes so no tool or editor can turn it back):
// text that contains a closing script tag can then never end the JSON-LD block early.
const ESCAPED_LT = String.fromCharCode(92) + "u003c";

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
}).replace(/</g, ESCAPED_LT);

const facts = [
  { term: "Response time", value: support.responseTime },
  { term: "Hours", value: support.hours },
  { term: "Language", value: support.language },
];

export default function SupportPage() {
  const mailto = `mailto:${site.supportEmail}?subject=${encodeURIComponent("Mirel support")}`;

  return (
    <div className="page-width pb-[var(--section)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      <header className="border-b border-foreground pb-12 pt-8 md:pb-20 md:pt-14">
        <p className="eyebrow">Support</p>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.5rem,1.2rem+5.5vw,5.5rem)] leading-[1.05]">{support.lead}</h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow">Write to us</p>
            <a
              href={mailto}
              className="link mt-3 inline-block font-heading text-[clamp(1.5rem,0.9rem+3vw,2.75rem)] leading-tight [overflow-wrap:anywhere]"
            >
              {site.supportEmail}
            </a>
            <p className="mt-4 text-[0.9375rem] text-muted">
              No mail app? <a className="link" href="#contact-form">Use the contact form</a>.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <CopyEmail email={site.supportEmail} />
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------------------------------ facts */}
      <section aria-label="When to expect an answer" className="py-12 md:py-16">
        <dl className="grid md:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.term} className="border-b border-line py-6 md:border-b-0 md:py-8 md:pr-8">
              <dt className="eyebrow">{fact.term}</dt>
              <dd className="mt-3 font-heading text-[1.5rem] leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ------------------------------------------------------------------------------------------ scope */}
      <section aria-labelledby="scope-title" className="border-t border-line py-12 md:py-16">
        <h2 id="scope-title" className="max-w-[22ch]">
          What support covers
        </h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="eyebrow !font-semibold">Included</h3>
            <ul className="mt-4">
              {support.covered.map((line) => (
                <li key={line} className="flex gap-4 border-t border-line py-4 last:border-b">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-foreground" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow !font-semibold">Not included</h3>
            <ul className="mt-4">
              {support.notCovered.map((line) => (
                <li key={line} className="flex gap-4 border-t border-line py-4 text-muted last:border-b">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-muted" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------ message */}
      <section aria-labelledby="message-title" className="border-t border-line py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 id="message-title" className="lg:col-span-5">
            When you write to us, please include
          </h2>
          <ol className="lg:col-span-7">
            {support.include.map((line, index) => (
              <li key={line} className="flex gap-6 border-t border-line py-5 last:border-b">
                <span className="eyebrow mt-1 w-6 shrink-0">{String(index + 1).padStart(2, "0")}</span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------ contact form */}
      <section id="contact-form" aria-labelledby="contact-title" className="border-t border-line py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="contact-title" className="max-w-[16ch]">
              Send us a message
            </h2>
            <p className="mt-6 max-w-sm text-muted">
              Write to us from here, with no mail app needed. {support.responseTime}, {support.hours}.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <ContactForm email={site.supportEmail} />
            <noscript>
              <p className="text-muted">
                The form needs JavaScript. You can write to us at <a className="link" href={mailto}>{site.supportEmail}</a>.
              </p>
            </noscript>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------ FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-line py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <h2 id="faq-title" className="lg:col-span-5">
            Frequently asked questions
          </h2>
          <div className="lg:col-span-7">
            {faq.map((item) => (
              <details key={item.question} className="group border-t border-line last:border-b">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span aria-hidden="true" className="shrink-0 text-xl font-normal group-open:hidden">
                    +
                  </span>
                  <span aria-hidden="true" className="hidden shrink-0 text-xl font-normal group-open:inline">
                    &minus;
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-foreground pt-12 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-md font-heading text-[1.75rem] leading-snug">Most questions are answered in the documentation.</p>
          <Link href="/docs" className="btn btn--quiet">
            Read the documentation
          </Link>
        </div>
      </section>
    </div>
  );
}
