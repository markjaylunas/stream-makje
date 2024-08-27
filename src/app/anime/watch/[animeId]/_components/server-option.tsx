import Text from "@/components/ui/text";
import { ServerOption } from "@/lib/types";
import { Chip } from "@nextui-org/react";
import ServerDropdown from "./server-dropdown";

export type ServerDropdownProps = {
  server: ServerOption;
};

type Props = {
  serverOptionList: ServerOption[];
};

export default function ServerOptions({ serverOptionList }: Props) {
  return (
    <section className="space-y-1 px-4 md:px-0">
      <Text className="text-xs text-foreground-500">
        If current stream server doesn&apos;t work please try other stream
        servers below.
      </Text>

      <div className="flex gap-3 flex-wrap">
        <Text className="text-secondary-500">Servers: </Text>
        {serverOptionList.length > 0 ? (
          serverOptionList.map((server) => (
            <ServerDropdown server={server} key={server.type} />
          ))
        ) : (
          <Chip variant="bordered" color="warning">
            No other servers found!
          </Chip>
        )}
      </div>
    </section>
  );
}
