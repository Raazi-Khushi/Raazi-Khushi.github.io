import Image from "next/image";
import { cn } from "@/lib/cn";
import { FOOTER_TAGLINE, NAV_LINKS, SOCIAL_LINKS } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-teal-light">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[32px] px-[16px] py-[32px] lg:grid lg:min-h-[102px] lg:grid-cols-3 lg:items-center lg:gap-0 lg:px-[50px] lg:py-[33px]">
        <nav className="order-2 flex flex-wrap items-center justify-center gap-[32px] font-noto text-[18px] text-white lg:order-1 lg:justify-start lg:gap-[56px]">
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
                className={cn(
                  "grid size-[36px] place-items-center rounded-full shadow-[0_0_3.6px_rgba(0,0,0,0.12)]",
                  social.solid ? "bg-white" : "border-[0.6px] border-white",
                )}
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={20}
                  height={20}
                  className={social.label === "YouTube" ? "size-[20px]" : "h-[16.8px] w-auto"}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
