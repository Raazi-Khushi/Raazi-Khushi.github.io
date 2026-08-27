import Image from "next/image";
import { FOOTER_TAGLINE, NAV_LINKS, SOCIAL_LINKS } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-teal-light">
      {/* Equal outer columns keep the tagline on the page's centre line, while
          letting the nav claim the slack the tagline and icons don't need — a
          fixed third starved it and wrapped "Waitlist" below 1366px. */}
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[32px] px-[16px] py-[32px] lg:grid lg:min-h-[102px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-0 lg:px-[50px] lg:py-[33px]">
        <nav className="order-2 flex flex-wrap items-center justify-center gap-[32px] font-noto text-[18px] text-white lg:order-1 lg:justify-start lg:gap-[32px] xl:gap-[56px]">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-opacity hover:opacity-70">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="order-3 font-noto text-[18px] text-gold lg:order-2 lg:justify-self-center">
          {FOOTER_TAGLINE}
        </p>

        <ul className="order-1 flex items-center gap-[12px] lg:order-3 lg:justify-self-end">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                className="grid size-[36px] place-items-center rounded-full border-[0.6px] border-white shadow-[0_0_3.6px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-70"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={20}
                  height={20}
                  className={social.iconClass}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
