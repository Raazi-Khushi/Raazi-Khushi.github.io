import { cn } from "@/lib/cn";

type EyebrowPillProps = {
  children: React.ReactNode;
  /** Pill sits on a light surface, so it needs a tint instead of plain white. */
  onLightSurface?: boolean;
  className?: string;
};

export function EyebrowPill({ children, onLightSurface = false, className }: EyebrowPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[32px] px-[20px] py-[10px]",
        "text-center font-noto text-[16px] font-medium text-gold",
        onLightSurface ? "bg-pale" : "bg-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
