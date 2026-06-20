/** Maps homepage pricing section ids to service pages and SEO intro copy. */
export const sectionServiceMap: Record<
  string,
  { path: string; intro: string }
> = {
  "internet-gia-dinh": {
    path: "/wifi-vnpt",
    intro:
      "Gói Internet gia đình VNPT phù hợp nhà ở, căn hộ và hộ kinh doanh nhỏ tại TP.HCM. Tôi hỗ trợ kiểm tra hạ tầng theo địa chỉ, tư vấn tốc độ 300 Mbps–1 Gbps và hẹn lắp đặt tận nơi khu vực Quận 12 và nội thành.",
  },
  "internet-di-dong": {
    path: "/internet-di-dong-vnpt",
    intro:
      "Combo Internet + di động VNPT giúp gia đình vừa có WiFi ổn định vừa có data SIM tiết kiệm. Phù hợp hộ dùng nhiều thiết bị, làm việc tại nhà và cần một gói quản lý thuận tiện.",
  },
  "goi-5g-data": {
    path: "/sim-5g-vnpt",
    intro:
      "Gói 5G data VNPT dành cho người dùng smartphone cần tốc độ cao, livestream, học online và làm việc di động. Tôi tư vấn gói theo mức dùng thực tế để tránh lãng phí.",
  },
  "goi-5g-combo": {
    path: "/sim-5g-vnpt",
    intro:
      "Gói 5G combo kết hợp data, thoại và tiện ích số. Phù hợp người dùng cần gói trọn gói, không muốn tính toán nhiều dịch vụ riêng lẻ.",
  },
  "sim-4g": {
    path: "/sim-5g-vnpt",
    intro:
      "SIM 4G VNPT vẫn là lựa chọn phổ biến cho điện thoại phổ thông, backup data hoặc thiết bị phụ. Tôi hỗ trợ chọn gói S/M/L theo nhu cầu hàng tháng.",
  },
  camera: {
    path: "/camera-vnpt",
    intro:
      "Gói Camera VNPT hỗ trợ giám sát nhà ở, cửa hàng và văn phòng với lưu cloud. Tôi tư vấn số camera, vị trí lắp và kết hợp WiFi nếu cần ổn định hơn.",
  },
};

export function getSectionServiceLink(sectionId: string): string | undefined {
  return sectionServiceMap[sectionId]?.path;
}

export function getSectionSeoIntro(sectionId: string): string | undefined {
  return sectionServiceMap[sectionId]?.intro;
}
