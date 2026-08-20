export const CATEGORIES = [
  "Ders Kitabı",
  "Elektronik",
  "Mobilya",
  "Ev Eşyası",
  "Giyim",
  "Spor",
  "Diğer",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CONDITIONS = [
  "Yeni",
  "Az Kullanılmış",
  "Kullanılmış",
  "Yıpranmış",
] as const;

export type Condition = (typeof CONDITIONS)[number];
