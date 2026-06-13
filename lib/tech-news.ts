export type TechNewsCategory = "5g-6g" | "wifi" | "sim" | "satellite";

export type TechNewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: TechNewsCategory;
  publishedAt: string;
  readMinutes: number;
  source?: string;
};

export const techNewsCategoryLabels: Record<TechNewsCategory, string> = {
  "5g-6g": "5G / 6G",
  wifi: "WiFi",
  sim: "SIM",
  satellite: "Internet vệ tinh",
};

export const techNewsCategoryIcons: Record<TechNewsCategory, string> = {
  "5g-6g": "📡",
  wifi: "📶",
  sim: "📱",
  satellite: "🛰️",
};

export const techNewsArticles: TechNewsArticle[] = [
  {
    id: "1",
    slug: "6g-vision-2030-global-standard",
    title: "6G: Các quốc gia bắt đầu định hình chuẩn mạng thế hệ tiếp theo",
    excerpt:
      "Hàn Quốc, Nhật Bản và EU đẩy mạnh nghiên cứu 6G với mục tiêu thương mại hóa vào 2030, hứa hẹn tốc độ gấp 100 lần 5G và độ trễ dưới 1ms.",
    content:
      "Trong khi 5G vẫn đang được triển khai rộng rãi trên toàn cầu, các tổ chức tiêu chuẩn như ITU và 3GPP đã bắt đầu thảo luận khung kỹ thuật cho mạng 6G. Hàn Quốc dự kiến thử nghiệm thương mại đầu tiên vào 2028, trong khi Nhật Bản đầu tư hơn 450 triệu USD cho chương trình nghiên cứu 6G quốc gia.\n\n6G không chỉ là mạng di động nhanh hơn — nó được thiết kế để tích hợp AI native, hỗ trợ hologram thời gian thực, xe tự lái và IoT quy mô hàng tỷ thiết bị. Tần số THz (terahertz) và mạng không gian (LEO satellite) được xem là hai trụ cột then chốt.\n\nViệt Nam cũng đang tham gia các diễn đàn quốc tế về 6G thông qua các đại học và doanh nghiệp viễn thông, chuẩn bị cho giai đoạn chuyển đổi công nghệ tiếp theo.",
    category: "5g-6g",
    publishedAt: "2026-05-28",
    readMinutes: 4,
    source: "ITU / 3GPP",
  },
  {
    id: "2",
    slug: "5g-standalone-vietnam-expansion",
    title: "5G Standalone mở rộng: Việt Nam hướng tới phủ sóng toàn quốc",
    excerpt:
      "Các nhà mạng Việt Nam chuyển dần từ 5G NSA sang SA, mang lại độ trễ thấp hơn và khả năng cắt mạng riêng (network slicing) cho doanh nghiệp.",
    content:
      "5G Non-Standalone (NSA) dựa trên hạ tầng 4G LTE hiện có, trong khi 5G Standalone (SA) sử dụng lõi mạng 5G hoàn toàn mới. Sự chuyển đổi sang SA cho phép độ trễ giảm xuống còn 10–15ms, hỗ trợ tốt hơn cho game cloud, robot công nghiệp và y tế từ xa.\n\nTại Việt Nam, các nhà mạng lớn đã triển khai 5G tại Hà Nội, TP.HCM và nhiều tỉnh thành. Giai đoạn tiếp theo tập trung mở rộng vùng phủ và nâng cấp lên SA tại các thành phố lớn.\n\nNgười dùng cần thiết bị hỗ trợ 5G SA và gói cước tương thích để trải nghiệm đầy đủ. SIM 5G hiện đại (USIM) đã sẵn sàng cho cả NSA lẫn SA.",
    category: "5g-6g",
    publishedAt: "2026-05-20",
    readMinutes: 3,
  },
  {
    id: "3",
    slug: "open-ran-5g-global-trend",
    title: "Open RAN: Xu hướng mở hóa hạ tầng 5G trên thế giới",
    excerpt:
      "Open RAN cho phép các nhà mạng kết hợp thiết bị từ nhiều nhà cung cấp, giảm chi phí triển khai và tăng tính linh hoạt cho mạng 5G.",
    content:
      "Radio Access Network (RAN) truyền thống thường bị khóa bởi một nhà cung cấp duy nhất. Open RAN tách rời phần mềm và phần cứng, cho phép các nhà mạng lựa chọn thiết bị từ Ericsson, Nokia, Samsung, Mavenir và nhiều vendor khác.\n\nMỹ, Ấn Độ và châu Âu đang thúc đẩy Open RAN như chiến lược giảm phụ thuộc vào một nguồn cung. Rakuten Mobile (Nhật) là ví dụ tiêu biểu với mạng 5G hoàn toàn dựa trên Open RAN.\n\nTại Đông Nam Á, một số quốc gia đang thử nghiệm Open RAN cho vùng nông thôn và đảo xa, nơi chi phí triển khai truyền thống quá cao.",
    category: "5g-6g",
    publishedAt: "2026-05-12",
    readMinutes: 4,
    source: "O-RAN Alliance",
  },
  {
    id: "4",
    slug: "wifi-7-commercial-rollout",
    title: "WiFi 7 chính thức thương mại hóa trên toàn cầu",
    excerpt:
      "Chuẩn IEEE 802.11be (WiFi 7) mang tốc độ lý thuyết lên đến 46 Gbps, Multi-Link Operation và latency thấp hơn cho game và streaming 8K.",
    content:
      "WiFi 7 (802.11be) đã được Wi-Fi Alliance chứng nhận và các router, smartphone flagship bắt đầu hỗ trợ từ cuối 2024. Công nghệ Multi-Link Operation (MLO) cho phép thiết bị kết nối đồng thời trên nhiều băng tần 2.4GHz, 5GHz và 6GHz, tăng throughput và giảm nhiễu.\n\n320 MHz channel width trên băng 6GHz là bước nhảy lớn so với WiFi 6E (160 MHz). Điều này đặc biệt hữu ích cho smart home với hàng chục thiết bị IoT, VR/AR và làm việc từ xa.\n\nTại Việt Nam, các ISP đang nâng cấp modem WiFi 7 cho gói cước cao cấp. Người dùng cần thiết bị client hỗ trợ WiFi 7 để tận dụng tối đa.",
    category: "wifi",
    publishedAt: "2026-05-25",
    readMinutes: 3,
  },
  {
    id: "5",
    slug: "wifi-mesh-smart-home-trend",
    title: "WiFi Mesh: Giải pháp phủ sóng toàn nhà đang bùng nổ",
    excerpt:
      "Hệ thống mesh WiFi thay thế repeater truyền thống, mang lại một mạng liền mạch với roaming tự động cho nhà nhiều tầng.",
    content:
      "Repeater WiFi truyền thống thường cắt băng thông một nửa và tạo mạng riêng biệt. WiFi Mesh sử dụng nhiều node (router chính + satellite) tạo thành một SSID duy nhất, thiết bị tự chuyển node tốt nhất khi di chuyển.\n\nCác thương hiệu như TP-Link Deco, Google Nest Wifi, Eero (Amazon) và Asus ZenWiFi đang cạnh tranh gay gắt. Nhiều ISP bundle mesh kit miễn phí với gói internet gia đình cao cấp.\n\nXu hướng mới: mesh hỗ trợ WiFi 7, backhaul wired (Ethernet) giữa các node, và tích hợp bảo mật AI để chặn malware trên toàn mạng gia đình.",
    category: "wifi",
    publishedAt: "2026-05-18",
    readMinutes: 3,
  },
  {
    id: "6",
    slug: "wifi-sensing-emerging-tech",
    title: "WiFi Sensing: Biến sóng vô tuyến thành cảm biến chuyển động",
    excerpt:
      "Công nghệ WiFi Sensing sử dụng sóng WiFi để phát hiện chuyển động, theo dõi sức khỏe người cao tuổi mà không cần camera.",
    content:
      "WiFi Sensing (802.11bf) là chuẩn mới cho phép router phân tích sự thay đổi tín hiệu radio để phát hiện chuyển động, thậm chí theo dõi nhịp thở và giấc ngủ. Không cần camera hay wearable, bảo vệ quyền riêng tư tốt hơn.\n\nCác công ty như Origin Wireless, Cognitive Systems và Qualcomm đang triển khai thử nghiệm với nhà cung cấp dịch vụ chăm sóc sức khỏe tại nhà và bảo mật thông minh.\n\nỨng dụng tiềm năng: phát hiện người cao tuổi ngã, giám sát trẻ em, tối ưu HVAC theo sự hiện diện của người trong phòng. Dự kiến tích hợp vào router WiFi 7 consumer từ 2026.",
    category: "wifi",
    publishedAt: "2026-05-08",
    readMinutes: 4,
    source: "IEEE 802.11bf",
  },
  {
    id: "7",
    slug: "esim-global-adoption",
    title: "eSIM: Hơn 35% smartphone mới hỗ trợ SIM điện tử toàn cầu",
    excerpt:
      "eSIM cho phép kích hoạt gói cước từ xa, chuyển mạng nhanh và lưu nhiều profile trên một thiết bị — xu hướng tất yếu cho IoT và du lịch.",
    content:
      "Embedded SIM (eSIM) là chip SIM tích hợp sẵn trên bo mạch, không cần khe cắm vật lý. Apple loại bỏ khe SIM vật lý trên iPhone tại Mỹ từ iPhone 14, thúc đẩy các nhà mạng toàn cầu hỗ trợ eSIM.\n\nLợi ích chính: kích hoạt online trong vài phút, quản lý nhiều số trên một máy (Dual eSIM), và thuận tiện khi du lịch quốc tế với gói data roaming hoặc eSIM du lịch.\n\nTại Việt Nam, các nhà mạng đã triển khai eSIM cho một số gói cước. Người dùng có thể đăng ký qua app hoặc website, quét QR code để kích hoạt mà không cần đến cửa hàng.",
    category: "sim",
    publishedAt: "2026-05-22",
    readMinutes: 3,
  },
  {
    id: "8",
    slug: "isim-integrated-sim-iot",
    title: "iSIM: SIM tích hợp vào chip — tương lai của thiết bị IoT",
    excerpt:
      "Integrated SIM (iSIM) nhúng trực tiếp vào modem, tiết kiệm không gian và năng lượng cho smartwatch, tracker và thiết bị IoT công nghiệp.",
    content:
      "iSIM là bước tiến từ eSIM: thay vì chip riêng, profile SIM được lưu trong vùng bảo mật của modem hoặc SoC. Điều này giảm kích thước PCB, tiêu thụ điện năng và chi phí sản xuất.\n\nQualcomm, MediaTek và Thales (Gemalto) đang dẫn đầu. iSIM phù hợp cho smartwatch 4G, camera an ninh, cảm biến nông nghiệp và module LTE-M/NB-IoT.\n\nGSMA dự báo hàng tỷ thiết bị IoT sẽ dùng iSIM/eSIM vào 2030, thay thế SIM vật lý truyền thống trong hầu hết thiết bị kết nối mới.",
    category: "sim",
    publishedAt: "2026-05-15",
    readMinutes: 3,
    source: "GSMA",
  },
  {
    id: "9",
    slug: "starlink-leo-satellite-expansion",
    title: "Starlink và LEO: Internet vệ tinh phủ sóng thêm hàng chục quốc gia",
    excerpt:
      "Mạng vệ tinh quỹ đạo thấp (LEO) của SpaceX đạt hơn 6.000 vệ tinh, mang broadband tốc độ cao đến vùng nông thôn và biển đảo.",
    content:
      "Starlink (SpaceX) vận hành chòm sao LEO lớn nhất thế giới với hơn 6.000 vệ tinh, cung cấp internet 50–250 Mbps với độ trễ 20–40ms — đủ cho video call, streaming và làm việc từ xa.\n\nCác đối thủ như OneWeb, Amazon Kuiper và Telesat Lightspeed đang bắt kịp. OneWeb đã phủ sóng Bắc Cực và nhiều vùng nông thôn châu Âu, châu Phi.\n\nTại Việt Nam, Starlink chưa chính thức hoạt động nhưng đã có người dùng thử nghiệm qua roaming. Bộ TT&TT đang nghiên cứu khung pháp lý cho dịch vụ internet vệ tinh phi địa cầu quỹ đạo thấp.",
    category: "satellite",
    publishedAt: "2026-05-30",
    readMinutes: 4,
  },
  {
    id: "10",
    slug: "direct-to-cell-satellite-mobile",
    title: "Direct-to-Cell: Gọi điện và nhắn tin qua vệ tinh từ smartphone thường",
    excerpt:
      "Apple, T-Mobile/SpaceX và AST SpaceMobile triển khai kết nối vệ tinh trực tiếp trên điện thoại — không cần anten riêng, phủ sóng vùng không có mạng.",
    content:
      "Direct-to-Cell là công nghệ cho phép smartphone kết nối trực tiếp với vệ tinh LEO qua băng tần di động hiện có (thường là LTE/5G NR). Apple đã hợp tác Globalstar cho Emergency SOS trên iPhone; T-Mobile và Starlink thử nghiệm SMS và data tại Mỹ.\n\nAST SpaceMobile phóng vệ tinh BlueBird lớn nhất thế giới với anten 64m², hứa hẹn broadband 5G trực tiếp lên điện thoại tại vùng không có sóng mặt đất.\n\nỨng dụng thực tế: cứu hộ khẩn cấp, du lịch vùng sâu vùng xa, hàng hải và nông nghiệp. Đây được xem là bước tiếp theo sau internet vệ tinh cố định (Starlink dish) — biến mọi smartphone thành thiết bị kết nối toàn cầu.",
    category: "satellite",
    publishedAt: "2026-06-02",
    readMinutes: 4,
    source: "AST SpaceMobile",
  },
];

export function formatNewsDate(isoDate: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
