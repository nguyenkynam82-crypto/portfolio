import { createContext, useContext } from 'react';

export type Language = 'vi' | 'en';

type Dictionary = {
  [key: string]: string;
};

export const dictionaries: Record<Language, Dictionary> = {
  vi: {
    // Navigation
    'nav.about': 'Giới thiệu',
    'nav.achievements': 'Thành tích',
    'nav.certificates': 'Chứng chỉ',
    'nav.contact': 'Liên hệ',
    'nav.cta': 'in bóc kn. liền nhaa',
    'nav.zalo': 'Nhắn Zalo',

    // Hero
    'hero.title1': 'Ý chí dẫn đến',
    'hero.title2': 'Thành công',
    'hero.more': '[ Tìm hiểu thêm ]',

    // About
    'about.eyebrow': 'Giới thiệu',
    'about.greet': 'Hé lô, tui là ',
    'about.p1a': 'Tui là Kỳ Nam — hiện là học sinh chuẩn bị lên cấp 3, đang sinh sống và học tập tại TP. Cần Thơ. Tới thời điểm này, tui đã sở hữu ',
    'about.p1b': 'hơn 10 huy chương',
    'about.p1c': ' ở các cự li chạy bộ như 5km, 10km và 21km.',
    'about.p2': 'Thế mạnh của tui nằm ở khả năng truyền đạt ý tưởng, dẫn dắt đội nhóm và tư duy logic, sáng tạo trong cả công việc lẫn học tập. Bên cạnh đó, tui còn tự tin ở khả năng kết bạn và giao tiếp với mọi người.',
    'about.cap1': 'Truyền đạt & Thuyết phục bằng ngôn từ',
    'about.cap2': 'Khả năng tiếp thu & học hỏi nhanh nhẹn',
    'about.cap3': 'Sáng tạo trong công việc & học tập',
    'about.cap4': 'Thân thiện, dễ dàng kết nối các mối quan hệ xung quanh',
    'about.location': 'Cần Thơ, Việt Nam',

    // Achievements
    'ach.eyebrow': 'Thành tích',
    'ach.title': 'Thành tích chạy bộ',
    'ach.desc1': '3 lần chinh phục cự li 21km (Half Marathon) của tui nè😁.',
    'ach.desc2': 'Ấn vào từng giải để xem chi tiết hành trình nhé.',
    'ach.viewDetail': 'Xem chi tiết →',
    'ach.medalsPre': 'Bộ sưu tập ',
    'ach.medalsHi': 'huy chương',
    'ach.medalsDesc': 'Các giải 5km, 10km và trekking trên hành trình.',
    'ach.viewStory': 'Xem câu chuyện →',

    // Modal (chung cho thành tích / chứng chỉ)
    'modal.distance': 'Cự li',
    'modal.time': 'Thời gian hoàn thành',
    'modal.date': 'Ngày diễn ra',
    'modal.location': 'Địa điểm diễn ra',
    'modal.bib': 'BIB',
    'modal.moments': 'Khoảnh khắc & huy chương',
    'modal.story': 'Câu chuyện',
    'modal.storyEmpty': 'Câu chuyện sẽ được cập nhật sớm…',
    'modal.close': 'Đóng',
    'modal.prev': 'Ảnh trước',
    'modal.next': 'Ảnh sau',
    'modal.zoom': 'Phóng to ảnh',

    // Certificates
    'cert.eyebrow': 'Chứng chỉ',
    'cert.title': 'Chứng chỉ & bằng khen',
    'cert.desc1': 'Các chứng chỉ và bằng khen mà tui đã đạt được nè😁.',
    'cert.desc2': 'Ấn vào để xem hành trình chinh phục của kn. nhé.',
    'cert.viewStory': 'Xem câu chuyện →',

    // Contact
    'contact.eyebrow': 'Liên hệ',
    'contact.title1': 'Cùng nhau',
    'contact.title2': 'tạo giá trị.',
    'contact.desc': 'Bạn muốn hợp tác, học hỏi hay đơn giản là kết nối? Nhắn cho mình nhé — mình luôn sẵn sàng đồng hành.',
    'contact.emailLabel': 'Email',
    'contact.addressLabel': 'Địa chỉ',
    'contact.address': 'Hưng Phú, Cần Thơ, Việt Nam',
    'contact.zaloTitle': 'Kết nối với mình',
    'contact.zaloSub': 'Quét mã Zalo hoặc nhắn mình bên dưới',
    'contact.zaloCta': 'Hợp tác cùng kn.',
    'contact.msgCta': 'Nhắn Messenger',

    // Footer
    'footer.rights': 'Bản quyền đã được bảo hộ.',
    'footer.privacy': 'Chính Sách Bảo Mật',
    'footer.terms': 'Điều Khoản',
    'footer.cookies': 'Cookie',
    'footer.disclaimer': 'Miễn Trừ',
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.achievements': 'Achievements',
    'nav.certificates': 'Certificates',
    'nav.contact': 'Contact',
    'nav.cta': 'inbox kn. right away!',
    'nav.zalo': 'Message Zalo',

    // Hero
    'hero.title1': "Where there's a will,",
    'hero.title2': "there's a way",
    'hero.more': '[ Learn more ]',

    // About
    'about.eyebrow': 'About',
    'about.greet': "Hi, I'm ",
    'about.p1a': "I'm Ky Nam — a soon-to-be high schooler living and studying in Cantho. Honestly, I've already racked up ",
    'about.p1b': '10+ medals',
    'about.p1c': ' from running 5K, 10K, and 21K races.',
    'about.p2': "My strong suits? Getting ideas across, leading a team, and thinking both logically and creatively — whether it's work or school. I'm also a total people person, so making friends and clicking with just about anyone comes easy to me.",
    'about.cap1': 'Communicate & persuade with words',
    'about.cap2': 'Quick to absorb & learn',
    'about.cap3': 'Creative in work & study',
    'about.cap4': 'Friendly, easy to connect with people',
    'about.location': 'Cantho, Vietnam',

    // Achievements
    'ach.eyebrow': 'Achievements',
    'ach.title': 'Running achievements',
    'ach.desc1': '3 times I conquered the 21K (Half Marathon) distance 😁.',
    'ach.desc2': 'Tap any race to check out the full journey.',
    'ach.viewDetail': 'View details →',
    'ach.medalsPre': 'Medal ',
    'ach.medalsHi': 'collection',
    'ach.medalsDesc': '5K, 10K, and trekking races along the way.',
    'ach.viewStory': 'View story →',

    // Modal
    'modal.distance': 'Distance',
    'modal.time': 'Finish time',
    'modal.date': 'Event date',
    'modal.location': 'Event location',
    'modal.bib': 'BIB',
    'modal.moments': 'Moments & medal',
    'modal.story': 'Story',
    'modal.storyEmpty': 'Story coming soon…',
    'modal.close': 'Close',
    'modal.prev': 'Previous image',
    'modal.next': 'Next image',
    'modal.zoom': 'Zoom image',

    // Certificates
    'cert.eyebrow': 'Certificates',
    'cert.title': 'Certificates & awards',
    'cert.desc1': "The certificates and awards I've earned 😁.",
    'cert.desc2': 'Tap to see how kn. earned them.',
    'cert.viewStory': 'View story →',

    // Contact
    'contact.eyebrow': 'Contact',
    'contact.title1': "Let's create",
    'contact.title2': 'value together.',
    'contact.desc': "Want to team up, learn, or just connect? Shoot me a message — I'm always down to chat.",
    'contact.emailLabel': 'Email',
    'contact.addressLabel': 'Address',
    'contact.address': 'Hungphu, Cantho, Vietnam',
    'contact.zaloTitle': "Let's connect",
    'contact.zaloSub': 'Scan the Zalo code or message me below',
    'contact.zaloCta': 'Work with kn.',
    'contact.msgCta': 'Message on Messenger',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms',
    'footer.cookies': 'Cookies',
    'footer.disclaimer': 'Disclaimer',
  },
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
