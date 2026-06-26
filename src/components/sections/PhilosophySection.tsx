import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const manifesto = {
  vi: "KHÔNG CHỈ LÀ CODE. ĐÓ LÀ NGHỆ THUẬT VÀ KIẾN TRÚC.",
  en: "NOT JUST CODE. IT'S ART AND ARCHITECTURE.",
} as const;

function ManifestoWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.6, 1]);
  // Optional: slight scale or blur effect
  // We'll keep it simple and elegant with opacity

  return (
    <motion.span
      style={{ opacity }}
      className="text-4xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-[1.1]"
    >
      {word}
    </motion.span>
  );
}

export function PhilosophySection() {
  const { language } = useLanguage();
  const words = manifesto[language].split(" ");
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={container} className="relative h-[150vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-10">
        
        <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-12 font-mono text-center">
          The Manifesto
        </p>

        <h2 className="flex flex-wrap justify-center max-w-6xl gap-x-3 gap-y-2 md:gap-x-8 md:gap-y-6 text-center">
          {words.map((word, i) => {
            const start = (i / words.length) * 0.8; // finish revealing before the very end
            const end = start + (0.8 / words.length);

            return (
              <ManifestoWord
                key={`${language}-${i}`}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </h2>

        {/* Cinematic gradient overlay that fades in as you scroll */}
        <motion.div 
          style={{ opacity: scrollYProgress }}
          className="absolute inset-0 pointer-events-none z-[-1] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)]"
        />
        
        {/* Scroll indicator that fades out */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/60">{language === 'vi' ? 'Cuộn để khám phá' : 'Scroll to explore'}</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
