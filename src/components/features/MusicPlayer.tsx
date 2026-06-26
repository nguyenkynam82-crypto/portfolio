import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, ListMusic } from 'lucide-react';
import { useMusic } from '../../contexts/MusicContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function MusicPlayer() {
  const {
    tracks, currentTrackIndex, isPlaying, volume,
    isPlayerOpen, progress, duration, currentTime,
    togglePlay, nextTrack, prevTrack, setVolume, togglePlayer, seek, playTrack
  } = useMusic();
  const { language } = useLanguage();

  const track = tracks[currentTrackIndex];

  // Esc closes the player (keyboard accessibility for the dialog)
  useEffect(() => {
    if (!isPlayerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') togglePlayer(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlayerOpen, togglePlayer]);

  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    seek(newProgress * duration);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <AnimatePresence>
      {isPlayerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
        >
          {/* Background overlay click to close (decorative — the X button is the keyboard path) */}
          <div className="absolute inset-0 z-0 cursor-pointer" onClick={togglePlayer} aria-hidden="true" />
          
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={language === 'vi' ? 'Trình phát nhạc' : 'Music player'}
            initial={{ y: 20, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col"
            style={{ maxHeight: 'calc(100vh - 40px)' }}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 shrink-0">
              <span className="flex items-center gap-2 text-xs font-medium text-white/50 tracking-widest uppercase font-display">
                <ListMusic size={14} />
                Cinematic Player
              </span>
              <button 
                onClick={togglePlayer}
                aria-label={language === 'vi' ? 'Đóng trình phát nhạc' : 'Close music player'}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Current Track Info */}
            <div className="flex items-center gap-5 mb-8 shrink-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border border-white/10 bg-black/50 flex items-center justify-center shadow-lg">
                <motion.div 
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, #111, #222, #111, #333, #111)',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9)'
                  }}
                />
                <div className="absolute w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
              </div>
              <div className="overflow-hidden flex-1">
                <motion.h3 
                  key={track.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white font-medium text-2xl sm:text-3xl truncate font-display tracking-tight mb-1"
                >
                  {track.title}
                </motion.h3>
                <p className="text-white/50 text-sm sm:text-base truncate">{track.artist}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8 shrink-0">
              <div className="relative w-full h-1.5 bg-white/10 rounded-full mb-3 cursor-pointer group">
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.001" 
                  value={progress || 0}
                  onChange={handleProgressChange}
                  aria-label={language === 'vi' ? 'Tiến trình bài hát' : 'Track progress'}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-primary rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  style={{ width: `${(progress || 0) * 100}%` }}
                  layout
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  style={{ left: `calc(${(progress || 0) * 100}% - 8px)` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/60 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-8 shrink-0">
              <div className="flex items-center gap-2 group w-1/4">
                <button aria-label={language === 'vi' ? 'Tắt/Mở âm lượng' : 'Mute/Unmute'} onClick={() => setVolume(volume === 0 ? 0.5 : 0)} className="text-white/50 hover:text-white transition-colors">
                  {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-label={language === 'vi' ? 'Âm lượng' : 'Volume'}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-white"
                    style={{ width: `${volume * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button 
                  onClick={prevTrack}
                  aria-label={language === 'vi' ? 'Bài trước' : 'Previous track'}
                  className="text-white/70 hover:text-white hover:scale-110 transition-all"
                >
                  <SkipBack size={24} />
                </button>
                <button 
                  onClick={togglePlay}
                  aria-label={isPlaying ? (language === 'vi' ? 'Tạm dừng' : 'Pause') : (language === 'vi' ? 'Phát nhạc' : 'Play')}
                  className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>
                <button 
                  onClick={nextTrack}
                  aria-label={language === 'vi' ? 'Bài tiếp theo' : 'Next track'}
                  className="text-white/70 hover:text-white hover:scale-110 transition-all"
                >
                  <SkipForward size={24} />
                </button>
              </div>
              
              <div className="w-1/4" />
            </div>

            {/* Playlist Divider */}
            <div className="w-full h-px bg-white/10 mb-4 shrink-0" />

            {/* Playlist */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-[150px]">
              <div className="space-y-1">
                {tracks.map((t, index) => {
                  const isActive = index === currentTrackIndex;
                  return (
                    <button
                      type="button"
                      key={t.title}
                      onClick={() => playTrack(index)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`w-full text-left flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors group ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded bg-black/30 flex items-center justify-center shrink-0">
                          {isActive && isPlaying ? (
                            <div className="flex items-end gap-0.5 h-3">
                              <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1 bg-primary rounded-t" />
                              <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-1 bg-primary rounded-t" />
                              <motion.div animate={{ height: ["50%", "90%", "50%"] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} className="w-1 bg-primary rounded-t" />
                            </div>
                          ) : (
                            <Play size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-primary' : 'text-white/50'}`} fill="currentColor" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className={`text-sm font-medium truncate font-display ${isActive ? 'text-primary' : 'text-white/80'}`}>
                            {t.title}
                          </p>
                          <p className="text-xs text-white/60 truncate">{t.artist}</p>
                        </div>
                      </div>
                      {isActive && (
                        <span className="text-[10px] uppercase tracking-widest text-primary/70 mr-2 shrink-0">{language === 'vi' ? 'Đang Phát' : 'Now Playing'}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
