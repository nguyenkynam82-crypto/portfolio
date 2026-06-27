import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full bg-black overflow-hidden flex flex-col justify-start px-6 md:px-12 lg:px-20 pt-20 pb-32">
      {/* Ambient Depth Background */}
      <div className="absolute inset-0 pointer-events-none z-0 ambient-glow" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col mt-[12vh] md:mt-[16vh]">
        <motion.div
          initial={{ clipPath: 'polygon(0 120%, 100% 120%, 100% 120%, 0% 120%)', y: 60 }}
          animate={{ clipPath: 'polygon(0 -20%, 100% -20%, 100% 120%, 0% 120%)', y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="self-start relative pb-4"
        >
          <h1 data-cursor-dark className="font-heading font-black uppercase tracking-tight">
            {/* Font Saira + IN HOA. "Ý CHÍ DẪN ĐẾN" nhỏ; "THÀNH CÔNG" to + gradient.
                Saira render dấu Ẫ chuẩn (lúc trước thấy hỏng là do cache font cũ). */}
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] xl:text-[9rem] text-white leading-[1.05]">Ý chí dẫn đến</span>
            <span className="text-mask-gradient inline-block text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[10rem] leading-[1.1] py-2">Thành công</span>
          </h1>
        </motion.div>
      </div>

      {/* Bottom: scroll-to-about CTA */}
      <div className="absolute bottom-6 md:bottom-12 left-0 w-full px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row justify-end items-start md:items-end gap-12 z-20 pointer-events-none">
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
