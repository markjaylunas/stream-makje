"use server";

import db from "@/db";
import {
  movie,
  movieEpisode,
  MovieEpisodeInsert,
  movieEpisodeProgress,
  MovieEpisodeProgressInsert,
  MovieInsert,
  movieUserStatus,
  MovieUserStatusInsert,
  WatchStatus,
} from "@/db/schema";
import { DEFAULT_PAGE_LIMIT } from "@/lib/constants";
import { and, asc, count, desc, eq, ilike, inArray, sql } from "drizzle-orm";
import { FetchAllWatchStatusReturnType } from "./anime-action";

export async function fetchMovieEpisodeProgress({
  userId,
  movieId,
  episodeId,
}: {
  userId: string;
  movieId: string;
  episodeId: string;
}) {
  return db
    .select()
    .from(movieEpisodeProgress)
    .where(
      sql`${movieEpisodeProgress.userId} = ${userId} and ${movieEpisodeProgress.movieId} = ${movieId} and ${movieEpisodeProgress.episodeId} = ${episodeId}`
    )
    .limit(1);
}

export type UpsertMovieEpisodeProgressData = {
  movie: MovieInsert;
  movieEpisode: MovieEpisodeInsert;
  movieEpisodeProgress: MovieEpisodeProgressInsert;
};
export async function upsertMovieEpisodeProgress({
  data,
}: {
  data: UpsertMovieEpisodeProgressData;
}) {
  const movieInsert = db.insert(movie).values(data.movie).onConflictDoNothing();
  const episodeInsert = db
    .insert(movieEpisode)
    .values(data.movieEpisode)
    .onConflictDoUpdate({
      target: movieEpisode.id,
      set: {
        title: data.movieEpisode.title,
        image: data.movieEpisode.image,
        updatedAt: new Date(),
      },
    });

  const episodeProgressInsert = db
    .insert(movieEpisodeProgress)
    .values(data.movieEpisodeProgress)
    .returning()
    .onConflictDoUpdate({
      target: [movieEpisodeProgress.episodeId, movieEpisodeProgress.userId],

      set: {
        provider: data.movieEpisodeProgress.provider,
        providerEpisodeId: data.movieEpisodeProgress.providerEpisodeId,
        currentTime: data.movieEpisodeProgress.currentTime,
        isFinished: data.movieEpisodeProgress.isFinished,
        updatedAt: new Date(),
      },
    });

  const [_, __, movieEpisodeProgressData] = await Promise.all([
    movieInsert,
    episodeInsert,
    episodeProgressInsert,
  ]);
  return movieEpisodeProgressData[0];
}
export type FetchAllMovieEpisodeProgress = Awaited<
  ReturnType<typeof fetchAllMovieEpisodeProgress>
>;

export async function fetchAllMovieEpisodeProgress({
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
    eq(movieEpisodeProgress.userId, userId),
    filter === "finished"
      ? eq(movieEpisodeProgress.isFinished, true)
      : undefined,
    filter === "unfinished"
      ? eq(movieEpisodeProgress.isFinished, false)
      : undefined
  );

  const [episodes, totalCount] = await Promise.all([
    await db
      .select({
        id: movieEpisodeProgress.id,
        infoId: movie.id,
        title: movie.title,
        image: movie.image,
        episodeId: movieEpisode.id,
        episodeTitle: movieEpisode.title,
        episodeNumber: movieEpisode.number,
        episodeImage: movieEpisode.image,
        episodeProgressUpdatedAt: movieEpisodeProgress.updatedAt,
        currentTime: movieEpisodeProgress.currentTime,
        durationTime: movieEpisode.durationTime,
        provider: movieEpisodeProgress.provider,
        providerEpisodeId: movieEpisodeProgress.providerEpisodeId,
      })
      .from(movieEpisodeProgress)
      .leftJoin(movie, eq(movie.id, movieEpisodeProgress.movieId))
      .leftJoin(
        movieEpisode,
        eq(movieEpisode.id, movieEpisodeProgress.episodeId)
      )
      .where(filters)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(movieEpisodeProgress.updatedAt)),

    await db
      .select({ count: count() })
      .from(movieEpisodeProgress)
      .where(filters),
  ]);

  return {
    episodes,
    totalCount: totalCount[0]?.count || 0,
  };
}

export async function upsertMovieWatchStatus({
  movieInsert,
  data,
}: {
  movieInsert: MovieInsert;
  data: MovieUserStatusInsert;
}) {
  await db.insert(movie).values(movieInsert).onConflictDoNothing();

  const movieUserStatusData = await db
    .insert(movieUserStatus)
    .values(data)
    .onConflictDoUpdate({
      target: [movieUserStatus.movieId, movieUserStatus.userId],
      set: {
        status: data.status,
        score: data.score,
        updatedAt: new Date(),
      },
    })
    .returning();

  return movieUserStatusData;
}

export async function fetchMovieWatchStatus({
  userId,
  movieId,
}: {
  userId: string;
  movieId: string;
}) {
  return db
    .select()
    .from(movieUserStatus)
    .where(
      sql`${movieUserStatus.userId} = ${userId} and ${movieUserStatus.movieId} = ${movieId}`
    )
    .limit(1);
}

export type FetchAllMovieWatchStatusSort =
  | "title"
  | "updatedAt"
  | "status"
  | "score";

type SortOptions = {
  title: typeof movie.title;
  status: typeof movieUserStatus.status;
  score: typeof movieUserStatus.score;
  updatedAt: typeof movieUserStatus.updatedAt;
};

export async function fetchAllMovieWatchStatus({
  userId,
  limit = DEFAULT_PAGE_LIMIT,
  page = 1,
  status = [],
  query,
  sort = "title",
  direction = "ascending",
}: {
  userId: string;
  limit?: number;
  page?: number;
  status?: WatchStatus[];
  query?: string;
  sort?: FetchAllMovieWatchStatusSort;
  direction?: "ascending" | "descending";
}): Promise<FetchAllWatchStatusReturnType> {
  const filters = and(
    eq(movieUserStatus.userId, userId),
    status.length > 0 ? inArray(movieUserStatus.status, status) : undefined,
    query ? ilike(movie.title, `%${query}%`) : undefined
  );

  const sortOptions: SortOptions = {
    title: movie.title,
    status: movieUserStatus.status,
    score: movieUserStatus.score,
    updatedAt: movieUserStatus.updatedAt,
  };

  const orderBy = sort ? sortOptions[sort] : movieUserStatus.updatedAt;
  const directionOrder = direction === "ascending" ? asc : desc;
  const sortQuery = directionOrder(orderBy);

  const [watchListData, totalCount] = await Promise.all([
    db
      .select()
      .from(movie)
      .innerJoin(movieUserStatus, eq(movie.id, movieUserStatus.movieId))
      .where(filters)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(sortQuery),

    db
      .select({ count: count() })
      .from(movie)
      .innerJoin(movieUserStatus, eq(movie.id, movieUserStatus.movieId))
      .where(filters),
  ]);

  const watchList: FetchAllWatchStatusReturnType["watchList"] =
    watchListData.map((data) => ({
      id: data.movie_user_status.id,
      dataId: data.movie.id,
      title: data.movie.title,
      image: data.movie.image,
      status: data.movie_user_status.status,
      score: data.movie_user_status.score,
      updatedAt: data.movie_user_status.updatedAt,
      href: `/movie/info/${data.movie.id}`,
    }));

  return {
    watchList,
    totalCount: totalCount[0]?.count || 0,
  };
}
