import { useState } from 'react';
import Reveal from './Reveal';
import MachineSVG from './MachineSVG';
import { fmt, segLen, type Mode } from '../lib/geometry';
import { useProgress } from '../lib/progress';

interface Exp {
  no: string;
  judul: string;
  pertanyaan: string;
  before: { R: number; r: number; d: number; mode: Mode };
  after: { R: number; r: number; d: number; mode: Mode };
  delta: string;
  kesimpulan: string;
}

const EXPERIMENTS: Exp[] = [
  {
    no: 'E-1',
    judul: 'Puli A diperbesar',
    pertanyaan: 'Apa yang terjadi jika radius Puli A diperbesar dari 10 cm menjadi 20 cm?',
    before: { R: 10, r: 5, d: 50, mode: 'luar' },
    after: { R: 20, r: 5, d: 50, mode: 'luar' },
    delta: 'Selisih (r₁ − r₂) membesar → panjang sabuk lurus justru MEMENDEK.',
    kesimpulan: 'Radius berubah → panjang sabuk lurus berubah (bisa memendek!).',
  },
  {
    no: 'E-2',
    judul: 'Jarak pusat ditambah',
    pertanyaan: 'Apa yang terjadi jika jarak pusat diperbesar dari 50 cm menjadi 80 cm?',
    before: { R: 10, r: 5, d: 50, mode: 'luar' },
    after: { R: 10, r: 5, d: 80, mode: 'luar' },
    delta: 'Sisi miring segitiga (d) memanjang → panjang sabuk lurus ikut MEMANJANG.',
    kesimpulan: 'Jarak pusat bertambah → panjang sabuk lurus meningkat.',
  },
  {
    no: 'E-3',
    judul: 'Jenis sabuk diubah',
    pertanyaan: 'Apa yang terjadi jika sabuk lurus diganti sabuk silang (parameter sama)?',
    before: { R: 10, r: 5, d: 50, mode: 'luar' },
    after: { R: 10, r: 5, d: 50, mode: 'dalam' },
    delta: 'Rumus berubah: selisih (r₁ − r₂) diganti jumlah (r₁ + r₂) → hasil berbeda.',
    kesimpulan: 'Jenis sabuk memengaruhi rumus: luar pakai selisih, dalam pakai jumlah.',
  },
];

function fmtDelta(a: number, b: number) {
  const diff = b - a;
  const s = Math.abs(diff) < 0.005 ? '0' : fmt(Math.abs(diff));
  return diff > 0 ? `+${s} cm` : `−${s} cm`;
}

export default function Eksperimen() {
  const { set } = useProgress();
  const [done, setDone] = useState<Record<string, boolean>>({ 'E-1': false, 'E-2': false, 'E-3': false });
  const [tried, setTried] = useState<Record<string, boolean>>({ 'E-1': false, 'E-2': false, 'E-3': false });

  const allDone = done['E-1'] && done['E-2'] && done['E-3'];
  const toggle = (id: string) => {
    setDone((p) => {
      const next = { ...p, [id]: !p[id] };
      if (next['E-1'] && next['E-2'] && next['E-3']) set({ eksperimen: true });
      return next;
    });
  };

  return (
    <section id="eksperimen" className="grid-tex bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.22em] text-[#2563EB] uppercase">
            03 · Eksperimen Matematika · Inquiry Learning
          </p>
          <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.04] font-extrabold tracking-tight text-[#16324F] uppercase">
            Bagaimana perubahan ukuran memengaruhi panjang sabuk?
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#64748B]">
            Tiga percobaan singkat. Tekan <strong className="font-semibold text-[#F97316]">COBA</strong> untuk melihat
            hasilnya, amati perubahannya, lalu centang kesimpulanmu.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {EXPERIMENTS.map((e, i) => {
            const lb = segLen(e.before.R, e.before.r, e.before.d, e.before.mode);
            const la = segLen(e.after.R, e.after.r, e.after.d, e.after.mode);
            const state = tried[e.no] ? e.after : e.before;
            return (
              <Reveal key={e.no} delay={i * 110}>
                <article className="panel flex h-full flex-col p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#16324F] px-2 py-0.5 font-mono text-[11px] font-bold text-white">{e.no}</span>
                    <h3 className="font-display text-[15px] font-extrabold tracking-tight text-[#16324F] uppercase">{e.judul}</h3>
                  </div>

                  <div className="mt-3 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC]">
                    <MachineSVG R={state.R} r={state.r} d={state.d} mode={state.mode} animate={false} labels construction={false} className="h-auto w-full" />
                  </div>

                  <div className="mt-3 flex items-center justify-between rounded-lg bg-[#F8FAFC] px-3 py-2 font-mono text-[11.5px] font-semibold text-[#334155]">
                    <span>
                      r₁ {state.R} · r₂ {state.r} · d {state.d}
                    </span>
                    <span className="text-[#16324F]">
                      {state.mode === 'luar' ? 'LUAR' : 'DALAM'}
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between rounded-lg border border-[#E2E8F0] px-3 py-2">
                    <span className="font-mono text-[10.5px] font-bold tracking-[0.12em] text-[#64748B] uppercase">Panjang sabuk</span>
                    <span className={`font-mono text-[16px] font-bold ${tried[e.no] ? 'text-[#F97316]' : 'text-[#16324F]'}`}>
                      {fmt(segLen(state.R, state.r, state.d, state.mode))} cm
                      {tried[e.no] && (
                        <span className="ml-2 rounded bg-[#EFF4FF] px-1.5 py-0.5 text-[11px] text-[#2563EB]">
                          {fmtDelta(lb, la)}
                        </span>
                      )}
                    </span>
                  </div>

                  <p className="mt-3 text-[13.5px] leading-snug text-[#334155]">{e.pertanyaan}</p>

                  <button
                    onClick={() => setTried((p) => ({ ...p, [e.no]: true }))}
                    disabled={tried[e.no]}
                    className={`mt-3 rounded-xl px-4 py-2.5 font-display text-[14px] font-bold tracking-tight uppercase transition-all ${
                      tried[e.no]
                        ? 'cursor-default border-2 border-[#2563EB] bg-[#EFF4FF] text-[#2563EB]'
                        : 'bg-[#2563EB] text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.8)] hover:-translate-y-0.5 hover:bg-[#1D4ED8]'
                    }`}
                  >
                    {tried[e.no] ? '✔ Sudah dicoba' : 'Coba'}
                  </button>

                  {tried[e.no] && (
                    <p className="mt-3 animate-[popin_0.45s_ease] rounded-lg border-l-4 border-[#2563EB] bg-[#EFF4FF] px-3 py-2 text-[12.5px] leading-snug text-[#1E3A8A]">
                      {e.delta}
                    </p>
                  )}

                  <label className="mt-4 flex cursor-pointer items-start gap-2.5 border-t border-[#E2E8F0] pt-3 select-none">
                    <input
                      type="checkbox"
                      checked={done[e.no]}
                      onChange={() => toggle(e.no)}
                      className="mt-0.5 h-4 w-4 accent-[#F97316]"
                    />
                    <span className="text-[13px] leading-snug font-semibold text-[#334155]">{e.kesimpulan}</span>
                  </label>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <div
            className={`mt-6 flex items-center gap-3 rounded-xl border-2 px-5 py-3.5 transition-colors ${
              allDone ? 'border-emerald-300 bg-emerald-50' : 'border-[#E2E8F0] bg-white'
            }`}
          >
            <span className="font-mono text-[12px] font-bold text-[#16324F]">
              {allDone ? '✔ Semua kesimpulan tercatat — tahap Eksperimen selesai!' : `Kesimpulan tercentang: ${Object.values(done).filter(Boolean).length}/3`}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
