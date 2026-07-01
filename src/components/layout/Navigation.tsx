import { motion } from 'framer-motion';
import logoUrl from '/kn-logo.svg?url';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Magnetic } from '../ui/Magnetic';
import { LangToggle } from '../ui/LangToggle';
import { useLanguage } from '../../contexts/LanguageContext';
import { glassMove } from '../../lib/glass';

const ZALO = 'https://zalo.me/0789500902';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
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

  const linkCls = 'px-2 py-1 lg:px-4 lg:py-2 rounded-full text-[11px] lg:text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap shrink-0';

  return (
    <header role="banner" className={`fixed top-0 left-0 right-0 z-50 w-full pointer-events-none transition-all duration-500 ${
      scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : ''
    }`}>
      {/* Một hàng: logo + menu (giữa trên desktop / inline trên mobile) + toggle */}
      <div className={`relative px-3 md:px-10 flex items-center justify-between gap-2 transition-all duration-500 ${scrolled ? 'py-3' : 'py-4 lg:py-6'}`}>
        <motion.a
          onClick={(e) => { e.preventDefault(); goTop(); }}
          href="#"
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 cursor-pointer pointer-events-auto shrink-0"
        >
          <img src={logoUrl} alt="kn. — Nguyễn Kỳ Nam" className="h-7 lg:h-8 w-auto object-contain" />
        </motion.a>

        {/* Menu: mobile = ô inline co giãn (vuốt ngang nếu hẹp); desktop = pill canh giữa */}
        <motion.nav
          ref={navRef}
          aria-label="Điều hướng chính"
          data-lenis-prevent
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
          onMouseMove={glassMove}
          className="liquid-glass rounded-full px-1.5 py-1 lg:px-2 lg:py-1.5 pointer-events-auto flex-1 min-w-0 overflow-hidden mx-1 lg:flex-none lg:mx-0 lg:overflow-visible lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <motion.div
            drag="x"
            dragConstraints={navRef}
            dragElastic={0.05}
            dragMomentum={false}
            className="flex items-center gap-0.5 lg:gap-1 w-max cursor-grab active:cursor-grabbing"
          >
            <a href="#" onClick={handleHome} className={linkCls}>{t('nav.home')}</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={linkCls}>{t('nav.about')}</a>
            <a href="#achievements" onClick={(e) => handleNavClick(e, 'achievements')} className={linkCls}>{t('nav.achievements')}</a>
            <a href="#certificates" onClick={(e) => handleNavClick(e, 'certificates')} className={linkCls}>{t('nav.certificates')}</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={linkCls}>{t('nav.contact')}</a>
          </motion.div>
        </motion.nav>

        <motion.div
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center gap-2 lg:gap-3 shrink-0"
        >
          <LangToggle />
          <Magnetic>
            <a
              href={ZALO}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={glassMove}
              className="liquid-glass-blue text-black rounded-full px-6 py-2.5 text-sm font-medium hidden lg:block shrink-0 hover-grow"
            >
              {t('nav.cta')}
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </header>
  );
}
