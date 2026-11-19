/**
 * Site-wide facts. Everything else (hours, response time, scope of support, documentation) is read from the
 * markdown files in /content, which are copies of the theme's docs.
 *
 * FINAL STEP BEFORE LAUNCH: replace `url` and `supportEmail` with the real values, then run `npm run check:launch`.
 * Nothing else in the code needs to change.
 */
export const site = {
  name: "Aurelle Studio",
  theme: "Aurelle",
  version: "1.0.0",
  url: "https://aurelletheme.com",
  supportEmail: "support@aurelletheme.com",
} as const;
