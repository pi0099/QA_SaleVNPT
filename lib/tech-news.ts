export type TechNewsCategory =
  | "5g-6g"
  | "wifi"
  | "sim"
  | "satellite"
  | "troubleshooting";

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
  relatedLinks?: {
    label: string;
    href: string;
  }[];
};

export const techNewsCategoryLabels: Record<TechNewsCategory, string> = {
  "5g-6g": "5G / 6G",
  wifi: "WiFi",
  sim: "SIM",
  satellite: "Internet vệ tinh",
  troubleshooting: "Khắc phục sự cố",
};

export const techNewsCategoryIcons: Record<TechNewsCategory, string> = {
  "5g-6g": "📡",
  wifi: "📶",
  sim: "📱",
  satellite: "🛰️",
  troubleshooting: "🛠️",
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
  {
    id: "11",
    slug: "fix-4g-unstable-after-long-use",
    title: "4G dùng lâu bị chập chờn: Cách làm mới kết nối trước khi đổi SIM",
    excerpt:
      "Nếu 4G lúc nhanh lúc chậm dù còn dung lượng, hãy thử bật/tắt chế độ máy bay, khởi động lại máy, kiểm tra chế độ mạng và đặt lại cấu hình mạng trước khi kết luận SIM hỏng.",
    content:
      "Nhiều người dùng trên thế giới gặp tình trạng 4G/LTE ổn định lúc đầu nhưng sau thời gian dài sử dụng thì chập chờn, rớt về 3G/H+ hoặc có sóng nhưng không vào mạng. Nguyên nhân thường đến từ modem điện thoại bị treo phiên kết nối, cấu hình APN sai, vùng phủ yếu, giới hạn gói cước hoặc lỗi sau khi cập nhật phần mềm.\n\nCách xử lý nên làm theo thứ tự: bật chế độ máy bay khoảng 10 giây rồi tắt để điện thoại đăng ký lại vào mạng; khởi động lại máy; tắt WiFi để kiểm tra riêng dữ liệu di động; chọn chế độ mạng tự động 5G/4G/3G/2G; tháo lắp lại SIM nếu dùng SIM vật lý; cập nhật hệ điều hành và cấu hình nhà mạng. Nếu vẫn lỗi, hãy đặt lại cài đặt mạng, nhưng nhớ thao tác này sẽ xóa WiFi đã lưu và thiết bị Bluetooth đã ghép đôi.\n\nNếu lỗi chỉ xảy ra ở một khu vực, khả năng cao là vùng phủ hoặc trạm phát đang quá tải. Nếu lỗi xảy ra ở mọi nơi trên cùng một điện thoại, hãy thử SIM trên máy khác để tách nguyên nhân giữa SIM, thiết bị và nhà mạng.",
    category: "troubleshooting",
    publishedAt: "2026-06-12",
    readMinutes: 4,
    source: "Google Android Help / Verizon / Android Authority",
    relatedLinks: [
      { label: "Xem gói SIM 5G VNPT", href: "/sim-5g" },
      { label: "FAQ đăng ký dịch vụ", href: "/faq" },
    ],
  },
  {
    id: "12",
    slug: "fix-mobile-data-full-signal-no-internet",
    title: "Điện thoại đầy sóng nhưng không vào mạng: Kiểm tra APN và giới hạn dữ liệu",
    excerpt:
      "Đầy cột sóng không đồng nghĩa dữ liệu hoạt động tốt. APN, data roaming, giới hạn dung lượng và quyền truy cập nền đều có thể làm internet bị ngắt.",
    content:
      "Một lỗi phổ biến là điện thoại hiển thị 4G/5G và nhiều vạch sóng nhưng ứng dụng không tải được dữ liệu. Trường hợp này thường không phải do sóng yếu, mà do điện thoại đã đăng ký vào mạng vô tuyến nhưng phiên dữ liệu bị chặn hoặc cấu hình sai.\n\nHãy kiểm tra dữ liệu di động đã bật, gói cước còn dung lượng, máy không bật giới hạn data, VPN không bị lỗi và APN đúng theo nhà mạng. Với Android, vào phần mạng di động để xem APN; với iPhone, kiểm tra mục Di động và cập nhật carrier settings nếu có. Khi đi nước ngoài, cần bật data roaming và dùng đúng eSIM/SIM đang có gói quốc tế.\n\nNếu chỉ một vài ứng dụng không vào mạng, hãy kiểm tra quyền dữ liệu nền hoặc chế độ tiết kiệm pin. Nếu mọi ứng dụng đều lỗi, đặt lại cài đặt mạng là bước hợp lý trước khi liên hệ nhà mạng để kiểm tra chặn dịch vụ, khóa tài khoản hoặc sự cố hệ thống.",
    category: "troubleshooting",
    publishedAt: "2026-06-11",
    readMinutes: 4,
    source: "Google Android Help / TelecomTrainer / Verizon",
    relatedLinks: [
      { label: "Xem gói SIM 5G VNPT", href: "/sim-5g" },
      { label: "Xem gói WiFi VNPT", href: "/wifi-vnpt" },
    ],
  },
  {
    id: "13",
    slug: "fix-wifi-slow-in-apartment",
    title: "WiFi chung cư bị chậm buổi tối: Đổi kênh và băng tần đúng cách",
    excerpt:
      "Ở khu đông người, nhiều router dùng trùng kênh khiến WiFi nghẽn dù gói cước vẫn nhanh. Quét kênh, đổi sang 5GHz/6GHz và đặt router đúng vị trí sẽ cải thiện rõ rệt.",
    content:
      "Tại chung cư hoặc khu dân cư dày đặc, tốc độ WiFi thường giảm mạnh vào buổi tối vì nhiều mạng phát cùng lúc trên băng tần 2.4GHz. Khi các router chồng kênh, thiết bị phải chờ lâu hơn để truyền dữ liệu, dẫn đến video giật, game lag hoặc cuộc gọi bị méo tiếng.\n\nCách xử lý là dùng ứng dụng WiFi analyzer để xem kênh nào đang đông. Với 2.4GHz, ưu tiên kênh 1, 6 hoặc 11; nếu router để Auto nhưng vẫn chập chờn, hãy thử đặt thủ công. Với thiết bị gần router, chuyển sang 5GHz hoặc 6GHz để giảm nhiễu và tăng tốc độ. Nếu nhà có thiết bị cũ, đặt độ rộng kênh 2.4GHz về 20MHz có thể ổn định hơn 40MHz.\n\nNgoài cấu hình, vị trí router rất quan trọng. Đặt router ở trung tâm nhà, cao hơn mặt sàn, tránh tủ kín, tường bê tông, kim loại, lò vi sóng và thiết bị Bluetooth. Nếu điểm sử dụng vẫn dưới mức tín hiệu ổn định, giải pháp đúng là thêm mesh hoặc kéo dây mạng cho điểm phát phụ.",
    category: "troubleshooting",
    publishedAt: "2026-06-10",
    readMinutes: 4,
    source: "Microsoft Support / TP-Link / Dell",
    relatedLinks: [
      { label: "Xem gói WiFi VNPT", href: "/wifi-vnpt" },
      { label: "FAQ lắp WiFi", href: "/faq" },
    ],
  },
  {
    id: "14",
    slug: "fix-wifi-good-speed-bad-video-call",
    title: "Speedtest cao nhưng gọi video vẫn lag: Vấn đề có thể là độ trễ và nhiễu",
    excerpt:
      "Tốc độ tải xuống cao chưa chắc đủ cho Zoom, Meet hoặc game. Độ trễ, jitter, upload yếu và thiết bị tranh băng thông mới là nguyên nhân thường gặp.",
    content:
      "Nhiều gia đình thấy speedtest vẫn cao nhưng gọi video bị đứng hình. Lý do là bài test tốc độ thường đo tải xuống trong thời gian ngắn, trong khi video call cần upload ổn định, độ trễ thấp và jitter nhỏ. Khi nhiều thiết bị cùng xem video, camera an ninh upload liên tục hoặc router quá tải, cuộc gọi sẽ xuống chất lượng.\n\nTrước tiên hãy test gần router và test bằng dây LAN nếu có thể. Nếu dùng WiFi, chuyển thiết bị họp sang 5GHz, ngồi gần router hơn và tắt các tác vụ nặng như tải game, backup ảnh hoặc đồng bộ cloud. Trên router hỗ trợ QoS, ưu tiên thiết bị làm việc hoặc ứng dụng hội nghị. Với nhà nhiều tầng, mesh có backhaul dây mạng sẽ ổn định hơn repeater giá rẻ.\n\nNếu đã tối ưu WiFi nhưng upload vẫn thấp, kiểm tra gói cước internet. Một số gói có download cao nhưng upload hạn chế. Khi làm việc từ xa thường xuyên, nên chọn gói có upload tốt và router đủ mạnh cho số lượng thiết bị trong nhà.",
    category: "troubleshooting",
    publishedAt: "2026-06-09",
    readMinutes: 4,
    source: "Microsoft Support / NetSpot / Dell",
    relatedLinks: [
      { label: "Xem gói WiFi VNPT", href: "/wifi-vnpt" },
      { label: "Xem FAQ chọn gói", href: "/faq" },
    ],
  },
  {
    id: "15",
    slug: "fix-esim-activation-failed",
    title: "eSIM không kích hoạt được: Những bước cần thử trước khi gọi tổng đài",
    excerpt:
      "Kích hoạt eSIM cần WiFi ổn định, máy hỗ trợ eSIM, thiết bị không khóa mạng và mã QR còn hiệu lực. Nếu quét lỗi, có thể nhập thủ công SM-DP+.",
    content:
      "eSIM tiện lợi nhưng dễ lỗi trong bước kích hoạt vì điện thoại phải xác thực với máy chủ nhà mạng. Các lỗi thường gặp là QR code không hợp lệ, không có internet, tài khoản chưa được cấp quyền, máy bị khóa mạng hoặc hồ sơ eSIM đã được dùng trên thiết bị khác.\n\nHãy kết nối WiFi ổn định, cập nhật iOS/Android, bật/tắt chế độ máy bay rồi khởi động lại máy. Kiểm tra thiết bị có hỗ trợ eSIM và không bị carrier lock. Nếu quét QR không thành công, dùng tùy chọn nhập thủ công SM-DP+ Address và Activation Code do nhà mạng cung cấp. Với Android, đảm bảo dịch vụ hệ thống liên quan đến nhà mạng đã được cập nhật.\n\nNếu máy báo lỗi quyền tài khoản, SIM protection hoặc không thể chuyển eSIM, người dùng thường phải liên hệ nhà mạng. Khi gọi hỗ trợ, chuẩn bị số điện thoại, IMEI, EID, thông báo lỗi và ảnh chụp màn hình để xử lý nhanh hơn.",
    category: "troubleshooting",
    publishedAt: "2026-06-08",
    readMinutes: 4,
    source: "Apple Support / T-Mobile Support / Ting",
    relatedLinks: [
      { label: "Xem gói SIM 5G VNPT", href: "/sim-5g" },
      { label: "FAQ SIM/eSIM", href: "/faq" },
    ],
  },
  {
    id: "16",
    slug: "fix-sim-not-detected-after-transfer",
    title: "Máy báo không nhận SIM sau khi đổi điện thoại: Phân biệt lỗi SIM, khe SIM và khóa mạng",
    excerpt:
      "Khi chuyển SIM sang máy mới mà không có dịch vụ, hãy kiểm tra SIM vật lý, chế độ mạng, khóa nhà mạng, IMEI và trạng thái kích hoạt tài khoản.",
    content:
      "Lỗi không nhận SIM sau khi đổi máy thường bị nhầm với hỏng SIM, nhưng nguyên nhân có thể là khay SIM đặt lệch, máy khóa mạng, SIM quá cũ, tài khoản chưa kích hoạt hoặc thiết bị không hỗ trợ băng tần của nhà mạng đang dùng. Với eSIM, lỗi có thể do hồ sơ cũ chưa được chuyển hoặc QR đã hết lượt dùng.\n\nVới SIM vật lý, tắt máy, tháo SIM, lau nhẹ mặt tiếp xúc, lắp đúng chiều và thử trên máy khác. Nếu SIM hoạt động trên máy khác, kiểm tra điện thoại mới có bị khóa mạng không, có nhận IMEI không và đã bật chế độ mạng tự động chưa. Với eSIM, xóa hồ sơ chỉ khi chắc chắn có thể cấp lại mã mới từ nhà mạng.\n\nNếu cả SIM khác cũng không chạy trên cùng điện thoại, khả năng nằm ở thiết bị hoặc khe SIM. Nếu SIM của bạn không chạy trên bất kỳ máy nào, hãy đổi SIM tại nhà mạng để giữ số và cập nhật chuẩn USIM/eSIM mới hơn.",
    category: "troubleshooting",
    publishedAt: "2026-06-07",
    readMinutes: 3,
    source: "Verizon / T-Mobile Support / Apple Support",
    relatedLinks: [
      { label: "Xem gói SIM 5G VNPT", href: "/sim-5g" },
      { label: "FAQ đăng ký SIM", href: "/faq" },
    ],
  },
  {
    id: "17",
    slug: "fix-phone-overheats-on-5g",
    title: "Điện thoại nóng và tụt pin khi bật 5G: Khi nào nên chuyển về 4G?",
    excerpt:
      "5G có thể tiêu thụ pin nhiều hơn ở vùng sóng yếu hoặc khi máy liên tục chuyển giữa 4G và 5G. Chọn chế độ mạng phù hợp giúp máy mát và ổn định hơn.",
    content:
      "Ở nhiều quốc gia, người dùng phản ánh điện thoại nóng hơn khi bật 5G, nhất là tại vùng rìa phủ sóng. Khi tín hiệu 5G yếu, máy phải tăng công suất thu phát hoặc liên tục chuyển giữa 5G và 4G, làm hao pin và có thể khiến dữ liệu kém ổn định hơn 4G thuần.\n\nNếu đang ở nơi 5G yếu, hãy thử chọn 4G/LTE để xem máy có mát và ổn định hơn không. Tắt hotspot khi không dùng, tránh vừa sạc vừa phát WiFi, cập nhật hệ điều hành và đóng ứng dụng upload nền như backup ảnh. Với iPhone và Android đời mới, chế độ 5G Auto hoặc Smart 5G thường cân bằng pin tốt hơn ép 5G liên tục.\n\n5G hữu ích khi cần tải nhanh, xem video chất lượng cao hoặc dùng ở khu có phủ sóng tốt. Nhưng với nhu cầu nhắn tin, gọi xe, email và lướt web, 4G ổn định có thể là lựa chọn thực tế hơn ở khu vực sóng 5G chưa hoàn thiện.",
    category: "troubleshooting",
    publishedAt: "2026-06-06",
    readMinutes: 3,
    source: "Apple Support / Android Help / GSMA",
    relatedLinks: [
      { label: "Xem gói SIM 5G VNPT", href: "/sim-5g" },
      { label: "Tư vấn gói phù hợp", href: "/faq" },
    ],
  },
  {
    id: "18",
    slug: "fix-home-internet-randomly-disconnects",
    title: "Internet gia đình tự rớt rồi có lại: Kiểm tra modem, dây và nguồn điện",
    excerpt:
      "Nếu cả WiFi lẫn dây LAN cùng mất mạng, vấn đề thường không nằm ở điện thoại mà ở modem, nguồn điện, dây quang/cáp đồng trục hoặc phía nhà mạng.",
    content:
      "Khi mạng gia đình tự ngắt vài phút rồi có lại, bước đầu tiên là xác định lỗi ở WiFi hay đường truyền internet. Nếu chỉ thiết bị WiFi mất kết nối nhưng máy cắm LAN vẫn chạy, hãy xử lý router hoặc nhiễu WiFi. Nếu cả LAN và WiFi cùng mất, hãy nhìn đèn modem/ONT và kiểm tra đường truyền chính.\n\nKhởi động lại modem/router bằng cách rút nguồn khoảng 30 giây rồi cắm lại. Kiểm tra adapter nguồn có nóng bất thường, dây mạng WAN/LAN có lỏng, dây quang có bị gập và modem có đặt trong chỗ bí nhiệt không. Nếu modem phải chạy nhiều năm liên tục, nhiệt và nguồn yếu có thể gây treo ngẫu nhiên.\n\nGhi lại thời điểm rớt mạng, trạng thái đèn tín hiệu và ảnh chụp màn hình tốc độ để báo nhà mạng. Nếu sự cố xảy ra theo khung giờ cao điểm, có thể là nghẽn tuyến hoặc suy hao tín hiệu cần kỹ thuật viên đo lại tại nhà.",
    category: "troubleshooting",
    publishedAt: "2026-06-05",
    readMinutes: 4,
    source: "Google Android Help / Microsoft Support / ISP troubleshooting guides",
    relatedLinks: [
      { label: "Xem gói WiFi VNPT", href: "/wifi-vnpt" },
      { label: "FAQ lắp WiFi", href: "/faq" },
    ],
  },
  {
    id: "19",
    slug: "fix-satellite-internet-latency-weather",
    title: "Internet vệ tinh bị trễ hoặc mất kết nối khi trời xấu: Cách giảm ảnh hưởng",
    excerpt:
      "Với internet vệ tinh, tầm nhìn lên bầu trời, thời tiết, vị trí anten và nghẽn vùng phủ đều ảnh hưởng trực tiếp đến tốc độ và độ trễ.",
    content:
      "Internet vệ tinh quỹ đạo thấp đã cải thiện độ trễ rất nhiều so với vệ tinh địa tĩnh, nhưng vẫn nhạy với vật cản và thời tiết. Cây cao, mái tôn, tường, mưa lớn hoặc anten đặt lệch có thể khiến kết nối bị gián đoạn từng đoạn ngắn, đặc biệt khi chơi game hoặc gọi video.\n\nNgười dùng nên đặt anten ở nơi thoáng, có góc nhìn rộng lên bầu trời, cố định chắc để tránh rung gió và thường xuyên kiểm tra ứng dụng quản lý xem có vùng che khuất không. Khi trời mưa lớn, giảm tải tác vụ nặng, ưu tiên cuộc gọi âm thanh hoặc hạ chất lượng video để giữ kết nối ổn định hơn.\n\nNếu tốc độ giảm vào cùng một khung giờ mỗi ngày, nguyên nhân có thể là nghẽn cell tại khu vực chứ không phải lỗi thiết bị. Trong trường hợp đó, hãy cập nhật firmware, khởi động lại thiết bị theo hướng dẫn và gửi log cho nhà cung cấp để kiểm tra tải mạng.",
    category: "troubleshooting",
    publishedAt: "2026-06-04",
    readMinutes: 4,
    source: "Starlink Support / Ookla analysis / FCC broadband guidance",
  },
  {
    id: "20",
    slug: "fix-travel-roaming-no-service",
    title: "Ra nước ngoài không có sóng roaming: Chuẩn bị gì trước khi bay?",
    excerpt:
      "Roaming lỗi thường do chưa bật dịch vụ quốc tế, chọn sai SIM dữ liệu, máy khóa mạng hoặc không tương thích băng tần tại quốc gia đến.",
    content:
      "Một vấn đề thường gặp khi du lịch là vừa hạ cánh đã không có sóng hoặc có sóng nhưng không dùng được data. Trên thế giới, các nhà mạng thường yêu cầu bật roaming trước chuyến đi, tài khoản đủ điều kiện thanh toán và điện thoại hỗ trợ băng tần của mạng đối tác tại nước đến.\n\nTrước khi bay, hãy bật dịch vụ roaming với nhà mạng, kiểm tra giá cước, cập nhật phần mềm và lưu hướng dẫn cấu hình APN offline. Khi đến nơi, bật Data Roaming, chọn đúng SIM/eSIM dùng dữ liệu, để Network Selection ở tự động trong vài phút. Nếu vẫn không được, thử chọn thủ công một mạng đối tác khác trong danh sách.\n\nVới eSIM du lịch, cài eSIM khi còn WiFi ổn định, nhưng chỉ bật gói dữ liệu khi đến quốc gia hỗ trợ để tránh bắt đầu thời hạn sớm nếu nhà cung cấp tính từ lần kích hoạt. Luôn giữ SIM chính để nhận OTP nếu cần đăng nhập ngân hàng hoặc ứng dụng quan trọng.",
    category: "troubleshooting",
    publishedAt: "2026-06-03",
    readMinutes: 4,
    source: "Apple Support / Google Android Help / GSMA roaming guidance",
    relatedLinks: [
      { label: "Xem gói SIM 5G VNPT", href: "/sim-5g" },
      { label: "FAQ đăng ký SIM", href: "/faq" },
    ],
  },
  {
    id: "21",
    slug: "fix-camera-wifi-disconnects",
    title: "Camera WiFi hay mất kết nối: Kiểm tra sóng, nguồn và băng tần",
    excerpt:
      "Camera giám sát thường rớt mạng do sóng WiFi yếu, đặt quá xa router, nguồn không ổn định hoặc dùng băng tần không tương thích.",
    content:
      "Camera WiFi cần kết nối ổn định hơn nhiều thiết bị thông thường vì phải upload video liên tục. Nếu camera thỉnh thoảng offline, hình bị đứng hoặc app báo mất kết nối, nguyên nhân hay gặp là tín hiệu WiFi yếu ở vị trí lắp camera, router quá tải, nguồn adapter chập chờn hoặc camera chỉ hỗ trợ 2.4GHz nhưng điện thoại đang cấu hình bằng mạng 5GHz.\n\nCách xử lý nên bắt đầu bằng kiểm tra cường độ sóng tại vị trí camera. Nếu camera đặt ngoài ban công, tầng trên hoặc sau nhiều lớp tường, hãy đưa router/mesh gần hơn hoặc kéo dây LAN cho đầu ghi/camera hỗ trợ Ethernet. Đổi tên riêng SSID 2.4GHz và 5GHz khi cài đặt camera đời cũ để tránh chọn nhầm băng tần. Kiểm tra adapter nguồn, dây nguồn và cập nhật firmware camera/router nếu nhà sản xuất có bản mới.\n\nNếu gia đình có nhiều camera cloud, đường upload của gói internet cũng rất quan trọng. Khi camera upload liên tục làm mạng chậm, nên chọn gói WiFi có upload tốt, router chịu tải cao hơn hoặc tách riêng mạng IoT cho camera.",
    category: "troubleshooting",
    publishedAt: "2026-06-02",
    readMinutes: 4,
    source: "TP-Link / Google Nest Help / ISP troubleshooting guides",
    relatedLinks: [
      { label: "Xem gói WiFi VNPT", href: "/wifi-vnpt" },
      { label: "FAQ WiFi & Camera", href: "/faq" },
    ],
  },
  {
    id: "22",
    slug: "fix-mesh-wifi-placement",
    title: "WiFi Mesh lắp rồi vẫn yếu: Sai vị trí node là lỗi phổ biến nhất",
    excerpt:
      "Mesh không phải cứ đặt thật xa là phủ sóng tốt. Node phụ cần bắt được tín hiệu đủ mạnh từ node chính hoặc dùng backhaul dây mạng.",
    content:
      "Nhiều nhà mua mesh nhưng vẫn gặp điểm chết vì đặt node phụ ngay tại nơi sóng đã quá yếu. Khi node phụ nhận tín hiệu kém từ router chính, nó chỉ khuếch đại một kết nối yếu, khiến tốc độ và độ ổn định không cải thiện nhiều. Vật cản như tường bê tông, cầu thang, cửa kim loại và tủ kín cũng làm mesh suy giảm mạnh.\n\nCách đặt đúng là để node phụ ở khoảng giữa router chính và khu vực cần phủ, nơi vẫn còn tín hiệu tốt. Với nhà nhiều tầng, ưu tiên đặt node gần cầu thang hoặc vị trí thoáng theo trục dọc. Nếu có thể kéo dây, Ethernet backhaul giữa các node là giải pháp ổn định nhất, đặc biệt khi gọi video, chơi game hoặc dùng camera cloud.\n\nSau khi đặt lại node, hãy kiểm tra bằng speedtest ở từng phòng và quan sát thiết bị có roaming đúng node gần nhất không. Nếu nhà quá rộng hoặc nhiều tường dày, cần thêm node hoặc triển khai access point có dây thay vì chỉ dựa vào mesh không dây.",
    category: "troubleshooting",
    publishedAt: "2026-06-01",
    readMinutes: 4,
    source: "Microsoft Support / TP-Link / NetSpot",
    relatedLinks: [
      { label: "Xem gói WiFi VNPT", href: "/wifi-vnpt" },
      { label: "FAQ chọn gói WiFi", href: "/faq" },
    ],
  },
];

export function formatNewsDate(isoDate: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
