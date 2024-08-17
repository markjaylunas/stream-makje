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
  isMuted?: boolean;
  src: string;
  className?: string;
  player: RefObject<MediaPlayerInstance>;
};

export default function SpotlightVideoPlayer({
  isMuted = false,
  src,
  className,
  player,
}: Props) {
  return (
    <div className={cn("relative", className)}>
      <MediaPlayer
        autoPlay
        src={src}
        controls={false}
        muted={isMuted}
        playsInline
        fullscreenOrientation="portrait"
        ref={player}
        onEnd={() => {
          player.current?.play();
          setTimeout(() => player.current?.pause(), 12000);
        }}
        className="z-0"
      >
        <MediaProvider />
        <DefaultAudioLayout
          className="sr-only hidden"
          icons={defaultLayoutIcons}
        />
        <DefaultVideoLayout
          className="sr-only hidden"
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>
    </div>
  );
}
