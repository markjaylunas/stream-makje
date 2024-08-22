import { fetchPopularKdramaData } from "@/actions/consumet";
import CardList from "@/components/card-data/card-list";
import { consumetDramacoolObjectMapper } from "@/lib/object-mapper";

export default async function KDramaPopularList() {
  const data = await fetchPopularKdramaData();

  if (!data) throw new Error("Failed to fetch (Kdrama List) data");

  const kdramaList = consumetDramacoolObjectMapper({
    kdramaList: data.results,
  });

  return (
    <CardList
      infoList={kdramaList}
      className="max-w-screen-2xl mx-auto px-2 lg:px-8"
    />
  );
}
