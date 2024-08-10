import { Icons } from "../components/ui/icons";

import {
  ASFormatArray,
  ASGenresArray,
  ASSeasonArray,
  ASSortArray,
  ASStatusArray,
  ASTypeArray,
} from "./constants";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
};

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

export type MainNavItem = NavItem & {};

// Start: Consumet API types

export type ASType = (typeof ASTypeArray)[number];
export type ASSeason = (typeof ASSeasonArray)[number];
export type ASFormat = (typeof ASFormatArray)[number];
export type ASSort = (typeof ASSortArray)[number];
export type ASGenres = (typeof ASGenresArray)[number];
export type ASStatus = (typeof ASStatusArray)[number];

export type AnimeProviders = "gogoanime" | "zoro";

export type AnimeAdvancedSearchParams = {
  query?: string;
  page?: number;
  perPage?: number;
  type?: ASType;
  genres?: ASGenres[];
  id?: string;
  format?: ASFormat;
  sort?: ASSort[];
  status?: ASStatus;
  year?: number;
  season?: ASSeason;
};

// End: Consumet API types

// Start: Aniwatch API types

export type AniwatchSearchParams = {
  q: string;
  page?: number;
  genres?: string;
  type?: string;
  season?: string;
  language?: string;
  status?: string;
  rated?: string;
  start_date?: string;
  end_date?: string;
  score?: string;
};

// End: Consumet API types
