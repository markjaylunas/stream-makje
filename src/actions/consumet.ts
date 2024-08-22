"use server";

import { ONE_WEEK } from "@/lib/constants";
import { consumetAPIQuery } from "@/lib/consumet-api";
import {
  animeDataSchema,
  animeSearchDataSchema,
  animeSortedDataSchema,
  dCDramaListDataSchema,
  dCInfoDataSchema,
  episodeDataSchema,
  episodeSourceDataSchema,
} from "@/lib/consumet-validations";
import {
  AnimeAdvancedSearchParams,
  AnimeProviderAPI,
  AnimeProviders,
} from "@/lib/types";
import { decodeKdramaId } from "@/lib/utils";

export async function fetchPopularAnimeData({
  page = 1,
  perPage = 20,
}: {
  page?: number;
  perPage?: number;
}) {
  try {
    const response = await fetch(
      consumetAPIQuery.meta.anilist.popular({ page, perPage }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();
    const parsed = animeSortedDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchTrendingAnimeData({
  page = 1,
  perPage = 20,
}: {
  page?: number;
  perPage?: number;
}) {
  try {
    const response = await fetch(
      consumetAPIQuery.meta.anilist.trending({ page, perPage }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();
    const parsed = animeSortedDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAnimeData({ animeId }: { animeId: string }) {
  try {
    const response = await fetch(
      consumetAPIQuery.meta.anilist.data({ id: animeId }),
      { next: { revalidate: ONE_WEEK } }
    );

    const data = await response.json();

    const parsed = animeDataSchema.safeParse(data);

    if (!parsed.success) {
      return fetchAnimeInfo({ animeId });
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAnimeInfo({ animeId }: { animeId: string }) {
  try {
    const response = await fetch(
      consumetAPIQuery.meta.anilist.info({ id: animeId }),
      { next: { revalidate: ONE_WEEK } }
    );

    const data = await response.json();

    const parsed = animeDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchEpisodeData({
  animeId,
  provider,
}: {
  animeId: string;
  provider?: AnimeProviderAPI;
}) {
  try {
    const response = await fetch(
      consumetAPIQuery.meta.anilist.episodes({
        id: animeId,
        provider,
      }),
      { cache: "no-store" }
    );

    let data = await response.json();

    // fetch info to get episode list if empty
    if (data.length <= 0) {
      const response = await fetch(
        consumetAPIQuery.meta.anilist.info({
          id: animeId,
        }),
        { cache: "no-store" }
      );

      const rawData = await response.json();
      data = rawData.episodes;
    }

    const parsed = episodeDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchRecentEpisodesAnimeData({
  page,
  perPage,
  provider,
}: {
  page?: number;
  perPage?: number;
  provider?: AnimeProviders;
}) {
  try {
    const response = await fetch(
      consumetAPIQuery.meta.anilist.recentEpisodes({ page, perPage, provider }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = animeSortedDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAiringScheduleAnimeData({
  page = 1,
  perPage = 20,
}: {
  page?: number;
  perPage?: number;
}) {
  try {
    const response = await fetch(
      consumetAPIQuery.meta.anilist.airingSchedule({ page, perPage }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = animeSortedDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchAnime(params: AnimeAdvancedSearchParams) {
  try {
    const response = await fetch(consumetAPIQuery.meta.anilist.search(params));

    const data = await response.json();

    const parsed = animeSearchDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }
    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAnimeEpisodeSource({
  episodeId,
}: {
  episodeId: string;
}) {
  try {
    const response = await fetch(
      consumetAPIQuery.meta.anilist.watch({ episodeId, provider: "gogoanime" }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = episodeSourceDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchPopularKdramaData() {
  try {
    const response = await fetch(consumetAPIQuery.movies.dramacool.popular(), {
      next: { revalidate: 3600 },
    });

    const data = await response.json();
    const parsed = dCDramaListDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchKdramaInfo({ kdramaId }: { kdramaId: string }) {
  try {
    const response = await fetch(
      consumetAPIQuery.movies.dramacool.info({ id: decodeKdramaId(kdramaId) }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = dCInfoDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
