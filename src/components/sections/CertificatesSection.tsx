import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

const certificates = [
  {
    img: 'certs/chung-chi/a2-certificate.jpg',
    title: 'Cambridge English A2',
    desc: 'Chứng chỉ Cambridge English (A2 Key) — điểm tổng 131.',
  },
  {
    img: 'certs/chung-chi/ielts-midterm.jpg',
    title: 'Certificate of Honour — Học kỳ I',
    desc: 'Thành tích học tập xuất sắc lớp IELTS Mindset 1, học kỳ I (VAS · 2025–2026).',
  },
  {
    img: 'certs/chung-chi/ielts-yearly.jpg',
    title: 'Certificate of Honour — Cả năm',
    desc: 'Thành tích học tập xuất sắc lớp IELTS Mindset 1, cả năm học (VAS · 2025–2026).',
  },
  {
    img: 'certs/chung-chi/violympic.jpg',
    title: 'Violympic cấp Trường',
    desc: 'Hoàn thành vòng thi cấp Trường — môn Khoa học Tự nhiên khối 9 (2025–2026).',
  },
];

export function CertificatesSection() {
  return (
    <section id="certificates" className="relative w-full py-28 md:py-40 bg-black overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase font-mono text-foreground/60 block mb-6"
        >
          Chứng chỉ
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-4 leading-tight flex items-center gap-3 flex-wrap"
        >
          <Award className="w-9 h-9 md:w-12 md:h-12 text-primary shrink-0" aria-hidden="true" />
          Chứng chỉ &amp; <span className="text-mask-gradient">giấy khen</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg text-foreground/70 font-light max-w-2xl mb-14"
        >
          Những chứng chỉ tiếng Anh và giấy khen học tập mình đã đạt được.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((c, i) => (
            <motion.figure
              key={c.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
            >
              <div className="aspect-[3/4] bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={`${BASE}${c.img}`}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <figcaption className="p-5">
                <h3 className="text-white font-semibold leading-snug">{c.title}</h3>
                <p className="text-foreground/60 text-sm mt-1.5 leading-relaxed">{c.desc}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
