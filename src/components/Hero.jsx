import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { navigateTo } from '../lib/nav';
import s from './Hero.module.css';

const layouts = ['Landing', 'Business', 'Portfolio'];
const tagline = ['Your Vision.', 'Our Canvas.', 'A Digital Reality.'];

function Preview() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % layouts.length), 3800);
    return () => clearInterval(t);
  }, [auto]);

  return (
    <div className={`${s.preview} glass`} onMouseEnter={() => setAuto(false)}>
      <div className={s.chrome}>
        <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
        <div className={s.tabs} role="tablist" aria-label="Sample website layouts">
          {layouts.map((l, k) => (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={i === k}
              className={i === k ? s.tabOn : ''}
              onClick={() => {
                setAuto(false);
                setI(k);
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className={s.canvas} data-layout={i} aria-hidden="true">
        <div className={s.mNav}><b /><span /><span /><span /></div>
        <div className={s.mHero}>
          <div className={s.mText}><b /><b /><span /><em /></div>
          <div className={s.mArt} />
        </div>
        <div className={s.mGrid}><span /><span /><span /></div>
      </div>
    </div>
  );
}

export default function Hero() {
  const stage = useRef(null);
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setWord((w) => (w + 1) % tagline.length), 1800);
    return () => clearInterval(t);
  }, []);

  // Gentle parallax tilt of the orbital composition.
  useEffect(() => {
    const el = stage.current;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!el || !fine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty('--tx', x.toFixed(3));
        el.style.setProperty('--ty', y.toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    navigateTo(id);
  };

  return (
    <section id="home" className={s.hero}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <p className={`${s.avail} ${s.in}`} style={{ '--d': '0ms' }}>
            <span className={s.pulse} aria-hidden="true" />
            Available for select projects
          </p>

          <p className={`${s.brandline} ${s.in}`} style={{ '--d': '90ms' }}>
            <strong>Vistara Web Labs</strong>
            <span>Independent Web Design &amp; Development Studio</span>
          </p>

          <h1 className={s.title}>
            <span className={s.in} style={{ '--d': '180ms' }}>From Ideas to</span>
            <span className={`${s.in} grad-text ${s.big}`} style={{ '--d': '280ms' }}>Digital Experiences.</span>
          </h1>

          <p className={`${s.tagline} ${s.in}`} style={{ '--d': '380ms' }} aria-label={tagline.join(' ')}>
            {tagline.map((t, k) => (
              <span key={t} className={word === k ? s.lit : ''} aria-hidden="true">{t}</span>
            ))}
          </p>

          <p className={`${s.lede} ${s.in}`} style={{ '--d': '460ms' }}>
            We design and develop thoughtful, high-performing websites that help businesses establish their
            digital presence, communicate their value, and grow online.
          </p>

          <div className={`${s.ctas} ${s.in}`} style={{ '--d': '560ms' }}>
            <a href="#contact" className="btn btn-primary" onClick={(e) => go(e, 'contact')} data-magnetic>
              Start a Project <ArrowUpRight />
            </a>
            <a href="#work" className="btn btn-ghost" onClick={(e) => go(e, 'work')} data-magnetic>
              Explore Our Work <ArrowDown />
            </a>
          </div>
          <a href="#packages" className={`${s.pkgLink} ${s.in}`} style={{ '--d': '640ms' }} onClick={(e) => go(e, 'packages')}>
            Website packages from <b>₹10,999</b> <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className={s.stage} ref={stage}>
          <div className={s.system} aria-hidden="true">
            <svg className={s.orbits} viewBox="0 0 600 600">
              <defs>
                <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#58d9e8" stopOpacity=".7" />
                  <stop offset=".5" stopColor="#648cff" stopOpacity=".35" />
                  <stop offset="1" stopColor="#9275ff" stopOpacity=".7" />
                </linearGradient>
              </defs>
              <g transform="rotate(-16 300 300)">
                <ellipse cx="300" cy="300" rx="280" ry="96" fill="none" stroke="url(#orbitGrad)" strokeWidth="1.2" />
                <ellipse cx="300" cy="300" rx="214" ry="70" fill="none" stroke="rgba(192,174,255,.2)" strokeWidth="1" strokeDasharray="2 7" />
                <circle r="6" fill="#58d9e8" className={s.moon}>
                  <animateMotion dur="18s" repeatCount="indefinite" path="M20,300 a280,96 0 1,0 560,0 a280,96 0 1,0 -560,0" />
                </circle>
                <circle r="3.5" fill="#ffb38a" className={s.moon}>
                  <animateMotion dur="11s" repeatCount="indefinite" path="M514,300 a214,70 0 1,0 -428,0 a214,70 0 1,0 428,0" />
                </circle>
              </g>
              <g transform="rotate(58 300 300)">
                <ellipse cx="300" cy="300" rx="250" ry="62" fill="none" stroke="rgba(146,117,255,.22)" strokeWidth="1" />
                <circle r="4" fill="#c0aeff" className={s.moon}>
                  <animateMotion dur="24s" repeatCount="indefinite" path="M50,300 a250,62 0 1,1 500,0 a250,62 0 1,1 -500,0" />
                </circle>
              </g>
            </svg>
            <div className={s.planet}>
              <span className={s.sheen} />
            </div>
            <svg className={s.ringFront} viewBox="0 0 600 600">
              <defs>
                <clipPath id="frontHalf"><rect x="0" y="300" width="600" height="300" /></clipPath>
              </defs>
              <g transform="rotate(-16 300 300)" clipPath="url(#frontHalf)">
                <ellipse cx="300" cy="300" rx="168" ry="38" fill="none" stroke="url(#orbitGrad)" strokeWidth="5" opacity=".85" />
              </g>
            </svg>
            <svg className={s.ringBack} viewBox="0 0 600 600">
              <g transform="rotate(-16 300 300)">
                <ellipse cx="300" cy="300" rx="168" ry="38" fill="none" stroke="url(#orbitGrad)" strokeWidth="5" opacity=".35" />
              </g>
            </svg>
          </div>

          <span className={`${s.label} ${s.l1}`}>Design</span>
          <span className={`${s.label} ${s.l2}`}>Development</span>
          <span className={`${s.label} ${s.l3}`}>Digital Experience</span>

          <Preview />
        </div>
      </div>
    </section>
  );
}
