import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, Pause, SkipForward, Volume2, Volume1, VolumeX } from 'lucide-react';
import { glassMove } from '../../lib/glass';

type Track = { id: string; title: string; artist: string };

// Background playlist — embedded from YouTube (we never download/redistribute,
// YouTube serves it, so embedding any public video is allowed).
const TRACKS: Track[] = [
  { id: '2iidlwQ-NfU', title: 'vài câu nói có khiến người thay đổi', artist: 'GREY D ft. tlinh' },
  { id: 'heMYSOZoT3c', title: 'dự báo thời tiết hôm nay mưa', artist: 'GREY D' },
  { id: 'RqrxRHvNyeM', title: 'ÁNH SÁNG • MÀN ĐÊM (album)', artist: 'GREY D' },
];

export function MusicPlayer() {
  const playerRef = useRef<any>(null);
  const indexRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [volume, setVolume] = useState(60);
  const [showVol, setShowVol] = useState(false);
  const volumeRef = useRef(60);

  useEffect(() => { indexRef.current = index; }, [index]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);

  // Load the YouTube IFrame API once and build a hidden audio-only player.
  useEffect(() => {
    const w = window as any;
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !w.YT?.Player) return;
      playerRef.current = new w.YT.Player('yt-music-frame', {
        videoId: TRACKS[0].id,
        playerVars: { autoplay: 0, controls: 0, modestbranding: 1, rel: 0, playsinline: 1 },
        events: {
          onReady: () => { setReady(true); playerRef.current?.setVolume(volumeRef.current); },
          onStateChange: (e: any) => {
            const YT = w.YT;
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
            else if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            else if (e.data === YT.PlayerState.ENDED) {
              const nextIdx = (indexRef.current + 1) % TRACKS.length;
              setIndex(nextIdx);
              playerRef.current?.loadVideoById(TRACKS[nextIdx].id);
            }
          },
        },
      });
    };

    if (w.YT?.Player) {
      createPlayer();
    } else {
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => { prev?.(); createPlayer(); };
    }

    return () => { cancelled = true; try { playerRef.current?.destroy?.(); } catch { /* noop */ } };
  }, []);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo(); else p.playVideo();
  }, [playing]);

  const next = useCallback(() => {
    const nextIdx = (indexRef.current + 1) % TRACKS.length;
    setIndex(nextIdx);
    playerRef.current?.loadVideoById(TRACKS[nextIdx].id);
    playerRef.current?.playVideo();
  }, []);

  // Chỉ chỉnh âm lượng của YouTube player (nhạc web) — KHÔNG đụng âm lượng thiết bị.
  const setVol = useCallback((v: number) => {
    setVolume(v);
    const p = playerRef.current;
    if (!p) return;
    p.unMute?.();
    p.setVolume(v);
  }, []);

  const current = TRACKS[index];

  return (
    <>
      {/* Hidden audio-only YouTube player (kept rendered off-screen) */}
      <div aria-hidden="true" style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }}>
        <div id="yt-music-frame" />
      </div>

      <div className="fixed bottom-6 left-6 z-[70]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={glassMove}
          className="flex items-center gap-1.5 liquid-glass-blue text-white rounded-full p-1.5 pr-2"
        >
          <button
            type="button"
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? 'Tạm dừng nhạc' : 'Phát nhạc'}
            className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 hover-grow disabled:opacity-40 shrink-0 relative"
          >
            {playing ? <Pause className="w-5 h-5" /> : <Music2 className="w-5 h-5" />}
            {playing && <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />}
          </button>

          <AnimatePresence initial={false}>
            {playing && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden flex items-center gap-2"
              >
                <div className="min-w-0 max-w-[160px] leading-tight pl-1">
                  <div className="text-[11px] font-semibold truncate">{current.title}</div>
                  <div className="text-[10px] text-white/60 truncate">{current.artist}</div>
                </div>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Bài tiếp theo"
                  className="w-8 h-8 rounded-full text-white hover:bg-white/10 hover-grow flex items-center justify-center shrink-0"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Âm lượng — chỉ chỉnh nhạc của web (YouTube player), không đụng máy */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setShowVol((s) => !s)}
              aria-label="Âm lượng nhạc"
              aria-expanded={showVol}
              className="w-9 h-9 rounded-full text-white hover:bg-white/10 hover-grow flex items-center justify-center"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : volume < 50 ? <Volume1 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <AnimatePresence initial={false}>
              {showVol && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden flex items-center"
                >
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVol(Number(e.target.value))}
                    aria-label="Điều chỉnh âm lượng nhạc"
                    className="w-24 mx-2 accent-[#FBEAEB] cursor-pointer"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}
