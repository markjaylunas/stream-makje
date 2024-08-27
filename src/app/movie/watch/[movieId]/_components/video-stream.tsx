import { fetchMovieEpisodeSource } from "@/actions/consumet";
import { fetchMovieEpisodeProgress } from "@/actions/movie-action";
import { auth } from "@/auth";
import NoVideo from "@/components/video-player/no-video";
import VideoPlayer from "@/components/video-player/video-player";
import { MovieEpisodeProgress } from "@/db/schema";
import { consumetMovieEpisodeStreamObjectMapper } from "@/lib/object-mapper";
import { EpisodeStream, VSEpisode, VSInfo } from "@/lib/types";

type VideoStreamProps = {
  movie: VSInfo;
  episode: VSEpisode;
  server?: string;
};

export type UpdateProgressInput = {
  currentTime: number;
  durationTime: number;
  pathname: string;
};

export default async function VideoStream({
  movie,
  episode,
  server,
}: VideoStreamProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const decodedEpisodeId = decodeURIComponent(episode.id);
  const infoEpisodeId = `${movie.id}-${episode.number}`;
  const movieEpisodeId = `${movie.id}-${episode.number}`;
  let source: EpisodeStream | null = null;
  let episodeProgress: MovieEpisodeProgress | null = null;

  const [episodeSourceData, episodeProgressData] = await Promise.all([
    fetchMovieEpisodeSource({
      episodeId: decodedEpisodeId,
      mediaId: movie.id,
      server,
    }),
    userId
      ? await fetchMovieEpisodeProgress({
          userId,
          movieId: movie.id,
          episodeId: movieEpisodeId,
        })
      : null,
  ]);

  episodeProgress = episodeProgressData ? episodeProgressData[0] : null;

  source = episodeSourceData
    ? consumetMovieEpisodeStreamObjectMapper(episodeSourceData)
    : null;

  if (!source)
    return (
      <NoVideo
        bgSrc={movie.image}
        title={`No source found`}
        description="Please try other stream servers below ⬇️"
      />
    );

  const { tracks, sources } = source;
  const captions = tracks.filter((caption) => caption.kind == "captions");

  return (
    <VideoPlayer
      contentType="movie"
      userId={userId}
      info={movie}
      episode={episode}
      episodeProgress={episodeProgress}
      provider={{ episodeId: episode.id, name: "provider_1" }}
      sourceList={sources}
      captionList={captions}
      infoEpisodeId={infoEpisodeId}
    />
  );
}
