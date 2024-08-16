"use client";

import { useState } from "react";
import { CardDataProps } from "./card-data";
import CardSpotlight from "./card-spotlight";

type Props = {
  infoList: CardDataProps[];
};

export default function SpotlightList({ infoList }: Props) {
  const [spotlight, setSpotlight] = useState<CardDataProps>(infoList[0]);

  return (
    <div>
      <CardSpotlight {...spotlight} />
    </div>
  );
}
