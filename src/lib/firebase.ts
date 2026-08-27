import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// The site is a static export, so every one of these is inlined into the client
// bundle at build time and is publicly visible. That is expected — Firebase web
// config is an identifier, not a secret. Access is controlled by Firestore
// security rules (see firestore.rules), NOT by hiding these values.
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * True once the build has real config baked in. Builds without a `.env.local`
 * (or without the GitHub Actions secrets) still compile and render — the form
 * just reports that signups are unavailable instead of throwing at import time.
 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

/**
 * Initialised lazily on first submit rather than at module scope, so the
 * Firestore chunk is not part of the initial page load.
 */
export function getDb(): Firestore {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase env vars are missing — see .env.example");
  }
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getFirestore(app);
}
