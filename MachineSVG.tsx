import { machineGeom, type Mode, type Pt, fmt } from '../lib/geometry';
import { useReducedMotion } from '../lib/useReducedMotion';

interface Props {
  R: number;
  r: number;
  d: number;
  mode: Mode;
  animate?: boolean;
  construction?: boolean;
  labels?: boolean;
  tangentLine?: boolean;
  scheme?: 'light' | 'navy';
  className?: string;
}

const PALETTE = {
  light: {
    pulley: '#E8EEF6',
    rim: '#16324F',
    spoke: '#16324F',
    hub: '#16324F',
    belt: '#16324F',
    stitch: '#F97316',
    center: '#94A3B8',
    tangent: '#F97316',
    constr: '#2563EB',
    text: '#16324F',
    dot: '#F97316',
  },
  navy: {
    pulley: '#1C3D63',
    rim: '#E2E8F0',
    spoke: '#8FB0D6',
    hub: '#E2E8F0',
    belt: '#E2E8F0',
    stitch: '#0F2440',
    center: '#3A5A7E',
    tangent: '#F97316',
    constr: '#60A5FA',
    text: '#E2E8F0',
    dot: '#FB923C',
  },
};

const BELT_SPEED = 24; // cm per detik (linier, sabuk tidak melicik)

export default function MachineSVG({
  R, r, d, mode,
  animate = true, construction = false, labels = true, tangentLine = true,
  scheme = 'light', className,
}: Props) {
  const c = PALETTE[scheme];
  const reduced = useReducedMotion();
  const anim = animate && !reduced;
  const g = machineGeom(R, r, d, mode);

  const maxR = Math.max(R, r);
  const pad = labels ? 14 : 9;
  const minX = -R - pad;
  const maxX = d + r + pad;
  const minY = -maxR - pad;
  const maxY = maxR + pad;
  const vbW = maxX - minX;
  const fs = vbW * 0.042;
  const beltW = Math.max(1.6, vbW * 0.03);
  const halo = { paintOrder: 'stroke' as const, stroke: scheme === 'light' ? '#F8FAFC' : '#0F2440', strokeWidth: fs * 0.38 };

  const T1 = Math.max(0.7, (2 * Math.PI * R) / BELT_SPEED);
  const T2 = Math.max(0.7, (2 * Math.PI * r) / BELT_SPEED);

  const perp = (p: Pt): Pt => [-p[1], p[0]];
  const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
  const len = (p: Pt) => Math.hypot(p[0], p[1]);
  const unit = (p: Pt): Pt => {
    const L = len(p) || 1;
    return [p[0] / L, p[1] / L];
  };

  // posisi label
  let labelR: Pt = [0, 0], labelr: Pt = [0, 0], labelL: Pt = [0, 0], labelE: Pt = [0, 0];
  if (g.valid) {
    const u1 = g.nA; // arah P1 -> A
    let p1 = perp(u1);
    if (p1[0] * (g.P2[0] - g.P1[0]) > 0) p1 = [-p1[0], -p1[1]];
    labelR = [g.A[0] * 0.55 + p1[0] * fs * 1.9, g.A[1] * 0.55 + p1[1] * fs * 1.9];

    const u2: Pt = mode === 'luar' ? g.nA : [-g.nA[0], g.nA[1]]; // arah P2 -> B
    // label r: tepat di luar titik singgung B, searah radius (bebas dari sabuk)
    labelr = [g.P2[0] + u2[0] * (r + fs * 1.35), g.P2[1] + u2[1] * (r + fs * 1.35)];

    const mid: Pt = [(g.A[0] + g.B[0]) / 2, (g.A[1] + g.B[1]) / 2];
    let n = perp(unit(sub(g.B, g.A)));
    const m: Pt = [d / 2, 0];
    const away = sub(mid, m);
    if (n[0] * away[0] + n[1] * away[1] < 0) n = [-n[0], -n[1]];
    labelL = [mid[0] + n[0] * fs * 2.1, mid[1] + n[1] * fs * 2.1];

    const uE = unit(sub(g.P2, g.E));
    const vE = unit(sub(g.P1, g.E));
    labelE = [g.E[0] + (uE[0] + vE[0]) * -fs * 1.4, g.E[1] + (uE[1] + vE[1]) * -fs * 1.4 - fs * 0.6];
  }

  // tanda siku-siku di E
  let rightAngle = '';
  if (construction && g.valid) {
    const uE = unit(sub(g.P2, g.E));
    const vE = unit(sub(g.P1, g.E));
    const s = fs * 1.15;
    const a: Pt = [g.E[0] + uE[0] * s, g.E[1] + uE[1] * s];
    const b: Pt = [g.E[0] + uE[0] * s + vE[0] * s, g.E[1] + uE[1] * s + vE[1] * s];
    const c2: Pt = [g.E[0] + vE[0] * s, g.E[1] + vE[1] * s];
    rightAngle = `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]} L ${c2[0]} ${c2[1]}`;
  }

  const kLabel = mode === 'luar' ? `|R − r|` : `R + r`;

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      className={className}
      role="img"
      aria-label={`Ilustrasi dua puli bersambung sabuk, ${mode === 'luar' ? 'garis singgung persekutuan luar' : 'garis singgung persekutuan dalam'}`}
    >
      {/* garis poros P1 - P2 */}
      <line x1={0} y1={0} x2={d} y2={0} stroke={c.center} strokeWidth={fs * 0.14} strokeDasharray={`${fs * 0.5} ${fs * 0.4}`} />

      {/* puli 1 */}
      <g transform={`translate(0 0)`}>
        <circle r={R} fill={c.pulley} stroke={c.rim} strokeWidth={beltW * 0.55} />
        <g key={`sp1-${T1.toFixed(2)}`}>
          {anim && (
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur={`${T1}s`} repeatCount="indefinite" />
          )}
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line
              key={a}
              x1={0} y1={0}
              x2={Math.cos((a * Math.PI) / 180) * (R - beltW * 1.3)}
              y2={Math.sin((a * Math.PI) / 180) * (R - beltW * 1.3)}
              stroke={c.spoke} strokeWidth={beltW * 0.32}
            />
          ))}
          <circle r={Math.max(R * 0.16, beltW * 1.1)} fill={c.hub} />
          <circle r={Math.max(R * 0.05, beltW * 0.35)} fill={c.pulley} />
        </g>
      </g>

      {/* puli 2 — berlawanan arah bila sabuk disilangkan */}
      <g transform={`translate(${d} 0)`}>
        <circle r={r} fill={c.pulley} stroke={c.rim} strokeWidth={beltW * 0.55} />
        <g key={`sp2-${T2.toFixed(2)}-${mode}`}>
          {anim && (
            <animateTransform
              attributeName="transform" type="rotate"
              from={mode === 'dalam' ? '360 0 0' : '0 0 0'}
              to={mode === 'dalam' ? '0 0 0' : '360 0 0'}
              dur={`${T2}s`} repeatCount="indefinite"
            />
          )}
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line
              key={a}
              x1={0} y1={0}
              x2={Math.cos((a * Math.PI) / 180) * (r - beltW * 1.3)}
              y2={Math.sin((a * Math.PI) / 180) * (r - beltW * 1.3)}
              stroke={c.spoke} strokeWidth={beltW * 0.32}
            />
          ))}
          <circle r={Math.max(r * 0.16, beltW * 1.1)} fill={c.hub} />
          <circle r={Math.max(r * 0.05, beltW * 0.35)} fill={c.pulley} />
        </g>
      </g>

      {/* radius ke titik singgung */}
      {g.valid && (
        <g stroke={c.text} strokeWidth={fs * 0.11} opacity={0.8}>
          <line x1={0} y1={0} x2={g.A[0]} y2={g.A[1]} />
          <line x1={d} y1={0} x2={g.B[0]} y2={g.B[1]} />
        </g>
      )}

      {/* sabuk */}
      {g.beltPath && (
        <>
          <path d={g.beltPath} fill="none" stroke={c.belt} strokeWidth={beltW} strokeLinejoin="round" strokeLinecap="round" />
          {anim ? (
            <path
              d={g.beltPath} fill="none" stroke={c.stitch} strokeWidth={beltW * 0.34}
              strokeLinecap="round" strokeDasharray={`${beltW * 1.1} ${beltW * 1.25}`}
              className="belt-dash"
            />
          ) : (
            <path
              d={g.beltPath} fill="none" stroke={c.stitch} strokeWidth={beltW * 0.34}
              strokeLinecap="round" strokeDasharray={`${beltW * 1.1} ${beltW * 1.25}`}
            />
          )}
        </>
      )}

      {/* ruas garis singgung utama (l) */}
      {g.valid && tangentLine && (
        <>
          <line x1={g.A[0]} y1={g.A[1]} x2={g.B[0]} y2={g.B[1]} stroke={c.tangent} strokeWidth={fs * 0.22} strokeLinecap="round" />
          {[g.A, g.B, g.C, g.D].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={fs * 0.3} fill={c.dot} stroke={c.pulley} strokeWidth={fs * 0.08} />
          ))}
        </>
      )}

      {/* segitiga siku-siku bantu */}
      {construction && g.valid && (
        <g>
          <line x1={g.P1[0]} y1={g.P1[1]} x2={g.E[0]} y2={g.E[1]} stroke={c.constr} strokeWidth={fs * 0.16} strokeDasharray={`${fs * 0.4} ${fs * 0.3}`} />
          <line x1={g.E[0]} y1={g.E[1]} x2={g.P2[0]} y2={g.P2[1]} stroke={c.constr} strokeWidth={fs * 0.16} strokeDasharray={`${fs * 0.4} ${fs * 0.3}`} />
          <path d={rightAngle} fill="none" stroke={c.constr} strokeWidth={fs * 0.14} />
          <circle cx={g.E[0]} cy={g.E[1]} r={fs * 0.22} fill={c.constr} />
        </g>
      )}

      {labels && (
        <g fill={c.text} style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          <text {...halo} x={0} y={fs * 2.4} textAnchor="middle" fontSize={fs * 0.9} fontWeight={600}>P₁</text>
          <text {...halo} x={d} y={fs * 2.4} textAnchor="middle" fontSize={fs * 0.9} fontWeight={600}>P₂</text>
          <text {...halo} x={d / 2} y={fs * 3.6} textAnchor="middle" fontSize={fs} fontWeight={700} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            d = {fmt(d)}
          </text>
          {g.valid && (
            <>
              <text {...halo} x={labelR[0]} y={labelR[1]} textAnchor="middle" fontSize={fs * 0.95} fontWeight={700}>R = {fmt(R)}</text>
              <text {...halo} x={labelr[0]} y={labelr[1]} textAnchor="middle" fontSize={fs * 0.95} fontWeight={700}>r = {fmt(r)}</text>
              <text {...halo} x={labelL[0]} y={labelL[1]} textAnchor="middle" fontSize={fs * 1.05} fontWeight={700} fill={c.tangent} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                l = {fmt(g.l)}
              </text>
              {construction && (
                <text {...halo} x={labelE[0]} y={labelE[1]} textAnchor="middle" fontSize={fs * 0.78} fontWeight={600} fill={c.constr} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {kLabel} = {fmt(mode === 'luar' ? Math.abs(R - r) : R + r)}
                </text>
              )}
            </>
          )}
        </g>
      )}
    </svg>
  );
}
