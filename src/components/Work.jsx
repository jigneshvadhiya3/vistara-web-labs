import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/site';
import s from './Work.module.css';

function tilt(e) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
  el.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
  el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
  el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
}
function untilt(e) {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
}

export default function Work() {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });

  const scrollToIndex = useCallback((i) => {
    const el = track.current;
    const slide = el?.children[i];
    if (!slide) return;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const onScroll = () => {
      const slides = [...el.children];
      const mid = el.scrollLeft + el.clientWidth * 0.35;
      let best = 0;
      slides.forEach((sl, i) => {
        if (sl.offsetLeft - el.offsetLeft <= mid) best = i;
      });
      setIndex(best);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollToIndex(Math.min(projects.length - 1, index + 1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToIndex(Math.max(0, index - 1)); }
  };

  // Mouse drag to scroll the track (touch uses native swipe).
  const onDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { on: true, x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.on) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) {
      d.moved = true;
      track.current.classList.add(s.dragging);
    }
    track.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    track.current.classList.remove(s.dragging);
    if (d.moved) scrollToIndex(index);
  };
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section id="work" className="section">
      <div className={`wrap ${s.head}`}>
        <div>
          <p className="kicker reveal">Portfolio</p>
          <h2 className="h-section reveal" style={{ '--d': '80ms' }}>Selected Work</h2>
          <p className="lede reveal" style={{ '--d': '160ms' }}>
            A collection of digital experiences designed to make businesses stand out.
          </p>
        </div>
        <div className={`${s.controls} reveal`} style={{ '--d': '200ms' }}>
          <span className={s.count} aria-live="polite">
            <b>{String(index + 1).padStart(2, '0')}</b> / {String(projects.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => scrollToIndex(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous project" data-magnetic>
            <ArrowLeft size={20} />
          </button>
          <button type="button" onClick={() => scrollToIndex(Math.min(projects.length - 1, index + 1))} disabled={index === projects.length - 1} aria-label="Next project" data-magnetic>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div
        className={s.track}
        ref={track}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected work. Use left and right arrow keys to browse."
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={onClickCapture}
      >
        {projects.map((p, i) => (
          <article
            key={p.name}
            className={`${s.slide} ${index === i ? s.current : ''}`}
            style={{ '--tint': p.tint }}
            aria-label={`${i + 1} of ${projects.length}: ${p.name}`}
          >
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.frameWrap}
              onPointerMove={tilt}
              onPointerLeave={untilt}
              aria-label={`Visit ${p.name} (opens in a new tab)`}
              draggable="false"
            >
              <div className={`${s.frame} glass`}>
                <div className={s.chrome}>
                  <span className={s.dots}><i /><i /><i /></span>
                  <span className={s.url}>{p.domain}</span>
                </div>
                <div className={s.shot}>
                  <img src={p.image} alt={`${p.name} website homepage`} loading="lazy" width="799" height="609" draggable="false" />
                  <span className={s.glare} />
                </div>
              </div>
              <span className={`${s.float} ${s.fIndustry}`}>{p.industry}</span>
              <span className={`${s.float} ${s.fLive}`}><i /> Live</span>
            </a>

            <div className={`${s.info} glass shine`}>
              <h3>{p.name}</h3>
              <p className={s.desc}>{p.description}</p>
              <dl className={s.meta}>
                <div>
                  <dt>Services</dt>
                  <dd>{p.services.join(', ')}</dd>
                </div>
                <div>
                  <dt>Built with</dt>
                  <dd className={s.tags}>{p.tags.map((t) => <span key={t}>{t}</span>)}</dd>
                </div>
              </dl>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className={s.visit}>
                Visit Website <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className={`wrap ${s.dotsNav}`}>
        {projects.map((p, i) => (
          <button
            key={p.name}
            type="button"
            className={index === i ? s.dotOn : ''}
            onClick={() => scrollToIndex(i)}
            aria-label={`Show ${p.name}`}
            aria-current={index === i ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
