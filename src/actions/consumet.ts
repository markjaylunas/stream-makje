"use server";

import { animeAPIQuery } from "@/api/consumet-api";
import {
  animeDataSchema,
  animeSortedDataSchema,
  episodeDataSchema,
} from "@/api/consumet-validations";
import { ONE_WEEK } from "@/lib/constants";
import { AnimeProviderAPI, AnimeProviders } from "@/lib/types";

export async function fetchPopularAnimeData({
  page = 1,
  perPage = 20,
}: {
  page?: number;
  perPage?: number;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.popular({ page, perPage }),
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
      animeAPIQuery.meta.anilist.trending({ page, perPage }),
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
      animeAPIQuery.meta.anilist.data({ id: animeId }),
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
      animeAPIQuery.meta.anilist.episodes({
        id: animeId,
        provider,
      }),
      { cache: "no-store" }
    );

    let data = await response.json();

    // fetch info to get episode list if empty
    if (data.length <= 0) {
      const response = await fetch(
        animeAPIQuery.meta.anilist.info({
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
      animeAPIQuery.meta.anilist.recentEpisodes({ page, perPage, provider }),
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
      animeAPIQuery.meta.anilist.airingSchedule({ page, perPage }),
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
