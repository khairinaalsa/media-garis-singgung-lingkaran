import { useState } from 'react';
import Reveal from './Reveal';
import { useProgress } from '../lib/progress';

interface SoalQuiz {
  q: string;
  opts: string[];
  ans: number;
}

const QUIZ: SoalQuiz[] = [
  {
    q: 'Sabuk yang tidak bersilangan termasuk…',
    opts: ['Garis singgung persekutuan luar', 'Garis singgung persekutuan dalam', 'Diameter lingkaran', 'Tali busur'],
    ans: 0,
  },
  {
    q: 'Jika jarak pusat puli semakin besar, maka panjang bagian lurus sabuk…',
    opts: ['Bertambah', 'Berkurang', 'Tetap', 'Tergantung arah putaran'],
    ans: 0,
  },
  {
    q: 'Dua puli berputar berlawanan arah dengan sabuk disilangkan. Jenis garis singgungnya…',
    opts: ['Persekutuan dalam', 'Persekutuan luar', 'Dua-duanya', 'Tidak ada garis singgung'],
    ans: 0,
  },
  {
    q: 'r₁ = 21 cm, r₂ = 5 cm, d = 20 cm, sabuk lurus. Panjang garis singgung persekutuan luarnya…',
    opts: ['12 cm', '16 cm', '20 cm', '26 cm'],
    ans: 0,
  },
  {
    q: 'r₁ = 8 cm, r₂ = 4 cm, d = 20 cm, sabuk silang. Panjang garis singgung persekutuan dalamnya…',
    opts: ['16 cm', '12 cm', '20 cm', '8 cm'],
    ans: 0,
  },
  {
    q: 'Dua lingkaran berjari-jari 6 cm dan 4 cm dengan jarak pusat tepat 10 cm. Banyak garis singgung persekutuan dalamnya…',
    opts: ['1', '2', '0', '4'],
    ans: 0,
  },
];

const LETTERS = ['A', 'B', 'C', 'D'];

export default function Evaluasi() {
  const { progress, set, reset } = useProgress();
  const [picked, setPicked] = useState<(number | null)[]>(() => QUIZ.map(() => null));

  const answered = picked.filter((p) => p !== null).length;
  const score = picked.reduce<number>((acc, p, i) => acc + (p === QUIZ[i].ans ? 1 : 0), 0);
  const livePct = answered > 0 ? Math.round((score / answered) * 100) : 0;
  const quizPct = answered === QUIZ.length ? livePct : 0;

  const pick = (qi: number, oi: number) => {
    setPicked((prev) => {
      if (prev[qi] !== null) return prev;
      const next = [...prev];
      next[qi] = oi;
      const s = next.reduce<number>((acc, p, i) => acc + (p === QUIZ[i].ans ? 1 : 0), 0);
      const a = next.filter((p) => p !== null).length;
      if (a === QUIZ.length) set({ quiz: Math.round((s / QUIZ.length) * 100) });
      return next;
    });
  };

  const stages: { nama: string; nilai: string; ok: boolean; persen?: number }[] = [
    { nama: 'Konsep', nilai: progress.konsep ? 'Selesai' : 'Belum', ok: progress.konsep },
    { nama: 'Simulasi', nilai: progress.simulasi ? 'Selesai' : 'Belum', ok: progress.simulasi },
    { nama: 'Eksperimen', nilai: progress.eksperimen ? 'Selesai' : 'Belum', ok: progress.eksperimen },
    { nama: 'Quiz', nilai: answered ? `${livePct}%` : 'Belum', ok: quizPct >= 80, persen: answered ? livePct : 0 },
  ];
  const allDone = progress.konsep && progress.simulasi && progress.eksperimen && quizPct >= 80;

  return (
    <section id="evaluasi" className="grid-tex-dark border-t border-[#24466E] bg-[#16324F] text-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.22em] text-[#F97316] uppercase">
            06 · Evaluasi Akhir
          </p>
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.04] font-extrabold tracking-tight uppercase">
            Ujian sertifikasi teknisi
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* quiz */}
          <div className="space-y-4">
            {QUIZ.map((s, qi) => {
              const p = picked[qi];
              const done = p !== null;
              return (
                <Reveal key={qi} delay={qi * 50}>
                  <div className="panel-navy p-5">
                    <p className="text-[14.5px] leading-snug font-semibold text-[#E2E8F0]">
                      <span className="mr-2 font-mono text-[#8FB0D6]">{qi + 1}.</span>
                      {s.q}
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {s.opts.map((o, oi) => {
                        let cls = 'border-[#24466E] bg-transparent text-[#C6D6E8] hover:border-[#8FB0D6] hover:text-white';
                        if (done) {
                          if (oi === s.ans) cls = 'border-emerald-400 bg-emerald-400/15 text-emerald-300';
                          else if (oi === p) cls = 'border-[#F97316] bg-[#F97316]/15 text-[#FB923C] line-through';
                          else cls = 'border-[#1E3A5F] text-[#5c7899]';
                        }
                        return (
                          <button
                            key={oi}
                            disabled={done}
                            onClick={() => pick(qi, oi)}
                            className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2 text-left text-[13px] font-semibold transition-colors disabled:cursor-default ${cls}`}
                          >
                            <span className="font-mono text-[11.5px] font-bold text-[#8FB0D6]">{LETTERS[oi]}.</span>
                            {o}
                          </button>
                        );
                      })}
                    </div>
                    {done && (
                      <p className={`mt-2.5 font-mono text-[11.5px] font-bold ${p === s.ans ? 'text-emerald-300' : 'text-[#FB923C]'}`}>
                        {p === s.ans ? '✔ Benar.' : '✘ Kurang tepat — jawabannya ditandai hijau.'}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* dashboard */}
          <Reveal delay={120}>
            <div className="panel-navy sticky top-24 p-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#8FB0D6] uppercase">Progress</p>
                <button
                  onClick={() => {
                    reset();
                    setPicked(QUIZ.map(() => null));
                  }}
                  className="font-mono text-[10px] font-bold tracking-[0.1em] text-[#5c7899] uppercase transition-colors hover:text-[#FB923C]"
                >
                  ↺ Reset
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {stages.map((s) => (
                  <div key={s.nama} className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-[11px] font-bold ${
                        s.ok ? 'border-emerald-400 bg-emerald-400/20 text-emerald-300' : 'border-[#24466E] text-[#5c7899]'
                      }`}
                    >
                      {s.ok ? '✓' : '·'}
                    </span>
                    <span className="w-24 text-[13.5px] font-semibold text-[#E2E8F0]">{s.nama}</span>
                    <span className={`font-mono text-[12px] font-bold ${s.ok ? 'text-emerald-300' : 'text-[#5c7899]'}`}>{s.nilai}</span>
                    {s.persen !== undefined && (
                      <span className="ml-auto h-1.5 w-16 overflow-hidden rounded-full bg-[#1E3A5F]">
                        <span className="block h-full rounded-full bg-[#F97316] transition-all duration-500" style={{ width: `${s.persen}%` }} />
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div
                className={`mt-6 rounded-xl border-2 px-4 py-4 text-center ${
                  allDone ? 'border-[#F97316] bg-[#F97316]/10' : 'border-[#24466E] bg-[#0F2440]'
                }`}
              >
                <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#8FB0D6] uppercase">Status</p>
                <p className={`font-display mt-1.5 text-[19px] leading-tight font-extrabold uppercase ${allDone ? 'text-[#FB923C]' : 'text-[#E2E8F0]'}`}>
                  {allDone ? '★ Teknisi Muda Matematika' : 'Teknisi Belajar'}
                </p>
                <p className="mt-1.5 font-mono text-[10.5px] leading-relaxed text-[#8FB0D6]">
                  {allDone
                    ? 'Selamat! Semua tahap selesai dengan quiz ≥ 80%. Robot R-03 resmi kamu rawat.'
                    : 'Selesaikan Konsep, Simulasi, Eksperimen, dan raih quiz ≥ 80% untuk gelar ini.'}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
