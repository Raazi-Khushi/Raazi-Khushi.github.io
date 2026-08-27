"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { TrustBar } from "@/components/trust-bar";
import { Waitlist } from "@/components/waitlist";
import type { Audience } from "@/lib/content";

export default function Home() {
  const [audience, setAudience] = useState<Audience>("married");

  return (
    <main>
      <Hero audience={audience} onAudienceChange={setAudience} />
      <HowItWorks audience={audience} />
      <TrustBar />
      <Waitlist audience={audience} />
      <SiteFooter />
    </main>
  );
}
