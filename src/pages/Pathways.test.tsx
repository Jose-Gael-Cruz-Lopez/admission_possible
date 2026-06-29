import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Pathways from './Pathways';
import { PATHWAYS } from '../data/pathways';
import { renderWithRouter } from '../test/utils';

describe('Pathways', () => {
  it('renders a row for every application system', () => {
    renderWithRouter(<Pathways />);
    for (const p of PATHWAYS) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    }
  });

  it('shows the metadata for a known pathway', () => {
    renderWithRouter(<Pathways />);
    expect(screen.getByText('National Match = possible full ride')).toBeInTheDocument();
  });
});
