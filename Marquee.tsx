const ITEMS = [
  'SABUK LURUS — PULI SEARAH — PERSEKUTUAN LUAR',
  'L = √(d² − (r₁ − r₂)²)',
  'SABUK SILANG — PULI BERLAWANAN — PERSEKUTUAN DALAM',
  'L = √(d² − (r₁ + r₂)²)',
  'SATU SABUK · DUA RUMUS · SATU MESIN',
];

export default function Marquee({ invert = false }: { invert?: boolean }) {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className={`marquee overflow-hidden border-y border-[#24466E] ${
        invert ? 'bg-[#F8FAFC] text-[#16324F]' : 'bg-[#0F2440] text-[#DCE7F3]'
      }`}
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className={`flex items-center gap-4 px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.16em] whitespace-nowrap ${
                  item.includes('√') ? (invert ? 'text-[#2563EB]' : 'text-[#FB923C]') : ''
                }`}
              >
                {item}
                <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 ${invert ? 'fill-[#16324F]' : 'fill-[#DCE7F3]'}`} aria-hidden="true">
                  <path d="M6 0l6 6-6 6-6-6z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
