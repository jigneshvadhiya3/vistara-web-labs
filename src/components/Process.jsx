import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { process } from '../data/site';
import s from './Process.module.css';

const W = 1200;
const H = 240;
const pts = process.map((_, i) => {
  const x = 70 + (i * (W - 140)) / (process.length - 1);
  const y = H / 2 + Math.sin((i / (process.length - 1)) * Math.PI * 2 - Math.PI / 2) * -62;
  return { x, y };
});

// Smooth curve through the points (Catmull-Rom converted to cubic Bézier).
const pathD = pts.reduce((d, p, i, a) => {
  if (i === 0) return `M${p.x},${p.y}`;
  const p0 = a[i - 2] || a[i - 1];
  const p1 = a[i - 1];
  const p3 = a[i + 1] || p;
  const c1 = { x: p1.x + (p.x - p0.x) / 6, y: p1.y + (p.y - p0.y) / 6 };
  const c2 = { x: p.x - (p3.x - p1.x) / 6, y: p.y - (p3.y - p1.y) / 6 };
  return `${d} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p.x},${p.y}`;
}, '');

function Stage({ i }) {
  const st = process[i];
  return (
    <div className={s.stage} key={i}>
      <p className={s.num}>
        Stage {String(i + 1).padStart(2, '0')} <span>of {String(process.length).padStart(2, '0')}</span>
      </p>
      <h3>{st.name}</h3>
      <p className={s.text}>{st.text}</p>
      <p className={s.dlabel}>Deliverables</p>
      <ul className={s.deliv}>
        {st.deliverables.map((d, k) => (
          <li key={d} style={{ '--k': k }}>
            <Check size={14} aria-hidden="true" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Process() {
  const [active, setActive] = useState(0);
  const t = active / (process.length - 1);

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(process.length - 1, a + 1)); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
  };

  return (
    <section id="process" className="section">
      <div className="wrap">
        <div className={s.head}>
          <p className="kicker reveal">My process</p>
          <h2 className="h-section reveal" style={{ '--d': '80ms' }}>Good Websites Don&apos;t Happen by Accident.</h2>
          <p className="lede reveal" style={{ '--d': '160ms' }}>
            Every successful website begins with understanding, moves through thoughtful design, and comes to life
            through careful development.
          </p>
        </div>

        {/* Desktop: orbital journey */}
        <div className={`${s.map} reveal`}>
          <svg viewBox={`0 0 ${W} ${H}`} className={s.svg} aria-hidden="true" preserveAspectRatio="none">
            <defs>
              <linearGradient id="journeyGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#58d9e8" />
                <stop offset=".5" stopColor="#648cff" />
                <stop offset="1" stopColor="#9275ff" />
              </linearGradient>
              <filter id="journeyGlow" x="-10%" y="-50%" width="120%" height="200%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            <path d={pathD} className={s.track} />
            <path d={pathD} pathLength="1" className={s.glowLine} style={{ strokeDashoffset: 1 - t }} filter="url(#journeyGlow)" />
            <path d={pathD} pathLength="1" className={s.progress} style={{ strokeDashoffset: 1 - t }} />
          </svg>
          <div className={s.nodes} role="tablist" aria-label="Process stages" onKeyDown={onKey}>
            {process.map((st, i) => (
              <button
                key={st.name}
                type="button"
                role="tab"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                className={`${s.node} ${i <= active ? s.passed : ''} ${i === active ? s.on : ''}`}
                style={{ left: `${(pts[i].x / W) * 100}%`, top: `${(pts[i].y / H) * 100}%` }}
                onClick={() => setActive(i)}
              >
                <span className={s.dot}>{String(i + 1).padStart(2, '0')}</span>
                <span className={`${s.name} ${pts[i].y < H / 2 ? s.above : ''}`}>{st.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={`${s.panel} glass reveal`} role="tabpanel" aria-live="polite">
          <Stage i={active} />
          <div className={s.nav}>
            <button type="button" onClick={() => setActive((a) => a - 1)} disabled={active === 0} aria-label="Previous stage" data-magnetic>
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => setActive((a) => a + 1)} disabled={active === process.length - 1} aria-label="Next stage" data-magnetic>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Mobile: vertical journey */}
        <ol className={s.vertical}>
          {process.map((st, i) => (
            <li key={st.name} className={`${i <= active ? s.passed : ''} ${i === active ? s.on : ''}`}>
              <button type="button" onClick={() => setActive(i)} aria-expanded={i === active}>
                <span className={s.dot}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.vName}>{st.name}</span>
              </button>
              {i === active && (
                <div className={`${s.vPanel} glass`}>
                  <Stage i={i} />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
