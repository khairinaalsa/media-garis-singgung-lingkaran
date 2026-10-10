import MachineSVG from './MachineSVG';
import Marquee from './Marquee';
import { fmt, segLen } from '../lib/geometry';

export default function Landing() {
  return (
    <>
      <section id="home" className="grid-tex-dark relative overflow-hidden bg-[#16324F] text-[#F8FAFC]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(37,99,235,0.28),transparent_55%)]" aria-hidden="true" />
        <svg className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] opacity-[0.08]" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#F8FAFC" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#F8FAFC" strokeWidth="1" />
        </svg>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#24466E] bg-[#0F2440] px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#8FB0D6] uppercase">
              <span className="inline-block h-2 w-2 rounded-full bg-[#F97316]" aria-hidden="true" />
              Media Pembelajaran Matematika · Lingkaran
            </p>

            <h1 className="font-display text-[clamp(2.4rem,6.8vw,4.6rem)] leading-[0.96] font-extrabold tracking-tight uppercase">
              <span className="block">
                Lingkaran<span className="text-[#F97316]"> Lab</span>
              </span>
              <span className="mt-2 block text-[15px] font-semibold tracking-normal normal-case sm:text-[17px] lg:text-lg">
                <span className="text-[#8FB0D6]">Eksplorasi garis singgung persekutuan lingkaran melalui sistem sabuk-puli</span>{' '}
                <span className="text-[#F8FAFC]">robot presisi Formulatrix, Salatiga</span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-[#C6D6E8]">
              Matematika tidak hanya ada di buku. Di laboratorium robotika{' '}
              <strong className="font-semibold text-white">Formulatrix</strong> Salatiga, timing belt yang
              meneruskan putaran motor ke puli lengan membentuk{' '}
              <strong className="font-semibold text-[#FB923C]">garis singgung persekutuan</strong>. Kamu akan
              bermain peran sebagai insinyur muda: ukur, simulasi, hitung, dan pasang sabuk yang tepat.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#simulasi"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#F97316] px-7 py-3.5 font-display text-base font-bold tracking-tight text-white uppercase shadow-[0_12px_28px_-10px_rgba(249,115,22,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#EA580C]"
              >
                Mulai Simulasi
                <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M10 3v14M4 11l6 6 6-6" />
                </svg>
              </a>
              <a
                href="#misi"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#3A5A7E] px-6 py-3.5 font-display text-base font-bold tracking-tight text-[#DCE7F3] uppercase transition-colors hover:border-[#8FB0D6] hover:text-white"
              >
                Baca Misi
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className="rounded-lg border border-[#24466E] bg-[#0F2440] px-3 py-1.5 font-mono text-[11.5px] font-semibold text-[#8FB0D6]">
                L<sub>luar</sub> = √(d² − (r₁ − r₂)²)
              </span>
              <span className="rounded-lg border border-[#24466E] bg-[#0F2440] px-3 py-1.5 font-mono text-[11.5px] font-semibold text-[#8FB0D6]">
                L<sub>dalam</sub> = √(d² − (r₁ + r₂)²)
              </span>
            </div>
          </div>

          {/* visual utama: lengan robot + overlay garis matematika */}
          <div className="panel-navy p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#8FB0D6] uppercase">
                Lengan robot R-03 · Formulatrix
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-[#1C3D63] px-2.5 py-1 font-mono text-[10px] font-bold text-[#FB923C]">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#F97316]" aria-hidden="true" />
                SABUK AKTIF
              </span>
            </div>
            <div className="rounded-xl border border-[#24466E] bg-[#0F2440]">
              <MachineSVG R={34} r={22} d={100} mode="luar" animate labels construction className="h-auto w-full" scheme="navy" />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] font-semibold text-[#8FB0D6]">
              <span>r₁ = 34 · r₂ = 22 · d = 100 cm</span>
              <span className="text-[#FB923C]">L = {fmt(segLen(34, 22, 100, 'luar'))} cm</span>
              <span className="text-[#60A5FA]">⟳⟳ puli searah</span>
            </div>
          </div>
        </div>
      </section>
      <Marquee />
    </>
  );
}
