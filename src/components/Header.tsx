import Link from "next/link";

const links = [
  { href: "/docs", label: "Documentation" },
  { href: "/support", label: "Support" },
];

export default function Header() {
  return (
    <header className="page-width flex items-center justify-between gap-6 py-6 md:py-8">
      <Link href="/" className="font-heading text-[1.625rem] leading-none tracking-[0.04em]" aria-label="Aurelle, home">
        Aurelle
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-4 min-[380px]:gap-6 md:gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
