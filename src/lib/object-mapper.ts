import { FetchAllEpisodeProgress } from "@/actions/anime-action";
import { FetchAllKdramaEpisodeProgress } from "@/actions/kdrama-action";
import { FetchAllMovieEpisodeProgress } from "@/actions/movie-action";
import { CardDataProps } from "@/components/card-data/card-data";
import { CardWatchedDataProps } from "@/components/card-data/card-watched-data";
import {
  AWEpisodeServersDataSchema,
  AWEpisodeSourceDataSchema,
} from "@/lib/aniwatch-validations";
import {
  AnimeDataSchema,
  AnimeSchema,
  AnimeSearchDataSchema,
  AnimeSortedSchema,
  DCDramaDataSchema,
  DCEpisodeDataSchema,
  DCInfoDataSchema,
  DCWatchDataSchema,
  EpisodeSchema,
  EpisodeSourceDataSchema,
  FHQDataSchema,
  FHQEpisodeDataSchema,
  FHQInfoDataSchema,
  FHQServerDataSchema,
  FHQSourceDataSchema,
} from "@/lib/consumet-validations";
import moment from "moment";
import { ANIME_PROVIDER, ASFormatArray, sourcePriority } from "./constants";
import {
  AnimeTitle,
  DataObject,
  Episode,
  EpisodeStream,
  Info,
  OtherInfo,
  ServerOption,
  Tag,
} from "./types";
import {
  createURL,
  findOriginalTitle,
  pickTitle,
  searchKeysInObject,
  sortSourcePriority,
} from "./utils";

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
    const { id, title, description, image, cover, trailer, ...others } = anime;
    let href = `/anime/watch/${id}`;
    if (others.episodeNumber)
      href = createURL({
        path: `/anime/watch/${id}`,
        params: {
          episodeId: undefined,
          episodeNumber: `${others.episodeNumber}`,
          provider: ANIME_PROVIDER.P1,
        },
      });

    return {
      id,
      name: pickTitle(title),
      description: description ? description : undefined,
      image,
      cover: cover ? cover : undefined,
      rank: isRanked ? animeIdx + 1 : undefined,
      href: href,
      trailer: trailer ? trailer : undefined,
      tagList: searchKeysInObject(tagList, others as DataObject),
    };
  });

export const consumetSearchAnimeObjectMapper = ({
  searchData,
  tagList,
}: {
  searchData: AnimeSearchDataSchema;
  tagList: Tag[];
}): CardDataProps[] => {
  const { results } = searchData;
  return results.map((anime, animeIdx) => {
    const { id, title, description, image, cover, ...others } = anime;
    return {
      id,
      name: pickTitle(title),
      description: description ? description : undefined,
      image: image ? image : "",
      cover: cover ? cover : undefined,
      href: `/anime/watch/${id}`,
      tagList: searchKeysInObject(tagList, others as DataObject).filter(
        (v) => v.value
      ),
    };
  });
};

export const consumetAnimeInfoObjectMapper = (
  rawInfo: AnimeDataSchema
): Info => {
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

  const characters = rawInfo.characters.map((char) => ({
    name: char.name.full || "",
    image: char.image || "",
  }));

  return {
    id: rawInfo.id ? `${rawInfo.id}` : "",
    infoId: rawInfo.malId ? `${rawInfo.malId}` : "",
    name: pickTitle(rawInfo.title),
    poster: rawInfo.image || "",
    cover: rawInfo.cover || null,
    type: rawInfo.type,
    genres: rawInfo.genres,
    synonyms,
    sub: rawInfo.totalEpisodes,
    dub: null,
    description: rawInfo.description || null,
    characters,
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
  animeList
    .sort((a, b) => {
      const formatA = ASFormatArray.indexOf(
        a.type?.toUpperCase() as (typeof ASFormatArray)[number]
      );
      const formatB = ASFormatArray.indexOf(
        b.type as (typeof ASFormatArray)[number]
      );

      return formatA - formatB;
    })
    .filter((anime) => pickTitle(anime.title).length > 0)
    .map((anime, animeIdx) => {
      const { id, title, image, cover, ...others } = anime;
      return {
        id: `${id}`,
        name: pickTitle(title),
        image: image || "",
        cover: cover ? cover : undefined,
        rank: isRanked ? animeIdx + 1 : undefined,
        href: `/anime/watch/${id}`,
        tagList: searchKeysInObject(
          tagList,
          others as unknown as DataObject
        ).filter((v) => v.value),
      };
    });

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

export const consumetAnimeWatchedObjectMapper = ({
  animeList,
  tagList,
}: {
  animeList: FetchAllEpisodeProgress["episodes"];
  tagList: Tag[];
}): CardWatchedDataProps[] =>
  animeList.map((anime) => {
    const {
      title,
      episodeTitle,
      episodeImage,
      episodeId,
      animeImage,
      dataId,
      currentTime,
      durationTime,
      provider,
      providerEpisodeId,
      episodeProgressUpdatedAt: _,
      ...others
    } = anime;

    const name = title || "";
    const episodeName = episodeTitle || "";
    const episodeNumber = anime.episodeNumber || 1;
    const image = episodeImage || animeImage || "";
    const href = createURL({
      path: `/anime/watch/${dataId}`,
      params: {
        episodeId: providerEpisodeId,
        episodeNumber,
        provider,
      },
    });
    return {
      id: dataId || "",
      name,
      episodeName,
      episodeNumber,
      image,
      currentTime,
      durationTime: durationTime || 0,
      href,
      tagList: searchKeysInObject(tagList, others as DataObject),
    };
  });

export const consumetKdramaWatchedObjectMapper = ({
  kdramaList,
  tagList,
}: {
  kdramaList: FetchAllKdramaEpisodeProgress["episodes"];
  tagList: Tag[];
}): CardWatchedDataProps[] =>
  kdramaList.map((kdrama) => {
    const {
      title,
      episodeTitle,
      episodeImage,
      episodeId,
      image: infoImage,
      infoId,
      currentTime,
      durationTime,
      provider,
      providerEpisodeId,
      episodeProgressUpdatedAt: _,
      ...others
    } = kdrama;

    const name = title || "";
    const episodeName = episodeTitle || "";
    const episodeNumber = kdrama.episodeNumber || 1;
    const image = episodeImage || infoImage || "";
    const href = createURL({
      path: `/k-drama/watch/${infoId}`,
      params: {
        episodeId: providerEpisodeId,
        episodeNumber,
        provider,
      },
    });
    return {
      id: infoId || "",
      name,
      episodeName,
      episodeNumber,
      image,
      currentTime,
      durationTime: durationTime || 0,
      href,
      tagList: searchKeysInObject(tagList, others as DataObject),
    };
  });

export const consumetKDramacoolObjectMapper = ({
  kdramaList,
}: {
  kdramaList: DCDramaDataSchema[];
}): CardDataProps[] =>
  kdramaList.map((drama) => ({
    id: drama.id,
    name: drama.title,
    image: drama.image,
    href: `/k-drama/watch/${encodeURIComponent(drama.id)}`,
  }));

export const consumetKDramaInfoObjectMapper = (
  rawInfo: DCInfoDataSchema
): Info => {
  const id = encodeURIComponent(rawInfo.id);
  const otherInfo: OtherInfo = [
    {
      key: "status",
      value: rawInfo.status,
    },
    {
      key: "Episodes",
      value: rawInfo.episodes.length.toString() || "0",
    },
    {
      key: "duration",
      value: rawInfo.duration || "",
    },
    {
      key: "release date",
      value: rawInfo.releaseDate,
    },
    {
      key: "content rating",
      value: rawInfo.contentRating,
    },
    {
      key: "Airs On",
      value: rawInfo.airsOn,
    },
    {
      key: "director",
      value: rawInfo.director,
    },
    {
      key: "originalNetwork",
      value: rawInfo.originalNetwork,
    },
  ].filter((c) => Boolean(c.value));

  const synonyms =
    rawInfo.otherNames.filter((v, i, a) => a.indexOf(v) == i).join(" | ") ||
    null;
  return {
    id,
    infoId: id,
    name: rawInfo.title,
    poster: rawInfo.image,
    cover: null,
    type: null,
    genres: rawInfo.genres,
    synonyms,
    sub: null,
    dub: null,
    description: rawInfo.description || null,
    characters: rawInfo.characters.map((char) => ({
      name: char.name,
      image: char.image,
    })),
    otherInfo,
  };
};

export const consumetKdramaInfoEpisodesObjectMapper = (
  episodes: DCEpisodeDataSchema[]
): Episode[] =>
  episodes.map((episode) => ({
    episodeId: episode.id,
    title: episode.title ? episode.title : null,
    number: episode.episode,
  }));

export const consumetKdramaEpisodeStreamObjectMapper = (
  source: DCWatchDataSchema
): EpisodeStream => ({
  sources: sortSourcePriority(
    source.sources.map((source, sourceIdx) => ({
      type: source.isM3U8 ? "m3u8" : "",
      url: source.url,
      quality: ["default", "backup", ...sourcePriority][sourceIdx],
    }))
  ),
  tracks: [],
  download: source.download,
});

export const consumetMovieObjectMapper = ({
  movieList,
  tagList,
}: {
  movieList: FHQDataSchema[];
  tagList: Tag[];
}): CardDataProps[] =>
  movieList.map((movie, movieIdx) => {
    const { id, title, image, ...others } = movie;
    return {
      id,
      name: title,
      image,
      href: `/movie/watch/${encodeURIComponent(id)}`,
      tagList: searchKeysInObject(tagList, others as DataObject).filter(
        (v) => v.value
      ),
    };
  });

export const consumetMovieInfoEpisodesObjectMapper = (
  episodes: FHQEpisodeDataSchema[]
): Episode[] =>
  episodes.map((episode, episodeIdx) => ({
    episodeId: episode.id,
    title: episode.title ? episode.title : null,
    number: episodeIdx + 1,
  }));

export const consumetMovieInfoObjectMapper = (
  rawInfo: FHQInfoDataSchema
): Info => {
  const id = encodeURIComponent(rawInfo.id);
  const otherInfo: OtherInfo = [
    {
      key: "type",
      value: rawInfo.type,
    },
    {
      key: "duration",
      value: rawInfo.duration,
    },
    {
      key: "rating",
      value: rawInfo.rating?.toString() || "",
    },
    {
      key: "release date",
      value: rawInfo.releaseDate,
    },
    {
      key: "production",
      value: rawInfo.production,
    },
    {
      key: "country",
      value: rawInfo.country,
    },
  ].filter((c) => Boolean(c.value));

  return {
    id,
    infoId: id,
    name: rawInfo.title,
    poster: rawInfo.image,
    cover: null,
    type: null,
    genres: rawInfo.genres,
    synonyms: "",
    description: rawInfo.description,
    otherInfo,
  };
};

export const consumetMovieEpisodeStreamObjectMapper = (
  source: FHQSourceDataSchema
): EpisodeStream => ({
  sources: sortSourcePriority(
    source.sources.map((source, sourceIdx) => ({
      type: source.isM3U8 ? "m3u8" : "",
      url: source.url,
      quality: source.quality,
    }))
  ),
  tracks: source.subtitles.map((sub) => {
    return { file: sub.url, kind: "captions", label: sub.lang };
  }),
});

export const consumetMovieWatchedObjectMapper = ({
  movieList,
  tagList,
}: {
  movieList: FetchAllMovieEpisodeProgress["episodes"];
  tagList: Tag[];
}): CardWatchedDataProps[] =>
  movieList.map((movie) => {
    const {
      title,
      episodeTitle,
      episodeImage,
      episodeId,
      image: infoImage,
      infoId,
      currentTime,
      durationTime,
      provider,
      providerEpisodeId,
      episodeProgressUpdatedAt: _,
      ...others
    } = movie;

    const name = title || "";
    const episodeName = episodeTitle || "";
    const episodeNumber = movie.episodeNumber || 1;
    const image = episodeImage || infoImage || "";
    const href = createURL({
      path: `/movie/watch/${infoId}`,
      params: {
        episodeId: providerEpisodeId,
        episodeNumber,
        provider,
      },
    });
    return {
      id: infoId || "",
      name,
      episodeName,
      episodeNumber,
      image,
      currentTime,
      durationTime: durationTime || 0,
      href,
      tagList: searchKeysInObject(tagList, others as DataObject),
    };
  });

export const animeServerObjectMapper = ({
  serverData: { sub, dub, raw, episodeId, episodeNo },
  animeId,
  provider,
}: {
  serverData: AWEpisodeServersDataSchema;
  animeId: string;
  provider: string;
}): ServerOption[] => {
  return [
    {
      type: "sub",
      list: sub.map((server) => ({
        name: server.serverName,
        href: createURL({
          path: `/anime/watch/${animeId}`,
          params: {
            episodeId,
            episodeNumber: episodeNo,
            provider,
            server: server.serverName,
            category: "sub",
          },
        }),
      })),
    },
    {
      type: "dub",
      list: dub.map((server) => ({
        name: server.serverName,
        href: createURL({
          path: `/anime/watch/${animeId}`,
          params: {
            episodeId,
            episodeNumber: episodeNo,
            provider,
            server: server.serverName,
            category: "dub",
          },
        }),
      })),
    },
    {
      type: "raw",
      list: raw.map((server) => ({
        name: server.serverName,
        href: createURL({
          path: `/anime/watch/${animeId}`,
          params: {
            episodeId,
            episodeNumber: episodeNo,
            provider,
            server: server.serverName,
            category: "raw",
          },
        }),
      })),
    },
  ].filter((server) => server.list.length > 0);
};

export const movieServerObjectMapper = ({
  serverData,
  movieId,
  episodeId,
  episodeNumber,
}: {
  serverData: FHQServerDataSchema;
  movieId: string;
  episodeId: string;
  episodeNumber: string;
}): ServerOption[] => {
  return [
    {
      type: "raw",
      list: serverData.map((server) => ({
        name: server.name,
        href: createURL({
          path: `/movie/watch/${movieId}`,
          params: {
            episodeId,
            episodeNumber,
            server: server.name,
          },
        }),
      })),
    },
  ].filter((server) => server.list.length > 0);
};
