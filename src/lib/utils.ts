import { TitleSchema } from "@/api/consumet-validations";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pickTitle(title: TitleSchema): string {
  return title.english || title.userPreferred || title.native || title.romaji;
}

export function encodeEpisodeId(id: string) {
  return id.replace(/\?/g, "%3F").replace(/=/g, "%3D");
}

export function decodeEpisodeId(id: string) {
  return id.replace(/%3F/g, "?").replace(/%3D/g, "=");
}

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}
