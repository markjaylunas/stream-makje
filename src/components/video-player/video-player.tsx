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
import {
  upsertMovieEpisodeProgress,
  UpsertMovieEpisodeProgressData,
} from "@/actions/movie-action";
import {
  EpisodeProgress,
  KdramaEpisodeProgress,
  MovieEpisodeProgress,
} from "@/db/schema";
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
import { useVideoStore } from "@/providers/video-store-provider";
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
import { useEffect, useRef, useState } from "react";
import MyLink from "../ui/my-link";
import { SvgIcon } from "../ui/svg-icons";

export type VideoPlayerProps = {
  contentType: ContentType;
  info: VSInfo;
  episode: VSEpisode;
  trackList: Track[];
  sourceList: Source[];
  intro?: TimeLine;
  outro?: TimeLine;
  userId?: string;
  episodeProgress:
    | EpisodeProgress
    | KdramaEpisodeProgress
    | MovieEpisodeProgress
    | null;
  provider: VSProvider;
  infoEpisodeId: string;
  download?: string;
};

export default function VideoPlayer(videoPlayer: VideoPlayerProps) {
  const { player: vPS, setPlayer } = useVideoStore((state) => state);
  console.log(vPS);

  const player = useRef<MediaPlayerInstance>(null);
  const remote = useMediaRemote(player);
  const captionList = vPS
    ? vPS.trackList.filter((track) => track.kind == "captions")
    : [];
  const [timeBefore, setTimeBefore] = useState<number>(0);
  const [canSkip, setCanSkip] = useState<"intro" | "outro" | null>(null);

  function onLoadedData(nativeEvent: MediaLoadedDataEvent) {
    setTimeout(() => {
      remote.seek(timeBefore - 5, nativeEvent);
      setTimeBefore(0);
    }, 1000);
  }

  const handleSkipIntro = () => {
    if (!vPS?.intro) return;
    remote.seek(vPS?.intro.end - 3);
  };

  const handleSkipOutro = () => {
    if (!vPS?.outro) return;
    remote.seek(vPS?.outro.end - 3);
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
    if (!vPS) return;
    const { info, infoEpisodeId, episode, provider } = vPS;
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
        id: vPS.episodeProgress?.id,
        userId,
        animeId: info.id,
        episodeId: infoEpisodeId,
        currentTime,
        isFinished: currentTime / durationTime > 0.9,
        provider: provider.name,
        providerEpisodeId: provider.episodeId,
      },
    };
    const progressData = await upsertEpisodeProgress({ data });
    setPlayer({ ...vPS, episodeProgress: progressData });
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
    if (!vPS) return;
    const { info, infoEpisodeId, episode, provider } = vPS;
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
        id: vPS.episodeProgress?.id,
        userId,
        kdramaId: info.id,
        episodeId: infoEpisodeId,
        currentTime,
        isFinished: currentTime / durationTime > 0.9,
        provider: provider.name,
        providerEpisodeId: provider.episodeId,
      },
    };
    const progressData = await upsertKdramaEpisodeProgress({ data });
    setPlayer({ ...vPS, episodeProgress: progressData });
  };

  const handleInsertMovieProgress = async ({
    userId,
    currentTime,
    durationTime,
  }: {
    userId: string;
    currentTime: number;
    durationTime: number;
  }) => {
    if (!vPS) return;
    const { info, infoEpisodeId, episode, provider } = vPS;
    const data: UpsertMovieEpisodeProgressData = {
      movie: {
        id: info.id,
        title: info.title,
        image: info.image,
        cover: info.cover || "",
      },
      movieEpisode: {
        id: infoEpisodeId,
        movieId: info.id,
        number: episode.number,
        title: episode.title,
        image: episode.image,
        durationTime,
      },
      movieEpisodeProgress: {
        id: vPS.episodeProgress?.id,
        userId,
        movieId: info.id,
        episodeId: infoEpisodeId,
        currentTime,
        isFinished: currentTime / durationTime > 0.9,
        provider: provider.name,
        providerEpisodeId: provider.episodeId,
      },
    };
    const progressData = await upsertMovieEpisodeProgress({ data });
    setPlayer({ ...vPS, episodeProgress: progressData });
  };

  const handleProgress = (isSeeked = false) => {
    const currentTime = Math.floor(player.current?.currentTime || 0);
    const durationTime = player.current?.duration;

    if (!vPS) return;
    const { intro, outro, userId, contentType } = vPS;
    if (intro && currentTime >= intro.start && currentTime <= intro.end)
      setCanSkip("intro");
    else if (outro && currentTime >= outro.start && currentTime <= outro.end)
      setCanSkip("outro");
    else setCanSkip(null);

    if (!userId) return;
    if (!currentTime || !durationTime) return;
    const episodeProgressTime = vPS?.episodeProgress?.currentTime || 0;
    if (currentTime < episodeProgressTime + 30 && !isSeeked) return;

    if (contentType === "anime")
      handleInsertAnimeProgress({ userId, currentTime, durationTime });
    if (contentType === "k-drama")
      handleInsertKdramaProgress({ userId, currentTime, durationTime });
    if (contentType === "movie")
      handleInsertMovieProgress({ userId, currentTime, durationTime });
  };

  useEffect(() => {
    if (videoPlayer) {
      if (videoPlayer.episodeProgress) {
        setTimeBefore(videoPlayer.episodeProgress.currentTime);
      } else {
        setTimeBefore(0);
      }
      setPlayer({
        ...videoPlayer,
        source: videoPlayer.sourceList[0],
      });
      console.log(videoPlayer);
    }
  }, [videoPlayer]);

  return (
    <section className="overflow-hidden relative">
      <MediaPlayer
        aspectRatio="16/9"
        load="visible"
        posterLoad="visible"
        title={vPS?.episode.title || vPS?.info.title}
        src={vPS?.source?.url}
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
            src={vPS?.episode.image || vPS?.info.cover || vPS?.info.image}
            alt={vPS?.info.title}
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
                {vPS?.download && (
                  <MyLink href={vPS?.download} target="_blank">
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
                  disabled={
                    vPS?.sourceList ? vPS?.sourceList?.length <= 1 : true
                  }
                >
                  <SvgIcon.image className="vds-menu-icon" />
                  <span className="vds-menu-item-label ml-2">Quality</span>
                  <span className="vds-menu-item-hint">
                    {vPS?.source?.quality}
                  </span>
                  <SvgIcon.chevronRight className="vds-menu-open-icon size-4" />
                </Menu.Button>
                <Menu.Content className="vds-menu-items">
                  <Menu.RadioGroup
                    className="vds-radio-group"
                    value={vPS?.source?.quality || ""}
                  >
                    {vPS?.sourceList.map((currSource) => (
                      <Menu.Radio
                        className="vds-radio"
                        value={currSource.quality || ""}
                        onSelect={() => {
                          setTimeBefore(player.current?.currentTime || 0);
                          if (vPS) {
                            setPlayer({
                              ...vPS,
                              source: currSource ? currSource : undefined,
                            });
                          }
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
                {vPS?.intro && (
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
                {vPS?.outro && (
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
