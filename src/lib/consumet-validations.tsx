import z from "zod";

// Define reusable schemas
const titleSchema = z.object({
  romaji: z.string().nullable().optional(),
  english: z.string().nullable().optional(),
  native: z.string().nullable().optional(),
  userPreferred: z.string().nullable().optional(),
});

const imageSchema = z.object({
  image: z.string().nullable().optional(),
  imageHash: z.string(),
  cover: z.string().nullable().optional(),
  coverHash: z.string().nullable().optional(),
});

const nameSchema = z.object({
  first: z.string().optional().nullable(),
  last: z.string().nullable(),
  full: z.string(),
  native: z.string().nullable(),
  userPreferred: z.string().nullable().optional(),
});

const dateSchema = z.object({
  year: z.number().nullable(),
  month: z.number().nullable(),
  day: z.number().nullable(),
});

export const stringOrNumberSchema = z
  .union([z.string(), z.number(), z.undefined(), z.null()])
  .optional();

// Use the reusable schemas to define more complex schemas
const animeSchema = z.object({
  id: stringOrNumberSchema,
  malId: stringOrNumberSchema,
  title: titleSchema,
  status: z.string(),
  episodes: z.number().nullable().optional(),
  ...imageSchema.shape,
  rating: z.number().nullable().optional(),
  type: z.string().nullable().optional(),
});

const voiceActorSchema = z.object({
  id: z.number(),
  language: z.string(),
  name: nameSchema,
  ...imageSchema.shape,
});

const characterSchema = z.object({
  id: z.number(),
  role: z.string(),
  name: nameSchema,
  ...imageSchema.shape,
  voiceActors: z.array(voiceActorSchema),
});

// Define the main schema using the reusable schemas
export const animeDataSchema = z.object({
  id: stringOrNumberSchema,
  title: titleSchema,
  malId: stringOrNumberSchema,
  synonyms: z.array(z.string()),
  isLicensed: z.boolean(),
  isAdult: z.boolean(),
  countryOfOrigin: z.string(),
  ...imageSchema.shape,
  description: z.string().nullable().optional(),
  status: z.string(),
  releaseDate: z.number().nullable(),
  nextAiringEpisode: z
    .object({
      airingTime: z.number(),
      timeUntilAiring: z.number(),
      episode: z.number(),
    })
    .nullable()
    .optional(),
  totalEpisodes: z.number().nullable(),
  currentEpisode: z.number().nullable().optional(),
  rating: z.number().nullable().optional(),
  duration: z.number().nullable().optional(),
  genres: z.array(z.string()),
  studios: z.array(z.string()),
  season: z.string().nullable().optional(),
  popularity: z.number(),
  type: z.string().nullable(),
  startDate: dateSchema,
  endDate: dateSchema,
  recommendations: z.array(animeSchema),
  characters: z.array(characterSchema),
  color: z.string().optional().nullable(),
  relations: z.array(animeSchema),
  // episodes: z.array(
  //   z.object({
  //     id: z.string(),
  //     title: z.string(),
  //     description: z.string().optional().nullable(),
  //     number: z.number(),
  //     image: z.string(),
  //     imageHash: z.string(),
  //     airDate: z.string().optional().nullable(),
  //   })
  // ),
});

// Define the search schemas using the reusable schemas
export const animeSearchSchema = z.object({
  id: z.string(),
  malId: stringOrNumberSchema,
  title: titleSchema,
  status: z.string(),
  ...imageSchema.shape,
  popularity: z.number(),
  totalEpisodes: z.number().nullable(),
  currentEpisode: z.number().nullable(),
  countryOfOrigin: z.string(),
  description: z.string().optional().nullable(),
  genres: z.array(z.string()),
  rating: z.number().nullable().optional(),
  color: z.string().nullable().optional(),
  type: z.string().nullable(),
  releaseDate: z.number().nullable(),
});

export const animeSearchDataSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  totalPages: z.number(),
  totalResults: z.number(),
  results: z.array(animeSearchSchema),
});

export const episodeSchema = z.object({
  id: z.string(),
  title: z.string().nullable().optional(),
  image: z.string(),
  imageHash: z.string(),
  number: z.number(),
  createdAt: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
});

export const episodeDataSchema = z.array(episodeSchema);

export const episodeSourceSchema = z.object({
  url: z.string(),
  quality: z.string(),
  isM3U8: z.boolean(),
});

export const episodeSourceDataSchema = z.object({
  headers: z.object({ Referer: z.string() }).optional().nullable(),
  sources: z.array(episodeSourceSchema).optional().nullable(),
  download: z.string().optional().nullable(),
});

export const trailerSchema = z.object({
  id: z.string().optional(),
  site: z.string().optional(),
  thumbnail: z.string().optional(),
  thumbnailHash: z.string().optional(),
});

export const animeSortedSchema = z.object({
  id: z.string(),
  malId: stringOrNumberSchema,
  title: titleSchema,
  image: z.string(),
  imageHash: z.string().nullable().optional(),
  trailer: trailerSchema.nullable().optional(),
  description: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  cover: z.string().nullable().optional(),
  coverHash: z.string().nullable().optional(),
  rating: z.number().nullable().optional(),
  releaseDate: z.number().nullable().optional(),
  color: z.string().nullable().optional(),
  genres: z.array(z.string()).nullable().optional(),
  totalEpisodes: z.number().nullable().optional(),
  duration: z.number().nullable().optional(),
  type: z.string().nullable().optional(),
  episode: z.number().nullable().optional(),
  airingAt: z.number().nullable().optional(),
  country: z.string().nullable().optional(),
  episodeId: z.string().nullable().optional(),
  episodeTitle: z.string().nullable().optional(),
  episodeNumber: z.number().nullable().optional(),
  number: z.number().nullable().optional(),
});

export const animeSortedDataSchema = z.object({
  currentPage: stringOrNumberSchema,
  hasNextPage: z.boolean().nullable().optional(),
  results: z.array(animeSortedSchema),
});

export const relatedAnimeSchema = z.object({
  id: z.number(),
  malId: stringOrNumberSchema,
  role: z.string(),
  title: titleSchema,
  status: z.string(),
  episodes: z.number().nullable().optional(),
  image: z.string(),
  imageHash: z.string(),
  rating: z.number().nullable().optional(),
  releaseDate: z.number(),
  type: z.string(),
  color: z.string().nullable().optional(),
});

export const animeCharacterSchema = z.object({
  id: z.number(),
  name: z.object({
    first: z.string(),
    last: z.string(),
    full: z.string(),
    native: z.string(),
    userPreferred: z.string(),
    alternative: z.array(z.string()),
    alternativeSpoiler: z.array(z.string()),
  }),
  image: z.string(),
  imageHash: z.string(),
  description: z.string(),
  gender: z.string(),
  dateOfBirth: z.object({
    year: z.number().nullable().optional(),
    month: z.number().nullable().optional(),
    day: z.number().nullable().optional(),
  }),
  bloodType: z.string().nullable().optional(),
  age: z.string(),
  height: z.string(),
  relations: z.array(relatedAnimeSchema),
});

// type definitions
export type TitleSchema = z.infer<typeof titleSchema>;
export type ImageSchema = z.infer<typeof imageSchema>;
export type NameSchema = z.infer<typeof nameSchema>;
export type DateSchema = z.infer<typeof dateSchema>;
export type AnimeSchema = z.infer<typeof animeSchema>;
export type VoiceActorSchema = z.infer<typeof voiceActorSchema>;
export type CharacterSchema = z.infer<typeof characterSchema>;
export type AnimeDataSchema = z.infer<typeof animeDataSchema>;
export type AnimeSearchSchema = z.infer<typeof animeSearchSchema>;
export type AnimeSearchDataSchema = z.infer<typeof animeSearchDataSchema>;
export type EpisodeSchema = z.infer<typeof episodeSchema>;
export type EpisodeDataSchema = z.infer<typeof episodeDataSchema>;
export type EpisodeSourceSchema = z.infer<typeof episodeSourceSchema>;
export type EpisodeSourceDataSchema = z.infer<typeof episodeSourceDataSchema>;
export type TrailerSchema = z.infer<typeof trailerSchema>;
export type AnimeSortedSchema = z.infer<typeof animeSortedSchema>;
export type AnimeSortedDataSchema = z.infer<typeof animeSortedDataSchema>;
export type RelatedAnimeSchema = z.infer<typeof relatedAnimeSchema>;
export type AnimeCharacterSchema = z.infer<typeof animeCharacterSchema>;

// dramacool

export const dCDramaDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  image: z.string(),
});

export const dCDramaListDataSchema = z.object({
  currentPage: stringOrNumberSchema,
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  results: z.array(dCDramaDataSchema),
});

export const dCEpisodeDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  episode: z.number(),
  subType: z.string(),
  releaseDate: z.string(),
  url: z.string(),
});

export const dCCharacterDataSchema = z.object({
  url: z.string(),
  image: z.string(),
  name: z.string(),
});

export const dCInfoDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string().optional().nullable(),
  status: z.string(),
  genres: z.array(z.string()),
  otherNames: z.array(z.string()),
  image: z.string(),
  description: z.string(),
  releaseDate: z.string(),
  contentRating: z.string(),
  airsOn: z.string(),
  director: z.string(),
  originalNetwork: z.string(),
  trailer: z.object({ id: z.string().optional(), url: z.string().optional() }),
  characters: z.array(dCCharacterDataSchema),
  episodes: z.array(dCEpisodeDataSchema),
});

export const dCSourceDataSchema = z.object({
  url: z.string(),
  isM3U8: z.boolean(),
});

export const dCWatchDataSchema = z.object({
  sources: z.array(dCSourceDataSchema),
  download: z.string(),
});

export type DCDramaDataSchema = z.infer<typeof dCDramaDataSchema>;
export type DCDramaListDataSchema = z.infer<typeof dCDramaListDataSchema>;
export type DCEpisodeDataSchema = z.infer<typeof dCEpisodeDataSchema>;
export type DCCharacterDataSchema = z.infer<typeof dCCharacterDataSchema>;
export type DCInfoDataSchema = z.infer<typeof dCInfoDataSchema>;
export type DCSourceDataSchema = z.infer<typeof dCSourceDataSchema>;
export type DCWatchDataSchema = z.infer<typeof dCWatchDataSchema>;

// flixhq

export const fHQDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  type: z.string(),

  duration: z.string().optional(),
  releaseDate: z.string().optional(),
  season: z.string().optional(),
  seasons: z.number().optional().nullable(),
  latestEpisode: z.string().optional(),
  url: z.string().optional(),
});

export const fHQListDataSchema = z.array(fHQDataSchema);

// by country, genre, search
export const fHQSearchDataSchema = z.object({
  currentPage: stringOrNumberSchema,
  hasNextPage: z.boolean(),
  results: z.array(fHQDataSchema),
});

export const fHQEpisodeDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
});

export const fHQInfoDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  cover: z.string(),
  image: z.string(),
  description: z.string(),
  type: z.string(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  casts: z.array(z.string()),
  tags: z.array(z.string()),
  production: z.string(),
  country: z.string(),
  duration: z.string(),
  rating: z.number().nullable().optional(),
  recommendations: z.array(fHQDataSchema),
  episodes: z.array(fHQEpisodeDataSchema),
});

export const fHQServerDataSchema = z.array(
  z.object({ name: z.string(), url: z.string() })
);

export const fHQSourceDataSchema = z.object({
  headers: z.object({ Referer: z.string() }),
  sources: z.array(
    z.object({ url: z.string(), quality: z.string(), isM3U8: z.boolean() })
  ),
  subtitles: z.array(z.object({ url: z.string(), lang: z.string() })),
});

export type FHQDataSchema = z.infer<typeof fHQDataSchema>;
export type FHQListDataSchema = z.infer<typeof fHQListDataSchema>;
export type FHQSearchDataSchema = z.infer<typeof fHQSearchDataSchema>;
export type FHQEpisodeDataSchema = z.infer<typeof fHQEpisodeDataSchema>;
export type FHQInfoDataSchema = z.infer<typeof fHQInfoDataSchema>;
export type FHQServerDataSchema = z.infer<typeof fHQServerDataSchema>;
export type FHQSourceDataSchema = z.infer<typeof fHQSourceDataSchema>;
