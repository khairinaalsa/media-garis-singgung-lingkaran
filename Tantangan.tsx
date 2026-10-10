import { useState } from 'react';
import Reveal from './Reveal';
import MachineSVG from './MachineSVG';
import { fmt, segLen, type Mode } from '../lib/geometry';
import { useProgress } from '../lib/progress';

/* ── Level 1: identifikasi jenis ── */
const L1: { q: string; opts: string[]; ans: number }[] = [
  { q: 'Dua puli berputar searah dan sabuknya tidak bersilangan. Sabuk membentuk…', opts: ['garis singgung persekutuan luar', 'garis singgung persekutuan dalam'], ans: 0 },
  { q: 'Sabuk sengaja disilangkan sehingga puli berputar berlawanan. Jenisnya…', opts: ['garis singgung persekutuan dalam', 'garis singgung persekutuan luar'], ans: 0 },
  { q: 'Rumus L = √(d² − (r₁ + r₂)²) dipakai untuk…', opts: ['persekutuan dalam (jumlah radius)', 'persekutuan luar (selisih radius)'], ans: 0 },
];

/* ── Level 2: hitung panjang ── */
const L2_ANS = segLen(30, 10, 52, 'luar'); // √(52² − 20²) = √2304 = 48

export default function Tantangan() {
  const { set } = useProgress();

  /* level 1 */
  const [l1, setL1] = useState<(number | null)[]>([null, null, null]);
  const l1Done = l1.every((v, i) => v === L1[i].ans);

  /* level 2 */
  const [l2input, setL2input] = useState('');
  const [l2status, setL2status] = useState<'idle' | 'salah' | 'benar'>('idle');
  const checkL2 = () => {
    const v = Number(l2input.replace(/\s/g, '').replace(',', '.'));
    if (isFinite(v) && Math.abs(v - L2_ANS) <= 0.15) {
      setL2status('benar');
      set({ level2: true });
    } else setL2status('salah');
  };

  /* level 3 */
  const [eRa, setERa] = useState(30);
  const [eRb, setERb] = useState(20);
  const [eD, setED] = useState(60);
  const [eMode, setEMode] = useState<Mode>('luar');
  const [eTried, setETried] = useState(false);
  const eL = segLen(eRa, eRb, eD, eMode);
  const eValid = isFinite(eL) && eL >= 100;
  const simulate = () => {
    setETried(true);
    if (isFinite(eL) && eL >= 100) set({ level3: true });
  };

  return (
    <section id="tantangan" className="grid-tex bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.22em] text-[#2563EB] uppercase">
            05 · Tantangan Level
          </p>
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.04] font-extrabold tracking-tight text-[#16324F] uppercase">
            Naik pangkat: dari Pemula ke Engineer
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* LEVEL 1 */}
          <Reveal delay={60}>
            <article className={`panel h-full border-t-4 p-5 transition-colors ${l1Done ? 'border-t-emerald-500' : 'border-t-[#2563EB]'}`}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10.5px] font-bold tracking-[0.16em] text-[#64748B] uppercase">Level 1 · Pemula</p>
                {l1Done && <span className="rounded-md bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">✔ SELESAI</span>}
              </div>
              <h3 className="font-display mt-1 text-[17px] font-extrabold tracking-tight text-[#16324F] uppercase">Identifikasi jenis</h3>
              <div className="mt-4 space-y-4">
                {L1.map((s, qi) => {
                  const p = l1[qi];
                  return (
                    <div key={qi}>
                      <p className="text-[13.5px] leading-snug font-semibold text-[#334155]">
                        <span className="font-mono text-[#94A3B8]">{qi + 1}.</span> {s.q}
                      </p>
                      <div className="mt-2 grid gap-1.5">
                        {s.opts.map((o, oi) => {
                          let cls = 'border-[#CBD5E1] bg-white text-[#334155] hover:border-[#2563EB] hover:bg-[#EFF4FF]';
                          if (p !== null) {
                            if (oi === s.ans) cls = 'border-emerald-400 bg-emerald-50 text-emerald-800';
                            else if (oi === p) cls = 'border-[#F97316] bg-orange-50 text-[#C2410C] line-through';
                            else cls = 'border-[#E2E8F0] text-[#94A3B8]';
                          }
                          return (
                            <button
                              key={oi}
                              disabled={p !== null}
                              onClick={() => setL1((prev) => prev.map((v, i) => (i === qi ? oi : v)))}
                              className={`rounded-lg border px-3 py-1.5 text-left font-mono text-[12px] font-semibold transition-colors disabled:cursor-default ${cls}`}
                            >
                              {o}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {l1Done && (
                <p className="mt-4 animate-[popin_0.4s_ease] rounded-lg bg-emerald-50 px-3 py-2 font-mono text-[12px] font-bold text-emerald-700">
                  ✔ Level 1 selesai — kamu naik jadi TEKNISI.
                </p>
              )}
              {l1.every((v) => v !== null) && !l1Done && (
                <p className="mt-4 rounded-lg bg-orange-50 px-3 py-2 font-mono text-[12px] font-semibold text-[#C2410C]">
                  Ada jawaban salah — perhatikan bagian yang digarisbawahi hijau.
                </p>
              )}
            </article>
          </Reveal>

          {/* LEVEL 2 */}
          <Reveal delay={140}>
            <article className={`panel h-full border-t-4 p-5 ${l2status === 'benar' ? 'border-t-emerald-500' : 'border-t-[#F97316]'}`}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10.5px] font-bold tracking-[0.16em] text-[#64748B] uppercase">Level 2 · Teknisi</p>
                {l2status === 'benar' && <span className="rounded-md bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">✔ SELESAI</span>}
              </div>
              <h3 className="font-display mt-1 text-[17px] font-extrabold tracking-tight text-[#16324F] uppercase">Hitung panjang sabuk</h3>
              <div className="mt-4 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC]">
                <MachineSVG R={30} r={10} d={52} mode="luar" animate={false} labels={false} construction={false} className="h-auto w-full" />
              </div>
              <p className="mt-3 text-[13.5px] leading-snug font-semibold text-[#334155]">
                r₁ = 30 cm · r₂ = 10 cm · d = 52 cm · sabuk lurus. Berapa L?
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  value={l2input}
                  disabled={l2status === 'benar'}
                  onChange={(e) => {
                    setL2input(e.target.value);
                    if (l2status !== 'idle') setL2status('idle');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && checkL2()}
                  placeholder="L = … cm"
                  inputMode="decimal"
                  aria-label="Jawaban level 2"
                  className="w-full max-w-[150px] rounded-lg border-2 border-[#CBD5E1] px-3 py-2 font-mono text-[13.5px] font-semibold text-[#16324F] outline-none transition-colors focus:border-[#2563EB] disabled:bg-[#F8FAFC]"
                />
                <button
                  onClick={checkL2}
                  disabled={l2status === 'benar'}
                  className="rounded-lg bg-[#F97316] px-4 py-2 font-display text-[13px] font-bold tracking-tight text-white uppercase transition-colors hover:bg-[#EA580C] disabled:cursor-default disabled:bg-[#16324F]"
                >
                  Cek
                </button>
              </div>
              <div className="mt-3 min-h-[52px]">
                {l2status === 'benar' && (
                  <p className="animate-[popin_0.4s_ease] rounded-lg bg-emerald-50 px-3 py-2 font-mono text-[12px] font-bold text-emerald-700">
                    ✔ BENAR! √(52² − 20²) = √(2704 − 400) = √2304 = 48 cm. Naik pangkat: ENGINEER!
                  </p>
                )}
                {l2status === 'salah' && (
                  <p className="animate-[popin_0.4s_ease] rounded-lg bg-orange-50 px-3 py-2 font-mono text-[12px] font-semibold text-[#C2410C]">
                    ✘ Coba lagi: selisih radiusnya 20, sisi miringnya 52. Ingat kelipatan 5–12–13 → 20–48–52.
                  </p>
                )}
                {l2status === 'idle' && (
                  <p className="font-mono text-[11.5px] text-[#94A3B8]">Bulatkan bila perlu; ketelitian ± 0,15 cm.</p>
                )}
              </div>
            </article>
          </Reveal>

          {/* LEVEL 3 */}
          <Reveal delay={220}>
            <article className={`panel h-full border-t-4 p-5 ${eTried && eValid ? 'border-t-emerald-500' : 'border-t-[#16324F]'}`}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10.5px] font-bold tracking-[0.16em] text-[#64748B] uppercase">Level 3 · Engineer</p>
                {eTried && eValid && <span className="rounded-md bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">✔ LOLOS</span>}
              </div>
              <h3 className="font-display mt-1 text-[17px] font-extrabold tracking-tight text-[#16324F] uppercase">Rancang sistem sendiri</h3>
              <p className="mt-2 text-[13.5px] leading-snug font-semibold text-[#334155]">
                Buat sistem sabuk dengan panjang lurus <strong className="font-mono text-[#F97316]">minimal 100 cm</strong>.
              </p>
              <div className="mt-3 space-y-2.5">
                {(
                  [
                    ['Radius Puli A', eRa, setERa],
                    ['Radius Puli B', eRb, setERb],
                    ['Jarak pusat', eD, setED],
                  ] as const
                ).map(([label, val, setter]) => (
                  <div key={label} className="flex items-center gap-3">
                    <label className="w-28 font-mono text-[10.5px] font-bold tracking-[0.06em] text-[#64748B] uppercase">{label}</label>
                    <input
                      type="number"
                      min={5}
                      max={120}
                      value={val}
                      onChange={(e) => {
                        setter(Math.min(120, Math.max(5, Number(e.target.value) || 5)));
                        setETried(false);
                      }}
                      className="w-20 rounded-lg border-2 border-[#CBD5E1] px-2.5 py-1.5 font-mono text-[13px] font-semibold text-[#16324F] outline-none transition-colors focus:border-[#2563EB]"
                    />
                    <span className="font-mono text-[11px] text-[#94A3B8]">cm</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="w-28 font-mono text-[10.5px] font-bold tracking-[0.06em] text-[#64748B] uppercase">Jenis</span>
                  <div className="flex overflow-hidden rounded-lg border-2 border-[#CBD5E1]">
                    {(['luar', 'dalam'] as Mode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setEMode(m);
                          setETried(false);
                        }}
                        className={`px-3 py-1.5 font-mono text-[11px] font-bold uppercase transition-colors ${
                          eMode === m ? 'bg-[#16324F] text-white' : 'bg-white text-[#64748B] hover:bg-[#F1F5F9]'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={simulate}
                className="mt-4 w-full rounded-xl bg-[#16324F] px-4 py-2.5 font-display text-[14px] font-bold tracking-tight text-white uppercase transition-colors hover:bg-[#0F2440]"
              >
                Simulasikan
              </button>

              {eTried && (
                <div className="mt-3">
                  <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC]">
                    <MachineSVG R={eRa} r={eRb} d={eD} mode={eMode} animate labels={false} construction={false} className="h-auto w-full" />
                  </div>
                  {isFinite(eL) ? (
                    <p
                      className={`mt-2.5 animate-[popin_0.4s_ease] rounded-lg px-3 py-2 font-mono text-[12px] font-bold ${
                        eValid ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-[#C2410C]'
                      }`}
                    >
                      {eValid
                        ? `✔ SISTEM LOLOS — L = ${fmt(eL)} cm (≥ 100 cm). Desainmu disetujui Tim R&D Formulatrix!`
                        : `✘ L = ${fmt(eL)} cm — belum mencapai 100 cm. Perbesar d atau kurangi selisih/jumlah radius.`}
                    </p>
                  ) : (
                    <p className="mt-2.5 animate-[popin_0.4s_ease] rounded-lg bg-orange-50 px-3 py-2 font-mono text-[12px] font-bold text-[#C2410C]">
                      ⚠ Sistem tidak memungkinkan untuk parameter ini — cek syarat (d &gt; r₁ + r₂ jika sabuk dalam).
                    </p>
                  )}
                </div>
              )}
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
