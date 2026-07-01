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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header role="banner" className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 w-full pointer-events-none grid grid-cols-2 lg:grid-cols-3 items-center gap-4 transition-all duration-500 ${
      scrolled ? 'py-4 bg-black/70 backdrop-blur-md border-b border-white/10' : 'py-6'
    }`}>
      {/* Left: Logo */}
      <motion.a
        onClick={(e) => {
          e.preventDefault();
          if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        href="#"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 cursor-pointer pointer-events-auto justify-self-start"
      >
        <img src={logoUrl} alt="kn. — Nguyễn Kỳ Nam" className="h-8 w-auto object-contain" />
      </motion.a>

      {/* Center: Links */}
      <div className="hidden lg:flex justify-self-center">
        <motion.nav
          aria-label="Điều hướng chính"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={glassMove}
          className="flex items-center gap-1 liquid-glass rounded-full px-2 py-1.5 pointer-events-auto"
        >
          <a href="#" onClick={handleHome} className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors">{t('nav.home')}</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors">{t('nav.about')}</a>
          <a href="#achievements" onClick={(e) => handleNavClick(e, 'achievements')} className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors">{t('nav.achievements')}</a>
          <a href="#certificates" onClick={(e) => handleNavClick(e, 'certificates')} className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors">{t('nav.certificates')}</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors">{t('nav.contact')}</a>
        </motion.nav>
      </div>

      {/* Right: CTA */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-3 xl:gap-4 justify-self-end"
      >
        <LangToggle />
        <Magnetic>
          <a
            href={ZALO}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={glassMove}
            className="liquid-glass-blue text-white rounded-full px-6 py-2.5 text-sm font-medium hidden sm:block shrink-0 hover-grow"
          >
            {t('nav.cta')}
          </a>
        </Magnetic>
      </motion.div>
    </header>
  );
}
