import { getDb } from "@/lib/firebase";
import { getDeviceInfo } from "@/lib/device";
import type { Audience } from "@/lib/content";

/** Firestore collection holding one document per waitlist signup. */
export const WAITLIST_COLLECTION = "waitlist";

/** Query param that carries campaign provenance, e.g. `/?source=instagram-bio`. */
const SOURCE_PARAM = "source";

/**
 * Firestore rules cap `source` at 200 chars, so anything longer has to be cut
 * here — otherwise an over-long param would fail the write and lose the signup
 * rather than just losing the attribution.
 */
const SOURCE_MAX_LENGTH = 200;

/**
 * The UI calls the second audience "married" (as in *getting* married), but the
 * stored records call that person a suitor. Translating at the boundary keeps
 * the site copy and the data vocabulary independent — renaming a button label
 * later must not silently split the collection into two role values.
 */
const ROLE_BY_AUDIENCE: Record<Audience, string> = {
  parent: "parent",
  married: "suitor",
};

export type WaitlistEntry = {
  fullName: string;
  city: string;
  /** 10 digits, no country code. */
  phone: string;
  role: Audience;
};

/** `?source=whatsapp` -> `"whatsapp"`. Absent or server-side -> `""`. */
function getSource(): string {
  if (typeof window === "undefined") return "";
  const value = new URLSearchParams(window.location.search).get(SOURCE_PARAM);
  return (value ?? "").trim().slice(0, SOURCE_MAX_LENGTH);
}

/**
 * Stores a signup, keyed by phone number so the same person cannot appear
 * twice. Re-submitting an existing number is a no-op that resolves normally —
 * the caller shows the usual success message either way, since telling a
 * visitor "you already signed up" is noise, not information.
 *
 * The first entry wins: a repeat submission never overwrites the original
 * name, city, role or timestamp.
 */
export async function submitWaitlistEntry(entry: WaitlistEntry) {
  const db = getDb();
  // Imported here rather than at module scope so the Firestore bundle only
  // loads when someone actually submits.
  const { doc, serverTimestamp, setDoc } = await import("firebase/firestore");

  try {
    // Writing to a fixed ID rather than addDoc()'s random one is what enforces
    // uniqueness — see the comment in firestore.rules.
    await setDoc(doc(db, WAITLIST_COLLECTION, entry.phone), {
      fullName: entry.fullName,
      city: entry.city,
      phone: entry.phone,
      role: ROLE_BY_AUDIENCE[entry.role],
      // Client clocks lie; stamp on the server so ordering is trustworthy.
      createdAt: serverTimestamp(),
      // Where the visitor came from, taken from the campaign link they clicked.
      source: getSource(),
      // Which platform the signup came from — drives whether Android or iOS
      // gets built first, and surfaces in-app browsers (Instagram, Facebook)
      // that behave differently from a real browser.
      device: getDeviceInfo(),
    });
  } catch (cause) {
    // A duplicate number is rejected as `permission-denied`, and so is a
    // genuinely malformed document — the codes are identical, so this branch
    // cannot tell them apart. Client-side validation runs first and covers
    // every field the rules check, which makes a duplicate overwhelmingly the
    // likelier cause. Logged rather than swallowed silently so a rules
    // regression is still visible in the console instead of looking like a
    // site full of repeat visitors.
    if ((cause as { code?: string })?.code === "permission-denied") {
      console.warn("Waitlist write rejected — treating as an existing signup", cause);
      return;
    }
    throw cause;
  }
}
