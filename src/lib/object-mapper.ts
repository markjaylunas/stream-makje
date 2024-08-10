import { AnimeSortedSchema } from "@/api/consumet-validations";
import { CardInfo } from "./types";
import { pickTitle } from "./utils";

export const metaAnimeObjectMapper = (
  animeList: AnimeSortedSchema[],
  { isRanked = false }
): CardInfo[] =>
  animeList.map((anime, animeIdx) => {
    return {
      id: anime.id,
      name: pickTitle(anime.title),
      image: anime.image,
      cover: anime.cover ? anime.cover : undefined,
      rank: isRanked ? animeIdx + 1 : undefined,
      other: [],
    };
  });
