import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Pricing data — single source of truth */
export const PRICING = {
  "valdoise-cdg": 60,
  "valdoise-beauvais": 90,
  "parisnord-cdg": 70,
  "parisnord-beauvais": 100,
  "parissud-cdg": 80,
  "parissud-beauvais": 110,
} as const;

export type Zone = "valdoise" | "parisnord" | "parissud";
export type Airport = "cdg" | "beauvais";

export const ZONE_NAMES: Record<Zone, string> = {
  valdoise: "Val d'Oise (95)",
  parisnord: "Paris Nord",
  parissud: "Paris Sud",
};

const PARIS_NORD_CP = ["75009", "75010", "75011", "75012", "75017", "75018", "75019"];
const PARIS_SUD_CP = ["75001", "75002", "75003", "75004", "75005", "75006", "75007", "75008", "75013", "75014", "75015", "75016", "75020"];

export function detectZone(address: string): Zone | null {
  const match = address.match(/\b(75\d{3}|9[2345]\d{3}|60\d{3}|77\d{3}|78\d{3}|91\d{3})\b/);
  if (!match || !match[1]) return null;
  const code = match[1];
  const dept = code.substring(0, 2);

  if (dept === "95") return "valdoise";
  if (PARIS_NORD_CP.includes(code)) return "parisnord";
  if (PARIS_SUD_CP.includes(code)) return "parissud";
  if (dept === "93") return "parisnord";
  if (dept === "94" || dept === "91") return "parissud";
  if (dept === "92") {
    const num = Number.parseInt(code, 10);
    return num <= 92400 ? "parissud" : "parisnord";
  }
  if (dept === "60") return "valdoise";
  if (dept === "77" || dept === "78") return "parissud";
  return null;
}

export function getPrice(zone: Zone | null, airport: Airport): number | null {
  if (!zone) return null;
  return PRICING[`${zone}-${airport}`] ?? null;
}

export const WHATSAPP_NUMBER = "33651161440";
export const PHONE_DISPLAY = "06 51 16 14 40";
export const PHONE_TEL = "+33651161440";
