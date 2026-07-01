import { Hero } from '../features/Hero';
import { AboutSection } from '../sections/AboutSection';
import { StatsSection } from '../sections/StatsSection';
import { AchievementsSection } from '../sections/AchievementsSection';
import { CertificatesSection } from '../sections/CertificatesSection';
import { ContactSection } from '../sections/ContactSection';
import { BottomNav } from '../layout/BottomNav';
import { Navigation } from '../layout/Navigation';
import { Footer } from '../layout/Footer';

// Personal-intro site for kn. (Nguyễn Kỳ Nam):
// Hero -> Giới thiệu -> Số liệu -> Thành tích -> Chứng chỉ -> Liên hệ.
export function HomePage() {
  return (
    <>
      <Navigation />
      <BottomNav />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <StatsSection />
        <AchievementsSection />
        <CertificatesSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
