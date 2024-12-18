import { CardDataProps } from "@/components/card-data/card-data";
import { SvgIcon } from "@/components/ui/svg-icons";
import { ChipProps } from "@nextui-org/react";
import {
  ASContentTypeArray,
  ASFormatArray,
  ASGenresArray,
  ASSeasonArray,
  ASSortArray,
  ASStatusArray,
  ASTypeArray,
  MovieGenresArray,
} from "./constants";
import { TrailerSchema } from "./consumet-validations";

type IconName = keyof typeof SvgIcon;

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: IconName;
  iconClass?: string;
  label?: string;
};

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

export type MainNavItem = NavItem & {};

export type SearchParams = { [key: string]: string | string[] | undefined };

export type DataObject =
  | { [key: string]: string | string[] | number | DataObject }
  | string[];

export type Tag = {
  name: string;
  value?: string | string[];
  variant?: ChipProps["variant"];
  color?: ChipProps["color"];
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isCentered?: boolean;
};

export type Status = "idle" | "loading" | "error";

export type SearchParamValue = string | string[] | undefined;

export type OAuthProvider = "google" | "github";

export type ContentType = "anime" | "k-drama" | "movie";

export type AnimeTitle = {
  native?: string | null | undefined;
  romaji?: string | null | undefined;
  english?: string | null | undefined;
  userPreferred?: string | null | undefined;
};

export type ServerOption = {
  type: string;
  list: ServerData[];
};

export type ServerData = {
  name: string;
  href: string;
};

// Start: Consumet API types

export type ASType = (typeof ASTypeArray)[number];
export type ASSeason = (typeof ASSeasonArray)[number];
export type ASFormat = (typeof ASFormatArray)[number];
export type ASSort = (typeof ASSortArray)[number];
export type ASGenres = (typeof ASGenresArray)[number];
export type ASStatus = (typeof ASStatusArray)[number];
export type ASContentType = (typeof ASContentTypeArray)[number];
export type MovieGenres = (typeof MovieGenresArray)[number];

export type AnimeProviders = "provider_1" | "provider_2";
export type AnimeProviderAPI = "aniwatch" | "gogoanime";

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

// Start: UI prop types

export type CardInfo = {
  id: string;
  name: string;
  image: string;
  cover?: string;
  rank?: number;
  trailer?: TrailerSchema;
  otherInfo: DataObject | null | undefined;
};

export type CardCategory = {
  name: string;
  list: CardDataProps[];
};

export type Episode = {
  title: string | null;
  episodeId: string;
  number: number;
  image?: string | null;
  isFiller?: boolean | null;
};

export type EpisodeList = {
  list: Episode[];
  totalEpisodes: number;
};

export type OtherInfo = { key: string; value: string | string[] }[];

export type Info = {
  id?: string | null;
  infoId: string;
  name: string;
  description: string | null;
  poster: string;
  genres: string[];
  cover: string | null;
  synonyms: string | null;
  type: string | null;
  sub?: number | null;
  dub?: number | null;
  characters?: { name: string; image: string }[];
  otherInfo: OtherInfo;
};

export type EpisodeStream = {
  sources: Source[];
  tracks: Track[];
  intro?: TimeLine;
  outro?: TimeLine;
  download?: string;
};

export type Track = {
  file: string;
  kind: string;
  default?: boolean | null | undefined;
  label?: string | null | undefined;
};
export type TimeLine = {
  start: number;
  end: number;
};

export type Source = {
  url: string;
  type: string;
  quality?: string | null;
};

// End: UI prop types

// Start: Video Stream types

export type VSInfo = {
  id: string;
  title: string;
  image: string;
  cover?: string;
};

export type VSEpisode = {
  id: string;
  number: number;
  title: string;
  image: string | null;
};

export type VSProvider = {
  name: AnimeProviders;
  episodeId: string;
};

// End: Video Stream types

// Start: Movie/Tv types

export type TrendingType = "movie" | "tv";

// End: Movie/Tv types
