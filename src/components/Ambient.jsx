import { useEffect, useRef } from 'react';
import { useScrollProgress } from '../lib/nav';
import s from './Ambient.module.css';

/** Fixed cosmic background: nebula light, orbit lines and a slow canvas starfield with scroll parallax. */
export function Cosmos() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, stars = [], running = true;

    const seed = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(170, (w * h) / 9000));
      stars = Array.from({ length: count }, () => {
        const layer = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: layer > 0.92 ? 1.4 : layer > 0.6 ? 0.9 : 0.55,
          depth: 0.15 + layer * 0.6,
          tw: Math.random() * Math.PI * 2,
          sp: 0.004 + Math.random() * 0.012,
          hue: Math.random() > 0.85 ? (Math.random() > 0.5 ? '192,174,255' : '88,217,232') : '238,237,251',
        };
      });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      for (const st of stars) {
        const y = (((st.y - sy * st.depth * 0.12) % h) + h) % h;
        const x = (st.x + t * 0.004 * st.depth) % w;
        const a = still ? 0.7 : 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(st.tw + t * st.sp * 0.06));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${st.hue},${a.toFixed(3)})`;
        ctx.arc(x, y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    seed();
    if (still) draw(0);
    else raf = requestAnimationFrame(loop);

    const onResize = () => {
      seed();
      if (still) draw(0);
    };
    const onScroll = () => still && draw(0);
    const onVis = () => {
      running = !document.hidden && !still;
      if (running) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className={s.cosmos} aria-hidden="true">
      <span className={s.nebulaA} />
      <span className={s.nebulaB} />
      <span className={s.nebulaC} />
      <canvas ref={ref} className={s.stars} />
    </div>
  );
}

/** Soft light that trails the pointer on desktop. The real cursor stays visible. */
export function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!fine || still || !el) return undefined;
    let x = -400, y = -400, tx = x, ty = y, raf = 0;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = '1';
    };
    const onLeave = () => (el.style.opacity = '0');
    const tick = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);
  return <div ref={ref} className={s.glow} aria-hidden="true" />;
}

export function ScrollProgress() {
  const p = useScrollProgress();
  return <div className={s.progress} style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}
