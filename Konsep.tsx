import { useEffect, useRef } from 'react';
import Reveal from './Reveal';
import MachineSVG from './MachineSVG';
import { useProgress } from '../lib/progress';
import { useSpeak } from '../lib/speech';

function VoiceButton({ text, tone = 'blue' }: { text: string; tone?: 'blue' | 'orange' }) {
  const { supported, speaking, speak, stop } = useSpeak();
  return (
    <button
      onClick={() => (speaking ? stop() : speak(text))}
      disabled={!supported}
      title={supported ? 'Putar penjelasan suara' : 'Browser tidak mendukung suara'}
      aria-label={speaking ? 'Hentikan penjelasan suara' : 'Putar penjelasan suara'}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
        speaking
          ? 'speaking border-[#F97316] bg-[#F97316] text-white'
          : tone === 'blue'
            ? 'border-[#2563EB] bg-white text-[#2563EB] hover:bg-[#2563EB] hover:text-white'
            : 'border-[#F97316] bg-white text-[#F97316] hover:bg-[#F97316] hover:text-white'
      } ${supported ? '' : 'cursor-not-allowed opacity-40'}`}
    >
      {speaking ? (
        <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
          <rect x="5" y="4" width="3" height="12" rx="1" />
          <rect x="12" y="4" width="3" height="12" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
          <path d="M3 8v4a1 1 0 001 1h2.6L10.4 15.7c.6.5 1.6.1 1.6-.7V5c0-.8-1-1.2-1.6-.7L6.6 8.7H4a1 1 0 00-1 1z" />
          <path d="M14 7.2a3.6 3.6 0 010 5.6M15.8 5a6.4 6.4 0 010 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

const CARDS = [
  {
    no: 'K-1',
    judul: 'Garis Singgung Persekutuan LUAR',
    sabuk: 'SABUK LURUS · TIDAK BERSILANGAN',
    warna: '#2563EB',
    soft: '#EFF4FF',
    arah: '⟳ ⟳ searah',
    mesin: { R: 18, r: 8, d: 46, mode: 'luar' as const },
    titik: [
      'Sabuk terpasang lurus, tidak melewati daerah antara kedua puli.',
      'Digunakan ketika kedua puli berputar searah (sistem sabuk terbuka).',
      'Selisih jari-jari (r₁ − r₂) membentuk satu sisi segitiga bantu.',
    ],
    rumus: 'L = √(d² − (r₁ − r₂)²)',
    syarat: 'd > |r₁ − r₂|',
    voice:
      'Garis singgung persekutuan luar. Sabuk terpasang lurus sehingga tidak bersilangan, dan kedua puli berputar searah. Perhatikan: rumusnya memakai selisih jari-jari, r satu dikurangi r dua, karena bagian sabuk lurus tidak melewati daerah di antara kedua pusat.',
  },
  {
    no: 'K-2',
    judul: 'Garis Singgung Persekutuan DALAM',
    sabuk: 'SABUK SILANG · BERSILANGAN',
    warna: '#F97316',
    soft: '#FFF4EA',
    arah: '⟳ ⟲ berlawanan',
    mesin: { R: 8, r: 4, d: 20, mode: 'dalam' as const },
    titik: [
      'Sabuk sengaja disilangkan di antara kedua puli.',
      'Digunakan ketika kedua puli harus berputar berlawanan arah.',
      'Jumlah jari-jari (r₁ + r₂) membentuk satu sisi segitiga bantu.',
    ],
    rumus: 'L = √(d² − (r₁ + r₂)²)',
    syarat: 'd > r₁ + r₂',
    voice:
      'Garis singgung persekutuan dalam. Sabuk disilangkan sehingga kedua puli berputar berlawanan arah. Rumusnya memakai jumlah jari-jari, r satu ditambah r dua, karena garis bantu harus melintasi daerah di antara kedua pusat.',
  },
];

export default function Konsep() {
  const { set } = useProgress();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.35) {
          set({ konsep: true });
          ob.disconnect();
        }
      },
      { threshold: [0.35] },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [set]);

  return (
    <section id="konsep" ref={ref} className="border-y border-[#E2E8F0] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.22em] text-[#2563EB] uppercase">
                01 · Konsep
              </p>
              <h2 className="font-display max-w-2xl text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.04] font-extrabold tracking-tight text-[#16324F] uppercase">
                Mengenal dua jenis garis singgung
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-[#64748B]">
              Bagian <strong className="font-semibold text-[#16324F]">lurus</strong> dari sabuk = garis singgung.
              Dua cara pemasangan sabuk → dua rumus. Klik <strong className="font-semibold text-[#F97316]">ikon suara</strong> untuk penjelasan lisan.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.no} delay={i * 120}>
              <article className="panel overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-5 py-3.5" style={{ background: c.warna }}>
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-white/15 px-2 py-0.5 font-mono text-[11px] font-bold text-white">{c.no}</span>
                    <h3 className="font-display text-[17px] font-extrabold tracking-tight text-white uppercase">{c.judul}</h3>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-white/90">{c.arah}</span>
                </div>

                <div className="rounded-b-xl m-3 border border-dashed border-[#CBD5E1] bg-[#F8FAFC]">
                  <MachineSVG R={c.mesin.R} r={c.mesin.r} d={c.mesin.d} mode={c.mesin.mode} animate labels construction className="h-auto w-full" />
                </div>

                <div className="space-y-4 px-5 pb-5">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-md px-2.5 py-1 font-mono text-[10.5px] font-bold tracking-[0.1em]"
                      style={{ background: c.soft, color: c.warna }}
                    >
                      {c.sabuk}
                    </span>
                    <VoiceButton text={c.voice} tone={i === 0 ? 'blue' : 'orange'} />
                  </div>

                  <ul className="space-y-2 text-[14px] leading-relaxed text-[#334155]">
                    {c.titik.map((t) => (
                      <li key={t} className="flex gap-2.5">
                        <span className="mt-[7px] inline-block h-2 w-2 shrink-0 rotate-45" style={{ background: c.warna }} aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="grid gap-3 sm:grid-cols-[1.35fr_1fr]">
                    <div className="rounded-xl bg-[#16324F] px-4 py-3 text-center">
                      <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#8FB0D6] uppercase">Rumus</p>
                      <p className="mt-1 font-mono text-[15px] font-bold text-white">
                        {c.rumus.split('√')[0]}
                        <span style={{ color: '#FB923C' }}>√</span>
                        <span>
                          (d² − <span style={{ color: i === 0 ? '#7DA2CC' : '#FDBA74' }}>({i === 0 ? 'r₁ − r₂' : 'r₁ + r₂'})²</span>)
                        </span>
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                      <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#64748B] uppercase">Syarat</p>
                      <p className="mt-1 font-mono text-[15px] font-bold text-[#16324F]">{c.syarat}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="panel mt-6 flex flex-col gap-4 bg-[#F8FAFC] p-5 sm:flex-row sm:items-center">
            <span className="font-mono text-[11px] font-bold tracking-[0.18em] whitespace-nowrap text-[#16324F] uppercase">
              🔍 Kenapa segitiga siku-siku?
            </span>
            <p className="text-[14px] leading-relaxed text-[#334155]">
              Gambar garis bantu lewat pusat puli kedua <em>sejajar</em> dengan garis singgung → terbentuk segitiga
              siku-siku dengan sisi miring <strong className="font-mono text-[#16324F]">d</strong>, sisi{' '}
              <strong className="font-mono text-[#16324F]">(r₁ ∓ r₂)</strong>, dan sisi <strong className="font-mono text-[#F97316]">L</strong>.
              Maka: <strong className="font-mono text-[#2563EB]">L² = d² − (r₁ ∓ r₂)²</strong> (Teorema Pythagoras).
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
