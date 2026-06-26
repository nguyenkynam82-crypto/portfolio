import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, ExternalLink, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Certificate {
  id: string;
  title: string;
  description: { vi: string; en: string };
  image: string;
  link: string;
}

const certificates: Certificate[] = [
  {
    id: "intro-programming",
    title: "Intro to Programming",
    description: { vi: "Nắm vững tư duy lập trình cốt lõi và nền tảng thuật toán.", en: "A firm command of core programming logic and algorithmic foundations." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Intro to Programming.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/intro-to-programming"
  },
  {
    id: "python",
    title: "Python",
    description: { vi: "Chuyên gia ngôn ngữ Python, tối ưu mã nguồn và xử lý dữ liệu.", en: "Python expertise — optimized code and efficient data processing." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Python.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/python"
  },
  {
    id: "intro-ml",
    title: "Intro to Machine Learning",
    description: { vi: "Xây dựng và đánh giá các mô hình học máy dự đoán nền tảng.", en: "Building and evaluating foundational predictive Machine Learning models." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Intro to Machine Learning.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/intro-to-machine-learning"
  },
  {
    id: "pandas",
    title: "Pandas",
    description: { vi: "Kỹ năng phân tích, thao tác và xử lý dữ liệu quy mô lớn.", en: "Analyzing, manipulating, and processing data at scale." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Pandas.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/pandas"
  },
  {
    id: "intermediate-ml",
    title: "Intermediate Machine Learning",
    description: { vi: "Xử lý dữ liệu khuyết thiếu, biến phân loại và rò rỉ dữ liệu.", en: "Handling missing values, categorical variables, and data leakage." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Intermediate Machine Learning.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/intermediate-machine-learning"
  },
  {
    id: "data-viz",
    title: "Data Visualization",
    description: { vi: "Chuyển hóa dữ liệu phức tạp thành biểu đồ trực quan, kể câu chuyện dữ liệu.", en: "Turning complex data into compelling visuals that tell a story." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Data Visualization.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/data-visualization"
  },
  {
    id: "feature-eng",
    title: "Feature Engineering",
    description: { vi: "Kỹ nghệ đặc trưng nâng cao để tối ưu độ chính xác của mô hình.", en: "Advanced feature engineering to maximize model accuracy." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Feature Engineering.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/feature-engineering"
  },
  {
    id: "intro-sql",
    title: "Intro to SQL",
    description: { vi: "Khai thác dữ liệu quan hệ, phân tích truy vấn cấp cơ sở.", en: "Mining relational data with foundational query analysis." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Intro to SQL.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/intro-to-sql"
  },
  {
    id: "advanced-sql",
    title: "Advanced SQL",
    description: { vi: "Kỹ thuật SQL bậc cao, tối ưu hóa truy vấn dữ liệu Big Data.", en: "High-level SQL techniques and query optimization for Big Data." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Advanced SQL.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/advanced-sql"
  },
  {
    id: "intro-dl",
    title: "Intro to Deep Learning",
    description: { vi: "Thiết kế mạng nơ-ron nhân tạo bằng TensorFlow/Keras.", en: "Designing artificial neural networks with TensorFlow/Keras." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Intro to Deep Learning.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/intro-to-deep-learning"
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: { vi: "Xử lý ảnh số và trích xuất đặc trưng hình ảnh bằng mô hình học sâu.", en: "Digital image processing and visual feature extraction with deep learning models." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Computer Vision.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/computer-vision"
  },
  {
    id: "time-series",
    title: "Time Series",
    description: { vi: "Phân tích và dự báo chuỗi thời gian chuyên sâu.", en: "In-depth time-series analysis and forecasting." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Time Series.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/time-series"
  },
  {
    id: "data-cleaning",
    title: "Data Cleaning",
    description: { vi: "Tinh chuẩn hóa và làm sạch bộ dữ liệu thô, đảm bảo tính toàn vẹn.", en: "Standardizing and cleaning raw datasets to guarantee data integrity." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Data Cleaning.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/data-cleaning"
  },
  {
    id: "ai-ethics",
    title: "Intro to AI Ethics",
    description: { vi: "Đảm bảo đạo đức AI, chống thiên vị và xây dựng hệ thống công bằng.", en: "Upholding AI ethics — countering bias and building fair systems." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Intro to AI Ethics.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/intro-to-ai-ethics"
  },
  {
    id: "geospatial",
    title: "Geospatial Analysis",
    description: { vi: "Phân tích dữ liệu không gian, vị trí địa lý và bản đồ học tương tác.", en: "Spatial data analysis, geolocation, and interactive cartography." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Geospatial Analysis.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/geospatial-analysis"
  },
  {
    id: "ml-explainability",
    title: "Machine Learning Explainability",
    description: { vi: "Giải mã hộp đen AI, lý giải cơ chế quyết định của các mô hình học máy.", en: "Decoding the AI black box — explaining how Machine Learning models make decisions." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Machine Learning Explainability.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/machine-learning-explainability"
  },
  {
    id: "game-ai",
    title: "Intro to Game AI and Reinforcement Learning",
    description: { vi: "Phát triển AI tư duy trong môi trường tương tác qua Học Tăng Cường.", en: "Building AI that reasons in interactive environments through Reinforcement Learning." },
    image: "/donquaan/assets/certificates/Nguyen Vu Dong Quan - Intro to Game AI and Reinforcement Learning.png",
    link: "https://www.kaggle.com/learn/certification/nguyenvudongquan/intro-to-game-ai-and-reinforcement-learning"
  }
];

const marqueeCertificates = [...certificates, ...certificates];

export function CertificatesMarquee() {
  const { language } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Close modal on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  return (
    <div className="w-full mt-24 mb-12 relative z-10 content-defer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-8 text-center sm:text-left">
        <h3 className="text-2xl sm:text-3xl font-display text-white mb-2 flex items-center justify-center sm:justify-start gap-3">
          <BadgeCheck className="text-primary w-6 h-6 sm:w-8 sm:h-8" />
          Kaggle Certifications
        </h3>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl leading-relaxed">
          {language === 'vi' ? <>Được chứng nhận chuyên môn bởi <a href="https://www.kaggle.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium inline-flex items-center gap-1">Kaggle <ExternalLink size={14} /></a> – Nền tảng Khoa học Dữ liệu và Học Máy lớn nhất thế giới thuộc Google, nơi hội tụ của hơn 10 triệu chuyên gia AI toàn cầu.</> : <>Professionally certified by <a href="https://www.kaggle.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium inline-flex items-center gap-1">Kaggle <ExternalLink size={14} /></a> – Google's Data Science and Machine Learning platform, the world's largest, home to a global community of 10 million+ AI experts.</>}
        </p>
      </div>

      <div className="relative w-full overflow-hidden py-4 fade-edges">
        <div className="flex animate-marquee hover:pause w-max gap-4 sm:gap-6 px-4">
          {marqueeCertificates.map((cert, index) => (
            <button
              type="button"
              key={`${cert.id}-${index}`}
              onClick={() => setSelectedCert(cert)}
              className="group relative flex-shrink-0 w-[280px] sm:w-[320px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col liquid-glass text-left"
              aria-label={language === 'vi' ? `Xem chứng chỉ ${cert.title}` : `View the ${cert.title} certificate`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-black/50 relative">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-primary text-sm font-medium flex items-center gap-2">
                    <BadgeCheck size={16} /> {language === 'vi' ? 'Xem Chi Tiết' : 'View Details'}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="text-lg font-medium text-white mb-2 line-clamp-1">{cert.title}</h4>
                <p className="text-sm text-white/50 line-clamp-2 leading-relaxed flex-1">{cert.description[language]}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-black border border-white/20 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(236,72,153,0.15)] flex flex-col h-[95vh] sm:h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex gap-2 sm:gap-3">
                <a 
                  href={selectedCert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 backdrop-blur-md rounded-full px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                  aria-label={language === 'vi' ? 'Xác thực chứng chỉ trên Kaggle' : 'Verify certificate on Kaggle'}
                >
                  <BadgeCheck size={16} className="text-primary drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]" />
                  <span className="hidden sm:inline">{language === 'vi' ? 'Xác thực Kaggle' : 'Verify on Kaggle'}</span>
                  <span className="sm:hidden">{language === 'vi' ? 'Xác thực' : 'Verify'}</span>
                  <ExternalLink size={14} />
                </a>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label={language === 'vi' ? 'Đóng' : 'Close'}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Flex 1 wrapper determines exact remaining height */}
              <div className="w-full bg-[#1e1e1e] flex-1 relative">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(236,72,153,0.4) 0%, transparent 70%)' }} />
                
                {/* Absolute inner wrapper completely isolates image from flex layout calculations */}
                <div className="absolute inset-0 flex items-center justify-center p-4 pt-16 sm:p-8 sm:pt-20">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>
              
              <div className="p-5 sm:p-8 bg-black/90 backdrop-blur-xl border-t border-white/10 shrink-0 relative z-10">
                <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                  <div>
                    <h3 className="text-xl sm:text-3xl font-display text-white mb-2 leading-tight">{selectedCert.title}</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl">{selectedCert.description[language]}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
