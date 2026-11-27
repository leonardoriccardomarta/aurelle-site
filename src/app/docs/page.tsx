import type { Metadata } from "next";
import DocsNav from "@/components/DocsNav";
import { docs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "The complete Mirel documentation: style, section library, navigation, collections, product pages, cart, privacy and compliance, theme settings, and the changelog.",
  alternates: { canonical: "/docs" },
};

export default function DocsPage() {
  const items = docs.sections.map(({ id, number, title, text }) => ({ id, number, title, text }));

  return (
    <div className="page-width pb-[var(--section)]">
      <header className="border-b border-foreground pb-10 pt-8 md:pb-14 md:pt-14">
        <p className="eyebrow">Documentation &middot; Version {docs.latestVersion}</p>
        <h1 className="mt-4 text-[clamp(2.5rem,1.2rem+5.5vw,5.5rem)] leading-[1.05]">Documentation</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Everything Mirel does, section by section. Search below, or follow the contents.
        </p>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-x-16 pt-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:pt-12">
        {/* Phones and tablets: the contents fold away, with no JavaScript. */}
        <details className="group mb-10 border-y border-line lg:hidden">
          <summary className="eyebrow flex min-h-11 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
            On this page
            <span aria-hidden="true" className="text-base group-open:hidden">
              +
            </span>
            <span aria-hidden="true" className="hidden text-base group-open:inline">
              &minus;
            </span>
          </summary>
          <ul className="pb-3">
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="flex min-h-11 items-center text-[0.9375rem]">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <aside className="hidden lg:block" aria-label="Documentation navigation">
          <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-2">
            <DocsNav items={items} />
          </div>
        </aside>

        <div className="min-w-0">
          {docs.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className={`py-12 md:py-16 ${index === 0 ? "pt-0 md:pt-0" : "border-t border-line"}`}
            >
              {section.number ? <p className="eyebrow">{section.number}</p> : null}
              <h2 id={`${section.id}-title`} className={section.number ? "mt-3" : ""}>
                {section.title}
              </h2>
              <div className="docs-prose mt-8" dangerouslySetInnerHTML={{ __html: section.html }} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
