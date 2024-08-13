"use client";

import {
  MediaLoadedDataEvent,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Menu,
  Poster,
  TimeSlider,
  Tooltip,
  useMediaRemote,
  Track as VidTrack,
} from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { useRef, useState } from "react";

import { Source, TimeLine, Track } from "@/lib/types";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Icons } from "../ui/Icons";

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
  const player = useRef<MediaPlayerInstance>(null);
  const remote = useMediaRemote(player);
  const initialTime = 0;

  const [source, setSource] = useState<Source>(sourceList[0]);
  const [timeBefore, setTimeBefore] = useState<number>(initialTime);

  function onLoadedData(nativeEvent: MediaLoadedDataEvent) {
    setTimeout(() => {
      // if(initialTime) toast("Resuming from where you left off");
      remote.seek(timeBefore - 5, nativeEvent);
      setTimeBefore(0);
      remote.play(nativeEvent);
    }, 2000);
  }

  return (
    <section className="overflow-hidden relative">
      <MediaPlayer
        streamType="on-demand"
        aspectRatio="16/9"
        load="visible"
        posterLoad="visible"
        title={title}
        src={source.url}
        ref={player}
      >
        <MediaProvider>
          <Poster className="vds-poster" src={poster} alt={title} />
          {captionList.length > 0 &&
            captionList.map((caption, captionIdx) => (
              <VidTrack
                key={`${captionIdx}`}
                src={caption.file}
                label={caption.label || ""}
                kind={caption?.kind as TextTrackKind}
                language="en-us"
                type={"vtt"}
                default={Boolean(caption.default)}
              />
            ))}
        </MediaProvider>

        <DefaultAudioLayout icons={defaultLayoutIcons} />

        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          thumbnails={thumbnail}
          slots={{
            timeSlider: (
              <TimeSlider.Root className="vds-time-slider vds-slider">
                <TimeSlider.Track className="vds-slider-track" />
                <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track bg-primary-500" />
                <TimeSlider.Progress className="vds-slider-progress vds-slider-track bg-[#ffffffdf]" />
                <TimeSlider.Thumb className="vds-slider-thumb" />
              </TimeSlider.Root>
            ),

            beforeSettingsMenu:
              sourceList.length > 1 ? (
                <Menu.Root>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Menu.Button className="vds-button w-24 flex items-center  gap-1 mx-1">
                        {source.quality}
                        <Icons.chevronDown className="size-5" />
                      </Menu.Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      className="vds-tooltip-content"
                      placement="top start"
                    >
                      Quality
                    </Tooltip.Content>
                  </Tooltip.Root>
                  <Menu.Content className="vds-menu-items ">
                    <Menu.RadioGroup
                      className="vds-radio-group"
                      value={source.quality || source.type}
                    >
                      {sourceList.map((quality) => (
                        <Menu.Radio
                          className="vds-radio"
                          value={quality.quality || quality.type}
                          onSelect={() => {
                            setTimeBefore(player.current?.currentTime || 0);
                            setSource(quality);
                          }}
                          key={quality.quality}
                        >
                          <span className="vds-radio-label">
                            {quality.quality}
                          </span>
                          <Icons.check className="vds-icon" />
                        </Menu.Radio>
                      ))}
                    </Menu.RadioGroup>
                  </Menu.Content>
                </Menu.Root>
              ) : (
                <></>
              ),
          }}
        />
      </MediaPlayer>
    </section>
  );
}
