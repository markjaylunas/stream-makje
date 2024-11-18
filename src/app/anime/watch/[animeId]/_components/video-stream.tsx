import { fetchEpisodeProgress } from "@/actions/anime-action";
import { fetchAWEpisodeSourceData } from "@/actions/aniwatch";
import { fetchAnimeEpisodeSource } from "@/actions/consumet";
import { auth } from "@/auth";
import NoVideo from "@/components/video-player/no-video";
import VideoPlayer from "@/components/video-player/video-player";
import { EpisodeProgress } from "@/db/schema";
import { ANIME_PROVIDER } from "@/lib/constants";
import {
  aniwatchEpisodeStreamObjectMapper,
  metaEpisodeStreamObjectMapper,
} from "@/lib/object-mapper";
import { EpisodeStream, VSEpisode, VSInfo, VSProvider } from "@/lib/types";

type VideoStreamProps = {
  provider: VSProvider;
  anime: VSInfo;
  episode: VSEpisode;
  category?: string;
  server?: string;
};

export type UpdateProgressInput = {
  currentTime: number;
  durationTime: number;
  pathname: string;
};

export default async function VideoStream({
  provider,
  anime,
  episode,
  category,
  server,
}: VideoStreamProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const decodedEpisodeId = decodeURIComponent(episode.id);
  const animeEpisodeId = `${anime.id}-${episode.number}`;
  let source: EpisodeStream | null = null;
  let episodeProgress: EpisodeProgress | null = null;

  if (provider.name === ANIME_PROVIDER.P1) {
    const [episodeSourceData, episodeProgressData] = await Promise.all([
      fetchAWEpisodeSourceData({
        episodeId: decodedEpisodeId,
        category,
        server,
      }),
      userId
        ? await fetchEpisodeProgress({
            userId,
            animeId: anime.id,
            episodeId: animeEpisodeId,
          })
        : null,
    ]);

    episodeProgress = episodeProgressData;

    if (category !== "raw" && !episodeSourceData) {
      const rawSourceData = await fetchAWEpisodeSourceData({
        episodeId: decodedEpisodeId,
        server: "hd-1",
        category: "raw",
      });

      source = rawSourceData
        ? aniwatchEpisodeStreamObjectMapper(rawSourceData)
        : null;
    } else {
      source = episodeSourceData
        ? aniwatchEpisodeStreamObjectMapper(episodeSourceData)
        : null;
    }
  }

  if (provider.name === ANIME_PROVIDER.P2) {
    const [episodeSourceData, episodeProgressData] = await Promise.all([
      fetchAnimeEpisodeSource({ episodeId: episode.id }),
      userId
        ? await fetchEpisodeProgress({
            userId,
            animeId: anime.id,
            episodeId: animeEpisodeId,
          })
        : null,
    ]);

    episodeProgress = episodeProgressData;

    source = episodeSourceData
      ? metaEpisodeStreamObjectMapper(episodeSourceData)
      : null;
  }

  if (!source)
    return (
      <NoVideo
        bgSrc={anime.image}
        title={`No source found`}
        description="Please try other stream servers below ⬇️"
      />
    );
  const { tracks, sources, intro, outro } = source;

  return (
    <VideoPlayer
      contentType="anime"
      userId={userId}
      info={anime}
      episode={episode}
      episodeProgress={episodeProgress}
      provider={provider}
      sourceList={sources}
      trackList={tracks}
      intro={intro}
      outro={outro}
      infoEpisodeId={animeEpisodeId}
    />
  );
}
