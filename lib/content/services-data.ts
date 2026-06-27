import type { Service } from "@/lib/content/types";
import {
  cameraDetailHtml,
  cameraRegistrationHtml,
  cameraSuitableForHtml,
  comboDetailHtml,
  comboRegistrationHtml,
  comboSuitableForHtml,
  simDetailHtml,
  simRegistrationHtml,
  simSuitableForHtml,
  wifiDetailHtml,
  wifiRegistrationHtml,
  wifiSuitableForHtml,
} from "@/lib/content/service-page-bodies";

export const services: Service[] = [
  {
    id: "wifi-vnpt",
    title: "Lắp WiFi VNPT",
    slug: "wifi-vnpt",
    shortDescription:
      "Tư vấn gói Internet gia đình VNPT, kiểm tra hạ tầng theo địa chỉ và hỗ trợ lắp đặt tận nơi tại TP.HCM.",
    longContent: wifiDetailHtml.trim(),
    suitableForHtml: wifiSuitableForHtml.trim(),
    registrationHtml: wifiRegistrationHtml.trim(),
    seoTitle:
      "Đăng Ký WiFi VNPT TP.HCM - Giá Từ 190K/Tháng, Lắp Nhanh Tận Nơi",
    seoDescription:
      "Bảng giá WiFi VNPT nội & ngoại thành TP.HCM. Gói 300Mbps–1Gbps, tư vấn miễn phí, kiểm tra hạ tầng theo địa chỉ và lắp tận nơi Quận 12. Đăng ký qua Zalo!",
    category: "internet",
    isActive: true,
    order: 1,
    sectionId: "internet-gia-dinh",
    faqs: [
      {
        question: "Lắp WiFi VNPT mất bao lâu?",
        answer:
          "Thường 1–3 ngày làm việc sau khi xác nhận hạ tầng và hồ sơ. Khu vực Quận 12 thường được ưu tiên hẹn sớm hơn.",
      },
      {
        question: "Lắp WiFi VNPT cần giấy tờ gì?",
        answer:
          "CMND/CCCD và thông tin liên hệ chính xác. Nhà thuê có thể cần thêm thông tin chủ nhà tùy khu vực.",
      },
      {
        question: "WiFi VNPT 300 Mbps có đủ dùng không?",
        answer:
          "Đủ cho 2–4 thiết bị cơ bản. Hộ đông thiết bị hoặc xem 4K nên cân nhắc 500 Mbps trở lên.",
      },
      {
        question: "Có hỗ trợ WiFi Mesh không?",
        answer:
          "Có. Tôi tư vấn thêm Mesh khi nhà nhiều tầng hoặc sóng yếu ở phía xa modem.",
      },
      {
        question: "Phí hòa mạng WiFi VNPT bao nhiêu?",
        answer:
          "Theo chính sách từng thời điểm, tham khảo bảng giá trang chủ. Tôi báo rõ trước khi đăng ký.",
      },
      {
        question: "Tôi ở Quận 12 có được hỗ trợ trực tiếp không?",
        answer:
          "Có. Quận 12 là khu vực tôi hỗ trợ trực tiếp, có thể hẹn khảo sát và lắp đặt tận nơi.",
      },
    ],
    relatedPostSlugs: [
      "bang-gia-lap-wifi-vnpt-2026",
      "lap-wifi-vnpt-mat-bao-lau",
      "wifi-mesh-la-gi",
      "wifi-yeu-phai-lam-gi",
    ],
  },
  {
    id: "internet-di-dong-vnpt",
    title: "Combo Internet + Di động VNPT",
    slug: "internet-di-dong-vnpt",
    shortDescription:
      "Gói combo WiFi + SIM tiện lợi cho gia đình cần internet cố định và data di động trong một bill.",
    longContent: comboDetailHtml.trim(),
    suitableForHtml: comboSuitableForHtml.trim(),
    registrationHtml: comboRegistrationHtml.trim(),
    seoTitle:
      "Combo Internet + Di Động VNPT - WiFi & SIM Gia Đình Giá Tốt TP.HCM",
    seoDescription:
      "Gói combo Internet + SIM VNPT tiết kiệm cho gia đình TP.HCM. Một hóa đơn, WiFi ổn định + data di động. Tư vấn HOME SÀNH, HOME ĐỈNH — lắp tận nơi.",
    category: "combo",
    isActive: true,
    order: 2,
    sectionId: "internet-di-dong",
    faqs: [
      {
        question: "Combo Internet + di động khác gì đăng ký riêng?",
        answer:
          "Combo gom hai dịch vụ, thường có ưu đãi tổng và một hóa đơn. Phù hợp gia đình dùng cả WiFi và SIM.",
      },
      {
        question: "Combo có bao nhiêu SIM?",
        answer:
          "Tùy gói combo. Tôi sẽ giải thích rõ số SIM và data đi kèm khi tư vấn.",
      },
      {
        question: "Đang dùng WiFi VNPT có chuyển combo được không?",
        answer:
          "Thường được nhưng cần kiểm tra gói hiện tại và thời hạn cam kết trước.",
      },
      {
        question: "Combo phù hợp hộ mấy người?",
        answer:
          "Thường phù hợp hộ 3–5 người có nhu cầu WiFi và data di động vừa phải.",
      },
      {
        question: "Thời gian lắp WiFi combo mất bao lâu?",
        answer:
          "Tương tự lắp Internet thường: 1–3 ngày làm việc sau khi chốt gói.",
      },
    ],
    relatedPostSlugs: [
      "internet-vnpt-va-wifi-mesh-cho-nha-nhieu-tang",
      "bang-gia-lap-wifi-vnpt-2026",
    ],
  },
  {
    id: "sim-5g-vnpt",
    title: "SIM 5G / 4G VNPT",
    slug: "sim-5g-vnpt",
    shortDescription:
      "Tư vấn gói 5G data, SIM 4G và eSIM VNPT theo mức sử dụng thực tế tại TP.HCM.",
    longContent: simDetailHtml.trim(),
    suitableForHtml: simSuitableForHtml.trim(),
    registrationHtml: simRegistrationHtml.trim(),
    seoTitle:
      "SIM 5G VNPT TP.HCM - Gói Data Lớn, eSIM, Kích Hoạt Nhanh",
    seoDescription:
      "Tư vấn SIM 5G/4G VNPT tại TP.HCM. Gói data từ 100K, combo thoại + data, SIM U1500 500GB ~91k/tháng. Hỗ trợ eSIM, giao SIM tận nơi.",
    category: "mobile",
    isActive: true,
    order: 3,
    sectionId: "goi-5g-data",
    faqs: [
      {
        question: "SIM 5G VNPT có cần đổi SIM không?",
        answer:
          "SIM 4G cũ có thể cần đổi USIM mới. Tôi kiểm tra loại SIM hiện tại trước khi hướng dẫn.",
      },
      {
        question: "eSIM VNPT kích hoạt thế nào?",
        answer:
          "Qua QR code trên điện thoại hỗ trợ eSIM. Cần kết nối WiFi khi kích hoạt lần đầu.",
      },
      {
        question: "Gói 5G nào phù hợp livestream?",
        answer:
          "Gói data lớn, ưu tiên băng thông cao. Tôi gợi ý theo thời lượng stream mỗi ngày.",
      },
      {
        question: "4G và 5G khác nhau thế nào trên thực tế?",
        answer:
          "5G nhanh hơn ở vùng có sóng, độ trễ thấp hơn. 4G vẫn ổn cho lướt web và video thông thường.",
      },
      {
        question: "Mất sóng 5G phải làm gì?",
        answer:
          "Kiểm tra vùng phủ, cài APN đúng, thử bật/tắt chế độ mạng. Xem bài hướng dẫn APN trong mục Tin tức.",
      },
      {
        question: "Có giao SIM tận nơi không?",
        answer:
          "Tùy loại gói và khu vực. Liên hệ Zalo hoặc gọi điện để xác nhận.",
      },
    ],
    relatedPostSlugs: [
      "sim-5g-vnpt-co-can-doi-sim",
      "esim-vnpt-la-gi",
      "goi-5g-vnpt-nao-phu-hop",
      "apn-5g-vnpt",
    ],
  },
  {
    id: "camera-vnpt",
    title: "Lắp Camera VNPT",
    slug: "camera-vnpt",
    shortDescription:
      "Tư vấn camera giám sát VNPT, lưu cloud và lắp đặt tận nơi cho nhà ở, cửa hàng tại TP.HCM.",
    longContent: cameraDetailHtml.trim(),
    suitableForHtml: cameraSuitableForHtml.trim(),
    registrationHtml: cameraRegistrationHtml.trim(),
    seoTitle:
      "Lắp Camera VNPT TP.HCM - Cloud 7–30 Ngày, Tư Vấn & Lắp Tận Nơi",
    seoDescription:
      "Camera giám sát VNPT cho nhà ở, cửa hàng TP.HCM. Lưu cloud, cảnh báo chuyển động, lắp tận nơi. Kết hợp WiFi ổn định — báo giá nhanh qua Zalo.",
    category: "camera",
    isActive: true,
    order: 4,
    sectionId: "camera",
    faqs: [
      {
        question: "Camera VNPT có lưu cloud không?",
        answer:
          "Có các gói cloud lưu 7–30 ngày tùy gói. Tôi giải thích rõ phí và cách xem lại.",
      },
      {
        question: "Camera WiFi hay bị mất kết nối?",
        answer:
          "Thường do sóng WiFi yếu. Nên kiểm tra WiFi trước hoặc dùng camera có dây.",
      },
      {
        question: "Nên lắp mấy camera cho nhà phố?",
        answer:
          "Thường 2–4 camera: cửa chính, sân, phòng khách. Tôi khảo sát theo mặt bằng thực tế.",
      },
      {
        question: "Lắp camera cần WiFi VNPT không?",
        answer:
          "Camera WiFi cần internet ổn định. Có thể dùng WiFi nhà hoặc đăng ký combo Internet + Camera.",
      },
      {
        question: "Xem camera trên điện thoại thế nào?",
        answer:
          "Qua app VNPT sau khi kỹ thuật cài đặt và hướng dẫn. Tôi hỗ trợ setup ban đầu.",
      },
    ],
    relatedPostSlugs: [
      "camera-vnpt-co-luu-cloud-khong",
      "camera-wifi-hay-bi-mat-ket-noi",
      "nen-lap-camera-wifi-hay-camera-co-day",
    ],
  },
];
