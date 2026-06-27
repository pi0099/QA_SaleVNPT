import { permanentRedirect } from "next/navigation";

/** Trang Quận 12 đã gộp vào /wifi-vnpt — redirect SEO-friendly */
export default function WifiVnptQuan12Redirect() {
  permanentRedirect("/wifi-vnpt#khu-vuc-phuc-vu");
}
