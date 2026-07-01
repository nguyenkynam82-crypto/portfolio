import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

// Số liệu tĩnh — chủ web tự sửa `value`. '—' = chờ điền.
type Stat = { value: string; labelVi: string; labelEn: string; descVi: string; descEn: string };
const stats: Stat[] = [
  { value: '10+', labelVi: 'Huy chương', labelEn: 'Medals', descVi: 'Các cự li 5K · 10K · 21K', descEn: 'Across 5K · 10K · 21K races' },
  { value: '3', labelVi: 'Half Marathon', labelEn: 'Half Marathons', descVi: 'Đã hoàn thành cự li 21km', descEn: 'Completed the 21km distance' },
  { value: '4', labelVi: 'Chứng chỉ & bằng khen', labelEn: 'Certificates & awards', descVi: 'IELTS, Cambridge A2, Violympic', descEn: 'IELTS, Cambridge A2, Violympic' },
  { value: '5–21', labelVi: 'Cự li (km)', labelEn: 'Distances (km)', descVi: 'Từ 5km đến bán marathon', descEn: 'From 5km to half marathon' },
  { value: '—', labelVi: 'Người theo dõi', labelEn: 'Followers', descVi: 'Tổng trên các nền tảng MXH', descEn: 'Across social platforms' },
  { value: '—', labelVi: 'Tổng quãng đường', labelEn: 'Total distance', descVi: 'Km tích luỹ qua các giải', descEn: 'Cumulative km across races' },
];

export function StatsSection() {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section id="stats" className="relative w-full py-28 md:py-40 bg-black overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase font-mono text-foreground/60 block mb-6"
        >
          {isEn ? 'By the numbers' : 'Số liệu'}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-4 leading-tight"
        >
          {isEn ? 'kn. in ' : 'kn. qua những '}<span className="text-mask-gradient">{isEn ? 'numbers' : 'con số'}</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-bold text-mask-gradient leading-none mb-4 text-6xl md:text-7xl lg:text-8xl">{s.value}</div>
              <h3 className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-white mb-2">{isEn ? s.labelEn : s.labelVi}</h3>
              <p className="text-foreground/55 text-sm leading-relaxed max-w-[240px] mx-auto">{isEn ? s.descEn : s.descVi}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
