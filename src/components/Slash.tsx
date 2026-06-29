type SlashVariant = 'tall' | 'how' | 'nav' | 'sm' | 'inline';

interface SlashProps {
  variant?: SlashVariant;
  /** When true, the slash rotates in on scroll (gets data-slash for the reveal hook). */
  animated?: boolean;
}

// A thin diagonal hairline, the site's signature divider.
export function Slash({ variant, animated }: SlashProps) {
  const cls = 'slash' + (variant ? ` slash--${variant}` : '');
  return <span className={cls} {...(animated ? { 'data-slash': '' } : {})} />;
}
