import { styleRows } from "@/lib/content";

/**
 * Visual identity of the theme's style. The hex values and typeface names are copied from the theme's preset file
 * (presets/clinical.json); the description and target niche come from the documentation table, so the landing page
 * can never disagree with the docs.
 */
const identity: Record<string, { typefaces: string; palette: { name: string; hex: string }[] }> = {
  "Clinical Skincare": {
    typefaces: "IBM Plex Sans and Inter",
    palette: [
      { name: "Background", hex: "#FFFFFF" },
      { name: "Surface", hex: "#F4F6F8" },
      { name: "Accent", hex: "#DCEBF5" },
      { name: "Text", hex: "#1D2733" },
      { name: "Button", hex: "#24435E" },
    ],
  },
};

const [row] = styleRows;
const match = identity[row.name];
if (!match) throw new Error(`[style] no visual identity defined for "${row.name}"`);

export const themeStyle = { ...row, ...match };
