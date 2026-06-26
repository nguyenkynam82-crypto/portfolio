import { useEffect, useRef } from 'react';

// Defers fetching the video until it scrolls near the viewport, then autoplays muted.
// Keeps multi-MB media off the critical loading path.
export function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Keep observing: browsers suspend offscreen videos without resuming
    // them, so re-play on every re-entry into the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = src;
          }
          video.muted = true;
          video.play().catch(() => {});
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(video);

    // Browsers also pause videos in hidden tabs; resume on return
    const onVisible = () => {
      if (!document.hidden && video.src) video.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [src]);

  return (
    <video ref={ref} className={className} muted loop playsInline preload="none">
      {/* Decorative, silent clip — empty captions track satisfies a11y audits */}
      <track kind="captions" src={`${import.meta.env.BASE_URL}media/empty.vtt`} srcLang="vi" label="Không có lời thoại" />
    </video>
  );
}
