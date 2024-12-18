import { AniwatchSearchParams } from "@/lib/types";

const aniwatchBase = `${process.env.ANIWATCH_API_BASE_URL}/api/v2/hianime`;

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
      url.searchParams.append(key, `${value}`);
    }
  });
  return url.toString();
}

export const aniwatchAPIQuery = {
  home: (params: {}) => createURL(aniwatchBase, `home`, params),

  search: (params: AniwatchSearchParams) =>
    createURL(aniwatchBase, `search`, params),

  info: (params: { id: string }) => createURL(aniwatchBase, `info`, params),

  suggest: (params: { q: string }) =>
    createURL(aniwatchBase, `search/suggest`, params),

  producer: ({ name, ...params }: { name: string; page?: number }) =>
    createURL(aniwatchBase, `producer/${name}`, params),

  genre: ({ name, ...params }: { name: string; page?: number }) =>
    createURL(aniwatchBase, `genre/${name}`, params),

  category: ({ category, ...params }: { category: string; page?: number }) =>
    createURL(aniwatchBase, `category/${category}`, params),

  schedule: (params: { date: string }) =>
    createURL(aniwatchBase, `schedule`, params),

  episodes: ({ animeId }: { animeId: string }) =>
    createURL(aniwatchBase, `anime/${animeId}/episodes`, {}),

  episodeServers: (params: { episodeId: string }) =>
    createURL(aniwatchBase, `servers`, params),

  episodeSource: (params: {
    animeEpisodeId: string;
    server?: string;
    category?: string;
  }) => createURL(aniwatchBase, `episode/sources`, params),
};
