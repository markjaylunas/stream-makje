import { fetchPopularKdramaData } from "@/actions/consumet";
import CardCarouselList from "@/components/card-data/card-carousel-list";
import { consumetKDramacoolObjectMapper } from "@/lib/object-mapper";

export default async function KDramaPopularCarouselList() {
  const data = await fetchPopularKdramaData();

  if (!data) throw new Error("Failed to fetch (Kdrama List) data");

  const kdramaList = consumetKDramacoolObjectMapper({
    kdramaList: data.results,
  });

  return <CardCarouselList infoList={kdramaList} />;
}
