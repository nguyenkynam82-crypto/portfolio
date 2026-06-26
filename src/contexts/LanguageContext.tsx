import { createContext, useContext } from 'react';

export type Language = 'vi' | 'en';

type Dictionary = {
  [key: string]: string;
};

export const dictionaries: Record<Language, Dictionary> = {
  vi: {
    'nav.about': 'Giới Thiệu',
    'nav.projects': 'Dự Án',
    'nav.services': 'Dịch Vụ',
    'nav.insights': 'Góc Nhìn',
    'nav.contact': 'Liên Hệ',
    
    'hero.role': 'kn. — Người trẻ kinh doanh thực chiến',
    'hero.cta': 'Khám phá Hành trình',

    'about.title': 'Bắt đầu sớm, đi thật xa',
    'about.desc': 'Mình là Nguyễn Kỳ Nam (kn.) — người trẻ kinh doanh thực chiến, chia sẻ cách tư duy, giao tiếp tự tin và tự chủ tài chính để bạn bứt phá từ sớm.',
    
    'stats.experience': 'Năm Kinh Nghiệm',
    'stats.clients': 'Khách Hàng',
    'stats.revenue': 'Doanh Thu Tạo Ra',
    
    'insights.title': 'Góc Nhìn Chuyên Gia',
    'insights.subtitle': 'Thought Leadership',
    'insights.desc': 'Những bài viết, phân tích và case-study chuyên sâu về Data Science, AI và xu hướng công nghệ tương lai.',
    
    'faq.title': 'Câu Hỏi Thường Gặp',
    'faq.desc': 'Mọi thắc mắc của bạn về quy trình hợp tác và dịch vụ.',
    'faq.showMore': 'Xem thêm câu hỏi',

    'contact.title': 'Đặt Lịch Tư Vấn VIP',
    'contact.subtitle': 'Premium Booking',
    'contact.desc': 'Bắt đầu dự án đột phá tiếp theo của bạn cùng tôi. Vui lòng để lại thông tin để thiết lập cuộc hẹn tư vấn chuyên sâu 1-1.',
    'contact.form.name': 'Tên của bạn',
    'contact.form.email': 'Email làm việc',
    'contact.form.message': 'Dự án hoặc vấn đề bạn đang gặp phải...',
    'contact.form.submit': 'Gửi Yêu Cầu Chuyên Gia',
    'contact.form.opened': 'Đã mở email — bấm Gửi để hoàn tất!',
    'contact.location.label': 'Địa chỉ',
    'contact.location.value': 'Cần Thơ, Việt Nam',

    'recognitions.title': 'Công Nghệ Cốt Lõi',
    'recognitions.subtitle': 'Tech Stack'
  },
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.insights': 'Insights',
    'nav.contact': 'Contact',
    
    'hero.role': 'kn. — Young hands-on entrepreneur',
    'hero.cta': 'Explore Journey',

    'about.title': 'Start early, go far',
    'about.desc': 'I am Nguyễn Kỳ Nam (kn.) — a young hands-on entrepreneur sharing mindset, confident communication, and early financial independence so you can break through sooner.',
    
    'stats.experience': 'Years Experience',
    'stats.clients': 'Clients Worldwide',
    'stats.revenue': 'Revenue Generated',
    
    'insights.title': 'Expert Insights',
    'insights.subtitle': 'Thought Leadership',
    'insights.desc': 'In-depth articles, analyses, and case studies on Data Science, AI, and future technology trends.',
    
    'faq.title': 'Frequently Asked Questions',
    'faq.desc': 'Everything you need to know about our collaboration and services.',
    'faq.showMore': 'Show more questions',

    'contact.title': 'VIP Consultation',
    'contact.subtitle': 'Premium Booking',
    'contact.desc': 'Start your next breakthrough project with me. Leave your information to set up an in-depth 1-on-1 consultation.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Work Email',
    'contact.form.message': 'Your project or challenge...',
    'contact.form.submit': 'Send Expert Request',
    'contact.form.opened': 'Email draft opened — hit Send to finish!',
    'contact.location.label': 'Location',
    'contact.location.value': 'Can Tho, Vietnam',

    'recognitions.title': 'Core Technologies',
    'recognitions.subtitle': 'Tech Stack'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
