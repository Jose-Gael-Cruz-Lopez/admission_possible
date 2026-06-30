import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../test/utils';

describe('intake flow', () => {
  beforeEach(() => sessionStorage.clear());

  it('walks the 7-step router through to a computed plan', async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />, { route: '/router' });

    expect(screen.getByText('What grade are you in?')).toBeInTheDocument();

    const next = () => user.click(screen.getByRole('button', { name: /^next/i }));

    await user.click(screen.getByText('11th grade'));
    await next();
    await user.click(screen.getByText('Yes'));
    await next();
    await user.click(screen.getByText('Yes'));
    await next();
    await user.click(screen.getByText(/3\.8–4\.0/));
    await next();
    await user.click(screen.getByText('Highly selective'));
    await next();
    await user.click(screen.getByText('West'));
    await next();
    await user.click(screen.getByText('With a coach'));
    await user.click(screen.getByRole('button', { name: /see my plan/i }));

    expect(await screen.findByText('QuestBridge + Common App')).toBeInTheDocument();
    expect(screen.getByText('1:1 Coaching')).toBeInTheDocument();
  });

  it('cancels back to home from the first step', async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />, { route: '/router' });
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(await screen.findByText('Impossible is')).toBeInTheDocument();
  });
});
