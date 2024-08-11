"use server";

import { aniwatchAPIQuery } from "@/api/aniwatch-api";
import {
  aWEpisodesDataSchema,
  aWSearchDataSchema,
} from "@/api/aniwatch-validations";
import {
  consumetAnimeInfoEpisodesObjectMapper,
  mapAnimeByName,
} from "@/lib/object-mapper";
import { AnimeProviders, EpisodeList } from "@/lib/types";
import { encodeEpisodeId } from "@/lib/utils";
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
  title: string;
}) {
  const empty = {
    list: [],
    totalEpisodes: 0,
  };
  try {
    if (provider === "aniwatch") {
      const response = await fetch(
        aniwatchAPIQuery.search({ q: encodeURIComponent(title) }),
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
        name: anime.name,
      }));

      const animeMatched = await mapAnimeByName({
        list: animeIDAndTitleList,
        title,
      });
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
          episodeId: encodeEpisodeId(episode.episodeId),
        })),
        totalEpisodes: episodeData ? episodeData.totalEpisodes : 0,
      };

      return returnData;
    } else {
      const episodeData = await fetchEpisodeData({
        animeId,
        provider,
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
