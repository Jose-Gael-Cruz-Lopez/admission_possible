import { useEffect, useRef } from 'react';

// Hide the header on scroll-down, show it on scroll-up (legacy chrome.js behaviour).
export function useScrollHideHeader<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const h = ref.current;
      if (!h) return;
      const y = window.scrollY;
      h.style.transform = y > lastY && y > 140 ? 'translateY(-100%)' : 'translateY(0)';
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
}
