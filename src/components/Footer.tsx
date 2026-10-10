export default function Footer() {
  return (
    <footer className="border-t border-[#24466E] bg-[#0F2440] text-[#8FB0D6]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold tracking-tight text-[#F8FAFC] uppercase">
            Lingkaran <span className="text-[#F97316]">Lab</span>
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed">
            Media pembelajaran <strong className="font-semibold text-[#E2E8F0]">garis singgung persekutuan dua
            lingkaran</strong> (luar &amp; dalam) melalui simulasi sabuk-puli (timing belt) robot presisi.
          </p>
          <p className="mt-3 font-mono text-[11px] leading-relaxed">
            Latar cerita: Formulatrix — perusahaan teknologi robotika di Salatiga yang memproduksi robot presisi
            tinggi untuk laboratorium. Angka pada simulasi adalah contoh belajar.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#60A5FA] uppercase">Kunci rumus</p>
          <div className="mt-3 space-y-2.5 font-mono text-[13px]">
            <p className="border-l-2 border-[#60A5FA] pl-3 text-[#C6D6E8]">
              luar&nbsp;&nbsp;· L = √(d² − (r₁ − r₂)²)
            </p>
            <p className="border-l-2 border-[#F97316] pl-3 text-[#C6D6E8]">
              dalam · L = √(d² − (r₁ + r₂)²)
            </p>
            <p className="pt-1 text-[11px]">
              d = jarak pusat · r₁, r₂ = jari-jari · L = panjang garis singgung persekutuan
            </p>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#60A5FA] uppercase">Prinsip pembelajaran</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-lg border border-[#24466E] bg-[#16324F] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#C6D6E8]">
              Contextual Teaching &amp; Learning
            </span>
            <span className="rounded-lg border border-[#24466E] bg-[#16324F] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#C6D6E8]">
              Problem Based Learning
            </span>
            <span className="rounded-lg border border-[#24466E] bg-[#16324F] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#C6D6E8]">
              Inquiry + Gamifikasi
            </span>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed">
            Matematika dikaitkan dengan industri nyata, siswa bereksplorasi, menemukan hubungan rumus dan
            fenomena, lalu mengevaluasi diri lewat dashboard.
          </p>
        </div>
      </div>

      <div className="border-t border-[#1E3A5F]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-6">
          <p className="font-mono text-[11px]">Matematika · Lingkaran — untuk kelas IX SMP / X SMA</p>
          <p className="font-mono text-[11px]">dibuat dengan sabuk, puli &amp; Pythagoras · Salatiga</p>
        </div>
      </div>
    </footer>
  );
}
