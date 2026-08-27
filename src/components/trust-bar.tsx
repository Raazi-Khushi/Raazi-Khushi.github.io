import { IconCircle } from "@/components/ui/icon-circle";
import { TRUST_POINTS } from "@/lib/content";

export function TrustBar() {
  return (
    <section id="trust" className="bg-teal-light">
      <div className="mx-auto flex min-h-[115px] max-w-[1440px] items-center px-[16px] py-[22px] lg:overflow-x-auto lg:px-[69px]">
        <ul className="flex w-full flex-col items-start gap-[20px] lg:min-w-max lg:flex-row lg:items-center lg:justify-between lg:gap-[169px]">
          {TRUST_POINTS.map((point) => (
            <li key={point.label} className="flex items-center gap-[20px]">
              <IconCircle src={point.icon} flipY={point.flipY} />
              <span className="font-poppins text-[18px] font-semibold text-white lg:whitespace-nowrap">
                {point.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
