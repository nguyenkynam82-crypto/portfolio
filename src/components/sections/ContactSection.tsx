import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiTiktok, SiSpotify, SiMessenger, SiZalo } from 'react-icons/si';
import { glassMove } from '../../lib/glass';
import { useLanguage } from '../../contexts/LanguageContext';

const PHONE = 'tel:0789500902';
const ZALO = 'https://zalo.me/0789500902';
// TODO: xác nhận link Messenger đúng (m.me/<username> của kn.)
const MESSENGER = 'https://m.me/nguyen.ky.nam.461926';

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/nguyen.ky.nam.461926/', Icon: SiFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/sweatheart_3110/', Icon: SiInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@ng.kn211', Icon: SiTiktok },
  { label: 'Locket', href: 'https://locket.camera/links/FjwhKP5wLC1Bs9rc7', Icon: Heart },
  { label: 'Spotify', href: 'https://open.spotify.com/user/314i5ugiwnduiau7ckqlyc3eadei', Icon: SiSpotify },
];

export function ContactSection() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="relative w-full py-28 md:py-40 bg-black border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Left: info + socials */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
            <span className="text-sm md:text-base tracking-[0.3em] uppercase font-mono text-foreground/60 block mb-5">{t('contact.eyebrow')}</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-6 leading-tight">{t('contact.title1')}<br />{t('contact.title2')}</h2>
            <p className="text-foreground/70 text-lg font-light leading-relaxed mb-10 max-w-md">
              {t('contact.desc')}
            </p>

            <div className="space-y-5 mb-10">
              <a href="mailto:nguyenkynam82@gmail.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                <span onMouseMove={glassMove} className="w-12 h-12 rounded-full liquid-glass hover-grow flex items-center justify-center shrink-0"><Mail size={20} /></span>
                <span>
                  <span className="block text-xs font-mono text-foreground/50 mb-0.5 uppercase tracking-wider">{t('contact.emailLabel')}</span>
                  <span className="text-lg font-medium break-all">nguyenkynam82@gmail.com</span>
                </span>
              </a>
              <a
                href="https://maps.app.goo.gl/76FzgiNKMhmcMic79"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group"
              >
                <span onMouseMove={glassMove} className="w-12 h-12 rounded-full liquid-glass hover-grow flex items-center justify-center shrink-0"><MapPin size={20} /></span>
                <span>
                  <span className="block text-xs font-mono text-foreground/50 mb-0.5 uppercase tracking-wider">{t('contact.addressLabel')}</span>
                  <span className="text-lg font-medium underline-offset-2 group-hover:underline">{t('contact.address')}</span>
                </span>
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  onMouseMove={glassMove}
                  className="w-12 h-12 rounded-full liquid-glass text-white hover-grow flex items-center justify-center"
                >
                  <Icon aria-hidden="true" fill="currentColor" className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Zalo QR card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white/[0.04] border border-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-xl flex flex-col items-center text-center"
          >
            <h3 className="text-2xl font-display font-semibold text-white mb-1">{t('contact.zaloTitle')}</h3>
            <p className="text-foreground/70 mb-6">{t('contact.zaloSub')}</p>
            <div className="flex flex-col items-center gap-3 w-full">
              <a
                href={PHONE}
                onMouseMove={glassMove}
                className="liquid-glass-blue text-black rounded-full px-8 py-3.5 text-base font-semibold flex items-center justify-center gap-2 hover-grow min-w-[240px]"
              >
                <Phone size={18} /> {t('contact.zaloCta')}
              </a>
              <a
                href={ZALO} target="_blank" rel="noopener noreferrer"
                onMouseMove={glassMove}
                className="liquid-glass-blue text-black rounded-full px-8 py-3.5 text-base font-semibold flex items-center justify-center gap-2 hover-grow min-w-[240px]"
              >
                <SiZalo className="w-[18px] h-[18px]" aria-hidden="true" /> {t('contact.zaloBtn')}
              </a>
              <a
                href={MESSENGER} target="_blank" rel="noopener noreferrer"
                onMouseMove={glassMove}
                className="liquid-glass-blue text-black rounded-full px-8 py-3.5 text-base font-semibold flex items-center justify-center gap-2 hover-grow min-w-[240px]"
              >
                <SiMessenger className="w-[18px] h-[18px]" aria-hidden="true" /> {t('contact.msgCta')}
              </a>
            </div>
            <span className="text-foreground/50 text-sm font-mono mt-4">Zalo · 0789 500 902</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
