import Image from "next/image";
import { cn } from "@/lib/cn";
import { CTA_LABEL } from "@/lib/content";

type CtaButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export function CtaButton({ href = "#waitlist", label = CTA_LABEL, className }: CtaButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-[10px] rounded-[32px] bg-gold p-[8px] pl-[12px]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition hover:brightness-105",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      <span className="font-poppins text-[16px] font-medium text-white lg:text-[18px]">{label}</span>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white">
        <Image src="/icons/arrow-tr.svg" alt="" width={20} height={20} className="size-5" />
      </span>
    </a>
  );
}
