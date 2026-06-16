export type LocalServiceSlug = "wifi-vnpt" | "sim-5g" | "camera-vnpt";

export type LocalArea = {
  slug: string;
  name: string;
  headlineName: string;
  localAngle: string;
  demand: string;
  neighborhoods: string[];
  nearby: string[];
};

export type LocalService = {
  slug: LocalServiceSlug;
  label: string;
  shortLabel: string;
  rootHref: string;
  homeAnchor: string;
  primaryKeyword: string;
  description: string;
  ctaLabel: string;
  highlights: string[];
  painPoints: string[];
  serviceSpecificAdvice: string;
};

export const localAreas: LocalArea[] = [
  {
    slug: "quan-1",
    name: "Quận 1",
    headlineName: "Quận 1, TP.HCM",
    localAngle:
      "khu trung tâm có nhiều căn hộ dịch vụ, văn phòng nhỏ, cửa hàng và nhu cầu lắp đặt nhanh trong ngày",
    demand:
      "ưu tiên đường truyền ổn định cho làm việc, thanh toán, camera cửa hàng và WiFi cho khách",
    neighborhoods: ["Bến Nghé", "Bến Thành", "Đa Kao", "Nguyễn Thái Bình"],
    nearby: ["quan-3", "binh-thanh", "quan-7"],
  },
  {
    slug: "quan-3",
    name: "Quận 3",
    headlineName: "Quận 3, TP.HCM",
    localAngle:
      "khu dân cư lâu năm xen kẽ văn phòng, nhà phố nhiều tầng và căn hộ cho thuê",
    demand:
      "cần WiFi phủ đều từng phòng, SIM data dự phòng và camera quan sát mặt tiền",
    neighborhoods: ["Võ Thị Sáu", "Phường 4", "Phường 5", "Phường 12"],
    nearby: ["quan-1", "tan-binh", "binh-thanh"],
  },
  {
    slug: "quan-7",
    name: "Quận 7",
    headlineName: "Quận 7, TP.HCM",
    localAngle:
      "nhiều chung cư, nhà phố khu Nam và hộ gia đình cần mạng ổn định cho học tập, làm việc từ xa",
    demand:
      "ưu tiên gói tốc độ cao, WiFi Mesh cho căn hộ rộng và camera cloud cho gia đình",
    neighborhoods: ["Tân Phong", "Tân Phú", "Phú Mỹ", "Tân Quy"],
    nearby: ["nha-be", "quan-1", "binh-tan"],
  },
  {
    slug: "binh-thanh",
    name: "Bình Thạnh",
    headlineName: "Bình Thạnh, TP.HCM",
    localAngle:
      "khu vực đông căn hộ, phòng trọ, nhà phố hẻm và văn phòng gần trung tâm",
    demand:
      "cần tư vấn đúng gói để tránh nghẽn giờ cao điểm, đặc biệt ở nhà nhiều thiết bị",
    neighborhoods: ["Vinhomes Central Park", "Thanh Đa", "Hàng Xanh", "Phường 25"],
    nearby: ["quan-1", "quan-3", "thu-duc"],
  },
  {
    slug: "thu-duc",
    name: "TP Thủ Đức",
    headlineName: "TP Thủ Đức, TP.HCM",
    localAngle:
      "khu đô thị, ký túc xá, nhà trọ sinh viên và gia đình trẻ có nhu cầu internet, SIM data lớn",
    demand:
      "cần gói linh hoạt cho học online, làm việc hybrid, camera nhà trọ và SIM 5G di chuyển",
    neighborhoods: ["Thảo Điền", "Linh Trung", "Hiệp Bình Chánh", "An Phú"],
    nearby: ["binh-thanh", "go-vap", "quan-7"],
  },
  {
    slug: "go-vap",
    name: "Gò Vấp",
    headlineName: "Gò Vấp, TP.HCM",
    localAngle:
      "mật độ dân cư cao, nhiều nhà hẻm sâu, phòng trọ và hộ kinh doanh nhỏ",
    demand:
      "cần khảo sát vị trí đặt modem/mesh để WiFi không yếu ở phòng cuối hoặc tầng trên",
    neighborhoods: ["Phường 3", "Phường 5", "Phường 10", "Phường 17"],
    nearby: ["tan-binh", "binh-thanh", "thu-duc"],
  },
  {
    slug: "tan-binh",
    name: "Tân Bình",
    headlineName: "Tân Bình, TP.HCM",
    localAngle:
      "nhiều nhà phố, văn phòng nhỏ, kho hàng và khu vực gần sân bay cần kết nối ổn định",
    demand:
      "phù hợp các gói internet gia đình, camera giám sát và SIM data cho nhân viên di chuyển",
    neighborhoods: ["Tân Sơn Nhất", "Bảy Hiền", "Hoàng Văn Thụ", "Phường 2"],
    nearby: ["go-vap", "quan-3", "binh-tan"],
  },
  {
    slug: "binh-tan",
    name: "Bình Tân",
    headlineName: "Bình Tân, TP.HCM",
    localAngle:
      "khu dân cư lớn, nhà xưởng nhỏ, nhà trọ và hộ gia đình cần gói cước tiết kiệm nhưng ổn định",
    demand:
      "ưu tiên tư vấn đúng hạ tầng, chi phí hàng tháng và khả năng phủ sóng cho nhà rộng",
    neighborhoods: ["An Lạc", "Bình Trị Đông", "Tân Tạo", "Bình Hưng Hòa"],
    nearby: ["tan-binh", "go-vap", "quan-7"],
  },
];

export const localServices: LocalService[] = [
  {
    slug: "wifi-vnpt",
    label: "lắp WiFi VNPT",
    shortLabel: "WiFi VNPT",
    rootHref: "/wifi-vnpt",
    homeAnchor: "/#internet-gia-dinh",
    primaryKeyword: "lắp wifi VNPT",
    description:
      "Tư vấn gói internet gia đình, WiFi Mesh, truyền hình MyTV và các gói phù hợp cho nhà nhiều thiết bị.",
    ctaLabel: "Xem gói WiFi VNPT",
    highlights: [
      "Tư vấn gói theo số người dùng và diện tích nhà",
      "Hỗ trợ chọn WiFi Mesh cho nhà nhiều tầng",
      "Ưu tiên lịch khảo sát và lắp đặt nhanh khi hạ tầng sẵn sàng",
    ],
    painPoints: [
      "WiFi yếu ở phòng cuối hoặc tầng trên",
      "Mạng chậm buổi tối do nhiều thiết bị dùng cùng lúc",
      "Không biết nên chọn gói 300 Mbps, 500 Mbps hay gần 1 Gbps",
    ],
    serviceSpecificAdvice:
      "Với WiFi gia đình, nên chọn gói theo số thiết bị thực tế và vị trí đặt modem. Nhà nhiều tầng hoặc nhiều vách bê tông nên cân nhắc Mesh thay vì chỉ tăng tốc độ gói cước.",
  },
  {
    slug: "sim-5g",
    label: "đăng ký SIM 5G VNPT",
    shortLabel: "SIM 5G VNPT",
    rootHref: "/sim-5g",
    homeAnchor: "/#sim-4g",
    primaryKeyword: "sim 5G VNPT",
    description:
      "Tư vấn SIM data, eSIM, gói 5G/4G theo nhu cầu học tập, làm việc, livestream và di chuyển trong TP.HCM.",
    ctaLabel: "Xem gói SIM 5G",
    highlights: [
      "Tư vấn gói data theo dung lượng/ngày",
      "Hỗ trợ nhu cầu eSIM hoặc SIM vật lý",
      "Phù hợp dùng dự phòng khi internet cố định gặp sự cố",
    ],
    painPoints: [
      "Dùng 4G lâu bị chập chờn hoặc tụt về 3G",
      "Không biết máy có hỗ trợ 5G/eSIM không",
      "Cần data lớn nhưng vẫn kiểm soát chi phí hàng tháng",
    ],
    serviceSpecificAdvice:
      "Với SIM data, nên kiểm tra thiết bị, vùng phủ sóng và mức sử dụng mỗi ngày. Nếu thường xuyên di chuyển, hãy ưu tiên gói có data/ngày rõ ràng và giữ WiFi cố định làm kết nối chính tại nhà.",
  },
  {
    slug: "camera-vnpt",
    label: "lắp Camera VNPT",
    shortLabel: "Camera VNPT",
    rootHref: "/camera-vnpt",
    homeAnchor: "/#camera",
    primaryKeyword: "camera VNPT",
    description:
      "Tư vấn camera trong nhà/ngoài trời, lưu cloud, kết nối WiFi và gói internet phù hợp cho giám sát gia đình hoặc cửa hàng.",
    ctaLabel: "Xem gói Camera",
    highlights: [
      "Tư vấn vị trí đặt camera để hạn chế điểm mù",
      "Gợi ý gói internet đủ upload cho camera cloud",
      "Phù hợp hộ gia đình, cửa hàng nhỏ và nhà trọ",
    ],
    painPoints: [
      "Camera WiFi hay mất kết nối",
      "Không rõ cần lưu cloud bao nhiêu ngày",
      "Camera làm mạng chậm khi upload liên tục",
    ],
    serviceSpecificAdvice:
      "Với camera cloud, chất lượng WiFi và upload quan trọng không kém độ phân giải. Nên khảo sát vị trí đặt camera, nguồn điện và vùng phủ WiFi trước khi chọn gói.",
  },
];

export function getLocalArea(slug: string): LocalArea | undefined {
  return localAreas.find((area) => area.slug === slug);
}

export function getLocalService(slug: string): LocalService | undefined {
  return localServices.find((service) => service.slug === slug);
}

export function getLocalLandingPaths(serviceSlug?: LocalServiceSlug) {
  const services = serviceSlug
    ? localServices.filter((service) => service.slug === serviceSlug)
    : localServices;
  return services.flatMap((service) =>
    localAreas.map((area) => ({
      service: service.slug,
      area: area.slug,
      path: `/${service.slug}/${area.slug}`,
    })),
  );
}

export function buildLocalLandingTitle(service: LocalService, area: LocalArea) {
  return `${service.label} ${area.name} | Tư vấn nhanh, hỗ trợ tận nơi`;
}

export function buildLocalLandingDescription(
  service: LocalService,
  area: LocalArea,
) {
  return `${service.description} Hỗ trợ khu vực ${area.headlineName}: ${area.demand}.`;
}

export function buildLocalServiceJsonLd({
  service,
  area,
  siteUrl,
}: {
  service: LocalService;
  area: LocalArea;
  siteUrl: string;
}) {
  const base = siteUrl.replace(/\/$/, "");
  const url = `${base}/${service.slug}/${area.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `Hỗ trợ ${service.label} ${area.name}`,
      url,
      areaServed: {
        "@type": "City",
        name: area.headlineName,
      },
      telephone: "0900 000 000",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "TP.HCM",
        addressCountry: "VN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.label} ${area.name}`,
      serviceType: service.shortLabel,
      provider: {
        "@type": "LocalBusiness",
        name: "Kết Nối Mạng HCM",
      },
      areaServed: area.neighborhoods.map((name) => ({
        "@type": "Place",
        name,
      })),
      description: buildLocalLandingDescription(service, area),
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: base,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: service.shortLabel,
          item: `${base}${service.rootHref}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: area.name,
          item: url,
        },
      ],
    },
  ];
}
