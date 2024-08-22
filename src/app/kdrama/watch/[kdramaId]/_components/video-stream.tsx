import { fetchDCEpisodeSourceData } from "@/actions/consumet";
import { auth } from "@/auth";
import NoVideo from "@/components/video-player/no-video";
import VideoPlayer from "@/components/video-player/video-player";
import { EpisodeProgress } from "@/db/schema";
import { consumetKdramaEpisodeStreamObjectMapper } from "@/lib/object-mapper";
import { EpisodeStream, VSEpisode, VSInfo } from "@/lib/types";
import { decodeEpisodeId } from "@/lib/utils";

type VideoStreamProps = {
  kdrama: VSInfo;
  episode: VSEpisode;
};

export type UpdateProgressInput = {
  currentTime: number;
  durationTime: number;
  pathname: string;
};

export default async function VideoStream({
  kdrama,
  episode,
}: VideoStreamProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const decodedEpisodeId = decodeEpisodeId(episode.id);
  const infoEpisodeId = `${kdrama.id}-${episode.number}`;
  // const kdramaEpisodeId = `${kdrama.id}-${episode.number}`;
  let source: EpisodeStream | null = null;
  let episodeProgress: EpisodeProgress | null = null;

  const [
    episodeSourceData,
    // episodeProgressData
  ] = await Promise.all([
    fetchDCEpisodeSourceData({
      episodeId: decodedEpisodeId,
    }),
    // userId
    //   ? await fetchEpisodeProgress({
    //       userId,
    //       animeId: anime.id,
    //       episodeId: animeEpisodeId,
    //     })
    //   : null,
  ]);

  // episodeProgress = episodeProgressData ? episodeProgressData[0] : null;

  source = episodeSourceData
    ? consumetKdramaEpisodeStreamObjectMapper(episodeSourceData)
    : null;

  if (!source)
    return (
      <NoVideo bgSrc={kdrama.cover || kdrama.image} title={`No source found`} />
    );
  const { sources } = source;

  return (
    <VideoPlayer
      type="kdrama"
      userId={userId}
      info={kdrama}
      episode={episode}
      episodeProgress={episodeProgress}
      provider={{ episodeId: episode.id, name: "provider_1" }}
      sourceList={sources}
      captionList={[]}
      infoEpisodeId={infoEpisodeId}
    />
  );
}