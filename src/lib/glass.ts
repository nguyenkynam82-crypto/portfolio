import type { MouseEvent } from 'react';

// Cập nhật vị trí con trỏ (--mx/--my) trên phần tử để đốm sáng liquid-glass
// bám theo chuột. Gắn vào onMouseMove của bất kỳ nút .liquid-glass / -blue nào.
export function glassMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}
