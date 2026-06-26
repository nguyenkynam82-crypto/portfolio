import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { articles, type Article } from '../../data/articles';
import { ArticleModal } from '../features/ArticleModal';

export function InsightsSection() {
  const { t, language } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="insights" className="relative w-full py-32 bg-black overflow-hidden border-t border-white/5 content-defer">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-black to-black opacity-60" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-mono block flex items-center gap-2 justify-center md:justify-start">
              <BookOpen size={16} /> {t('insights.subtitle')}
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6">
              {t('insights.title')}
            </h2>
            <p className="text-[#A3A3A3] text-lg font-light leading-relaxed">
              {t('insights.desc')}
            </p>
          </div>
          
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.button
              onClick={() => setSelectedArticle(article)}
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative text-left block w-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-colors focus:outline-none"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={article.image}
                  alt={article.title[language]}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-mono text-white/90 border border-white/10 uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative">
                <div className="flex items-center gap-4 text-xs font-mono text-[#A3A3A3] mb-4">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title[language]}
                </h3>

                <p className="text-white/60 font-light line-clamp-3 mb-6 text-sm md:text-base">
                  {article.excerpt[language]}
                </p>
                
                <div className="flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
              </div>

      <ArticleModal 
        article={selectedArticle} 
        isOpen={selectedArticle !== null} 
        onClose={() => setSelectedArticle(null)} 
      />
    </section>
  );
}
