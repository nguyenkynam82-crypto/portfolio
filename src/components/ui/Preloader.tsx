import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import logoMark from '/kn-logo.svg?url';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const progress = useMotionValue(0);
  const progressText = useTransform(progress, (latest) => Math.floor(latest) + '%');

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 1.5,
      ease: "easeInOut",
      onComplete: () => {
        setTimeout(() => setIsLoading(false), 300);
      }
    });
    return controls.stop;
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo mark */}
          <motion.img
            src={logoMark}
            alt="kn."
            className="w-48 md:w-60 h-auto mb-3"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Signature name */}
          <motion.div
            className="font-display italic text-base md:text-lg text-foreground mb-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            ~Nguyễn Kỳ Nam~
          </motion.div>

          {/* Progress Number */}
          <motion.div className="font-display text-4xl text-foreground">
            {progressText}
          </motion.div>

          <div className="text-muted-foreground text-xs tracking-[0.3em] mt-4">
            ...loading...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
