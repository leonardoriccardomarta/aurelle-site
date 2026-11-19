import Link from "next/link";
import { site } from "@/config/site";

const links = [
  { href: "/docs", label: "Documentation" },
  { href: "/docs#changelog", label: "Changelog" },
  { href: "/support", label: "Support" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="page-width grid gap-10 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:py-16">
        <div>
          <p className="font-heading text-2xl leading-tight tracking-[0.04em]">Aurelle</p>
          <p className="mt-3 max-w-sm text-[0.9375rem] text-muted">
            A minimal, high-luxury Shopify theme for premium skincare and beauty brands.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow">Explore</p>
          <ul className="mt-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center text-[0.9375rem] hover:opacity-60">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Contact</p>
          <p className="mt-3">
            <a className="link inline-flex min-h-11 items-center text-[0.9375rem]" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="page-width py-5 text-[0.8125rem] text-muted">
          {site.name}. Theme version {site.version}. Built for Shopify Online Store 2.0.
        </p>
      </div>
    </footer>
  );
}
