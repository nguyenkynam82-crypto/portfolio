import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateMailtoLink } from '../../utils/mail';
import logoSvg from '/logo-64.png?url';

const gifs = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif"
];

export function PartnerCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnTime = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    // We will keep track of created elements to clean them up properly if component unmounts
    const activeTrails = new Set<HTMLImageElement>();

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawnTime.current < 50) return; // spawn every 50ms for smoother trail
      lastSpawnTime.current = now;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const img = document.createElement('img');
      img.src = gifs[Math.floor(Math.random() * gifs.length)];
      
      // Setup initial state for smoother transitions
      img.className = "absolute pointer-events-none rounded-2xl object-cover shadow-2xl z-0";
      
      const size = 140; // slightly larger
      const randomRotation = (Math.random() - 0.5) * 30; // more rotation variance
      
      img.style.width = `${size}px`;
      img.style.height = `${size}px`;
      img.style.left = `${x - size / 2}px`;
      img.style.top = `${y - size / 2}px`;
      
      // Set initial transform and opacity
      img.style.transform = `scale(0.6) rotate(${randomRotation}deg)`;
      img.style.opacity = '0.9';
      // Use CSS transition for butter-smooth fading
      img.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';

      container.appendChild(img);
      activeTrails.add(img);

      // Trigger animation on next frame to allow transition to run
      animationFrameId = requestAnimationFrame(() => {
        img.style.transform = `scale(1.2) rotate(${randomRotation * 1.5}deg) translateY(40px)`;
        img.style.opacity = '0';
      });

      // Cleanup when transition finishes
      setTimeout(() => {
        if (container.contains(img)) {
          container.removeChild(img);
          activeTrails.delete(img);
        }
      }, 1200);
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      activeTrails.forEach(img => {
        if (img.parentNode) img.parentNode.removeChild(img);
      });
    };
  }, []);

  return (
    <section className="w-full py-12 px-6 bg-black flex justify-center">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl py-32 md:py-48 rounded-[40px] border border-white/10 bg-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center cursor-crosshair shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]"
      >
        <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-display text-white mb-12 relative z-10 pointer-events-none tracking-tight">
          Initiate Collaboration
        </h2>
        
        <a 
          href={generateMailtoLink()}
          className="relative z-10 btn-premium bg-white text-black rounded-full pl-2 pr-6 py-2 flex items-center gap-4 hover:scale-105 transition-transform"
        >
          <img 
            src={logoSvg}
            alt="DonQuaan Logo" 
            className="w-10 h-10 rounded-full object-cover brightness-0"
          />
          <span className="font-medium text-sm">Start a chat with DonQuaan</span>
        </a>
      </motion.div>
    </section>
  );
}
