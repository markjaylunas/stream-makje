import { TitleSchema } from "@/api/consumet-validations";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DataObject, Tag } from "./types";

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

export function searchKeysInObject(
  search: Tag[] | null | undefined,
  data: DataObject
): Tag[] {
  if (search == null || data == null) {
    return [];
  }

  // Create a map of names to their corresponding values from the `data`
  const valuesMap: { [key: string]: string } = {};

  function searchRecursive(obj: DataObject) {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "number") {
        valuesMap[key] = `${value}`;
      } else if (typeof value === "string") {
        valuesMap[key] = value;
      } else if (Array.isArray(value)) {
        // If value is an array, you might need to handle this case if necessary
        continue;
      } else if (typeof value === "object" && value !== null) {
        searchRecursive(value as DataObject);
      }
    }
  }

  searchRecursive(data);

  // Map the search tags to include the `value` key
  const results: Tag[] = search.map((tag) => ({
    ...tag,
    value: valuesMap[tag.name] || "", // Add `value` key from valuesMap or empty if not found
  }));

  return results;
}
export function createURL({ path, params }: { path: string; params: object }) {
  const paramString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `${path}?${paramString}`;
}
