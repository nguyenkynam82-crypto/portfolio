import { motion } from 'framer-motion';
import { MessageSquareQuote, Brain, Sparkles, Users } from 'lucide-react';
import { glassMove } from '../../lib/glass';
import { useLanguage } from '../../contexts/LanguageContext';

const capabilities = [
  { icon: MessageSquareQuote, key: 'about.cap1' },
  { icon: Brain, key: 'about.cap2' },
  { icon: Sparkles, key: 'about.cap3' },
  { icon: Users, key: 'about.cap4' },
];

export function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative w-full py-28 md:py-40 bg-black overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase font-mono text-foreground/60 block mb-6"
        >
          {t('about.eyebrow')}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-10 leading-tight"
        >
          {t('about.greet')}<span className="text-mask-gradient">kn.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-6 text-lg md:text-xl text-foreground/80 font-light leading-relaxed max-w-3xl mb-16"
        >
          <p>{t('about.p1a')}<strong className="text-white font-semibold">{t('about.p1b')}</strong>{t('about.p1c')}</p>
          <p>{t('about.p2')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-14">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <c.icon className="w-6 h-6 text-white shrink-0" aria-hidden="true" />
              <span className="text-white/90 font-medium">{t(c.key)}</span>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="https://maps.app.goo.gl/76FzgiNKMhmcMic79"
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={glassMove}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-foreground/80 hover:text-white text-sm font-mono cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-primary" /> {t('about.location')}
        </motion.a>
      </div>
    </section>
  );
}
