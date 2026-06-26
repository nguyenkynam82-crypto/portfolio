import { motion } from 'framer-motion';

export function Marquee() {
  const words = [
    "RADICAL AUTONOMY",
    "SYSTEM OPTIMIZATION",
    "ADVANCED TECH",
    "NO FLUFF",
    "FIRST PRINCIPLES",
    "COGNITIVE AUTOMATION"
  ];

  // We duplicate the array to make the infinite scrolling seamless
  const scrollContent = [...words, ...words, ...words];

  return (
    <div className="relative w-full overflow-hidden bg-white/5 py-4 border-y border-white/10 flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 15,
        }}
      >
        {scrollContent.map((word, idx) => (
          <div key={idx} className="flex items-center mx-4">
            <span className="text-xl md:text-3xl font-display uppercase tracking-widest text-foreground/80">
              {word}
            </span>
            <span className="mx-8 text-primary">★</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
