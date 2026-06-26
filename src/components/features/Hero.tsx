import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full bg-black overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 pb-32">
      {/* Ambient Depth Background */}
      <div className="absolute inset-0 pointer-events-none z-0 ambient-glow" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col mt-auto mb-auto">
        <motion.div
          initial={{ clipPath: 'polygon(0 120%, 100% 120%, 100% 120%, 0% 120%)', y: 60 }}
          animate={{ clipPath: 'polygon(0 -20%, 100% -20%, 100% 120%, 0% 120%)', y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="self-start relative pb-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[9rem] font-heading uppercase text-white tracking-tight leading-[1.05] md:leading-[0.95]">
            Bắt đầu sớm,<br />đi thật xa.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80, clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          animate={{ opacity: 1, x: 0, clipPath: 'polygon(-20% -20%, 120% -20%, 120% 120%, -20% 120%)' }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="self-end mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-right relative pb-4"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[8rem] font-display italic text-white/90 leading-tight md:leading-[0.95] tracking-tight pr-2">
            Thực tế <span className="text-mask-gradient font-bold pr-2 sm:pr-4">tạo nên</span><br />
            giá trị.
          </h2>
        </motion.div>
      </div>

      {/* Bottom: sub-headline + scroll cue */}
      <div className="absolute bottom-6 md:bottom-12 left-0 w-full px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-12 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 1.4, ease: 'easeOut' }}
          className="max-w-[280px] md:max-w-md pointer-events-auto"
        >
          <p className="font-mono text-[10px] md:text-xs lg:text-sm text-foreground/70 leading-relaxed uppercase tracking-widest border-l border-white/30 pl-4 py-1">
            Mình là Kỳ Nam — người trẻ kinh doanh thực chiến. Mình chia sẻ cách tư duy, giao tiếp tự tin và tự chủ tài chính để bạn bứt phá từ sớm.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 absolute left-1/2 -translate-x-1/2 bottom-0 hidden md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">kn. — Cần Thơ</span>
          <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/70 animate-scroll-line" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="hidden md:flex gap-4 items-center pointer-events-auto"
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-mono text-[10px] md:text-xs text-foreground/70 hover:text-white transition-all border border-white/20 px-5 py-2.5 rounded-none hover:bg-white/10 tracking-widest uppercase relative group overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">[ Tìm hiểu thêm ]</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
