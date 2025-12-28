// Define your icon names that correspond to SVG files in public/icons/
// Example: if you have public/icons/home.svg, add "home" to this array
export const iconNames = [
  "home",
  "user",
  "settings",
  "search",
  "menu",
  "close",
  "logo",
  "arrow-right",
  "arrow-left",
  "edit",
  "delete",
  "add",
  "check",
  "info",
  "warning",
  "error",
  "by-content-sign",
  "Sa-Content-Sign",
  "Zero-Content-Sign",
  "Creative-Commons",
] as const;

export type IconName = (typeof iconNames)[number];
