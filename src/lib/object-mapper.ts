import {
  AnimeDataSchema,
  AnimeSchema,
  AnimeSortedSchema,
  EpisodeSchema,
} from "@/api/consumet-validations";
import moment from "moment";
import { AnimeInfo, CardInfo, Episode, OtherInfo } from "./types";
import { pickTitle } from "./utils";

export const consumetAnimeObjectMapper = (
  animeList: AnimeSortedSchema[],
  { isRanked = false }
): CardInfo[] =>
  animeList.map((anime, animeIdx) => {
    return {
      id: anime.id,
      name: pickTitle(anime.title),
      image: anime.image,
      cover: anime.cover ? anime.cover : undefined,
      rank: isRanked ? animeIdx + 1 : undefined,
      other: [],
    };
  });

export const consumetAnimeInfoObjectMapper = (
  rawInfo: AnimeDataSchema
): AnimeInfo => {
  let aired = "";

  if (rawInfo.startDate) {
    const { day, month, year } = rawInfo.startDate;
    const date = new Date(`${month}-${day}-${year}`);
    const firstDate = moment(date).format("MMM DD, YYYY");
    aired = `${firstDate} to `;
  }

  if (rawInfo.endDate.year !== null) {
    const { day, month, year } = rawInfo.endDate;
    const date = new Date(`${month}-${day}-${year}`);
    const endDate = moment(date).format("MMM DD, YYYY");
    aired = aired + endDate;
  } else {
    aired = aired + "?";
  }

  const otherInfo: OtherInfo = [
    {
      key: "rating",
      value: rawInfo.rating ? `${rawInfo.rating}` : "",
    },
    {
      key: "aired",
      value: aired,
    },
    {
      key: "status",
      value: rawInfo.status,
    },
    {
      key: "duration",
      value: rawInfo.duration ? `${rawInfo.duration}m` : ``,
    },
    {
      key: "premiered",
      value: `${rawInfo.season} ${rawInfo.releaseDate}`,
    },
    {
      key: "studios",
      value: rawInfo.studios || "",
    },
  ].filter((c) => Boolean(c.value));

  return {
    id: rawInfo.id ? `${rawInfo.id}` : "",
    malId: rawInfo.malId ? `${rawInfo.malId}` : "",
    name: pickTitle(rawInfo.title),
    poster: rawInfo.image,
    cover: rawInfo.cover || null,
    type: rawInfo.type,
    genres: rawInfo.genres,
    synonyms: rawInfo.synonyms.join(" | ") || null,
    sub: rawInfo.totalEpisodes,
    dub: null,
    description: rawInfo.description || null,
    otherInfo,
  };
};

export const consumetAnimeInfoEpisodesObjectMapper = (
  episodes: EpisodeSchema[]
): Episode[] =>
  episodes.map((episode) => ({
    episodeId: episode.id,
    title: episode.title ? episode.title : null,
    number: episode.number,
    image: episode.image,
    isFiller: null,
  }));

export const consumetInfoAnimeObjectMapper = (
  animeList: AnimeSchema[]
): CardInfo[] =>
  animeList.map((anime) => {
    return {
      id: anime.id ? `${anime.id}` : "",
      name: pickTitle(anime.title),
      image: anime.image,
    };
  });
