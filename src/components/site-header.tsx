"use client";

import Image from "next/image";
import { useState } from "react";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/cn";
import { NAV_LINKS, type Audience } from "@/lib/content";

/** One lockup per audience. Both are 1000x830 with a transparent background. */
const LOGO_SRC: Record<Audience, string> = {
  parent: "/images/parent.png",
  married: "/images/suitor.png",
};

type SiteHeaderProps = {
  audience: Audience;
  /** Header sits on the deep-teal hero card. */
  onDark: boolean;
};

export function SiteHeader({ audience, onDark }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between">
      <a href="#home" aria-label="Raazi Khushi — home" className="transition-opacity hover:opacity-80">
        <Image
          src={LOGO_SRC[audience]}
          alt="Raazi Khushi"
          width={1000}
          height={830}
          priority
          className="h-[52px] w-auto lg:h-[60px]"
        />
      </a>

      <nav
        className={cn(
          "absolute left-1/2 hidden -translate-x-1/2 items-center gap-[48px] font-noto text-[18px] transition-colors duration-500 ease-out lg:flex",
          onDark ? "text-white" : "text-deep-teal",
        )}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="whitespace-nowrap transition-opacity hover:opacity-70">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden lg:block">
        <CtaButton />
      </div>

      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className={cn(
          "transition-colors duration-500 ease-out lg:hidden",
          onDark ? "text-white" : "text-deep-teal",
        )}
      >
        <MenuIcon />
      </button>

      {menuOpen ? (
        <div
          className={cn(
            "absolute top-[calc(100%+12px)] right-0 left-0 z-20 flex flex-col gap-[16px] rounded-[16px] p-[20px] font-noto text-[18px] shadow-[0_8px_24px_rgba(11,60,75,0.18)] lg:hidden",
            onDark ? "bg-teal-light text-white" : "bg-white text-deep-teal",
          )}
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <CtaButton className="self-start" />
        </div>
      ) : null}
    </header>
  );
}

/** menu-01, inlined so it can inherit the header's text colour. */
function MenuIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8"
      aria-hidden
    >
      <path d="M5.33333 6.66667H26.6667" />
      <path d="M5.33333 16H26.6667" />
      <path d="M5.33333 25.3333H26.6667" />
    </svg>
  );
}
