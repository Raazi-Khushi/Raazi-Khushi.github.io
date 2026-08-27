export type Audience = "married" | "parent";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Trust", href: "#trust" },
  { label: "Waitlist", href: "#waitlist" },
] as const;

export const AUDIENCE_OPTIONS = [
  { value: "parent", label: "Parent" },
  { value: "married", label: "Getting Married" },
] as const;

export const CTA_LABEL = "Join the Baithak";

export const SECTION_HEADINGS = {
  howItWorks: "Three Steps, One Decision",
  howItWorksEyebrow: "How It Works",
  waitlist: "Join the Founding Families List",
  waitlistForm: "Join The Baithak",
} as const;

type HeroCopy = {
  eyebrow: string;
  heading: string;
  body: string;
};

type Step = {
  number: string;
  icon: string;
  title: string;
  body: string;
};

type TrustPoint = {
  icon: string;
  label: string;
  /** The curated icon is drawn upside-down in the source SVG. */
  flipY: boolean;
};

type AudienceCopy = {
  hero: HeroCopy;
  steps: readonly Step[];
  trustPoints: readonly TrustPoint[];
  waitlistEyebrow: string;
};

/**
 * The toggle swaps the whole page's voice, not just the hero: the parent view
 * speaks to the family carrying the search, the married view to the person the
 * search is about. Everything that changes between them lives here so the two
 * columns can be read side by side.
 */
export const AUDIENCE_COPY: Record<Audience, AudienceCopy> = {
  parent: {
    hero: {
      eyebrow: "Rishte ki zimmedari, ab akeli nahi.",
      heading: "Something's coming for parents tired of carrying the rishta hunt alone.",
      body: "No more biodata ke dher, broker ke chakkar, ya awkward phone calls. Sirf verified families — aur is baar, bachche khud aapke saath baithenge.",
    },
    steps: [
      {
        number: "01",
        icon: "/icons/user-love.svg",
        title: "Ghar Judta Hai",
        body: "Apni family ka profile banaiye. 2 minute, bina kisi jhanjhat ke.",
      },
      {
        number: "02",
        icon: "/icons/connect.svg",
        title: "Rishte Aate Hain",
        body: "Verified families dekhiye, pasand aaye toh sambhal ke rakhiye — sab ek hi jagah.",
      },
      {
        number: "03",
        icon: "/icons/square-mouse-pointer.svg",
        title: "Saath Faisla Hota Hai",
        body: "Ghar baith ke discuss kijiye. Aage sirf wahi rishta badhta hai jis pe bachcha bhi raazi ho.",
      },
    ],
    trustPoints: [
      { icon: "/icons/shield-user.svg", label: "Har Family Verified", flipY: false },
      { icon: "/icons/badge-check.svg", label: "Beti-Bete ki Privacy, Sabse Pehle", flipY: false },
      { icon: "/icons/curated.svg", label: "Roz Sirf Chuninda Rishte", flipY: true },
    ],
    waitlistEyebrow: "Sirf 2 minute lagenge, vaada.",
  },
  married: {
    hero: {
      eyebrow: "For the one actually getting married.",
      heading: 'Something\'s coming for everyone whose family finds a "perfect match" every week.',
      body: "No stranger DMs. No aunty algorithm. Family shortlists all they want, nothing moves without your tap. Your shaadi, your yes. Finally.",
    },
    steps: [
      {
        number: "01",
        icon: "/icons/user-love.svg",
        title: "You Join, On Your Terms",
        body: "Your profile stays yours. Parents get their own side, they never see yours.",
      },
      {
        number: "02",
        icon: "/icons/connect.svg",
        title: "Rishte Come to the House",
        body: "Not to your inbox. Every family verified, every intro with consent.",
      },
      {
        number: "03",
        icon: "/icons/square-mouse-pointer.svg",
        title: "Your Tap Decides",
        body: "Discuss it, debate it, dinner-table drama it. Nothing moves till you say yes.",
      },
    ],
    trustPoints: [
      { icon: "/icons/shield-user.svg", label: "Verified Humans Only", flipY: false },
      { icon: "/icons/badge-check.svg", label: "Your Profile, Your Rules", flipY: false },
      { icon: "/icons/curated.svg", label: "No Doomscroll Matchmaking", flipY: true },
    ],
    waitlistEyebrow: "2 minutes. Shorter than one aunty call.",
  },
};

export const SOCIAL_LINKS = [
  { icon: "/icons/linkedin.svg", label: "LinkedIn", href: "#", solid: true },
  { icon: "/icons/youtube.svg", label: "YouTube", href: "#", solid: false },
  { icon: "/icons/instagram.svg", label: "Instagram", href: "#", solid: false },
  { icon: "/icons/facebook.svg", label: "Facebook", href: "#", solid: false },
] as const;

export const FOOTER_TAGLINE = "Aaj Raazi, Kal Khushi.";
