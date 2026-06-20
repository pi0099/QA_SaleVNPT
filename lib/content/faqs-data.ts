import type { Faq } from "@/lib/content/types";

export const faqsData: Faq[] = [
  {
    id: "1",
    question: "Lắp WiFi VNPT mất bao lâu?",
    answer:
      "Thường 1–3 ngày làm việc sau khi xác nhận hạ tầng. Khu vực Quận 12 thường được hẹn sớm hơn vì tôi hỗ trợ trực tiếp tại đây.",
    category: "wifi",
    serviceSlug: "wifi-vnpt",
    order: 1,
    isActive: true,
  },
  {
    id: "2",
    question: "Phí hòa mạng WiFi VNPT bao nhiêu?",
    answer:
      "Phí hòa mạng theo chính sách từng thời điểm, tham khảo bảng giá trang chủ. Tôi luôn báo rõ trước khi khách đăng ký.",
    category: "wifi",
    serviceSlug: "wifi-vnpt",
    order: 2,
    isActive: true,
  },
  {
    id: "3",
    question: "Website này có phải VNPT chính thức không?",
    answer:
      "Không. Đây là website tư vấn đăng ký dịch vụ của nhân viên VNPT hỗ trợ khu vực Quận 12 và TP.HCM, không phải cổng thông tin toàn quốc của VNPT.",
    category: "general",
    order: 3,
    isActive: true,
  },
  {
    id: "4",
    question: "SIM 5G VNPT có cần đổi SIM không?",
    answer:
      "SIM 4G cũ có thể cần đổi USIM mới. Gửi thông tin qua Zalo để tôi kiểm tra trước.",
    category: "sim",
    serviceSlug: "sim-5g-vnpt",
    order: 4,
    isActive: true,
  },
  {
    id: "5",
    question: "Camera VNPT có lưu cloud không?",
    answer:
      "Có. Gói cloud lưu 7–30 ngày tùy gói. Tôi giải thích rõ phí và cách xem lại khi tư vấn.",
    category: "camera",
    serviceSlug: "camera-vnpt",
    order: 5,
    isActive: true,
  },
  {
    id: "6",
    question: "Tôi ở Quận 12 có được hỗ trợ tận nơi không?",
    answer:
      "Có. Quận 12 là khu vực tôi làm việc trực tiếp, hỗ trợ khảo sát và lắp đặt tận nơi.",
    category: "local",
    serviceSlug: "wifi-vnpt",
    order: 6,
    isActive: true,
  },
  {
    id: "7",
    question: "Combo Internet + di động có tiết kiệm hơn không?",
    answer:
      "Thường có ưu đãi khi gom hai dịch vụ. Tôi so sánh tổng chi phí combo với gói rời trước khi khuyên đăng ký.",
    category: "combo",
    serviceSlug: "internet-di-dong-vnpt",
    order: 7,
    isActive: true,
  },
  {
    id: "8",
    question: "Đăng ký online có cần ra quầy không?",
    answer:
      "Không bắt buộc. Khách có thể gửi thông tin qua Zalo hoặc form trên website, tôi hỗ trợ tư vấn và hẹn lịch online.",
    category: "general",
    order: 8,
    isActive: true,
  },
];
