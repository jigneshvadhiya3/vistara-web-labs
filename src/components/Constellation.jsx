import { useEffect, useMemo, useState } from 'react';
import { skills } from '../data/site';
import { Mark } from './Logo';
import s from './Constellation.module.css';

const byId = Object.fromEntries(skills.map((k) => [k.id, k]));

// Unique skill-to-skill edges.
const edges = (() => {
  const seen = new Set();
  const out = [];
  skills.forEach((a) =>
    a.links.forEach((bid) => {
      const key = [a.id, bid].sort().join('-');
      if (!seen.has(key) && byId[bid]) {
        seen.add(key);
        out.push([a.id, bid]);
      }
    })
  );
  return out;
})();

// Fixed sparkle positions so the render stays stable.
const sparkles = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 37.3 + 11) % 100,
  y: (i * 61.7 + 23) % 100,
  d: (i % 7) * 0.6,
  r: i % 5 === 0 ? 0.35 : 0.2,
}));

function useNarrow() {
  const q = '(max-width: 640px)';
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setNarrow(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return narrow;
}

export default function Constellation() {
  const narrow = useNarrow();
  const P = (k) => (narrow ? { x: k.mx, y: k.my } : { x: k.x, y: k.y });
  const [hover, setHover] = useState(null);
  const [pinned, setPinned] = useState(null);
  const active = hover || pinned;

  const linked = useMemo(() => {
    if (!active) return new Set();
    const set = new Set(byId[active].links);
    skills.forEach((k) => k.links.includes(active) && set.add(k.id));
    return set;
  }, [active]);

  const node = active ? byId[active] : null;

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div className={s.head}>
          <p className="kicker reveal">Capabilities</p>
          <h2 className="h-section reveal" style={{ '--d': '80ms' }}>Creative Thinking Meets Technical Craft.</h2>
          <p className="lede reveal" style={{ '--d': '160ms' }}>
            Every star is a capability we bring to a project. Hover or tap one to see how it connects.
          </p>
        </div>

        <div className={s.layout}>
          <div className={`${s.map} reveal`} onMouseLeave={() => setHover(null)}>
            <svg className={s.lines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {sparkles.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={p.r} className={s.sparkle} style={{ animationDelay: `${p.d}s` }} />
              ))}
              {skills.map((k) => (
                <line
                  key={`c-${k.id}`}
                  x1="50" y1="50" x2={P(k).x} y2={P(k).y}
                  className={`${s.spoke} ${active === k.id ? s.hot : ''}`}
                />
              ))}
              {edges.map(([a, b]) => {
                const on = active && (a === active || b === active);
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={P(byId[a]).x} y1={P(byId[a]).y} x2={P(byId[b]).x} y2={P(byId[b]).y}
                    className={`${s.edge} ${on ? s.hot : ''}`}
                  />
                );
              })}
            </svg>

            <button
              type="button"
              className={`${s.core} ${!active ? s.coreIdle : ''}`}
              onClick={() => setPinned(null)}
              aria-label="Vistara Web Labs, clear selection"
            >
              <Mark size={40} />
              <span>Vistara<br />Web Labs</span>
            </button>

            {skills.map((k, i) => {
              const { x, y } = P(k);
              const cls = [
                s.star,
                active === k.id ? s.active : '',
                linked.has(k.id) ? s.linked : '',
                active && active !== k.id && !linked.has(k.id) ? s.dim : '',
                x < 16 ? s.alignL : x > 84 ? s.alignR : '',
                y > 88 ? s.labelUp : '',
              ].join(' ');
              return (
                <button
                  key={k.id}
                  type="button"
                  className={cls}
                  style={{ left: `${x}%`, top: `${y}%`, '--i': i }}
                  aria-pressed={pinned === k.id}
                  aria-describedby="skill-info"
                  onMouseEnter={() => setHover(k.id)}
                  onFocus={() => setHover(k.id)}
                  onBlur={() => setHover(null)}
                  onClick={() => {
                    setPinned((p) => (p === k.id ? null : k.id));
                    if (narrow) {
                      setTimeout(() => document.getElementById('skill-info')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
                    }
                  }}
                >
                  <span className={s.glow} aria-hidden="true" />
                  <span className={s.label}>{k.name}</span>
                </button>
              );
            })}
          </div>

          <aside id="skill-info" className={`${s.info} glass reveal`} aria-live="polite" style={{ '--d': '120ms' }}>
            {node ? (
              <div className={s.card} key={node.id}>
                <p className={s.eyebrow}>Capability</p>
                <h3>{node.name}</h3>
                <p className={s.desc}>{node.text}</p>
                <p className={s.conn}>Connected to</p>
                <ul className={s.connList}>
                  {[...linked].map((id) => (
                    <li key={id}>
                      <button type="button" onClick={() => setPinned(id)}>{byId[id].name}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={s.card} key="idle">
                <p className={s.eyebrow}>{skills.length} capabilities</p>
                <h3>One studio, every part of the build.</h3>
                <p className={s.desc}>
                  Design, code and launch work together. Pick any star in the map to see what it covers and the
                  skills it connects with.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
