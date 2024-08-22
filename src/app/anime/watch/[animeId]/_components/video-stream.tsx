import { fetchEpisodeProgress } from "@/actions/action";
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
import { EpisodeStream, VSAnime, VSEpisode, VSProvider } from "@/lib/types";
import { decodeEpisodeId } from "@/lib/utils";

type VideoStreamProps = {
  provider: VSProvider;
  anime: VSAnime;
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
  const decodedEpisodeId = decodeEpisodeId(episode.id);
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

    episodeProgress = episodeProgressData ? episodeProgressData[0] : null;

    source = episodeSourceData
      ? aniwatchEpisodeStreamObjectMapper(episodeSourceData)
      : null;
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

    episodeProgress = episodeProgressData ? episodeProgressData[0] : null;

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
  const captions = tracks.filter((caption) => caption.kind == "captions");
  const thumbnailList = tracks.filter(
    (caption) => caption.kind == "thumbnails"
  );
  const thumbnail =
    thumbnailList.length > 0 ? thumbnailList[0].file : undefined;

  return (
    <VideoPlayer
      userId={userId}
      anime={anime}
      episode={episode}
      episodeProgress={episodeProgress}
      provider={provider}
      thumbnail={thumbnail}
      sourceList={sources}
      captionList={captions}
      intro={intro}
      outro={outro}
      animeEpisodeId={animeEpisodeId}
    />
  );
}
