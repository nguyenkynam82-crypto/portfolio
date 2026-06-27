import { useEffect, useRef, useState } from 'react';

const INTERACTIVE = 'a, button, input, textarea, select, label, summary, [role="button"], [role="switch"], [data-cursor="hover"]';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Chỉ bật trên thiết bị có chuột thật (bỏ qua cảm ứng).
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);
    ringRef.current = ring;
    document.documentElement.classList.add('has-custom-cursor');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...mouse };
    let raf = 0;

    const loop = () => {
      // Vòng tròn chạy theo con trỏ có độ trễ mượt (lerp 0.16).
      pos.x += (mouse.x - pos.x) * 0.16;
      pos.y += (mouse.y - pos.y) * 0.16;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; setVisible(true); };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      setHover(!!t?.closest?.(INTERACTIVE));
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
      ring.remove();
      ringRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;
    el.classList.toggle('is-visible', visible);
    el.classList.toggle('is-hover', hover);
  }, [visible, hover]);

  return null;
}
