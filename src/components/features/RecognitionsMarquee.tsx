import { useLanguage } from '../../contexts/LanguageContext';
import {
  SiPython, SiPandas, SiScikitlearn, SiTensorflow, SiReact,
  SiTypescript, SiGooglegemini, SiKaggle
} from 'react-icons/si';

const partners = [
  { name: "Python", icon: SiPython },
  { name: "Pandas", icon: SiPandas },
  { name: "scikit-learn", icon: SiScikitlearn },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "Gemini AI", icon: SiGooglegemini },
  { name: "Kaggle", icon: SiKaggle },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript }
];

export function RecognitionsMarquee() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-20 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none w-full" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-20 mb-10 text-center">
        <span className="text-[#A3A3A3] text-xs md:text-sm tracking-[0.3em] uppercase font-mono block">
          {t('recognitions.subtitle')}
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex" aria-hidden="true">
        <div className="flex animate-marquee whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity duration-500">
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div 
              key={i} 
              className="mx-8 md:mx-16 flex items-center gap-3 filter grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <partner.icon aria-hidden="true" focusable="false" className="w-5 h-5 md:w-6 md:h-6 opacity-80" />
              </div>
              <span className="text-xl md:text-2xl font-display font-medium text-white/80 tracking-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
