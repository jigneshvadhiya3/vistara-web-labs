import { useState } from 'react';
import { Search, Check } from 'lucide-react';
import { seoChecks } from '../data/site';
import s from './Seo.module.css';

const TITLE_MAX = 60;
const DESC_MAX = 160;

function Meter({ len, max, label }) {
  const pct = Math.min(100, (len / max) * 100);
  const state = len === 0 ? 'empty' : len > max ? 'over' : len < max * 0.5 ? 'short' : 'good';
  const msg = { empty: 'Empty', over: `${len - max} too long`, short: 'Could say more', good: 'Good length' }[state];
  return (
    <div className={`${s.meter} ${s[state]}`}>
      <span className={s.meterLabel}>{label}</span>
      <span className={s.bar}><i style={{ width: `${pct}%` }} /></span>
      <span className={s.meterVal}>{len}/{max} · {msg}</span>
    </div>
  );
}

export default function Seo() {
  const [biz, setBiz] = useState('Lotus Bakery');
  const [what, setWhat] = useState('Custom Cakes & Fresh Bakes in Rajkot');
  const [desc, setDesc] = useState(
    'Freshly baked breads, celebration cakes and custom orders, made daily in Rajkot. Order online or visit our store today.'
  );

  const title = [what.trim(), biz.trim()].filter(Boolean).join(' | ');
  const slug = (biz.trim() || 'yourbusiness').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 24) || 'yourbusiness';
  const shownTitle = title.length > TITLE_MAX ? `${title.slice(0, TITLE_MAX - 1)}…` : title || 'Your page title';
  const shownDesc = desc.length > DESC_MAX ? `${desc.slice(0, DESC_MAX - 1)}…` : desc || 'Your page description appears here.';

  return (
    <section id="seo" className="section">
      <div className={`wrap ${s.grid}`}>
        <div>
          <p className="kicker reveal">SEO included</p>
          <h2 className="h-section reveal" style={{ '--d': '80ms' }}>
            Built to be <span className="grad-text">found.</span>
          </h2>
          <p className="lede reveal" style={{ '--d': '160ms' }}>
            A beautiful website should also be easy to discover. Every Vistara build ships with on-page SEO
            foundations, and the Growth and Signature plans connect Google Analytics and Search Console.
          </p>

          <ul className={`${s.checks} reveal`} style={{ '--d': '200ms' }}>
            {seoChecks.map((c, i) => (
              <li key={c.name} style={{ '--i': i }}>
                <span className={s.tick}><Check size={14} aria-hidden="true" /></span>
                <div>
                  <p className={s.cName}>{c.name} <span className={s.plans}>{c.plans}</span></p>
                  <p className={s.cNote}>{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className={`${s.honest} reveal`}>
            SEO helps search engines understand your site; it doesn&apos;t guarantee rankings. Ongoing SEO is
            available as a separate service.
          </p>
        </div>

        <div className={`${s.tool} glass reveal`} style={{ '--d': '120ms' }}>
          <p className={s.toolTitle}>Try it: how your page could appear in search</p>
          <p className={s.toolSub}>Sample business. Type your own details to preview them.</p>
          <div className={s.search} aria-hidden="true">
            <Search size={16} />
            <span>{(what || 'your service').toLowerCase()}</span>
          </div>

          <div className={s.result} aria-live="polite">
            <div className={s.site}>
              <span className={s.fav}>{(biz.trim()[0] || 'V').toUpperCase()}</span>
              <div>
                <p className={s.siteName}>{biz.trim() || 'Your Business'}</p>
                <p className={s.url}>https://{slug}.com</p>
              </div>
            </div>
            <p className={s.rTitle}>{shownTitle}</p>
            <p className={s.rDesc}>{shownDesc}</p>
          </div>

          <div className={s.fields}>
            <label>
              <span>Business name</span>
              <input value={biz} onChange={(e) => setBiz(e.target.value)} maxLength={60} />
            </label>
            <label>
              <span>What you offer, and where</span>
              <input value={what} onChange={(e) => setWhat(e.target.value)} maxLength={90} />
            </label>
            <Meter len={title.length} max={TITLE_MAX} label="Title" />
            <label>
              <span>Meta description</span>
              <textarea rows="3" value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={300} />
            </label>
            <Meter len={desc.length} max={DESC_MAX} label="Description" />
          </div>
          <p className={s.toolNote}>A simplified preview. Search engines may rewrite titles and snippets.</p>
        </div>
      </div>
    </section>
  );
}
