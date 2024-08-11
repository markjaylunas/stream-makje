import z from "zod";

const stringOptional = z.string().nullable().optional();
const numberOptional = z.number().nullable().optional();

export const aWSortedAnimeDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  jname: z.string(),
  poster: z.string(),
  episodes: z.object({
    sub: numberOptional,
    dub: numberOptional,
  }),
  type: z.string(),
});

export const aWSearchAnimeDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  jname: z.string(),
  poster: z.string(),
  duration: stringOptional,
  type: stringOptional,
  rating: stringOptional,
  episodes: z
    .object({ sub: numberOptional, dub: numberOptional })
    .nullable()
    .optional(),
});
export const aWSearchDataSchema = z.object({
  animes: z.array(aWSearchAnimeDataSchema).optional(),
  mostPopularAnimes: z.array(aWSortedAnimeDataSchema).optional(),
  currentPage: z.number().optional(),
  hasNextPage: z.boolean().optional(),
  totalPages: z.number().optional(),
  searchQuery: z.string().optional(),
  searchFilters: z.any().optional(),
});

export const aWEpisodesDataSchema = z.object({
  totalEpisodes: z.number(),
  episodes: z.array(
    z.object({
      title: z.string(),
      episodeId: z.string(),
      number: z.number(),
      isFiller: z.boolean(),
    })
  ),
});

export type AWSearchAnimeDataSchema = z.infer<typeof aWSearchAnimeDataSchema>;
export type AWSearchDataSchema = z.infer<typeof aWSearchDataSchema>;
export type AWEpisodesDataSchema = z.infer<typeof aWEpisodesDataSchema>;
