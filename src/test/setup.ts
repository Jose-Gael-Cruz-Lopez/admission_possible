import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom stubs for browser APIs the app touches.
// Report reduced-motion so the reveal hook skips animation in tests.
window.matchMedia =
  window.matchMedia ||
  ((query: string) =>
    ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList);

window.scrollTo = vi.fn();
