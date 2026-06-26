import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Layout, Zap, Bot } from 'lucide-react';
import React, { useRef } from 'react';
import { LazyVideo } from '../ui/LazyVideo';
import { useLanguage } from '../../contexts/LanguageContext';

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => divRef.current?.style.setProperty('--spot-o', '1')}
      onMouseLeave={() => divRef.current?.style.setProperty('--spot-o', '0')}
      className={`relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10 mix-blend-screen"
        style={{
          opacity: 'var(--spot-o, 0)',
          background: `radial-gradient(800px circle at var(--spot-x, 0px) var(--spot-y, 0px), rgba(255,255,255,0.08) 0%, transparent 60%)`,
        }}
      />
      {/* Subtle hover border effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-20"
        style={{
          opacity: 'var(--spot-o, 0)',
          background: `radial-gradient(600px circle at var(--spot-x, 0px) var(--spot-y, 0px), rgba(255,255,255,0.4) 0%, transparent 50%)`,
          WebkitMaskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: `xor`,
          maskComposite: `exclude`,
          padding: `1px`,
          borderRadius: `inherit`
        }}
      />
      <div className="relative z-30 h-full">
        {children}
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const { language } = useLanguage();
  return (
    <section id="services" className="bg-black py-16 md:py-24 px-4 md:px-6 overflow-hidden relative content-defer">
      {/* Background ambient light */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight font-display leading-tight">
            {language === 'vi' ? <>Năng lực<br />cốt lõi</> : <>Core<br />Capabilities</>}
          </h2>
          <div className="hidden md:block text-white/60 text-sm tracking-widest uppercase mb-2 font-mono">
            Services & Expertise
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:gap-6 h-auto md:h-[800px]">
          
          {/* Card 1: Large Core Architecture */}
          <SpotlightCard className="md:col-span-2 md:row-span-2 flex flex-col min-h-[400px] p-0">
            <div className="relative h-1/2 md:h-3/5 overflow-hidden border-b border-white/5">
              <LazyVideo
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src={`${import.meta.env.BASE_URL}media/services-architecture.mp4`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-mono">
                  <Code size={14} /> Architecture
                </span>
                <ArrowUpRight className="text-white/60 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl text-white font-display mb-4">{language === 'vi' ? 'Hệ thống & Mã nguồn' : 'Systems & Code'}</h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
                  {language === 'vi'
                    ? 'Thiết kế kiến trúc hệ thống có khả năng mở rộng cao, xử lý triệt để các nút thắt hiệu năng (bottleneck) và đảm bảo luồng dữ liệu an toàn, logic tuyệt đối.'
                    : 'Architecting highly scalable systems, eliminating performance bottlenecks at the root, and guaranteeing data flows that are secure and rigorously logical.'}
                </p>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: UI/UX Visual Craft */}
          <SpotlightCard className="md:col-span-1 md:row-span-1 p-8 flex flex-col justify-between min-h-[250px]">
            <div className="flex items-center justify-between mb-8">
              <span className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-mono">
                <Layout size={14} /> Visual Craft
              </span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-500">
                <ArrowUpRight size={16} className="text-white/50 group-hover:text-primary transition-colors" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl text-white font-display mb-3">{language === 'vi' ? 'Thiết kế Trực quan' : 'Visual Design'}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {language === 'vi'
                  ? 'Biến khái niệm kỹ thuật khô khan thành giao diện tương tác mượt mà, áp dụng Kinetic Typography và Glassmorphism.'
                  : 'Turning dry technical concepts into fluid, interactive interfaces with Kinetic Typography and Glassmorphism.'}
              </p>
            </div>
          </SpotlightCard>

          {/* Card 3: Performance */}
          <SpotlightCard className="md:col-span-1 md:row-span-1 p-8 flex flex-col justify-between min-h-[250px] bg-gradient-to-br from-black to-white/[0.02]">
            <div className="flex items-center justify-between mb-8">
              <span className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-mono">
                <Zap size={14} /> Optimization
              </span>
            </div>
            <div>
              <h3 className="text-2xl text-white font-display mb-3">{language === 'vi' ? 'Hiệu năng Tối đa' : 'Peak Performance'}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {language === 'vi'
                  ? 'Chuẩn SEO tuyệt đối, lazy-load thông minh, code-splitting và nén tài nguyên tối đa để đạt 100 điểm Lighthouse.'
                  : 'Flawless SEO, smart lazy-loading, code-splitting, and aggressive asset compression for a perfect 100 Lighthouse score.'}
              </p>
            </div>
          </SpotlightCard>

          {/* Card 4: AI & Automation - Bottom wide row */}
          <SpotlightCard className="md:col-span-3 md:row-span-1 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 min-h-[200px]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-mono mb-4">
                <Bot size={14} /> AI Integration
              </div>
              <h3 className="text-2xl md:text-3xl text-white font-display mb-3">{language === 'vi' ? 'Tự động hóa & Trí tuệ nhân tạo' : 'Automation & Artificial Intelligence'}</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                {language === 'vi'
                  ? 'Tích hợp LLM, tự động hóa quy trình làm việc (CI/CD workflows), xử lý dữ liệu quy mô lớn mà không cần can thiệp thủ công.'
                  : 'Integrating LLMs, automating CI/CD workflows, and processing data at scale with zero manual intervention.'}
              </p>
            </div>
            
            <div className="w-full md:w-auto flex-shrink-0 flex items-center justify-start md:justify-end">
              {/* Decorative AI visual element */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.2),transparent)] animate-spin" style={{ animationDuration: '4s' }} />
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-black flex items-center justify-center z-10 border border-white/5">
                  <Bot size={28} className="text-white/60 group-hover:text-primary transition-colors duration-500" />
                </div>
              </div>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
