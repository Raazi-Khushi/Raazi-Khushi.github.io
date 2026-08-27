"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { TrustBar } from "@/components/trust-bar";
import { Waitlist } from "@/components/waitlist";
import type { Audience } from "@/lib/content";
import { withViewTransition } from "@/lib/view-transition";

export default function Home() {
  const [audience, setAudience] = useState<Audience>("married");

  // The two audiences mirror the hero (photo and copy trade columns), which is
  // a discrete layout change CSS cannot tween on its own.
  const changeAudience = (next: Audience) => withViewTransition(() => setAudience(next));

  return (
    <main>
      <Hero audience={audience} onAudienceChange={changeAudience} />
      <HowItWorks audience={audience} />
      <TrustBar />
      <Waitlist audience={audience} />
      <SiteFooter />
    </main>
  );
}
