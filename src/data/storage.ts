import type { Intake } from '../types';

// sessionStorage helpers that carry intake state across the
// router -> plan -> dashboard flow (replaces the legacy ap.intake helpers).
const STORE = 'ap.intake';

export function saveIntake(data: Intake): void {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(data));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function loadIntake(): Intake | null {
  try {
    const raw = sessionStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as Intake) : null;
  } catch {
    return null;
  }
}
