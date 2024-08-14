import { SvgIcon } from "@/components/ui/svg-icons";
import Text from "@/components/ui/text";
import { Button, Skeleton } from "@nextui-org/react";
import NextLink from "next/link";
import { Suspense } from "react";
import ServerList from "./server-list";

type Props = {
  animeId: string;
  episodeId: string;
};

export default function Control({ animeId, episodeId }: Props) {
  return (
    <div className="flex flex-col w-full gap-2 px-4 md:px-0">
      <Text className="text-xs text-foreground-500">
        If current stream server doesn&apos;t work please try other stream
        servers below.
      </Text>

      <section className="flex justify-between flex-col sm:flex-row w-full gap-4">
        <Suspense fallback={<Skeleton className=" w-full rounded-xl" />}>
          <ServerList episodeId={episodeId} />
        </Suspense>
      </section>
    </div>
  );
}
