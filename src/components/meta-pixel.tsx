// Inlined into the static HTML at build time like the Firebase config. A pixel
// ID is not a secret — it ships in the markup of every page by design.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Meta Pixel base code, verbatim from Events Manager.
 *
 * Rendered as a plain inline `<script>` inside the root layout's `<head>` (not
 * `next/script`): `beforeInteractive` compiles to a deferred `__next_s` loader
 * at the top of `<body>` in the App Router, so `fbq` and the PageView would
 * wait on the Next runtime. Inline in `<head>` it runs during parse.
 *
 * Renders nothing when the env var is absent, so local builds and previews do
 * not send traffic to the production pixel.
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(PIXEL_ID)});
fbq('track', 'PageView');`,
      }}
    />
  );
}

/**
 * The `<noscript>` half of the base code. Kept separate from {@link MetaPixel}
 * because it belongs in `<body>` — an `<img>` inside `<head>` is invalid HTML
 * and the browser hoists it out of the head anyway.
 */
export function MetaPixelNoScript() {
  if (!PIXEL_ID) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${encodeURIComponent(PIXEL_ID)}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
