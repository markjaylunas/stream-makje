import { TitleSchema } from "@/lib/consumet-validations";
import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { sourcePriority } from "./constants";
import {
  AnimeTitle,
  DataObject,
  EpisodeStream,
  SearchParamValue,
  Tag,
} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pickTitle(title: TitleSchema): string {
  return (
    title.english || title.romaji || title.native || title.userPreferred || ""
  );
}
export function pickMappingTitle(title: TitleSchema): string {
  return (
    title.userPreferred || title.romaji || title.english || title.native || ""
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

export function sanitizeTitle(title: string): string {
  // Convert the title to lowercase
  let lowercased = title.toLowerCase();

  // Remove non-alphanumeric characters and non-spaces
  lowercased = lowercased.replace(/[^a-z0-9\s]/g, "");

  // Remove ordinal suffixes (st, nd, rd, th) from numbers
  lowercased = lowercased.replace(/(\d+)(st|nd|rd|th)\b/g, "$1");

  // List of words to remove from the title
  const wordsToRemove = ["season", "cour", "part"];

  // Split the lowercased title into words
  const words = lowercased.split(/\s+/);

  // Filter out unwanted words
  const sanitizedWords = words.filter((word) => !wordsToRemove.includes(word));

  // Join the sanitized words back into a string
  return sanitizedWords.join(" ");
}

export function jaroWinkler(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;

  if (m === 0 && n === 0) return 1.0;
  if (m === 0 || n === 0) return 0.0;

  const matchDistance = Math.floor(Math.max(m, n) / 2) - 1;
  const s1Matches = new Array(m).fill(false);
  const s2Matches = new Array(n).fill(false);

  let matches = 0;
  let transpositions = 0;
  for (let i = 0; i < m; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(n - 1, i + matchDistance);

    for (let j = start; j <= end; j++) {
      if (s2Matches[j]) continue;
      if (s1[i] !== s2[j]) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0.0;

  let k = 0;
  for (let i = 0; i < m; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1[i] !== s2[k]) transpositions++;
    k++;
  }

  transpositions /= 2;

  const jaro =
    (matches / m + matches / n + (matches - transpositions) / matches) / 3;

  let prefix = 0;
  for (let i = 0; i < Math.min(4, m, n); i++) {
    if (s1[i] === s2[i]) {
      prefix++;
    } else {
      break;
    }
  }

  const p = 0.1;
  return jaro + prefix * p * (1 - jaro);
}

export function findBestMatch(
  mainString: string,
  targets: { id: string; name: string }[]
) {
  if (targets.length === 0) return null;

  let bestMatch = targets[0];
  let highestScore = jaroWinkler(mainString, bestMatch.name);

  for (let i = 1; i < targets.length; i++) {
    const currentScore = jaroWinkler(mainString, targets[i].name);
    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestMatch = targets[i];
    }
  }

  return bestMatch;
}

export function findOriginalTitle(
  title: AnimeTitle,
  titles: { id: string; name: string }[]
) {
  const romaji = sanitizeTitle(title.romaji || "");
  const english = sanitizeTitle(title.english || "");
  const native = sanitizeTitle(title.native || "");

  const romajiBestMatch = findBestMatch(romaji, titles);
  const englishBestMatch = findBestMatch(english, titles);
  const nativeBestMatch = findBestMatch(native, titles);

  const romajiScore = romajiBestMatch
    ? jaroWinkler(romaji, romajiBestMatch.name)
    : 0;
  const englishScore = englishBestMatch
    ? jaroWinkler(english, englishBestMatch.name)
    : 0;
  const nativeScore = nativeBestMatch
    ? jaroWinkler(native, nativeBestMatch.name)
    : 0;

  if (englishScore >= romajiScore && englishScore >= nativeScore) {
    return englishBestMatch;
  } else if (romajiScore >= englishScore && romajiScore >= nativeScore) {
    return romajiBestMatch;
  } else {
    return nativeBestMatch;
  }
}

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
