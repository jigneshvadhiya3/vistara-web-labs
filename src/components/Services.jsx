import { useState } from 'react';
import { Compass, PenTool, CodeXml, ShieldCheck, Rocket, LifeBuoy, Plus } from 'lucide-react';
import { services } from '../data/site';
import s from './Services.module.css';

const icons = { Compass, PenTool, CodeXml, ShieldCheck, Rocket, LifeBuoy };

function Detail({ svc, idx, compact }) {
  const I = icons[svc.icon];
  return (
    <div className={`${s.detail} ${compact ? s.compact : ''}`} key={svc.key}>
      {!compact && (
        <div className={s.orb} aria-hidden="true">
          <span className={s.ring} />
          <span className={s.ring2} />
          <span className={s.core}><I size={30} /></span>
        </div>
      )}
      {!compact && <h3 className={s.dTitle}>{svc.title}</h3>}
      <p className={s.body}>{svc.body}</p>
      <ul className={s.chips}>
        {svc.items.map((it, k) => (
          <li key={it} style={{ '--k': k }}>{it}</li>
        ))}
      </ul>
      <div className={s.journey} aria-label={`Step ${idx + 1} of ${services.length} from concept to launch`}>
        <span>Concept</span>
        <ol>
          {services.map((x, k) => (
            <li key={x.key} className={k <= idx ? s.done : ''} />
          ))}
        </ol>
        <span>Launch &amp; beyond</span>
      </div>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const svc = services[active];

  return (
    <section id="services" className="section">
      <div className="wrap">
        <div className={s.head}>
          <p className="kicker reveal">Services</p>
          <h2 className="h-section reveal" style={{ '--d': '80ms' }}>
            Everything Your Website Needs.<br />
            <span className="grad-text">From Concept to Launch.</span>
          </h2>
          <p className="lede reveal" style={{ '--d': '160ms' }}>
            From the first conversation to the final deployment, we take care of the complete website creation journey.
          </p>
        </div>

        <div className={s.console}>
          <ul className={`${s.list} reveal`}>
            {services.map((x, i) => {
              const I = icons[x.icon];
              const on = i === active;
              return (
                <li key={x.key} className={on ? s.on : undefined}>
                  <button
                    type="button"
                    className={`${s.item} shine`}
                    aria-expanded={on}
                    aria-controls={`svc-${x.key}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia('(hover: hover)').matches && window.innerWidth > 900 && setActive(i)}
                  >
                    <span className={s.icon}><I size={20} aria-hidden="true" /></span>
                    <span className={s.text}>
                      <strong>{x.title}</strong>
                      <span>{x.short}</span>
                    </span>
                    <Plus className={s.plus} size={18} aria-hidden="true" />
                  </button>
                  {on && (
                    <div id={`svc-${x.key}`} className={s.inline}>
                      <Detail svc={x} idx={i} compact />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className={`${s.panel} glass reveal`} style={{ '--d': '120ms' }} aria-live="polite">
            <Detail svc={svc} idx={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
