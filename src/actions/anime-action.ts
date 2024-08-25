"use server";

import db from "@/db";
import {
  anime,
  AnimeInsert,
  animeUserStatus,
  AnimeUserStatusInsert,
  episode,
  EpisodeInsert,
  episodeProgress,
  EpisodeProgressInsert,
  kdrama,
  kdramaUserStatus,
  movie,
  movieUserStatus,
  WatchStatus,
} from "@/db/schema";
import { DEFAULT_PAGE_LIMIT } from "@/lib/constants";
import { ASContentType } from "@/lib/types";
import { and, asc, count, desc, eq, ilike, inArray, sql } from "drizzle-orm";

export async function fetchEpisodeProgress({
  userId,
  animeId,
  episodeId,
}: {
  userId: string;
  animeId: string;
  episodeId: string;
}) {
  return db
    .select()
    .from(episodeProgress)
    .where(
      sql`${episodeProgress.userId} = ${userId} and ${episodeProgress.animeId} = ${animeId} and ${episodeProgress.episodeId} = ${episodeId}`
    )
    .limit(1);
}

export type UpsertEpisodeProgressData = {
  anime: AnimeInsert;
  episode: EpisodeInsert;
  episodeProgress: EpisodeProgressInsert;
};
export async function upsertEpisodeProgress({
  data,
}: {
  data: UpsertEpisodeProgressData;
}) {
  const animeInsert = db.insert(anime).values(data.anime).onConflictDoNothing();
  const episodeInsert = db
    .insert(episode)
    .values(data.episode)
    .onConflictDoUpdate({
      target: episode.id,
      set: {
        title: data.episode.title,
        image: data.episode.image,
        updatedAt: new Date(),
      },
    });

  const episodeProgressInsert = db
    .insert(episodeProgress)
    .values(data.episodeProgress)
    .returning()
    .onConflictDoUpdate({
      target: [episodeProgress.episodeId, episodeProgress.userId],
      set: {
        provider: data.episodeProgress.provider,
        providerEpisodeId: data.episodeProgress.providerEpisodeId,
        currentTime: data.episodeProgress.currentTime,
        isFinished: data.episodeProgress.isFinished,
        updatedAt: new Date(),
      },
    });

  const [_, __, episodeProgressData] = await Promise.all([
    animeInsert,
    episodeInsert,
    episodeProgressInsert,
  ]);
  return episodeProgressData[0];
}
export type FetchAllEpisodeProgress = Awaited<
  ReturnType<typeof fetchAllEpisodeProgress>
>;

export async function fetchAllEpisodeProgress({
  userId,
  limit = DEFAULT_PAGE_LIMIT,
  page = 1,
  filter = "all",
}: {
  userId: string;
  limit?: number;
  page?: number;
  filter?: "finished" | "unfinished" | "all";
}) {
  const filters = and(
    eq(episodeProgress.userId, userId),
    filter === "finished" ? eq(episodeProgress.isFinished, true) : undefined,
    filter === "unfinished" ? eq(episodeProgress.isFinished, false) : undefined
  );

  const [episodes, totalCount] = await Promise.all([
    await db
      .select({
        id: episodeProgress.id,
        dataId: anime.id,
        title: anime.title,
        animeImage: anime.image,
        episodeId: episode.id,
        episodeTitle: episode.title,
        episodeNumber: episode.number,
        episodeImage: episode.image,
        episodeProgressUpdatedAt: episodeProgress.updatedAt,
        currentTime: episodeProgress.currentTime,
        durationTime: episode.durationTime,
        provider: episodeProgress.provider,
        providerEpisodeId: episodeProgress.providerEpisodeId,
      })
      .from(episodeProgress)
      .leftJoin(anime, eq(anime.id, episodeProgress.animeId))
      .leftJoin(episode, eq(episode.id, episodeProgress.episodeId))
      .where(filters)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(episodeProgress.updatedAt)),

    await db.select({ count: count() }).from(episodeProgress).where(filters),
  ]);

  return {
    episodes,
    totalCount: totalCount[0]?.count || 0,
  };
}

export async function upsertWatchStatus({
  animeInsert,
  data,
}: {
  animeInsert: AnimeInsert;
  data: AnimeUserStatusInsert;
}) {
  await db.insert(anime).values(animeInsert).onConflictDoNothing();

  const animeUserStatusData = await db
    .insert(animeUserStatus)
    .values(data)
    .onConflictDoUpdate({
      target: [animeUserStatus.animeId, animeUserStatus.userId],
      set: {
        status: data.status,
        score: data.score,
        updatedAt: new Date(),
      },
    })
    .returning();

  return animeUserStatusData;
}

export async function fetchWatchStatus({
  userId,
  animeId,
}: {
  userId: string;
  animeId: string;
}) {
  return db
    .select()
    .from(animeUserStatus)
    .where(
      sql`${animeUserStatus.userId} = ${userId} and ${animeUserStatus.animeId} = ${animeId}`
    )
    .limit(1);
}

export type FetchAllWatchStatusReturnType = {
  watchList: {
    id: string;
    dataId: string;
    title: string;
    image: string;
    status: WatchStatus;
    score: number;
    updatedAt: Date;
    href: string;
    contentType?: ASContentType;
  }[];
  totalCount: number;
};

export type FetchAllWatchStatusSort =
  | "title"
  | "updatedAt"
  | "status"
  | "score";

type SortOptions = {
  title: typeof anime.title | typeof kdrama.title | typeof movie.title;
  status:
    | typeof animeUserStatus.status
    | typeof kdramaUserStatus.status
    | typeof movieUserStatus.status;
  score:
    | typeof animeUserStatus.score
    | typeof kdramaUserStatus.score
    | typeof movieUserStatus.score;
  updatedAt:
    | typeof animeUserStatus.updatedAt
    | typeof kdramaUserStatus.updatedAt
    | typeof movieUserStatus.updatedAt;
};

export async function fetchAllWatchStatus({
  userId,
  limit = DEFAULT_PAGE_LIMIT,
  page = 1,
  status = [],
  query,
  sort = "title",
  direction = "ascending",
  contentType,
}: {
  userId: string;
  limit?: number;
  page?: number;
  status?: WatchStatus[];
  query?: string;
  sort?: FetchAllWatchStatusSort;
  direction?: "ascending" | "descending";
  contentType: ASContentType[];
}): Promise<FetchAllWatchStatusReturnType> {
  // start: anime filters
  const animeFilters = and(
    eq(animeUserStatus.userId, userId),
    status.length > 0 ? inArray(animeUserStatus.status, status) : undefined,
    query ? ilike(anime.title, `%${query}%`) : undefined
  );

  const animeSortOptions: SortOptions = {
    title: anime.title,
    status: animeUserStatus.status,
    score: animeUserStatus.score,
    updatedAt: animeUserStatus.updatedAt,
  };

  const animeOrderBy = sort
    ? animeSortOptions[sort]
    : animeUserStatus.updatedAt;
  const animeDirectionOrder = direction === "ascending" ? asc : desc;
  const animeSortQuery = animeDirectionOrder(animeOrderBy);

  // end: anime filters

  // start: kdrama filters
  const kdramaFilters = and(
    eq(kdramaUserStatus.userId, userId),
    status.length > 0 ? inArray(kdramaUserStatus.status, status) : undefined,
    query ? ilike(kdrama.title, `%${query}%`) : undefined
  );

  const kdramaSortOptions: SortOptions = {
    title: kdrama.title,
    status: kdramaUserStatus.status,
    score: kdramaUserStatus.score,
    updatedAt: kdramaUserStatus.updatedAt,
  };

  const kdramaOrderBy = sort
    ? kdramaSortOptions[sort]
    : kdramaUserStatus.updatedAt;
  const kdramaDirectionOrder = direction === "ascending" ? asc : desc;
  const kdramaSortQuery = kdramaDirectionOrder(kdramaOrderBy);

  // end: kdrama filters

  // start: movie filters
  const movieFilters = and(
    eq(movieUserStatus.userId, userId),
    status.length > 0 ? inArray(movieUserStatus.status, status) : undefined,
    query ? ilike(kdrama.title, `%${query}%`) : undefined
  );

  const movieSortOptions: SortOptions = {
    title: movie.title,
    status: movieUserStatus.status,
    score: movieUserStatus.score,
    updatedAt: movieUserStatus.updatedAt,
  };

  const movieOrderBy = sort
    ? movieSortOptions[sort]
    : movieUserStatus.updatedAt;
  const movieDirectionOrder = direction === "ascending" ? asc : desc;
  const movieSortQuery = movieDirectionOrder(movieOrderBy);

  // end: movie filters

  const isAll = contentType.includes("ALL");
  const isAnime = contentType.includes("ANIME");
  const isKdrama = contentType.includes("K-DRAMA");
  const isMovie = contentType.includes("MOVIE");

  const [
    animeWatchListData,
    animeTotalCount,
    kdramaWatchListData,
    kdramaTotalCount,
    movieWatchListData,
    movieTotalCount,
  ] = await Promise.all([
    isAll || isAnime
      ? db
          .select()
          .from(anime)
          .innerJoin(animeUserStatus, eq(anime.id, animeUserStatus.animeId))
          .where(animeFilters)
          .limit(limit)
          .offset((page - 1) * limit)
          .orderBy(animeSortQuery)
      : [],

    isAll || isAnime
      ? db
          .select({ count: count() })
          .from(anime)
          .innerJoin(animeUserStatus, eq(anime.id, animeUserStatus.animeId))
          .where(animeFilters)
      : [],
    isAll || isKdrama
      ? db
          .select()
          .from(kdrama)
          .innerJoin(kdramaUserStatus, eq(kdrama.id, kdramaUserStatus.kdramaId))
          .where(kdramaFilters)
          .limit(limit)
          .offset((page - 1) * limit)
          .orderBy(kdramaSortQuery)
      : [],

    isAll || isKdrama
      ? db
          .select({ count: count() })
          .from(kdrama)
          .innerJoin(kdramaUserStatus, eq(kdrama.id, kdramaUserStatus.kdramaId))
          .where(kdramaFilters)
      : [],
    isAll || isMovie
      ? db
          .select()
          .from(movie)
          .innerJoin(movieUserStatus, eq(movie.id, movieUserStatus.movieId))
          .where(movieFilters)
          .limit(limit)
          .offset((page - 1) * limit)
          .orderBy(movieSortQuery)
      : [],

    isAll || isMovie
      ? db
          .select({ count: count() })
          .from(movie)
          .innerJoin(movieUserStatus, eq(movie.id, movieUserStatus.movieId))
          .where(movieFilters)
      : [],
    ,
  ]);

  const animeWatchList: FetchAllWatchStatusReturnType["watchList"] =
    animeWatchListData.map((data) => ({
      id: data.anime_user_status.id,
      dataId: data.anime.id,
      title: data.anime.title,
      image: data.anime.image,
      status: data.anime_user_status.status,
      score: data.anime_user_status.score,
      updatedAt: data.anime_user_status.updatedAt,
      href: `/anime/info/${data.anime.id}`,
      contentType: "ANIME",
    }));

  const kdramaWatchList: FetchAllWatchStatusReturnType["watchList"] =
    kdramaWatchListData.map((data) => ({
      id: data.kdrama_user_status.id,
      dataId: data.kdrama.id,
      title: data.kdrama.title,
      image: data.kdrama.image,
      status: data.kdrama_user_status.status,
      score: data.kdrama_user_status.score,
      updatedAt: data.kdrama_user_status.updatedAt,
      href: `/k-drama/info/${data.kdrama.id}`,
      contentType: "K-DRAMA",
    }));

  const movieWatchList: FetchAllWatchStatusReturnType["watchList"] =
    movieWatchListData.map((data) => ({
      id: data.movie_user_status.id,
      dataId: data.movie.id,
      title: data.movie.title,
      image: data.movie.image,
      status: data.movie_user_status.status,
      score: data.movie_user_status.score,
      updatedAt: data.movie_user_status.updatedAt,
      href: `/movie/info/${data.movie.id}`,
      contentType: "MOVIE",
    }));

  return {
    watchList: [...animeWatchList, ...kdramaWatchList, ...movieWatchList],
    totalCount:
      (animeTotalCount[0]?.count || 0) +
      (kdramaTotalCount[0]?.count || 0) +
      (movieTotalCount[0]?.count || 0),
  };
}
