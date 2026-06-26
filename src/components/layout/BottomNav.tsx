import { motion } from 'framer-motion';
import logoUrl from '/kn-logo.svg?url';

const ZALO = 'https://zalo.me/0789500902';

export function BottomNav() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 z-[60] flex md:hidden items-center gap-4 bg-black/60 border border-white/10 backdrop-blur-lg rounded-full p-2 shadow-2xl"
    >
      <img src={logoUrl} alt="kn." className="h-6 w-auto pl-3 pr-1" />
      <a
        href={ZALO}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-premium bg-white text-black rounded-full px-6 py-2.5 text-sm font-medium hover:scale-105 transition-transform whitespace-nowrap"
      >
        Nhắn Zalo
      </a>
    </motion.div>
  );
}
