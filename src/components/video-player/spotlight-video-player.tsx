import { cn } from "@/lib/utils";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { RefObject } from "react";

type Props = {
  onPlay: () => void;
  onEnd: () => void;
  isPlaying?: boolean;
  isMuted?: boolean;
  src: string;
  className?: string;
  player: RefObject<MediaPlayerInstance>;
};

export default function SpotlightVideoPlayer({
  onPlay,
  onEnd,
  isPlaying = false,
  isMuted = false,
  src,
  className,
  player,
}: Props) {
  return (
    <div className={cn(className)}>
      <MediaPlayer
        autoPlay
        src={src}
        controls={false}
        paused={!isPlaying}
        muted={isMuted}
        ref={player}
        onPlay={onPlay}
        onEnd={onEnd}
      >
        <MediaProvider />
        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}
