"use client";

import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";

import {
  upsertEpisodeProgress,
  UpsertEpisodeProgressData,
} from "@/actions/action";
import { EpisodeProgress } from "@/db/schema";
import {
  Source,
  TimeLine,
  Track,
  VSAnime,
  VSEpisode,
  VSProvider,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaPlayEvent,
  MediaPlayingEvent,
  MediaProvider,
  Menu,
  TimeSlider,
  ToggleButton,
  useMediaRemote,
  useMediaStore,
  Track as VidTrack,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useEffect, useRef, useState } from "react";
import { SvgIcon } from "../ui/svg-icons";

type Props = {
  anime: VSAnime;
  episode: VSEpisode;
  thumbnail?: string;
  captionList: Track[];
  sourceList: Source[];
  intro?: TimeLine;
  outro?: TimeLine;
  userId?: string;
  episodeProgress: EpisodeProgress | null;
  provider: VSProvider;
  animeEpisodeId: string;
};

export default function VideoPlayer({
  userId,
  sourceList,
  captionList,
  thumbnail,
  intro,
  outro,
  episodeProgress,
  anime,
  episode,
  provider,
  animeEpisodeId,
}: Props) {
  const player = useRef<MediaPlayerInstance>(null);
  const remote = useMediaRemote(player);

  const { currentTime } = useMediaStore(player);
  const progressTime = episodeProgress?.currentTime || 0;
  const [source, setSource] = useState<Source>(sourceList[0]);
  const [canNext, setCanNext] = useState(false);
  const [timeBefore, setTimeBefore] = useState<number>(progressTime || 0);

  function onPlay(nativeEvent: MediaPlayEvent) {
    setTimeout(() => {
      // if(initialTime) toast("Resuming from where you left off");
      remote.seek(timeBefore - 5, nativeEvent);
      setTimeBefore(0);
      remote.play(nativeEvent);
    }, 1000);
  }

  const handleSkipIntro = () => {
    if (!intro) return;
    remote.seek(intro.end - 3);
  };
  const handleSkipOutro = () => {
    if (!outro) return;
    remote.seek(outro.end - 3);
  };

  useEffect(() => {
    return () => {
      const currentTime = player.current?.currentTime || 0;
      const durationTime = player.current?.duration || 0;
      if (userId && currentTime && currentTime > 10) {
        let data: UpsertEpisodeProgressData = {
          anime: {
            id: anime.id,
            title: anime.title,
            image: anime.image,
            cover: anime.cover || "",
          },
          episode: {
            id: animeEpisodeId,
            animeId: anime.id,
            number: episode.number,
            title: episode.title,
            image: episode.image,
            durationTime,
          },
          episodeProgress: {
            id: episodeProgress?.id,
            userId,
            animeId: anime.id,
            episodeId: animeEpisodeId,
            currentTime,
            isFinished: currentTime / durationTime > 0.9,
            provider: provider.name,
            providerEpisodeId: provider.episodeId,
          },
        };
        upsertEpisodeProgress({ data });
      }
    };
  }, []);
  return (
    <section className="overflow-hidden relative">
      <MediaPlayer
        aspectRatio="16/9"
        load="visible"
        posterLoad="visible"
        title={episode.title || anime.title}
        src={source.url}
        ref={player}
        viewType="video"
        streamType="on-demand"
        crossOrigin
        playsInline
        poster={episode.image || anime.cover || anime.image}
        onPlay={onPlay}
        className="relative"
      >
        <MediaProvider>
          {/* <Poster className="vds-poster" src={poster} alt={title} /> */}
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
            beforeSettingsMenuEndItems: (
              <Menu.Root>
                <Menu.Button
                  className="vds-menu-item"
                  disabled={sourceList.length <= 1}
                >
                  <SvgIcon.image className="vds-menu-icon" />
                  <span className="vds-menu-item-label ml-2">Quality</span>
                  <span className="vds-menu-item-hint">{source.quality}</span>
                  <SvgIcon.chevronRight className="vds-menu-open-icon size-4" />
                </Menu.Button>
                <Menu.Content className="vds-menu-items">
                  <Menu.RadioGroup
                    className="vds-radio-group"
                    value={source.quality || ""}
                  >
                    {sourceList.map((currSource) => (
                      <Menu.Radio
                        className="vds-radio"
                        value={currSource.quality || ""}
                        onSelect={() => {
                          setTimeBefore(player.current?.currentTime || 0);
                          setSource(currSource);
                        }}
                        key={currSource.quality || ""}
                      >
                        <SvgIcon.check className="vds-icon" />
                        <span className="vds-radio-label">
                          {currSource.quality}
                        </span>
                      </Menu.Radio>
                    ))}
                  </Menu.RadioGroup>
                </Menu.Content>
              </Menu.Root>
            ),
            beforeCurrentTime: (
              <>
                {intro && (
                  <ToggleButton
                    className={cn(
                      "vds-button w-20",
                      currentTime >= intro.start && currentTime <= intro.end
                        ? ""
                        : "hidden"
                    )}
                    onClick={handleSkipIntro}
                  >
                    Skip Intro
                  </ToggleButton>
                )}
                {outro && (
                  <ToggleButton
                    className={cn(
                      "vds-button w-20",
                      currentTime >= outro.start && currentTime <= outro.end
                        ? ""
                        : "hidden"
                    )}
                    onClick={handleSkipOutro}
                  >
                    Skip Outro
                  </ToggleButton>
                )}
              </>
            ),
          }}
        />
      </MediaPlayer>
    </section>
  );
}
