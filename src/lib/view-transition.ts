import { flushSync } from "react-dom";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

/**
 * Runs a state update inside a View Transition, so elements that change
 * position between the two renders are tweened rather than snapped.
 *
 * `flushSync` is required: the browser snapshots the DOM the moment the
 * callback returns, so React has to have committed by then.
 *
 * Falls back to a plain update where the API is missing or the reader has
 * asked for reduced motion — the result is the instant swap we had before.
 */
export function withViewTransition(update: () => void) {
  const doc = document as ViewTransitionDocument;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof doc.startViewTransition !== "function" || reduced) {
    update();
    return;
  }

  doc.startViewTransition(() => flushSync(update));
}
