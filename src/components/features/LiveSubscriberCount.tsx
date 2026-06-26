import { useState, useEffect } from 'react';
import { Youtube } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface MixernoCount {
  value: string;
  count: number;
}

interface MixernoResponse {
  counts?: MixernoCount[];
}

export function LiveSubscriberCount() {
  const { language } = useLanguage();
  const [subs, setSubs] = useState<number | null>(null);

  useEffect(() => {
    async function fetchMixerno() {
      try {
        const res = await fetch('https://mixerno.space/api/youtube-channel-counter/user/UC3NPuQGUQ8HDPL2LtWPlHeA');
        const data: MixernoResponse = await res.json();

        const subCount = data.counts?.find((c) => c.value === 'subscribers')?.count;
        if (subCount) {
          setSubs(subCount);
        }
      } catch (e) {
        // Silent in production: a flaky third-party counter must never log an
        // error to the console (Lighthouse "Best Practices" flags console errors).
        if (import.meta.env.DEV) console.warn("Mixerno fetch failed:", e);
      }
    }
    
    fetchMixerno();
    const interval = setInterval(fetchMixerno, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const formatSubs = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <a 
      href="https://youtube.com/@sangtraan" 
      target="_blank" 
      rel="noreferrer"
      aria-label={language === 'vi' ? 'Kênh YouTube Sangtraan' : 'Sangtraan YouTube channel'}
      className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-2 w-fit mt-3 shadow-[0_0_15px_rgba(255,0,0,0.15)] hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all duration-300 group cursor-pointer"
    >
      <Youtube className="text-red-600 group-hover:scale-110 transition-transform" size={18} />
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
        <span className="font-mono text-sm font-bold text-white tracking-wider">
          {subs ? formatSubs(subs) : 'Loading...'}
        </span>
        <span className="text-white/60 text-[10px] uppercase tracking-widest ml-1 hidden sm:inline-block">Subscribers</span>
      </div>
    </a>
  );
}
