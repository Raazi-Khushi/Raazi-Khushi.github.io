"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { cn } from "@/lib/cn";
import { CTA_LABEL, type Audience } from "@/lib/content";

const ROLE_OPTIONS = [
  { value: "married", label: "Shaadi ke liye" },
  { value: "parent", label: "Parent" },
] as const;

type Status = "idle" | "done" | "error";

export function Waitlist({ audience }: { audience: Audience }) {
  const nameId = useId();
  const cityId = useId();
  const phoneId = useId();

  const [pickedRole, setPickedRole] = useState<Audience | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // The header toggle is the user's stated context, so it seeds this field —
  // until they pick a role by hand, at which point their choice sticks.
  const role = pickedRole ?? audience;

  // The site is a static export on GitHub Pages, so there is no server to post
  // to. Validation runs here and the signup is acknowledged but NOT stored.
  // TODO: point this at a real endpoint (Apps Script / form service) and send
  // the payload before showing the success message.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\s+/g, "");

    if (!fullName || !city || !phone) {
      setStatus("error");
      setError("Naam, sheher aur phone — teeno chahiye.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setStatus("error");
      setError("Phone number 10 digit ka hona chahiye.");
      return;
    }

    setStatus("done");
    setError("");
    form.reset();
    setPickedRole(null);
  }

  return (
    <section id="waitlist" className="relative isolate overflow-hidden">
      <Image
        src="/images/waitlist-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-deep-teal/85" />

      <div className="mx-auto max-w-[1440px] px-[16px] py-[50px] lg:px-[50px] lg:py-[80px]">
        <div className="flex flex-col items-center gap-[12px]">
          <EyebrowPill>Sirf 2 minute lagenge, vaada.</EyebrowPill>
          <h2 className="max-w-[735px] text-center font-poppins text-[36px] font-medium text-white lg:text-[48px] lg:leading-[72px]">
            Join the Founding Families List
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-[38px] w-full max-w-[847px] rounded-[16px] bg-white px-[16px] py-[24px] lg:mt-[50px] lg:rounded-[24px] lg:px-[41px] lg:py-[32px]"
        >
          <h3 className="text-center font-noto text-[28px] font-medium text-deep-teal lg:text-[32px]">
            Join The Baithak
          </h3>

          <div className="mt-[24px] grid gap-[16px] lg:mt-[32px] lg:grid-cols-2 lg:gap-x-[24px] lg:gap-y-[24px]">
            <Field id={nameId} label="Full Name">
              <input
                id={nameId}
                name="fullName"
                required
                autoComplete="name"
                placeholder="Simran Malhotra"
                className={inputClass}
              />
            </Field>

            <Field id={cityId} label="City">
              <input
                id={cityId}
                name="city"
                required
                autoComplete="address-level2"
                placeholder="Ludhiana"
                className={inputClass}
              />
            </Field>

            <Field id={phoneId} label="Phone Number">
              <div className="flex h-[64px] items-center gap-[12px] rounded-[48px] bg-field pl-[24px]">
                <span className="flex items-center gap-[8px] font-poppins text-[16px] text-deep-teal">
                  +91
                  <ChevronDown />
                </span>
                <span aria-hidden className="h-[41px] w-px bg-deep-teal/20" />
                {/* `w-0` is load-bearing: without it the input's default intrinsic
                    width (size=20) sets the row's min-content, which pushes the
                    whole form past its container on narrow phones. */}
                <input
                  id={phoneId}
                  name="phone"
                  required
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="98765 43210"
                  className="h-full w-0 min-w-0 flex-1 rounded-r-[48px] bg-transparent pr-[24px] font-poppins text-[16px] text-ink outline-none placeholder:text-ink/50"
                />
              </div>
            </Field>

            <fieldset className="flex flex-col gap-[8px]">
              <legend className="mb-[8px] font-poppins text-[18px] font-medium text-deep-teal">
                Main hoon
              </legend>
              <div className="flex items-center gap-[18px]">
                {ROLE_OPTIONS.map((option) => {
                  const selected = role === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setPickedRole(option.value)}
                      className={cn(
                        "h-[64px] flex-1 rounded-[37px] border border-deep-teal font-poppins text-[14px] font-medium transition-colors lg:max-w-[176px]",
                        selected ? "bg-deep-teal text-white" : "text-deep-teal hover:bg-deep-teal/5",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <button
            type="submit"
            className="mt-[32px] h-[59px] w-full rounded-[36px] bg-gold font-poppins text-[18px] font-medium text-white transition hover:brightness-105"
          >
            {CTA_LABEL}
          </button>

          <p
            role="status"
            aria-live="polite"
            className={cn(
              "mt-[12px] text-center font-noto text-[16px]",
              status === "error" ? "text-red-600" : "text-teal-light",
            )}
          >
            {status === "done" ? "Shukriya! Aap founding families list mein hain." : error}
          </p>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "h-[64px] w-full rounded-[48px] bg-field px-[24px] font-poppins text-[16px] text-ink outline-none placeholder:text-ink/50";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor={id} className="font-poppins text-[18px] font-medium text-deep-teal">
        {label}
      </label>
      {children}
    </div>
  );
}

/** Rotated to point downwards, matching the Figma country-code chevron. */
function ChevronDown() {
  return (
    <svg
      viewBox="0 0 5 9"
      className="h-[8px] w-[4px] -rotate-90 opacity-80"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4.5 0.5L0.5 4.5L4.5 8.5" />
    </svg>
  );
}
