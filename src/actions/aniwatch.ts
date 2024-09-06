"use server";

import { aniwatchAPIQuery } from "@/lib/aniwatch-api";
import {
  aWEpisodesDataSchema,
  aWEpisodeServersDataSchema,
  aWEpisodeSourceDataSchema,
  aWSearchDataSchema,
} from "@/lib/aniwatch-validations";
import { consumetAnimeInfoEpisodesObjectMapper } from "@/lib/object-mapper";
import { AnimeProviders, AnimeTitle, EpisodeList } from "@/lib/types";
import {
  findOriginalTitle,
  pickMappingTitle,
  pickTitle,
  sanitizeTitle,
} from "@/lib/utils";
import { fetchEpisodeData } from "./consumet";

export async function fetchAWEpisodeData({ animeId }: { animeId: string }) {
  try {
    const response = await fetch(aniwatchAPIQuery.episodes({ animeId }), {
      cache: "no-store",
    });

    const data = await response.json();
    const parsed = aWEpisodesDataSchema.safeParse(data);

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

export async function fetchEpisodeByProviderData({
  animeId,
  provider,
  title,
}: {
  animeId: string;
  provider: AnimeProviders;
  title: AnimeTitle;
}) {
  const empty = {
    list: [],
    totalEpisodes: 0,
  };
  try {
    if (provider === "provider_1") {
      const response = await fetch(
        aniwatchAPIQuery.search({
          q: encodeURIComponent(sanitizeTitle(pickMappingTitle(title))),
        }),
        {
          next: { revalidate: 3600 },
        }
      );
      const data = await response.json();
      const parsed = aWSearchDataSchema.safeParse(data);
      if (!parsed.success) {
        console.error(parsed.error.toString());
        return empty;
      }

      if (!parsed.data.animes) return empty;

      const animeIDAndTitleList = parsed.data.animes.map((anime) => ({
        id: anime.id,
        name: sanitizeTitle(anime.jname) || sanitizeTitle(anime.name),
      }));

      const animeMatched = findOriginalTitle(title, animeIDAndTitleList);

      if (!animeMatched)
        return {
          list: [],
          totalEpisodes: 0,
        };

      const episodeData = await fetchAWEpisodeData({
        animeId: animeMatched.id,
      });

      if (!episodeData)
        return {
          list: [],
          totalEpisodes: 0,
        };

      const returnData: EpisodeList = {
        list: episodeData.episodes.map((episode) => ({
          ...episode,
          episodeId: encodeURIComponent(episode.episodeId),
        })),
        totalEpisodes: episodeData ? episodeData.totalEpisodes : 0,
      };

      return returnData;
    } else {
      const episodeData = await fetchEpisodeData({
        animeId,
        provider: "gogoanime",
      });
      const mappedEpisodeList = consumetAnimeInfoEpisodesObjectMapper(
        episodeData || []
      );

      const returnData: EpisodeList = {
        list: mappedEpisodeList,
        totalEpisodes: episodeData ? episodeData.length || 0 : 0,
      };
      return returnData;
    }
  } catch (error) {
    console.log(error);
    return empty;
  }
}

export async function fetchAWEpisodeServersData({
  episodeId,
}: {
  episodeId: string;
}) {
  try {
    const response = await fetch(
      aniwatchAPIQuery.episodeServers({ episodeId }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();
    const parsed = aWEpisodeServersDataSchema.safeParse(data);

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

export async function fetchAWEpisodeSourceData({
  episodeId,
  category,
  server,
}: {
  episodeId: string;
  category?: string;
  server?: string;
}) {
  try {
    const response = await fetch(
      aniwatchAPIQuery.episodeSource({ id: episodeId, category, server }),
      {
        next: { revalidate: 3600 },
      }
    );
    const data = await response.json();
    const parsed = aWEpisodeSourceDataSchema.safeParse(data);

    if (!parsed.success) {
      // console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
