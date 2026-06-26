import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BilingualText {
  vi: string;
  en: string;
}

interface Project {
  title: string;
  category: string;
  challenge: BilingualText;
  solution: BilingualText;
  result: BilingualText;
  year: string;
  link: string;
  github: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Promethium Modpack",
    category: "Minecraft Ecosystem",
    challenge: {
      vi: "Hệ thống sụp đổ do xung đột logic chéo giữa hàng trăm bản mod, dẫn đến rò rỉ bộ nhớ nghiêm trọng.",
      en: "The system kept collapsing under cross-mod logic conflicts across hundreds of mods, causing severe memory leaks."
    },
    solution: {
      vi: "Bóc tách từng mã lỗi, tái cấu trúc toàn bộ tệp config và thiết lập lại điểm cân bằng tài nguyên.",
      en: "Dissected every error trace, restructured the entire config stack, and re-established the resource equilibrium."
    },
    result: {
      vi: "Đạt 1,000+ lượt tải tự nhiên trên CurseForge, giải phóng 30% hiệu năng phần cứng.",
      en: "Reached 1,000+ organic downloads on CurseForge while freeing up 30% of hardware performance."
    },
    year: "2023",
    link: "https://www.curseforge.com/minecraft/modpacks/promethium",
    github: "#",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Yangdawn's Hub",
    category: "Game Dev & Modding",
    challenge: {
      vi: "Cộng đồng thiếu các bộ modpack chất lượng cao được tối ưu hóa sẵn cho mọi cấu hình máy tính.",
      en: "The community lacked high-quality modpacks pre-optimized for every hardware configuration."
    },
    solution: {
      vi: "Nghiên cứu, sàng lọc và đóng gói hàng loạt hệ thống modpack dựa trên nhu cầu thực chiến.",
      en: "Researched, curated, and shipped a full line of modpack systems built around real-world player needs."
    },
    result: {
      vi: "Xây dựng thương hiệu uy tín, loại bỏ hoàn toàn rào cản kỹ thuật cho hàng ngàn người chơi mới.",
      en: "Built a trusted brand and removed every technical barrier for thousands of new players."
    },
    year: "2022",
    link: "https://www.curseforge.com/members/yangdawn/projects",
    github: "#",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop"
  }
];

export function Projects() {
  const { language } = useLanguage();
  const targetRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const totalSlides = projects.length + 1;
  const targetX = Math.floor(((totalSlides - 1) / totalSlides) * 100000) / 1000;
  
  // We have 1 Title Block + N Project Blocks = totalSlides Blocks.
  // Each block will take 100vw width, so total width is totalSlides * 100vw.
  // To scroll to the end, we move x by -targetX% of the container.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${targetX}%`]);

  return (
    <section ref={targetRef} id="projects" style={{ height: `${totalSlides * 100}vh` }} className="relative bg-black content-defer">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <motion.div style={{ x, width: `${totalSlides * 100}vw` }} className="flex h-full items-center">
          
          {/* Title Block (100vw) */}
          <div className="w-screen h-full flex items-center justify-center px-6 md:px-20 relative flex-shrink-0">
            <div className="max-w-2xl w-full">
              <span className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm mb-6 block font-semibold">
                Case Studies
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-8 leading-none tracking-tight">
                Masterpiece<br />Projects
              </h2>
              <p className="text-white/50 text-lg md:text-xl max-w-lg leading-relaxed mb-12">
                {language === 'vi'
                  ? 'Không chỉ là sản phẩm, đây là các case study thực chứng cho tư duy giải quyết vấn đề bằng công nghệ lõi.'
                  : 'More than products — these are proven case studies in solving problems with core technology.'}
              </p>
              <div className="flex items-center gap-4 text-white/60 text-sm font-mono uppercase tracking-widest">
                <span>{language === 'vi' ? 'Cuộn để khám phá' : 'Scroll to explore'}</span>
                <ArrowRight size={16} className="animate-pulse" />
              </div>
            </div>
            
            {/* Background aesthetic line */}
            <div className="absolute top-1/2 right-0 w-[50vw] h-[1px] bg-gradient-to-r from-white/20 to-transparent -translate-y-1/2" />
          </div>

          {/* Project Blocks */}
          {projects.map((project, index) => (
            <div key={index} className="w-screen h-[100svh] flex items-center justify-center p-4 md:p-12 relative group flex-shrink-0">
              <div className="w-full max-w-6xl h-[80vh] md:h-[85vh] relative rounded-3xl overflow-hidden liquid-glass border border-white/10 flex flex-col md:flex-row">
                
                {/* Image Section (Morphs and zooms slightly) */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 md:from-black/90 via-black/40 to-transparent z-20" />
                  
                  {/* Floating Year Tag */}
                  <div className="absolute top-6 left-6 z-30">
                    <span className="liquid-glass px-4 py-2 rounded-full text-xs font-mono text-white border border-white/10">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-full flex flex-col p-6 md:p-12 lg:p-16 bg-black/60 md:bg-black/40 backdrop-blur-md relative z-30 overflow-y-auto custom-scrollbar">
                  <span className="text-primary text-xs uppercase tracking-[0.2em] mb-4 font-semibold">
                    {project.category}
                  </span>
                  
                  <h3 className="text-3xl md:text-5xl font-display text-white mb-8 tracking-tight group-hover:text-primary transition-colors duration-500">
                    {project.title}
                  </h3>

                  <div className="space-y-6 flex-1">
                    <div>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mb-2 font-mono">01. Challenge</h4>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed">
                        {project.challenge[language]}
                      </p>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <div>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mb-2 font-mono">02. Solution</h4>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed">
                        {project.solution[language]}
                      </p>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <div>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-primary mb-2 font-mono">03. Result</h4>
                      <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
                        {project.result[language]}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                    <a href={project.github} aria-label={language === 'vi' ? `Mã nguồn GitHub của ${project.title}` : `GitHub source code for ${project.title}`} className="p-3 rounded-full border border-white/20 hover:border-white hover:bg-white text-white hover:text-black transition-all duration-300 flex items-center justify-center">
                      <Github size={18} />
                    </a>
                    <a href={project.link} aria-label={language === 'vi' ? `Xem chi tiết ${project.title}` : `View ${project.title} details`} className="p-3 rounded-full border border-primary hover:bg-primary text-primary hover:text-white transition-all duration-300 flex items-center justify-center">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                
              </div>
            </div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}
