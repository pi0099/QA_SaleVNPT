import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import ServiceBreadcrumbs from "@/components/ServiceBreadcrumbs";
import { defaultSiteSettings } from "@/lib/content/site-settings";
import type { SiteSettings } from "@/lib/content/types";
import { phoneNumberToTelHref, siteHasMessenger, siteHasPhone, siteHasZalo } from "@/lib/data";

type ContactPageViewProps = {
  siteSettings: SiteSettings;
  phoneNumber: string;
  zaloBaseUrl: string;
  messengerUrl: string;
};

export default function ContactPageView({
  siteSettings,
  phoneNumber,
  zaloBaseUrl,
  messengerUrl,
}: ContactPageViewProps) {
  const site = {
    phoneNumber,
    zalo: zaloBaseUrl,
    messenger: messengerUrl,
  };
  const tel = phoneNumberToTelHref(phoneNumber);

  return (
    <>
      <div className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <ServiceBreadcrumbs
            items={[
              { name: "Trang chủ", path: "/" },
              { name: "Liên hệ" },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Liên hệ tư vấn VNPT
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {siteSettings.consultantName} hỗ trợ tư vấn gói WiFi, SIM 5G và Camera
              VNPT tại {siteSettings.serviceAreaText}. Gọi điện, nhắn Zalo hoặc gửi
              form — tôi phản hồi trong giờ làm việc.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Thông tin liên hệ</h2>
              <dl className="mt-4 space-y-3 text-sm text-slate-700">
                <div>
                  <dt className="font-semibold text-slate-900">Tư vấn viên</dt>
                  <dd>{siteSettings.consultantName}</dd>
                </div>
                {siteHasPhone(site) ? (
                  <div>
                    <dt className="font-semibold text-slate-900">Điện thoại</dt>
                    <dd>
                      <a href={tel} className="text-[#2563eb] hover:underline">
                        {phoneNumber}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {siteHasZalo(site) ? (
                  <div>
                    <dt className="font-semibold text-slate-900">Zalo</dt>
                    <dd>
                      <a
                        href={zaloBaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563eb] hover:underline"
                      >
                        Chat Zalo tư vấn
                      </a>
                    </dd>
                  </div>
                ) : null}
                {siteHasMessenger(site) ? (
                  <div>
                    <dt className="font-semibold text-slate-900">Messenger</dt>
                    <dd>
                      <a
                        href={messengerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563eb] hover:underline"
                      >
                        Nhắn Messenger
                      </a>
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="font-semibold text-slate-900">Khu vực phục vụ</dt>
                  <dd>{siteSettings.serviceAreaText}</dd>
                </div>
                {siteSettings.addressText ? (
                  <div>
                    <dt className="font-semibold text-slate-900">Địa chỉ</dt>
                    <dd>{siteSettings.addressText}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              {defaultSiteSettings.disclaimer}
            </p>
            <p className="text-sm text-slate-600">
              Xem thêm{" "}
              <Link href="/faq" className="font-semibold text-[#2563eb] hover:underline">
                câu hỏi thường gặp
              </Link>{" "}
              hoặc{" "}
              <Link href="/" className="font-semibold text-[#2563eb] hover:underline">
                bảng giá trang chủ
              </Link>
              .
            </p>
          </div>

          <div id="lead-form-contact" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Gửi yêu cầu tư vấn</h2>
            <p className="mt-2 text-sm text-slate-600">
              Điền thông tin — tôi liên hệ lại qua điện thoại hoặc Zalo.
            </p>
            <div className="mt-6">
              <LeadForm defaultNeed="Liên hệ trang /lien-he" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
