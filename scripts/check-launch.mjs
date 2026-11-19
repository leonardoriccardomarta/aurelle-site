// Run before deploying:  npm run check:launch
// Fails while the site still carries placeholder contact details, and prints the exact values to paste into the
// theme's config/settings_schema.json (theme_documentation_url and theme_support_url).
import fs from "node:fs";

const source = fs.readFileSync(new URL("../src/config/site.ts", import.meta.url), "utf8");
const read = (key) => source.match(new RegExp(`${key}:\\s*"([^"]*)"`))?.[1] ?? "";

const url = read("url").replace(/\/$/, "");
const email = read("supportEmail");

const problems = [];
if (!url || /example\.(com|org|net)/.test(url)) problems.push(`site url is still a placeholder: "${url}"`);
if (!email || /example\.(com|org|net)/.test(email)) problems.push(`support email is still a placeholder: "${email}"`);

if (problems.length) {
  console.error("Not ready to launch:");
  problems.forEach((problem) => console.error(`  - ${problem}`));
  console.error("Edit src/config/site.ts, then run this again.");
  process.exit(1);
}

console.log("Ready to launch.\n");
console.log("Put these in the theme (config/settings_schema.json, theme_info):");
console.log(`  theme_documentation_url: ${url}/docs`);
console.log(`  theme_support_url:       ${url}/support`);
console.log(`Support email shown on the site and to put in docs/support.md: ${email}`);
