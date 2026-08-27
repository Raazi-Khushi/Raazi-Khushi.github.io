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

type HeroCopy = {
  eyebrow: string;
  heading: string;
  body: string;
};

/**
 * Both toggle states ship the same copy in Figma — only the hero treatment
 * changes. Keyed by audience so the wording can diverge later without
 * touching the layout.
 */
export const HERO_COPY: Record<Audience, HeroCopy> = {
  married: {
    eyebrow: "Rishte ki zimmedari, ab akeli nahi.",
    heading: "Something's coming for parents tired of carrying the rishta hunt alone.",
    body: "No more biodata ke dher, broker ke chakkar, ya awkward phone calls. Sirf verified families — aur is baar, bachche khud aapke saath baithenge.",
  },
  parent: {
    eyebrow: "Rishte ki zimmedari, ab akeli nahi.",
    heading: "Something's coming for parents tired of carrying the rishta hunt alone.",
    body: "No more biodata ke dher, broker ke chakkar, ya awkward phone calls. Sirf verified families — aur is baar, bachche khud aapke saath baithenge.",
  },
};

export const STEPS = [
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
] as const;

export const TRUST_POINTS = [
  { icon: "/icons/shield-user.svg", label: "Har Family Verified", flipY: false },
  { icon: "/icons/badge-check.svg", label: "Beti-Bete ki Privacy, Sabse Pehle", flipY: false },
  { icon: "/icons/curated.svg", label: "Roz Sirf Chuninda Rishte", flipY: true },
] as const;

export const SOCIAL_LINKS = [
  { icon: "/icons/linkedin.svg", label: "LinkedIn", href: "#", solid: true },
  { icon: "/icons/youtube.svg", label: "YouTube", href: "#", solid: false },
  { icon: "/icons/instagram.svg", label: "Instagram", href: "#", solid: false },
  { icon: "/icons/facebook.svg", label: "Facebook", href: "#", solid: false },
] as const;

export const FOOTER_TAGLINE = "Aaj Raazi, Kal Khushi.";
