"use client";

import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";

import {
  upsertEpisodeProgress,
  UpsertEpisodeProgressData,
} from "@/actions/anime-action";
import {
  upsertKdramaEpisodeProgress,
  UpsertKdramaEpisodeProgressData,
} from "@/actions/kdrama-action";
import { EpisodeProgress, KdramaEpisodeProgress } from "@/db/schema";
import {
  ContentType,
  Source,
  TimeLine,
  Track,
  VSEpisode,
  VSInfo,
  VSProvider,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  MediaLoadedDataEvent,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Menu,
  Poster,
  TimeSlider,
  ToggleButton,
  useMediaRemote,
  Track as VidTrack,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useRef, useState } from "react";
import MyLink from "../ui/my-link";
import { SvgIcon } from "../ui/svg-icons";

type Props = {
  contentType: ContentType;
  info: VSInfo;
  episode: VSEpisode;
  thumbnail?: string;
  captionList: Track[];
  sourceList: Source[];
  intro?: TimeLine;
  outro?: TimeLine;
  userId?: string;
  episodeProgress: EpisodeProgress | KdramaEpisodeProgress | null;
  provider: VSProvider;
  infoEpisodeId: string;
  download?: string;
};

export default function VideoPlayer({
  contentType,
  userId,
  sourceList,
  captionList,
  thumbnail,
  intro,
  outro,
  episodeProgress: initialEpisodeProgress,
  info,
  episode,
  provider,
  infoEpisodeId,
  download,
}: Props) {
  const player = useRef<MediaPlayerInstance>(null);
  const remote = useMediaRemote(player);
  const progressTime = initialEpisodeProgress?.currentTime || 0;
  const [source, setSource] = useState<Source>(sourceList[0]);
  const [timeBefore, setTimeBefore] = useState<number>(progressTime || 0);
  const [canSkip, setCanSkip] = useState<"intro" | "outro" | null>(null);
  const [episodeProgress, setEpisodeProgress] = useState(
    initialEpisodeProgress
  );

  function onLoadedData(nativeEvent: MediaLoadedDataEvent) {
    setTimeout(() => {
      remote.seek(timeBefore - 5, nativeEvent);
      setTimeBefore(0);
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

  const handleInsertAnimeProgress = async ({
    userId,
    currentTime,
    durationTime,
  }: {
    userId: string;
    currentTime: number;
    durationTime: number;
  }) => {
    const data: UpsertEpisodeProgressData = {
      anime: {
        id: info.id,
        title: info.title,
        image: info.image,
        cover: info.cover || "",
      },
      episode: {
        id: infoEpisodeId,
        animeId: info.id,
        number: episode.number,
        title: episode.title,
        image: episode.image,
        durationTime,
      },
      episodeProgress: {
        id: episodeProgress?.id,
        userId,
        animeId: info.id,
        episodeId: infoEpisodeId,
        currentTime,
        isFinished: currentTime / durationTime > 0.9,
        provider: provider.name,
        providerEpisodeId: provider.episodeId,
      },
    };
    const progress = await upsertEpisodeProgress({ data });
    setEpisodeProgress(progress);
  };

  const handleInsertKdramaProgress = async ({
    userId,
    currentTime,
    durationTime,
  }: {
    userId: string;
    currentTime: number;
    durationTime: number;
  }) => {
    const data: UpsertKdramaEpisodeProgressData = {
      kdrama: {
        id: info.id,
        title: info.title,
        image: info.image,
        cover: info.cover || "",
      },
      kdramaEpisode: {
        id: infoEpisodeId,
        kdramaId: info.id,
        number: episode.number,
        title: episode.title,
        image: episode.image,
        durationTime,
      },
      kdramaEpisodeProgress: {
        id: episodeProgress?.id,
        userId,
        kdramaId: info.id,
        episodeId: infoEpisodeId,
        currentTime,
        isFinished: currentTime / durationTime > 0.9,
        provider: provider.name,
        providerEpisodeId: provider.episodeId,
      },
    };
    const progress = await upsertKdramaEpisodeProgress({ data });
    setEpisodeProgress(progress);
  };

  const handleProgress = (isSeeked = false) => {
    const currentTime = Math.floor(player.current?.currentTime || 0);
    const durationTime = player.current?.duration;

    if (intro && currentTime >= intro.start && currentTime <= intro.end)
      setCanSkip("intro");
    else if (outro && currentTime >= outro.start && currentTime <= outro.end)
      setCanSkip("outro");
    else setCanSkip(null);

    if (!userId) return;
    if (!currentTime || !durationTime) return;
    const episodeProgressTime = episodeProgress?.currentTime || 0;
    if (currentTime < episodeProgressTime + 30 && !isSeeked) return;

    if (contentType === "anime")
      handleInsertAnimeProgress({ userId, currentTime, durationTime });
    if (contentType === "k-drama")
      handleInsertKdramaProgress({ userId, currentTime, durationTime });
  };

  return (
    <section className="overflow-hidden relative">
      <MediaPlayer
        aspectRatio="16/9"
        load="visible"
        posterLoad="visible"
        title={episode.title || info.title}
        src={source.url}
        ref={player}
        viewType="video"
        streamType="on-demand"
        crossOrigin
        playsInline
        onLoadedData={onLoadedData}
        onSeeked={() => handleProgress(true)}
        onEnded={() => handleProgress(true)}
        onProgress={() => handleProgress()}
        className="relative"
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src={episode.image || info.cover || info.image}
            alt={info.title}
          />
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
            downloadButton: (
              <>
                {download && (
                  <MyLink href={download} target="_blank">
                    <ToggleButton className="vds-button">
                      <SvgIcon.download className="size-5" />{" "}
                      <span className="sr-only">Download</span>
                    </ToggleButton>
                  </MyLink>
                )}
              </>
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
                      "vds-button w-20 hidden",
                      canSkip === "intro" && "inline-block"
                    )}
                    onClick={handleSkipIntro}
                  >
                    Skip Intro
                  </ToggleButton>
                )}
                {outro && (
                  <ToggleButton
                    className={cn(
                      "vds-button w-20 hidden",
                      canSkip === "outro" && "inline-block"
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
