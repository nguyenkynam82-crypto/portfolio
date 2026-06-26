import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 1000, suffix: '+', label: 'Khách hàng' },
  { value: 10, suffix: '+', label: 'Năm kinh nghiệm' },
  { value: 500, suffix: '+', label: 'Bạn bè' },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;
    const dur = 1600;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref} className="tabular-nums">{n.toLocaleString('en-US')}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section id="stats" className="relative w-full py-24 md:py-32 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="text-5xl md:text-7xl font-display font-bold text-white mb-3 leading-none">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm md:text-base uppercase tracking-widest font-mono text-foreground/60">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
