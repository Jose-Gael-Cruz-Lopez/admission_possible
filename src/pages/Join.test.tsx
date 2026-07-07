import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Join from './Join';
import { renderWithRouter } from '../test/utils';

const ENDPOINT = 'https://example.test/join';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const fillValid = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('First name'), 'Ada');
  await user.type(screen.getByLabelText('Email'), 'ada@example.com');
};

const submit = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole('button', { name: 'Join' }));

describe('Join form', () => {
  it('shows an accessible error and does not submit when the email is invalid', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('VITE_JOIN_ENDPOINT', ENDPOINT);

    renderWithRouter(<Join />);
    await user.type(screen.getByLabelText('First name'), 'Ada');
    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await submit(user);

    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'Thanks' })).not.toBeInTheDocument();
  });

  it('shows an error and does not submit when the first name is empty', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('VITE_JOIN_ENDPOINT', ENDPOINT);

    renderWithRouter(<Join />);
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await submit(user);

    expect(screen.getByRole('alert')).toHaveTextContent(/first name/i);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'Thanks' })).not.toBeInTheDocument();
  });

  it('POSTs the payload to the configured endpoint and shows "Thanks" on success', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('VITE_JOIN_ENDPOINT', ENDPOINT);

    renderWithRouter(<Join />);
    await fillValid(user);
    await submit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(init.method).toBe('POST');
    expect(init.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(JSON.parse(init.body)).toMatchObject({ first: 'Ada', email: 'ada@example.com' });

    expect(await screen.findByRole('button', { name: 'Thanks' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows the retry state when the endpoint responds not-ok', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('VITE_JOIN_ENDPOINT', ENDPOINT);

    renderWithRouter(<Join />);
    await fillValid(user);
    await submit(user);

    expect(await screen.findByRole('button', { name: 'Try again' })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows the retry state when the fetch rejects', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('VITE_JOIN_ENDPOINT', ENDPOINT);

    renderWithRouter(<Join />);
    await fillValid(user);
    await submit(user);

    expect(await screen.findByRole('button', { name: 'Try again' })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('falls back to mailto (no fetch) when no endpoint is configured', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('VITE_JOIN_ENDPOINT', '');

    renderWithRouter(<Join />);
    await fillValid(user);
    await submit(user);

    // No backend call was made, yet the visitor still gets a success handoff.
    expect(fetchMock).not.toHaveBeenCalled();
    expect(await screen.findByRole('button', { name: 'Thanks' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
