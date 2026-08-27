"use client";

import { cn } from "@/lib/cn";
import { AUDIENCE_OPTIONS, type Audience } from "@/lib/content";

type AudienceToggleProps = {
  value: Audience;
  onChange: (next: Audience) => void;
  /** Toggle sits on the deep-teal hero card. */
  onDark: boolean;
  className?: string;
};

export function AudienceToggle({ value, onChange, onDark, className }: AudienceToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Who are you here for?"
      className={cn(
        "inline-flex items-center gap-[6px] rounded-[40px] p-[8px] transition-colors duration-500 ease-out lg:gap-[8px] lg:rounded-[61px]",
        onDark ? "bg-teal-light" : "bg-white",
        className,
      )}
    >
      {AUDIENCE_OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-[20px] py-[8px] font-poppins text-[16px] font-medium whitespace-nowrap capitalize transition-colors",
              "lg:px-[32px] lg:py-[14px] lg:text-[18px]",
              selected && onDark && "bg-white text-deep-teal",
              selected && !onDark && "bg-deep-teal text-white",
              !selected && onDark && "text-white",
              !selected && !onDark && "text-deep-teal",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
