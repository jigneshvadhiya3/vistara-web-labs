import { useState } from 'react';
import { Check, ArrowUpRight, ChevronDown, Plus, Info } from 'lucide-react';
import { packages, everyPlan, comparison, comparisonNotes, addOns, projectNotes } from '../data/site';
import { navigateTo } from '../lib/nav';
import s from './Packages.module.css';

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

/** Each tier is a small celestial body: a moon, a ringed planet, a planet with two rings. */
function Body({ tier }) {
  return (
    <svg className={s.body} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id={`pb-${tier}`} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor={tier === 0 ? '#e7f9ff' : '#e9e2ff'} />
          <stop offset=".5" stopColor={tier === 0 ? '#58d9e8' : tier === 1 ? '#648cff' : '#9275ff'} />
          <stop offset="1" stopColor="#16123a" />
        </radialGradient>
        <linearGradient id={`pr-${tier}`} x1="0" x2="1">
          <stop offset="0" stopColor="#58d9e8" />
          <stop offset="1" stopColor="#9275ff" />
        </linearGradient>
      </defs>
      {tier === 2 && <ellipse cx="60" cy="62" rx="56" ry="15" fill="none" stroke={`url(#pr-${tier})`} strokeOpacity=".35" strokeWidth="1.5" transform="rotate(-18 60 62)" />}
      {tier >= 1 && <ellipse cx="60" cy="62" rx="44" ry="11" fill="none" stroke={`url(#pr-${tier})`} strokeOpacity=".4" strokeWidth="3" transform="rotate(-18 60 62)" />}
      <circle cx="60" cy="60" r={tier === 0 ? 18 : tier === 1 ? 24 : 28} fill={`url(#pb-${tier})`} />
      {tier >= 1 && (
        <path d="M17.6 72.6 A44 11 -18 0 0 102.4 51.4" fill="none" stroke={`url(#pr-${tier})`} strokeWidth="3" />
      )}
      {tier === 2 && <circle cx="110" cy="44" r="3.5" fill="#ffb38a" />}
      {tier === 0 && <circle cx="92" cy="38" r="3" fill="#c0aeff" />}
    </svg>
  );
}

function Cell({ v }) {
  if (v === true) return <span className={s.yes}><Check size={15} aria-hidden="true" /> Included</span>;
  if (v === 'Add-on') return <span className={s.addon}>Add-on</span>;
  return <span>{v}</span>;
}

export default function Packages({ onChoose }) {
  const [compare, setCompare] = useState(false);
  const [mobilePlan, setMobilePlan] = useState(1);
  const [notes, setNotes] = useState(false);

  const choose = (name) => {
    onChoose(name);
    navigateTo('contact');
  };

  return (
    <section id="packages" className="section">
      <div className="wrap">
        <div className={s.head}>
          <p className="kicker reveal">Packages</p>
          <h2 className="h-section reveal" style={{ '--d': '80ms' }}>
            Your business. <span className="grad-text">Better online.</span>
          </h2>
          <p className="lede reveal" style={{ '--d': '160ms' }}>
            Professional websites with thoughtful design, clear messaging and an easy path to enquiry.
          </p>
          <p className={`${s.intro} reveal`} style={{ '--d': '220ms' }}>
            <span className={s.spark} aria-hidden="true">✦</span> Introductory prices · one-time development fee
          </p>
        </div>

        <div className={s.tiers}>
          {packages.map((p, i) => (
            <article key={p.key} className={`${s.tier} ${s[p.key]} glass shine reveal`} style={{ '--d': `${i * 90}ms` }}>
              <div className={s.top}>
                <div>
                  <h3 className={s.name}>{p.name}</h3>
                  <p className={s.audience}>{p.audience}</p>
                </div>
                <Body tier={i} />
              </div>

              <div className={s.price}>
                <p className={s.was}>
                  <span className="sr-only">Regular price</span>
                  <s>{inr(p.regular)}</s>
                  <span className={s.save}>Save {inr(p.regular - p.price)}</span>
                </p>
                <p className={s.now}>
                  <span className="sr-only">Introductory price</span>
                  {inr(p.price)}
                </p>
                <p className={s.priceNote}>Introductory price</p>
              </div>

              <p className={s.title}>{p.title}</p>

              <ul className={s.features}>
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={16} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <button type="button" className={`btn ${i === 2 ? 'btn-primary' : 'btn-ghost'} ${s.cta}`} onClick={() => choose(p.name)} data-magnetic>
                Choose {p.name} <ArrowUpRight />
              </button>
            </article>
          ))}
        </div>

        <div className={`${s.every} reveal`}>
          <p>Every plan includes</p>
          <ul>
            {everyPlan.map((e) => (
              <li key={e}><Check size={14} aria-hidden="true" /> {e}</li>
            ))}
          </ul>
        </div>

        {/* Comparison */}
        <div className={`${s.compareWrap} reveal`}>
          <button
            type="button"
            className={s.toggle}
            aria-expanded={compare}
            aria-controls="compare-table"
            onClick={() => setCompare((v) => !v)}
          >
            <span>
              <strong>Compare every inclusion</strong>
              <span>Design, functionality, SEO and support for each plan.</span>
            </span>
            <ChevronDown className={compare ? s.flip : ''} size={22} aria-hidden="true" />
          </button>

          {compare && (
            <div id="compare-table" className={`${s.compare} glass`}>
              <div className={s.planSwitch} role="group" aria-label="Plan to compare">
                {packages.map((p, i) => (
                  <button key={p.key} type="button" aria-pressed={mobilePlan === i} onClick={() => setMobilePlan(i)}>
                    {p.name}
                  </button>
                ))}
              </div>
              <div className={s.tableScroll}>
                <table className={s.table} data-plan={mobilePlan}>
                  <thead>
                    <tr>
                      <th scope="col">Features</th>
                      {packages.map((p) => <th scope="col" key={p.key}>{p.name}</th>)}
                    </tr>
                  </thead>
                  {comparison.map((g) => (
                    <tbody key={g.group}>
                      <tr className={s.groupRow}>
                        <th scope="colgroup" colSpan={4}>{g.group}</th>
                      </tr>
                      {g.rows.map(([label, ...vals]) => (
                        <tr key={label}>
                          <th scope="row">{label}</th>
                          {vals.map((v, k) => <td key={k}><Cell v={v} /></td>)}
                        </tr>
                      ))}
                    </tbody>
                  ))}
                </table>
              </div>
              <div className={s.fine}>
                {comparisonNotes.map((n) => <p key={n}>{n}</p>)}
              </div>
            </div>
          )}
        </div>

        {/* Add-ons and notes */}
        <div className={s.extras}>
          <div className={`${s.addons} glass reveal`}>
            <h3>Make it yours.</h3>
            <p className={s.sub}>Extend your website with optional services, quoted around your requirements.</p>
            <ul>
              {addOns.map((a) => (
                <li key={a.name}>
                  <span><Plus size={14} aria-hidden="true" /> {a.name}</span>
                  <b>{a.price}</b>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${s.notes} glass reveal`} style={{ '--d': '100ms' }}>
            <button type="button" className={s.notesToggle} aria-expanded={notes} aria-controls="project-notes" onClick={() => setNotes((v) => !v)}>
              <Info size={18} aria-hidden="true" />
              <span>Project notes</span>
              <ChevronDown className={notes ? s.flip : ''} size={18} aria-hidden="true" />
            </button>
            <p className={s.sub}>Payment terms, what you provide, and what each plan covers.</p>
            {notes && (
              <ul id="project-notes" className={s.notesList}>
                {projectNotes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            )}
            <p className={s.terms}>
              One-time development fees. Final scope and applicable taxes are confirmed in your quotation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
