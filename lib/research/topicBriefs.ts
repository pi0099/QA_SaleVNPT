import type {
  GeneratorCategory,
  ResearchResult,
  SearchIntent,
} from "@/lib/research/researchProvider";

export type TopicBrief = {
  id: string;
  keyword: string;
  category: GeneratorCategory;
  intent: SearchIntent;
  targetServicePage: string;
  titleHint: string;
  keyPoints: string[];
  cautions: string[];
  suggestedQuestions: string[];
  tags: string[];
};

/** Predefined topic briefs for Phase 1 — original outlines, not copied from web */
export const TOPIC_BRIEFS: TopicBrief[] = [
  {
    id: "draft-01",
    keyword: "chuyển nhà chuyển WiFi VNPT được không",
    category: "wifi-vnpt",
    intent: "informational",
    targetServicePage: "/wifi-vnpt",
    titleHint: "Chuyển nhà có chuyển WiFi VNPT được không? Quy trình thực tế",
    keyPoints: [
      "Có thể yêu cầu chuyển địa điểm nếu hạ tầng mới có VNPT",
      "Cần kiểm tra port cáp tại địa chỉ mới trước khi hẹn lắp",
      "Phí chuyển địa điểm tùy chính sách từng thời điểm",
      "Nên báo trước khi chuyển để tránh mất cước hoặc gián đoạn",
      "Giữ modem cũ hoặc đổi thiết bị tùy gói và tình trạng",
    ],
    cautions: [
      "Không tự ý tháo modem mang sang nhà mới nếu chưa đăng ký chuyển",
      "Địa chỉ mới không có hạ tầng VNPT có thể phải hủy và đăng ký mới",
    ],
    suggestedQuestions: [
      "Chuyển nhà trong Quận 12 mất bao lâu?",
      "Có mất phí hòa mạng lại không?",
      "Nhà mới chưa có cổng cáp thì sao?",
      "Có thể tạm dùng mạng cũ trong lúc chờ không?",
      "Cần giấy tờ gì khi chuyển địa điểm?",
    ],
    tags: ["chuyển nhà", "WiFi VNPT", "TP.HCM"],
  },
  {
    id: "draft-02",
    keyword: "WiFi VNPT cho nhà trọ nhiều phòng",
    category: "internet-gia-dinh",
    intent: "local",
    targetServicePage: "/wifi-vnpt-quan-12",
    titleHint: "WiFi VNPT cho nhà trọ nhiều phòng — chọn gói và lắp thế nào",
    keyPoints: [
      "Nhà trọ 5–10 phòng thường cần 500 Mbps trở lên",
      "Mesh hoặc access point giúp phủ sóng từng phòng",
      "Chia VLAN hoặc SSID riêng cho chủ và khách thuê",
      "Camera khu vực chung cần băng thông upload ổn định",
      "Quận 12 có nhiều dãy trọ cần khảo sát tận nơi",
    ],
    cautions: [
      "Không dùng một modem góc cho cả dãy trọ dài",
      "Tránh cam kết tốc độ cho từng phòng nếu chưa khảo sát",
    ],
    suggestedQuestions: [
      "Nhà trọ 8 phòng nên chọn gói nào?",
      "Có lắp WiFi riêng từng tầng được không?",
      "Phí Mesh cho nhà trọ khoảng bao nhiêu?",
      "Khách thuê dùng chung WiFi có ổn không?",
      "Lắp tại Quận 12 có hỗ trợ khảo sát không?",
    ],
    tags: ["nhà trọ", "WiFi VNPT", "Quận 12"],
  },
  {
    id: "draft-03",
    keyword: "modem WiFi 6 có cần thiết không",
    category: "wifi-vnpt",
    intent: "comparison",
    targetServicePage: "/wifi-vnpt",
    titleHint: "Modem WiFi 6 có cần thiết cho gia đình TP.HCM không?",
    keyPoints: [
      "WiFi 6 hữu ích khi nhiều thiết bị kết nối đồng thời",
      "Gói 500 Mbps trở lên mới tận dụng hết WiFi 6",
      "Nhà nhỏ 2–3 thiết bị có thể chưa cần nâng modem",
      "WiFi 6 cải thiện ổn định hơn tốc độ tối đa trong nhiều trường hợp",
      "VNPT có gói kèm modem WiFi 6 tùy thời điểm",
    ],
    cautions: [
      "Thiết bị cũ không hỗ trợ WiFi 6 thì lợi ích hạn chế",
      "Modem WiFi 6 không thay thế Mesh nếu nhà nhiều tầng",
    ],
    suggestedQuestions: [
      "Modem VNPT hiện tại có WiFi 6 không?",
      "iPhone cũ dùng WiFi 6 được không?",
      "Có đổi modem WiFi 6 riêng được không?",
      "WiFi 6 khác WiFi 5 thế nào?",
      "Nhà chung cư 70m² có cần WiFi 6?",
    ],
    tags: ["WiFi 6", "modem", "VNPT"],
  },
  {
    id: "draft-04",
    keyword: "kiểm tra hạ tầng VNPT theo địa chỉ",
    category: "wifi-vnpt",
    intent: "informational",
    targetServicePage: "/wifi-vnpt",
    titleHint: "Cách kiểm tra hạ tầng VNPT theo địa chỉ nhà bạn",
    keyPoints: [
      "Gửi số nhà, đường, phường để tra cứu port cáp",
      "Hạ tầng sẵn giúp lắp nhanh 1–3 ngày",
      "Khu dân cư mới có thể chưa kéo cáp",
      "Chung cư cần xác nhận hộp tầng hầm",
      "Nhân viên VNPT hỗ trợ tư vấn tra hạ tầng miễn phí",
    ],
    cautions: [
      "Tra online không thay thế xác nhận kỹ thuật tại chỗ",
      "Địa chỉ gần nhau vẫn có thể khác hạ tầng",
    ],
    suggestedQuestions: [
      "Quận 12 có hạ tạng VNPT không?",
      "Kiểm tra hạ tầng mất bao lâu?",
      "Không có hạ tầng thì phải làm gì?",
      "Cần gửi thông tin gì để kiểm tra?",
      "Có mất phí kiểm tra không?",
    ],
    tags: ["hạ tầng", "kiểm tra", "VNPT"],
  },
  {
    id: "draft-05",
    keyword: "combo Internet di động VNPT có lợi không",
    category: "internet-gia-dinh",
    intent: "comparison",
    targetServicePage: "/internet-di-dong-vnpt",
    titleHint: "Combo Internet + di động VNPT có lợi hơn gói rời không?",
    keyPoints: [
      "Combo thường giảm tổng cước so với đăng ký riêng",
      "Phù hợp hộ đã dùng SIM VNPT",
      "Cần so sánh data di động thực tế sử dụng",
      "Cam kết thời gian có thể dài hơn gói lẻ",
      "Thanh toán một hóa đơn tiện quản lý",
    ],
    cautions: [
      "Không combo nếu data di động dùng ít",
      "Đọc kỹ điều kiện hủy combo trước hạn",
    ],
    suggestedQuestions: [
      "Combo tiết kiệm khoảng bao nhiêu?",
      "Có bắt buộc cùng chủ hợp đồng không?",
      "Đổi gói combo giữa hợp đồng được không?",
      "SIM phụ có vào combo được không?",
      "Combo cho gia đình 4 người hợp lý không?",
    ],
    tags: ["combo", "Internet", "di động VNPT"],
  },
  {
    id: "draft-06",
    keyword: "SIM 5G VNPT cho livestream TikTok",
    category: "sim-5g",
    intent: "informational",
    targetServicePage: "/sim-5g-vnpt",
    titleHint: "SIM 5G VNPT cho livestream TikTok — gói nào đủ dùng?",
    keyPoints: [
      "Livestream tiêu tốn upload và data nhiều",
      "5G giúp độ trễ thấp hơn 4G trong vùng phủ sóng",
      "Nên test sóng 5G tại địa điểm livestream",
      "Hotspot cho máy quay cần gói data lớn",
      "Quận 12 và nội thành TP.HCM đã có điểm phủ 5G",
    ],
    cautions: [
      "5G trong nhà yếu hơn ngoài trời",
      "Không cam kết tốc độ livestream nếu chưa test sóng",
    ],
    suggestedQuestions: [
      "Gói 5G bao nhiêu GB cho livestream?",
      "Livestream trong nhà dùng WiFi hay 5G?",
      "Hotspot 5G ổn định không?",
      "Cần đổi SIM để dùng 5G không?",
      "eSIM livestream được không?",
    ],
    tags: ["5G", "livestream", "TikTok"],
  },
  {
    id: "draft-07",
    keyword: "gói data VNPT cho sinh viên",
    category: "sim-5g",
    intent: "pricing",
    targetServicePage: "/sim-5g-vnpt",
    titleHint: "Chọn gói data VNPT cho sinh viên TP.HCM — tiết kiệm và đủ dùng",
    keyPoints: [
      "Sinh viên thường cần data cho học online và giải trí",
      "Gói nhỏ đủ nếu có WiFi ký túc xá",
      "Combo nhà trọ WiFi + SIM tiết kiệm hơn data lớn",
      "Theo dõi mức dùng 2 tuần trước khi chọn gói tháng",
      "eSIM tiện cho sinh viên dùng iPhone hỗ trợ",
    ],
    cautions: [
      "Tránh gói data quá lớn nếu đa số dùng WiFi",
      "Kiểm tra phủ sóng tại khu ký túc",
    ],
    suggestedQuestions: [
      "Sinh viên nên chọn 4G hay 5G?",
      "Gói bao nhiêu GB là đủ?",
      "Có ưu đãi sinh viên không?",
      "Dùng hotspot cho laptop được không?",
      "Đăng ký SIM online có cần ra quầy không?",
    ],
    tags: ["sinh viên", "data", "VNPT"],
  },
  {
    id: "draft-08",
    keyword: "hotspot 5G VNPT cho laptop",
    category: "sim-5g",
    intent: "troubleshooting",
    targetServicePage: "/sim-5g-vnpt",
    titleHint: "Hotspot 5G VNPT cho laptop — cấu hình và lưu ý",
    keyPoints: [
      "Không phải mọi gói 5G đều cho phép hotspot không giới hạn",
      "Laptop tiêu tốn data nhanh hơn điện thoại",
      "Đặt mật khẩu hotspot mạnh tránh người lạ dùng",
      "Pin điện thoại hao nhanh khi bật hotspot lâu",
      "WiFi nhà vẫn ổn định hơn hotspot cho làm việc cả ngày",
    ],
    cautions: [
      "Kiểm tra điều khoản gói về hotspot",
      "Tránh hotspot công cộng không bảo mật",
    ],
    suggestedQuestions: [
      "Gói nào hotspot không giới hạn?",
      "Laptop Windows kết nối hotspot 5G thế nào?",
      "Hotspot bị chậm phải làm gì?",
      "5G hotspot khác 4G thế nào?",
      "Có nên thay WiFi bằng hotspot không?",
    ],
    tags: ["hotspot", "5G", "laptop"],
  },
  {
    id: "draft-09",
    keyword: "camera VNPT xem từ xa nước ngoài",
    category: "camera",
    intent: "informational",
    targetServicePage: "/camera-vnpt",
    titleHint: "Camera VNPT xem từ xa khi ở nước ngoài — cần gì?",
    keyPoints: [
      "Cần Internet ổn định tại nhà và app đăng nhập",
      "Cloud giúp xem lại khi có sự cố",
      "Độ trễ phụ thuộc mạng cả hai đầu",
      "Bật thông báo đẩy khi có chuyển động",
      "Không chia sẻ tài khoản app cho người lạ",
    ],
    cautions: [
      "WiFi nhà yếu sẽ làm camera offline",
      "Tuân thủ quy định riêng tư khi lắp camera",
    ],
    suggestedQuestions: [
      "Xem camera từ Mỹ có lag không?",
      "Cần gói cloud bao nhiêu ngày?",
      "Mất WiFi thì xem được không?",
      "App camera VNPT tên gì?",
      "Nhiều người cùng xem được không?",
    ],
    tags: ["camera", "xem từ xa", "VNPT"],
  },
  {
    id: "draft-10",
    keyword: "lắp camera cửa hàng nhỏ",
    category: "camera",
    intent: "local",
    targetServicePage: "/camera-vnpt",
    titleHint: "Lắp camera VNPT cho cửa hàng nhỏ tại TP.HCM",
    keyPoints: [
      "Cửa hàng cần camera cửa và kho/quầy",
      "Cloud 30 ngày phù hợp giám sát kinh doanh",
      "WiFi cửa hàng nên tách mạng khách và camera",
      "Camera có dây/PoE ổn định hơn WiFi cho 24/7",
      "Quận 12 có nhiều cửa hàng tạp hóa cần 2–4 camera",
    ],
    cautions: [
      "Không quay trái phép khu vực riêng tư",
      "Backup cloud không thay thế ổ cứng tại chỗ nếu cần",
    ],
    suggestedQuestions: [
      "Cửa hàng 30m² cần mấy camera?",
      "WiFi hay dây cho cửa hàng?",
      "Xem lại video 30 ngày giá sao?",
      "Lắp Quận 12 mất bao lâu?",
      "Camera có âm thanh không?",
    ],
    tags: ["cửa hàng", "camera", "lắp đặt"],
  },
  {
    id: "draft-11",
    keyword: "camera trong nhà có vi phạm riêng tư không",
    category: "camera",
    intent: "informational",
    targetServicePage: "/camera-vnpt",
    titleHint: "Lắp camera trong nhà có vi phạm riêng tư không?",
    keyPoints: [
      "Camera trong nhà riêng thường hợp pháp nếu không quay sang nhà hàng xóm",
      "Nên thông báo với người giúp việc hoặc khách",
      "Tránh đặt camera phòng ngủ khách nếu không cần thiết",
      "Chia sẻ clip cần cẩn trọng",
      "Luật và nội quy chung cư có thể có thêm quy định",
    ],
    cautions: [
      "Không tư vấn pháp lý chính thức — khách nên tự tìm hiểu thêm",
      "Không quay lối đi chung cư trái quy định BQL",
    ],
    suggestedQuestions: [
      "Camera cửa ra vào có cần xin phép?",
      "Ghi âm camera có hợp pháp không?",
      "Hàng xóm phàn nàn thì xử lý sao?",
      "Chung cư cấm camera ngoài hành lang?",
      "Lưu cloud bao lâu là hợp lý?",
    ],
    tags: ["riêng tư", "camera", "pháp lý"],
  },
  {
    id: "draft-12",
    keyword: "Internet chậm giờ cao điểm",
    category: "troubleshooting",
    intent: "troubleshooting",
    targetServicePage: "/wifi-vnpt",
    titleHint: "Internet VNPT chậm giờ cao điểm — nguyên nhân và cách xử lý",
    keyPoints: [
      "19h–23h nhiều hộ cùng online",
      "WiFi nhiễu tăng khi hàng xóm dùng nhiều",
      "Restart modem có thể cải thiện tạm thời",
      "Dùng dây LAN cho TV/PC giảm tải WiFi",
      "Gói quá thấp cho số thiết bị sẽ nghẽn giờ cao điểm",
    ],
    cautions: [
      "Không kết luận nhà mạng lỗi nếu chưa test dây LAN",
      "Speedtest một lần không đại diện cả ngày",
    ],
    suggestedQuestions: [
      "Chậm buổi tối có phải do VNPT không?",
      "Mesh có giúp giờ cao điểm không?",
      "Nên nâng gói hay tối ưu WiFi trước?",
      "Game lag giờ cao điểm xử lý sao?",
      "Có ghi nhận sự cố với nhà mạng không?",
    ],
    tags: ["chậm mạng", "giờ cao điểm", "WiFi"],
  },
  {
    id: "draft-13",
    keyword: "ping cao chơi game online",
    category: "troubleshooting",
    intent: "troubleshooting",
    targetServicePage: "/wifi-vnpt",
    titleHint: "Ping cao khi chơi game online — xử lý với WiFi VNPT",
    keyPoints: [
      "Ping phụ thuộc routing và server game",
      "WiFi tăng ping so với dây LAN",
      "Bufferbloat gây lag dù speedtest cao",
      "Chọn server gần Việt Nam khi có thể",
      "Tắt tải nền khi chơi game competitive",
    ],
    cautions: [
      "Không cam kết ping cố định cho mọi game",
      "VPN có thể làm ping tệ hơn",
    ],
    suggestedQuestions: [
      "Ping bao nhiêu là ổn cho game?",
      "WiFi 5GHz có giảm ping không?",
      "Modem VNPT chơi game được không?",
      "Cần gói bao nhiêu Mbps cho game?",
      "Mesh có tăng ping không?",
    ],
    tags: ["ping", "game online", "WiFi"],
  },
  {
    id: "draft-14",
    keyword: "WiFi khách mạng khác nhà phố",
    category: "internet-gia-dinh",
    intent: "informational",
    targetServicePage: "/wifi-vnpt",
    titleHint: "WiFi khách và mạng riêng trong nhà phố — nên tách thế nào?",
    keyPoints: [
      "Nên có SSID khách tách mạng chính",
      "Modem VNPT nhiều model hỗ trợ WiFi khách",
      "Giới hạn băng thông khách tránh chiếm hết mạng",
      "Nhà phố cho thuê phòng cần quy tắc sử dụng",
      "Đổi mật khẩu WiFi khách định kỳ",
    ],
    cautions: [
      "WiFi khách không thay thế bảo mật thiết bị yếu",
      "Không chia sẻ mật khẩu mạng chính",
    ],
    suggestedQuestions: [
      "Modem VNPT bật WiFi khách ở đâu?",
      "Khách có thấy thiết bị nhà mình không?",
      "Nhà trọ nên WiFi chung hay riêng?",
      "Mesh có tạo WiFi khách không?",
      "Cách đổi mật khẩu WiFi khách?",
    ],
    tags: ["WiFi khách", "nhà phố", "bảo mật"],
  },
  {
    id: "draft-15",
    keyword: "Mesh VNPT chung cư 70m2",
    category: "wifi-vnpt",
    intent: "local",
    targetServicePage: "/wifi-vnpt-quan-12",
    titleHint: "WiFi Mesh VNPT cho chung cư 70m² — có cần không?",
    keyPoints: [
      "Chung cư 70m² một tầng đôi khi chỉ cần modem đặt giữa",
      "Tường bê tông dày làm sóng yếu phòng trong",
      "Mesh 2 node đủ phủ 70–90m² nếu cần",
      "Đặt node tránh tủ kín và góc khuất",
      "Quận 12 nhiều chung cư mini cần khảo sát thực tế",
    ],
    cautions: [
      "Không mua Mesh nếu chưa thử đổi vị trí modem",
      "Node quá gần nhau lãng phí",
    ],
    suggestedQuestions: [
      "70m² cần mấy node Mesh?",
      "Mesh VNPT thuê hay mua?",
      "Chung cư cấm khoan tường thì sao?",
      "Mesh có chậm hơn modem không?",
      "Lắp Mesh Quận 12 giá bao nhiêu?",
    ],
    tags: ["Mesh", "chung cư", "70m2"],
  },
  {
    id: "draft-16",
    keyword: "eSIM VNPT 2 SIM trên iPhone",
    category: "sim-5g",
    intent: "informational",
    targetServicePage: "/sim-5g-vnpt",
    titleHint: "eSIM VNPT và SIM vật lý — dùng 2 SIM trên iPhone",
    keyPoints: [
      "iPhone hỗ trợ eSIM + nano SIM song song",
      "eSIM tiện đổi gói data nhanh",
      "Chọn SIM mặc định cho data và gọi",
      "Kích hoạt eSIM cần WiFi lần đầu",
      "Backup danh bạ trước khi đổi SIM",
    ],
    cautions: [
      "Không phải mọi iPhone đều hỗ trợ eSIM VNPT",
      "QR eSIM hết hạn cần cấp lại",
    ],
    suggestedQuestions: [
      "iPhone 11 dùng eSIM VNPT được không?",
      "SIM chính gọi, eSIM data được không?",
      "Chuyển eSIM sang máy mới thế nào?",
      "eSIM mất sóng xử lý sao?",
      "Đăng ký eSIM online được không?",
    ],
    tags: ["eSIM", "iPhone", "2 SIM"],
  },
  {
    id: "draft-17",
    keyword: "chuyển nhà Quận 12 lắp WiFi nhanh",
    category: "wifi-vnpt",
    intent: "local",
    targetServicePage: "/wifi-vnpt-quan-12",
    titleHint: "Chuyển nhà về Quận 12 — lắp WiFi VNPT nhanh thế nào?",
    keyPoints: [
      "Quận 12 hạ tầng phủ rộng ở nhiều phường",
      "Gửi địa chỉ trước để hẹn lịch sớm",
      "Chuẩn bị giấy tờ tránh trì hoãn",
      "Nhân viên VNPT hỗ trợ tư vấn khu vực Quận 12",
      "Có thể chuyển địa điểm thay vì đăng ký mới",
    ],
    cautions: [
      "Địa chỉ ven Quận 12 vẫn cần kiểm tra port",
      "Không hứa lắp trong ngày nếu chưa tra hạ tầng",
    ],
    suggestedQuestions: [
      "Quận 12 lắp mất mấy ngày?",
      "Phường nào hẹn nhanh nhất?",
      "Chuyển từ quận khác về Quận 12?",
      "Nhà mới xây Quận 12 có mạng không?",
      "Liên hệ tư vấn Quận 12 qua đâu?",
    ],
    tags: ["Quận 12", "chuyển nhà", "lắp WiFi"],
  },
  {
    id: "draft-18",
    keyword: "văn phòng nhỏ 5 người chọn gói WiFi",
    category: "internet-gia-dinh",
    intent: "pricing",
    targetServicePage: "/wifi-vnpt",
    titleHint: "Văn phòng nhỏ 5 người nên chọn gói WiFi VNPT nào?",
    keyPoints: [
      "5 người + laptop + họp online cần 500 Mbps trở lên",
      "Upload quan trọng cho gọi video",
      "Nên có dây LAN cho máy chủ hoặc PC cố định",
      "WiFi khách cho khách đến văn phòng",
      "Backup 4G/5G cho sự cố ngắn",
    ],
    cautions: [
      "Gói gia đình có thể không đủ SLA cho văn phòng",
      "Không dùng chung WiFi cá nhân và công ty nếu cần bảo mật",
    ],
    suggestedQuestions: [
      "500 Mbps đủ cho 5 người không?",
      "Cần IP tĩnh không?",
      "Mesh cho văn phòng 80m²?",
      "Combo di động cho nhân viên?",
      "Lắp văn phòng Quận 12 mất bao lâu?",
    ],
    tags: ["văn phòng", "gói WiFi", "doanh nghiệp nhỏ"],
  },
  {
    id: "draft-19",
    keyword: "camera AI nhận diện người lạ VNPT",
    category: "camera",
    intent: "comparison",
    targetServicePage: "/camera-vnpt",
    titleHint: "Camera AI nhận diện người lạ — VNPT có gì phù hợp gia đình?",
    keyPoints: [
      "AI cảnh báo chuyển động giảm báo động giả",
      "Phân biệt người và vật nuôi tùy model",
      "Cần WiFi ổn định cho stream AI",
      "Cloud lưu clip sự kiện quan trọng",
      "Đặt camera đủ cao và góc rộng",
    ],
    cautions: [
      "AI không thay thế an ninh vật lý",
      "Độ chính xác phụ thuộc ánh sáng và góc lắp",
    ],
    suggestedQuestions: [
      "Camera AI VNPT giá bao nhiêu?",
      "Nhận diện người lạ chính xác không?",
      "Có báo động qua app không?",
      "Ban đêm AI hoạt động tốt không?",
      "Lắp cửa nhà phố cần mấy camera?",
    ],
    tags: ["camera AI", "an ninh", "VNPT"],
  },
  {
    id: "draft-20",
    keyword: "thanh toán cước VNPT online an toàn",
    category: "internet-gia-dinh",
    intent: "informational",
    targetServicePage: "/wifi-vnpt",
    titleHint: "Thanh toán cước VNPT online — kênh nào an toàn và tiện?",
    keyPoints: [
      "App và website chính thức VNPT hỗ trợ thanh toán online",
      "Chuyển khoản ghi đúng mã khách hàng",
      "Tránh link lạ qua SMS/Zalo giả mạo",
      "Lưu biên lai sau mỗi lần thanh toán",
      "Tôi hướng dẫn tra mã thanh toán khi tư vấn",
    ],
    cautions: [
      "Không chia sẻ OTP cho người lạ",
      "Website tư vấn không thu hộ cước thay VNPT",
    ],
    suggestedQuestions: [
      "Thanh toán online mất bao lâu cập nhật?",
      "Quên mã khách hàng tra ở đâu?",
      "Thanh toán hộ người khác được không?",
      "Trễ cước bao lâu bị cắt mạng?",
      "Có tự động trích nợ không?",
    ],
    tags: ["thanh toán", "cước VNPT", "online"],
  },
];

export function briefToResearchResult(
  brief: TopicBrief,
  manualSourceUrls: string[] = [],
): ResearchResult {
  const manualSources = manualSourceUrls
    .filter(Boolean)
    .map((url) => ({
      url,
      title: "Nguồn tham khảo (admin)",
      referenceOnly: true,
    }));

  return {
    keyword: brief.keyword,
    category: brief.category,
    intent: brief.intent,
    sources: manualSources,
    keyPoints: brief.keyPoints,
    cautions: brief.cautions,
    suggestedQuestions: brief.suggestedQuestions,
    usedExternalResearch: false,
    warning:
      "External research is not connected. Draft uses internal topic brief only.",
    briefId: brief.id,
  };
}

export function findBriefByKeyword(keyword: string): TopicBrief | undefined {
  const q = keyword.trim().toLowerCase();
  return TOPIC_BRIEFS.find(
    (b) =>
      b.keyword.toLowerCase() === q ||
      b.keyword.toLowerCase().includes(q) ||
      q.includes(b.keyword.toLowerCase()),
  );
}

export function findBriefsForGeneration(
  category: GeneratorCategory,
  count: number,
  keyword?: string,
): TopicBrief[] {
  if (keyword?.trim()) {
    const exact = findBriefByKeyword(keyword);
    if (exact) return [exact];
    const generic: TopicBrief = {
      id: `custom-${Date.now()}`,
      keyword: keyword.trim(),
      category,
      intent: "informational",
      targetServicePage: "/wifi-vnpt",
      titleHint: keyword.trim(),
      keyPoints: [
        `Chủ đề: ${keyword.trim()} — cần tư vấn theo địa chỉ TP.HCM`,
        "Kiểm tra hạ tầng VNPT trước khi đăng ký",
        "So sánh gói phù hợp nhu cầu thực tế",
        "Hỗ trợ đăng ký dịch vụ VNPT khu vực TP.HCM",
        "Quận 12 có hỗ trợ khảo sát tận nơi",
      ],
      cautions: [
        "Website tư vấn, không phải cổng thông tin chính thức toàn quốc VNPT",
      ],
      suggestedQuestions: [
        `${keyword.trim()} mất bao lâu?`,
        `Chi phí ${keyword.trim()} khoảng bao nhiêu?`,
        "Cần giấy tờ gì?",
        "Quận 12 có hỗ trợ không?",
        "Liên hệ tư vấn qua đâu?",
      ],
      tags: [keyword.trim(), "VNPT", "TP.HCM"],
    };
    return [generic];
  }

  const pool = TOPIC_BRIEFS.filter((b) => b.category === category);
  const source = pool.length > 0 ? pool : TOPIC_BRIEFS;
  return source.slice(0, Math.min(count, source.length));
}
