import Link from "next/link";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import {
  getLocalService,
  localAreas,
  type LocalServiceSlug,
} from "@/lib/local-seo";

const productConfig: Record<
  LocalServiceSlug,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    anchorHref: string;
    proofPoints: string[];
    steps: string[];
    faq: { question: string; answer: string }[];
  }
> = {
  "wifi-vnpt": {
    eyebrow: "Dang ky online",
    title: "Lap WiFi VNPT online tai TP.HCM",
    subtitle:
      "Tu van goi Internet VNPT theo nhu cau su dung, khu vuc lap dat va ngan sach hang thang. Ho tro dang ky online, hen lich lap dat nhanh khi ha tang san sang.",
    anchorHref: "/#internet-gia-dinh",
    proofPoints: [
      "Tu van goi 300 Mbps, 500 Mbps hoac gan 1 Gbps theo so thiet bi",
      "Goi y WiFi Mesh cho nha nhieu tang, can ho rong hoac van phong nho",
      "Minh bach phi hoa mang, gia noi thanh/ngoai thanh va uu dai hien co",
    ],
    steps: [
      "Gui nhu cau qua Zalo, Messenger hoac hotline",
      "Kiem tra khu vuc lap dat va goi phu hop",
      "Xac nhan thong tin online va hen lich ky thuat",
    ],
    faq: [
      {
        question: "Dang ky WiFi VNPT online co can den cua hang khong?",
        answer:
          "Khong. Khach co the gui thong tin online, nhan tu van goi cuoc va hen lich lap dat truc tiep.",
      },
      {
        question: "Nen chay quang cao ve trang nao?",
        answer:
          "Nen chay ve trang /wifi-vnpt cho keyword chung, sau do dung cac trang khu vuc neu can noi dung dia phuong hon.",
      },
    ],
  },
  "sim-5g": {
    eyebrow: "SIM data online",
    title: "Dang ky SIM 5G VNPT online",
    subtitle:
      "Tu van SIM 5G, eSIM va goi data VNPT theo muc su dung moi ngay. Phu hop cho hoc tap, lam viec, livestream, di chuyen va du phong khi WiFi gap su co.",
    anchorHref: "/#sim-4g",
    proofPoints: [
      "Goi y goi data theo dung luong/ngay va chu ky su dung",
      "Ho tro nhu cau SIM vat ly hoac eSIM neu thiet bi phu hop",
      "Tu van online truoc khi dang ky de tranh chon sai goi",
    ],
    steps: [
      "Cho biet dong may va nhu cau data moi ngay",
      "Nhan goi y goi 5G/4G phu hop",
      "Xac nhan dang ky online va nhan huong dan kich hoat",
    ],
    faq: [
      {
        question: "Co nen chon SIM 5G neu khu vuc chua on dinh 5G?",
        answer:
          "Van co the chon goi phu hop, nhung nen kiem tra thiet bi, khu vuc su dung chinh va nhu cau data thuc te truoc.",
      },
      {
        question: "Trang nay phu hop cho Google Ads khong?",
        answer:
          "Co. Trang /sim-5g tap trung vao intent dang ky SIM/data nen phu hop hon homepage cho nhom quang cao SIM.",
      },
    ],
  },
  "camera-vnpt": {
    eyebrow: "Tu van online",
    title: "Lap Camera VNPT online cho nha va cua hang",
    subtitle:
      "Tu van camera trong nha, ngoai troi, luu cloud va goi Internet phu hop de camera hoat dong on dinh. Ho tro khach hang online tai TP.HCM.",
    anchorHref: "/#camera",
    proofPoints: [
      "Goi y vi tri dat camera de giam diem mu va mat ket noi",
      "Tu van goi Internet du upload cho camera cloud",
      "Phu hop gia dinh, cua hang nho, nha tro va van phong",
    ],
    steps: [
      "Gui so luong camera va khu vuc can quan sat",
      "Nhan goi y thiet bi, luu tru cloud va duong truyen",
      "Xac nhan online va hen lich lap dat/khao sat neu can",
    ],
    faq: [
      {
        question: "Camera cloud co lam cham mang khong?",
        answer:
          "Co the anh huong neu upload yeu hoac lap nhieu camera. Nen chon goi Internet theo so camera va chat luong hinh anh.",
      },
      {
        question: "Co can dia chi cua hang de SEO local khong?",
        answer:
          "Vi ban hang online, khong can dua dia chi cua hang neu khong co diem giao dich that. Nen tap trung vao khu vuc phuc vu va tu van online.",
      },
    ],
  },
};

export default function ProductLanding({
  serviceSlug,
}: {
  serviceSlug: LocalServiceSlug;
}) {
  const service = getLocalService(serviceSlug);
  const config = productConfig[serviceSlug];

  if (!service) return null;

  return (
    <>
      <div className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
                {config.eyebrow}
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                {config.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {config.subtitle}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  href={config.anchorHref}
                  eventName="landing_cta_click"
                  eventLabel={`${service.shortLabel} package list`}
                  service={service.slug}
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#2563eb] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
                >
                  Xem bang gia va goi phu hop
                </TrackedLink>
                <Link
                  href="/faq"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
                >
                  Xem cau hoi thuong gap
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Phu hop cho ban online va chay quang cao
              </h2>
              <ul className="mt-4 space-y-3">
                {config.proofPoints.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2563eb]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Section
        title={`Quy trinh dang ky ${service.shortLabel} online`}
        subtitle="Khach khong can den cua hang. Noi dung tren site nen thong nhat voi tracking cua Facebook Ads va Google Ads."
        contentClassName="!mt-8"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {config.steps.map((step, index) => (
            <div
              key={step}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[#2563eb]">
                {index + 1}
              </span>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-800">
                {step}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={`${service.shortLabel} theo khu vuc tai TP.HCM`}
        subtitle="Cac trang khu vuc giup Google hieu vung phuc vu va giup quang cao co landing page sat nhu cau hon."
        contentClassName="!mt-8"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {localAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/${service.slug}/${area.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              {service.shortLabel} {area.name}
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Cau hoi truoc khi chay ads"
        subtitle="Nhung cau tra loi nay giup tang do tin cay cho khach den tu Facebook va Google."
        contentClassName="!mt-8"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {config.faq.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-bold text-slate-900">{item.question}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
