import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

type BilingualText = { vi: string; en: string };

type Experience = {
  role: BilingualText;
  company: BilingualText;
  duration: BilingualText;
  description: BilingualText;
  link: string;
};

const experiences: Experience[] = [
  {
    role: { vi: "Quản trị viên Fanpage", en: "Fanpage Administrator" },
    company: { vi: "Coach Nguyễn Tú Oanh", en: "Coach Nguyen Tu Oanh" },
    duration: { vi: "Hiện tại", en: "Present" },
    description: {
      vi: "Quản lý và phát triển Fanpage (có tích xanh) với hơn 130.000 người theo dõi. Lên chiến lược nội dung, tương tác và mở rộng tầm ảnh hưởng của cộng đồng.",
      en: "Managing and growing a verified Fanpage with 130,000+ followers. Driving content strategy, engagement, and the community's expanding reach."
    },
    link: "https://www.facebook.com/NguyenTuOanhLifecoach"
  },
  {
    role: { vi: "Cựu CEO", en: "Former CEO" },
    company: { vi: "Server Discord Sangtraan", en: "Sangtraan Discord Server" },
    duration: { vi: "9 Tháng (Tháng 4/2025 - Hiện tại)", en: "9 Months (Apr 2025 - Present)" },
    description: {
      vi: "Điều hành tổng thể cộng đồng Discord quy mô lớn của Youtuber Sangtraan (700k+ subs). Đảm nhiệm các vai trò trọng yếu: Senior Chief Executive Officer, Network Ambassador, Systems Tester & Developer, Community Administrator.",
      en: "Led end-to-end operations of YouTuber Sangtraan's large-scale Discord community (700k+ subs). Held key roles: Senior Chief Executive Officer, Network Ambassador, Systems Tester & Developer, Community Administrator."
    },
    link: "https://www.youtube.com/@Sangtraan"
  },
  {
    role: { vi: "Quản trị viên Group", en: "Group Administrator" },
    company: { vi: "Sống hạnh phúc mỗi ngày", en: "Sống hạnh phúc mỗi ngày" },
    duration: { vi: "Hiện tại", en: "Present" },
    description: {
      vi: "Điều hành và kiểm duyệt nội dung group cộng đồng. Xây dựng môi trường giao lưu tích cực, mang lại giá trị thực tế cho hàng ngàn thành viên.",
      en: "Running and moderating a community group. Cultivating a positive, engaging space that delivers real value to thousands of members."
    },
    link: "https://www.facebook.com/groups/songhanhphucmoingay"
  }
];

export function ExperienceSection() {
  const { language } = useLanguage();
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={container} className="relative w-full py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[#A3A3A3] text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-mono block">
            {language === 'vi' ? 'Hành Trình & Cột Mốc' : 'Journey & Milestones'}
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
            {language === 'vi' ? 'Kinh Nghiệm Thực Chiến' : 'Hands-on Experience'}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-white via-white/50 to-transparent md:-translate-x-1/2 origin-top"
          />

          <div className="space-y-20">
            {experiences.map((exp, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] md:left-1/2 top-8 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10" />

                {/* Content Box */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full md:w-1/2 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}
                >
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors duration-500 group relative overflow-hidden">
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                    
                    <span className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 text-white/70 text-xs font-mono uppercase tracking-wider border border-white/10">
                      {exp.duration[language]}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                      {exp.role[language]}
                    </h3>
                    <a href={exp.link} target="_blank" rel="noreferrer" className="inline-block text-lg font-medium text-[#A3A3A3] mb-4 hover:text-white transition-colors relative z-10">
                      @ {exp.company[language]}
                    </a>
                    <p className="text-white/60 leading-relaxed font-light">
                      {exp.description[language]}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
