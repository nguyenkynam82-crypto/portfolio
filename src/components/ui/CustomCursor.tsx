import { useEffect, useRef, useState } from 'react';

// Phần tử coi là "tương tác" → con trỏ to ra + xuyên thấu màu khi rê vào.
const INTERACTIVE = 'a, button, input, textarea, select, label, summary, [role="button"], [role="switch"], [data-cursor="hover"]';

// Nền/nút màu navy của web → chấm phải đổi sang màu nền sáng để thấy được.
const DARK = '.liquid-glass-blue, [data-cursor-dark]';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Chỉ bật trên thiết bị có chuột thật (bỏ qua cảm ứng).
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'custom-cursor';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    dotRef.current = dot;
    document.documentElement.classList.add('has-custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;

    const loop = () => {
      // Lerp 0.14 → con trỏ đi theo có độ trễ mượt (chậm lại như donquaan).
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => { target.x = e.clientX; target.y = e.clientY; setVisible(true); };
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
      dotRef.current = null;
    };
  }, []);

  // Đồng bộ class trạng thái (visible / hover) lên phần tử dot.
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    dot.classList.toggle('is-visible', visible);
    dot.classList.toggle('is-hover', hover);
    dot.classList.toggle('is-on-dark', onDark);
  }, [visible, hover, onDark]);

  return null;
}
