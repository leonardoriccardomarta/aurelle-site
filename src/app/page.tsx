import Link from "next/link";
import { sectionCount, support } from "@/lib/content";
import { themeStyle } from "@/lib/presets";
import { site } from "@/config/site";

/* Every claim below is taken from docs/documentation.md. Counts and the style description are read from it. */

const included = [
  {
    title: "Homepage and sections",
    text: `A complete, neutral homepage built from ${sectionCount} sections: hero, autoplay video, collections, image with text, testimonials, before and after, FAQ, journal and more.`,
  },
  {
    title: "Navigation",
    text: "A multi-column mega menu, an instant-search overlay with product suggestions, and a country and language selector for stores that sell in more than one market.",
  },
  {
    title: "Collections and products",
    text: "Native Shopify filters, quick add, swatches, a low-stock warning, trust badges and a frequently-bought-together bundle.",
  },
  {
    title: "Cart",
    text: "A drawer with free-shipping progress, product suggestions, a discount code field and an order note, without leaving the page.",
  },
  {
    title: "Privacy and compliance",
    text: "A cookie banner that appears only where consent is required, an optional exit-intent popup, structured data for search engines, and a build toward WCAG 2.1 AA.",
  },
  {
    title: "Every page a store needs",
    text: "Customer accounts, a password page, a gift card page with a QR code, a contact page, and About and FAQ page templates.",
  },
];

const spec = [
  ["Platform", "Shopify Online Store 2.0"],
  ["Version", site.version],
  ["Style", themeStyle.name],
  ["Sections", String(sectionCount)],
  ["Language", "English"],
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------------------------------------ hero */}
      <section className="page-width pb-[var(--section)] pt-10 md:pt-20" aria-labelledby="hero-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className="eyebrow">A Shopify theme for skincare and beauty</p>
            <h1
              id="hero-title"
              className="mt-6 text-[clamp(2.75rem,1.1rem+7vw,7.25rem)] leading-[1.02] tracking-[0.005em]"
            >
              For brands that prefer <em className="italic">restraint</em>.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted md:text-xl md:leading-9">
              Aurelle is a clean, precise theme for skincare. It installs complete, in a clinical look with clear
              product information first, and your content stays exactly as you wrote it.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/docs" className="btn">
                Read the documentation
              </Link>
              <Link href="/support" className="link inline-flex min-h-11 items-center text-[0.9375rem]">
                Contact support
              </Link>
            </div>
          </div>

          <dl className="self-end border-b border-line lg:col-span-4">
            {spec.map(([term, value]) => (
              <div key={term} className="flex items-baseline justify-between gap-6 border-t border-line py-3">
                <dt className="eyebrow">{term}</dt>
                <dd className="text-[0.9375rem]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------ approach */}
      <section className="border-t border-line" aria-labelledby="approach-title">
        <div className="page-width section grid gap-8 lg:grid-cols-12 lg:gap-10">
          <p className="eyebrow lg:col-span-3">01 &mdash; The theme</p>
          <div className="lg:col-span-9">
            <h2 id="approach-title" className="max-w-[26ch] text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] leading-[1.18]">
              Aurelle installs complete. A neutral homepage, a considered footer and journal posts are in place before
              the first product is added.
            </h2>
            <p className="mt-8 max-w-2xl text-lg text-muted">
              The default homepage is a neutral base on purpose: its wording works for any skincare brand, so you can
              restyle the theme at any time without rewriting anything.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------ included */}
      <section className="border-t border-line" aria-labelledby="included-title">
        <div className="page-width section grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <p className="eyebrow">02 &mdash; Included</p>
            <h2 id="included-title" className="mt-4 text-[clamp(1.5rem,1.1rem+1.5vw,2.25rem)]">
              Everything a skincare store needs
            </h2>
          </div>
          <ul className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:col-span-9">
            {included.map((item, index) => (
              <li key={item.title} className="border-t border-line pt-6">
                <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3">{item.title}</h3>
                <p className="mt-3 max-w-md text-[0.9375rem] text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------ style */}
      <section className="border-t border-line bg-surface" aria-labelledby="style-title">
        <div className="page-width section">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <p className="eyebrow lg:col-span-3">03 &mdash; Style</p>
            <div className="lg:col-span-9">
              <h2 id="style-title" className="max-w-[24ch] text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] leading-[1.18]">
                One considered style, ready on install.
              </h2>
              <p className="mt-6 max-w-xl text-muted">
                Colors, fonts, buttons, corners and spacing are all settings. Changing them never touches your content.
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-foreground py-10 md:mt-20 md:py-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="eyebrow">Included style</p>
                <h3 className="mt-3 text-[clamp(2rem,1.2rem+3.4vw,3.75rem)] leading-[1.05]">{themeStyle.name}</h3>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[0.9375rem]">{themeStyle.look}.</p>
                <p className="mt-4 text-[0.9375rem] text-muted">
                  <span className="eyebrow mr-2">Best for</span>
                  {themeStyle.bestFor}
                </p>
                <p className="mt-2 text-[0.9375rem] text-muted">
                  <span className="eyebrow mr-2">Type</span>
                  {themeStyle.typefaces}
                </p>
              </div>
              <ul className="flex gap-3 lg:col-span-3 lg:justify-end" aria-label={`${themeStyle.name} palette`}>
                {themeStyle.palette.map((swatch) => (
                  <li key={swatch.hex} className="w-full max-w-14">
                    <span
                      className="block aspect-[3/4] border border-line"
                      style={{ backgroundColor: swatch.hex }}
                      role="img"
                      aria-label={`${swatch.name} ${swatch.hex}`}
                    />
                    <span className="mt-2 block text-[0.625rem] tracking-[0.08em] text-muted">{swatch.hex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------ access */}
      <section className="border-t border-line" aria-labelledby="access-title">
        <div className="page-width section">
          <p className="eyebrow">04 &mdash; Begin</p>
          <h2 id="access-title" className="mt-4 text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] leading-[1.18]">
            Documentation and support
          </h2>

          <div className="mt-12 grid border-t border-foreground md:grid-cols-2">
            <Link
              href="/docs"
              className="group flex min-h-56 flex-col justify-between border-b border-line py-8 transition-opacity hover:opacity-60 md:border-r md:pr-10"
            >
              <span>
                <span className="eyebrow">Documentation</span>
                <span className="mt-3 block max-w-xs font-heading text-[1.75rem] leading-snug">
                  Every feature, setting and section, explained.
                </span>
              </span>
              <span className="mt-8 text-xs font-semibold uppercase tracking-[0.16em]">
                Read the documentation <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>

            <Link
              href="/support"
              className="group flex min-h-56 flex-col justify-between border-b border-line py-8 transition-opacity hover:opacity-60 md:pl-10"
            >
              <span>
                <span className="eyebrow">Support</span>
                <span className="mt-3 block max-w-xs font-heading text-[1.75rem] leading-snug">
                  Direct, human help. {support.hours}.
                </span>
              </span>
              <span className="mt-8 text-xs font-semibold uppercase tracking-[0.16em]">
                Contact support <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
