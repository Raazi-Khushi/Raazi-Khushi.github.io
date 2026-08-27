"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/cn";
import { HERO_COPY, type Audience } from "@/lib/content";

type HeroProps = {
  audience: Audience;
  onAudienceChange: (next: Audience) => void;
};

export function Hero({ audience, onAudienceChange }: HeroProps) {
  // "Getting Married" renders the deep-teal hero card; "Parent" renders the
  // pale variation with the photo leading.
  const onDark = audience === "married";
  const copy = HERO_COPY[audience];

  const photo = (
    <div className="relative aspect-[567/490] w-full overflow-hidden rounded-[12px] lg:rounded-[24px]">
      <Image
        src="/images/hero-family.png"
        alt="A family sitting together at a baithak"
        fill
        priority
        sizes="(min-width: 1024px) 567px, 100vw"
        className="object-cover"
      />
    </div>
  );

  const text = (
    <div className="flex flex-col items-center gap-[24px] text-center lg:items-start lg:text-left">
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-[54px] px-[31px] py-[10px] font-poppins text-[14px] font-medium lg:text-[18px]",
          onDark ? "bg-teal-light text-white" : "bg-white text-deep-teal",
        )}
      >
        {copy.eyebrow}
      </span>

      <div className="flex flex-col gap-[24px] lg:gap-[32px]">
        <div className="flex flex-col gap-[12px]">
          <h1
            className={cn(
              "font-poppins text-[36px] leading-[40px] font-medium lg:text-[56px] lg:leading-[70px] lg:font-semibold",
              onDark ? "text-white" : "text-deep-teal",
            )}
          >
            {copy.heading}
          </h1>
          <p
            className={cn(
              "font-noto text-[16px] lg:max-w-[680px] lg:text-[18px]",
              onDark ? "text-white" : "text-teal-light",
            )}
          >
            {copy.body}
          </p>
        </div>
        <CtaButton className="self-center lg:self-start" />
      </div>
    </div>
  );

  return (
    <section id="home" className={onDark ? "bg-pale" : "bg-white"}>
      <div className={cn("mx-auto max-w-[1440px]", onDark && "px-[6px] lg:px-[20px]")}>
        <div
          className={cn(
            "px-[10px] pt-[26px] pb-[54px] lg:pt-[24px] lg:pb-[60px]",
            onDark
              ? "rounded-[16px] bg-deep-teal lg:rounded-[24px] lg:px-[30px]"
              : "bg-pale px-[16px] lg:px-[50px] lg:pt-[44px] lg:pb-[68px]",
          )}
        >
          <SiteHeader audience={audience} onAudienceChange={onAudienceChange} onDark={onDark} />

          <div
            className={cn(
              "mt-[53px] grid gap-[32px] lg:mt-[113px] lg:items-center lg:gap-10 xl:gap-[77px]",
              onDark
                ? "lg:grid-cols-[minmax(0,696fr)_minmax(0,567fr)]"
                : "lg:grid-cols-[minmax(0,567fr)_minmax(0,696fr)]",
            )}
          >
            <div className={onDark ? "lg:order-2" : "lg:order-1"}>{photo}</div>
            <div className={onDark ? "lg:order-1" : "lg:order-2"}>{text}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
