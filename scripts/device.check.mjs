// Exercises the user-agent parser in src/lib/device.ts against real UA strings.
// Run with: npm run check:device
import { getDeviceInfo } from "../src/lib/device.ts";

const CASES = [
  ["Android Chrome phone", "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36", "Android", "Chrome 120", "mobile"],
  ["iPhone Safari", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1", "iOS", "Safari 17", "mobile"],
  ["iPhone Chrome", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1", "iOS", "Chrome 120", "mobile"],
  ["Instagram in-app (Android)", "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 Instagram 302.0.0.23.113 Android", "Android", "Instagram", "mobile"],
  ["Facebook in-app (iOS)", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 [FBAN/FBIOS;FBAV/442.0.0.35.109]", "iOS", "Facebook", "mobile"],
  ["Samsung Internet", "Mozilla/5.0 (Linux; Android 13; SM-A536E) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36", "Android", "Samsung Internet 23", "mobile"],
  ["Android tablet", "Mozilla/5.0 (Linux; Android 13; SM-X200) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", "Android", "Chrome 120", "tablet"],
  ["iPad (legacy UA)", "Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1", "iPadOS", "Safari 17", "tablet"],
  ["Windows Chrome", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", "Windows", "Chrome 120", "desktop"],
  ["Windows Edge", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.2210.91", "Windows", "Edge 120", "desktop"],
  ["macOS Safari", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15", "macOS", "Safari 17", "desktop"],
  ["Desktop Firefox", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0", "Windows", "Firefox 121", "desktop"],
];

// Node exposes `navigator` as a getter-only global, so it has to be redefined.
function setNavigator(value) {
  Object.defineProperty(globalThis, "navigator", { value, configurable: true, writable: true });
}

let failures = 0;
for (const [name, ua, os, browser, type] of CASES) {
  setNavigator({ userAgent: ua, maxTouchPoints: 0 });
  const got = getDeviceInfo();
  const ok = got.os === os && got.browser === browser && got.type === type;
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${name.padEnd(28)} os=${got.os} browser=${got.browser} type=${got.type}` +
      (ok ? "" : `\n      expected: os=${os} browser=${browser} type=${type}`),
  );
}

// iPad masquerading as a Mac is only distinguishable via touch points.
setNavigator({
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
  maxTouchPoints: 5,
});
const ipad = getDeviceInfo();
const ipadOk = ipad.os === "iPadOS" && ipad.type === "tablet";
if (!ipadOk) failures++;
console.log(`${ipadOk ? "PASS" : "FAIL"}  ${"iPad desktop-mode UA".padEnd(28)} os=${ipad.os} type=${ipad.type}`);

console.log(failures ? `\n${failures} FAILING` : "\nall passing");
process.exit(failures ? 1 : 0);
