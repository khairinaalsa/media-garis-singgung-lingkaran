import Reveal from './Reveal';

const LANTAIAN: [string, string, string][] = [
  ['01', 'Konsep', '#konsep'],
  ['02', 'Simulasi', '#simulasi'],
  ['03', 'Eksperimen', '#eksperimen'],
  ['04', 'Soal', '#soal'],
  ['05', 'Tantangan', '#tantangan'],
  ['06', 'Evaluasi', '#evaluasi'],
];

export default function Misi() {
  return (
    <section id="misi" className="grid-tex bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.22em] text-[#2563EB] uppercase">
            Misi Pembelajaran · Gamifikasi
          </p>
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.04] font-extrabold tracking-tight text-[#16324F] uppercase">
            Kamu: insinyur muda Divisi Robotika
          </h2>
        </Reveal>

        <Reveal delay={40}>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            <strong className="font-semibold text-[#16324F]">Formulatrix</strong> adalah perusahaan teknologi di
            Salatiga yang memproduksi <strong className="font-semibold text-[#16324F]">robot presisi tinggi untuk
            laboratorium</strong>. Robot presisi seperti ini umumnya memakai sistem{' '}
            <strong className="font-semibold text-[#2563EB]">sabuk-puli (belt-pulley)</strong> untuk menggerakkan
            lengannya secara presisi: <em>motor memutar satu puli, lalu sabuk (timing belt) meneruskan gerakan ke
            puli lain yang ukurannya bisa berbeda</em>. Dan ada{' '}
            <strong className="font-semibold text-[#F97316]">dua cara pemasangan sabuk</strong> yang umum dipakai.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal delay={80}>
            <div className="panel relative overflow-hidden p-6 sm:p-7">
              <div className="absolute inset-y-0 left-0 w-1.5 bg-[#F97316]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#F97316] uppercase">
                ⚠ Misi Teknisi · Prioritas Tinggi
              </p>
              <div className="mt-3">
                <p className="text-[16px] leading-relaxed text-[#334155]">
                  <strong className="font-semibold text-[#16324F]">Robot R-03</strong> di sel perakitan mengalami{' '}
                  <strong className="font-semibold text-[#16324F]">penggantian timing belt</strong>. Robot tidak
                  dapat dikalibrasi sampai panjang bagian lurus sabuk diketahui.
                </p>
                <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#64748B] uppercase">
                    Tugas kamu
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#16324F]">
                    Menentukan <strong className="font-semibold text-[#2563EB]">panjang sabuk yang tepat</strong>{' '}
                    dengan menghitung garis singgung persekutuan dua puli — lalu buktikan lewat simulasi.
                  </p>
                </div>
              </div>
              <a
                href="#konsep"
                className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-[#F97316] px-6 py-3 font-display text-[15px] font-bold tracking-tight text-white uppercase shadow-[0_10px_22px_-10px_rgba(249,115,22,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#EA580C]"
              >
                Lanjutkan Misi
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M3 10h14M11 4l6 6-6 6" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="panel p-6 sm:p-7">
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#64748B] uppercase">
                Rute misi
              </p>
              <ol className="mt-4 space-y-2.5">
                {LANTAIAN.map(([no, nama, href]) => (
                  <li key={no}>
                    <a
                      href={href}
                      className="group flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 transition-colors hover:border-[#2563EB] hover:bg-white"
                    >
                      <span className="font-mono text-[13px] font-bold text-[#94A3B8] transition-colors group-hover:text-[#2563EB]">
                        {no}
                      </span>
                      <span className="text-[14.5px] font-semibold text-[#16324F]">{nama}</span>
                      <span className="ml-auto font-mono text-[12px] text-[#94A3B8] transition-transform group-hover:translate-x-1 group-hover:text-[#2563EB]">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-[#E2E8F0] pt-3 font-mono text-[11px] leading-relaxed text-[#64748B]">
                Setiap tahap tercatat di <a href="#evaluasi" className="font-bold text-[#2563EB] hover:underline">dashboard kemajuan</a> — selesaikan semuanya untuk
                gelar <strong className="text-[#F97316]">TEKNISI MUDA MATEMATIKA</strong>.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
