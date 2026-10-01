import { useState, useEffect } from "react";

export const wakeLockSupported =
  typeof navigator !== "undefined" && "wakeLock" in navigator;

// keep screen on toggle
export const useWakeLock = () => {
  const [keepAwake, setKeepAwake] = useState(false);

  useEffect(() => {
    if (!keepAwake || !wakeLockSupported) return;

    let wakeLock: WakeLockSentinel | null = null;
    let cancelled = false;

    const requestLock = async () => {
      try {
        const lock = await navigator.wakeLock.request("screen");
        if (cancelled) {
          lock.release();
          return;
        }
        wakeLock?.release();
        wakeLock = lock;
      } catch {
        if (!cancelled) setKeepAwake(false);
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestLock();
      }
    };

    requestLock();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      wakeLock?.release();
    };
  }, [keepAwake]);

  return [keepAwake, setKeepAwake] as const;
};
