function p(text) {
  return `<p>${text}</p>`;
}
function h2(text) {
  return `<h2>${text}</h2>`;
}
function h3(text) {
  return `<h3>${text}</h3>`;
}
function ul(items) {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}
function ol(items) {
  return `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
}
function build(intro, ...blocks) {
  return p(intro) + blocks.join("");
}

export const allPosts = [
  {
    meta: {
      slug: "bang-gia-lap-wifi-vnpt-2026",
      title: "Bảng giá lắp WiFi VNPT 2026 — cập nhật và cách đọc đúng",
      excerpt:
        "Tổng hợp cách đọc bảng giá WiFi VNPT: phí hòa mạng, giá nội/ngoại thành và mẹo chọn gói không bị phát sinh.",
      category: "wifi",
      tags: ["bảng giá", "WiFi VNPT", "2026"],
      seoTitle: "Bảng giá lắp WiFi VNPT 2026 | Cập nhật TP.HCM",
      seoDescription:
        "Cách đọc bảng giá WiFi VNPT 2026, phí hòa mạng và chọn gói phù hợp tại TP.HCM.",
      publishedAt: "2026-06-01",
      relatedPostSlugs: [
        "lap-wifi-vnpt-mat-bao-lau",
        "wifi-vnpt-300mbps-co-du-dung-khong",
      ],
      featured: true,
    },
    faqs: [
      {
        question: "Bảng giá WiFi VNPT 2026 có thay đổi theo tháng không?",
        answer:
          "Cước hàng tháng thường ổn định trong hợp đồng, nhưng phí hòa mạng và khuyến mãi có thể thay đổi theo đợt. Tôi luôn gửi bảng giá mới nhất trước khi khách ký.",
      },
      {
        question: "Quận 12 thuộc giá nội thành hay ngoại thành?",
        answer:
          "Quận 12 thuộc khu vực nội thành TP.HCM trên bảng giá VNPT. Bạn nên xác nhận địa chỉ cụ thể vì một số khu vực biên giới có thể khác.",
      },
      {
        question: "Có phí ẩn ngoài bảng giá không?",
        answer:
          "Phí hòa mạng, thuê modem và Mesh (nếu có) là các khoản thường gặp. Tôi liệt kê đầy đủ trước khi đăng ký để khách không bị bất ngờ.",
      },
    ],
    body: build(
      "Mỗi tuần tôi nhận không ít tin nhắn hỏi về bảng giá lắp WiFi VNPT 2026. Nhiều người xem bảng trên website hoặc qua Zalo rồi thắc mắc: sao giá mình được báo khác giá bạn bè? Thực tế, bảng giá WiFi VNPT không chỉ là một con số cước tháng — nó gồm nhiều thành phần và phụ thuộc địa chỉ lắp đặt. Bài viết này tôi tổng hợp cách đọc bảng giá đúng, tránh phát sinh và chọn gói phù hợp cho hộ gia đình tại TP.HCM, đặc biệt khu vực Quận 12 mà tôi hỗ trợ trực tiếp.",
      h2("Bảng giá WiFi VNPT gồm những khoản nào?"),
      p(
        "Khi nhìn bảng giá, đa số khách chỉ chú ý cột tốc độ và giá tháng. Tôi thường giải thích thêm ba nhóm chi phí chính để tránh hiểu nhầm sau này.",
      ),
      h3("Cước hàng tháng"),
      p(
        "Đây là khoản bạn trả định kỳ mỗi tháng theo gói đã chọn — 300 Mbps, 500 Mbps, 1 Gbps… Giá niêm yết trên bảng thường áp dụng khi trả cước đủ 12 tháng hoặc theo chương trình khuyến mãi từng thời điểm. Nếu trả theo tháng lẻ, cước có thể cao hơn vài chục nghìn so với cam kết dài hạn. Tôi khuyên so sánh tổng chi phí cả năm thay vì chỉ nhìn tháng đầu.",
      ),
      h3("Phí hòa mạng"),
      p(
        "Phí hòa mạng thu một lần khi đăng ký mới. Một số đợt khuyến mãi miễn phí hòa mạng hoặc giảm 50–100%. Tôi luôn ghi rõ con số này trong tin nhắn tư vấn vì đây là khoản khách hay bất ngờ nhất nếu không được báo trước. Khi so sánh giữa hai nhà mạng, nhớ cộng phí hòa mạng vào tổng chi phí năm đầu.",
      ),
      h3("Thiết bị và dịch vụ bổ sung"),
      p(
        "Modem WiFi thường đi kèm gói Internet. Nếu nhà rộng, nhiều tầng, bạn có thể cần thêm WiFi Mesh — chi phí thuê hoặc mua node Mesh tính riêng. Camera, combo di động cũng có bảng giá riêng, không nằm trong cước Internet cơ bản. Đừng nhầm giá Internet thuần với combo trọn gói.",
      ),
      h2("Giá nội thành và ngoại thành — đọc đúng cột nào?"),
      p(
        "TP.HCM trên bảng giá VNPT thường chia nội thành và ngoại thành. Quận 12 thuộc nội thành, nên khi so sánh giá bạn cần nhìn cột nội thành, không lấy giá ngoại thành của Bình Dương hay Long An để đối chiếu.",
      ),
      p(
        "Tôi hay gặp trường hợp khách chuyển nhà từ quận trung tâm sang Quận 12, nghĩ giá sẽ giảm — thực tế vẫn là mức nội thành. Ngược lại, ai lắp ở huyện ngoại thành nhưng xem nhầm bảng nội thành sẽ thất vọng khi nhận hóa đơn. Cách chắc chắn nhất: gửi địa chỉ cụ thể (số nhà, đường, phường) để kiểm tra hạ tầng và mức giá áp dụng.",
      ),
      h2("Cách đọc bảng giá theo nhu cầu thực tế"),
      p(
        "Bảng giá liệt kê nhiều gói tốc độ. Tôi gợi ý chọn theo số người và thiết bị, không chọn gói cao nhất mặc định.",
      ),
      ul([
        "<strong>1–3 người, 5–8 thiết bị:</strong> 300 Mbps thường đủ cho lướt web, học online, xem phim HD.",
        "<strong>4–6 người, nhiều TV/camera:</strong> 500 Mbps cân bằng giá và trải nghiệm.",
        "<strong>Livestream, làm việc từ xa nặng, văn phòng nhỏ:</strong> cân nhắc 1 Gbps.",
      ]),
      p(
        "Nhà 2–3 tầng dù chọn gói cao vẫn có thể WiFi yếu ở xa modem — khi đó cần Mesh chứ không phải nâng gói Internet. Tôi thường khảo sát miễn phí trước khi khuyên nâng cước, vì nhiều khách tiết kiệm được bằng cách đặt modem đúng chỗ thay vì trả thêm hàng trăm nghìn mỗi tháng.",
      ),
      h2("Mẹo tiết kiệm khi xem bảng giá 2026"),
      p(
        "Thứ nhất, so sánh tổng chi phí 12 tháng (cước × 12 + phí hòa mạng − khuyến mãi), không chỉ so tháng đầu. Thứ hai, hỏi rõ modem đi kèm loại gì, có WiFi 6 không. Thứ ba, nếu đã dùng di động VNPT, combo Internet + di động đôi khi rẻ hơn đăng ký rời.",
      ),
      p(
        "Thứ tư, tránh cam kết gói quá cao chỉ vì khuyến mãi tặng tháng — khi hết khuyến mãi, cước gốc có thể cao hơn nhu cầu. Thứ năm, hỏi chính sách đổi gói giữa hợp đồng: một số khách đăng ký 1 Gbps rồi muốn hạ xuống 500 Mbps nhưng không rõ điều kiện.",
      ),
      h2("Những điều nên hỏi trước khi chốt"),
      p(
        "Trước khi ký, tôi khuyên bạn xác nhận: thời gian lắp dự kiến, ai chịu phí nếu cần kéo thêm cáp, chính sách đổi gói giữa hợp đồng, và cách liên hệ khi sự cố. Bảng giá chỉ là điểm bắt đầu; trải nghiệm lắp đặt và hỗ trợ sau bán mới quyết định bạn có hài lòng lâu dài hay không.",
      ),
      p(
        "Nếu bạn đang ở Quận 12 hoặc lân cận và cần bảng giá WiFi VNPT 2026 cập nhật theo địa chỉ nhà, cứ nhắn tôi — tôi gửi chi tiết từng khoản, không gói gọn chung chung. Tôi cũng sẵn sàng so sánh với nhu cầu thực tế để bạn không trả thừa cho băng thông không dùng hết.",
      ),
    ),
  },
  {
    meta: {
      slug: "lap-wifi-vnpt-mat-bao-lau",
      title: "Lắp WiFi VNPT mất bao lâu? Timeline thực tế tại TP.HCM",
      excerpt:
        "Từ lúc đăng ký đến khi có mạng: timeline 1–3 ngày và yếu tố ảnh hưởng tốc độ lắp.",
      category: "wifi",
      tags: ["lắp đặt", "thời gian"],
      seoTitle: "Lắp WiFi VNPT mất bao lâu? | Timeline TP.HCM",
      seoDescription:
        "WiFi VNPT lắp mất bao lâu tại TP.HCM? Timeline thực tế và mẹo rút ngắn thời gian.",
      publishedAt: "2026-06-02",
      relatedPostSlugs: ["lap-wifi-vnpt-can-giay-to-gi"],
    },
    faqs: [
      {
        question: "Đăng ký WiFi VNPT online có nhanh hơn ra quầy không?",
        answer:
          "Thời gian lắp phụ thuộc lịch kỹ thuật và hạ tầng, không phụ thuộc nhiều kênh đăng ký. Tuy nhiên đăng ký qua tư vấn viên giúp hồ sơ vào hệ thống nhanh hơn nếu giấy tờ đầy đủ.",
      },
      {
        question: "Cuối tuần có lắp WiFi VNPT không?",
        answer:
          "Kỹ thuật thường làm việc ngày thường. Một số khu vực có thể hẹn thứ Bảy sáng, nhưng không phải lúc nào cũng có — tôi sẽ báo lịch cụ thể sau khi kiểm tra hạ tầng.",
      },
      {
        question: "Chuyển nhà sang địa chỉ mới mất bao lâu?",
        answer:
          "Chuyển địa chỉ thường 2–5 ngày làm việc tùy hạ tầng nơi mới. Nếu cùng quận và có port trống, có thể nhanh hơn đăng ký mới hoàn toàn.",
      },
    ],
    body: build(
      "Câu hỏi “lắp WiFi VNPT mất bao lâu?” xuất hiện gần như mỗi khi tôi nhận đơn mới. Khách cần mạng gấp cho con học online, mở cửa hàng, hay chuyển nhà — ai cũng muốn biết timeline thực tế, không phải lời hứa chung chung. Dựa trên kinh nghiệm hỗ trợ lắp đặt tại TP.HCM, đặc biệt Quận 12, tôi chia sẻ quy trình từng bước và yếu tố làm nhanh hoặc chậm.",
      h2("Timeline trung bình: 1–3 ngày làm việc"),
      p(
        "Đa số hộ gia đình có hạ tầng sẵn (cáp quang đã phủ tới tủ/khu dân cư) sẽ được lắp trong 1–3 ngày làm việc kể từ khi hồ sơ hợp lệ. “Ngày làm việc” nghĩa là trừ Chủ nhật và ngày lễ — nếu bạn đăng ký thứ Sáu chiều, thường phải chờ sang tuần sau.",
      ),
      h3("Ngày 1: Tiếp nhận và kiểm tra hạ tầng"),
      p(
        "Hồ sơ được ghi nhận, hệ thống kiểm tra xem địa chỉ có port cáp trống không. Nếu khu vực đã có hạ tầng VNPT, bước này nhanh — vài giờ đến cả ngày. Nếu cần khảo sát thêm (chung cư mới, khu dân cư vừa mở), có thể thêm 1 ngày.",
      ),
      h3("Ngày 2–3: Hẹn kỹ thuật lắp đặt"),
      p(
        "Kỹ thuật viên đến kéo cáp (nếu cần), lắp modem, cấu hình WiFi, test tốc độ. Buổi lắp thường 1–2 tiếng với nhà phố thông thường. Sau khi xong, bạn nên test ngay trên điện thoại và laptop ở vài vị trí trong nhà.",
      ),
      h2("Yếu tố làm chậm quá trình lắp"),
      p("Không phải đơn nào cũng xong trong 24 giờ. Tôi thấy các trường hợp kéo dài vì:"),
      ul([
        "<strong>Giấy tờ chưa đủ hoặc sai:</strong> CMND/CCCD không khớp địa chỉ lắp, thiếu thông tin chủ nhà với nhà thuê.",
        "<strong>Hạ tầng chưa sẵn:</strong> Khu mới, cần xin mở port hoặc kéo cáp bổ sung.",
        "<strong>Lịch kỹ thuật đông:</strong> Đầu tháng, sau mùa chuyển nhà, cuối năm học — lượng đơn tăng.",
        "<strong>Khách hẹn lại:</strong> Không có người nhà mở cửa khi kỹ thuật đến.",
        "<strong>Yêu cầu lắp phức tạp:</strong> Kéo cáp nhiều tầng, hộp cáp xa, cần thi công thêm.",
      ]),
      h2("Khu vực Quận 12 — tôi thấy thế nào?"),
      p(
        "Quận 12 có mật độ dân cư cao, hạ tầng VNPT khá phủ rộng ở các phường như Tân Thới Nhất, Thới An, An Phú Đông. Đơn tại đây tôi thường hẹn nhanh hơn trung bình TP.HCM vì quen lịch kỹ thuật khu vực và hỗ trợ khách chuẩn bị giấy tờ trước.",
      ),
      p(
        "Tuy nhiên khu vực ven như các đường mới mở vẫn cần kiểm tra từng địa chỉ. Đừng assume “Quận 12 là nội thành nên chắc có mạng” — luôn gửi số nhà cụ thể để tôi tra hạ tầng trước.",
      ),
      h2("Mẹo rút ngắn thời gian chờ"),
      p(
        "Chuẩn bị sẵn ảnh CMND/CCCD hai mặt, số điện thoại liên hệ luôn bật, và thống nhất giờ có mặt tại nhà. Gửi địa chỉ chính xác kèm ảnh mặt tiền hoặc vị trí muốn đặt modem giúp kỹ thuật mang đủ dụng cụ.",
      ),
      p(
        "Nếu nhà thuê, xin trước ý chủ nhà cho khoan/luồn cáp. Cuối cùng, trả lời điện thoại khi tổng đài hoặc kỹ thuật gọi hẹn — nhiều đơn trễ vì missed call. Tôi thường nhắc khách bật chuông và ghi chú “VNPT kỹ thuật” để không bỏ lỡ.",
      ),
      h2("Sau khi lắp xong cần làm gì?"),
      p(
        "Kiểm tra biên bản nghiệm thu, ghi lại tên WiFi và mật khẩu, test speedtest gần modem và xa modem. Nếu nhà rộng mà sóng yếu từ đầu, báo ngay để tư vấn Mesh — đừng chờ vài tuần rồi mới phàn nàn.",
      ),
      p(
        "Tóm lại, lắp WiFi VNPT mất khoảng 1–3 ngày làm việc với hạ tầng sẵn. Muốn biết chính xác địa chỉ của bạn bao lâu, gửi tôi số nhà và đường — tôi kiểm tra hạ tầng và báo timeline cụ thể, không hứa mơ hồ.",
      ),
    ),
  },
  {
    meta: {
      slug: "lap-wifi-vnpt-can-giay-to-gi",
      title: "Lắp WiFi VNPT cần giấy tờ gì?",
      excerpt:
        "CMND, hộ khẩu, giấy tờ nhà thuê — chuẩn bị đúng để không bị trì hoãn lắp đặt.",
      category: "wifi",
      tags: ["giấy tờ", "đăng ký"],
      seoTitle: "Lắp WiFi VNPT cần giấy tờ gì?",
      seoDescription:
        "Danh sách giấy tờ cần chuẩn bị khi đăng ký lắp WiFi VNPT tại TP.HCM.",
      publishedAt: "2026-06-03",
      relatedPostSlugs: ["bang-gia-lap-wifi-vnpt-2026"],
    },
    faqs: [
      {
        question: "Nhà thuê có cần hộ khẩu không?",
        answer:
          "Thường chỉ cần CMND/CCCD và thông tin liên hệ. Một số trường hợp nhà trọ hoặc căn hộ dịch vụ có thể cần xác nhận của chủ nhà — tôi sẽ báo cụ thể theo địa chỉ.",
      },
      {
        question: "Đăng ký hộ người khác được không?",
        answer:
          "Người đăng ký phải là chủ hợp đồng sử dụng dịch vụ. Nếu con đăng ký hộ bố mẹ, cần giấy tờ của người đứng tên và thống nhất người nhận hóa đơn.",
      },
    ],
    body: build(
      "Trước mỗi lần lắp WiFi VNPT, tôi luôn nhắn khách chuẩn bị giấy tờ trước. Nhiều đơn bị trì hoãn không phải vì thiếu hạ tầng mà vì hồ sơ chưa đủ hoặc thông tin không khớp. Bài viết này tôi liệt kê giấy tờ cần thiết cho từng trường hợp: nhà riêng, nhà thuê, căn hộ, cửa hàng — để bạn đăng ký một lần là xong.",
      h2("Giấy tờ cơ bản cho hộ gia đình"),
      p(
        "Đa số trường hợp lắp WiFi VNPT tại nhà cần: CMND hoặc CCCD (bản gốc hoặc ảnh chụp rõ hai mặt), số điện thoại liên hệ chính, và địa chỉ lắp đặt chi tiết (số nhà, tên đường, phường, quận).",
      ),
      p(
        "Tôi khuyên chụp ảnh giấy tờ gửi qua Zalo trước — tôi kiểm tra xem có đủ, có mờ, có hết hạn không. Việc này tiết kiệm 1–2 ngày so với gửi hồ sơ rồi mới bị yêu cầu bổ sung.",
      ),
      h2("Nhà thuê, nhà trọ, căn hộ dịch vụ"),
      p(
        "Nếu bạn thuê nhà, thường không bắt buộc sổ hộ khẩu nhưng có thể cần thông tin chủ nhà hoặc xác nhận cho phép lắp đặt (khoan tường, luồn cáp). Tôi hay gặp tranh chấp khi người thuê lắp mà không báo chủ — kỹ thuật đến không được vào hoặc không được khoan.",
      ),
      p(
        "Với nhà trọ nhiều phòng, nên nói rõ mục đích: WiFi cho một phòng hay cho cả dãy trọ. Mỗi trường hợp chọn gói và cách kéo cáp khác nhau. Chủ trọ đôi khi đăng ký một đường truyền rồi chia WiFi — tôi tư vấn riêng nếu bạn là chủ trọ.",
      ),
      h3("Căn hộ chung cư"),
      p(
        "Chung cư đôi khi có quy định về vị trí đặt modem, hộp thoại trong nhà. Nếu cần kéo cáp từ hộp tầng hầm, ban quản lý có thể yêu cầu giấy xác nhận. Chuẩn bị trước giúp kỹ thuật lắp nhanh, không phải hẹn lại.",
      ),
      h2("Đăng ký cho cửa hàng, văn phòng nhỏ"),
      p(
        "Cửa hàng kinh doanh thường dùng CMND/CCCD người đại diện (chủ hộ kinh doanh hoặc người được ủy quyền). Một số gói doanh nghiệp yêu cầu thêm giấy phép kinh doanh — tôi sẽ chỉ rõ nếu địa chỉ của bạn cần hồ sơ mở rộng.",
      ),
      p(
        "Tên trên hợp đồng và tên trên giấy tờ phải khớp. Nếu cửa hàng thuê mặt bằng, nên có thông tin chủ mặt bằng để xử lý khi cần thi công.",
      ),
      h2("Lỗi giấy tờ hay gặp và cách tránh"),
      ul([
        "Ảnh CMND mờ, thiếu góc, che thông tin.",
        "Địa chỉ trên giấy tờ khác địa chỉ lắp (không sao nếu khai báo đúng nơi lắp).",
        "Số điện thoại sai hoặc không nghe máy khi tổng đài gọi xác minh.",
        "Người đăng ký không có mặt khi kỹ thuật đến và không ủy quyền rõ ràng.",
      ]),
      p(
        "Tôi thường gửi checklist qua Zalo trước khi khách ký. Một checklist 5 dòng có thể rút ngắn thời gian lắp từ 5 ngày xuống 2 ngày — kinh nghiệm thực tế tại Quận 12.",
      ),
      h2("Tóm lại"),
      p(
        "Lắp WiFi VNPT cần giấy tờ gì? Tối thiểu là CMND/CCCD và thông tin liên hệ chính xác. Nhà thuê, chung cư, cửa hàng có thể cần thêm — cứ gửi tôi loại nhà và địa chỉ, tôi báo danh sách cụ thể trước khi bạn đi đâu xa.",
      ),
    ),
  },
  {
    meta: {
      slug: "wifi-vnpt-300mbps-co-du-dung-khong",
      title: "WiFi VNPT 300 Mbps có đủ dùng không?",
      excerpt:
        "Phân tích 300 Mbps cho 2–6 thiết bị: học online, xem phim, camera.",
      category: "wifi",
      tags: ["300 Mbps", "tốc độ"],
      seoTitle: "WiFi VNPT 300 Mbps có đủ dùng không?",
      seoDescription:
        "Gói 300 Mbps VNPT có đủ cho gia đình không? Phân tích theo số thiết bị.",
      publishedAt: "2026-06-04",
      relatedPostSlugs: ["wifi-mesh-la-gi"],
    },
    faqs: [
      {
        question: "300 Mbps tải được bao nhiêu thiết bị cùng lúc?",
        answer:
          "Thực tế 5–10 thiết bị dùng bình thường vẫn ổn nếu WiFi phủ sóng tốt. Nghẽn thường do sóng yếu hoặc modem cũ, không phải thiếu băng thông.",
      },
      {
        question: "Có nên nâng lên 500 Mbps ngay từ đầu?",
        answer:
          "Nếu nhà 1–2 tầng, 3–4 người, 300 Mbps thường đủ. Nâng gói hợp lý khi có nhiều camera, TV 4K hoặc làm việc từ xa nặng.",
      },
    ],
    body: build(
      "Gói WiFi VNPT 300 Mbps là lựa chọn phổ biến nhất tôi tư vấn cho hộ gia đình 2–4 người. Khách thường hỏi: 300 Mbps có đủ dùng không hay phải lên 500 Mbps, 1 Gbps? Câu trả lời phụ thuộc số thiết bị, cách dùng và chất lượng WiFi trong nhà — không chỉ con số trên bảng giá.",
      h2("300 Mbps nghĩa là gì trong thực tế?"),
      p(
        "300 Mbps là tốc độ tải xuống tối đa trên đường truyền cáp quang. Speedtest gần modem thường đạt 250–300 Mbps. Xa modem, qua WiFi, tốc độ có thể còn 80–150 Mbps — vẫn đủ xem phim HD, học online, video call.",
      ),
      p(
        "Tôi hay nhắc khách: Mbps trên hợp đồng là băng thông vào nhà, không phải tốc độ WiFi ở mọi phòng. Nhà rộng mà chỉ một modem, phòng xa vẫn chậm dù gói 1 Gbps.",
      ),
      h2("300 Mbps đủ cho ai?"),
      ul([
        "1–3 người: lướt web, mạng xã hội, Zalo, email.",
        "Học online 1–2 người cùng lúc (Zoom, Google Meet).",
        "Xem YouTube, Netflix HD trên 1–2 TV.",
        "2–3 camera giám sát xem live qua app.",
        "Làm việc văn phòng: tài liệu, họp video nhẹ.",
      ]),
      h2("Khi nào 300 Mbps không đủ?"),
      p(
        "Bạn nên cân nhắc gói cao hơn nếu: nhiều người xem 4K cùng lúc, livestream bán hàng thường xuyên, tải file lớn (video, thiết kế) liên tục, hoặc văn phòng nhỏ 5–8 máy làm việc nặng.",
      ),
      p(
        "Tôi cũng gặp trường hợp nhà 6 người dùng 300 Mbps vẫn ổn vì không trùng giờ cao điểm — sáng ba mẹ làm việc, tối con xem phim. Ngược lại, nhà 3 người nhưng cả nhà cùng họp online 11h sáng thì cần 500 Mbps hoặc ưu tiên QoS trên modem.",
      ),
      h3("Camera và IoT"),
      p(
        "Mỗi camera HD upload khoảng 1–4 Mbps. 4 camera + 5 điện thoại + 1 TV vẫn nằm trong 300 Mbps nếu mạng ổn định. Vấn đề hay gặp là camera đặt xa modem, WiFi yếu khiến camera offline — giải pháp là Mesh hoặc camera có dây, không phải nâng gói Internet.",
      ),
      h2("So sánh 300 vs 500 vs 1 Gbps"),
      p(
        "300 Mbps: giá tốt, đủ đa số gia đình. 500 Mbps: dư địa cho nhà đông người, nhiều thiết bị. 1 Gbps: hợp livestream, gamer, văn phòng — chi phí cao hơn, cần modem/router tốt mới tận dụng hết.",
      ),
      p(
        "Tôi không khuyên chọn 1 Gbps “cho chắc” nếu nhu cầu thấp — tiết kiệm 100–200k/tháng × 12 tháng là con số đáng kể. Ngược lại, đừng tiếc nếu thực sự cần băng thông.",
      ),
      h2("Kết luận từ kinh nghiệm tư vấn"),
      p(
        "WiFi VNPT 300 Mbps có đủ dùng không? Với đa số hộ 2–4 người, câu trả lời là có — miễn là WiFi phủ sóng tốt và modem không quá cũ. Gửi tôi số người, số thiết bị và diện tích nhà, tôi gợi ý gói phù hợp, không ép nâng cấp.",
      ),
    ),
  },
  {
    meta: {
      slug: "wifi-yeu-phai-lam-gi",
      title: "WiFi yếu phải làm gì? 7 bước xử lý nhanh tại nhà",
      excerpt:
        "Khắc phục WiFi yếu: vị trí modem, nhiễu sóng, số thiết bị và khi nào cần Mesh.",
      category: "troubleshooting",
      tags: ["WiFi yếu", "khắc phục"],
      seoTitle: "WiFi yếu phải làm gì? | 7 bước xử lý nhanh",
      seoDescription:
        "Hướng dẫn xử lý WiFi yếu tại nhà trước khi gọi kỹ thuật.",
      publishedAt: "2026-06-05",
      relatedPostSlugs: ["modem-wifi-nen-dat-o-dau", "wifi-mesh-la-gi"],
    },
    faqs: [
      {
        question: "Restart modem bao lâu một lần là hợp lý?",
        answer:
          "Khi WiFi yếu đột ngột, restart một lần là đủ. Không cần restart hàng ngày. Nếu phải restart liên tục, có thể modem lỗi hoặc quá nhiệt — liên hệ hỗ trợ.",
      },
      {
        question: "WiFi yếu có phải do gói cước thấp không?",
        answer:
          "Không phải lúc nào cũng vậy. Nhiều nhà dùng gói 500 Mbps vẫn sóng yếu ở xa modem. Kiểm tra vị trí modem và nhiễu trước khi nâng gói.",
      },
    ],
    body: build(
      "WiFi yếu là lý do khách nhắn tôi nhiều thứ hai sau hỏi giá. Trước khi gọi kỹ thuật hay mua thêm thiết bị, bạn có thể thử 7 bước dưới đây tại nhà — tôi hướng dẫn hàng trăm hộ tại Quận 12 và phần lớn cải thiện được mà không tốn thêm tiền.",
      h2("7 bước xử lý WiFi yếu tại nhà"),
      ol([
        "<strong>Đặt modem cao, thoáng:</strong> Tránh tủ kín, góc nhà, sát tường ngoài. Cao 1–1,5m, giữa ngôi nhà nếu có thể.",
        "<strong>Restart modem:</strong> Rút nguồn 30 giây, cắm lại. Chờ 2–3 phút đèn ổn định rồi test lại.",
        "<strong>Giảm thiết bị dùng cùng lúc:</strong> Tạm ngắt tải nền, cập nhật app, stream không cần thiết.",
        "<strong>Đổi kênh WiFi:</strong> Vào cấu hình modem, chọn kênh 1/6/11 (2.4GHz) hoặc kênh ít nhiễu trên 5GHz.",
        "<strong>Kiểm tra dây LAN:</strong> Dây lỏng, hỏng làm mất tốc độ dù WiFi vẫn “có sóng”.",
        "<strong>Test speed gần và xa modem:</strong> Gần mà chậm → đường truyền hoặc modem. Xa mà chậm → sóng WiFi.",
        "<strong>Cân nhắc Mesh:</strong> Nhà rộng, nhiều tầng, đã thử hết bước trên mà vẫn yếu.",
      ]),
      h2("Nguyên nhân WiFi yếu thường gặp"),
      p(
        "Tường bê tông dày, gương, tủ lạnh, lò vi sóng gây nhiễu hoặc che sóng. Nhà nhiều tầng mà modem chỉ ở tầng trệt thì tầng trên luôn yếu. Modem đời cũ chỉ WiFi 4 cũng giới hạn tốc độ dù gói Internet cao.",
      ),
      p(
        "Tôi từng khảo sát nhà 3 tầng Quận 12: speedtest tầng 1 đạt 280 Mbps, tầng 3 còn 15 Mbps — không phải lỗi VNPT mà do phủ sóng. Giải pháp Mesh 2 node, không nâng gói.",
      ),
      h3("Nhiễu từ hàng xóm"),
      p(
        "Chung cư, dãy nhà sát nhau: hàng chục mạng WiFi cùng kênh. Dùng app phân tích WiFi (Wifi Analyzer) xem kênh nào đông, chuyển modem sang kênh vắng.",
      ),
      h2("Khi nào cần gọi kỹ thuật?"),
      p(
        "Gọi hỗ trợ nếu: test dây LAN trực tiếp vào modem vẫn thấp hơn 70% cam kết, đèn modem báo lỗi liên tục, mạng rớt theo giờ cố định nhiều ngày. Ghi lại thời gian, ảnh đèn modem giúp kỹ thuật xử lý nhanh.",
      ),
      p(
        "WiFi yếu phải làm gì? Thử 7 bước trên trước. Nếu vẫn không ổn, nhắn tôi mô tả diện tích nhà và vị trí modem — tôi gợi ý Mesh hoặc kiểm tra đường truyền miễn phí tại Quận 12.",
      ),
    ),
  },
  {
    meta: {
      slug: "modem-wifi-nen-dat-o-dau",
      title: "Modem WiFi nên đặt ở đâu để sóng mạnh?",
      excerpt:
        "Vị trí đặt modem ảnh hưởng lớn đến sóng WiFi — góc nhà, tầng, tránh tủ kim loại.",
      category: "wifi",
      tags: ["modem", "vị trí"],
      seoTitle: "Modem WiFi nên đặt ở đâu?",
      seoDescription:
        "Mẹo đặt modem WiFi đúng vị trí để sóng mạnh hơn trong nhà.",
      publishedAt: "2026-06-06",
      relatedPostSlugs: ["wifi-yeu-phai-lam-gi"],
    },
    faqs: [
      {
        question: "Đặt modem trong tủ có được không?",
        answer:
          "Không nên. Tủ gỗ/kim loại che sóng và gây nhiệt. Nếu bắt buộc, để cửa tủ mở và modem cách xa tường tủ ít nhất 10cm.",
      },
      {
        question: "Modem đặt tầng 1, tầng 3 dùng được không?",
        answer:
          "Có thể yếu. Nhà 3 tầng nên đặt modem tầng 2 hoặc dùng Mesh. Tôi hay khảo sát vị trí node trước khi lắp.",
      },
    ],
    body: build(
      "Vị trí đặt modem WiFi quyết định 50% trải nghiệm mạng trong nhà — tôi nói vậy với mọi khách hàng. Gói 500 Mbps nhưng modem nằm góc tủ kín tầng trệt thì phòng trên vẫn “một vạch”. Bài viết này tôi chia sẻ nguyên tắc đặt modem đúng cho nhà phố, chung cư và nhà nhiều tầng.",
      h2("Nguyên tắc vàng khi đặt modem"),
      ul([
        "Đặt <strong>trung tâm</strong> ngôi nhà hoặc tầng dùng nhiều nhất.",
        "Cao 1–1,5m, vững chắc, không đặt sát sàn.",
        "Tránh góc khuất, tủ kín, behind TV lớn.",
        "Cách thiết bị phát nhiễu: lò vi sóng, Bluetooth hub quá gần.",
        "Antenna modem (nếu có) để thẳng hoặc hơi nghiêng, không che.",
      ]),
      h2("Nhà phố 1–2 tầng"),
      p(
        "Nhà phố dài: modem đặt giữa nhà, gần cầu thang thường phủ tốt cả trệt và lầu. Tránh đặt sát cửa ra ngoài — sóng “trốn” ra đường, trong nhà yếu.",
      ),
      p(
        "Tôi hay đề xuất kéo cáp LAN từ hộp thoại tới phòng khách trung tâm thay vì để modem sát cửa chính chỉ vì tiện khoan.",
      ),
      h3("Nhà ống hẹp"),
      p(
        "Nhà ống 3–4m mặt tiền: đặt modem tầng giữa chiều dài (thường phòng sinh hoạt). Phòng trước và phòng sau đều nhận sóng tương đối đều.",
      ),
      h2("Nhà nhiều tầng"),
      p(
        "Modem một tầng khó phủ đều 3 tầng. Giải pháp: đặt tầng 2 (tầng sinh hoạt chính) hoặc dùng WiFi Mesh — node chính gần modem, node phụ tầng trên/dưới.",
      ),
      p(
        "Đừng hy vọng “modem mạnh” thay Mesh trên nhà 100m² × 3 tầng. Tôi đã test nhiều modem WiFi 6, tầng 3 vẫn yếu nếu không có node bổ sung.",
      ),
      h2("Chung cư và căn hộ"),
      p(
        "Hộp thoại thường ở lối vào hoặc ban công. Nếu hộp ở góc căn, sóng có thể yếu phòng trong cùng. Cân nhắc Mesh node nhỏ hoặc access point nếu được phép lắp.",
      ),
      p(
        "Ban quản lý một số chung cư hạn chế khoan — trao đổi trước với BQL và tôi sẽ đề xuất giải pháp ít thi công nhất.",
      ),
      h2("Những vị trí nên tránh"),
      ul([
        "Trong tủ kín, tủ giày, gầm cầu thang kín.",
        "Sát tường bê tông dày hoặc thang máy (chung cư).",
        "Cạnh bể cá, máy lọc nước (ẩm không tốt cho thiết bị).",
        "Trên nóc tủ lạnh (rung, nhiệt).",
      ]),
      h2("Kết luận"),
      p(
        "Modem WiFi nên đặt ở đâu? Trung tâm, cao, thoáng — và nhà nhiều tầng thì thêm Mesh. Gửi tôi sơ đồ nhà hoặc ảnh mặt bằng, tôi gợi ý vị trí cụ thể trước khi kỹ thuật đến lắp.",
      ),
    ),
  },
  {
    meta: {
      slug: "wifi-mesh-la-gi",
      title: "WiFi Mesh là gì? Có cần cho nhà bạn không?",
      excerpt:
        "Giải thích WiFi Mesh đơn giản và so sánh với router phụ truyền thống.",
      category: "wifi",
      tags: ["Mesh", "WiFi"],
      seoTitle: "WiFi Mesh là gì? | Giải thích dễ hiểu",
      seoDescription:
        "WiFi Mesh là gì, khác router phụ thế nào và ai nên dùng?",
      publishedAt: "2026-06-07",
      relatedPostSlugs: ["nen-chon-wifi-mesh-hay-router-phu"],
    },
    faqs: [
      {
        question: "WiFi Mesh khác WiFi extender thế nào?",
        answer:
          "Extender thường tạo mạng phụ, tốc độ giảm nửa. Mesh các node cùng hệ thống, chuyển sóng mượt, tốc độ ổn định hơn.",
      },
      {
        question: "Nhà bao nhiêu m² cần Mesh?",
        answer:
          "Không chỉ m² — nhà trên 80m² một tầng hoặc 2–3 tầng với tường dày thường hưởng lợi. Tôi khảo sát miễn phí trước khi khuyên mua.",
      },
    ],
    body: build(
      "Khách hỏi tôi “WiFi Mesh là gì?” ít nhất vài lần mỗi tuần — thường sau khi WiFi phòng sau yếu dù đã nâng gói Internet. Tôi giải thích Mesh không phải “modem mạnh hơn” mà là hệ thống nhiều điểm phát sóng làm việc cùng nhau, giúp sóng đều khắp nhà.",
      h2("WiFi Mesh hoạt động thế nào?"),
      p(
        "Hệ Mesh gồm một node chính (nối modem) và các node phụ đặt ở vị trí xa. Các node nói chuyện với nhau, tạo một mạng WiFi duy nhất (một tên, một mật khẩu). Khi bạn đi từ phòng này sang phòng kia, điện thoại tự chuyển sang node gần nhất — gọi là roaming.",
      ),
      p(
        "Khác với router phụ: router phụ thường tạo tên WiFi riêng (_EXT), bạn phải tự đổi mạng khi di chuyển. Mesh mượt hơn, đặc biệt với camera, smart TV cần kết nối ổn định.",
      ),
      h2("Ai nên dùng WiFi Mesh?"),
      ul([
        "Nhà 2–3 tầng, diện tích lớn.",
        "Nhiều phòng ngăn, tường dày.",
        "Gia đình nhiều thiết bị di động (đi khắp nhà).",
        "Cần camera ở sân, gara, phòng xa modem.",
        "Làm việc từ xa ở nhiều phòng khác nhau.",
      ]),
      h2("Ai có thể chưa cần Mesh?"),
      p(
        "Căn hộ 1–2 phòng, nhà 1 tầng dưới 60m², modem đặt giữa — thử đổi vị trí modem trước. Nhiều khách tiết kiệm được tiền Mesh chỉ bằng cách đặt modem cao hơn 50cm.",
      ),
      h3("Mesh VNPT"),
      p(
        "VNPT có gói thuê hoặc mua Mesh đi kèm Internet. Lợi ích: kỹ thuật cấu hình sẵn, đồng bộ với modem nhà mạng. Tôi thường đề xuất 2 node cho nhà 2 tầng ~80–120m², 3 node cho nhà 3 tầng hoặc mặt bằng phức tạp.",
      ),
      h2("Chi phí và đầu tư"),
      p(
        "Mesh đắt hơn router phụ rẻ trên chợ, nhưng trải nghiệm và độ ổn định tốt hơn rõ rệt. Tính cả thời gian “nhà tôi WiFi chán quá” — đa số khách dùng Mesh không muốn quay lại.",
      ),
      p(
        "WiFi Mesh là gì và có cần không? Nếu nhà bạn nhiều tầng hoặc sóng chênh lệch lớn giữa các phòng, câu trả lời thường là có. Nhắn tôi diện tích và số tầng, tôi tư vấn số node phù hợp.",
      ),
    ),
  },
  {
    meta: {
      slug: "nen-chon-wifi-mesh-hay-router-phu",
      title: "Nên chọn WiFi Mesh hay router phụ?",
      excerpt:
        "So sánh chi phí, độ ổn định và trải nghiệm giữa Mesh và router phụ.",
      category: "wifi",
      tags: ["Mesh", "router phụ"],
      seoTitle: "WiFi Mesh hay router phụ — nên chọn gì?",
      seoDescription:
        "So sánh WiFi Mesh và router phụ để chọn giải pháp phù hợp.",
      publishedAt: "2026-06-08",
      relatedPostSlugs: ["wifi-mesh-la-gi"],
    },
    faqs: [
      {
        question: "Router phụ rẻ trên Shopee có dùng được không?",
        answer:
          "Dùng được nếu chấp nhận hai tên WiFi và cấu hình thủ công. Chất lượng tùy hãng — tôi khuyên mua loại có hỗ trợ AP mode rõ ràng.",
      },
      {
        question: "Mesh VNPT có bắt buộc khi lắp Internet không?",
        answer:
          "Không bắt buộc. Chỉ cần khi nhà rộng, nhiều tầng. Tôi khảo sát trước, không ép mua.",
      },
    ],
    body: build(
      "Câu hỏi “nên chọn WiFi Mesh hay router phụ?” tôi nghe rất nhiều khi khách muốn mở rộng sóng mà không muốn trả quá nhiều. Cả hai đều giúp WiFi xa hơn, nhưng cách hoạt động và trải nghiệm khác nhau rõ. Tôi so sánh chi tiết để bạn quyết định theo nhà và ngân sách.",
      h2("Router phụ — ưu và nhược"),
      p(
        "Router phụ (hoặc repeater) nhận sóng từ modem rồi phát lại. Ưu điểm: giá rẻ, mua nhanh, tự lắp. Nhược: thường tạo mạng WiFi thứ hai, tốc độ giảm qua mỗi bước nhảy, cấu hình dễ sai (double NAT), roaming kém.",
      ),
      p(
        "Phù hợp: nhà nhỏ, cần sóng thêm một phòng, ngân sách thấp, chấp nhận đổi WiFi thủ công.",
      ),
      h2("WiFi Mesh — ưu và nhược"),
      p(
        "Mesh: nhiều node đồng bộ, một tên WiFi, chuyển sóng tự động, tốc độ ổn định hơn trên diện rộng. Nhược: giá cao hơn, cần đặt node đúng khoảng cách (quá xa node phụ yếu).",
      ),
      p(
        "Phù hợp: nhà 2–3 tầng, nhiều người dùng di động, camera nhiều vị trí, làm việc từ xa.",
      ),
      h2("Bảng so sánh nhanh"),
      ul([
        "<strong>Chi phí:</strong> Router phụ thắng.",
        "<strong>Trải nghiệm di chuyển:</strong> Mesh thắng.",
        "<strong>Độ ổn định camera:</strong> Mesh thắng.",
        "<strong>Dễ lắp cho người không rành:</strong> Mesh VNPT (kỹ thuật cấu hình) thắng.",
        "<strong>Lin hoạt tự mua ngoài:</strong> Router phụ thắng.",
      ]),
      h2("Gợi ý thực tế từ tôi"),
      p(
        "Nhà 1 tầng dưới 70m²: thử đổi vị trí modem trước, chưa cần mua gì thêm. Nhà 2 tầng trở lên: cân nhắc Mesh VNPT thay vì router phụ 200k rồi vẫn phàn nàn.",
      ),
      p(
        "Nếu đã có router phụ và chấp nhận được, cứ dùng — không bắt buộc đổi Mesh. Chỉ khi camera hay họp online hay rớt khi đi phòng, lúc đó Mesh đáng đầu tư.",
      ),
      p(
        "Nên chọn WiFi Mesh hay router phụ? Tóm gọn: tiết kiệm tạm thời → router phụ; dùng lâu dài, nhà rộng → Mesh. Gửi tôi layout nhà, tôi nói thẳng nên chọn gì.",
      ),
    ),
  },
  {
    meta: {
      slug: "sim-5g-vnpt-co-can-doi-sim",
      title: "SIM 5G VNPT có cần đổi SIM không?",
      excerpt:
        "Khi nào SIM 4G cũ cần đổi USIM mới để dùng 5G VNPT.",
      category: "sim-5g",
      tags: ["5G", "đổi SIM"],
      seoTitle: "SIM 5G VNPT có cần đổi SIM không?",
      seoDescription:
        "Có cần đổi SIM để dùng 5G VNPT không? Hướng dẫn kiểm tra.",
      publishedAt: "2026-06-09",
      relatedPostSlugs: [
        "esim-vnpt-la-gi",
        "kich-hoat-sim-khi-doi-dien-thoai-vinaphone",
        "cach-xac-nhan-sim-chinh-chu-vinaphone",
      ],
    },
    faqs: [
      {
        question: "Đổi SIM 5G có mất số không?",
        answer:
          "Không. Giữ nguyên số, chỉ thay thẻ SIM vật lý hoặc chuyển sang eSIM. Dữ liệu trên SIM cũ không ảnh hưởng danh bạ trên máy.",
      },
      {
        question: "SIM 4G cũ vẫn dùng được không nếu không đổi?",
        answer:
          "Vẫn dùng 4G bình thường. Chỉ không bắt sóng 5G. Nếu khu vực bạn chỉ có 5G mới tốc độ cao, nên đổi.",
      },
    ],
    body: build(
      "5G VNPT đã phủ nhiều khu tại TP.HCM, khách hỏi tôi liên tục: SIM 5G VNPT có cần đổi SIM không? Câu trả lời ngắn là — tùy loại SIM bạn đang dùng và điện thoại có hỗ trợ 5G không. Tôi giải thích chi tiết để bạn không đổi thừa hoặc bỏ lỡ tốc độ.",
      h2("Khi nào cần đổi SIM?"),
      p(
        "SIM 4G đời cũ (SIM thường, không phải USIM 4G+) có thể không hỗ trợ 5G. SIM mới hơn (USIM) thường đã sẵn sàng 5G sau khi kích hoạt gói và cài APN đúng. Cách chắc chắn: mang SIM/quầy VNPT hoặc gửi ảnh SIM cho tôi kiểm tra.",
      ),
      p(
        "Điện thoại cũng phải hỗ trợ băng tần 5G VNPT. Máy không hỗ trợ 5G thì đổi SIM vẫn chỉ dùng 4G — không lỗi, chỉ không tận dụng được 5G.",
      ),
      h2("Cách kiểm tra trước khi đổi"),
      ol([
        "Xem model điện thoại có 5G trên spec nhà sản xuất.",
        "Vào Cài đặt → Di động → xem có tuỳ chọn 5G/LTE không.",
        "Gửi ảnh mặt sau SIM (có serial) qua Zalo cho tư vấn viên.",
        "Thử SIM bạn bè 5G trên máy mình (nếu được) để test.",
      ]),
      p(
        "Tôi thường hỗ trợ khách Quận 12 đổi SIM tại nhà hoặc hướng dẫn quầy gần nhất — miễn phí đổi trong nhiều chương trình khuyến mãi.",
      ),
      h2("Quy trình đổi SIM thực tế"),
      p(
        "Mang CMND/CCCD, SIM cũ, điện thoại. Nhân viên đổi SIM mới, giữ nguyên số. Khởi động lại máy, kiểm tra 4G/5G. Nếu data không lên, cấu hình APN (xem bài APN 5G VNPT).",
      ),
      p(
        "Thời gian: 10–15 phút tại quầy. eSIM thì không cần SIM vật lý — quét QR là xong.",
      ),
      h2("SIM 5G và eSIM"),
      p(
        "Nếu điện thoại hỗ trợ eSIM, bạn có thể chuyển sang eSIM VNPT thay vì SIM vật lý — tiện hơn, không lo hỏng khe SIM. Tôi tư vấn eSIM cho khách dùng iPhone 12 trở lên khá nhiều.",
      ),
      p(
        "SIM 5G VNPT có cần đổi SIM không? Nếu SIM cũ và máy đều hỗ trợ thì không; nếu một trong hai chưa đạt thì cần đổi SIM hoặc đổi máy. Gửi tôi model máy + ảnh SIM, tôi trả lời cụ thể trong vài phút.",
      ),
    ),
  },
  {
    meta: {
      slug: "esim-vnpt-la-gi",
      title: "eSIM VNPT là gì? Ưu nhược điểm so với SIM vật lý",
      excerpt:
        "eSIM kích hoạt qua QR, không cần giao SIM — phù hợp điện thoại hỗ trợ eSIM.",
      category: "sim-5g",
      tags: ["eSIM", "VNPT"],
      seoTitle: "eSIM VNPT là gì?",
      seoDescription:
        "Giải thích eSIM VNPT, cách dùng và so với SIM vật lý.",
      publishedAt: "2026-06-10",
      relatedPostSlugs: ["cach-kich-hoat-esim-vnpt"],
    },
    faqs: [
      {
        question: "Điện thoại nào dùng được eSIM VNPT?",
        answer:
          "iPhone XS trở lên, nhiều dòng Samsung/Pixel/Android cao cấp. Kiểm tra trong Cài đặt có mục Thêm eSIM/Dual SIM không.",
      },
      {
        question: "eSIM có dùng song song SIM vật lý không?",
        answer:
          "Có, nếu máy hỗ trợ dual SIM (1 nano + 1 eSIM hoặc 2 eSIM tùy model). Rất tiện cho người cần số cá nhân và số công việc.",
      },
    ],
    body: build(
      "eSIM VNPT ngày càng nhiều khách hỏi tôi — đặc biệt người dùng iPhone muốn đổi số nhanh không cần chờ giao SIM. eSIM là SIM điện tử nhúng trong máy, kích hoạt bằng mã QR. Bài viết giải thích eSIM là gì, ai nên dùng và so với SIM vật lý thế nào.",
      h2("eSIM là gì?"),
      p(
        "eSIM (embedded SIM) là chip SIM tích hợp sẵn trên mainboard điện thoại. Thay vì gắn thẻ nhựa, bạn tải “profile” nhà mạng qua QR code hoặc app. Một máy có thể lưu nhiều profile eSIM (tùy hãng), chuyển đổi trong cài đặt.",
      ),
      p(
        "VNPT cung cấp eSIM cho gói di động và 5G tương tự SIM vật lý — cùng số, cùng gói cước, chỉ khác hình thức kích hoạt.",
      ),
      h2("Ưu điểm eSIM VNPT"),
      ul([
        "Kích hoạt nhanh, không cần đi quầy (nếu được gửi QR online).",
        "Không lo hỏng khe SIM, trầy chip.",
        "Tiện dual SIM: nano SIM + eSIM trên một máy.",
        "Đổi số/gói đôi khi nhanh hơn qua QR mới.",
        "Phù hợp người hay đi công tác, cần thêm data tạm.",
      ]),
      h2("Nhược điểm cần biết"),
      p(
        "Không phải mọi điện thoại đều hỗ trợ eSIM — máy giá rẻ, máy cũ thường không có. Chuyển eSIM sang máy mới cần hủy profile cũ và cài lại (VNPT hỗ trợ). Một số khách lớn tuổi quen SIM vật lý, thao tác QR có thể cần con cháu hỗ trợ lần đầu.",
      ),
      h3("So với SIM vật lý"),
      p(
        "SIM vật lý: dễ cắm sang máy khác, mọi điện thoại đều dùng được. eSIM: tiện, hiện đại, gắn với một máy tại một thời điểm. Tôi khuyên eSIM nếu máy hỗ trợ và bạn dùng smartphone thường xuyên.",
      ),
      h2("Ai nên chọn eSIM?"),
      p(
        "Người dùng iPhone/Samsung flagship, cần 2 số trên 1 máy, muốn kích hoạt 5G nhanh, hoặc ngại ra quầy. Ai dùng điện thoại phím, máy cũ — vẫn nên dùng SIM vật lý.",
      ),
      p(
        "eSIM VNPT là gì? Là SIM không nhựa, kích hoạt qua QR. Muốn đăng ký eSIM, nhắn tôi model máy — tôi xác nhận hỗ trợ trước khi làm hồ sơ.",
      ),
    ),
  },
  {
    meta: {
      slug: "cach-kich-hoat-esim-vnpt",
      title: "Cách kích hoạt eSIM VNPT trên iPhone và Android",
      excerpt:
        "Hướng dẫn từng bước quét QR và cấu hình eSIM VNPT.",
      category: "sim-5g",
      tags: ["eSIM", "kích hoạt"],
      seoTitle: "Cách kích hoạt eSIM VNPT",
      seoDescription:
        "Hướng dẫn kích hoạt eSIM VNPT trên điện thoại từng bước.",
      publishedAt: "2026-06-11",
      relatedPostSlugs: ["esim-vnpt-la-gi"],
    },
    faqs: [
      {
        question: "Kích hoạt eSIM có cần WiFi không?",
        answer:
          "Lần đầu thường cần WiFi hoặc data để tải profile. Sau khi eSIM active, dùng 4G/5G bình thường.",
      },
      {
        question: "QR eSIM hết hạn phải làm sao?",
        answer:
          "Liên hệ tư vấn viên hoặc quầy VNPT để cấp QR mới. Không tự tạo QR — profile phải từ nhà mạng.",
      },
    ],
    body: build(
      "Sau khi đăng ký eSIM VNPT, khách thường nhận mã QR qua email hoặc Zalo. Bước tiếp theo là kích hoạt trên điện thoại — tôi hướng dẫn từng bước cho iPhone và Android vì mỗi hãng menu hơi khác. Lưu ý: cần WiFi ổn định lần đầu và máy phải hỗ trợ eSIM.",
      h2("Chuẩn bị trước khi kích hoạt"),
      ul([
        "Máy đã kết nối WiFi (hoặc SIM data còn hoạt động).",
        "Pin trên 50%, không tắt máy giữa chừng.",
        "QR code eSIM còn hạn (thường 24–72 giờ).",
        "CMND/CCCD khớp hồ sơ đăng ký.",
        "Cập nhật iOS/Android bản mới nhất nếu có thể.",
      ]),
      h2("Kích hoạt eSIM trên iPhone"),
      ol([
        "Mở <strong>Cài đặt → Di động → Thêm eSIM</strong> (Add eSIM).",
        "Chọn <strong>Quét mã QR</strong>, căn QR vào khung hình.",
        "Đặt tên gói (vd: VNPT Cá nhân), chọn đường dẫn mặc định cho data nếu có 2 SIM.",
        "Chờ máy tải profile — 1–5 phút.",
        "Khởi động lại nếu được yêu cầu, kiểm tra sóng và data.",
      ]),
      p(
        "iPhone dual SIM: bạn chọn số gọi mặc định, số nhận iMessage, số dùng data di động. Tôi khuyên để eSIM VNPT làm data chính nếu gói data lớn.",
      ),
      h2("Kích hoạt eSIM trên Android"),
      p(
        "Android đa dạng menu — thường: Cài đặt → Mạng & Internet → SIM → Thêm eSIM / Quét QR. Samsung: Connections → SIM manager → Add eSIM. Pixel: Settings → Network → SIMs → Add SIM.",
      ),
      p(
        "Nếu không thấy mục eSIM, máy có thể không hỗ trợ hoặc cần cập nhật phần mềm. Gửi tôi ảnh màn hình Cài đặt, tôi chỉ đúng menu.",
      ),
      h2("Lỗi thường gặp và cách xử lý"),
      ul([
        "<strong>QR hết hạn:</strong> Xin QR mới từ VNPT.",
        "<strong>Không quét được:</strong> Thử nhập mã thủ công (SM-DP+ address) nếu có.",
        "<strong>Máy không hỗ trợ eSIM:</strong> Chuyển sang SIM vật lý.",
        "<strong>Data không lên:</strong> Cấu hình APN VNPT, bật roaming data nếu cần (hiếm).",
        "<strong>Chỉ có SOS:</strong> Chờ 10 phút, restart, kiểm tra vùng phủ sóng.",
      ]),
      h2("Sau khi kích hoạt thành công"),
      p(
        "Test gọi, nhắn tin, lướt web. Nếu dùng 5G, vào cài đặt mạng chọn 5G/LTE tự động. Lưu QR backup ở nơi an toàn (không share công khai — ai có QR có thể clone eSIM trên máy khác trong thời gian còn hạn).",
      ),
      p(
        "Cách kích hoạt eSIM VNPT không khó nếu làm đúng thứ tự. Gặp lỗi, chụp màn hình gửi tôi — tôi hỗ trợ remote nhiều khách Quận 12 kích hoạt xong trong 15 phút.",
      ),
    ),
  },
  {
    meta: {
      slug: "apn-5g-vnpt",
      title: "APN 5G VNPT — cấu hình khi data không lên",
      excerpt:
        "Cài APN đúng để kết nối 5G/4G VNPT ổn định trên Android và iPhone.",
      category: "troubleshooting",
      tags: ["APN", "5G"],
      seoTitle: "APN 5G VNPT — cấu hình đúng",
      seoDescription:
        "Hướng dẫn cấu hình APN 5G VNPT khi mạng data không ổn định.",
      publishedAt: "2026-06-12",
      relatedPostSlugs: [
        "sim-5g-vnpt-co-can-doi-sim",
        "kich-hoat-sim-khi-doi-dien-thoai-vinaphone",
      ],
    },
    faqs: [
      {
        question: "Cấu hình sai APN có mất tiền không?",
        answer:
          "Không mất tiền, chỉ data không hoạt động hoặc chậm. Sửa APN đúng và restart máy là được.",
      },
      {
        question: "iPhone có cần cài APN thủ công không?",
        answer:
          "iPhone thường tự nhận APN VNPT. Android hay cần cài thủ công hơn sau khi đổi SIM.",
      },
    ],
    body: build(
      "Data VNPT không lên sau đổi SIM 5G là tình huống tôi hỗ trợ hàng tuần. Nguyên nhân phổ biến nhất không phải hỏng SIM mà là APN (Access Point Name) sai hoặc trống. APN là “cổng” để điện thoại kết nối internet di động — cấu hình đúng, 4G/5G mới ổn định.",
      h2("APN VNPT chuẩn là gì?"),
      p(
        "Thông số APN VNPT phổ biến (có thể thay đổi theo thời điểm — xác nhận với tư vấn viên): Tên/APN: m3-world hoặc theo hướng dẫn mới nhất từ VNPT. Username/Password: thường để trống hoặc mms/mms tùy loại. Authentication: PAP hoặc None.",
      ),
      p(
        "Tôi luôn gửi bộ APN cập nhật kèm tin nhắn khi khách đổi SIM — đừng copy APN cũ trên diễn đàn vì có thể lỗi thời.",
      ),
      h2("Cấu hình APN trên Android"),
      ol([
        "Vào <strong>Cài đặt → Mạng di động → APN</strong> (hoặc SIM → Access Point Names).",
        "Chọn APN mặc định hoặc Thêm APN mới.",
        "Nhập các trường theo hướng dẫn VNPT.",
        "Lưu, chọn APN vừa tạo làm mặc định.",
        "Tắt/bật chế độ máy bay 10 giây hoặc restart máy.",
      ]),
      h2("Cấu hình trên iPhone"),
      p(
        "iPhone hầu hết tự cấu hình khi cắm SIM/eSIM VNPT. Nếu data vẫn không lên: Cài đặt → Di động → Mạng dữ liệu di động → kiểm tra APN (nếu hiện trường chỉnh sửa). Reset cài đặt mạng (Settings → General → Reset → Reset Network Settings) — lưu ý sẽ xóa WiFi đã lưu.",
      ),
      h2("Kiểm tra sau khi cài APN"),
      p(
        "Biểu tượng 4G/5G hiện trên thanh trạng thái. Mở trình duyệt không WiFi, load trang web. Speedtest trên data — tốc độ hợp lý theo gói và vùng phủ.",
      ),
      p(
        "Nếu vẫn lỗi sau APN đúng: kiểm tra gói cước còn data, SIM đã kích hoạt, vùng có sóng 5G (5G chưa phủ mọi nơi — máy tự fallback 4G).",
      ),
      h2("Khi nào cần liên hệ hỗ trợ?"),
      p(
        "Data không lên sau 24h dù APN đúng, sóng có nhưng không truy cập được, hoặc tin nhắn báo SIM chưa kích hoạt. Ghi lại model máy, ảnh cài đặt APN gửi tôi — xử lý nhanh hơn gọi tổng đài vòng vo.",
      ),
      p(
        "APN 5G VNPT là bước đầu tiên khi data chập chờn sau đổi SIM. Làm đúng checklist trên, phần lớn khách tôi hỗ trợ online là xong không cần ra quầy.",
      ),
    ),
  },
  {
    meta: {
      slug: "goi-5g-vnpt-nao-phu-hop",
      title: "Gói 5G VNPT nào phù hợp với bạn?",
      excerpt:
        "Chọn gói 5G theo mức dùng: lướt web, xem video, livestream hay hotspot.",
      category: "sim-5g",
      tags: ["gói 5G", "data"],
      seoTitle: "Gói 5G VNPT nào phù hợp?",
      seoDescription:
        "Cách chọn gói 5G VNPT theo nhu cầu sử dụng thực tế.",
      publishedAt: "2026-06-13",
      relatedPostSlugs: ["sim-5g-vnpt-co-can-doi-sim"],
    },
    faqs: [
      {
        question: "Gói data ngày hay tháng tiết kiệm hơn?",
        answer:
          "Dùng ít, không đều → gói ngày/tuần. Dùng hàng ngày → gói tháng thường rẻ hơn tính trung bình.",
      },
      {
        question: "Hotspot laptop có tốn nhiều data không?",
        answer:
          "Có — họp video, tải file qua hotspot tốn nhanh. Nên chọn gói data lớn hoặc combo có hotspot không giới hạn tốc độ (theo điều khoản gói).",
      },
    ],
    body: build(
      "Chọn gói 5G VNPT không khó nếu bạn biết mình dùng data vào việc gì. Tôi thấy nhiều khách đăng ký gói lớn “cho chắc” rồi dùng không hết, hoặc ngược lại — gói nhỏ nhưng livestream TikTok hàng ngày nên hết data giữa tháng. Bài viết phân loại nhu cầu và gợi ý hướng chọn gói.",
      h2("Phân loại nhu cầu data"),
      h3("Nhu cầu nhẹ"),
      p(
        "Zalo, Facebook lướt feed, Google Maps, nghe nhạc streaming chất lượng thường. Khoảng 5–15 GB/tháng. Gói data cơ bản hoặc combo thoại + data nhỏ thường đủ.",
      ),
      h3("Nhu cầu trung bình"),
      p(
        "Xem YouTube/TikTok thường xuyên, học online trên điện thoại, video call. 20–40 GB/tháng. Gói 5G tầm trung, ưu tiên có rollover hoặc khuyến mãi tặng GB nếu có.",
      ),
      h3("Nhu cầu nặng"),
      p(
        "Livestream bán hàng, hotspot laptop làm việc, xem phim 4G/5G trên tablet không WiFi. 60 GB trở lên hoặc gói không giới hạn (fair use). Cân nhắc combo Internet nhà + di động để tiết kiệm.",
      ),
      h2("Cách tự đo nhu cầu trước khi chọn"),
      p(
        "Theo dõi data 7–14 ngày trong Cài đặt → Di động → Sử dụng data. Nhân đôi (hoặc ×4 nếu tuần này dùng ít hơn bình thường) để ước tháng. Android/iPhone đều có biểu đồ theo app — xem app nào “ăn” nhiều nhất.",
      ),
      p(
        "Tôi hay hỏi khách: có hay hotspot không? có hay xem video ngoài WiFi không? — hai câu này quyết định 80% gói phù hợp.",
      ),
      h2("Gói 5G vs 4G — có cần 5G không?"),
      p(
        "5G nhanh hơn ở vùng có phủ sóng, phù hợp tải file lớn, livestream chất lượng cao. Nếu chỉ Zalo và map, 4G vẫn ổn và có thể rẻ hơn. Chọn 5G khi máy hỗ trợ và bạn ở khu TP.HCM đã có sóng 5G VNPT.",
      ),
      h2("Mẹo tiết kiệm khi chọn gói"),
      ul([
        "Combo Internet nhà + di động VNPT — giảm tổng chi phí.",
        "Tránh auto-renew gói lớn nếu tháng sau đi công tác ít dùng.",
        "Tắt tự động phát video Facebook/TikTok khi dùng 4G.",
        "Hỏi khuyến mãi đổi gói giữa kỳ — đôi khi có ưu đãi.",
      ]),
      p(
        "Gói 5G VNPT nào phù hợp? Gửi tôi thói quen dùng điện thoại 1 tuần (hoặc screenshot data), tôi gợi ý 2–3 gói so sánh giá, không bán gói cao nhất mặc định.",
      ),
    ),
  },
  {
    meta: {
      slug: "camera-vnpt-co-luu-cloud-khong",
      title: "Camera VNPT có lưu cloud không?",
      excerpt:
        "Giải thích gói cloud 7–30 ngày và cách chọn theo nhu cầu.",
      category: "camera",
      tags: ["cloud", "camera"],
      seoTitle: "Camera VNPT có lưu cloud không?",
      seoDescription:
        "Camera VNPT lưu cloud thế nào? Gói và cách chọn phù hợp.",
      publishedAt: "2026-06-14",
      relatedPostSlugs: ["lap-camera-gia-dinh-can-luu-y-gi"],
    },
    faqs: [
      {
        question: "Không mua cloud thì camera còn quay được không?",
        answer:
          "Có — xem live vẫn được. Cloud dùng để xem lại video đã qua. Một số camera hỗ trợ thẻ nhớ local thay cloud.",
      },
      {
        question: "Cloud 7 ngày hay 30 ngày nên chọn gì?",
        answer:
          "Gia đình, ít sự cố → 7 ngày. Cửa hàng, cần tra cứu lâu → 30 ngày. Tôi tư vấn theo mức độ rủi ro và ngân sách.",
      },
    ],
    body: build(
      "Khách lắp camera VNPT gần như ai cũng hỏi tôi: có lưu cloud không, phí bao nhiêu, có bắt buộc không? Câu trả lời ngắn — có, camera VNPT hỗ trợ lưu trữ cloud theo gói ngày (7, 15, 30 ngày tùy chương trình). Cloud giúp xem lại video khi có sự cố, không cần tự quản thẻ nhớ.",
      h2("Cloud camera VNPT hoạt động thế nào?"),
      p(
        "Camera ghi hình và upload lên server cloud của VNPT (mã hóa). Bạn xem live và xem lại qua app trên điện thoại. Video lưu theo số ngày gói — hết hạn tự xóa, không chiếm bộ nhớ điện thoại.",
      ),
      p(
        "Khác thẻ nhớ: thẻ hỏng mất dữ liệu, cloud an toàn hơn nếu camera bị lấy. Nhược: phí hàng tháng, cần Internet ổn định để upload.",
      ),
      h2("Các gói cloud phổ biến"),
      p(
        "Gia đình thường chọn cloud 7 ngày — đủ xem lại tuần qua nếu phát hiện mất đồ, tranh chấp nhỏ. Cửa hàng, kho, văn phòng: 15–30 ngày để tra cứu sự cố phát hiện muộn hoặc làm việc với cơ quan chức năng.",
      ),
      p(
        "Phí cloud tính theo camera/tháng. Lắp 4 camera × gói 7 ngày — tôi luôn báo tổng phí trước, không chỉ báo giá 1 camera.",
      ),
      h2("Cloud vs thẻ nhớ — nên chọn gì?"),
      ul([
        "<strong>Cloud:</strong> An toàn, xem từ xa, không lo thẻ hỏng. Trả phí tháng.",
        "<strong>Thẻ nhớ:</strong> Chi phí một lần, không phí hàng tháng. Rủi ro hỏng thẻ, mất camera mất video.",
        "<strong>Kết hợp:</strong> Một số khách cloud chính + thẻ backup — tùy ngân sách.",
      ]),
      h2("Điều kiện để cloud chạy tốt"),
      p(
        "WiFi ổn định tại vị trí camera — upload liên tục tốn băng thông upload. Nhà dùng gói Internet VNPT thông thường thường đủ cho 2–4 camera HD. Nhiều camera 2K/4K cần tính thêm băng thông hoặc dùng camera có dây.",
      ),
      p(
        "Camera VNPT có lưu cloud không? Có — và tôi khuyên gia đình nên có ít nhất gói 7 ngày cho camera cửa chính, sân. Cần báo giá cloud theo số camera, nhắn tôi số lượng và vị trí lắp.",
      ),
    ),
  },
  {
    meta: {
      slug: "camera-wifi-hay-bi-mat-ket-noi",
      title: "Camera WiFi hay bị mất kết nối — nguyên nhân và cách xử lý",
      excerpt:
        "Camera offline thường do WiFi yếu, không phải hỏng thiết bị.",
      category: "troubleshooting",
      tags: ["camera", "WiFi"],
      seoTitle: "Camera WiFi hay mất kết nối — xử lý thế nào?",
      seoDescription:
        "Nguyên nhân camera WiFi hay offline và cách khắc phục.",
      publishedAt: "2026-06-15",
      relatedPostSlugs: ["nen-lap-camera-wifi-hay-camera-co-day"],
    },
    faqs: [
      {
        question: "Camera offline có mất video cloud không?",
        answer:
          "Trong lúc offline, camera không upload được lên cloud — có thể có khoảng trống video. Khi online lại, ghi tiếp bình thường.",
      },
      {
        question: "Reset camera có giải quyết được không?",
        answer:
          "Reset giúp nếu lỗi cấu hình WiFi. Nếu sóng yếu, reset xong vẫn offline — cần cải thiện WiFi hoặc đổi vị trí.",
      },
    ],
    body: build(
      "“Camera nhà em hay offline” — tin nhắn tôi nhận vài lần mỗi tuần. Phần lớn không phải camera hỏng mà do WiFi yếu tại chỗ đặt, nhiễu sóng, hoặc modem quá tải. Tôi liệt kê nguyên nhân và cách xử lý từ dễ đến khó, giúp bạn tự kiểm tra trước khi gọi bảo hành.",
      h2("Nguyên nhân phổ biến"),
      ul([
        "<strong>WiFi yếu:</strong> Camera đặt xa modem, qua nhiều tường.",
        "<strong>Sai mật khẩu WiFi:</strong> Sau khi đổi pass WiFi, camera chưa cập nhật.",
        "<strong>Nhiễu 2.4GHz:</strong> Camera thường chỉ dùng 2.4GHz, kênh đông.",
        "<strong>Mất điện/ngắt mạng:</strong> Modem restart, camera cần vài phút kết nối lại.",
        "<strong>Quá nhiều thiết bị:</strong> Modem gia đình quá tải.",
        "<strong>Nguồn camera:</strong> Adapter lỏng, cáp USB kém chất lượng.",
      ]),
      h2("Các bước xử lý tại nhà"),
      ol([
        "Kiểm tra đèn camera — đỏ/xanh nhấp nháy báo gì theo manual.",
        "Mở app xem camera offline hay toàn bộ offline.",
        "Restart modem và camera (rút nguồn 30 giây).",
        "Đưa điện thoại tới sát camera, test WiFi — dưới -70 dBm là yếu.",
        "Đổi sang kênh WiFi 2.4GHz ít nhiễu (1, 6, 11).",
        "Cập nhật firmware camera qua app nếu có.",
      ]),
      h2("Giải pháp lâu dài"),
      p(
        "Di chuyển camera gần modem hơn (nếu góc quay cho phép). Thêm WiFi Mesh node gần camera — giải pháp tôi khuyên nhiều nhất cho nhà Quận 12. Chuyển sang camera có dây/PoE nếu vị trí cố định và cần ổn định 24/7.",
      ),
      p(
        "Tách mạng IoT: một số modem cho phép WiFi guest/IoT riêng — tránh camera tranh băng thông với TV tải 4K.",
      ),
      h2("Khi nào nghi hỏng phần cứng?"),
      p(
        "Camera offline dù đặt sát modem, đã reset và cấu hình lại WiFi, đèn báo lỗi liên tục — liên hệ bảo hành. Ghi lại thời điểm offline (ban ngày/đêm, mưa gió) giúp kỹ thuật chẩn đoán.",
      ),
      p(
        "Camera WiFi hay mất kết nối — xử lý bằng cải thiện sóng trước, đổi thiết bị sau. Gửi tôi ảnh vị trí camera và modem, tôi gợi ý Mesh hay camera dây phù hợp.",
      ),
    ),
  },
  {
    meta: {
      slug: "nen-lap-camera-wifi-hay-camera-co-day",
      title: "Nên lắp camera WiFi hay camera có dây?",
      excerpt:
        "So sánh độ ổn định, chi phí lắp và phù hợp từng loại nhà/cửa hàng.",
      category: "camera",
      tags: ["camera WiFi", "camera có dây"],
      seoTitle: "Camera WiFi hay có dây — nên chọn gì?",
      seoDescription:
        "So sánh camera WiFi và camera có dây cho gia đình và cửa hàng.",
      publishedAt: "2026-06-16",
      relatedPostSlugs: ["camera-wifi-hay-bi-mat-ket-noi"],
    },
    faqs: [
      {
        question: "Camera WiFi VNPT có ổn cho cửa hàng không?",
        answer:
          "Cửa hàng nhỏ 1–2 camera có thể dùng WiFi nếu sóng tốt. Cửa hàng cần giám sát 24/7 nên cân nhắc có dây/PoE ổn định hơn.",
      },
      {
        question: "Camera có dây lắp có phức tạp không?",
        answer:
          "Cần kéo cáp mạng hoặc cáp đồng trục — thi công lâu hơn WiFi. Đổi lại ổn định và ít bảo trì hơn.",
      },
    ],
    body: build(
      "Khi tư vấn lắp camera VNPT, câu hỏi “nên WiFi hay có dây?” tôi đặt ngay sau số lượng camera và vị trí. Hai loại đều quay tốt khi điều kiện đúng — khác nhau ở cách truyền tín hiệu, chi phí lắp và độ ổn định lâu dài.",
      h2("Camera WiFi — khi nào hợp lý?"),
      p(
        "Camera WiFi kết nối mạng không dây, lắp nhanh, ít đục tường. Phù hợp: gia đình 1–3 camera, vị trí trong phạm vi sóng tốt, thuê nhà không muốn kéo dây, cần lắp tạm hoặc di dời sau này.",
      ),
      p(
        "Nhược: phụ thuộc WiFi — sóng yếu là offline. Upload cloud liên tục có thể làm chậm mạng nếu không có băng thông dư.",
      ),
      h2("Camera có dây / PoE — khi nào nên chọn?"),
      p(
        "Camera có dây (Ethernet hoặc đồng trục + đầu ghi) ổn định hơn, ít nhiễu, phù hợp giám sát 24/7. Cửa hàng, kho, văn phòng, nhà phố lắp 4 camera trở lên — tôi thường đề xuất có dây hoặc PoE (cáp mạng vừa data vừa cấp nguồn).",
      ),
      p(
        "Nhược: chi phí thi công ban đầu cao hơn, cần planning đường cáp. Đổi lại ít phải sửa “camera hay rớt mạng” về sau.",
      ),
      h2("So sánh nhanh"),
      ul([
        "<strong>Chi phí lắp:</strong> WiFi thấp hơn.",
        "<strong>Ổn định:</strong> Có dây thắng.",
        "<strong>Linh hoạt vị trí:</strong> WiFi thắng.",
        "<strong>Cửa hàng/kho:</strong> Có dây/PoE thắng.",
        "<strong>Gia đình 1–2 điểm, sóng tốt:</strong> WiFi đủ dùng.",
      ]),
      h2("Giải pháp lai"),
      p(
        "Nhiều nhà tôi lắp: camera cửa chính + trong nhà dùng WiFi (sóng mạnh), camera sân/gara xa dùng có dây hoặc Mesh + WiFi. Không bắt buộc chọn một loại cho cả nhà.",
      ),
      p(
        "Nên lắp camera WiFi hay có dây? Gia đình nhỏ, WiFi ổn → WiFi. Cửa hàng, nhiều camera, cần ổn định → có dây. Mô tả không gian của bạn, tôi vẽ phương án cụ thể không ép loại đắt hơn.",
      ),
    ),
  },
  {
    meta: {
      slug: "lap-camera-gia-dinh-can-luu-y-gi",
      title: "Lắp camera gia đình cần lưu ý gì?",
      excerpt:
        "Vị trí lắp, quyền riêng tư, WiFi và gói cloud — checklist trước khi lắp.",
      category: "camera",
      tags: ["lắp camera", "gia đình"],
      seoTitle: "Lắp camera gia đình cần lưu ý gì?",
      seoDescription:
        "Checklist lắp camera gia đình: vị trí, WiFi, cloud và quyền riêng tư.",
      publishedAt: "2026-06-17",
      relatedPostSlugs: ["camera-vnpt-co-luu-cloud-khong"],
    },
    faqs: [
      {
        question: "Lắp camera hướng ra đường có vi phạm không?",
        answer:
          "Không quay vào nhà người khác, hạn chế ghi hình khu vực riêng tư hàng xóm. Đặt góc cửa nhà mình, sân — tôi tư vấn góc quay an toàn pháp lý.",
      },
      {
        question: "Nên lắp bao nhiêu camera cho nhà phố?",
        answer:
          "Thường 2–4: cửa chính, sân/trước nhà, trong phòng khách hoặc cầu thang. Tùy diện tích và nhu cầu.",
      },
    ],
    body: build(
      "Lắp camera gia đình không chỉ là mua camera và gắn lên tường. Tôi đã gặp khách lắp xong rồi phải tháo vì góc quay lấn sang nhà hàng xóm, hoặc camera hay offline vì không tính WiFi trước. Checklist dưới đây giúp bạn lắp một lần đúng.",
      h2("Checklist trước khi lắp"),
      ul([
        "Xác định mục đích: an ninh, trông trẻ, trông người già, ghi hình khi vắng nhà.",
        "Chọn số camera và vị trí (cửa, sân, trong nhà).",
        "Kiểm tra sóng WiFi tại từng vị trí hoặc plan cáp/PoE.",
        "Chọn gói cloud (7/30 ngày) hoặc thẻ nhớ.",
        "Thống nhất với gia đình về quyền riêng tư (phòng ngủ có quay không?).",
        "Báo chủ nhà nếu thuê — được phép khoan/luồn dây.",
      ]),
      h2("Vị trí lắp hợp lý"),
      p(
        "Cửa chính: góc cao, nhìn rõ khu vực trước cửa và hành lang. Sân: che mưa nắng cho camera, tránh ngược sáng trực tiếp ban ngày. Trong nhà: cầu thang, phòng khách — tránh phòng ngủ, phòng tắm nếu không thực sự cần.",
      ),
      p(
        "Tôi hay dùng app trên điện thoại đặt thử tại vị trí dự kiến, xem khung hình trước khi khoan.",
      ),
      h2("WiFi và Internet"),
      p(
        "Mỗi camera HD cần upload ổn định. 2–4 camera + Internet gia đình bình thường thường ổn với gói 300 Mbps trở lên nếu WiFi phủ tốt. Camera xa modem — plan Mesh hoặc camera dây.",
      ),
      h3("Bảo mật tài khoản"),
      p(
        "Đổi mật khẩu app camera mặc định, bật xác thực 2 lớp nếu có. Không share tài khoản app cho người lạ. WiFi nhà nên WPA2/WPA3, mật khẩu mạnh.",
      ),
      h2("Quyền riêng tư và pháp lý"),
      p(
        "Camera gia đình phục vụ bảo vệ tài sản của bạn, không theo dõi trái phép người khác. Góc quay không nên bao trọn cửa nhà hàng xóm. Nếu lưu cloud, video thuộc quyền sử dụng của bạn theo điều khoản dịch vụ VNPT.",
      ),
      p(
        "Lắp camera gia đình cần lưu ý gì? Vị trí, WiFi, cloud, riêng tư — bốn trụ cột. Liên hệ tôi khảo sát miễn phí tại Quận 12, tôi gửi checklist và báo giá camera + cloud cụ thể.",
      ),
    ),
  },
  {
    meta: {
      slug: "internet-vnpt-va-wifi-mesh-cho-nha-nhieu-tang",
      title: "Internet VNPT và WiFi Mesh cho nhà nhiều tầng",
      excerpt:
        "Kết hợp gói Internet tốc độ cao với Mesh để phủ sóng đều mọi tầng.",
      category: "wifi",
      tags: ["Mesh", "nhiều tầng"],
      seoTitle: "Internet VNPT + WiFi Mesh cho nhà nhiều tầng",
      seoDescription:
        "Giải pháp Internet VNPT kết hợp Mesh cho nhà 2–3 tầng.",
      publishedAt: "2026-06-18",
      relatedPostSlugs: ["wifi-mesh-la-gi"],
    },
    faqs: [
      {
        question: "Nhà 2 tầng cần gói Internet bao nhiêu Mbps?",
        answer:
          "300–500 Mbps thường đủ gia đình. Mesh giải quyết phủ sóng, không thay thế hoàn toàn nhu cầu băng thông khi nhiều người dùng nặng.",
      },
      {
        question: "2 node Mesh có đủ cho nhà 3 tầng không?",
        answer:
          "Tùy diện tích mỗi tầng. Nhà ~80m²/tầng thường 2 node đủ; nhà rộng hoặc tường dày có thể cần 3 node.",
      },
    ],
    body: build(
      "Nhà 2–3 tầng tại Quận 12 tôi khảo sát rất nhiều — pattern lặp lại: gói Internet VNPT cao, speedtest tầng 1 đẹp, tầng 3 “không vào được mạng”. Vấn đề không phải nhà mạng yếu mà thiếu phủ sóng WiFi đều. Giải pháp chuẩn: Internet VNPT đủ băng thông + WiFi Mesh đặt node hợp lý.",
      h2("Tại sao nhà nhiều tầng cần cả Internet và Mesh?"),
      p(
        "Internet (cáp quang) đưa băng thông vào nhà — thường terminate ở tầng trệt hoặc hộp thoại một tầng. Modem WiFi một điểm không thể phủ đều 3 tầng có tường bê tông. Mesh chia sóng thành nhiều node, mỗi tầng có điểm phát gần.",
      ),
      p(
        "Nâng gói 1 Gbps mà không Mesh — tầng trên vẫn yếu. Ngược lại, Mesh với gói quá thấp — sóng đủ nhưng nhiều người xem 4K vẫn lag.",
      ),
      h2("Combo gợi ý theo quy mô nhà"),
      h3("Nhà 2 tầng ~80–100m²/tầng"),
      p(
        "Internet 300–500 Mbps + Mesh 2 node (node chính gần modem tầng 1, node phụ tầng 2 giữa nhà). Đa số hộ 3–5 người dùng thoải mái.",
      ),
      h3("Nhà 3 tầng hoặc mặt bằng phức tạp"),
      p(
        "500 Mbps trở lên + Mesh 2–3 node. Node phụ tầng 2 và tầng 3, tránh đặt node quá xa nhau (mất liên kết backhaul). Có thể dùng cáp LAN nối node phụ với node chính nếu nhà có ống luồn sẵn — ổn định nhất.",
      ),
      h2("Quy trình khảo sát tôi làm"),
      ol([
        "Khách gửi sơ đồ hoặc ảnh từng tầng.",
        "Hỏi vị trí modem/hộp thoại hiện tại hoặc dự kiến.",
        "Xác định phòng cần sóng mạnh (home office, camera).",
        "Đề xuất gói Internet + số node Mesh.",
        "Báo giá trọn gói lắp và cấu hình.",
      ]),
      h2("Lỗi thường gặp khi tự lắp Mesh"),
      p(
        "Đặt node phụ quá xa node chính — tín hiệu backhaul yếu. Chỉ lắp 1 node phụ cho nhà 3 tầng rộng. Không cập nhật firmware Mesh. Dùng Mesh không cùng hệ với modem — vẫn được nhưng cấu hình phức tạp hơn Mesh VNPT đi kèm gói.",
      ),
      p(
        "Internet VNPT và WiFi Mesh cho nhà nhiều tầng là combo tôi khuyên nhiều nhất. Gửi tôi số tầng và diện tích, tôi survey miễn phí khu Quận 12 và báo phương án cụ thể.",
      ),
    ),
  },
  {
    meta: {
      slug: "speedtest-cao-nhung-video-van-lag",
      title: "Speedtest cao nhưng video vẫn lag — vì sao?",
      excerpt:
        "Bufferbloat, WiFi nhiễu, server video và số thiết bị — nguyên nhân thực tế.",
      category: "troubleshooting",
      tags: ["speedtest", "lag"],
      seoTitle: "Speedtest cao nhưng video vẫn lag?",
      seoDescription:
        "Tại sao speedtest cao mà xem video vẫn giật? Nguyên nhân và cách xử lý.",
      publishedAt: "2026-06-19",
      relatedPostSlugs: ["wifi-yeu-phai-lam-gi"],
    },
    faqs: [
      {
        question: "Speedtest bao nhiêu là đủ xem YouTube 4K?",
        answer:
          "Lý thuyết 25 Mbps đủ 4K một luồng. Thực tế cần dư băng thông và WiFi ổn định — nhiều người cùng xem cần cao hơn.",
      },
      {
        question: "Test bằng WiFi hay dây LAN chính xác hơn?",
        answer:
          "Dây LAN phản ánh tốc độ đường truyền vào nhà. WiFi thấp hơn là do sóng. Test cả hai để biết lag do mạng hay do WiFi.",
      },
    ],
    body: build(
      "Khách nhắn tôi: “Speedtest 300 Mbps mà YouTube vẫn giật”. Nghe mâu thuẫn nhưng rất phổ biến. Speedtest đo tốc độ tại một thời điểm, một server gần — không phản ánh trải nghiệm xem video thực tế với WiFi, nhiều thiết bị và server video xa. Tôi giải thích nguyên nhân và cách xử lý.",
      h2("Vì sao speedtest cao mà video vẫn lag?"),
      h3("WiFi yếu hoặc nhiễu"),
      p(
        "Speedtest gần modem đạt 300 Mbps, xem TV ở phòng xa qua WiFi chỉ còn vài Mbps do sóng yếu — video buffer. Giải pháp: Mesh, đổi vị trí modem, dùng dây LAN cho TV/box.",
      ),
      h3("Nhiều thiết bị cùng lúc"),
      p(
        "Cả nhà cùng tối: TV 4K, 3 điện thoại, camera upload cloud, laptop tải file — băng thông chia sẻ, speedtest lúc này không ai chạy nên vẫn cao khi test riêng.",
      ),
      h3("Bufferbloat"),
      p(
        "Modem/router xếp hàng gói tin kém — ping tăng vọt khi tải nặng, video giật dù Mbps vẫn cao. Restart modem, firmware mới, hoặc modem/router chất lượng hơn có thể cải thiện.",
      ),
      h3("Server video và CDN"),
      p(
        "YouTube, Netflix dùng CDN — đôi khi server xa hoặc quá tải giờ cao điểm. Thử video khác, app khác, hoặc giảm chất lượng 4K xuống 1080p để test.",
      ),
      h2("Cách chẩn đoán đúng"),
      ol([
        "Speedtest dây LAN trực tiếp modem — baseline đường truyền.",
        "Speedtest WiFi tại chỗ hay xem video lag.",
        "Ping test (cmd ping 8.8.8.8) khi lag — ping >100ms thường ảnh hưởng stream.",
        "Tắt tạm thiết bị khác, xem video một mình.",
        "Thử khung giờ khác (sáng vs tối).",
      ]),
      h2("Xử lý thực tế"),
      p(
        "LAN cho TV/box nếu có thể. Mesh nếu WiFi xa yếu. Hạn chế tải nền khi xem phim. Đổi DNS (1.1.1.1, 8.8.8.8) đôi khi giúp truy cập CDN nhanh hơn — không phải lúc nào cũng hiệu quả.",
      ),
      p(
        "Speedtest cao nhưng video vẫn lag — đừng vội nâng gói. Kiểm tra WiFi và số thiết bị trước. Mô tả tình huống gửi tôi (phòng nào, giờ nào, app nào), tôi gợi ý bước tiếp theo.",
      ),
    ),
  },
  {
    meta: {
      slug: "internet-gia-dinh-tu-rot-roi-co-lai",
      title: "Internet gia đình tự rớt rồi có lại — xử lý thế nào?",
      excerpt:
        "Mạng chập chờn, tự mất rồi có lại: modem, dây, nhà mạng hay WiFi?",
      category: "troubleshooting",
      tags: ["mất mạng", "internet"],
      seoTitle: "Internet tự rớt rồi có lại — xử lý thế nào?",
      seoDescription:
        "Internet gia đình hay tự mất rồi có lại? Nguyên nhân và cách khắc phúc.",
      publishedAt: "2026-06-20",
      relatedPostSlugs: ["wifi-yeu-phai-lam-gi", "speedtest-cao-nhung-video-van-lag"],
    },
    faqs: [
      {
        question: "Mạng rớt vài phút rồi có lại có cần gọi kỹ thuật không?",
        answer:
          "Lặp lại nhiều lần/ngày thì nên gọi. Một lần có thể do sự cố tạm hoặc modem restart — ghi lại thời gian để báo hỗ trợ.",
      },
      {
        question: "Modem nóng có gây rớt mạng không?",
        answer:
          "Có. Modem trong tủ kín, nóng quá sẽ restart hoặc treo. Đặt nơi thoáng, quạt thổi nếu cần.",
      },
    ],
    body: build(
      "Internet tự rớt vài phút rồi có lại — hiện tượng khách mô tả “chập chờn” khiến cả nhà bực: họp online đứt, game out, camera mất hình. Tôi phân loại nguyên nhân từ phía nhà bạn trước, sau đó mới nghi sự cố nhà mạng. Làm đúng thứ tự tiết kiệm thời gian chờ kỹ thuật.",
      h2("Nguyên nhân thường gặp tại nhà"),
      h3("Modem quá nhiệt hoặc lỗi"),
      p(
        "Modem trong tủ kín, đặt sát tường, chạy 24/7 nhiều tháng — quá nhiệt dẫn đến restart tự động. Dấu hiệu: mất mạng đúng lúc modem đèn tắt sáng lại. Xử lý: đặt thoáng, restart định kỳ 1 lần/tuần nếu cần, liên hệ đổi modem nếu lặp lại.",
      ),
      h3("Dây LAN/connector lỏng"),
      p(
        "Dây từ hộp thoại tới modem, dây WAN lỏng — chạm nhẹ là mất sync. Kiểm tra cắm chặt, thay dây CAT6 nếu dây cũ đầu vàng đen.",
      ),
      h3("Nguồn điện không ổn"),
      p(
        "Sét đánh gần, điện chập chờn khu vực — modem restart. Dùng ổ cắm riêng, cân nhắc UPS cho modem nếu khu vực hay mất điện chớp nhoáng.",
      ),
      h2("Nguyên nhân từ WiFi (không phải mất Internet)"),
      p(
        "Đôi khi chỉ WiFi rớt còn dây LAN vẫn có mạng — do modem WiFi module hoặc nhiễu. Test bằng dây LAN khi “mất mạng”: LAN OK → tập trung WiFi; LAN cũng mất → đường truyền/modem.",
      ),
      h2("Sự cố từ nhà mạng"),
      p(
        "Bảo trì tuyến, sự cố tủ cáp khu vực — thường ảnh hưởng nhiều hộ cùng lúc. Hỏi hàng xóm cùng dùng VNPT có bị không. Ghi thời gian rớt (ngày, giờ, phút) gửi hỗ trợ — log giúp tra cứu nhanh.",
      ),
      h2("Checklist xử lý từng bước"),
      ol([
        "Ghi nhận thời gian và tần suất rớt (3 lần/ngày hay 1 lần/tuần?).",
        "Restart modem (rút nguồn 30 giây).",
        "Kiểm tra dây, nguồn, nhiệt modem.",
        "Test LAN vs WiFi khi rớt.",
        "Hỏi hàng xóm cùng nhà mạng.",
        "Gọi hỗ trợ VNPT kèm log thời gian nếu lặp lại.",
      ]),
      h2("Khi nào cần thay thiết bị?"),
      p(
        "Modem >3–4 năm, đèn LOS/Internet nhấp nháy đỏ thường xuyên, kỹ thuật xác nhận hỏng port — yêu cầu đổi modem mới. Mesh node hay mất sync cũng cần kiểm tra.",
      ),
      p(
        "Internet gia đình tự rớt rồi có lại — đừng chịu im lặng nếu xảy ra mỗi ngày. Làm checklist trên, gửi tôi mô tả và ảnh đèn modem, tôi hỗ trợ phân loại trước khi bạn gọi tổng đài.",
      ),
    ),
  },
  {
    meta: {
      slug: "kich-hoat-sim-khi-doi-dien-thoai-vinaphone",
      title:
        "Kích hoạt SIM khi đổi sang điện thoại khác — hướng dẫn VinaPhone 2026",
      excerpt:
        "Đổi SIM sang máy mới cần xác thực khuôn mặt trong 2 giờ. Checklist My VNPT và khi nào ra quầy.",
      category: "sim-5g",
      tags: ["đổi máy", "kích hoạt SIM", "xác thực khuôn mặt"],
      seoTitle: "Kích hoạt SIM khi đổi điện thoại VinaPhone 2026",
      seoDescription:
        "Hướng dẫn kích hoạt / xác thực SIM VinaPhone khi đổi sang máy mới theo quy định 2026: My VNPT, thời hạn 2 giờ, lỗi thường gặp.",
      publishedAt: "2026-07-23",
      relatedPostSlugs: [
        "cach-xac-nhan-sim-chinh-chu-vinaphone",
        "apn-5g-vnpt",
        "cach-kich-hoat-esim-vnpt",
      ],
      featured: true,
    },
    faqs: [
      {
        question: "SIM đã chính chủ rồi có cần xác thực khi đổi máy không?",
        answer:
          "Có. Theo quy định từ 15/06/2026, đổi sang thiết bị đầu cuối mới vẫn bắt buộc xác thực sinh trắc học khuôn mặt dù SIM đã đăng ký chính chủ trước đó.",
      },
      {
        question: "Không xác thực trong 2 giờ thì bị gì?",
        answer:
          "Thuê bao có thể bị khóa chiều đi (không gọi/SMS đi được). Vẫn nhận cuộc gọi, tin nhắn đến và dùng data. Xác thực xong thường mở lại ngay.",
      },
      {
        question: "Đổi eSIM sang máy mới có giống SIM vật lý không?",
        answer:
          "eSIM cần cấp QR mới (thường tại quầy hoặc qua hỗ trợ VNPT), không rút thẻ như SIM nhựa. Sau khi gắn eSIM trên máy mới vẫn phải xác thực khuôn mặt như đổi thiết bị.",
      },
    ],
    body: build(
      "Bạn vừa mua máy mới, rút SIM VinaPhone từ máy cũ cắm sang — sóng có, data có, nhưng vài phút sau điện thoại báo cần xác thực khuôn mặt hoặc bị khóa gọi đi? Từ giữa năm 2026 đây không còn chuyện “hiếm”. Tôi hướng dẫn checklist kích hoạt / xác thực SIM khi đổi sang điện thoại khác để bạn không bị cắt liên lạc giữa đường.",
      h2("Vì sao đổi máy lại phải “kích hoạt” lại?"),
      p(
        "Với SIM vật lý, cắm sang máy khác thường vẫn nhận sóng ngay. Tuy nhiên theo Thông tư 08/2026/TT-BKHCN (áp dụng bổ sung từ 15/06/2026 với thay đổi thiết bị đầu cuối), nhà mạng phát hiện số thuê bao chạy trên IMEI/thiết bị mới sẽ yêu cầu chủ thuê bao xác thực sinh trắc học khuôn mặt. Đây chính là bước “kích hoạt an toàn” sau khi đổi máy — không phải đăng ký số mới.",
      ),
      p(
        "VinaPhone thường gửi tin nhắn flash và SMS nhắc xác thực. Thời gian vàng: hoàn tất trong khoảng tối đa 2 giờ kể từ khi hệ thống phát hiện đổi thiết bị. Quá hạn có thể bị tạm dừng chiều đi (gọi/SMS đi), trong khi vẫn nhận cuộc gọi đến và dùng Internet/Data.",
      ),
      h2("Checklist trước khi rút SIM sang máy mới"),
      ol([
        "Cài sẵn app <strong>My VNPT</strong> trên máy mới (App Store / CH Play) và đăng nhập bằng số VinaPhone của bạn.",
        "Chuẩn bị <strong>CCCD gắn chip</strong> (bản gốc) và đảm bảo khuôn mặt khớp ảnh trên giấy tờ — ánh sáng đủ, không đeo khẩu trang khi quét.",
        "Nếu đã có <strong>VNeID mức 2</strong>, càng thuận lợi khi liên kết xác thực trên My VNPT.",
        "Backup danh bạ, ảnh quan trọng trên máy cũ trước khi reset hoặc bán máy.",
        "Với <strong>eSIM</strong>: đừng chỉ rút — cần hủy/cấp lại profile; mang CCCD ra quầy hoặc nhờ hỗ trợ cấp QR mới rồi quét trên máy mới.",
      ]),
      h2("Cách xác thực trên máy mới qua My VNPT (khuyên dùng)"),
      ol([
        "Cắm SIM (hoặc kích hoạt eSIM) trên điện thoại mới, bật data hoặc dùng WiFi.",
        "Mở <strong>My VNPT</strong> → đăng nhập bằng số thuê bao đang dùng.",
        "Khi có banner / mục yêu cầu xác thực khuôn mặt hoặc thông tin thuê bao, chọn <strong>Thực hiện ngay</strong>.",
        "Nhập OTP gửi về số điện thoại (máy mới phải nhận được SMS).",
        "Làm theo hướng dẫn: chụp chân dung / quét khuôn mặt, đối chiếu dữ liệu dân cư.",
        "Ký xác nhận điện tử nếu app yêu cầu, chờ thông báo thành công.",
        "Thử gọi đi 1 cuộc và gửi SMS — nếu được là đã mở khóa chiều đi.",
      ]),
      p(
        "Menu trong app có thể đổi theo phiên bản. Không thấy banner: vào mục Thông tin thuê bao / Xác thực thông tin và làm theo các bước trên màn hình. Gặp lỗi camera hoặc “không khớp khuôn mặt”, thử lại nơi sáng, bỏ kính râm/khẩu trang, hoặc mang CCCD ra điểm giao dịch VinaPhone.",
      ),
      h2("Cách 2: Xác thực tại quầy VinaPhone"),
      p(
        "Phù hợp người lớn tuổi, máy không quét được khuôn mặt, hoặc app báo lỗi liên tục. Mang CCCD gắn chip + điện thoại đang dùng SIM. Nhân viên hỗ trợ xác thực trực tiếp, thường miễn phí theo hướng dẫn nhà mạng. Tôi hay chỉ khách Quận 12 / TP.HCM quầy gần nhất khi remote không xong trong 15 phút.",
      ),
      h2("Sau khi đổi máy — kiểm tra data và APN"),
      p(
        "Xác thực xong nhưng lướt web không được? Thường do APN hoặc chế độ mạng. Restart máy, tắt/bật chế độ máy bay, kiểm tra gói data còn hạn. Android hay cần cài APN VNPT thủ công — xem bài hướng dẫn APN 5G VNPT trên site. iPhone thường tự nhận APN.",
      ),
      ul([
        "Biểu tượng 4G/5G hiện, tắt WiFi vẫn vào được Google/Zalo.",
        "Gọi đi và nhận cuộc gọi đều OK.",
        "My VNPT đăng nhập được, gói cước hiển thị đúng số.",
      ]),
      h2("Lỗi thường gặp khi đổi SIM sang máy khác"),
      ul([
        "<strong>Chỉ nhận cuộc gọi, không gọi đi:</strong> chưa xác thực khuôn mặt hoặc quá 2 giờ — mở My VNPT làm ngay hoặc ra quầy.",
        "<strong>Không nhận OTP:</strong> đợi sóng ổn định, tắt WiFi Calling tạm thời, hoặc dùng WiFi + nhờ quầy xác thực offline.",
        "<strong>Máy mới không có NFC / camera lỗi:</strong> ra điểm giao dịch thay vì cố quét chip tại nhà.",
        "<strong>eSIM máy cũ còn active:</strong> cần hủy profile cũ trước khi kích hoạt QR trên máy mới — không “copy” eSIM như rút thẻ nhựa.",
        "<strong>SIM chính chủ người khác:</strong> chủ thuê bao phải tự xác thực; người mượn máy không thay thế được nếu không đúng dữ liệu sinh trắc.",
      ]),
      h2("Đổi máy nhưng giữ cả 2 điện thoại?"),
      p(
        "Nếu bạn tháo SIM qua lại giữa 2 máy thường xuyên, mỗi lần hệ thống coi là đổi thiết bị có thể lại yêu cầu xác thực. Cân nhắc dịch vụ MultiSIM (SIM phụ cùng số) nếu thực sự cần 2 máy cùng lúc — tránh rút lắp liên tục. Tôi tư vấn case này khi khách vừa dùng máy công việc vừa máy cá nhân.",
      ),
      h2("Tóm tắt nhanh"),
      p(
        "Cắm SIM sang máy mới → mở My VNPT → xác thực khuôn mặt trong ~2 giờ → test gọi và data. Đã chính chủ từ trước vẫn phải làm bước này khi đổi thiết bị. eSIM thì thêm bước cấp QR mới. Gặp kẹt, chụp màn hình lỗi gửi tôi qua Zalo — tôi hỗ trợ hướng dẫn remote hoặc chỉ quầy gần khu vực bạn ở TP.HCM.",
      ),
    ),
  },
  {
    meta: {
      slug: "cach-xac-nhan-sim-chinh-chu-vinaphone",
      title: "Cách xác nhận SIM chính chủ VinaPhone 2026 (My VNPT & VNeID)",
      excerpt:
        "Chuẩn hóa thông tin thuê bao: 4 trường dữ liệu, xác thực qua My VNPT, VNeID hoặc quầy — tránh khóa dịch vụ.",
      category: "sim-5g",
      tags: ["SIM chính chủ", "xác thực", "VNeID", "My VNPT"],
      seoTitle: "Cách xác nhận SIM chính chủ VinaPhone 2026",
      seoDescription:
        "Hướng dẫn xác nhận / xác thực SIM chính chủ VinaPhone theo quy định 2026: My VNPT, VNeID mức 2, quét CCCD chip, mốc 15/4 và 15/6.",
      publishedAt: "2026-07-23",
      relatedPostSlugs: [
        "kich-hoat-sim-khi-doi-dien-thoai-vinaphone",
        "sim-5g-vnpt-co-can-doi-sim",
        "esim-vnpt-la-gi",
      ],
      featured: true,
    },
    faqs: [
      {
        question: "SIM đã đăng ký tên mình từ trước có phải xác thực lại không?",
        answer:
          "Nếu đã chuẩn hóa khớp dữ liệu dân cư (ví dụ từng xác thực qua VNeID mức 2 / quét chip CCCD theo hướng dẫn nhà mạng), nhiều trường hợp không cần làm lại. Khi My VNPT vẫn hiện banner yêu cầu xác thực thì nên hoàn tất để tránh khóa dịch vụ.",
      },
      {
        question: "Xác thực SIM chính chủ có mất phí không?",
        answer:
          "Theo hướng dẫn triển khai của nhà mạng, xác thực thông tin thuê bao qua app hoặc tại điểm giao dịch thường miễn phí. Cảnh giác nếu ai đó đòi phí “làm chính chủ nhanh” qua Zalo lạ.",
      },
      {
        question: "Đang ở nước ngoài xác thực được không?",
        answer:
          "Có thể xác thực từ xa qua My VNPT kết hợp CCCD gắn chip (NFC) theo hướng dẫn VinaPhone. Nếu máy không đọc chip được, nhờ người thân mang CCCD và ủy quyền theo quy định tại quầy trong nước.",
      },
    ],
    body: build(
      "“SIM của tôi đã chính chủ chưa?” là câu khách hỏi tôi gần như mỗi tuần — nhất là khi nhận SMS từ nhà mạng nhắc chuẩn hóa thông tin. Từ 15/04/2026, thuê bao di động cần xác thực thông tin với Cơ sở dữ liệu quốc gia về dân cư. Bài này tôi hướng dẫn cách xác nhận SIM chính chủ VinaPhone ngay tại nhà qua My VNPT / VNeID, và khi nào nên ra quầy.",
      h2("SIM chính chủ nghĩa là gì trong 2026?"),
      p(
        "Không chỉ là “đăng ký đúng tên trên giấy tờ cũ”. Theo quy định mới, mỗi thuê bao cần khớp các trường thông tin cốt lõi với dữ liệu dân cư, thường gồm: số định danh cá nhân (CCCD), họ tên, ngày tháng năm sinh, và dữ liệu sinh trắc học ảnh khuôn mặt. Mục tiêu: giảm SIM rác, hạn chế mạo danh và gắn đúng chủ thể với từng số.",
      ),
      p(
        "Nếu thông tin không khớp hoặc chưa xác thực theo lộ trình, thuê bao có thể bị hạn chế dịch vụ theo mức độ: khóa một chiều → khóa hai chiều → chấm dứt hợp đồng / thu hồi số. Vì vậy nên chủ động kiểm tra trên app thay vì chờ đến lúc không gọi được.",
      ),
      h2("Hai mốc thời gian cần nhớ"),
      ul([
        "<strong>Từ 15/04/2026:</strong> triển khai xác thực thông tin thuê bao diện rộng.",
        "<strong>Từ 15/06/2026:</strong> bổ sung bắt buộc xác thực sinh trắc khi <em>thay đổi thiết bị đầu cuối</em> (đổi máy / đổi SIM sang máy khác) — xem bài kích hoạt SIM khi đổi điện thoại.",
      ]),
      p(
        "Hai việc liên quan nhưng khác nhau: (1) chuẩn hóa SIM chính chủ / thông tin thuê bao; (2) xác thực khuôn mặt mỗi lần đổi máy. Làm xong (1) vẫn phải làm (2) khi cắm SIM sang thiết bị mới.",
      ),
      h2("Cách 1: Xác thực trên My VNPT liên kết VNeID (nhanh nhất)"),
      p(
        "Áp dụng khi bạn đã có tài khoản định danh điện tử <strong>VNeID mức độ 2</strong>. Các bước tham khảo (menu có thể hơi khác theo bản app):",
      ),
      ol([
        "Tải / cập nhật <strong>My VNPT</strong>, đăng nhập bằng số VinaPhone cần xác thực.",
        "Vào <strong>Thông tin thuê bao</strong> (hoặc banner Xác thực).",
        "Chọn <strong>Thực hiện ngay → Xác thực ngay</strong>.",
        "Nhập mã OTP gửi về số điện thoại.",
        "Chọn hình thức <strong>Liên kết ứng dụng VNeID</strong>.",
        "Chụp giấy tờ / chân dung theo hướng dẫn (nếu app yêu cầu).",
        "Mở VNeID để liên kết và xác nhận thông tin.",
        "Quay lại My VNPT, ký phiếu xác nhận điện tử nếu có.",
        "Chờ thông báo xác thực thành công — chụp màn hình lưu lại.",
      ]),
      h2("Cách 2: Quét CCCD gắn chip bằng NFC trên My VNPT"),
      p(
        "Chưa có VNeID mức 2 hoặc muốn xác thực bằng chip CCCD: sau bước OTP, chọn <strong>Quét CCCD gắn chip</strong>. Chụp mặt trước/sau thẻ và ảnh chân dung, áp sát CCCD vào mặt sau điện thoại (vùng NFC — thường gần camera sau). Giữ yên đến khi đọc chip thành công, rồi ký xác nhận trên app.",
      ),
      p(
        "Mẹo: tháo ốp dày, đặt thẻ sát đúng vùng NFC, thử xoay nhẹ thẻ. iPhone và Android đều làm được nếu máy hỗ trợ NFC. Máy cũ không có NFC → dùng VNeID mức 2 hoặc ra quầy.",
      ),
      h2("Cách 3: Xác nhận trên ứng dụng VNeID"),
      p(
        "Một số hướng dẫn nhà mạng cho phép kiểm tra / xác nhận số thuê bao ngay trên VNeID: vào chức năng liên quan số điện thoại trên trang chủ app (sau khi nhập passcode), xem danh sách thuê bao gắn với định danh của bạn. Nếu số chưa khớp hoặc thiếu, hoàn tất theo gợi ý hoặc chuyển sang My VNPT / quầy để chuẩn hóa.",
      ),
      h2("Cách 4: Tại điểm giao dịch"),
      p(
        "Mang CCCD gắn chip đến cửa hàng / điểm giao dịch VinaPhone (và một số điểm hỗ trợ theo danh sách nhà mạng công bố từng thời điểm). Nhân viên hỗ trợ xác thực trực tiếp — phù hợp người lớn tuổi hoặc khi app liên tục báo lỗi. Tôi khuyên đi giờ hành chính, tránh cuối tháng đông khách.",
      ),
      h2("Làm sao biết SIM đã chính chủ / đã xác thực?"),
      ul([
        "My VNPT không còn banner nhắc xác thực; mục thông tin thuê bao hiển thị trạng thái đã xác thực / khớp dữ liệu.",
        "Họ tên và số định danh trên app khớp CCCD của bạn (không phải tên người thân nếu bạn là chủ thuê bao).",
        "Nhận cuộc gọi/SMS đi bình thường, không bị khóa một chiều vì lý do chuẩn hóa thông tin.",
        "Với nhiều số trên cùng một người: số thứ hai trở đi có thể xác thực qua OTP hoặc video theo hướng dẫn — làm lần lượt từng số.",
      ]),
      h2("Cảnh báo lừa đảo liên quan “làm chính chủ”"),
      p(
        "Không cung cấp OTP, ảnh CCCD, mã VNeID cho người lạ trên Zalo/Facebook dù họ tự xưng nhân viên VNPT. Xác thực chỉ làm trên app chính thức hoặc tại điểm giao dịch. Tôi không bao giờ xin mật khẩu VNeID của khách — chỉ hướng dẫn bạn tự thao tác hoặc ngồi cạnh hỗ trợ khi bạn đồng ý.",
      ),
      h2("Tóm tắt"),
      p(
        "Cách xác nhận SIM chính chủ VinaPhone 2026: mở My VNPT → xác thực bằng VNeID mức 2 hoặc quét chip CCCD → kiểm tra trạng thái thành công. Song song, nhớ quy định xác thực khuôn mặt khi đổi máy từ 15/06/2026. Cần hỗ trợ từng bước, nhắn tôi model máy + ảnh màn hình My VNPT (che bớt số định danh nếu muốn) — tôi hỗ trợ khách TP.HCM / Quận 12 hướng dẫn remote trong giờ hành chính.",
      ),
    ),
  },
];
