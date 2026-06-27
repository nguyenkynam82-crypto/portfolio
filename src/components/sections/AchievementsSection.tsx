import { motion, AnimatePresence } from 'framer-motion';
import { Medal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback, useRef, type WheelEvent } from 'react';
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
    medal: 'thanh-tich/huy-chuong/medal-cantho-heritage-2025.jpg',
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
    photos: ['thanh-tich/huy-chuong/medal-techcombank-hanoi-2025-2.jpg'],
    medal: 'thanh-tich/huy-chuong/medal-techcombank-hanoi-2025.jpg',
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
    medal: 'thanh-tich/huy-chuong/medal-vnexpress-cantho-2026.jpg',
    story: '',
  },
];

// Huy chương các giải 5km / 10km / trekking (không phải 21km) — bộ sưu tập.
// story: câu chuyện hiện khi bấm vào, để '' nếu chưa có.
type MedalItem = { img: string; distance: string; event: string; year: string; story: string };
const otherMedals: MedalItem[] = [
  { img: 'thanh-tich/huy-chuong/disan-ct-2022-5km.jpg', distance: '5 km', event: 'Cần Thơ Marathon — Heritage Race', year: '2022', story: '' },
  { img: 'thanh-tich/huy-chuong/disan-ct-2023-10km.jpg', distance: '10 km', event: 'Cần Thơ Marathon — Heritage Race', year: '2023', story: '' },
  { img: 'thanh-tich/huy-chuong/disan-ct-2024-5km.jpg', distance: '5 km', event: 'Cần Thơ Marathon — Heritage Race', year: '2024', story: '' },
  { img: 'thanh-tich/huy-chuong/haugiang-2024-5km.jpg', distance: '5 km', event: 'Mekong Delta Marathon Hau Giang', year: '2024', story: '' },
  { img: 'thanh-tich/huy-chuong/vnexpress-2025-5km.jpg', distance: '5 km', event: 'VnExpress Marathon Cần Thơ', year: '2025', story: '' },
  { img: 'thanh-tich/huy-chuong/trekking-sano-2025.jpg', distance: 'Trekking', event: 'SaNo', year: '2025', story: '' },
  { img: 'thanh-tich/huy-chuong/ueh-2026-10km.jpg', distance: '10 km', event: 'Vĩnh Long Marathon', year: '2026', story: '' },
];

export function AchievementsSection() {
  const [active, setActive] = useState<number | null>(null);
  const [activeMedal, setActiveMedal] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ imgs: string[]; i: number } | null>(null);
  const a = active !== null ? achievements[active] : null;
  const m = activeMedal !== null ? otherMedals[activeMedal] : null;
  const aImgs = a ? [...a.photos, a.medal].filter(Boolean) : [];

  const lbPrev = useCallback(() => setLightbox((l) => (l ? { ...l, i: (l.i - 1 + l.imgs.length) % l.imgs.length } : l)), []);
  const lbNext = useCallback(() => setLightbox((l) => (l ? { ...l, i: (l.i + 1) % l.imgs.length } : l)), []);

  // Trackpad / chuột: vuốt ngang (wheel deltaX) để lướt ảnh, có throttle.
  const wheelTs = useRef(0);
  const onLbWheel = useCallback((e: WheelEvent) => {
    if (Math.abs(e.deltaX) < 24 || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    const now = performance.now();
    if (now - wheelTs.current < 450) return;
    wheelTs.current = now;
    if (e.deltaX > 0) lbNext(); else lbPrev();
  }, [lbPrev, lbNext]);

  // Freeze page scroll while any overlay (race/medal modal) is open.
  useEffect(() => {
    if (active === null && activeMedal === null) return;
    lockScroll();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { unlockScroll(); document.body.style.overflow = prev; };
  }, [active, activeMedal]);

  // Keyboard: lightbox takes priority (Esc / ← / →), else Esc closes the modal.
  useEffect(() => {
    if (active === null && activeMedal === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === 'Escape') setLightbox(null);
        else if (e.key === 'ArrowLeft') lbPrev();
        else if (e.key === 'ArrowRight') lbNext();
        return;
      }
      if (e.key === 'Escape') { setActive(null); setActiveMedal(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, activeMedal, lightbox, lbPrev, lbNext]);

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
          <span className="text-mask-gradient inline-block leading-[1.3] pb-2">Thành tích chạy bộ</span>
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group text-left rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer relative hover:z-10"
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

        {/* Bộ sưu tập huy chương 5km / 10km / trekking */}
        <div className="mt-20 md:mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-display font-bold text-white mb-2"
          >
            Bộ sưu tập <span className="text-mask-gradient">huy chương</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.05 }}
            className="text-foreground/60 mb-8"
          >
            Các giải 5km, 10km và trekking trên hành trình.
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {otherMedals.map((med, i) => (
              <motion.button
                key={med.img}
                type="button"
                onClick={() => setActiveMedal(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: (i % 4) * 0.06 } }}
                viewport={{ once: true, margin: '-30px' }}
                className="group block w-full text-center cursor-pointer relative hover:z-20"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/30 group-hover:shadow-2xl group-hover:scale-[1.6] transition-all duration-500 ease-out">
                  <img
                    src={`${BASE}${med.img}`}
                    alt={`Huy chương ${med.distance} ${med.event} ${med.year}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <div className="text-white font-semibold text-sm leading-tight">{med.distance}</div>
                  <div className="text-foreground/55 text-xs mt-0.5">{med.event} · {med.year}</div>
                  <span className="inline-block text-primary/60 group-hover:text-primary text-[10px] font-mono uppercase tracking-wider mt-1.5 transition-colors">Xem câu chuyện →</span>
                </div>
              </motion.button>
            ))}
          </div>
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
              data-cursor-dark
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

                  {/* Khoảnh khắc & huy chương — bấm để phóng to + lướt qua lại */}
                  {aImgs.length > 0 && (
                    <div className="mt-7 border-t border-[#E1FFFB]/15 pt-6">
                      <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#E1FFFB]/45 mb-3">Khoảnh khắc &amp; huy chương</span>
                      <div className="grid grid-cols-3 gap-2">
                        {aImgs.map((img, idx) => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => setLightbox({ imgs: aImgs, i: idx })}
                            aria-label="Phóng to ảnh"
                            className="group rounded-lg overflow-hidden aspect-square cursor-zoom-in"
                          >
                            <img src={`${BASE}${img}`} alt={`${a.title} — ảnh ${idx + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </button>
                        ))}
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

      {/* Modal câu chuyện cho từng huy chương trong bộ sưu tập */}
      <AnimatePresence>
        {m && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActiveMedal(null)}
            role="dialog" aria-modal="true" aria-label={`Huy chương ${m.distance} ${m.event} ${m.year}`}
          >
            <motion.div
              data-lenis-prevent
              data-cursor-dark
              className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0b0b14] border border-white/10 rounded-2xl shadow-2xl"
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveMedal(null)}
                aria-label="Đóng"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#E1FFFB]/10 border border-[#E1FFFB]/25 text-[#E1FFFB]/80 hover:text-[#E1FFFB] hover:bg-[#E1FFFB]/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="bg-[#ffffff] flex items-center justify-center p-4 md:p-6">
                  <img
                    src={`${BASE}${m.img}`}
                    alt={`Huy chương ${m.distance} ${m.event} ${m.year}`}
                    className="w-full h-auto object-contain max-h-[45vh] md:max-h-[75vh]"
                  />
                </div>
                <div className="p-7 md:p-10">
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-gradient-light mb-2 leading-tight">{m.distance}</h3>
                  <p className="text-[#E1FFFB]/65 text-sm md:text-base mb-7">{m.event} · {m.year}</p>
                  <div className="border-t border-[#E1FFFB]/15 pt-6">
                    <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#E1FFFB]/45 mb-3">Câu chuyện</span>
                    {m.story ? (
                      <p className="text-[#E1FFFB]/85 leading-relaxed whitespace-pre-line">{m.story}</p>
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

      {/* Lightbox: phóng to ảnh, lướt qua lại (◀ ▶ / vuốt / phím mũi tên) */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            data-cursor-dark
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8 bg-[#060935]/92 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            onWheel={onLbWheel}
            role="dialog" aria-modal="true" aria-label="Xem ảnh phóng to"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Đóng"
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-[#E1FFFB]/10 border border-[#E1FFFB]/25 text-[#E1FFFB] hover:bg-[#E1FFFB]/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {lightbox.imgs.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); lbPrev(); }}
                aria-label="Ảnh trước"
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E1FFFB]/10 border border-[#E1FFFB]/25 text-[#E1FFFB] hover:bg-[#E1FFFB]/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
            )}

            <motion.img
              key={lightbox.i}
              src={`${BASE}${lightbox.imgs[lightbox.i]}`}
              alt="Ảnh phóng to"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
              drag={lightbox.imgs.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => { if (info.offset.x < -60) lbNext(); else if (info.offset.x > 60) lbPrev(); }}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
              className="relative z-10 max-w-[88vw] max-h-[82vh] object-contain rounded-xl shadow-2xl select-none touch-none"
            />

            {lightbox.imgs.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); lbNext(); }}
                aria-label="Ảnh sau"
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E1FFFB]/10 border border-[#E1FFFB]/25 text-[#E1FFFB] hover:bg-[#E1FFFB]/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            )}

            {lightbox.imgs.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-[#060935]/60 text-[#E1FFFB]/80 text-sm font-mono">
                {lightbox.i + 1} / {lightbox.imgs.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
