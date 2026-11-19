"use client";

import { useEffect, useMemo, useState } from "react";

export type NavItem = { id: string; number: string | null; title: string; text: string };

/**
 * Sticky documentation sidebar: a quick search over every section, and a table of contents with scroll-spy.
 * The scroll-spy reads section positions on scroll (throttled with requestAnimationFrame), which also handles the last
 * section correctly when it is too short to ever reach the trigger line.
 */
export default function DocsNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0].id);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const trigger = window.innerHeight * 0.3;
      let current = items[0].id;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= trigger) current = item.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = items[items.length - 1].id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  const results = useMemo(() => {
    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 1);
    if (terms.length === 0) return null;

    return items
      .map((item) => {
        const title = item.title.toLowerCase();
        const text = item.text.toLowerCase();
        if (!terms.every((term) => title.includes(term) || text.includes(term))) return null;

        const score = terms.reduce(
          (total, term) => total + (title.includes(term) ? 10 : 0) + (text.split(term).length - 1),
          0
        );
        const firstHit = Math.min(...terms.map((term) => (text.indexOf(term) === -1 ? Infinity : text.indexOf(term))));
        const start = Number.isFinite(firstHit) ? Math.max(0, firstHit - 48) : 0;
        const snippet = `${start > 0 ? "…" : ""}${item.text.slice(start, start + 130)}…`;
        return { item, snippet, score };
      })
      .filter((result): result is { item: NavItem; snippet: string; score: number } => result !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [items, query]);

  return (
    <div>
      <div role="search">
        <label htmlFor="docs-search" className="eyebrow block">
          Search
        </label>
        <input
          id="docs-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setQuery("");
          }}
          placeholder="Search the documentation"
          autoComplete="off"
          spellCheck={false}
          className="mt-2 h-11 w-full border border-foreground bg-transparent px-3 text-[0.9375rem] placeholder:text-muted"
        />
      </div>

      {results ? (
        <div className="mt-6" aria-live="polite">
          {results.length === 0 ? (
            <p className="text-[0.9375rem] text-muted">No results for &ldquo;{query.trim()}&rdquo;.</p>
          ) : (
            <ul className="border-b border-line">
              {results.map(({ item, snippet }) => (
                <li key={item.id} className="border-t border-line">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setQuery("")}
                    className="block py-3 hover:opacity-60"
                  >
                    <span className="block text-[0.9375rem] font-semibold">{item.title}</span>
                    <span className="mt-1 block text-[0.8125rem] leading-6 text-muted">{snippet}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <nav aria-label="Documentation sections" className="mt-8">
          <p className="eyebrow">On this page</p>
          <ul className="mt-3 border-l border-line">
            {items.map((item) => {
              const isActive = item.id === active;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`-ml-px flex min-h-9 items-center gap-3 border-l py-1 pl-4 text-[0.9375rem] leading-snug transition-colors ${
                      isActive
                        ? "border-foreground font-semibold text-foreground"
                        : "border-transparent text-muted hover:text-foreground"
                    }`}
                  >
                    {item.number ? (
                      <span className="w-5 text-[0.6875rem] font-semibold tracking-[0.12em]">{item.number}</span>
                    ) : (
                      <span className="w-5" aria-hidden="true" />
                    )}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
