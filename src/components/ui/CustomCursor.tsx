import { useEffect, useRef, useState } from 'react';

const INTERACTIVE = 'a, button, input, textarea, select, label, summary, [role="button"], [role="switch"], [data-cursor="hover"]';
// Nền/nút màu navy → đổi cursor sang xanh nhạt (màu nền) để thấy được.
const DARK = '.liquid-glass-blue, [data-cursor-dark]';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Chỉ bật trên thiết bị có chuột thật (bỏ qua cảm ứng).
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.append(dot, ring);
    dotRef.current = dot;
    ringRef.current = ring;
    document.documentElement.classList.add('has-custom-cursor');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let raf = 0;

    const loop = () => {
      // Chấm bám sát con trỏ; vòng tròn chạy theo có độ trễ (lerp 0.16).
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; setVisible(true); };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      setHover(!!t?.closest?.(INTERACTIVE));
      setOnDark(!!t?.closest?.(DARK));
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
      dot.remove();
      ring.remove();
      dotRef.current = null;
      ringRef.current = null;
    };
  }, []);

  // Đồng bộ class trạng thái (visible / hover / on-dark) lên cả chấm và vòng.
  useEffect(() => {
    for (const el of [dotRef.current, ringRef.current]) {
      if (!el) continue;
      el.classList.toggle('is-visible', visible);
      el.classList.toggle('is-hover', hover);
      el.classList.toggle('is-on-dark', onDark);
    }
  }, [visible, hover, onDark]);

  return null;
}
