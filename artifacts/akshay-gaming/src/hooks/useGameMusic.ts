import { useRef, useCallback, useEffect } from "react";

const BAIRAN_VIDEO_ID = "vsHtDl4Wee4";

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: { playVideo: () => void; pauseVideo: () => void; unMute: () => void; setVolume: (v: number) => void } }) => void;
            onStateChange?: (e: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { ENDED: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
  destroy: () => void;
}

export function useGameMusic() {
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const playingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const ensureContainer = () => {
    if (document.getElementById("yt-bairan-player")) return;
    const div = document.createElement("div");
    div.id = "yt-bairan-player";
    div.style.cssText = "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;bottom:0;left:0;";
    document.body.appendChild(div);
    containerRef.current = div;
  };

  const initPlayer = useCallback(() => {
    if (playerRef.current || !window.YT?.Player) return;
    ensureContainer();
    playerRef.current = new window.YT.Player("yt-bairan-player", {
      videoId: BAIRAN_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: BAIRAN_VIDEO_ID,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        mute: 0,
      },
      events: {
        onReady: (e) => {
          readyRef.current = true;
          e.target.setVolume(70);
          if (playingRef.current) e.target.playVideo();
        },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.ENDED) {
            playerRef.current?.playVideo();
          }
        },
      },
    });
  }, []);

  const loadYTScript = useCallback(() => {
    if (document.getElementById("yt-api-script")) {
      if (window.YT?.Player) initPlayer();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      initPlayer();
    };
    const script = document.createElement("script");
    script.id = "yt-api-script";
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  }, [initPlayer]);

  const start = useCallback(() => {
    playingRef.current = true;
    if (!playerRef.current) {
      loadYTScript();
    } else if (readyRef.current) {
      playerRef.current.playVideo();
    }
  }, [loadYTScript]);

  const stop = useCallback(() => {
    playingRef.current = false;
    if (playerRef.current && readyRef.current) {
      playerRef.current.pauseVideo();
    }
  }, []);

  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  return { start, stop };
}
