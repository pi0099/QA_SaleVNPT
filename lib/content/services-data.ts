import type { Service } from "@/lib/content/types";

const wifiContent = `
<h2>Lắp WiFi VNPT tại TP.HCM — tư vấn theo địa chỉ thực tế</h2>
<p>Khi đăng ký WiFi VNPT, yếu tố quan trọng nhất không phải chỉ là bảng giá trên website mà là hạ tầng tại địa chỉ lắp đặt. Mỗi tuyến đường, mỗi chung cư hay nhà hẻm có điều kiện kéo cáp và công suất khác nhau. Tôi là nhân viên VNPT hỗ trợ tư vấn trực tiếp tại khu vực Quận 12 và các quận nội thành TP.HCM, giúp khách chọn gói phù hợp trước khi đăng ký.</p>

<h3>Ai nên đăng ký WiFi VNPT?</h3>
<p>Gói Internet gia đình VNPT phù hợp hộ gia đình 2–6 người, căn hộ cho thuê, văn phòng nhỏ và cửa hàng cần đường truyền ổn định cho học online, làm việc từ xa, camera và giải trí. Nếu nhà nhiều tầng hoặc diện tích lớn, nên cân nhắc thêm WiFi Mesh thay vì chỉ dùng modem mặc định.</p>

<h3>Quy trình đăng ký và lắp đặt</h3>
<p>Quy trình thường gồm 4 bước: (1) Gửi thông tin qua Zalo hoặc gọi điện; (2) Kiểm tra hạ tầng theo địa chỉ; (3) Chốt gói cước và phí hòa mạng; (4) Hẹn kỹ thuật lắp đặt tận nơi. Thời gian lắp thường từ 1–3 ngày làm việc tùy khu vực và tình trạng hạ tầng.</p>

<h3>Chọn tốc độ 300 Mbps, 500 Mbps hay 1 Gbps?</h3>
<p>Với 2–3 thiết bị cơ bản (điện thoại, laptop), gói 300 Mbps thường đủ dùng. Hộ 4–8 thiết bị, xem phim 4K và camera nên cân nhắc 500 Mbps. Gói ~1 Gbps phù hợp nhà đông thiết bị, streamer hoặc văn phòng nhỏ cần băng thông dư. Tôi sẽ hỏi số thiết bị và mục đích sử dụng trước khi gợi ý.</p>

<h3>Phí hòa mạng và giấy tờ cần chuẩn bị</h3>
<p>Phí hòa mạng Internet VNPT thường áp dụng theo chính sách từng thời điểm (tham khảo trên bảng giá trang chủ). Giấy tờ thường cần: CMND/CCCD và thông tin liên hệ chính xác. Với nhà thuê, nên chuẩn bị thêm thông tin chủ nhà hoặc hợp đồng thuê nếu khu vực yêu cầu.</p>

<h3>WiFi Mesh — khi nào nên dùng?</h3>
<p>Nhà nhiều tầng, nhiều phòng ngăn hoặc hẻm sâu thường bị sóng yếu ở phía xa modem. WiFi Mesh giúp phủ sóng đều hơn so với router phụ thông thường. Tôi thường khuyên khảo sát vị trí đặt modem trước, sau đó mới quyết định có cần Mesh hay không để tránh phát sinh chi phí không cần thiết.</p>

<h3>Khu vực hỗ trợ</h3>
<p>Tôi ưu tiên hỗ trợ Quận 12 — nơi tôi làm việc trực tiếp — và các quận nội thành TP.HCM như Gò Vấp, Tân Bình, Hóc Môn, Thủ Đức. Nếu địa chỉ ngoài khu vực, vẫn có thể tư vấn sơ bộ nhưng thời gian hẹn lắp có thể khác.</p>
`;

const internetDiDongContent = `
<h2>Combo Internet + Di động VNPT — một gói, hai nhu cầu</h2>
<p>Nhiều gia đình tại TP.HCM đang dùng WiFi nhà và SIM riêng cho từng người, dẫn đến chi phí rời rạc và khó quản lý. Combo Internet + di động VNPT gom hai dịch vụ vào một gói, phù hợp hộ có 2–4 thành viên cần vừa băng thông cố định vừa data di động.</p>

<h3>Lợi ích của combo so với đăng ký riêng lẻ</h3>
<p>Combo thường có ưu đãi tổng hóa bill, tiện theo dõi một hóa đơn thay vì hai. Phù hợp gia đình có người lớn làm việc tại nhà (cần WiFi) và con em đi học (cần data SIM). Tôi sẽ so sánh tổng chi phí combo với gói rời trước khi khuyên khách đăng ký.</p>

<h3>Gói combo phù hợp hộ gia đình nào?</h3>
<p>Hộ 3–5 người, dùng internet cho học tập, giải trí và làm việc hybrid thường chọn combo mức trung. Hộ cần tốc độ cao kết hợp data lớn cho livestream hoặc kinh doanh online nên chọn gói cao hơn. Quan trọng là xác định số SIM cần dùng và mức data thực tế mỗi tháng.</p>

<h3>Quy trình tư vấn combo</h3>
<p>Tôi thu thập thông tin: địa chỉ lắp WiFi, số thành viên, số điện thoại cần gắn SIM, mức sử dụng data trung bình. Sau đó đối chiếu bảng combo hiện hành và giải thích rõ phần Internet, phần di động và phí hòa mạng (nếu có).</p>

<h3>Lưu ý khi chuyển từ gói cũ</h3>
<p>Nếu khách đang dùng WiFi hoặc SIM VNPT gói cũ, cần kiểm tra thời hạn cam kết và điều khoản chuyển đổi. Không phải mọi gói đều chuyển combo ngay được. Tôi hỗ trợ kiểm tra trước để tránh phát sinh phí phạt.</p>

<h3>Khu vực phục vụ</h3>
<p>Hỗ trợ tư vấn combo tại Quận 12 và nội thành TP.HCM. Lắp WiFi tận nơi theo lịch hẹn; SIM có thể hướng dẫn kích hoạt online hoặc giao nhận tùy loại gói.</p>
`;

const sim5gContent = `
<h2>SIM 5G / 4G VNPT — chọn gói data theo nhu cầu thực tế</h2>
<p>SIM 5G VNPT phù hợp người dùng smartphone hỗ trợ 5G, cần tốc độ cao khi di chuyển, livestream hoặc làm việc ngoài WiFi. SIM 4G vẫn là lựa chọn tốt cho thiết bị phổ thông, backup data hoặc mức dùng vừa phải. Tôi tư vấn theo mức dùng thực tế, không khuyên gói quá lớn gây lãng phí.</p>

<h3>SIM 5G VNPT — ai nên dùng?</h3>
<p>Người thường xuyên xem video HD/4K trên di động, chơi game online, livestream bán hàng hoặc làm việc di động nên cân nhắc 5G. Cần điện thoại hỗ trợ băng tần 5G và khu vực có sóng. Tại TP.HCM, vùng phủ 5G đang mở rộng nhưng chưa đồng đều mọi quận — tôi sẽ tư vấn thực tế theo khu vực bạn sinh sống.</p>

<h3>eSIM VNPT — khi nào tiện hơn SIM vật lý?</h3>
<p>eSIM phù hợp điện thoại hỗ trợ eSIM, người hay đổi gói hoặc muốn dùng song SIM ảo. Kích hoạt qua QR code, không cần chờ giao SIM. Tuy nhiên không phải mọi máy đều hỗ trợ — tôi sẽ kiểm tra model điện thoại trước khi gợi ý.</p>

<h3>Chọn gói data — tránh lãng phí</h3>
<p>Gói data nhỏ (vài GB/ngày) phù hợp lướt web, Zalo, map cơ bản. Gói trung phù hợp xem video, học online. Gói lớn dành livestream, tải file nặng hoặc dùng làm hotspot cho laptop. Tôi thường hỏi khách dùng data chủ yếu ở đâu (nhà có WiFi không) trước khi chốt gói.</p>

<h3>Đổi SIM 4G lên 5G có cần thay SIM không?</h3>
<p>Tùy loại SIM hiện tại. SIM 4G đời cũ có thể cần đổi sang USIM mới để dùng 5G. Tôi hỗ trợ kiểm tra và hướng dẫn đổi SIM tại quầy hoặc qua quy trình phù hợp.</p>

<h3>APN và khắc phục sự cố data</h3>
<p>Sau khi lắp SIM mới, đôi khi cần cấu hình APN đúng để lên 5G. Nếu data chập chờn, kiểm tra vùng phủ, chế độ mạng trên máy và gói cước còn hạn. Xem thêm bài viết hướng dẫn tại mục Tin tức.</p>
`;

const cameraContent = `
<h2>Lắp Camera VNPT — giám sát an toàn cho nhà và cửa hàng</h2>
<p>Camera VNPT hỗ trợ giám sát qua app, lưu cloud và cảnh báo chuyển động. Phù hợp gia đình có trẻ nhỏ, người già, cửa hàng cần xem mặt tiền hoặc kho hàng. Tôi tư vấn số lượng camera, vị trí lắp và kết hợp WiFi ổn định để tránh mất kết nối.</p>

<h3>Camera WiFi hay có dây — nên chọn loại nào?</h3>
<p>Camera WiFi linh hoạt, dễ lắp ở vị trí xa nguồn mạng có sóng tốt. Camera có dây ổn định hơn cho môi trường nhiều nhiễu sóng hoặc cần giám sát liên tục 24/7. Với nhà hẻm sâu hoặc tường dày, tôi thường khuyên kiểm tra sóng WiFi trước hoặc dùng camera có dây/PoE.</p>

<h3>Lưu cloud — cần lưu ý gì?</h3>
<p>Gói cloud lưu lịch sử video theo số ngày (7, 30 ngày...). Chọn gói theo mức độ quan trọng: nhà ở có thể 7 ngày, cửa hàng nên 30 ngày trở lên. Tôi giải thích rõ phí cloud hàng tháng và cách xem lại trên app.</p>

<h3>Kết hợp Camera + WiFi VNPT</h3>
<p>Nhiều trường hợp camera hay mất kết nối do WiFi yếu, không phải do camera hỏng. Nếu khách chưa có internet VNPT ổn định, tôi khuyên xử lý WiFi trước hoặc đăng ký combo Internet + Camera để tối ưu chi phí.</p>

<h3>Quy trình lắp camera tận nơi</h3>
<p>Survey vị trí → chọn số camera và gói cloud → hẹn kỹ thuật lắp → hướng dẫn xem trên app. Thời gian thường 1–2 ngày làm việc sau khi chốt gói.</p>

<h3>Khu vực hỗ trợ lắp đặt</h3>
<p>Ưu tiên Quận 12 và nội thành TP.HCM. Cửa hàng, nhà phố và chung cư đều có thể tư vấn — mỗi loại hình có cách bố trí camera khác nhau.</p>
`;

export const services: Service[] = [
  {
    id: "wifi-vnpt",
    title: "Lắp WiFi VNPT",
    slug: "wifi-vnpt",
    shortDescription:
      "Tư vấn gói Internet gia đình VNPT, kiểm tra hạ tầng theo địa chỉ và hỗ trợ lắp đặt tận nơi tại TP.HCM.",
    longContent: wifiContent.trim(),
    seoTitle: "Lắp WiFi VNPT TP.HCM | Tư vấn gói cước, lắp tận nơi Quận 12",
    seoDescription:
      "Nhân viên VNPT hỗ trợ tư vấn lắp WiFi VNPT tại Quận 12 và TP.HCM. Kiểm tra hạ tầng, chọn gói 300Mbps–1Gbps, hẹn lắp đặt nhanh.",
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
    longContent: internetDiDongContent.trim(),
    seoTitle: "Combo Internet + Di động VNPT | Tư vấn gói gia đình TP.HCM",
    seoDescription:
      "Tư vấn combo Internet + di động VNPT tại TP.HCM. Gom WiFi và SIM, tiết kiệm chi phí, hỗ trợ đăng ký tận nơi Quận 12.",
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
    relatedPostSlugs: ["internet-vnpt-va-wifi-mesh-cho-nha-nhieu-tang"],
  },
  {
    id: "sim-5g-vnpt",
    title: "SIM 5G / 4G VNPT",
    slug: "sim-5g-vnpt",
    shortDescription:
      "Tư vấn gói 5G data, SIM 4G và eSIM VNPT theo mức sử dụng thực tế tại TP.HCM.",
    longContent: sim5gContent.trim(),
    seoTitle: "SIM 5G VNPT | Tư vấn gói data, eSIM tại TP.HCM",
    seoDescription:
      "Đăng ký SIM 5G, 4G VNPT với tư vấn miễn phí. Chọn gói data phù hợp, hỗ trợ eSIM và kích hoạt tại Quận 12, TP.HCM.",
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
    longContent: cameraContent.trim(),
    seoTitle: "Lắp Camera VNPT TP.HCM | Tư vấn cloud, lắp tận nơi",
    seoDescription:
      "Tư vấn lắp Camera VNPT tại Quận 12 và TP.HCM. Chọn gói cloud, vị trí lắp, kết hợp WiFi ổn định.",
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
