import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <button
      onClick={toggleLanguage}
      role="switch"
      aria-checked={language === 'en'}
      title={language === 'vi' ? 'Đổi ngôn ngữ EN / VI' : 'Switch language EN / VI'}
      className="relative flex items-center justify-between w-[52px] h-7 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-1 transition-colors cursor-pointer shrink-0"
    >
      <div className="absolute inset-0 flex justify-between items-center px-1.5 pointer-events-none">
        <span className={`text-[10px] font-bold ${language === 'vi' ? 'text-white/60' : 'text-white/80'} z-10`}>EN</span>
        <span className={`text-[10px] font-bold ${language === 'en' ? 'text-white/60' : 'text-white/80'} z-10`}>VI</span>
      </div>
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md z-20"
        animate={{ x: language === 'vi' ? 0 : 24 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
