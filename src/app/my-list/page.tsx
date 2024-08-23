import {
  fetchAllWatchStatus,
  FetchAllWatchStatusSort,
} from "@/actions/anime-action";
import { auth } from "@/auth";
import NotSignedIn from "@/components/ui/not-signed-in";
import { WatchStatus } from "@/db/schema";
import { ASContentType, SearchParams } from "@/lib/types";
import WatchListTable from "./_components/table";

export default async function MyListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const query =
    typeof searchParams?.query === "string" ? searchParams?.query : "";
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;
  const limit =
    typeof searchParams?.limit === "string"
      ? parseInt(searchParams?.limit) || 10
      : 10;
  const sort =
    typeof searchParams?.sort === "string" ? searchParams?.sort : "title";
  const direction =
    typeof searchParams?.direction === "string"
      ? searchParams?.direction || "descending"
      : "descending";

  let statusListParams: string[];
  if (Array.isArray(searchParams?.status)) {
    statusListParams = searchParams.status;
  } else if (typeof searchParams?.status === "string") {
    statusListParams = [searchParams.status];
  } else {
    statusListParams = [
      "watching",
      "completed",
      "on-hold",
      "dropped",
      "plan-to-watch",
    ];
  }

  let contentTypeListParams: string[];
  if (Array.isArray(searchParams?.contentType)) {
    contentTypeListParams = searchParams.contentType;
  } else if (typeof searchParams?.contentType === "string") {
    contentTypeListParams = [searchParams.contentType];
  } else {
    contentTypeListParams = ["ALL"];
  }

  const status = statusListParams.map(
    (status) => status.toUpperCase().split("-").join("_") as WatchStatus
  );
  const contentType = contentTypeListParams.map(
    (type) => type.toUpperCase() as ASContentType
  );

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return <NotSignedIn />;

  const watchListData = await fetchAllWatchStatus({
    userId,
    page,
    limit,
    status,
    query,
    sort: sort as FetchAllWatchStatusSort,
    direction: direction as "ascending" | "descending",
    contentType,
  });
  console.log(watchListData.watchList[watchListData.watchList.length - 1]);

  return (
    <>
      <WatchListTable
        watchListData={watchListData}
        filters={{
          contentType,
          query,
          page,
          limit,
          status: statusListParams,
        }}
      />
    </>
  );
}
