import { Mail, Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiTiktok, SiSpotify } from 'react-icons/si';
import { Link } from 'react-router-dom';
import logoUrl from '/kn-logo.svg?url';

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/nguyen.ky.nam.461926/', Icon: SiFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/sweatheart_3110/', Icon: SiInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@kn.ng211', Icon: SiTiktok },
  { label: 'Locket', href: 'https://locket.camera/links/FjwhKP5wLC1Bs9rc7', Icon: Heart },
  { label: 'Spotify', href: 'https://open.spotify.com/user/314i5ugiwnduiau7ckqlyc3eadei', Icon: SiSpotify },
];

export function Footer() {
  return (
    <footer className="relative py-16 px-6 bg-background z-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        <div className="flex flex-col items-center md:items-start">
          <img src={logoUrl} alt="kn. — Nguyễn Kỳ Nam" className="h-12 w-auto mb-5" />
          <a href="mailto:nguyenkynam82@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" /> nguyenkynam82@gmail.com
          </a>
        </div>

        <div className="flex gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 text-white hover-grow flex items-center justify-center"
            >
              <Icon aria-hidden="true" focusable="false" fill="currentColor" className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Nguyễn Kỳ Nam (kn.). Bản quyền đã được bảo hộ.</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Chính Sách Bảo Mật</Link>
          <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Điều Khoản</Link>
          <Link to="/cookies-policy" className="hover:text-foreground transition-colors">Cookie</Link>
          <Link to="/disclaimer" className="hover:text-foreground transition-colors">Miễn Trừ</Link>
        </div>
      </div>
    </footer>
  );
}
