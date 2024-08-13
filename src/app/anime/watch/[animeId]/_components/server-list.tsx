import { fetchAWEpisodeServersData } from "@/actions/aniwatch";
import Text from "@/components/ui/text";
import { decodeEpisodeId } from "@/lib/utils";
import { Chip } from "@nextui-org/react";
import ServerDropdown from "./server-dropdown";

type Props = {
  episodeId: string;
};

export default async function ServerList({ episodeId }: Props) {
  const episodeServersData = await fetchAWEpisodeServersData({
    episodeId: decodeEpisodeId(episodeId),
  });

  if (!episodeServersData)
    return (
      <Chip variant="bordered" color="warning">
        No other servers found!
      </Chip>
    );
  const serverOptionList = [
    { type: "sub", list: episodeServersData?.sub || [] },
    { type: "dub", list: episodeServersData?.dub || [] },
    { type: "raw", list: episodeServersData?.raw || [] },
  ].filter((server) => server.list.length > 0);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-3 flex-wrap">
        <Text className="text-secondary-500">Servers: </Text>

        {serverOptionList.length > 0 ? (
          serverOptionList.map((server) => (
            <ServerDropdown server={server} key={server.type} />
          ))
        ) : (
          <Chip color="default" variant="bordered">
            No Other Server
          </Chip>
        )}
      </div>
    </section>
  );
}
