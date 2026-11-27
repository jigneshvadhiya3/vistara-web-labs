import { useCallback, useEffect, useRef, useState } from 'react';
import { contact } from './data/site';
import { useActiveSection, useReveal, usePointerFx } from './lib/nav';
import { Cosmos, CursorGlow, ScrollProgress } from './components/Ambient';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import Services from './components/Services';
import Process from './components/Process';
import Seo from './components/Seo';
import Packages from './components/Packages';
import Constellation from './components/Constellation';
import About from './components/About';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import { Warp, BackToTop, Toast, Footer } from './components/Extras';

export default function App() {
  const active = useActiveSection();
  const [palette, setPalette] = useState(false);
  const [warp, setWarp] = useState(false);
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState('');
  const [pkg, setPkg] = useState('');
  const timer = useRef(0);

  useReveal();
  usePointerFx();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const flash = useCallback((msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setToast('');
      setCopied('');
    }, 2400);
  }, []);

  const copy = useCallback(
    async (what) => {
      const value = what === 'phone' ? contact.phoneDisplay || `+${contact.phone}` : contact.email;
      const label = what === 'phone' ? 'Mobile number' : 'Email address';
      try {
        await navigator.clipboard.writeText(value);
        setCopied(what);
        flash(`${label} copied`);
      } catch {
        flash(`Copy failed. It's ${value}`);
      }
    },
    [flash]
  );
  const copyEmail = useCallback(() => copy('email'), [copy]);
  const copyPhone = useCallback(() => copy('phone'), [copy]);

  const startWarp = useCallback(() => setTimeout(() => setWarp(true), 380), []);
  const endWarp = useCallback(() => setWarp(false), []);

  return (
    <>
      <a href="#work" className="sr-only">Skip to content</a>
      <Cosmos />
      <CursorGlow />
      <ScrollProgress />
      <Nav active={active} onOpenPalette={() => setPalette(true)} />
      <main>
        <Hero />
        <Work />
        <Services />
        <Seo />
        <Process />
        <Packages onChoose={setPkg} />
        <Constellation />
        <About />
        <Contact onCopy={copy} copied={copied} pkg={pkg} clearPkg={() => setPkg('')} />
      </main>
      <Footer onOpenPalette={() => setPalette(true)} />
      <BackToTop />
      <Toast message={toast} />
      <CommandPalette open={palette} onClose={() => setPalette(false)} onCopyEmail={copyEmail} onCopyPhone={copyPhone} onEasterEgg={startWarp} />
      <Warp active={warp} onDone={endWarp} />
    </>
  );
}
