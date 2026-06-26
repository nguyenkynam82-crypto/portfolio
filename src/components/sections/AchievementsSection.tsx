import { motion, AnimatePresence } from 'framer-motion';
import { Medal, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { lockScroll, unlockScroll } from '../../lib/lenis';

const BASE = import.meta.env.BASE_URL;

type Achievement = {
  cert: string;
  title: string;
  distance: string;
  time: string;
  date: string;
  location: string;
  bib: string;
  /** Ảnh chạy bộ — gửi sau, để '' / [] nếu chưa có. */
  photos: string[];
  /** Ảnh huy chương — gửi sau. */
  medal: string;
  /** Câu chuyện hiện khi bấm vào thẻ. Để trống nếu chưa có. */
  story: string;
};

const achievements: Achievement[] = [
  {
    cert: 'thanh-tich/giay-chung-nhan/cantho-heritage-2025.jpg',
    title: 'Cần Thơ Marathon — Heritage Race 2025',
    distance: 'Half Marathon · 21 km',
    time: '02:55:53',
    date: '21/12/2025',
    location: 'Cần Thơ',
    bib: '60508',
    photos: [],
    medal: '',
    story: '',
  },
  {
    cert: 'thanh-tich/giay-chung-nhan/techcombank-hanoi-2025.jpg',
    title: 'Techcombank Hà Nội Marathon 2025',
    distance: 'Half Marathon · 21 km',
    time: '03:51:59',
    date: '05/10/2025',
    location: 'Hà Nội',
    bib: '632051',
    photos: [],
    medal: '',
    story: '',
  },
  {
    cert: 'thanh-tich/giay-chung-nhan/vnexpress-cantho-2026.jpg',
    title: 'VnExpress Marathon Cần Thơ 2026',
    distance: 'Half Marathon · 21 km',
    time: '3:26:07',
    date: '10/5/2026',
    location: 'Cần Thơ',
    bib: '80331',
    photos: [],
    medal: '',
    story: '',
  },
];

export function AchievementsSection() {
  const [active, setActive] = useState<number | null>(null);
  const a = active !== null ? achievements[active] : null;

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
    <section id="achievements" className="relative w-full py-28 md:py-40 bg-black overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Gradient cho nét icon huy chương */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id="medalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3a52c4" />
              <stop offset="50%" stopColor="#14205e" />
              <stop offset="100%" stopColor="#060935" />
            </linearGradient>
          </defs>
        </svg>

        <motion.span
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase font-mono text-foreground/60 block mb-6"
        >
          Thành tích
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-4 leading-[1.2] flex items-center gap-3 flex-wrap"
        >
          <Medal className="w-9 h-9 md:w-12 md:h-12 shrink-0" stroke="url(#medalGrad)" aria-hidden="true" />
          <span className="text-mask-gradient inline-block leading-[1.3] pb-2">Hành trình chạy bộ</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg text-foreground/70 font-light max-w-2xl mb-14"
        >
          Ba lần chinh phục cự li 21km (Half Marathon) của tui nè.<br />
          Ấn vào từng giải để xem chi tiết hành trình nhé.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, i) => (
            <motion.button
              key={ach.title}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group text-left rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              <div className="aspect-[3/4] bg-[#ffffff] flex items-center justify-center overflow-hidden">
                <img
                  src={`${BASE}${ach.cert}`}
                  alt={ach.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-mask-gradient leading-snug">{ach.title}</h3>
                <p className="font-mono text-xs text-foreground/60 mt-2">{ach.distance} · ⏱ {ach.time}</p>
                <span className="inline-flex items-center gap-1 text-primary/70 group-hover:text-primary text-xs font-mono uppercase tracking-wider mt-4 transition-colors">
                  Xem chi tiết →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal chi tiết từng giải */}
      <AnimatePresence>
        {a && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog" aria-modal="true" aria-label={a.title}
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
                    src={`${BASE}${a.cert}`}
                    alt={a.title}
                    className="w-full h-auto object-contain max-h-[45vh] md:max-h-[80vh]"
                  />
                </div>
                <div className="p-7 md:p-10">
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-gradient-light mb-5 leading-tight">{a.title}</h3>

                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      ['Cự li', a.distance],
                      ['Thời gian', a.time],
                      ['Ngày', a.date],
                      ['Địa điểm', a.location],
                      ['BIB', a.bib],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[#E1FFFB]/45 text-xs font-mono uppercase tracking-wider mb-1">{label}</dt>
                        <dd className="text-[#E1FFFB]/90 text-base font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* Ảnh chạy bộ & huy chương — hiện khi đã có */}
                  {(a.photos.length > 0 || a.medal) && (
                    <div className="mt-7 border-t border-[#E1FFFB]/15 pt-6">
                      <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#E1FFFB]/45 mb-3">Khoảnh khắc &amp; huy chương</span>
                      <div className="grid grid-cols-3 gap-2">
                        {a.photos.map((p, idx) => (
                          <img key={idx} src={`${BASE}${p}`} alt={`${a.title} — ảnh ${idx + 1}`} loading="lazy" className="rounded-lg object-cover w-full aspect-square" />
                        ))}
                        {a.medal && (
                          <img src={`${BASE}${a.medal}`} alt={`Huy chương ${a.title}`} loading="lazy" className="rounded-lg object-cover w-full aspect-square" />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-7 border-t border-[#E1FFFB]/15 pt-6">
                    <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#E1FFFB]/45 mb-3">Câu chuyện</span>
                    {a.story ? (
                      <p className="text-[#E1FFFB]/85 leading-relaxed whitespace-pre-line">{a.story}</p>
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
