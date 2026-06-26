import { motion } from 'framer-motion';
import { LazyVideo } from '../ui/LazyVideo';
import { useLanguage } from '../../contexts/LanguageContext';

export function FeaturedVideoSection() {
  const { language } = useLanguage();
  return (
    <section className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl overflow-hidden aspect-video bg-white/5 border border-white/10"
        >
          {/* Main Video */}
          <LazyVideo
            className="w-full h-full object-cover"
            src={`${import.meta.env.BASE_URL}media/featured-promethium.mp4`}
          />

          {/* Gradient overlay for bottom content readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Bottom Content Area */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-end">
            
            {/* Left Glass Card */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md w-full">
              <div className="text-white/50 text-xs tracking-widest uppercase mb-3">
                Masterpiece Project
              </div>
              <h3 className="text-white text-xl font-display mb-2">Promethium Modpack</h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {language === 'vi'
                  ? 'Tái cấu trúc toàn bộ tệp config và thiết lập lại điểm cân bằng tài nguyên, đạt mốc 1,000+ lượt tải tự nhiên trên CurseForge.'
                  : 'Restructured the entire config stack and rebalanced the resource economy, reaching 1,000+ organic downloads on CurseForge.'}
              </p>
            </div>

            {/* Right Action Button */}
            <motion.a
              href="https://www.curseforge.com/minecraft/modpacks/promethium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium w-full md:w-auto text-center cursor-pointer hover:bg-white/5 transition-colors"
            >
              {language === 'vi' ? 'Khám phá dự án' : 'Explore the project'}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
