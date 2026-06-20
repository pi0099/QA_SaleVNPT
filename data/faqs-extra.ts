import type { Faq } from "@/lib/content/types";

/** Additional FAQ entries — additive only, does not replace production faqs in lib/content/faqs-data.ts */
export const extraFaqs: Omit<Faq, "id" | "order" | "isActive">[] = [
  {
    question: "WiFi Mesh VNPT giá bao nhiêu?",
    answer:
      "Phụ thuộc số node Mesh và gói Internet. Liên hệ tư vấn để báo giá theo diện tích nhà.",
    category: "wifi",
    serviceSlug: "wifi-vnpt",
  },
  {
    question: "Có lắp WiFi cuối tuần không?",
    answer:
      "Có thể hẹn lịch linh hoạt tại Quận 12. Liên hệ Zalo trước để xác nhận.",
    category: "wifi",
    serviceSlug: "wifi-vnpt",
  },
  {
    question: "eSIM VNPT dùng được trên iPhone không?",
    answer: "Có, nếu iPhone hỗ trợ eSIM và đã cập nhật iOS mới.",
    category: "sim",
    serviceSlug: "sim-5g-vnpt",
  },
  {
    question: "Gói 5G có dùng hotspot được không?",
    answer: "Tùy gói cước. Tôi sẽ giải thích rõ khi tư vấn.",
    category: "sim",
    serviceSlug: "sim-5g-vnpt",
  },
  {
    question: "Camera VNPT xem trên mấy điện thoại?",
    answer:
      "Thường không giới hạn số máy đăng nhập app, tùy gói cloud.",
    category: "camera",
    serviceSlug: "camera-vnpt",
  },
  {
    question: "Thanh toán cước VNPT thế nào?",
    answer:
      "Có thể thanh toán online, chuyển khoản hoặc tại quầy giao dịch VNPT.",
    category: "payment",
  },
  {
    question: "Chuyển nhà có chuyển WiFi VNPT được không?",
    answer:
      "Có thể yêu cầu chuyển địa điểm nếu hạ tầng mới có VNPT. Liên hệ trước khi chuyển.",
    category: "wifi",
    serviceSlug: "wifi-vnpt",
  },
  {
    question: "Modem WiFi bị nóng có sao không?",
    answer:
      "Modem quá nóng có thể gây mất mạng. Đặt nơi thoáng, tránh tủ kín.",
    category: "technical",
  },
  {
    question: "Nhà trọ nhiều phòng nên chọn gói nào?",
    answer:
      "Thường 500 Mbps trở lên kết hợp Mesh. Cần khảo sát số phòng và thiết bị.",
    category: "wifi",
    serviceSlug: "wifi-vnpt-quan-12",
  },
  {
    question: "SIM 4G VNPT còn bán không?",
    answer:
      "Có. Vẫn phù hợp điện thoại phổ thông và nhu cầu data vừa phải.",
    category: "sim",
    serviceSlug: "sim-5g-vnpt",
  },
  {
    question: "Internet bị chậm buổi tối phải làm gì?",
    answer:
      "Giờ cao điểm nhiều người dùng. Thử restart modem, giảm thiết bị tải nặng.",
    category: "technical",
  },
  {
    question: "Đăng ký combo có cam kết thời gian không?",
    answer:
      "Tùy gói và chính sách từng thời điểm. Tôi giải thích rõ trước khi ký.",
    category: "payment",
    serviceSlug: "internet-di-dong-vnpt",
  },
];
