export type PackageCard = {
  id: string;
  title: string;
  /** Giá nội thành (hoặc giá duy nhất nếu không có `priceOuterCity`) */
  price: string;
  /** Giá ngoại thành — khi nhập, thẻ hiển thị chuyển vùng Nội/Ngoại thành */
  priceOuterCity?: string;
  /** Download / Upload line shown on the card */
  speed: string;
  features: string[];
  promotion: string;
  variant: "blue" | "orange";
  isPopular: boolean;
};

export type PackageSection = {
  id: string;
  title: string;
  /** CMS: dưới tiêu đề mục + carousel đầu trang (chỉ khi có nội dung) */
  slogan?: string;
  cards: PackageCard[];
};

/** Cài đặt trang chủ: liên hệ (CMS Settings); để trống ẩn icon/link tương ứng */
export const site = {
  phoneNumber: "0900 000 000",
  zalo: "https://zalo.me/0900000000",
  messenger: "",
};

export type SiteSettings = typeof site;

export function phoneNumberToTelHref(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, "");
  if (!digits) return "tel:";
  return `tel:${digits}`;
}

/** Có ít nhất một chữ số để hiển thị nút gọi */
export function siteHasPhone(s: SiteSettings): boolean {
  return /\d/.test(s.phoneNumber);
}

export function siteHasZalo(s: SiteSettings): boolean {
  return s.zalo.trim().length > 0;
}

export function siteHasMessenger(s: SiteSettings): boolean {
  return (s.messenger ?? "").trim().length > 0;
}

export function contactFromSite(s: SiteSettings) {
  return {
    zalo: s.zalo.trim(),
    messenger: (s.messenger ?? "").trim(),
    phone: phoneNumberToTelHref(s.phoneNumber),
    phoneDisplay: s.phoneNumber.trim(),
  };
}

/** Default SEO — used in layout metadata and when CMS has no SEO saved */
export const defaultSeo = {
  title: "Đăng ký WiFi VNPT – Tư vấn miễn phí, lắp đặt nhanh 24h",
  description:
    "Hỗ trợ đăng ký các gói WiFi VNPT, SIM 4G và camera. Tư vấn miễn phí, lắp đặt nhanh chóng, tận nơi.",
  keywords:
    "dang ky WiFi VNPT, ho tro dang ky VNPT, tu van WiFi VNPT, SIM 4G, camera VNPT",
};

export type SeoSettings = typeof defaultSeo;

const bangGiaChungPromotion =
  "Giá gói đã gồm VAT · Phí hòa mạng 300.000đ/lần (đã gồm VAT) · *Gói ~1Gbps: tốc độ 500Mbps đến 1Gbps";

/** Default sections — used when localStorage is empty (bảng giá Nội / Ngoại thành theo VNPT) */
export const defaultSections: PackageSection[] = [
  {
    id: "internet-gia-dinh",
    title: "Gói Internet gia đình",
    cards: [
      {
        id: "inet-home-1",
        title: "HOME 1",
        price: "235.000",
        priceOuterCity: "190.000",
        speed: "300 Mbps",
        features: [
          "Tích hợp: Family Safe / GreenNet",
          "+1 Mesh 5/6: 265.000 đ/th (nội thành), 220.000 đ/th (ngoại thành)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "blue",
        isPopular: false,
      },
      {
        id: "inet-home-2",
        title: "HOME 2",
        price: "280.000",
        priceOuterCity: "240.000",
        speed: "500 Mbps",
        features: [
          "Tích hợp: Family Safe / GreenNet",
          "+1 Mesh 5/6: 310.000 đ/th (nội thành), 270.000 đ/th (ngoại thành)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "orange",
        isPopular: false,
      },
      {
        id: "inet-home-3",
        title: "HOME 3",
        price: "320.000",
        priceOuterCity: "280.000",
        speed: "1 Gbps",
        features: [
          "Tích hợp: Family Safe / GreenNet",
          "+1 Mesh 5/6: 350.000 đ/th (nội thành), 310.000 đ/th (ngoại thành)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "blue",
        isPopular: false,
      },
      {
        id: "inet-hometv-1",
        title: "HOMETV 1",
        price: "255.000",
        priceOuterCity: "210.000",
        speed: "300 Mbps",
        features: [
          "MyTV (App), Family Safe / GreenNet",
          "+1 Mesh 5/6: 285.000 đ/th (nội thành), 240.000 đ/th (ngoại thành)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "orange",
        isPopular: false,
      },
      {
        id: "inet-hometv-2",
        title: "HOMETV 2",
        price: "300.000",
        priceOuterCity: "260.000",
        speed: "500 Mbps",
        features: [
          "MyTV (App), Family Safe / GreenNet",
          "+1 Mesh 5/6: 330.000 đ/th (nội thành), 290.000 đ/th (ngoại thành)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "blue",
        isPopular: true,
      },
      {
        id: "inet-hometv-3",
        title: "HOMETV 3",
        price: "370.000",
        priceOuterCity: "330.000",
        speed: "~1 Gbps*",
        features: [
          "MyTV (App), Family Safe / GreenNet",
          "Gói kèm 01 Wifi Mesh 5/6 (bảng chỉ cột Mesh)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "orange",
        isPopular: false,
      },
      {
        id: "inet-hometv-vip-1",
        title: "HOMETV VIP 1",
        price: "285.000",
        priceOuterCity: "240.000",
        speed: "300 Mbps",
        features: [
          "MyTV VIP (App), Family Safe / GreenNet",
          "+1 Mesh 5/6: 315.000 đ/th (nội thành), 270.000 đ/th (ngoại thành)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "blue",
        isPopular: false,
      },
      {
        id: "inet-hometv-vip-2",
        title: "HOMETV VIP 2",
        price: "330.000",
        priceOuterCity: "290.000",
        speed: "500 Mbps",
        features: [
          "MyTV VIP (App), Family Safe / GreenNet",
          "+1 Mesh 5/6: 360.000 đ/th (nội thành), 320.000 đ/th (ngoại thành)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "orange",
        isPopular: false,
      },
      {
        id: "inet-hometv-vip-3",
        title: "HOMETV VIP 3",
        price: "400.000",
        priceOuterCity: "360.000",
        speed: "~1 Gbps*",
        features: [
          "MyTV VIP (App), Family Safe / GreenNet",
          "Gói kèm 01 Wifi Mesh 5/6 (bảng chỉ cột Mesh)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "blue",
        isPopular: false,
      },
      {
        id: "inet-home-cam-1",
        title: "HOME CAM 1",
        price: "290.000",
        priceOuterCity: "250.000",
        speed: "300 Mbps",
        features: [
          "01 Camera Indoor + lưu Cloud 7 ngày",
          "Gói kèm 01 Wifi Mesh 5/6 (bảng chỉ cột Mesh)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "orange",
        isPopular: false,
      },
      {
        id: "inet-home-cam-2",
        title: "HOME CAM 2",
        price: "350.000",
        priceOuterCity: "310.000",
        speed: "500 Mbps",
        features: [
          "01 Camera Indoor + lưu Cloud 7 ngày",
          "Gói kèm 01 Wifi Mesh 5/6 (bảng chỉ cột Mesh)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "blue",
        isPopular: false,
      },
      {
        id: "inet-home-cam-3",
        title: "HOME CAM 3",
        price: "390.000",
        priceOuterCity: "350.000",
        speed: "~1 Gbps*",
        features: [
          "01 Camera Indoor + lưu Cloud 7 ngày",
          "Gói kèm 01 Wifi Mesh 5/6 (bảng chỉ cột Mesh)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "orange",
        isPopular: false,
      },
    ],
  },
  {
    id: "internet-di-dong",
    title: "Gói Internet + Di động",
    cards: [
      {
        id: "combo-home-sanh-2",
        title: "HOME SÀNH 2",
        price: "249.000",
        speed: "300 Mbps",
        features: [
          "Truyền hình / Mesh: không kèm thiết bị Mesh",
          "Ưu đãi chủ nhóm: 3GB/ngày, 1.500p nội mạng + 89p ngoại mạng/tháng",
          "Ưu đãi nhóm: Miễn phí thoại nội nhóm (tối đa 6 thành viên)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "blue",
        isPopular: false,
      },
      {
        id: "combo-home-sanh-4",
        title: "HOME SÀNH 4",
        price: "359.000",
        speed: "500 Mbps",
        features: [
          "01 Wifi Mesh 5/6",
          "Ưu đãi chủ nhóm: 3GB/ngày, 1.500p nội mạng + 89p ngoại mạng/tháng",
          "Ưu đãi nhóm: Miễn phí thoại nội nhóm (tối đa 6 thành viên)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "orange",
        isPopular: true,
      },
      {
        id: "combo-home-dinh",
        title: "HOME ĐỈNH",
        price: "369.000",
        speed: "500 Mbps",
        features: [
          "MyTV (App)",
          "Ưu đãi chủ nhóm: 2GB/ngày, 1.000p nội mạng + 50p ngoại mạng/tháng",
          "Ưu đãi nhóm: Miễn phí thoại nội nhóm (tối đa 4 thành viên)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "blue",
        isPopular: false,
      },
      {
        id: "combo-home-dinh-3",
        title: "HOME ĐỈNH 3",
        price: "399.000",
        speed: "~1 Gbps*",
        features: [
          "MyTV (App), 01 Wifi Mesh 5/6",
          "Ưu đãi chủ nhóm: 2GB/ngày, 1.000p nội mạng + 50p ngoại mạng/tháng",
          "Ưu đãi nhóm: Miễn phí thoại nội nhóm (tối đa 4 thành viên)",
        ],
        promotion: bangGiaChungPromotion,
        variant: "orange",
        isPopular: false,
      },
    ],
  },
  {
    id: "goi-5g-data",
    title: "Gói 5G Data",
    cards: [
      {
        id: "5g-yolo100m",
        title: "YOLO100M",
        price: "100.000",
        speed: "1GB/ngày",
        features: [
          "Miễn phí data ứng dụng: Facebook, TikTok, YouTube",
          "Xem MyTV không tính dung lượng",
        ],
        promotion: "Chu kỳ 30 ngày",
        variant: "blue",
        isPopular: false,
      },
      {
        id: "5g-yolo125z",
        title: "YOLO125Z",
        price: "125.000",
        speed: "11GB/ngày",
        features: [
          "11GB/ngày trong vùng HCM, 2GB/ngày ngoài vùng",
          "Miễn phí MyTV và VTV Cab",
        ],
        promotion: "Chu kỳ 30 ngày",
        variant: "orange",
        isPopular: false,
      },
      {
        id: "5g-soda125",
        title: "SODA125",
        price: "125.000",
        speed: "8GB/ngày",
        features: [
          "Miễn phí data: TikTok, YouTube",
          "Xem MyTV và học Cambridge không tính dung lượng",
        ],
        promotion: "Chu kỳ 30 ngày",
        variant: "blue",
        isPopular: true,
      },
      {
        id: "5g-5g150",
        title: "5G150",
        price: "150.000",
        speed: "7GB/ngày",
        features: [
          "Miễn phí data: Facebook, TikTok, YouTube",
          "Xem MyTV không tính dung lượng",
        ],
        promotion: "Chu kỳ 30 ngày",
        variant: "orange",
        isPopular: false,
      },
      {
        id: "5g-u900",
        title: "U900",
        price: "900.000",
        speed: "500GB/tháng",
        features: [
          "Tổng 500GB data tốc độ cao cho cả chu kỳ",
          "Phù hợp dùng dài hạn, không cần nạp tháng",
        ],
        promotion: "Chu kỳ 180 ngày",
        variant: "blue",
        isPopular: false,
      },
      {
        id: "5g-u1500",
        title: "U1500",
        price: "1.500.000",
        speed: "500GB/tháng",
        features: [
          "Tổng 500GB data tốc độ cao cho cả chu kỳ",
          "Trọn 1 năm sử dụng, tiết kiệm tối đa",
        ],
        promotion: "Chu kỳ 360 ngày",
        variant: "orange",
        isPopular: false,
      },
    ],
  },
  {
    id: "goi-5g-combo",
    title: "Gói 5G Combo",
    cards: [
      {
        id: "5g-vd120m",
        title: "VD120M",
        price: "120.000",
        speed: "1GB/ngày",
        features: [
          "1.500 phút nội mạng (cuộc gọi dưới 10 phút), 30 phút ngoại mạng",
          "Miễn phí data: Facebook, TikTok, YouTube, MyTV",
        ],
        promotion: "Chu kỳ 30 ngày",
        variant: "blue",
        isPopular: true,
      },
      {
        id: "5g-d159v",
        title: "D159V",
        price: "155.000",
        speed: "8GB/ngày",
        features: [
          "1.500 phút nội mạng, 150 phút ngoại mạng, 200 SMS nội mạng",
          "Miễn phí học Cambridge và xem MyTV",
        ],
        promotion: "Chu kỳ 30 ngày",
        variant: "orange",
        isPopular: false,
      },
      {
        id: "5g-vip199",
        title: "VIP199",
        price: "199.000",
        speed: "8GB/ngày",
        features: [
          "2.000 phút nội mạng, 250 phút ngoại mạng",
          "Miễn phí: Facebook, TikTok, YouTube, MyTV, Cambridge, Zalo, WhatsApp, Instagram",
          "Chia sẻ data 2 thuê bao, hỗ trợ VoLTE/VoWiFi",
        ],
        promotion: "Chu kỳ 30 ngày",
        variant: "blue",
        isPopular: false,
      },
    ],
  },
  {
    id: "sim-4g",
    title: "Gói SIM 4G",
    cards: [
      {
        id: "sim-s",
        title: "DATA S",
        price: "79.000",
        speed: "Tốc độ cao / không giới hạn data",
        features: [
          "120GB data tốc độ cao mỗi tháng",
          "Nghe gọi nội mạng miễn phí",
          "Đổi eSIM trong 15 phút",
        ],
        promotion: "Miễn phí tháng đầu khi đăng ký online!",
        variant: "blue",
        isPopular: false,
      },
      {
        id: "sim-m",
        title: "DATA M",
        price: "129.000",
        speed: "Tốc độ cao / không giới hạn data",
        features: [
          "180GB data tốc độ cao mỗi tháng",
          "50 phút gọi ngoại mạng",
          "Ưu đãi cộng thêm data sinh viên",
        ],
        promotion: "Tặng SIM trắng khi chuyển mạng giữ số!",
        variant: "orange",
        isPopular: true,
      },
      {
        id: "sim-l",
        title: "DATA L",
        price: "199.000",
        speed: "Tốc độ cao / không giới hạn data",
        features: [
          "Không giới hạn data tốc độ cao",
          "Roaming quốc tế ưu đãi",
          "Hỗ trợ eSIM + SIM vật lý",
        ],
        promotion: "Combo gia đình: giảm 20% từ SIM thứ 2!",
        variant: "orange",
        isPopular: false,
      },
    ],
  },
  {
    id: "camera",
    title: "Gói Camera",
    cards: [
      {
        id: "cam-home",
        title: "HOME 2MP",
        price: "390.000",
        speed: "Xem Full HD / lưu cloud 7 ngày",
        features: [
          "2 camera trong nhà + ổ cứng tùy chọn",
          "Cảnh báo chuyển động qua app",
          "Lắp đặt trong ngày tại TP.HCM & Hà Nội",
        ],
        promotion: "Miễn phí lắp đặt trong tháng!",
        variant: "blue",
        isPopular: false,
      },
      {
        id: "cam-pro",
        title: "PRO 4MP",
        price: "690.000",
        speed: "2K / AI người – xe – vật nuôi",
        features: [
          "Góc siêu rộng, tích hợp đèn hồng ngoại",
          "Lưu cloud 30 ngày gói Cloud+",
          "Bảo hành thiết bị 24 tháng",
        ],
        promotion: "Tặng thêm 3 tháng lưu trữ cloud!",
        variant: "orange",
        isPopular: true,
      },
    ],
  },
];

/** @deprecated use defaultSections */
export const sections = defaultSections;

export function getZaloRegisterUrl(
  cardTitle: string,
  zaloBaseUrl: string,
  options?: { priceZone?: "inner" | "outer" },
): string {
  const base = zaloBaseUrl.trim();
  if (!base) return "";
  const sep = base.includes("?") ? "&" : "?";
  let text = `Toi muon dang ky goi ${cardTitle}`;
  if (options?.priceZone === "inner") {
    text += " (khu vuc noi thanh)";
  } else if (options?.priceZone === "outer") {
    text += " (khu vuc ngoai thanh)";
  }
  return `${base}${sep}text=${encodeURIComponent(text)}`;
}

/** Giá trị mặc định (khi chưa có CMS) */
export const contact = contactFromSite(site);

export const adminStats = [
  { label: "Đơn hôm nay", value: "24" },
  { label: "Doanh thu tháng", value: "1,2 tỷ" },
  { label: "Khách hoạt động", value: "186" },
];
