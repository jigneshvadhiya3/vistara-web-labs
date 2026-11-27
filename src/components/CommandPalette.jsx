import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CornerDownLeft } from 'lucide-react';
import { navigateTo, goBack } from '../lib/nav';
import { sectionNames, contact } from '../data/site';
import s from './CommandPalette.module.css';

const RECENT_KEY = 'vistara.recent';
const loadRecent = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').slice(0, 5);
  } catch {
    return [];
  }
};
const saveRecent = (list) => {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 5)));
  } catch {
    /* storage unavailable: keep history in memory only */
  }
};

const demo = ['open work', 'view packages', 'explore skills', 'start a project'];

export default function CommandPalette({ open, onClose, onCopyEmail, onCopyPhone, onEasterEgg }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const [log, setLog] = useState(null);
  const [recent, setRecent] = useState(loadRecent);
  const [ghost, setGhost] = useState('');
  const input = useRef(null);
  const listRef = useRef(null);
  const lastFocus = useRef(null);

  const goSection = useCallback((id) => {
    navigateTo(id);
    return `Navigating to ${sectionNames[id]}`;
  }, []);

  const commands = useMemo(
    () => [
      { cmd: 'go home', aliases: ['home', 'top', 'hero', 'cd ~'], desc: 'Back to the beginning', run: () => goSection('home') },
      { cmd: 'open work', aliases: ['work', 'projects', 'portfolio', 'show work'], desc: 'Selected websites', run: () => goSection('work') },
      { cmd: 'show services', aliases: ['services', 'what we do'], desc: 'Everything from concept to launch', run: () => goSection('services') },
      { cmd: 'show seo', aliases: ['seo', 'search', 'google', 'ranking'], desc: 'SEO included in every build', run: () => goSection('seo') },
      { cmd: 'go to process', aliases: ['process', 'journey', 'how'], desc: 'The 7-stage journey', run: () => goSection('process') },
      { cmd: 'view packages', aliases: ['packages', 'pricing', 'price', 'prices', 'plans', 'cost'], desc: 'Plans from ₹10,999', run: () => goSection('packages') },
      { cmd: 'explore skills', aliases: ['skills', 'constellation', 'capabilities'], desc: 'The capabilities constellation', run: () => goSection('skills') },
      { cmd: 'about vistara', aliases: ['about', 'studio', 'who'], desc: 'The studio behind the work', run: () => goSection('about') },
      {
        cmd: 'start a project',
        aliases: ['start', 'project', 'hire', 'enquiry', 'quote'],
        desc: 'Get in touch about a website',
        run: () => {
          navigateTo('contact');
          return 'Opening contact details';
        },
      },
      { cmd: 'contact', aliases: ['email', 'reach', 'hello'], desc: 'Ways to get in touch', run: () => goSection('contact') },
      {
        cmd: 'go back',
        aliases: ['back', 'cd ..', 'previous'],
        desc: 'Return to the previous section',
        run: () => {
          const prev = goBack();
          return prev ? `Back to ${sectionNames[prev]}` : { error: 'Nothing to go back to yet. Visit a section first.' };
        },
      },
      {
        cmd: 'copy email',
        aliases: ['copy', 'mail'],
        desc: 'Copy the studio email address',
        run: () => {
          onCopyEmail();
          return 'Email address copied';
        },
      },
      ...(contact.phone
        ? [
            {
              cmd: 'copy phone',
              aliases: ['phone', 'mobile', 'call', 'number'],
              desc: 'Copy the mobile number',
              run: () => {
                onCopyPhone();
                return 'Mobile number copied';
              },
            },
          ]
        : []),
      {
        cmd: 'open linkedin',
        aliases: ['linkedin'],
        desc: 'Connect on LinkedIn',
        run: () => {
          window.open(contact.linkedin, '_blank', 'noopener');
          return 'Opening LinkedIn';
        },
      },
      {
        cmd: 'clear history',
        aliases: ['clear', 'cls'],
        desc: 'Forget recent commands',
        run: () => {
          setRecent([]);
          saveRecent([]);
          return { stay: 'Recent commands cleared' };
        },
      },
      { cmd: 'help', aliases: ['?', 'ls', 'commands'], desc: 'List every command', run: () => ({ stay: 'help' }) },
    ],
    [goSection, onCopyEmail, onCopyPhone]
  );

  const egg = useMemo(
    () => ({ cmd: 'vistara', aliases: [], desc: '', hidden: true, run: () => { onEasterEgg(); return '✦ Expanding the universe…'; } }),
    [onEasterEgg]
  );

  const term = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return commands;
    return commands.filter((c) => c.cmd.includes(term) || c.aliases.some((a) => a.includes(term) || term.includes(a) && a.length > 3));
  }, [term, commands]);

  const recentItems = useMemo(
    () => (term ? [] : recent.map((r) => commands.find((c) => c.cmd === r)).filter(Boolean)),
    [term, recent, commands]
  );
  const items = useMemo(() => [...recentItems.map((c) => ({ ...c, recent: true })), ...results], [recentItems, results]);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      setQ('');
      setSel(0);
      setLog(null);
      requestAnimationFrame(() => input.current?.focus());
    } else {
      lastFocus.current?.focus?.({ preventScroll: true });
    }
  }, [open]);

  useEffect(() => setSel(0), [term]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${sel}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  // Typing animation for the empty prompt.
  useEffect(() => {
    if (!open || q || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGhost(q ? '' : demo[0]);
      return undefined;
    }
    let w = 0, c = 0, dir = 1, t;
    const step = () => {
      const word = demo[w];
      c += dir;
      setGhost(word.slice(0, c));
      if (dir === 1 && c === word.length) { dir = -1; t = setTimeout(step, 1400); return; }
      if (dir === -1 && c === 0) { dir = 1; w = (w + 1) % demo.length; t = setTimeout(step, 300); return; }
      t = setTimeout(step, dir === 1 ? 70 : 30);
    };
    t = setTimeout(step, 400);
    return () => clearTimeout(t);
  }, [open, q]);

  const execute = (c) => {
    const out = c.run();
    if (!c.hidden && c.cmd !== 'help' && c.cmd !== 'clear history') {
      const next = [c.cmd, ...recent.filter((r) => r !== c.cmd)].slice(0, 5);
      setRecent(next);
      saveRecent(next);
    }
    setQ('');
    if (out && typeof out === 'object') {
      if (out.error) return setLog({ type: 'error', cmd: c.cmd, text: out.error });
      if (out.stay === 'help') return setLog({ type: 'help', cmd: 'help' });
      return setLog({ type: 'ok', cmd: c.cmd, text: out.stay });
    }
    setLog({ type: 'ok', cmd: c.cmd, text: out });
    setTimeout(onClose, 420);
  };

  const submit = () => {
    if (term === 'vistara') return execute(egg);
    const exact = commands.find((c) => c.cmd === term || c.aliases.includes(term));
    if (exact) return execute(exact);
    if (items[sel] && term && results.length) return execute(items[sel]);
    if (!term && items[sel]) return execute(items[sel]);
    setLog({ type: 'error', cmd: q.trim(), text: `command not found: ${q.trim()}. Type "help" to see what works.` });
    setQ('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((i) => Math.min(items.length - 1, i + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((i) => Math.max(0, i - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); submit(); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    else if (e.key === 'Tab') {
      e.preventDefault();
      if (items[sel]) setQ(items[sel].cmd);
    }
  };

  if (!open) return null;

  let lastGroup = '';
  return (
    <div className={s.backdrop} onMouseDown={onClose}>
      <div className={s.window} role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()}>
        <div className={s.bar}>
          <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
          <span className={s.title}>vistara — command</span>
          <kbd>esc</kbd>
        </div>

        <div className={s.prompt}>
          <span className={s.ps1} aria-hidden="true">vistara<b>:~$</b></span>
          <div className={s.field}>
            <input
              ref={input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck="false"
              autoComplete="off"
              aria-label="Type a command"
              role="combobox"
              aria-expanded="true"
              aria-controls="cmd-list"
              aria-activedescendant={items[sel] ? `cmd-opt-${sel}` : undefined}
            />
            {!q && (
              <span className={s.ghost} aria-hidden="true">
                {ghost}<span className={s.caret} />
              </span>
            )}
          </div>
        </div>

        {log && (
          <div className={`${s.log} ${log.type === 'error' ? s.logErr : ''}`} role="status">
            <p className={s.echo}><span>$</span> {log.cmd}</p>
            {log.type === 'help' ? (
              <ul className={s.help}>
                {commands.map((c) => (
                  <li key={c.cmd}><code>{c.cmd}</code><span>{c.desc}</span></li>
                ))}
                <li><code>…</code><span>There may be one more. Try the studio&apos;s name.</span></li>
              </ul>
            ) : (
              <p>{log.type === 'error' ? '✕ ' : '→ '}{log.text}</p>
            )}
          </div>
        )}

        <ul className={s.list} id="cmd-list" role="listbox" ref={listRef}>
          {items.length === 0 && term !== 'vistara' && (
            <li className={s.empty}>No matching command. Press Enter to try it anyway, or type <code>help</code>.</li>
          )}
          {term === 'vistara' && <li className={s.empty}>✦ Press Enter.</li>}
          {items.map((c, i) => {
            const group = c.recent ? 'Recent' : term ? 'Matches' : 'Commands';
            const header = group !== lastGroup ? group : null;
            lastGroup = group;
            return (
              <li key={`${c.recent ? 'r' : 'c'}-${c.cmd}`} role="presentation">
                {header && <p className={s.group}>{header}</p>}
                <button
                  type="button"
                  id={`cmd-opt-${i}`}
                  data-i={i}
                  role="option"
                  aria-selected={sel === i}
                  tabIndex={-1}
                  className={`${s.item} ${sel === i ? s.sel : ''}`}
                  onMouseMove={() => setSel(i)}
                  onClick={() => execute(c)}
                >
                  <code>{c.cmd}</code>
                  <span>{c.desc}</span>
                  {sel === i && <CornerDownLeft size={14} className={s.enter} aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>

        <div className={s.foot}>
          <span><kbd>↑</kbd><kbd>↓</kbd> select</span>
          <span><kbd>tab</kbd> complete</span>
          <span><kbd>↵</kbd> run</span>
        </div>
      </div>
    </div>
  );
}
