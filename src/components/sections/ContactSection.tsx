import { motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { SiFacebook, SiInstagram, SiTiktok, SiGithub, SiSpotify } from 'react-icons/si';

const ZALO = 'https://zalo.me/0789500902';

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/nguyen.ky.nam.461926/', Icon: SiFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/sweatheart_3110/', Icon: SiInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@kn.ng211', Icon: SiTiktok },
  { label: 'GitHub', href: 'https://github.com/nguyenkynam82-crypto/CV', Icon: SiGithub },
  { label: 'Spotify', href: 'https://open.spotify.com/user/314i5ugiwnduiau7ckqlyc3eadei', Icon: SiSpotify },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-28 md:py-40 bg-black border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Left: info + socials */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
            <span className="text-sm md:text-base tracking-[0.3em] uppercase font-mono text-foreground/60 block mb-5">Liên hệ</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-6 leading-tight">Cùng nhau<br />tạo giá trị.</h2>
            <p className="text-foreground/70 text-lg font-light leading-relaxed mb-10 max-w-md">
              Bạn muốn hợp tác, học hỏi hay đơn giản là kết nối? Nhắn cho mình nhé — mình luôn sẵn sàng đồng hành.
            </p>

            <div className="space-y-5 mb-10">
              <a href="mailto:nguyenkynam82@gmail.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                <span className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors"><Mail size={20} /></span>
                <span>
                  <span className="block text-xs font-mono text-foreground/50 mb-0.5 uppercase tracking-wider">Email</span>
                  <span className="text-lg font-medium break-all">nguyenkynam82@gmail.com</span>
                </span>
              </a>
              <div className="flex items-center gap-4 text-white/80">
                <span className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><MapPin size={20} /></span>
                <span>
                  <span className="block text-xs font-mono text-foreground/50 mb-0.5 uppercase tracking-wider">Địa chỉ</span>
                  <span className="text-lg font-medium">i8, Đường 13, KDC 586, Hưng Phú, Cần Thơ</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:-translate-y-1 transition-all flex items-center justify-center"
                >
                  <Icon aria-hidden="true" className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Zalo QR card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white/[0.04] border border-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-xl flex flex-col items-center text-center"
          >
            <div className="bg-[#ffffff] p-3 rounded-2xl shadow-lg mb-6">
              <img src={`${import.meta.env.BASE_URL}zalo-qr.jpg`} alt="Mã QR Zalo của kn." loading="lazy" decoding="async" className="w-44 h-44 object-contain rounded-lg" />
            </div>
            <h3 className="text-2xl font-display font-semibold text-white mb-1">Nhắn Zalo cho mình</h3>
            <p className="text-foreground/70 mb-6">Quét mã hoặc bấm nút bên dưới</p>
            <a
              href={ZALO} target="_blank" rel="noopener noreferrer"
              className="btn-premium bg-white text-black rounded-full px-8 py-3.5 text-base font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              <MessageCircle size={18} /> Hợp tác cùng kn.
            </a>
            <span className="text-foreground/50 text-sm font-mono mt-4">Zalo · 0789 500 902</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
