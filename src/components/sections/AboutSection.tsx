import { motion } from 'framer-motion';
import { MessageSquareQuote, Briefcase, Wallet, Sparkles, Mic } from 'lucide-react';

const capabilities = [
  { icon: MessageSquareQuote, label: 'Truyền đạt & Thuyết phục bằng ngôn từ' },
  { icon: Briefcase, label: 'Tư duy kinh doanh thực chiến' },
  { icon: Wallet, label: 'Dẫn dắt & Định hướng tài chính' },
  { icon: Sparkles, label: 'Sáng tạo trong công việc & học tập' },
  { icon: Mic, label: 'Diễn xuất & Ca hát' },
];

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-28 md:py-40 bg-black overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase font-mono text-foreground/60 block mb-6"
        >
          Giới thiệu
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-10 leading-tight"
        >
          Xin chào, mình là <span className="text-mask-gradient">Kỳ Nam</span>.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-6 text-lg md:text-xl text-foreground/80 font-light leading-relaxed max-w-3xl mb-16"
        >
          <p>Mình là Kỳ Nam — hiện là học sinh, đồng thời làm kinh doanh và marketing online. Mình làm việc với một triết lý đơn giản: <strong className="text-white font-semibold">thực tế tạo nên giá trị</strong>.</p>
          <p>Thế mạnh của mình nằm ở tư duy logic, khả năng truyền đạt sắc bén và sự nhạy bén trong kinh doanh. Mình tâm huyết chia sẻ kiến thức, mang lại góc nhìn khách quan và đồng hành cùng các bạn trẻ phát triển tư duy, tự tin giao tiếp và tự chủ tài chính từ sớm.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-14">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <c.icon className="w-6 h-6 text-white shrink-0" aria-hidden="true" />
              <span className="text-white/90 font-medium">{c.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-foreground/70 text-sm font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-primary" /> Cần Thơ, Việt Nam
        </motion.div>
      </div>
    </section>
  );
}
