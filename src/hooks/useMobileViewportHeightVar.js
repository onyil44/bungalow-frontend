import { useEffect } from 'react';

export function useMobileViewportHeightVar() {
  useEffect(() => {
    const root = document.documentElement;
    const setH = () => {
      const vv = window.visualViewport;
      const h = vv?.height || window.innerHeight;
      root.style.setProperty('--app-h', `${Math.round(h)}px`);
    };
    setH();
    window.visualViewport?.addEventListener('resize', setH);
    window.visualViewport?.addEventListener('scroll', setH);
    window.addEventListener('resize', setH);
    window.addEventListener('orientationchange', setH);
    return () => {
      window.visualViewport?.removeEventListener('resize', setH);
      window.visualViewport?.removeEventListener('scroll', setH);
      window.removeEventListener('resize', setH);
      window.removeEventListener('orientationchange', setH);
    };
  }, []);
}
