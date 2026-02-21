import React, { createContext, useCallback, useMemo } from "react";
import type { Video } from "../types";

type VideoContextValue = {
  videoSelected: Video | null;
  setVideoSelected: (video: Video) => void;
  clearSelectedVideo: () => void;
};

const VideoContext = createContext<VideoContextValue | null>(null);

export const VideoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [videoSelected, setVideoSelected] = React.useState<Video | null>(() => {
    const storedVideo = localStorage.getItem("videoSelected");
    return storedVideo ? (JSON.parse(storedVideo) as Video) : null;
  });

  const handleSelectedVideo = useCallback((video: Video) => {
    localStorage.setItem("videoSelected", JSON.stringify(video));
    setVideoSelected(video);
  }, []);

  const clearSelectedVideo = useCallback(() => {
    localStorage.removeItem("videoSelected");
    setVideoSelected(null);
  }, []);

  const value = useMemo(
    () => ({
      videoSelected,
      setVideoSelected: handleSelectedVideo,
      clearSelectedVideo,
    }),
    [videoSelected, handleSelectedVideo, clearSelectedVideo],
  );

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useVideoContext() {
  const ctx = React.useContext(VideoContext);
  if (!ctx)
    throw new Error("useVideoContext must be used within VideoContextProvider");
  return ctx;
}
