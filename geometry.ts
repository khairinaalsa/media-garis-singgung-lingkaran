export type Mode = 'luar' | 'dalam';
export type Pt = [number, number];

const TAU = Math.PI * 2;

/**
 * Panjang bagian lurus sabuk (segaris singgung persekutuan).
 * luar  : l = sqrt(d^2 - (R - r)^2)
 * dalam : l = sqrt(d^2 - (R + r)^2)
 * NaN jika tidak ada garis singgungnya.
 */
export function segLen(R: number, r: number, d: number, mode: Mode): number {
  const k = mode === 'luar' ? Math.abs(R - r) : R + r;
  const v = d * d - k * k;
  if (v < -1e-9) return NaN;
  return Math.sqrt(Math.max(0, v));
}

/** keberadaan: 'ada' (2 garis), 'satu' (1 garis), 'tidak' (0 garis) */
export function existence(R: number, r: number, d: number, mode: Mode): 'ada' | 'satu' | 'tidak' {
  const k = mode === 'luar' ? Math.abs(R - r) : R + r;
  if (d > k + 1e-9) return 'ada';
  if (Math.abs(d - k) <= 1e-9) return 'satu';
  return 'tidak';
}

export interface MachineGeom {
  valid: boolean;
  single: boolean;
  A: Pt; // titik singgung puli 1 (garis atas)
  B: Pt; // titik singgung puli 2 (garis atas)
  C: Pt; // titik singgung puli 2 (garis bawah)
  D: Pt; // titik singgung puli 1 (garis bawah)
  E: Pt; // titik segitiga bantu
  l: number;
  beltPath: string | null;
  P1: Pt;
  P2: Pt;
  nA: Pt; // normal satuan di titik A (untuk offset label)
}

const norm = (a: number) => {
  a = a % TAU;
  return a < 0 ? a + TAU : a;
};
const ang = (p: Pt, o: Pt) => Math.atan2(p[1] - o[1], p[0] - o[0]);
const add = (p: Pt, q: Pt): Pt => [p[0] + q[0], p[1] + q[1]];
const mul = (p: Pt, s: number): Pt => [p[0] * s, p[1] * s];

/**
 * Sampel titik-titik busur dari sudut a0 ke a1 lewat sudut aThrough.
 * Koordinat layar (y ke bawah) — sudut bertambah = searah jarum jam.
 */
function arcPts(cx: number, cy: number, rad: number, a0: number, a1: number, aThrough: number, n = 28): Pt[] {
  const A0 = norm(a0);
  const A1 = norm(a1);
  const AT = norm(aThrough);
  const spanInc = (A1 - A0 + TAU) % TAU || TAU;
  const toAT = (AT - A0 + TAU) % TAU;
  const inc = toAT > 1e-9 && toAT < spanInc - 1e-9;
  const span = inc ? spanInc : TAU - spanInc;
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const a = A0 + (inc ? 1 : -1) * span * (i / n);
    pts.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
  }
  return pts;
}

/**
 * Geometri sabuk-puli lengkap. P1 di (0,0) radius R, P2 di (d,0) radius r.
 * Sabuk = 2 ruas garis singgung + 2 busur (disampel jadi polyline agar mudah dianimasikan).
 */
export function machineGeom(R: number, r: number, d: number, mode: Mode): MachineGeom {
  const P1: Pt = [0, 0];
  const P2: Pt = [d, 0];
  const l = segLen(R, r, d, mode);
  const g: MachineGeom = {
    valid: false, single: false,
    A: P1, B: P2, C: P2, D: P1, E: P1,
    l, beltPath: null, P1, P2, nA: [0, -1],
  };
  if (!isFinite(l)) return g;
  if (l < 1e-9) { g.single = true; return g; }

  let A: Pt, B: Pt, C: Pt, D: Pt, E: Pt, nA: Pt;
  if (mode === 'luar') {
    const s = (R - r) / d;
    nA = [s, -l / d];
    A = mul(nA, R);
    B = add(P2, mul(nA, r));
    C = add(P2, mul([s, l / d], r));
    D = mul([s, l / d], R);
    E = mul(nA, R - r); // O1E = R - r (bisa negatif jika r > R)
  } else {
    const s = (R + r) / d;
    nA = [s, -l / d];
    A = mul(nA, R);
    B = add(P2, mul([-s, l / d], r));
    C = add(P2, mul([-s, -l / d], r));
    D = mul([s, l / d], R);
    E = mul(nA, R + r); // perpanjangan radius, O1E = R + r
  }

  const arc2 = arcPts(d, 0, r, ang(B, P2), ang(C, P2), 0).slice(1);
  const arc1 = arcPts(0, 0, R, ang(D, P1), ang(A, P1), Math.PI).slice(1);
  const pts: Pt[] = [A, B, ...arc2, D, ...arc1];
  g.beltPath = 'M ' + pts.map((p) => `${p[0].toFixed(3)} ${p[1].toFixed(3)}`).join(' L ') + ' Z';
  g.valid = true;
  g.A = A; g.B = B; g.C = C; g.D = D; g.E = E; g.nA = nA;
  return g;
}

/** Format angka gaya Indonesia: koma desimal. */
export function fmt(x: number, dec = 2): string {
  if (!isFinite(x)) return '—';
  const r = Math.round(x);
  if (Math.abs(x - r) < 0.005) return String(r);
  return x.toFixed(dec).replace('.', ',');
}
