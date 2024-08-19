"use client";

import "@vidstack/react/player/styles/base.css";

import { Source, TimeLine, Track } from "@/lib/types";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
} from "@vidstack/react";
import { useRef, useState } from "react";

type Props = {
  title?: string;
  poster: string;
  thumbnail?: string;
  captionList: Track[];
  sourceList: Source[];
  intro?: TimeLine;
  outro?: TimeLine;
};

export default function VideoPlayer({
  title,
  poster,
  sourceList,
  captionList,
  thumbnail,
  intro,
  outro,
}: Props) {
  const [source, setSource] = useState<Source>(sourceList[0]);

  return (
    <section className="overflow-hidden relative">
      <MediaPlayer
        aspectRatio="16/9"
        load="visible"
        posterLoad="visible"
        title={title}
        src={source.url}
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        poster={poster}
      >
        <MediaProvider />
      </MediaPlayer>
    </section>
  );
}
