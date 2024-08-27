import { TitleSchema } from "@/lib/consumet-validations";
import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { sourcePriority } from "./constants";
import { DataObject, EpisodeStream, SearchParamValue, Tag } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pickTitle(title: TitleSchema): string {
  return (
    title.english || title.userPreferred || title.native || title.romaji || ""
  );
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
    value: valuesMap[tag.name],
  }));

  return results;
}

export function createURL({
  path,
  params,
}: {
  path: string;
  params?: Record<string, any>;
}) {
  const paramString = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";
  return `${path}${paramString}`;
}

// Helper function to calculate Jaro-Winkler distance
export const jaroWinklerDistance = (s1: string, s2: string) => {
  if (s1 === s2) return 1;

  const maxLength = Math.max(s1.length, s2.length);
  const matchWindow = Math.floor(maxLength / 2) - 1;

  const matches = []; // Array to store matching characters
  const s1Matches = new Array(s1.length).fill(false); // Flags to track matching characters in s1
  const s2Matches = new Array(s2.length).fill(false); // Flags to track matching characters in s2

  // Find matching characters
  for (let i = 0; i < s1.length; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, s2.length);

    for (let j = start; j < end; j++) {
      if (!s2Matches[j] && s1[i] === s2[j]) {
        s1Matches[i] = true;
        s2Matches[j] = true;
        matches.push(s1[i]);
        break;
      }
    }
  }

  if (matches.length === 0) return 0;

  // Calculate transpositions
  let t = 0;
  let k = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1Matches[i]) {
      while (!s2Matches[k]) k++;
      if (s1[i] !== s2[k]) t++;
      k++;
    }
  }

  // Calculate Jaro similarity
  const m = matches.length;
  const jaroSimilarity = (m / s1.length + m / s2.length + (m - t) / m) / 3;

  // Calculate prefix scale
  let l = 0;
  while (s1[l] === s2[l] && l < 4) l++;

  const jaroWinklerDistance = jaroSimilarity + l * 0.1 * (1 - jaroSimilarity);

  return jaroWinklerDistance;
};

export const parseSearchParamInt = ({
  value,
  defaultValue,
}: {
  value: SearchParamValue;
  defaultValue: number;
}) =>
  typeof value === "string" ? parseInt(value) || defaultValue : defaultValue;

export const searchParamString = ({
  value,
  defaultValue,
}: {
  value: SearchParamValue;
  defaultValue: string | undefined;
}) => (typeof value === "string" ? value || defaultValue : defaultValue);

export function formatTimestamp(timestamp: number): string {
  const date = moment.unix(timestamp);
  return date.format("MM-DD HH:mm").toString();
}

export const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

type AnimeSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";
type SeasonPosition = "current" | "last" | "next";

const SEASONS: AnimeSeason[] = ["WINTER", "SPRING", "SUMMER", "FALL"];

export function getSeasonAndYear(position: SeasonPosition): {
  season: AnimeSeason;
  year: number;
} {
  const now = new Date();
  const month = now.getMonth();
  const currentSeasonIndex = Math.floor(month / 3) % 4;
  let year = now.getFullYear();

  let seasonIndex = currentSeasonIndex;
  if (position === "last") {
    seasonIndex = (currentSeasonIndex + 3) % 4;
    if (seasonIndex === 3) year -= 1;
  } else if (position === "next") {
    seasonIndex = (currentSeasonIndex + 1) % 4;
    if (seasonIndex === 0) year += 1;
  }

  return { season: SEASONS[seasonIndex], year };
}

export const sortSourcePriority = (sourceList: EpisodeStream["sources"]) =>
  sourceList.sort((a, b) => {
    const qualityA = a.quality ? sourcePriority.indexOf(a.quality) : -1;
    const qualityB = b.quality ? sourcePriority.indexOf(b.quality) : -1;

    return qualityA - qualityB;
  });

export const getRandomSpotlightIndex = (arrayLength: number): number => {
  return Math.floor(Math.random() * arrayLength);
};
