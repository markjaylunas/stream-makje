import { AWEpisodeSourceDataSchema } from "@/api/aniwatch-validations";
import {
  AnimeDataSchema,
  AnimeSchema,
  AnimeSortedSchema,
  EpisodeSchema,
  EpisodeSourceDataSchema,
} from "@/api/consumet-validations";
import { CardDataProps } from "@/components/card-data/card-data";
import moment from "moment";
import { sourcePriority } from "./constants";
import {
  AnimeInfo,
  DataObject,
  Episode,
  EpisodeStream,
  OtherInfo,
  Tag,
} from "./types";
import { jaroWinklerDistance, pickTitle, searchKeysInObject } from "./utils";

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
    const { id, title, description, image, cover, ...others } = anime;
    return {
      id,
      name: pickTitle(title),
      description: description ? description : undefined,
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

// Map anime list to get closest anime by name
export const mapAnimeByName = async ({
  list,
  title,
}: {
  title: string;
  list: { id: string; name: string }[];
}) => {
  try {
    const normalizedTitle = title.trim().toLowerCase();
    let mappedResult = null;
    let maxScore = 0;

    // Function to calculate Jaro-Winkler similarity
    const calculateSimilarity = (itemName: string) => {
      const itemNameNormalized = itemName.trim().toLowerCase();
      const score = jaroWinklerDistance(normalizedTitle, itemNameNormalized);
      return score;
    };

    // Find exact match first
    mappedResult = list.find(
      (item) => item.name && item.name.toLowerCase() === normalizedTitle
    );

    // If no exact match, find closest match using Jaro-Winkler distance
    if (!mappedResult) {
      list.forEach((item) => {
        const itemName = item.name;
        if (itemName) {
          const score = calculateSimilarity(itemName);
          if (score > maxScore) {
            maxScore = score;
            mappedResult = item;
          }
        }
      });
    }

    return mappedResult || null;
  } catch (error) {
    console.error("Error in MapAnimeByTitle:", error);
    return null;
  }
};

export const metaEpisodeStreamObjectMapper = (
  source: EpisodeSourceDataSchema
): EpisodeStream => {
  const sources = source.sources
    ? source.sources.map((source) => ({
        url: source.url,
        type: source.isM3U8 ? "m3u8" : "",
        quality: source.quality,
      }))
    : [];

  const sortedSourceList = sources.sort((a, b) => {
    return (
      sourcePriority.indexOf(a.quality) - sourcePriority.indexOf(b.quality)
    );
  });
  return {
    sources: sortedSourceList,
    tracks: [],
  };
};

export const aniwatchEpisodeStreamObjectMapper = (
  source: AWEpisodeSourceDataSchema
): EpisodeStream => ({
  sources: source.sources,
  tracks: source.tracks ? source.tracks : [],
  intro: source.intro,
  outro: source.outro,
});
