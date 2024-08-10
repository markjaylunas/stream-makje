import { TitleSchema } from "@/api/consumet-validations";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pickTitle(title: TitleSchema): string {
  return title.english || title.userPreferred || title.native || title.romaji;
}
