export type FAQ = {
  id: number;
  question: { vi: string; en: string };
  answer: { vi: string; en: string };
};

export const faqs: FAQ[] = [
  {
    id: 1,
    question: {
      vi: "Timeline cho một dự án Data Science thường kéo dài bao lâu?",
      en: "How long is the typical timeline for a Data Science project?"
    },
    answer: {
      vi: "Tùy thuộc vào quy mô, nhưng với triết lý tối ưu Agile, dự án nhỏ (như Dashboard, ETL đơn giản) có thể hoàn thành trong 1-2 tuần. Các mô hình Machine Learning phức tạp (Recommendation, NLP) thường mất 4-8 tuần từ khâu làm sạch dữ liệu đến khi deploy lên server.",
      en: "Depending on the scale, but with an Agile approach, small projects (like Dashboards, simple ETL) can be completed in 1-2 weeks. Complex Machine Learning models (Recommendation, NLP) typically take 4-8 weeks from data cleaning to server deployment."
    }
  },
  {
    id: 2,
    question: {
      vi: "Nguyễn Vũ Đông Quân cung cấp những dịch vụ cụ thể nào?",
      en: "What specific services does Nguyen Vu Dong Quan provide?"
    },
    answer: {
      vi: "Tôi cung cấp 3 nhóm dịch vụ chính: (1) Tư vấn kiến trúc Dữ liệu & AI cho doanh nghiệp, (2) Xây dựng Data Pipeline tự động hóa (ETL/ELT), và (3) Huấn luyện và Triển khai các mô hình Machine Learning (XAI, LLM) phục vụ ra quyết định kinh doanh.",
      en: "I provide 3 main groups of services: (1) Data & AI architecture consulting for businesses, (2) Automated Data Pipeline construction (ETL/ELT), and (3) Training and Deployment of Machine Learning models (XAI, LLM) for business decision making."
    }
  },
  {
    id: 3,
    question: {
      vi: "Bạn có hỗ trợ bảo hành hoặc tinh chỉnh mô hình sau khi bàn giao không?",
      en: "Do you offer warranty or model fine-tuning after delivery?"
    },
    answer: {
      vi: "Chắc chắn. Mọi mô hình Machine Learning đều bị hiện tượng Data Drift (trôi dạt dữ liệu) theo thời gian. Tôi cung cấp gói bảo trì 3-6 tháng sau triển khai để tinh chỉnh độ chính xác (Accuracy) và đảm bảo hệ thống vận hành trơn tru.",
      en: "Absolutely. Every Machine Learning model experiences Data Drift over time. I offer a 3-6 month maintenance package post-deployment to fine-tune accuracy and ensure the system runs smoothly."
    }
  },
  {
    id: 4,
    question: {
      vi: "Chi phí tư vấn và triển khai được tính như thế nào?",
      en: "How are consulting and implementation costs calculated?"
    },
    answer: {
      vi: "Chi phí được tính linh hoạt theo 2 hình thức: Cố định theo Dự án (Project-based) hoặc Theo giờ tư vấn chuyên sâu (Retainer). Mọi chi phí sẽ được minh bạch hóa trong bản đề xuất (Proposal) sau cuộc gọi tư vấn đầu tiên.",
      en: "Costs are calculated flexibly in 2 ways: Fixed Project-based or Hourly Retainer for in-depth consulting. All costs will be made transparent in the Proposal after the initial consultation call."
    }
  },
  {
    id: 5,
    question: {
      vi: "Tôi là doanh nghiệp SME, liệu có quá sớm để ứng dụng AI?",
      en: "I am an SME business, is it too early to apply AI?"
    },
    answer: {
      vi: "Không bao giờ là quá sớm. Thậm chí các SME càng cần AI và Tự động hóa để tối ưu chi phí vận hành. Chúng ta có thể bắt đầu với những bước nhỏ như tự động hóa báo cáo tự động, hay phân tích tệp khách hàng cơ bản.",
      en: "It is never too early. In fact, SMEs need AI and Automation the most to optimize operating costs. We can start with small steps like automating reports or basic customer segmentation."
    }
  },
  {
    id: 6,
    question: {
      vi: "Ngôn ngữ lập trình và công cụ cốt lõi bạn sử dụng là gì?",
      en: "What core programming languages and tools do you use?"
    },
    answer: {
      vi: "Ngôn ngữ chính là Python và SQL. Stack công nghệ bao gồm: Pandas, Scikit-learn, TensorFlow/PyTorch cho ML/DL; Airflow, dbt cho Data Engineering; và AWS/GCP cho Cloud Deployment. Trực quan hóa dữ liệu với Tableau, PowerBI hoặc các Custom React Dashboards.",
      en: "Main languages are Python and SQL. Tech stack includes: Pandas, Scikit-learn, TensorFlow/PyTorch for ML/DL; Airflow, dbt for Data Engineering; and AWS/GCP for Cloud Deployment. Data visualization with Tableau, PowerBI, or Custom React Dashboards."
    }
  },
  {
    id: 7,
    question: {
      vi: "Làm sao để đảm bảo dữ liệu của công ty tôi được bảo mật?",
      en: "How do you ensure my company's data is secure?"
    },
    answer: {
      vi: "Tôi tuân thủ nghiêm ngặt chuẩn NDA (Thỏa thuận bảo mật thông tin). Quá trình xử lý dữ liệu được thực hiện trên Cloud riêng tư của doanh nghiệp (On-premise hoặc VPC). Dữ liệu nhạy cảm luôn được mã hóa (Anonymization/Masking).",
      en: "I strictly adhere to NDAs (Non-Disclosure Agreements). Data processing is executed on the business's private Cloud (On-premise or VPC). Sensitive data is always anonymized or masked."
    }
  },
  {
    id: 8,
    question: {
      vi: "Quy trình làm việc (Workflow) chuẩn của bạn là gì?",
      en: "What is your standard workflow?"
    },
    answer: {
      vi: "Gồm 5 bước: (1) Discovery - Khám phá bài toán. (2) Data Audit - Kiểm toán chất lượng dữ liệu. (3) Strategy & Modeling - Lên chiến lược và huấn luyện mô hình. (4) Deployment - Tích hợp hệ thống. (5) Monitoring - Theo dõi & Tinh chỉnh.",
      en: "It consists of 5 steps: (1) Discovery - Understanding the problem. (2) Data Audit - Assessing data quality. (3) Strategy & Modeling - Strategy formulation and model training. (4) Deployment - System integration. (5) Monitoring - Tracking & Fine-tuning."
    }
  },
  {
    id: 9,
    question: {
      vi: "Tôi có thể xem các case-study thành công trước đây không?",
      en: "Can I view your previous successful case studies?"
    },
    answer: {
      vi: "Có. Ngài có thể xem tại mục 'Dự án (Projects)' trên website này hoặc đọc các bài viết chuyên sâu tại mục 'Góc Nhìn (Insights)' để hiểu cách tôi tiếp cận và giải quyết vấn đề.",
      en: "Yes. You can view them in the 'Projects' section on this website or read in-depth articles in the 'Insights' section to understand how I approach and solve problems."
    }
  },
  {
    id: 10,
    question: {
      vi: "Khác biệt giữa Nguyễn Vũ Đông Quân và một Data Agency thông thường là gì?",
      en: "What is the difference between Nguyen Vu Dong Quan and a typical Data Agency?"
    },
    answer: {
      vi: "Đó là triết lý 'Tech-Driven Innovator' và sự tập trung cá nhân hóa 1-1. Tôi không chỉ giao báo cáo, tôi thiết kế toàn bộ kiến trúc giải quyết tận gốc nỗi đau kinh doanh của ngài bằng thuật toán tối ưu nhất, không rập khuôn.",
      en: "It's the 'Tech-Driven Innovator' philosophy and personalized 1-on-1 focus. I don't just deliver reports; I design the entire architecture to solve your business pain points from the root using optimal, non-cookie-cutter algorithms."
    }
  },
  {
    id: 11,
    question: {
      vi: "Bạn có nhận đào tạo in-house (nội bộ) cho doanh nghiệp không?",
      en: "Do you offer in-house training for businesses?"
    },
    answer: {
      vi: "Có, tôi thiết kế các khóa học thực chiến về Data Literacy, SQL Advanced, Python for Data Science và GenAI được tinh chỉnh riêng cho nhu cầu của từng phòng ban trong công ty.",
      en: "Yes, I design practical courses on Data Literacy, Advanced SQL, Python for Data Science, and GenAI tailored specifically to the needs of each department in the company."
    }
  },
  {
    id: 12,
    question: {
      vi: "Làm thế nào để bắt đầu một dự án?",
      en: "How do we start a project?"
    },
    answer: {
      vi: "Rất đơn giản, hãy điền thông tin vào form ở mục 'Đặt Lịch Tư Vấn VIP'. Tôi sẽ trực tiếp liên hệ lại trong vòng 24h để sắp xếp một buổi họp online (Google Meet) nhằm tìm hiểu sâu hơn.",
      en: "It's very simple. Fill out the form in the 'VIP Consultation' section. I will personally contact you within 24 hours to schedule an online meeting (Google Meet) for deeper understanding."
    }
  },
  {
    id: 13,
    question: {
      vi: "Bạn đánh giá thế nào về tương lai của GenAI (AI Tạo sinh)?",
      en: "How do you evaluate the future of GenAI (Generative AI)?"
    },
    answer: {
      vi: "GenAI không thay thế con người, nhưng người dùng GenAI sẽ thay thế người không dùng. Nó là công cụ khuếch đại năng suất. Trọng tâm trong 5 năm tới là ứng dụng GenAI với RAG (Retrieval-Augmented Generation) trên tệp dữ liệu nội bộ.",
      en: "GenAI won't replace humans, but humans using GenAI will replace those who don't. It's a productivity amplifier. The focus for the next 5 years is applying GenAI with RAG (Retrieval-Augmented Generation) on internal data sets."
    }
  },
  {
    id: 14,
    question: {
      vi: "Tôi không có nền tảng kỹ thuật, liệu có làm việc được với bạn?",
      en: "I don't have a technical background, can we still work together?"
    },
    answer: {
      vi: "Tuyệt đối có thể. Trách nhiệm của tôi là dịch ngôn ngữ máy móc thành ngôn ngữ kinh doanh. Bạn chỉ cần đưa ra 'Mục tiêu kinh doanh', tôi sẽ biến nó thành 'Bài toán Dữ liệu' và giải quyết.",
      en: "Absolutely. My responsibility is to translate machine language into business language. You just need to provide the 'Business Goal', and I will turn it into a 'Data Problem' and solve it."
    }
  },
  {
    id: 15,
    question: {
      vi: "Mô hình hợp tác theo tháng (Monthly Retainer) bao gồm những gì?",
      en: "What does the Monthly Retainer collaboration model include?"
    },
    answer: {
      vi: "Gói Retainer cho phép tôi trở thành một Fractional Chief Data Officer (Giám đốc Dữ liệu bán thời gian) của ngài. Tôi sẽ giám sát toàn bộ hệ thống dữ liệu, xử lý các yêu cầu Ad-hoc, và họp định hướng chiến lược hàng tuần.",
      en: "The Retainer package allows me to become your Fractional Chief Data Officer. I will oversee the entire data system, handle ad-hoc requests, and hold weekly strategic alignment meetings."
    }
  }
];
