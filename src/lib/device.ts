/**
 * Best-effort device fingerprint for a waitlist signup — enough to answer "are
 * these signups coming from Android or iPhone, and through which browser".
 *
 * User-agent parsing is heuristic, not authoritative: browsers freeze and spoof
 * these strings deliberately. The raw UA is stored alongside the parsed fields
 * so a wrong guess can be corrected later without losing the source data.
 */
export type DeviceInfo = {
  /** "Android" | "iOS" | "Windows" | "macOS" | "Linux" | "Unknown" */
  os: string;
  /** e.g. "Chrome 120", "Instagram", "Safari 17" */
  browser: string;
  /** "mobile" | "tablet" | "desktop" */
  type: string;
  /** Raw UA, truncated to keep the document small. */
  userAgent: string;
};

type UaDataNavigator = Navigator & {
  userAgentData?: { mobile?: boolean; platform?: string };
};

export function getDeviceInfo(): DeviceInfo {
  if (typeof navigator === "undefined") {
    return { os: "Unknown", browser: "Unknown", type: "desktop", userAgent: "" };
  }

  const nav = navigator as UaDataNavigator;
  const ua = nav.userAgent ?? "";

  return {
    os: detectOs(ua, nav),
    browser: detectBrowser(ua),
    type: detectType(ua, nav),
    // Firestore charges by document size and UA strings can run long; 300 chars
    // covers every real-world UA with room to spare.
    userAgent: ua.slice(0, 300),
  };
}

function detectOs(ua: string, nav: UaDataNavigator): string {
  // Android must be tested before Linux — every Android UA also says "Linux".
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPod/i.test(ua)) return "iOS";
  if (/iPad/i.test(ua)) return "iPadOS";
  // iPads default to a desktop UA claiming macOS. A touch-capable "Mac" is an
  // iPad; real Macs report maxTouchPoints of 0.
  if (/Macintosh/i.test(ua) && nav.maxTouchPoints > 1) return "iPadOS";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macOS";
  if (/Windows/i.test(ua)) return "Windows";
  if (/CrOS/i.test(ua)) return "ChromeOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Unknown";
}

function detectBrowser(ua: string): string {
  // In-app webviews are checked first: they embed "Chrome" or "Safari" in their
  // UA, so any later rule would swallow them. Worth distinguishing — a signup
  // from Instagram's browser is a different traffic source than organic Chrome.
  if (/Instagram/i.test(ua)) return "Instagram";
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return "Facebook";
  if (/Snapchat/i.test(ua)) return "Snapchat";
  if (/\bLine\//i.test(ua)) return "LINE";

  // iOS forces every browser onto WebKit, so Chrome/Firefox/Edge there identify
  // themselves with these suffixed tokens instead of the usual ones.
  const iosVariant = match(ua, /(CriOS|FxiOS|EdgiOS|OPiOS)\/([\d.]+)/);
  if (iosVariant) {
    const label = { CriOS: "Chrome", FxiOS: "Firefox", EdgiOS: "Edge", OPiOS: "Opera" };
    return `${label[iosVariant[1] as keyof typeof label]} ${major(iosVariant[2])}`;
  }

  // Order matters: Edge, Opera and Samsung Internet all also claim "Chrome".
  const edge = match(ua, /Edg(?:e|A|iOS)?\/([\d.]+)/);
  if (edge) return `Edge ${major(edge[1])}`;

  const opera = match(ua, /OPR\/([\d.]+)/);
  if (opera) return `Opera ${major(opera[1])}`;

  const samsung = match(ua, /SamsungBrowser\/([\d.]+)/);
  if (samsung) return `Samsung Internet ${major(samsung[1])}`;

  const firefox = match(ua, /Firefox\/([\d.]+)/);
  if (firefox) return `Firefox ${major(firefox[1])}`;

  const chrome = match(ua, /Chrome\/([\d.]+)/);
  if (chrome) return `Chrome ${major(chrome[1])}`;

  // Safari only after every Chromium check — Chromium UAs end in "Safari/537.36".
  const safari = match(ua, /Version\/([\d.]+).*Safari/);
  if (safari) return `Safari ${major(safari[1])}`;
  if (/Safari/i.test(ua)) return "Safari";

  return "Unknown";
}

function detectType(ua: string, nav: UaDataNavigator): string {
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  // Android phones say "Mobile"; Android tablets omit it.
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return "tablet";
  if (/Macintosh/i.test(ua) && nav.maxTouchPoints > 1) return "tablet";
  if (/Mobi|iPhone|iPod/i.test(ua)) return "mobile";
  // Chromium exposes this directly and is more trustworthy than the UA string.
  if (nav.userAgentData?.mobile) return "mobile";
  return "desktop";
}

function match(value: string, pattern: RegExp) {
  return pattern.exec(value);
}

/** "120.0.6099.109" -> "120". Point releases are noise for this purpose. */
function major(version: string) {
  return version.split(".")[0];
}
