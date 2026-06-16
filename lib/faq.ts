export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Lắp wifi VNPT mất bao lâu?",
    answer:
      "Thông thường kỹ thuật có thể khảo sát và lắp đặt trong ngày hoặc trong 24 giờ tùy khu vực, hạ tầng cáp và lịch hẹn của khách hàng.",
  },
  {
    question: "Phí hòa mạng VNPT bao nhiêu?",
    answer:
      "Phí hòa mạng phổ biến là 300.000đ/lần, đã gồm VAT. Một số chương trình khuyến mãi có thể miễn hoặc giảm phí theo từng thời điểm.",
  },
  {
    question: "Có lắp WiFi VNPT trong ngày không?",
    answer:
      "Có. Nếu khu vực đã có hạ tầng VNPT và khách đăng ký sớm trong ngày, đội kỹ thuật có thể hỗ trợ lắp trong ngày.",
  },
  {
    question: "Cần giấy tờ gì để đăng ký Internet VNPT?",
    answer:
      "Khách hàng thường cần số điện thoại liên hệ, địa chỉ lắp đặt và giấy tờ cá nhân hoặc thông tin xác minh theo quy định của nhà mạng.",
  },
  {
    question: "Gói WiFi VNPT nào phù hợp cho gia đình?",
    answer:
      "Gia đình 3-5 người nên chọn gói từ 300 Mbps trở lên. Nhà nhiều tầng hoặc nhiều phòng nên cân nhắc gói có WiFi Mesh để phủ sóng ổn định hơn.",
  },
  {
    question: "WiFi VNPT có kèm truyền hình hoặc camera không?",
    answer:
      "Có. Một số gói tích hợp MyTV, WiFi Mesh hoặc camera cloud. Nên chọn theo nhu cầu xem truyền hình, giám sát nhà và diện tích sử dụng.",
  },
  {
    question: "Đăng ký SIM 5G VNPT có cần đổi SIM không?",
    answer:
      "Tùy SIM hiện tại. Nếu SIM đã hỗ trợ USIM/5G và thiết bị tương thích, có thể không cần đổi. Nếu SIM cũ, nên đổi SIM/eSIM để dùng ổn định hơn.",
  },
  {
    question: "Sau khi đăng ký online, ai sẽ liên hệ xác nhận?",
    answer:
      "Nhân viên tư vấn sẽ liên hệ qua số điện thoại hoặc Zalo để xác nhận địa chỉ, gói cước, lịch lắp đặt và các chi phí liên quan.",
  },
];

export function buildFaqJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: `${siteUrl.replace(/\/$/, "")}/faq`,
  };
}
