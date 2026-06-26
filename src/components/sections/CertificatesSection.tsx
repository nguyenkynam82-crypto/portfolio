import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { lockScroll, unlockScroll } from '../../lib/lenis';

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
    lockScroll();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      unlockScroll();
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

        {/* Gradient dùng để tô nét icon nón tốt nghiệp (SVG stroke không
            background-clip được như chữ, nên phải dùng linearGradient riêng). */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3a52c4" />
              <stop offset="50%" stopColor="#14205e" />
              <stop offset="100%" stopColor="#060935" />
            </linearGradient>
          </defs>
        </svg>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-4 leading-[1.2] flex items-center gap-3 flex-wrap"
        >
          <GraduationCap className="w-9 h-9 md:w-12 md:h-12 shrink-0" stroke="url(#capGrad)" aria-hidden="true" />
          {/* inline-block + leading + pb so the gradient background covers the
              full glyph, including descenders (g, y, ỉ…) — otherwise clipped. */}
          <span className="text-mask-gradient inline-block leading-[1.3] pb-2">Chứng chỉ &amp; giấy khen</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg text-foreground/70 font-light max-w-2xl mb-14"
        >
          Các chứng chỉ và giấy khen mà tui đã đạt được nè😁.<br />
          Ấn vào để xem hành trình chinh phục của kn. nhé.
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
              {/* White frame so each certificate's own white margins blend in —
                  keeps every card visually aligned regardless of source crop. */}
              <div className="aspect-[3/4] bg-[#ffffff] flex items-center justify-center overflow-hidden">
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
            <motion.div
              data-lenis-prevent
              className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0b0b14] border border-white/10 rounded-2xl shadow-2xl"
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Đóng"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#E1FFFB]/10 border border-[#E1FFFB]/25 text-[#E1FFFB]/80 hover:text-[#E1FFFB] hover:bg-[#E1FFFB]/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="bg-[#ffffff] flex items-center justify-center p-4 md:p-6">
                  <img
                    src={`${BASE}${cert.img}`}
                    alt={cert.title}
                    className="w-full h-auto object-contain max-h-[45vh] md:max-h-[80vh]"
                  />
                </div>
                <div className="p-7 md:p-10">
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-gradient-light mb-3 leading-tight">{cert.title}</h3>
                  <p className="text-[#E1FFFB]/65 text-sm md:text-base mb-7 leading-relaxed">{cert.desc}</p>
                  <div className="border-t border-[#E1FFFB]/15 pt-6">
                    <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#E1FFFB]/45 mb-3">Câu chuyện</span>
                    {cert.story ? (
                      <p className="text-[#E1FFFB]/85 leading-relaxed whitespace-pre-line">{cert.story}</p>
                    ) : (
                      <p className="text-[#E1FFFB]/40 italic">Câu chuyện sẽ được cập nhật sớm…</p>
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
