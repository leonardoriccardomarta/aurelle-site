import { presetRows } from "@/lib/content";

/**
 * Visual identity of each preset. The hex values and typeface names are copied from the theme's preset files
 * (presets/*.json); the description and target niche come from the documentation table, so the landing page can
 * never disagree with the docs.
 */
const identity: Record<string, { typefaces: string; palette: { name: string; hex: string }[] }> = {
  "Quiet Luxury": {
    typefaces: "Cormorant Garamond and Assistant",
    palette: [
      { name: "Background", hex: "#FBF8F4" },
      { name: "Surface", hex: "#F3ECE4" },
      { name: "Accent", hex: "#E6D9C6" },
      { name: "Text", hex: "#1A1816" },
      { name: "Muted", hex: "#5E564E" },
    ],
  },
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
  "Botanical & Organic": {
    typefaces: "Lora and Nunito Sans",
    palette: [
      { name: "Background", hex: "#F7F3EA" },
      { name: "Surface", hex: "#ECE7D8" },
      { name: "Accent", hex: "#CBD5B8" },
      { name: "Text", hex: "#2B2A1F" },
      { name: "Button", hex: "#4A5233" },
    ],
  },
};

export const presets = presetRows.map((row) => {
  const match = identity[row.name];
  if (!match) throw new Error(`[presets] no visual identity defined for "${row.name}"`);
  return { ...row, ...match };
});
