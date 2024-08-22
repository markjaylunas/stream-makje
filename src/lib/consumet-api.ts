import {
  AnimeAdvancedSearchParams,
  AnimeProviderAPI,
  AnimeProviders,
} from "@/lib/types";

const anilistBase = `${process.env.CONSUMET_API_BASE_URL}/meta/anilist`;
const dramacoolBase = `${process.env.CONSUMET_API_BASE_URL}/movies/dramacool`;

function createURL(
  base: string,
  path: string,
  params: Record<string, string | number | string[] | boolean | undefined>
) {
  const url = new URL(`${base}/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }
    if (key === "perPage" && Number(value) > 40) {
      value = 40;
    }
    if (typeof value === "boolean") {
      value = value.toString();
    }
    if (Array.isArray(value)) {
      const formattedValue = `[${value.map((v) => `"${value}"`).join(",")}]`;
      url.searchParams.append(key, formattedValue);
    } else {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}

export const animeAPIQuery = {
  meta: {
    anilist: {
      search: (params: AnimeAdvancedSearchParams) =>
        createURL(anilistBase, `advanced-search`, params),

      data: ({ id }: { id: string }) =>
        createURL(anilistBase, `data/${id}`, {}),

      info: ({ id }: { id: string }) =>
        createURL(anilistBase, `info/${id}`, {}),

      episodes: ({
        id,
        ...params
      }: {
        id: string;
        provider?: AnimeProviderAPI;
        fetchFiller?: string | boolean;
        dub?: string | boolean;
        locale?: string;
      }) => createURL(anilistBase, `episodes/${id}`, params),

      watch: ({
        episodeId,
        ...params
      }: {
        episodeId: string;
        provider: AnimeProviderAPI;
      }) => createURL(anilistBase, `watch/${episodeId}`, params),

      trending: (params: { page?: number; perPage?: number }) =>
        createURL(anilistBase, `trending`, params),

      popular: (params: { page?: number; perPage?: number }) =>
        createURL(anilistBase, `popular`, params),

      airingSchedule: (params: { page?: number; perPage?: number }) =>
        createURL(anilistBase, `airing-schedule`, params),

      recentEpisodes: (params: {
        page?: number;
        perPage?: number;
        provider?: AnimeProviders;
      }) => createURL(anilistBase, `recent-episodes`, params),

      character: ({ id, ...params }: { id: string }) =>
        createURL(anilistBase, `character/${id}`, params),

      genre: (params: { genres: string[]; page?: number; perPage?: number }) =>
        createURL(anilistBase, `genre`, params),
    },
  },

  movies: {
    dramacool: {
      search: ({ query }: { query: string }) =>
        createURL(dramacoolBase, `${query}`, {}),

      info: (params: { id: string }) =>
        createURL(dramacoolBase, `info`, params),

      watch: (params: { episodeId: string }) =>
        createURL(dramacoolBase, `watch`, params),

      popular: () => createURL(dramacoolBase, `popular`, {}),
    },
  },
};
