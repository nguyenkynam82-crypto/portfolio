import { useLanguage } from '../../contexts/LanguageContext';
import { glassMove } from '../../lib/glass';

/** Nút gạt VI ↔ EN: pill navy + con trượt trắng hiện ngôn ngữ đang chọn. */
export function LangToggle() {
  const { language, setLanguage } = useLanguage();
  const isEn = language === 'en';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEn}
      aria-label={isEn ? 'Switch to Vietnamese' : 'Switch to English'}
      onMouseMove={glassMove}
      onClick={() => setLanguage(isEn ? 'vi' : 'en')}
      className="relative inline-flex items-center h-9 w-16 rounded-full liquid-glass-blue shrink-0 pointer-events-auto"
    >
      <span
        className="absolute top-1 left-1 h-7 w-7 rounded-full bg-[#ffffff] text-[#060935] text-[11px] font-bold flex items-center justify-center shadow-md transition-transform duration-300 ease-out"
        style={{ transform: isEn ? 'translateX(28px)' : 'translateX(0)' }}
      >
        {isEn ? 'EN' : 'VI'}
      </span>
    </button>
  );
}
