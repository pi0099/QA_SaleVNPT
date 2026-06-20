import type { LocalArea } from "@/lib/content/types";

const quan12Content = `
<h2>Lắp WiFi VNPT tại Quận 12 — hỗ trợ trực tiếp tận nơi</h2>
<p>Quận 12 là khu vực tôi làm việc và hỗ trợ trực tiếp hàng ngày. Từ các khu dân cư ven đường Quốc lộ 1, Tân Thới Hiệp, An Phú Đông đến nhà phố hẻm ở Thạnh Xuân, Thạnh Lộc — mỗi khu vực có điều kiện hạ tầng khác nhau. Tôi kiểm tra hạ tầng theo địa chỉ cụ thể trước khi khuyên khách chọn gói.</p>

<h3>Đặc thù khu vực Quận 12</h3>
<p>Quận 12 có mật độ dân cư cao, nhiều nhà trọ, xưởng nhỏ và hộ kinh doanh ven đường. Nhu cầu WiFi thường gồm: học online, bán hàng online, camera cửa hàng và nhiều thiết bị trong một hộ. Nhà hẻm sâu thường cần chú ý vị trí modem và cân nhắc Mesh nếu sóng yếu ở tầng trên.</p>

<h3>Gói cước phổ biến tại Quận 12</h3>
<p>Hộ 2–3 người thường chọn gói 300 Mbps. Hộ đông thiết bị, quán net nhỏ hoặc livestream tại nhà nên 500 Mbps trở lên. Tôi luôn hỏi số thiết bị và mục đích sử dụng trước khi gợi ý để tránh chọn gói quá cao hoặc quá thấp.</p>

<h3>Quy trình hỗ trợ tại Quận 12</h3>
<p>Liên hệ Zalo hoặc gọi điện → gửi địa chỉ → kiểm tra hạ tầng → chốt gói và phí → hẹn kỹ thuật lắp tận nơi. Vì làm việc trực tiếp tại Quận 12, thời gian hẹn thường linh hoạt hơn so với khu vực xa.</p>

<h3>Khu vực lân cận cũng hỗ trợ</h3>
<p>Ngoài Quận 12, tôi còn hỗ trợ tư vấn các quận lân cận như Gò Vấp, Tân Bình, Hóc Môn và Thủ Đức. Tuy nhiên trang này tập trung nội dung riêng cho Quận 12 vì đây là khu vực phục vụ chính.</p>
`;

export const localAreas: LocalArea[] = [
  {
    id: "wifi-vnpt-quan-12",
    name: "Quận 12",
    slug: "wifi-vnpt-quan-12",
    serviceType: "wifi-vnpt",
    seoTitle: "Lắp WiFi VNPT Quận 12 | Tư vấn tận nơi, lắp nhanh",
    seoDescription:
      "Nhân viên VNPT hỗ trợ lắp WiFi VNPT tại Quận 12, TP.HCM. Kiểm tra hạ tầng theo địa chỉ, tư vấn gói phù hợp, hẹn lắp tận nơi.",
    content: quan12Content.trim(),
    isActive: true,
    hasDedicatedPage: true,
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
