import { useState } from 'react';
import MachineSVG from './MachineSVG';
import Reveal from './Reveal';
import { existence, fmt, segLen, type Mode } from '../lib/geometry';
import { useProgress } from '../lib/progress';

export default function Simulator() {
  const { set } = useProgress();
  const [mode, setMode] = useState<Mode>('luar');
  const [ra, setRa] = useState(40);
  const [rb, setRb] = useState(20);
  const [d, setD] = useState(100);
  const [showConstr, setShowConstr] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const touch = () => set({ simulasi: true });
  const l = segLen(ra, rb, d, mode);
  const ex = existence(ra, rb, d, mode);
  const invalid = ex === 'tidak';
  const borderline = ex === 'satu';

  const k = mode === 'luar' ? ra - rb : ra + rb;
  const steps = isFinite(l)
    ? [
        `L = √(d² − (${mode === 'luar' ? 'r₁ − r₂' : 'r₁ + r₂'})²)`,
        `  = √(${fmt(d)}² − (${fmt(ra)} ${mode === 'luar' ? '−' : '+'} ${fmt(rb)})²)`,
        `  = √(${fmt(d * d)} − ${fmt(Math.abs(k))}²)`,
        `  = √(${fmt(d * d)} − ${fmt(k * k)})`,
        `  = ${l === 0 ? '0 cm (puli bersinggungan)' : `√${fmt(d * d - k * k)} ≈ ${fmt(l)} cm`}`,
      ]
    : ['L = —', 'tidak ada nilai riil untuk konfigurasi ini'];

  return (
    <section id="simulasi" className="grid-tex-dark relative border-y border-[#24466E] bg-[#16324F] text-[#F8FAFC]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[repeating-linear-gradient(90deg,#F97316_0_18px,transparent_18px_34px)] opacity-70" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.22em] text-[#F97316] uppercase">
                02 · Simulasi Sabuk-Puli Robot
              </p>
              <h2 className="font-display text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.04] font-extrabold tracking-tight uppercase">
                Simulasi lengan robot
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-[#8FB0D6]">
              Geser jari-jari dan jarak pusat — sabuk, puli, dan rumus berubah langsung. Puli kecil selalu
              berputar lebih cepat: kecepatan sabuk sama.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          {/* canvas simulasi */}
          <Reveal delay={80}>
            <div className="panel-navy overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#24466E] px-4 py-3">
                <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#8FB0D6] uppercase">
                  Canvas simulasi · Robot R-03
                </span>
                <div className="flex gap-3 font-mono text-[10.5px] font-bold tracking-[0.08em] uppercase">
                  <label className="flex cursor-pointer items-center gap-1.5 text-[#8FB0D6] select-none">
                    <input type="checkbox" checked={showConstr} onChange={(e) => setShowConstr(e.target.checked)} className="h-4 w-4 accent-[#2563EB]" />
                    Segitiga bantu
                  </label>
                  <label className="flex cursor-pointer items-center gap-1.5 text-[#8FB0D6] select-none">
                    <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} className="h-4 w-4 accent-[#2563EB]" />
                    Label
                  </label>
                </div>
              </div>
              <div className="relative bg-[#0F2440]">
                <MachineSVG R={ra} r={rb} d={d} mode={mode} animate labels={showLabels} construction={showConstr} scheme="navy" className="h-auto w-full" />
                {invalid && (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="max-w-xs rounded-xl border-2 border-[#F97316] bg-[#0F2440]/95 px-4 py-3 text-center">
                      <p className="font-mono text-[12.5px] font-bold text-[#FB923C]">⚠ Sistem sabuk tidak memungkinkan</p>
                      <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-[#8FB0D6]">
                        {mode === 'dalam'
                          ? `d = ${fmt(d)} cm ≤ r₁ + r₂ = ${fmt(ra + rb)} cm — puli saling menyentuh/berpotongan, tidak ada garis singgung persekutuan dalam.`
                          : `d = ${fmt(d)} cm < |r₁ − r₂| = ${fmt(Math.abs(ra - rb))} cm — satu puli tersembunyi di dalam puli lain.`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* panel kendali + hasil */}
          <div className="space-y-5">
            <Reveal delay={140}>
              <div className="panel-navy p-5">
                <p className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#8FB0D6] uppercase">Jenis sabuk</p>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMode('luar');
                      touch();
                    }}
                    aria-pressed={mode === 'luar'}
                    className={`rounded-xl border-2 px-3 py-3 text-center transition-all ${
                      mode === 'luar'
                        ? 'border-[#2563EB] bg-[#2563EB] text-white shadow-[0_10px_22px_-10px_rgba(37,99,235,0.8)]'
                        : 'border-[#24466E] text-[#8FB0D6] hover:border-[#8FB0D6] hover:text-white'
                    }`}
                  >
                    <span className="font-display block text-[15px] font-extrabold uppercase">Sabuk Luar</span>
                    <span className="font-mono text-[10px] tracking-[0.08em] uppercase opacity-80">
                      garis singgung persekutuan luar · ⟳⟳
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setMode('dalam');
                      touch();
                    }}
                    aria-pressed={mode === 'dalam'}
                    className={`rounded-xl border-2 px-3 py-3 text-center transition-all ${
                      mode === 'dalam'
                        ? 'border-[#F97316] bg-[#F97316] text-white shadow-[0_10px_22px_-10px_rgba(249,115,22,0.8)]'
                        : 'border-[#24466E] text-[#8FB0D6] hover:border-[#8FB0D6] hover:text-white'
                    }`}
                  >
                    <span className="font-display block text-[15px] font-extrabold uppercase">Sabuk Dalam</span>
                    <span className="font-mono text-[10px] tracking-[0.08em] uppercase opacity-80">
                      garis singgung persekutuan dalam · ⟳⟲
                    </span>
                  </button>
                </div>

                <p className="mt-5 font-mono text-[11px] font-bold tracking-[0.18em] text-[#8FB0D6] uppercase">Parameter</p>
                <div className="mt-3 space-y-4">
                  <ParamSlider label="Puli motor (r₁)" value={ra} min={20} max={100} onChange={(v) => { setRa(v); touch(); }} />
                  <ParamSlider label="Puli lengan (r₂)" value={rb} min={20} max={100} onChange={(v) => { setRb(v); touch(); }} />
                  <ParamSlider label="Jarak pusat (d)" value={d} min={40} max={220} onChange={(v) => { setD(v); touch(); }} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="panel-navy p-5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#8FB0D6] uppercase">Hasil</p>
                  {invalid ? (
                    <span className="rounded-md bg-[#F97316]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#FB923C]">TIDAK MUNGKIN</span>
                  ) : borderline ? (
                    <span className="rounded-md bg-[#2563EB]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#93B4F5]">KASUS BATAS</span>
                  ) : (
                    <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">SISTEM AMAN</span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-[44px] leading-none font-extrabold tracking-tight text-[#F97316]">{fmt(l)}</span>
                  <span className="font-mono text-[13px] font-semibold text-[#8FB0D6]">{isFinite(l) ? 'cm — panjang bagian lurus sabuk' : ''}</span>
                </div>
                <div className="mt-3 space-y-0.5 border-l-2 border-[#24466E] pl-3">
                  {steps.map((s, i) => (
                    <p key={i} className={`font-mono text-[12.5px] leading-relaxed ${i === steps.length - 1 && isFinite(l) ? 'font-bold text-white' : 'text-[#8FB0D6]'}`}>
                      {s}
                    </p>
                  ))}
                </div>
                {borderline && (
                  <p className="mt-3 rounded-lg border border-[#2563EB]/40 bg-[#2563EB]/10 px-3 py-2 font-mono text-[11px] leading-relaxed text-[#93B4F5]">
                    Puli bersinggungan → tepat 1 garis singgung persekutuan, L = 0. Geser d agar sistem bekerja.
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParamSlider({
  label, value, min, max, onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <label className="font-mono text-[11px] font-bold tracking-[0.1em] text-[#C6D6E8] uppercase">{label}</label>
        <span className="font-mono text-[14px] font-bold text-[#F97316]">{fmt(value)} cm</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
      />
      <div className="flex justify-between font-mono text-[9.5px] text-[#3A5A7E]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
