import { motion } from 'framer-motion';
import logoUrl from '/kn-logo.svg?url';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Magnetic } from '../ui/Magnetic';

const ZALO = 'https://zalo.me/0789500902';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
          className="flex items-center gap-8 liquid-glass rounded-full px-8 py-3 pointer-events-auto border border-white/10"
        >
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Giới thiệu</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Liên hệ</a>
        </motion.nav>
      </div>

      {/* Right: CTA */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-4 xl:gap-6 justify-self-end"
      >
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hidden md:block text-sm font-medium text-white/70 hover:text-white transition-colors shrink-0">Liên hệ</a>
        <Magnetic>
          <a
            href={ZALO}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium bg-white text-black rounded-full px-6 py-2.5 text-sm font-medium hover:scale-105 transition-transform hidden sm:block shrink-0"
          >
            Hợp tác cùng kn.
          </a>
        </Magnetic>
      </motion.div>
    </header>
  );
}
