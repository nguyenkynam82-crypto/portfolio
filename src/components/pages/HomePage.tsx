import { Hero } from '../features/Hero';
import { AboutSection } from '../sections/AboutSection';
import { ContactSection } from '../sections/ContactSection';
import { BottomNav } from '../layout/BottomNav';
import { Navigation } from '../layout/Navigation';
import { Footer } from '../layout/Footer';

// Simple personal-intro site for kn. (Nguyễn Kỳ Nam):
// Hero -> Giới thiệu -> Số liệu -> Liên hệ. No sales/cert/blog sections.
export function HomePage() {
  return (
    <>
      <Navigation />
      <BottomNav />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
