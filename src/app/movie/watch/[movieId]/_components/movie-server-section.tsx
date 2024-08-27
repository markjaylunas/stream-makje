import { fetchMovieEpisodeServer } from "@/actions/consumet";
import ServerOptions from "@/app/anime/watch/[animeId]/_components/server-option";
import {
  animeServerObjectMapper,
  movieServerObjectMapper,
} from "@/lib/object-mapper";

type Props = {
  movieId: string;
  episodeId: string;
  episodeNumber: string;
};

export default async function MovieServerSection({
  movieId,
  episodeId,
  episodeNumber,
}: Props) {
  const episodeServersData = await fetchMovieEpisodeServer({
    episodeId: decodeURIComponent(episodeId),
    mediaId: movieId,
  });

  const serverOptionList = episodeServersData
    ? movieServerObjectMapper({
        serverData: episodeServersData,
        movieId,
        episodeId,
        episodeNumber,
      })
    : [];
  return <ServerOptions serverOptionList={serverOptionList} />;
}
