"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { ArrowUpRight } from "./icons";

export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the section that crosses the upper third of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    const targets = ["top", ...nav.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    targets.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-sm font-medium tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-fg text-[11px] font-semibold text-bg">
            NY
          </span>
          {site.name}
        </a>

        <nav aria-label="Sections" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 sm:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className="rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-fg aria-[current]:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="mx-1 hidden h-4 w-px bg-line sm:block" />
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            Resume
            <ArrowUpRight width={13} height={13} />
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
