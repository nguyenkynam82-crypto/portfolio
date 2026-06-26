import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export function DeferredRender({ children }: { children: ReactNode }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Defer rendering until after the main thread is idle (or after a short delay)
    // This allows the browser to paint the LCP (Hero text) instantly
    const id = setTimeout(() => {
      setShouldRender(true);
    }, 50);

    return () => clearTimeout(id);
  }, []);

  if (!shouldRender) {
    return <div className="content-defer" style={{ height: '1000px' }} aria-hidden="true" />;
  }

  return <div className="content-defer">{children}</div>;
}
