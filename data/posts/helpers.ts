import type { ServiceFaq } from "@/lib/content/types";

type ServiceLink = { href: string; label: string };

export function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(3, Math.min(12, Math.ceil(words / 180)));
}

export function buildPostFooter(
  faqs: ServiceFaq[],
  serviceLinks: ServiceLink[],
): string {
  const faqHtml = faqs
    .map(
      (f) =>
        `<details class="post-faq-item"><summary><strong>${f.question}</strong></summary><p>${f.answer}</p></details>`,
    )
    .join("");

  const linksHtml = serviceLinks
    .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
    .join("");

  return `
<h2>Câu hỏi thường gặp</h2>
<div class="post-faq-block">${faqHtml}</div>
<h2>Đăng ký tư vấn miễn phí</h2>
<p>Bạn cần hỗ trợ chọn gói, kiểm tra hạ tầng hoặc hẹn lắp đặt tại Quận 12 và TP.HCM? Gửi thông tin qua form trên website hoặc nhắn Zalo — tôi phản hồi trong giờ hành chính, thường nhanh hơn buổi tối.</p>
<div class="post-cta-block">
<p><strong>Hotline / Zalo:</strong> xem số trên header website</p>
<p><a href="/#dang-ky-tu-van">→ Gửi yêu cầu tư vấn ngay</a></p>
</div>
<h2>Dịch vụ liên quan</h2>
<ul class="post-internal-links">${linksHtml}</ul>`;
}

export const defaultServiceLinks: ServiceLink[] = [
  { href: "/wifi-vnpt", label: "Lắp WiFi VNPT tại nhà" },
  { href: "/internet-di-dong-vnpt", label: "Combo Internet + di động VNPT" },
  { href: "/sim-5g-vnpt", label: "SIM 5G / eSIM VNPT" },
  { href: "/camera-vnpt", label: "Camera an ninh VNPT" },
  { href: "/wifi-vnpt-quan-12", label: "WiFi VNPT Quận 12" },
];
