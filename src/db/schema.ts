import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

const updatedAt = timestamp("updated_at").defaultNow().notNull();
const createdAt = timestamp("created_at").defaultNow().notNull();
const userIdRef = text("user_id")
  .references(() => users.id)
  .notNull();
const animeIdRef = text("anime_id")
  .references(() => anime.id)
  .notNull();

const kdramaIdRef = text("kdrama_id")
  .references(() => kdrama.id)
  .notNull();

const movieIdRef = text("movie_id")
  .references(() => movie.id)
  .notNull();

export const anime = pgTable("anime", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  cover: text("cover").notNull(),
  updatedAt,
  createdAt,
});

export const kdrama = pgTable("kdrama", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  cover: text("cover").notNull(),
  updatedAt,
  createdAt,
});

export const movie = pgTable("movie", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  cover: text("cover").notNull(),
  updatedAt,
  createdAt,
});

export const episode = pgTable("episode", {
  id: text("id").primaryKey().notNull(),
  animeId: animeIdRef,
  number: integer("number").notNull(),
  title: text("title"),
  image: text("image"),
  durationTime: real("duration_time").notNull(),
  updatedAt,
  createdAt,
});

export const movieEpisode = pgTable("movie-episode", {
  id: text("id").primaryKey().notNull(),
  movieId: movieIdRef,
  number: integer("number").notNull(),
  title: text("title"),
  image: text("image"),
  durationTime: real("duration_time").notNull(),
  updatedAt,
  createdAt,
});

export const kdramaEpisode = pgTable("kdrama-episode", {
  id: text("id").primaryKey().notNull(),
  kdramaId: kdramaIdRef,
  number: integer("number").notNull(),
  title: text("title"),
  image: text("image"),
  durationTime: real("duration_time").notNull(),
  updatedAt,
  createdAt,
});

export const episodeProgress = pgTable(
  "episode_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userIdRef,
    animeId: animeIdRef,
    episodeId: text("episode_id")
      .references(() => episode.id)
      .notNull(),
    provider: text("provider"),
    providerEpisodeId: text("provider_episode_id"),
    currentTime: real("current_time").notNull(),
    isFinished: boolean("is_finished").notNull(),
    updatedAt,
    createdAt,
  },
  (t) => ({
    uniqueAnimeEpisodeProgress: unique("unique_anime_episode_progress").on(
      t.userId,
      t.episodeId
    ),
  })
);

export const kdramaEpisodeProgress = pgTable(
  "kdrama_episode_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userIdRef,
    kdramaId: kdramaIdRef,
    episodeId: text("episode_id")
      .references(() => kdramaEpisode.id)
      .notNull(),
    provider: text("provider"),
    providerEpisodeId: text("provider_episode_id"),
    currentTime: real("current_time").notNull(),
    isFinished: boolean("is_finished").notNull(),
    updatedAt,
    createdAt,
  },
  (t) => ({
    uniqueKdramaEpisodeProgress: unique("unique_kdrama_episode_progress").on(
      t.userId,
      t.episodeId
    ),
  })
);

export const movieEpisodeProgress = pgTable(
  "movie_episode_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userIdRef,
    movieId: movieIdRef,
    episodeId: text("episode_id")
      .references(() => movieEpisode.id)
      .notNull(),
    provider: text("provider"),
    providerEpisodeId: text("provider_episode_id"),
    currentTime: real("current_time").notNull(),
    isFinished: boolean("is_finished").notNull(),
    updatedAt,
    createdAt,
  },
  (t) => ({
    uniqueMovieEpisodeProgress: unique("unique_movie_episode_progress").on(
      t.userId,
      t.episodeId
    ),
  })
);

export const watchStatus = pgEnum("watch_status", [
  "WATCHING",
  "COMPLETED",
  "ON_HOLD",
  "DROPPED",
  "PLAN_TO_WATCH",
]);

export const animeUserStatus = pgTable(
  "anime_user_status",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userIdRef,
    animeId: animeIdRef,
    status: watchStatus("status").default("WATCHING").notNull(),
    score: integer("score").default(0).notNull(),
    updatedAt,
    createdAt,
  },
  (t) => ({
    uniqueAnimeUserStatus: unique("unique_anime_user_status").on(
      t.userId,
      t.animeId
    ),
  })
);

export const kdramaUserStatus = pgTable(
  "kdrama_user_status",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userIdRef,
    kdramaId: kdramaIdRef,
    status: watchStatus("status").default("WATCHING").notNull(),
    score: integer("score").default(0).notNull(),
    updatedAt,
    createdAt,
  },
  (t) => ({
    uniqueKdramaUserStatus: unique("unique_kdrama_user_status").on(
      t.userId,
      t.kdramaId
    ),
  })
);

export const movieUserStatus = pgTable(
  "movie_user_status",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: userIdRef,
    movieId: movieIdRef,
    status: watchStatus("status").default("WATCHING").notNull(),
    score: integer("score").default(0).notNull(),
    updatedAt,
    createdAt,
  },
  (t) => ({
    uniqueMovieUserStatus: unique("unique_movie_user_status").on(
      t.userId,
      t.movieId
    ),
  })
);

export type AnimeInsert = typeof anime.$inferInsert;
export type Anime = typeof anime.$inferSelect;

export type EpisodeInsert = typeof episode.$inferInsert;
export type Episode = typeof episode.$inferSelect;

export type EpisodeProgressInsert = typeof episodeProgress.$inferInsert;
export type EpisodeProgress = typeof episodeProgress.$inferSelect;

export type AnimeUserStatusInsert = typeof animeUserStatus.$inferInsert;
export type AnimeUserStatus = typeof animeUserStatus.$inferSelect;

export type KdramaInsert = typeof kdrama.$inferInsert;
export type Kdrama = typeof kdrama.$inferSelect;

export type KdramaEpisodeInsert = typeof kdramaEpisode.$inferInsert;
export type KdramaEpisode = typeof kdramaEpisode.$inferSelect;

export type KdramaEpisodeProgressInsert =
  typeof kdramaEpisodeProgress.$inferInsert;
export type KdramaEpisodeProgress = typeof kdramaEpisodeProgress.$inferSelect;

export type KdramaUserStatusInsert = typeof kdramaUserStatus.$inferInsert;
export type KdramaUserStatus = typeof kdramaUserStatus.$inferSelect;

export type MovieInsert = typeof movie.$inferInsert;
export type Movie = typeof movie.$inferSelect;

export type MovieEpisodeInsert = typeof movieEpisode.$inferInsert;
export type MovieEpisode = typeof movieEpisode.$inferSelect;

export type MovieEpisodeProgressInsert =
  typeof movieEpisodeProgress.$inferInsert;
export type MovieEpisodeProgress = typeof movieEpisodeProgress.$inferSelect;

export type MovieUserStatusInsert = typeof movieUserStatus.$inferInsert;
export type MovieUserStatus = typeof movieUserStatus.$inferSelect;

export type WatchStatus =
  | "WATCHING"
  | "COMPLETED"
  | "ON_HOLD"
  | "DROPPED"
  | "PLAN_TO_WATCH";
