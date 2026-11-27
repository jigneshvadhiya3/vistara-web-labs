import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { nav, brand } from '../data/site';
import { navigateTo } from '../lib/nav';
import Logo, { Mark } from './Logo';
import s from './Extras.module.css';

/** Easter egg: a hyperspace warp followed by the brand's meaning. */
export function Warp({ active, onDone }) {
  const ref = useRef(null);
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (!active) return undefined;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPhase(still ? 'message' : 'warp');
    const canvas = ref.current;
    let raf = 0;
    let t1;
    let t2;
    if (!still && canvas) {
      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = w / 2;
      const cy = h / 2;
      const colors = ['238,237,251', '192,174,255', '88,217,232', '100,140,255', '255,179,138'];
      const stars = Array.from({ length: 260 }, () => ({
        a: Math.random() * Math.PI * 2,
        d: Math.random() * 40,
        v: 2 + Math.random() * 6,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
      const start = performance.now();
      const frame = (now) => {
        const p = Math.min(1, (now - start) / 1600);
        const speed = 1 + p * p * 14;
        ctx.fillStyle = 'rgba(9, 11, 20, 0.28)';
        ctx.fillRect(0, 0, w, h);
        for (const st of stars) {
          const d0 = st.d;
          st.d += st.v * speed;
          const x0 = cx + Math.cos(st.a) * d0;
          const y0 = cy + Math.sin(st.a) * d0;
          const x1 = cx + Math.cos(st.a) * st.d;
          const y1 = cy + Math.sin(st.a) * st.d;
          ctx.strokeStyle = `rgba(${st.c},${Math.min(1, 0.25 + p)})`;
          ctx.lineWidth = 1 + p * 1.5;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
          if (st.d > Math.hypot(w, h)) st.d = Math.random() * 30;
        }
        if (p < 1) raf = requestAnimationFrame(frame);
      };
      ctx.clearRect(0, 0, w, h);
      raf = requestAnimationFrame(frame);
      t1 = setTimeout(() => setPhase('message'), 1500);
    }
    t2 = setTimeout(() => {
      setPhase('idle');
      onDone();
    }, still ? 4200 : 5600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active, onDone]);

  if (!active) return null;
  return (
    <div className={`${s.warp} ${phase === 'message' ? s.settled : ''}`} onClick={() => { setPhase('idle'); onDone(); }} role="presentation">
      <canvas ref={ref} className={s.warpCanvas} aria-hidden="true" />
      {phase === 'message' && (
        <div className={s.message} role="status">
          <div className={s.bigLogo}><Mark size={110} /></div>
          <p className={s.word}>Vistāra</p>
          <p className={s.meaning}>Sanskrit for <em>expanse</em>. Your ideas need room to grow; we build it.</p>
          <p className={s.dismiss}>Click anywhere to return</p>
        </div>
      )}
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      className={`${s.top} ${show ? s.show : ''}`}
      onClick={() => navigateTo('home')}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}

export function Toast({ message }) {
  return (
    <div className={`${s.toast} ${message ? s.toastOn : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}

export function Footer({ onOpenPalette }) {
  const go = (e, id) => {
    e.preventDefault();
    navigateTo(id);
  };
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.inner}`}>
        <div className={s.brand}>
          <a href="#home" onClick={(e) => go(e, 'home')} className={s.logo}>
            <Logo height={52} />
          </a>
          <p>{brand.descriptor}. From ideas to digital experiences.</p>
          <p className={s.founder}>Founded and run by {brand.founder}.</p>
        </div>
        <nav aria-label="Footer">
          <ul className={s.links}>
            {nav.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} onClick={(e) => go(e, n.id)}>{n.label}</a></li>
            ))}
            <li><a href="#contact" onClick={(e) => go(e, 'contact')}>Start a Project</a></li>
          </ul>
        </nav>
        <div className={s.bottom}>
          <p>© {new Date().getFullYear()} {brand.name}</p>
          <button type="button" className={s.hint} onClick={onOpenPalette}>
            <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> to explore like a developer
          </button>
        </div>
      </div>
    </footer>
  );
}
