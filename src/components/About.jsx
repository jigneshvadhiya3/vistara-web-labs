import { focus, brand } from '../data/site';
import s from './About.module.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <p className="kicker reveal">About Vistara Web Labs</p>
        <h2 className={`${s.title} reveal`} style={{ '--d': '80ms' }}>
          A Small Studio.
          <span className="grad-text"> A Big Focus on Details.</span>
        </h2>

        <div className={s.grid}>
          <div className={s.copy}>
            <p className="reveal">
              Vistara Web Labs is an independent web design and development brand focused on creating modern,
              meaningful, and engaging digital experiences for businesses and individuals.
            </p>
            <p className="reveal" style={{ '--d': '80ms' }}>
              From understanding your requirements and planning your website to designing, developing, testing, and
              launching it, the focus is on delivering a complete experience that looks right, works smoothly, and
              serves a clear purpose.
            </p>
            <p className="reveal" style={{ '--d': '110ms' }}>
              The studio is run by {brand.founder}, who works with every client directly, from the first call to launch
              day and beyond.
            </p>
            <p className={`${s.name} reveal`} style={{ '--d': '140ms' }}>
              <span lang="sa">Vistāra</span> comes from the Sanskrit for <em>expanse</em>: room to grow.
              That&apos;s what a good website should give a business.
            </p>
          </div>

          <div className={`${s.visual} reveal`} style={{ '--d': '120ms' }}>
            <svg className={s.rings} viewBox="0 0 400 400" aria-hidden="true">
              <circle cx="200" cy="200" r="190" />
              <circle cx="200" cy="200" r="140" />
              <circle cx="200" cy="200" r="90" />
              <circle cx="390" cy="200" r="5" className={s.sat} />
              <circle cx="60" cy="200" r="4" className={s.sat2} />
            </svg>
            <div className={`${s.panel} glass shine`}>
              <p className={s.panelTitle}>The studio focuses on</p>
              <ul className={s.focus}>
                {focus.map((f, i) => (
                  <li key={f} style={{ '--i': i }}>
                    <span className={s.star} aria-hidden="true">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
