import type { Settings } from "./types";

export const presets = {
  midnight: {
    accent: "#8b7cff",
    bg: "#080b12",
    panel: "#10141d",
    tile: "#151b27",
    text: "#f7f8fb",
    border: "#27303e",
  },

  amoled: {
    accent: "#4ade80",
    bg: "#000000",
    panel: "#070707",
    tile: "#101010",
    text: "#f7f7f7",
    border: "#252525",
  },

  ocean: {
    accent: "#22d3ee",
    bg: "#06131c",
    panel: "#0b202b",
    tile: "#102f3d",
    text: "#ecfeff",
    border: "#1b4c5c",
  },

  forest: {
    accent: "#4ade80",
    bg: "#07110b",
    panel: "#0c1c12",
    tile: "#13291a",
    text: "#effff4",
    border: "#275035",
  },

  sunset: {
    accent: "#fb923c",
    bg: "#170b11",
    panel: "#25131b",
    tile: "#351923",
    text: "#fff7ed",
    border: "#5d3040",
  },

  minimal: {
    accent: "#4f46e5",
    bg: "#f4f6fa",
    panel: "#ffffff",
    tile: "#ffffff",
    text: "#111827",
    border: "#dce2eb",
  },

  cyber: {
    accent: "#f472b6",
    bg: "#05020a",
    panel: "#10051a",
    tile: "#160722",
    text: "#fff5fd",
    border: "#4d1d67",
  },

  mono: {
    accent: "#111827",
    bg: "#f3f4f6",
    panel: "#ffffff",
    tile: "#e5e7eb",
    text: "#111827",
    border: "#9ca3af",
  },
} as const;

export const defaults: Settings = {
  theme: {
    mode: "dark",
    preset: "cyber",
    ...presets.cyber,
    bgImage: "",
    overlay: 0.08,
  },

  grid: {
    rows: 4,
    cols: 4,

    iconSize: 76,
    tileSize: 118,
    gap: 34,
    radius: 26,

    showLabels: false,
    rtl: false,
    startCorner: "top-left",

    viewMode: "grid",
    scrollDirection: "vertical",

    zoom: 100,
    reverseOrder: false,

    font:
      'Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif',

    labelSize: 12,
    labelWeight: 600,
    textWrap: 2,

    scrollbar: "thin",
    centerTiles: true,
  },
};

export function normalize(s?: Partial<Settings>): Settings {
  return {
    id: s?.id,
    theme: {
      ...defaults.theme,
      ...(s?.theme || {}),
    },
    grid: {
      ...defaults.grid,
      ...(s?.grid || {}),
    },
  };
}
