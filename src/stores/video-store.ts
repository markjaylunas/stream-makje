import { VideoPlayerProps } from "@/components/video-player/video-player";
import { Source } from "@/lib/types";
import { createStore } from "zustand/vanilla";

type PlayerProps = VideoPlayerProps & { source?: Source };

export type VideoState = {
  player: PlayerProps | null;
  isLoading: boolean;
};

export type VideoActions = {
  setPlayer: (player: PlayerProps | null) => void;
  setLoading: (isLoading: boolean) => void;
};

export type VideoStore = VideoState & VideoActions;

export const defaultInitState: VideoState = {
  player: null,
  isLoading: false,
};

export const createVideoStore = (initState: VideoState = defaultInitState) => {
  return createStore<VideoStore>()((set) => ({
    ...initState,

    setPlayer: (params) => set((state) => ({ ...state, player: params })),
    setLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
  }));
};
