import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { nav, brand } from '../data/site';
import { navigateTo } from '../lib/nav';
import Logo from './Logo';
import s from './Nav.module.css';

export default function Nav({ active, onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    navigateTo(id);
  };

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
      <nav className={`${s.bar} glass`} aria-label="Main">
        <a href="#home" className={s.brand} onClick={(e) => go(e, 'home')} aria-label={`${brand.name}, back to top`}>
          <Logo height={46} />
        </a>

        <ul className={s.links}>
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={(e) => go(e, n.id)}
                className={active === n.id ? s.on : ''}
                aria-current={active === n.id ? 'true' : undefined}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={s.right}>
          <button type="button" className={s.cmd} onClick={onOpenPalette} aria-label="Open command palette">
            <Terminal size={14} aria-hidden="true" />
            <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <a href="#contact" className={`btn btn-primary ${s.cta}`} onClick={(e) => go(e, 'contact')} data-magnetic>
            Start a Project <ArrowUpRight />
          </a>
          <button
            type="button"
            className={s.burger}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className={`${s.sheet} glass`}>
          <ul>
            {nav.map((n, i) => (
              <li key={n.id} style={{ '--i': i }}>
                <a href={`#${n.id}`} onClick={(e) => go(e, n.id)} className={active === n.id ? s.on : ''}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary" onClick={(e) => go(e, 'contact')}>
            Start a Project <ArrowUpRight />
          </a>
          <button
            type="button"
            className={s.sheetCmd}
            onClick={() => {
              setOpen(false);
              onOpenPalette();
            }}
          >
            <Terminal size={16} aria-hidden="true" /> Open the command palette
          </button>
        </div>
      )}
    </header>
  );
}
