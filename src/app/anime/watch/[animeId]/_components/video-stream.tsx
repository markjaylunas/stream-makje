import { fetchAWEpisodeSourceData } from "@/actions/aniwatch";
import { fetchAnimeEpisodeSource } from "@/app/api/consumet-api";
import NoVideo from "@/components/video-player/no-video";
import VideoPlayer from "@/components/video-player/video-player";
import { ANIME_PROVIDER } from "@/lib/constants";
import {
  aniwatchEpisodeStreamObjectMapper,
  metaEpisodeStreamObjectMapper,
} from "@/lib/object-mapper";
import { AnimeProviders, EpisodeStream } from "@/lib/types";
import { decodeEpisodeId } from "@/lib/utils";

type VideoStreamProps = {
  provider: AnimeProviders;
  episodeTitle: string;
  animeImage: string;
  episodeImage: string;
  episodeId: string;
  category?: string;
  server?: string;
};
export default async function VideoStream({
  provider,
  animeImage,
  episodeTitle,
  episodeImage,
  episodeId,
  category,
  server,
}: VideoStreamProps) {
  const decodedEpisodeId = decodeEpisodeId(episodeId);
  let source: EpisodeStream | null = null;

  if (provider === ANIME_PROVIDER.P1) {
    const [episodeSourceData] = await Promise.all([
      fetchAWEpisodeSourceData({
        episodeId: decodedEpisodeId,
        category,
        server,
      }),
    ]);

    source = episodeSourceData
      ? aniwatchEpisodeStreamObjectMapper(episodeSourceData)
      : null;
  }

  if (provider === ANIME_PROVIDER.P2) {
    const [episodeSourceData] = await Promise.all([
      fetchAnimeEpisodeSource({ episodeId }),
    ]);

    source = episodeSourceData
      ? metaEpisodeStreamObjectMapper(episodeSourceData)
      : null;
  }

  if (!source)
    return (
      <NoVideo
        bgSrc={animeImage}
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
  const poster = episodeImage || animeImage;

  return (
    <VideoPlayer
      title={episodeTitle}
      poster={poster}
      thumbnail={thumbnail}
      sourceList={sources}
      captionList={captions}
      intro={intro}
      outro={outro}
    />
  );
}
