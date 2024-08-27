import { fetchAWEpisodeServersData } from "@/actions/aniwatch";
import { animeServerObjectMapper } from "@/lib/object-mapper";
import ServerOptions from "./server-option";

type Props = {
  animeId: string;
  provider: string;
  episodeId: string;
};

export default async function AnimeServerSection({
  animeId,
  provider,
  episodeId,
}: Props) {
  const episodeServersData = await fetchAWEpisodeServersData({
    episodeId: decodeURIComponent(episodeId),
  });

  const serverOptionList = episodeServersData
    ? animeServerObjectMapper({
        serverData: episodeServersData,
        animeId,
        provider,
      })
    : [];
  return <ServerOptions serverOptionList={serverOptionList} />;
}
