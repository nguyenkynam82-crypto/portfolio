import { createContext, useContext } from 'react';

export interface Track {
  title: string;
  artist: string;
  url: string;
}

export const TRACKS: Track[] = [
  { title: 'GLOW', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/GLOW.mp3` },
  { title: 'TILT', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/TILT.mp3` },
  { title: 'AIRY', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/AIRY.mp3` },
  { title: 'EASE', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/EASE.mp3` },
  { title: 'ECHO', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/ECHO.mp3` },
  { title: 'FLOW', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/FLOW.mp3` },
  { title: 'LOOP', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/LOOP.mp3` },
  { title: 'NUMB', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/NUMB.mp3` },
  { title: 'VEIL', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/VEIL.mp3` },
  { title: 'WAVE', artist: 'Cinematic Score', url: `${import.meta.env.BASE_URL}msc/WAVE.mp3` }
];

export interface MusicContextType {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number; // 0 to 1, User slider volume
  isPlayerOpen: boolean;
  progress: number; // 0 to 1
  duration: number; // in seconds
  currentTime: number; // in seconds
  togglePlay: () => void;
  playTrack: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (val: number) => void;
  togglePlayer: () => void;
  seek: (time: number) => void;
  hasStarted: boolean;
}

export const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
