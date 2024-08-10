import { animeAPIQuery } from "@/api/consumet-api";
import { animeSortedDataSchema } from "@/api/consumet-validations";

export async function fetchPopularAnimeData({
  page = 1,
  perPage = 20,
}: {
  page?: number;
  perPage?: number;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.popular({ page, perPage }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();
    const parsed = animeSortedDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
