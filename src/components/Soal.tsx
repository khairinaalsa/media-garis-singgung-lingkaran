import { useState } from 'react';
import Reveal from './Reveal';
import MachineSVG from './MachineSVG';
import { fmt, segLen } from '../lib/geometry';
import { useProgress } from '../lib/progress';

const RA = 14;
const RB = 8;
const D = 40;
const ANSWER = segLen(RA, RB, D, 'luar'); // √1564 ≈ 39,55

export default function Soal() {
  const { set } = useProgress();
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'salah' | 'benar'>('idle');

  const check = () => {
    const v = Number(input.replace(/\s/g, '').replace(',', '.'));
    if (!isFinite(v)) {
      setStatus('salah');
      return;
    }
    if (Math.abs(v - ANSWER) <= 0.15) {
      setStatus('benar');
      set({ soal: true });
    } else {
      setStatus('salah');
    }
  };

  return (
    <section id="soal" className="border-y border-[#E2E8F0] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.22em] text-[#2563EB] uppercase">
            04 · Soal Cerita Kontekstual
          </p>
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.04] font-extrabold tracking-tight text-[#16324F] uppercase">
            Kasus: penggantian timing belt Formulatrix
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal delay={80}>
            <div className="panel h-full overflow-hidden">
              <div className="border-b border-[#E2E8F0] bg-[#16324F] px-5 py-3">
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#8FB0D6] uppercase">
                  Lengan robot · Formulatrix, Salatiga
                </p>
              </div>
              <div className="p-5">
                <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC]">
                  <MachineSVG R={RA} r={RB} d={D} mode="luar" animate labels={false} construction={false} className="h-auto w-full" />
                </div>
                <dl className="mt-4 space-y-2 rounded-xl bg-[#F8FAFC] p-4 font-mono text-[13.5px] font-semibold text-[#16324F]">
                  <div className="flex justify-between">
                    <dt className="text-[#64748B]">Radius puli motor (r₁)</dt>
                    <dd>{RA} cm</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#64748B]">Radius puli lengan (r₂)</dt>
                    <dd>{RB} cm</dd>
                  </div>
                  <div className="flex justify-between border-t border-[#E2E8F0] pt-2">
                    <dt className="text-[#64748B]">Jarak pusat (d)</dt>
                    <dd>{D} cm</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="panel flex h-full flex-col p-6">
              <p className="text-[15.5px] leading-relaxed text-[#334155]">
                Formulatrix mengganti timing belt lengan robot di sel kalibrasi. Dua puli memiliki ukuran
                berbeda — motor memutar puli pertama, sabuk meneruskan gerakan ke puli lengan. Tim R&amp;D perlu
                mengetahui <strong className="font-semibold text-[#16324F]">panjang bagian lurus sabuk</strong>{' '}
                agar robot bekerja optimal.
              </p>

              <div className="mt-4 rounded-xl border-l-4 border-[#F97316] bg-[#FFF4EA] px-4 py-3">
                <p className="font-mono text-[10.5px] font-bold tracking-[0.16em] text-[#F97316] uppercase">Pertanyaan</p>
                <p className="mt-1 text-[15px] font-semibold text-[#16324F]">
                  Hitung panjang <em>garis singgung persekutuan luar</em> kedua puli itu!
                </p>
              </div>

              <div className="mt-5 flex flex-1 flex-col justify-end">
                <label htmlFor="soal-jawaban" className="font-mono text-[11px] font-bold tracking-[0.14em] text-[#64748B] uppercase">
                  Jawabanmu (cm — pakai koma atau titik)
                </label>
                <div className="mt-2 flex gap-2.5">
                  <input
                    id="soal-jawaban"
                    value={input}
                    disabled={status === 'benar'}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && check()}
                    placeholder="cth. 39,55"
                    inputMode="decimal"
                    className="w-full max-w-[220px] rounded-xl border-2 border-[#CBD5E1] bg-white px-4 py-2.5 font-mono text-[15px] font-semibold text-[#16324F] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#2563EB] disabled:bg-[#F8FAFC]"
                  />
                  <button
                    onClick={check}
                    disabled={status === 'benar'}
                    className="rounded-xl bg-[#F97316] px-5 py-2.5 font-display text-[14px] font-bold tracking-tight text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-[#EA580C] disabled:translate-y-0 disabled:cursor-default disabled:bg-[#16324F]"
                  >
                    {status === 'benar' ? 'Selesai' : 'Cek Jawaban'}
                  </button>
                </div>

                <div className="mt-3 min-h-[64px]">
                  {status === 'benar' && (
                    <div className="animate-[popin_0.45s_ease] rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3">
                      <p className="font-mono text-[13px] font-bold text-emerald-700">✔ BENAR! L ≈ {fmt(ANSWER)} cm</p>
                      <p className="mt-1 font-mono text-[12px] leading-relaxed text-emerald-800/80">
                        L = √(40² − (14 − 8)²) = √(1600 − 36) = √1564 = 2√391 ≈ {fmt(ANSWER)} cm.
                        Timing belt siap dipasang — Robot R-03 kembali dikalibrasi!
                      </p>
                    </div>
                  )}
                  {status === 'salah' && (
                    <div className="animate-[popin_0.45s_ease] rounded-xl border-2 border-[#F97316]/50 bg-[#FFF4EA] px-4 py-3">
                      <p className="font-mono text-[12.5px] font-bold text-[#C2410C]">✘ Belum tepat — cek kembali perhitunganmu.</p>
                      <p className="mt-1 font-mono text-[12px] leading-relaxed text-[#7C2D12]">
                        Petunjuk: pakai rumus <strong>luar</strong> L = √(d² − (r₁ − r₂)²) = √(1600 − 6²) = √1564.
                      </p>
                    </div>
                  )}
                  {status === 'idle' && (
                    <p className="font-mono text-[11.5px] leading-relaxed text-[#94A3B8]">
                      Tulis hasilmu (bulatkan hingga 2 desimal, mis. 39,55), lalu tekan CEK JAWABAN.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
