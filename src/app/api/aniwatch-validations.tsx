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

const aWEpisodeServersSchema = z.object({
  serverName: z.string(),
  serverId: z.number(),
});

export const aWEpisodeServersDataSchema = z.object({
  sub: z.array(aWEpisodeServersSchema),
  dub: z.array(aWEpisodeServersSchema),
  raw: z.array(aWEpisodeServersSchema),
  episodeId: z.string(),
  episodeNo: z.number().optional().nullable(),
});

const trackSchema = z.object({
  file: z.string(),
  label: z.string().optional().nullable(),
  kind: z.string(),
  default: z.boolean().optional().nullable(),
});

export const aWEpisodeSourceDataSchema = z.object({
  tracks: z.array(trackSchema).optional().nullable(),
  intro: z.object({ start: z.number(), end: z.number() }),
  outro: z.object({ start: z.number(), end: z.number() }),
  sources: z.array(z.object({ url: z.string(), type: z.string() })),
  anilistID: z.number(),
  malID: z.number(),
});

export type AWSearchAnimeDataSchema = z.infer<typeof aWSearchAnimeDataSchema>;
export type AWSearchDataSchema = z.infer<typeof aWSearchDataSchema>;
export type AWEpisodesDataSchema = z.infer<typeof aWEpisodesDataSchema>;
export type AWEpisodeServersSchema = z.infer<typeof aWEpisodeServersSchema>;
export type AWEpisodeServersDataSchema = z.infer<
  typeof aWEpisodeServersDataSchema
>;
export type AWEpisodeSourceDataSchema = z.infer<
  typeof aWEpisodeSourceDataSchema
>;
