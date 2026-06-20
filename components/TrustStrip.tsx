const trustItems = [
  { icon: "👤", text: "Nhân viên VNPT hỗ trợ trực tiếp" },
  { icon: "📍", text: "Kiểm tra hạ tầng theo địa chỉ" },
  { icon: "📋", text: "Tư vấn gói phù hợp" },
  { icon: "🏠", text: "Hỗ trợ đăng ký tận nơi" },
  { icon: "💬", text: "Có Zalo/Call nhanh" },
];

export default function TrustStrip() {
  return (
    <div className="border-b border-sky-100/80 bg-white/80">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <ul className="flex gap-3 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] sm:flex-wrap sm:justify-center">
          {trustItems.map((item) => (
            <li
              key={item.text}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm sm:text-sm"
            >
              <span aria-hidden>{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
