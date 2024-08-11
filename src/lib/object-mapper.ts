import {
  AnimeDataSchema,
  AnimeSchema,
  AnimeSortedSchema,
  EpisodeSchema,
} from "@/api/consumet-validations";
import { CardDataProps } from "@/components/card-data/card-data";
import moment from "moment";
import { AnimeInfo, DataObject, Episode, OtherInfo, Tag } from "./types";
import { pickTitle, searchKeysInObject } from "./utils";

export const consumetAnimeObjectMapper = ({
  animeList,
  tagList,
  isRanked,
}: {
  animeList: AnimeSortedSchema[];
  isRanked?: boolean;
  tagList: Tag[];
}): CardDataProps[] =>
  animeList.map((anime, animeIdx) => {
    const { id, title, image, cover, ...others } = anime;
    return {
      id,
      name: pickTitle(title),
      image,
      cover: cover ? cover : undefined,
      rank: isRanked ? animeIdx + 1 : undefined,
      tagList: searchKeysInObject(tagList, others as DataObject),
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

  const otherTitle = [
    rawInfo.title.userPreferred,
    rawInfo.title.english,
    rawInfo.title.romaji,
    rawInfo.title.native,
  ].filter((v) => Boolean(v));

  const synonyms =
    [...otherTitle, ...rawInfo.synonyms]
      .filter((v, i, a) => a.indexOf(v) == i)
      .join(" | ") || null;
  return {
    id: rawInfo.id ? `${rawInfo.id}` : "",
    malId: rawInfo.malId ? `${rawInfo.malId}` : "",
    name: pickTitle(rawInfo.title),
    poster: rawInfo.image,
    cover: rawInfo.cover || null,
    type: rawInfo.type,
    genres: rawInfo.genres,
    synonyms,
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

export const consumetInfoAnimeObjectMapper = ({
  animeList,
  tagList,
  isRanked,
}: {
  animeList: AnimeSchema[];
  isRanked?: boolean;
  tagList: Tag[];
}): CardDataProps[] =>
  animeList.map((anime, animeIdx) => {
    const { id, title, image, cover, ...others } = anime;
    return {
      id: `${id}`,
      name: pickTitle(title),
      image,
      cover: cover ? cover : undefined,
      rank: isRanked ? animeIdx + 1 : undefined,
      tagList: searchKeysInObject(tagList, others as unknown as DataObject),
    };
  });
