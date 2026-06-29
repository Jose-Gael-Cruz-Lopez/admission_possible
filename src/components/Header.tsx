import { Link } from 'react-router-dom';
import { useScrollHideHeader } from '../hooks/useScrollHideHeader';
import { Wordmark } from './Wordmark';

// Three hand-drawn wavy lines (the menu trigger).
function Hamburger() {
  return (
    <svg viewBox="0 0 36 26" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M3 5q4.5-3 9 0t9 0t9 0" />
      <path d="M3 13q4.5-3 9 0t9 0t9 0" />
      <path d="M3 21q4.5-3 9 0t9 0t9 0" />
    </svg>
  );
}

export function Header({ onMenu }: { onMenu: () => void }) {
  const ref = useScrollHideHeader<HTMLElement>();
  return (
    <header className="header" ref={ref}>
      <div className="header__bar">
        <button className="menu-toggle" aria-label="Open menu" onClick={onMenu}>
          <Hamburger />
        </button>
        <Link className="wordmark-link" to="/" aria-label="Home">
          <Wordmark />
        </Link>
      </div>
      <div className="rule" />
    </header>
  );
}
