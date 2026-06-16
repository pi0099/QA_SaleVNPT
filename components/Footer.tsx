export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-[13px] text-slate-500 sm:px-6 sm:text-sm">
        <p>
          Designed &amp; Developed by{" "}
          <a
            href="https://quyentech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-sky-700 hover:decoration-sky-400/60"
          >
            QUYEN TECH
          </a>
        </p>
      </div>
    </footer>
  );
}
