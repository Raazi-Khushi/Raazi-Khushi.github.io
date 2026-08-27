import Image from "next/image";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { STEPS, type Audience } from "@/lib/content";

export function HowItWorks({ audience }: { audience: Audience }) {
  const onPale = audience === "married";

  return (
    <section id="how-it-works" className={onPale ? "bg-pale" : "bg-white"}>
      <div className="mx-auto max-w-[1440px] px-[16px] py-[50px] lg:px-[50px] lg:py-[80px]">
        <div className="flex flex-col items-center gap-[12px]">
          <EyebrowPill onLightSurface={!onPale}>How It Work</EyebrowPill>
          <h2 className="text-center font-poppins text-[36px] leading-[55px] font-medium text-deep-teal lg:text-[48px] lg:leading-[72px]">
            Three Steps, One Decision
          </h2>
        </div>

        <ul className="mx-auto mt-[24px] grid gap-[12px] lg:mt-[40px] lg:max-w-[1130px] lg:grid-cols-3 lg:gap-[16px]">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="rounded-[12px] bg-white p-[24px] shadow-[0_2px_12px_rgba(27,77,92,0.06)]"
            >
              <div className="relative flex h-full flex-col items-center gap-[12px]">
                <span
                  aria-hidden
                  className="absolute top-0 right-0 font-poppins text-[40px] leading-none font-medium text-step"
                >
                  {step.number}
                </span>
                <Image src={step.icon} alt="" width={64} height={64} className="size-16" />
                <h3 className="text-center font-noto text-[32px] font-medium text-deep-teal">
                  {step.title}
                </h3>
                <p className="text-center font-noto text-[18px] text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
