import { Mail, Phone, Copy, Check, ArrowUpRight, X } from 'lucide-react';
import { contact } from '../data/site';
import s from './Contact.module.css';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.07.89.9-2.98-.2-.31a8.18 8.18 0 1 1 6.84 3.72Zm4.5-6.12c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.17-.47-.29Z" />
    </svg>
  );
}
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.75-2.75-1.75 0-2.02 1.3-2.02 2.66v5.14h-4v-11Z" />
    </svg>
  );
}

export default function Contact({ onCopy, copied, pkg, clearPkg }) {
  const pkgLine = pkg ? ` about the ${pkg} package` : '';
  const subject = `Website enquiry${pkg ? ` (${pkg} package)` : ''}`;
  const mail = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
  const waText = `Hi Jignesh, I found Vistara Web Labs and would like to discuss a website project${pkgLine}.`;
  const wa = contact.phone && contact.whatsappOnPhone
    ? `https://wa.me/${contact.phone}?text=${encodeURIComponent(waText)}`
    : null;

  return (
    <section id="contact" className={`section ${s.contact}`}>
      <div className={s.halo} aria-hidden="true" />
      <div className="wrap">
        <div className={s.head}>
          <p className="kicker reveal">Start a project</p>
          <h2 className={`${s.title} reveal`} style={{ '--d': '80ms' }}>
            Have Something <span className="grad-text">in Mind?</span>
          </h2>
          <p className="lede reveal" style={{ '--d': '160ms' }}>
            Tell us what you&apos;re planning. Whether you need a new website, a redesign, or help bringing a digital
            idea to life, let&apos;s make it happen.
          </p>
          {pkg && (
            <p className={s.pkg} role="status">
              You&apos;re interested in the <b>{pkg}</b> package. Mention it when you get in touch.
              <button type="button" onClick={clearPkg} aria-label="Clear selected package"><X size={14} /></button>
            </p>
          )}
        </div>

        <div className={s.grid}>
          {contact.phone && (
            <div className={`${s.card} glass shine reveal`}>
              <span className={s.icon}><Phone size={20} aria-hidden="true" /></span>
              <p className={s.label}>Mobile</p>
              <a href={`tel:+${contact.phone}`} className={s.value}>{contact.phoneDisplay}</a>
              <div className={s.actions}>
                <a href={`tel:+${contact.phone}`} className={s.action}>
                  <Phone size={15} aria-hidden="true" /> Call
                </a>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={s.action}>
                    <WhatsAppIcon width={15} height={15} /> WhatsApp
                  </a>
                )}
                <button type="button" className={s.action} onClick={() => onCopy('phone')}>
                  {copied === 'phone' ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy</>}
                </button>
              </div>
            </div>
          )}

          <div className={`${s.card} glass shine reveal`} style={{ '--d': '80ms' }}>
            <span className={s.icon}><Mail size={20} aria-hidden="true" /></span>
            <p className={s.label}>Email</p>
            <a href={mail} className={s.value}>{contact.email}</a>
            <div className={s.actions}>
              <a href={mail} className={s.action}>
                <Mail size={15} aria-hidden="true" /> Write an email
              </a>
              <button type="button" className={s.action} onClick={() => onCopy('email')}>
                {copied === 'email' ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy</>}
              </button>
            </div>
          </div>

          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.card} ${s.linkCard} glass shine reveal`}
              style={{ '--d': '160ms' }}
            >
              <span className={s.icon}><LinkedInIcon width={18} height={18} /></span>
              <p className={s.label}>LinkedIn</p>
              <p className={s.value}>{contact.linkedinName}</p>
              <span className={s.actions}>
                <span className={s.action}>Connect on LinkedIn</span>
              </span>
              <ArrowUpRight className={s.arrow} size={20} aria-hidden="true" />
            </a>
          )}
        </div>

        <p className={`${s.note} reveal`}>
          Share a little about your business and what the website should do. You&apos;ll get a reply with next steps
          and a quotation.
        </p>
      </div>
    </section>
  );
}
