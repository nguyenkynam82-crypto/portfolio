import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;

type Certificate = {
  img: string;
  title: string;
  desc: string;
  /** Câu chuyện hiện ra khi bấm vào thẻ. Để trống nếu chưa có. */
  story: string;
};

const certificates: Certificate[] = [
  {
    img: 'certs/chung-chi/a2-certificate.jpg',
    title: 'Cambridge English A2',
    desc: 'Chứng chỉ Cambridge English (A2 Key) — điểm tổng 131.',
    story: '',
  },
  {
    img: 'certs/chung-chi/ielts-midterm.jpg',
    title: 'Certificate of Honour — Học kỳ I',
    desc: 'Thành tích học tập xuất sắc lớp IELTS Mindset 1, học kỳ I (VAS · 2025–2026).',
    story: '',
  },
  {
    img: 'certs/chung-chi/ielts-yearly.jpg',
    title: 'Certificate of Honour — Cả năm',
    desc: 'Thành tích học tập xuất sắc lớp IELTS Mindset 1, cả năm học (VAS · 2025–2026).',
    story: '',
  },
  {
    img: 'certs/chung-chi/violympic.jpg',
    title: 'Violympic cấp Trường',
    desc: 'Hoàn thành vòng thi cấp Trường — môn Khoa học Tự nhiên khối 9 (2025–2026).',
    story: '',
  },
];

export function CertificatesSection() {
  const [active, setActive] = useState<number | null>(null);
  const cert = active !== null ? certificates[active] : null;

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

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
          Những chứng chỉ tiếng Anh và giấy khen học tập mình đã đạt được. Bấm vào từng cái để xem câu chuyện phía sau.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((c, i) => (
            <motion.button
              key={c.title}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group text-left rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              <div className="aspect-[3/4] bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={`${BASE}${c.img}`}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-mask-gradient leading-snug">{c.title}</h3>
                <p className="text-foreground/60 text-sm mt-1.5 leading-relaxed">{c.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary/70 group-hover:text-primary text-xs font-mono uppercase tracking-wider mt-4 transition-colors">
                  Xem câu chuyện →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal: câu chuyện hiện khi bấm vào thẻ */}
      <AnimatePresence>
        {cert && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog" aria-modal="true" aria-label={cert.title}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0b0b12] border border-white/10 rounded-2xl shadow-2xl"
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Đóng"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 border border-white/15 text-white/80 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="bg-white flex items-center justify-center p-4 md:p-6">
                  <img
                    src={`${BASE}${cert.img}`}
                    alt={cert.title}
                    className="w-full h-auto object-contain max-h-[40vh] md:max-h-[70vh]"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-mask-gradient mb-2 leading-tight">{cert.title}</h3>
                  <p className="text-foreground/60 text-sm mb-6 leading-relaxed">{cert.desc}</p>
                  <div className="border-t border-white/10 pt-6">
                    <span className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-3">Câu chuyện</span>
                    {cert.story ? (
                      <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{cert.story}</p>
                    ) : (
                      <p className="text-foreground/40 italic">Câu chuyện sẽ được cập nhật sớm…</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
