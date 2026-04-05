export type PackageCard = {
  id: string;
  title: string;
  price: string;
  /** Download / Upload line shown on the card */
  speed: string;
  features: string[];
  promotion: string;
  variant: "blue" | "orange";
};

export type PackageSection = {
  id: string;
  title: string;
  cards: PackageCard[];
};

export const site = {
  name: "VNPT / FPT Telecom",
  heroTitle: "Lắp WiFi tốc độ cao",
  heroSubtitle: "Giá rẻ - Lắp nhanh 24h",
};

export type SiteSettings = typeof site;

/** Default sections — used when localStorage is empty */
export const defaultSections: PackageSection[] = [
  {
    id: "wifi",
    title: "Gói WiFi",
    cards: [
      {
        id: "wifi-giga",
        title: "GIGA",
        price: "171.000",
        speed: "300 Mbps / 300 Mbps",
        features: [
          "Trang bị Modem băng tần kép – Wi-Fi 6 AX1800/AX3000",
          "Thủ tục đăng ký đơn giản",
          "Lắp đặt nhanh trong 24h",
        ],
        promotion: "Ưu đãi tặng thêm tháng cước!",
        variant: "blue",
      },
      {
        id: "wifi-sky",
        title: "SKY",
        price: "185.000",
        speed: "~1000 Mbps / 300 Mbps",
        features: [
          "Trang bị Modem băng tần kép – Wi-Fi 6 AX1800/AX3000",
          "Thủ tục đăng ký đơn giản",
          "Lắp đặt nhanh trong 24h",
        ],
        promotion: "Ưu đãi tặng thêm tháng cước!",
        variant: "orange",
      },
      {
        id: "wifi-meta",
        title: "META",
        price: "270.000",
        speed: "~1000 Mbps / ~1000 Mbps",
        features: [
          "Trang bị Modem băng tần kép – Wi-Fi 6 AX1800/AX3000",
          "Thủ tục đăng ký đơn giản",
          "Lắp đặt nhanh trong 24h",
        ],
        promotion: "Ưu đãi tặng thêm tháng cước!",
        variant: "orange",
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
      },
    ],
  },
];

/** @deprecated use defaultSections */
export const sections = defaultSections;

export function getZaloRegisterUrl(cardTitle: string): string {
  const text = `Toi muon dang ky goi ${cardTitle}`;
  return `https://zalo.me/0900000000?text=${encodeURIComponent(text)}`;
}

export const contact = {
  zalo: "https://zalo.me/0900000000",
  phone: "tel:0900000000",
  phoneDisplay: "0900 000 000",
};

export const adminStats = [
  { label: "Đơn hôm nay", value: "24" },
  { label: "Doanh thu tháng", value: "1,2 tỷ" },
  { label: "Khách hoạt động", value: "186" },
];
