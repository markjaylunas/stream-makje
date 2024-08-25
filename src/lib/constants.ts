import { AnimeProviders } from "./types";

export const sourcePriority = [
  "auto",
  "1080p",
  "720p",
  "480p",
  "360p",
  "default",
  "backup",
];

export const genreList = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

export const DEFAULT_PAGE_LIMIT = 10;

export const ASTypeArray = ["ANIME", "MANGA"] as const;

export const ASSeasonArray = ["WINTER", "SPRING", "SUMMER", "FALL"] as const;

export const ASFormatArray = [
  "TV",
  "TV_SHORT",
  "MOVIE",
  "SPECIAL",
  "OVA",
  "ONA",
  "MANGA",
  "MUSIC",
] as const;

export const ASSortArray = [
  "POPULARITY_DESC",
  "POPULARITY",
  "TRENDING_DESC",
  "TRENDING",
  "UPDATED_AT_DESC",
  "UPDATED_AT",
  "START_DATE_DESC",
  "START_DATE",
  "END_DATE_DESC",
  "END_DATE",
  "FAVOURITES_DESC",
  "FAVOURITES",
  "SCORE_DESC",
  "SCORE",
  "TITLE_ROMAJI_DESC",
  "TITLE_ROMAJI",
  "TITLE_ENGLISH_DESC",
  "TITLE_ENGLISH",
  "TITLE_NATIVE_DESC",
  "TITLE_NATIVE",
  "EPISODES_DESC",
  "EPISODES",
  "ID",
  "ID_DESC",
] as const;

export const MovieGenresArray = [
  "action",
  "action-adventure",
  "adventure",
  "animation",
  "biography",
  "comedy",
  "crime",
  "documentary",
  "drama",
  "family",
  "fantasy",
  "history",
  "horror",
  "kids",
  "music",
  "mystery",
  "news",
  "reality",
  "romance",
  "sci-fi-fantasy",
  "science-fiction",
  "soap",
  "talk",
  "thriller",
  "tv-movie",
  "war",
  "war-politics",
  "western",
];
export const ASGenresArray = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
] as const;

export const ASStatusArray = [
  "RELEASING",
  "NOT_YET_RELEASED",
  "FINISHED",
  "CANCELLED",
  "HIATUS",
] as const;

export const ASContentTypeArray = ["ALL", "ANIME", "K-DRAMA", "MOVIE"] as const;

export const ONE_WEEK = 604800;

export const ANIME_PROVIDER = {
  P1: "provider_1" as AnimeProviders,
  P2: "provider_2" as AnimeProviders,
};

export const ANIME_PROVIDER_LIST: AnimeProviders[] = [
  "provider_1",
  "provider_2",
];

export const COUNTRY_LIST = [
  { name: "Argentina", value: "AR" },
  { name: "Australia", value: "AU" },
  { name: "Austria", value: "AT" },
  { name: "Belgium", value: "BE" },
  { name: "Brazil", value: "BR" },
  { name: "Canada", value: "CA" },
  { name: "China", value: "CN" },
  { name: "Czech Republic", value: "CZ" },
  { name: "Denmark", value: "DK" },
  { name: "Finland", value: "FI" },
  { name: "France", value: "FR" },
  { name: "Germany", value: "DE" },
  { name: "Hong Kong", value: "HK" },
  { name: "Hungary", value: "HU" },
  { name: "India", value: "IN" },
  { name: "Ireland", value: "IE" },
  { name: "Israel", value: "IL" },
  { name: "Italy", value: "IT" },
  { name: "Japan", value: "JP" },
  { name: "Luxembourg", value: "LU" },
  { name: "Mexico", value: "MX" },
  { name: "Netherlands", value: "NL" },
  { name: "New Zealand", value: "NZ" },
  { name: "Norway", value: "NO" },
  { name: "Poland", value: "PL" },
  { name: "Romania", value: "RO" },
  { name: "Russia", value: "RU" },
  { name: "South Africa", value: "ZA" },
  { name: "South Korea", value: "KR" },
  { name: "Spain", value: "ES" },
  { name: "Sweden", value: "SE" },
  { name: "Switzerland", value: "CH" },
  { name: "Taiwan", value: "TW" },
  { name: "Thailand", value: "TH" },
  { name: "United Kingdom", value: "GB" },
  { name: "United States of America", value: "US" },
  { name: "Philippines", value: "PH" },
];

export const GENRE_BUTTON_LIST = genreList.map((genre) => ({
  name: genre,
  value: genre,
}));
