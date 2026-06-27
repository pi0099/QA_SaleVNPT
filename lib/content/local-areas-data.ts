import type { LocalArea } from "@/lib/content/types";
import {
  quan12DetailHtml,
  quan12RegistrationHtml,
  quan12SuitableForHtml,
} from "@/lib/content/service-page-bodies";

export const localAreas: LocalArea[] = [
  {
    id: "wifi-vnpt-quan-12",
    name: "Quận 12",
    slug: "wifi-vnpt-quan-12",
    serviceType: "wifi-vnpt",
    seoTitle:
      "Lắp WiFi VNPT Quận 12 - Giá Tốt, Lắp Nhanh Trong Ngày, Tư Vấn Tận Nơi",
    seoDescription:
      "Lắp WiFi VNPT tại Quận 12, TP.HCM. Bảng giá nội/ngoại thành, kiểm tra hạ tầng theo địa chỉ, hẹn kỹ thuật lắp tận nơi. Tư vấn miễn phí qua Zalo!",
    content: quan12DetailHtml.trim(),
    suitableForHtml: quan12SuitableForHtml.trim(),
    registrationHtml: quan12RegistrationHtml.trim(),
    isActive: true,
    hasDedicatedPage: false,
    faqs: [
      {
        question: "Lắp WiFi VNPT Quận 12 mất bao lâu?",
        answer:
          "Thường 1–2 ngày làm việc vì tôi hỗ trợ trực tiếp tại Quận 12, hẹn lịch linh hoạt.",
      },
      {
        question: "Quận 12 có hạ tầng VNPT không?",
        answer:
          "Phần lớn khu dân cư có hạ tầng, nhưng cần kiểm tra theo địa chỉ cụ thể. Gửi địa chỉ để tôi kiểm tra.",
      },
      {
        question: "Nhà trọ ở Quận 12 nên chọn gói nào?",
        answer:
          "Tùy số phòng và thiết bị. Trọ 5–10 phòng thường cần 500 Mbps trở lên kết hợp Mesh.",
      },
      {
        question: "Có hỗ trợ lắp cuối tuần không?",
        answer:
          "Liên hệ trước để sắp lịch. Tôi cố gắng hẹn theo thời gian thuận tiện cho khách tại Quận 12.",
      },
      {
        question: "Phí hòa mạng tại Quận 12 có khác quận khác không?",
        answer:
          "Phí hòa mạng theo chính sách chung VNPT, không phụ thuộc quận. Tôi báo rõ trước khi đăng ký.",
      },
    ],
    relatedPostSlugs: [
      "lap-wifi-vnpt-mat-bao-lau",
      "lap-wifi-vnpt-can-giay-to-gi",
      "wifi-vnpt-300mbps-co-du-dung-khong",
    ],
  },
  {
    id: "go-vap",
    name: "Gò Vấp",
    slug: "go-vap",
    serviceType: "wifi-vnpt",
    seoTitle: "",
    seoDescription: "",
    content: "",
    isActive: true,
    hasDedicatedPage: false,
    faqs: [],
    relatedPostSlugs: [],
  },
  {
    id: "hoc-mon",
    name: "Hóc Môn",
    slug: "hoc-mon",
    serviceType: "wifi-vnpt",
    seoTitle: "",
    seoDescription: "",
    content: "",
    isActive: true,
    hasDedicatedPage: false,
    faqs: [],
    relatedPostSlugs: [],
  },
  {
    id: "tan-binh",
    name: "Tân Bình",
    slug: "tan-binh",
    serviceType: "wifi-vnpt",
    seoTitle: "",
    seoDescription: "",
    content: "",
    isActive: true,
    hasDedicatedPage: false,
    faqs: [],
    relatedPostSlugs: [],
  },
];

/** Areas listed in FAQ/footer without dedicated pages */
export const supportedAreaNames = [
  "Quận 12",
  "Gò Vấp",
  "Hóc Môn",
  "Tân Bình",
  "Thủ Đức",
  "Bình Tân",
];
