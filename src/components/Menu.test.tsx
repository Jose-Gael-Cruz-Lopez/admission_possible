import { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from './Menu';
import { renderWithRouter } from '../test/utils';

// A minimal opener + Menu, mirroring how Chrome drives the dialog, so we can
// assert focus is captured from the opener and restored to it on close.
function MenuHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button data-testid="opener" onClick={() => setOpen(true)}>
        Open menu
      </button>
      <Menu open={open} current="home" onClose={() => setOpen(false)} />
    </>
  );
}

describe('Menu', () => {
  it('focuses the close button on open and restores focus to the opener on close', async () => {
    const user = userEvent.setup();
    renderWithRouter(<MenuHarness />);
    const opener = screen.getByTestId('opener');

    await user.click(opener);
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toHaveFocus();

    await user.click(closeButton);
    expect(opener).toHaveFocus();
  });

  it('wraps Tab from the last focusable back to the first', () => {
    renderWithRouter(<Menu open current="home" onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    const firstLink = screen.getAllByRole('link')[0];
    const closeButton = screen.getByRole('button', { name: /close menu/i });

    closeButton.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(firstLink).toHaveFocus();
  });

  it('wraps Shift+Tab from the first focusable back to the last', () => {
    renderWithRouter(<Menu open current="home" onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    const firstLink = screen.getAllByRole('link')[0];
    const closeButton = screen.getByRole('button', { name: /close menu/i });

    firstLink.focus();
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(closeButton).toHaveFocus();
  });
});
