import { useLayoutEffect } from "react";

const rootClass = "acc-mute-sounds";

export const useMuteSoundsButton = (
  isMuteSounds: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isMuteSounds) {
      document.documentElement.classList.add(rootClass);
      const mediaElements = document.querySelectorAll("audio, video");
      mediaElements.forEach((el) => {
        (el as HTMLMediaElement).muted = true;
      });
    }

    return () => {
      document.documentElement.classList.remove(rootClass);
      const mediaElements = document.querySelectorAll("audio, video");
      mediaElements.forEach((el) => {
        (el as HTMLMediaElement).muted = false;
      });
    };
  }, [isMuteSounds, isGettingReady]);
};
