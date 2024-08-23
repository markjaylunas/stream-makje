"use server";

import db from "@/db";
import {
  kdrama,
  kdramaEpisode,
  KdramaEpisodeInsert,
  kdramaEpisodeProgress,
  KdramaEpisodeProgressInsert,
  KdramaInsert,
  kdramaUserStatus,
  KdramaUserStatusInsert,
  WatchStatus,
} from "@/db/schema";
import { DEFAULT_PAGE_LIMIT } from "@/lib/constants";
import { and, asc, count, desc, eq, ilike, inArray, sql } from "drizzle-orm";
import { FetchAllWatchStatusReturnType } from "./anime-action";

export async function fetchKdramaEpisodeProgress({
  userId,
  kdramaId,
  episodeId,
}: {
  userId: string;
  kdramaId: string;
  episodeId: string;
}) {
  return db
    .select()
    .from(kdramaEpisodeProgress)
    .where(
      sql`${kdramaEpisodeProgress.userId} = ${userId} and ${kdramaEpisodeProgress.kdramaId} = ${kdramaId} and ${kdramaEpisodeProgress.episodeId} = ${episodeId}`
    )
    .limit(1);
}

export type UpsertKdramaEpisodeProgressData = {
  kdrama: KdramaInsert;
  kdramaEpisode: KdramaEpisodeInsert;
  kdramaEpisodeProgress: KdramaEpisodeProgressInsert;
};
export async function upsertKdramaEpisodeProgress({
  data,
}: {
  data: UpsertKdramaEpisodeProgressData;
}) {
  const kdramaInsert = db
    .insert(kdrama)
    .values(data.kdrama)
    .onConflictDoNothing();
  const episodeInsert = db
    .insert(kdramaEpisode)
    .values(data.kdramaEpisode)
    .onConflictDoUpdate({
      target: kdramaEpisode.id,
      set: {
        title: data.kdramaEpisode.title,
        image: data.kdramaEpisode.image,
        updatedAt: new Date(),
      },
    });

  const episodeProgressInsert = db
    .insert(kdramaEpisodeProgress)
    .values(data.kdramaEpisodeProgress)
    .onConflictDoUpdate({
      target: kdramaEpisodeProgress.id,
      set: {
        provider: data.kdramaEpisodeProgress.provider,
        providerEpisodeId: data.kdramaEpisodeProgress.providerEpisodeId,
        currentTime: data.kdramaEpisodeProgress.currentTime,
        isFinished: data.kdramaEpisodeProgress.isFinished,
        updatedAt: new Date(),
      },
    });

  await Promise.all([kdramaInsert, episodeInsert, episodeProgressInsert]);
}
export type FetchAllKdramaEpisodeProgress = Awaited<
  ReturnType<typeof fetchAllKdramaEpisodeProgress>
>;

export async function fetchAllKdramaEpisodeProgress({
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
    eq(kdramaEpisodeProgress.userId, userId),
    filter === "finished"
      ? eq(kdramaEpisodeProgress.isFinished, true)
      : undefined,
    filter === "unfinished"
      ? eq(kdramaEpisodeProgress.isFinished, false)
      : undefined
  );

  const [episodes, totalCount] = await Promise.all([
    await db
      .select({
        id: kdramaEpisodeProgress.id,
        infoId: kdrama.id,
        title: kdrama.title,
        image: kdrama.image,
        episodeId: kdramaEpisode.id,
        episodeTitle: kdramaEpisode.title,
        episodeNumber: kdramaEpisode.number,
        episodeImage: kdramaEpisode.image,
        episodeProgressUpdatedAt: kdramaEpisodeProgress.updatedAt,
        currentTime: kdramaEpisodeProgress.currentTime,
        durationTime: kdramaEpisode.durationTime,
        provider: kdramaEpisodeProgress.provider,
        providerEpisodeId: kdramaEpisodeProgress.providerEpisodeId,
      })
      .from(kdramaEpisodeProgress)
      .leftJoin(kdrama, eq(kdrama.id, kdramaEpisodeProgress.kdramaId))
      .leftJoin(
        kdramaEpisode,
        eq(kdramaEpisode.id, kdramaEpisodeProgress.episodeId)
      )
      .where(filters)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(kdramaEpisodeProgress.updatedAt)),

    await db
      .select({ count: count() })
      .from(kdramaEpisodeProgress)
      .where(filters),
  ]);

  return {
    episodes,
    totalCount: totalCount[0]?.count || 0,
  };
}

export async function upsertKdramaWatchStatus({
  kdramaInsert,
  data,
}: {
  kdramaInsert: KdramaInsert;
  data: KdramaUserStatusInsert;
}) {
  await db.insert(kdrama).values(kdramaInsert).onConflictDoNothing();

  const kdramaUserStatusData = await db
    .insert(kdramaUserStatus)
    .values(data)
    .onConflictDoUpdate({
      target: [kdramaUserStatus.kdramaId, kdramaUserStatus.userId],
      set: {
        status: data.status,
        score: data.score,
        updatedAt: new Date(),
      },
    })
    .returning();

  return kdramaUserStatusData;
}

export async function fetchKdramaWatchStatus({
  userId,
  kdramaId,
}: {
  userId: string;
  kdramaId: string;
}) {
  return db
    .select()
    .from(kdramaUserStatus)
    .where(
      sql`${kdramaUserStatus.userId} = ${userId} and ${kdramaUserStatus.kdramaId} = ${kdramaId}`
    )
    .limit(1);
}

export type FetchAllKdramaWatchStatusSort =
  | "title"
  | "updatedAt"
  | "status"
  | "score";

type SortOptions = {
  title: typeof kdrama.title;
  status: typeof kdramaUserStatus.status;
  score: typeof kdramaUserStatus.score;
  updatedAt: typeof kdramaUserStatus.updatedAt;
};

export async function fetchAllKdramaWatchStatus({
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
  sort?: FetchAllKdramaWatchStatusSort;
  direction?: "ascending" | "descending";
}): Promise<FetchAllWatchStatusReturnType> {
  const filters = and(
    eq(kdramaUserStatus.userId, userId),
    status.length > 0 ? inArray(kdramaUserStatus.status, status) : undefined,
    query ? ilike(kdrama.title, `%${query}%`) : undefined
  );

  const sortOptions: SortOptions = {
    title: kdrama.title,
    status: kdramaUserStatus.status,
    score: kdramaUserStatus.score,
    updatedAt: kdramaUserStatus.updatedAt,
  };

  const orderBy = sort ? sortOptions[sort] : kdramaUserStatus.updatedAt;
  const directionOrder = direction === "ascending" ? asc : desc;
  const sortQuery = directionOrder(orderBy);

  const [watchListData, totalCount] = await Promise.all([
    db
      .select()
      .from(kdrama)
      .innerJoin(kdramaUserStatus, eq(kdrama.id, kdramaUserStatus.kdramaId))
      .where(filters)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(sortQuery),

    db
      .select({ count: count() })
      .from(kdrama)
      .innerJoin(kdramaUserStatus, eq(kdrama.id, kdramaUserStatus.kdramaId))
      .where(filters),
  ]);

  const watchList: FetchAllWatchStatusReturnType["watchList"] =
    watchListData.map((data) => ({
      id: data.kdrama_user_status.id,
      dataId: data.kdrama.id,
      title: data.kdrama.title,
      image: data.kdrama.image,
      status: data.kdrama_user_status.status,
      score: data.kdrama_user_status.score,
      updatedAt: data.kdrama_user_status.updatedAt,
      href: `/k-drama/info/${data.kdrama.id}`,
    }));

  return {
    watchList,
    totalCount: totalCount[0]?.count || 0,
  };
}
