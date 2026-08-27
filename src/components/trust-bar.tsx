import { IconCircle } from "@/components/ui/icon-circle";
import { AUDIENCE_COPY, type Audience } from "@/lib/content";

export function TrustBar({ audience }: { audience: Audience }) {
  const { trustPoints } = AUDIENCE_COPY[audience];

  return (
    <section id="trust" className="bg-teal-light">
      <div className="mx-auto flex min-h-[115px] max-w-[1440px] items-center px-[16px] py-[22px] lg:px-[69px]">
        {/* `gap` is a floor, not a fixed step: `justify-between` opens it out to
            the Figma spacing at 1440 and lets it close on narrower desktops,
            so the row never needs to scroll. */}
        <ul className="flex w-full flex-col items-start gap-[20px] lg:flex-row lg:items-center lg:justify-between lg:gap-[40px] xl:gap-[80px]">
          {trustPoints.map((point) => (
            <li key={point.label} className="flex items-center gap-[20px]">
              <IconCircle src={point.icon} flipY={point.flipY} />
              <span className="font-poppins text-[18px] font-semibold text-white xl:whitespace-nowrap">
                {point.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
