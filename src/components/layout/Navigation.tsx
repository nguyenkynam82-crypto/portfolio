import { motion } from 'framer-motion';
import logoUrl from '/kn-logo.svg?url';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Magnetic } from '../ui/Magnetic';
import { LangToggle } from '../ui/LangToggle';
import { useLanguage } from '../../contexts/LanguageContext';
import { glassMove } from '../../lib/glass';

const ZALO = 'https://zalo.me/0789500902';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHome = (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); goTop(); };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cùng bộ link cho cả desktop (giữa) lẫn mobile (hàng dưới) — chỉ khác class.
  const renderLinks = (cls: string) => (
    <>
      <a href="#" onClick={handleHome} className={cls}>{t('nav.home')}</a>
      <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={cls}>{t('nav.about')}</a>
      <a href="#achievements" onClick={(e) => handleNavClick(e, 'achievements')} className={cls}>{t('nav.achievements')}</a>
      <a href="#certificates" onClick={(e) => handleNavClick(e, 'certificates')} className={cls}>{t('nav.certificates')}</a>
      <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={cls}>{t('nav.contact')}</a>
    </>
  );

  const deskCls = 'px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap';
  const mobCls = 'px-2.5 py-1.5 rounded-full text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap shrink-0';

  return (
    <header role="banner" className={`fixed top-0 left-0 right-0 z-50 w-full pointer-events-none transition-all duration-500 ${
      scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : ''
    }`}>
      {/* Hàng trên: logo + (menu giữa trên desktop) + toggle/CTA */}
      <div className={`relative px-4 md:px-10 flex items-center justify-between gap-3 transition-all duration-500 ${scrolled ? 'py-3' : 'py-4 lg:py-6'}`}>
        <motion.a
          onClick={(e) => { e.preventDefault(); goTop(); }}
          href="#"
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 cursor-pointer pointer-events-auto shrink-0"
        >
          <img src={logoUrl} alt="kn. — Nguyễn Kỳ Nam" className="h-8 w-auto object-contain" />
        </motion.a>

        {/* Menu giữa (desktop) */}
        <motion.nav
          aria-label="Điều hướng chính"
          initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={glassMove}
          className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 liquid-glass rounded-full px-2 py-1.5 pointer-events-auto"
        >
          {renderLinks(deskCls)}
        </motion.nav>

        <motion.div
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center gap-3 shrink-0"
        >
          <LangToggle />
          <Magnetic>
            <a
              href={ZALO}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={glassMove}
              className="liquid-glass-blue text-black rounded-full px-6 py-2.5 text-sm font-medium hidden sm:block shrink-0 hover-grow"
            >
              {t('nav.cta')}
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Hàng dưới: menu ngang cho mobile (hiện luôn, không cần bấm) */}
      <div className="lg:hidden px-3 pb-2 flex justify-center">
        <motion.nav
          aria-label="Điều hướng chính"
          initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
          onMouseMove={glassMove}
          className="flex items-center gap-0.5 liquid-glass rounded-full px-1.5 py-1 pointer-events-auto max-w-full overflow-x-auto"
        >
          {renderLinks(mobCls)}
        </motion.nav>
      </div>
    </header>
  );
}
