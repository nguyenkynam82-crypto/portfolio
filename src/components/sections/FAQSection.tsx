import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { faqs } from '../../data/faqs';

export function FAQSection() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section id="faq" className="w-full py-24 md:py-32 bg-black border-t border-white/5 content-defer">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6 uppercase tracking-tight">
            {t('faq.title')}
          </h2>
          <p className="text-[#A3A3A3] text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {t('faq.desc')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {displayedFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
              className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] transition-colors hover:bg-white/5"
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white pr-8 font-display tracking-wide">{faq.question[language]}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-white/50 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div id={`faq-answer-${index}`} role="region" className="p-6 pt-0 text-[#A3A3A3] leading-relaxed font-light">
                      {faq.answer[language]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {!showAll && faqs.length > 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-mono uppercase tracking-wider text-sm transition-all hover:bg-white/10 hover:border-white/20"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              {t('faq.showMore')}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
