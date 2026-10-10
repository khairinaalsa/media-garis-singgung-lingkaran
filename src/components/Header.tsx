import { useReducedMotion } from '../lib/useReducedMotion';

const NAV: [string, string][] = [
  ['Misi', '#misi'],
  ['Konsep', '#konsep'],
  ['Simulasi', '#simulasi'],
  ['Eksperimen', '#eksperimen'],
  ['Soal', '#soal'],
  ['Tantangan', '#tantangan'],
  ['Evaluasi', '#evaluasi'],
];

export default function Header() {
  const reduced = useReducedMotion();
  return (
    <header className="sticky top-0 z-50 border-b border-[#24466E] bg-[#16324F]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
            <circle cx="20" cy="20" r="17" fill="none" stroke="#F8FAFC" strokeWidth="3.5" />
            <g>
              {!reduced && (
                <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="7s" repeatCount="indefinite" />
              )}
              <line x1="20" y1="6" x2="20" y2="34" stroke="#F97316" strokeWidth="3" />
              <line x1="6" y1="20" x2="34" y2="20" stroke="#F8FAFC" strokeWidth="3" />
            </g>
            <circle cx="20" cy="20" r="4.5" fill="#F8FAFC" />
          </svg>
          <span className="leading-tight">
            <span className="font-display block text-[15px] font-extrabold tracking-tight text-[#F8FAFC]">
              LINGKARAN <span className="text-[#F97316]">LAB</span>
            </span>
            <span className="block font-mono text-[9.5px] tracking-[0.14em] text-[#8FB0D6] uppercase">
              Garis Singgung Persekutuan
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navigasi utama">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-1.5 text-[13.5px] font-semibold text-[#DCE7F3] transition-colors hover:bg-[#24466E] hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#evaluasi"
          className="hidden items-center gap-2 rounded-lg border border-[#F97316] px-3.5 py-1.5 font-mono text-[10.5px] font-bold tracking-[0.12em] text-[#F97316] uppercase transition-colors hover:bg-[#F97316] hover:text-white sm:flex"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[#F97316] transition-colors group-hover:bg-white" aria-hidden="true" />
          Dashboard
        </a>
      </div>
    </header>
  );
}
