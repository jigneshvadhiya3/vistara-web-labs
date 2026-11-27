import { useEffect, useState } from 'react';
import { sections } from '../data/site';

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Navigation with a back stack ---------- */

let current = 'home';
const backStack = [];

/** Which section is currently in view (updated by useActiveSection). */
export const getCurrent = () => current;

/** Scrolls to a section and remembers where the visitor came from. */
export function navigateTo(id, { remember = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (remember && current !== id) {
    backStack.push(current);
    if (backStack.length > 30) backStack.shift();
  }
  el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`);
  return true;
}

/** Returns to the previous section. Returns its id, or null when there is no history. */
export function goBack() {
  while (backStack.length) {
    const prev = backStack.pop();
    if (prev !== current && document.getElementById(prev)) {
      navigateTo(prev, { remember: false });
      return prev;
    }
  }
  return null;
}

export const canGoBack = () => backStack.some((id) => id !== current);

/* ---------- Hooks ---------- */

export function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const line = window.innerHeight * 0.38;
      let id = sections[0];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= line) id = s;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        id = sections[sections.length - 1];
      }
      current = id;
      setActive(id);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return active;
}

export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return p;
}

/** Adds `.in` to `.reveal` elements as they enter the viewport, including ones rendered later. */
export function useReveal() {
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) {
      const show = () => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      show();
      const mo = new MutationObserver(show);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }
    // Elements that have been revealed once stay revealed, even if React rewrites their className.
    const shown = new WeakSet();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            shown.add(e.target);
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    const mo = new MutationObserver((muts) =>
      muts.forEach((m) => {
        if (m.type === 'attributes') {
          const el = m.target;
          if (shown.has(el) && el.classList.contains('reveal') && !el.classList.contains('in')) el.classList.add('in');
          return;
        }
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          if (n.classList.contains('reveal')) io.observe(n);
          n.querySelectorAll?.('.reveal:not(.in)').forEach((el) => io.observe(el));
        });
      })
    );
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

/** Pointer light on `.shine` surfaces and magnetic pull on `[data-magnetic]` buttons. Desktop only. */
export function usePointerFx() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || reduced()) return undefined;

    const onMove = (e) => {
      const card = e.target.closest?.('.shine');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      const mag = e.target.closest?.('[data-magnetic]');
      if (mag) {
        const r = mag.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
        mag.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      }
    };
    const onOut = (e) => {
      const mag = e.target.closest?.('[data-magnetic]');
      if (mag && !mag.contains(e.relatedTarget)) mag.style.transform = '';
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);
}
