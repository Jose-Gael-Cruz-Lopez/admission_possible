import type { Crumb, NavItem } from '../types';

// Top-level navigation: header menu + inline-slash crumb bands.
export const NAV: NavItem[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'how', label: 'How it works', path: '/how' },
  { id: 'offer', label: 'What we offer', path: '/offer' },
  { id: 'pathways', label: 'Pathways', path: '/pathways' },
  { id: 'coaching', label: 'Coaching', path: '/coaching' },
  { id: 'join', label: 'Join', path: '/join' },
];

// Build the full-nav crumb set for a top-level page, current item enlarged.
export function navCrumbs(currentId: string): Crumb[] {
  return NAV.map((n) => (n.id === currentId ? { label: n.label } : { label: n.label, to: n.path }));
}
