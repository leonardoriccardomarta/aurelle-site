import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/**
 * Reads the theme documentation (markdown copied into /content) once, at build time, and turns it into plain data.
 * Module scope on purpose: the content is the same for every visitor, so pages stay fully static.
 * Anything unexpected throws, so a malformed file fails the build instead of publishing an empty page.
 */

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), "content", file), "utf8").replace(/\r\n/g, "\n");

const fail = (message: string): never => {
  throw new Error(`[content] ${message}`);
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toHtml = (markdown: string) => {
  const html = marked.parse(markdown, { async: false, gfm: true }) as string;
  // Wide tables scroll sideways inside their own box instead of breaking the page on phones.
  return html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
};

const decode = (text: string) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const plain = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** Splits markdown into the text before the first "## " heading and the "## " sections after it. */
const splitSections = (markdown: string) => {
  const parts = markdown.split(/^## /m);
  const intro = parts.shift() ?? "";
  const sections = parts.map((part) => {
    const newline = part.indexOf("\n");
    return { heading: part.slice(0, newline).trim(), body: part.slice(newline + 1).trim() };
  });
  return { intro, sections };
};

const bullets = (body: string) =>
  body
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());

export type DocSection = {
  id: string;
  number: string | null;
  title: string;
  html: string;
  text: string;
};

/* ----------------------------------------------------------------------------------------------- documentation */

const documentation = read("documentation.md");
const { intro: docsIntro, sections: docsRaw } = splitSections(documentation);

const docsIntroBody = docsIntro.replace(/^# .*\n+/, "").trim();
if (!docsIntroBody || docsRaw.length < 5) fail("documentation.md does not have the expected structure");

const docsSections: DocSection[] = [
  { id: "overview", number: null, title: "Overview", html: toHtml(docsIntroBody), text: plain(toHtml(docsIntroBody)) },
  ...docsRaw.map(({ heading, body }) => {
    const match = heading.match(/^(\d+)\.\s+(.*)$/);
    const title = match ? match[2] : heading;
    const html = toHtml(body);
    return { id: slugify(title), number: match ? match[1].padStart(2, "0") : null, title, html, text: plain(html) };
  }),
];

/* ----------------------------------------------------------------------------------------------- changelog */

const changelogMarkdown = read("changelog.md");
const changelogBody = changelogMarkdown.replace(/^# .*\n+/, "").replace(/^## /gm, "### ").trim();
if (!/^### \d+\.\d+\.\d+/m.test(changelogBody)) fail("changelog.md has no version heading");

const changelogHtml = toHtml(changelogBody);
const latestVersion = (changelogBody.match(/^### (\d+\.\d+\.\d+)/m) as RegExpMatchArray)[1];

docsSections.push({
  id: "changelog",
  number: null,
  title: "Changelog",
  html: changelogHtml,
  text: plain(changelogHtml),
});

/* ----------------------------------------------------------------------------------------------- support */

const supportMarkdown = read("support.md");
const { intro: supportIntro, sections: supportRaw } = splitSections(supportMarkdown);

const supportSection = (title: string) => {
  const found = supportRaw.find((section) => section.heading.toLowerCase().startsWith(title));
  return found ? bullets(found.body) : fail(`support.md is missing the "${title}" section`);
};

const helpBullets = supportSection("how to get help");
const fact = (prefix: string) => {
  const line = helpBullets.find((bullet) => bullet.toLowerCase().startsWith(prefix));
  if (!line) return fail(`support.md "How to get help" has no "${prefix}" line`);
  return (line as string).slice((line as string).indexOf(":") + 1).trim().replace(/\.$/, "");
};

const inline = (text: string) => decode(text.replace(/\*\*/g, ""));
const sentence = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const support = {
  lead: supportIntro.replace(/^# .*\n+/, "").trim(),
  responseTime: sentence(fact("typical response time")),
  hours: fact("support hours"),
  language: fact("support language"),
  covered: supportSection("what is covered").map(inline),
  notCovered: supportSection("what is not covered").map(inline),
  include: supportSection("when you write to us").map(inline),
};

/* ----------------------------------------------------------------------------------------------- FAQ */

const troubleshooting = docsRaw.find((section) => section.heading.toLowerCase().includes("troubleshooting"));
if (!troubleshooting) fail("documentation.md has no Troubleshooting section");

const troubleshootingFaq = bullets((troubleshooting as { body: string }).body).map((bullet) => {
  const match = bullet.match(/^\*\*(.+?):\*\*\s*(.+)$/);
  if (!match) return fail(`Troubleshooting line is not "**Problem:** answer": ${bullet}`);
  const [, question, answer] = match as RegExpMatchArray;
  return { question, answer: sentence(answer.trim()) };
});

const restyleLine = documentation.match(/you can restyle the theme at any time without rewriting anything/);
if (!restyleLine) fail("documentation.md no longer says the theme can be restyled without rewriting content");

export const faq = [
  {
    question: "How quickly will I hear back?",
    answer: `${support.responseTime}, ${support.hours}.`,
  },
  {
    question: "What should I include in my message?",
    answer: `${support.include.join(" ")}`,
  },
  {
    question: "Can I restyle the theme later without rewriting my content?",
    answer:
      "Yes. The default homepage is a neutral base on purpose: its wording works for any skincare brand, so you can restyle the theme at any time without rewriting anything.",
  },
  {
    question: "Where do I find the theme version?",
    answer: "In the theme editor, under Theme settings.",
  },
  ...troubleshootingFaq.map(({ question, answer }) => ({ question, answer })),
];

/* ----------------------------------------------------------------------------------------------- tables in the docs */

const tableRows = (body: string) =>
  body
    .split("\n")
    .filter((line) => line.trim().startsWith("|"))
    .map((line) =>
      line
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => inline(cell.trim()))
    )
    .filter((cells) => !cells.every((cell) => /^[-:\s]*$/.test(cell)))
    .slice(1); // drop the header row

const styleSection = docsRaw.find((section) => /^(\d+\.\s*)?style$/i.test(section.heading.trim()));
if (!styleSection) fail("documentation.md has no Style section");

export const styleRows = tableRows((styleSection as { body: string }).body).map(([name, look, bestFor]) => ({
  name,
  look,
  bestFor,
}));
if (styleRows.length !== 1) fail(`expected 1 style in the docs table, found ${styleRows.length}`);

const librarySection = docsRaw.find((section) => section.heading.toLowerCase().includes("section library"));
if (!librarySection) fail("documentation.md has no section library table");

export const sectionCount = tableRows((librarySection as { body: string }).body).length;

/* ----------------------------------------------------------------------------------------------- exports */

export const docs = {
  sections: docsSections,
  latestVersion,
};
