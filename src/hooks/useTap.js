import { useRef, useMemo, useCallback } from 'react';

const isIOS =
  typeof navigator !== 'undefined' &&
  /iPhone|iPad|iPod/i.test(navigator.userAgent);
const supportsPointer =
  typeof window !== 'undefined' && 'onpointerup' in window;

/** useTap(handler)
 *  -  Execute with touch/pointer in iOS, disable ghost click
 *  -  uses onClick in others
 */
export function useTap(handler) {
  const lastTouchTs = useRef(0);

  const fire = useCallback(
    (e) => {
      handler?.(e);
    },
    [handler],
  );

  const onPointerUp = useCallback(
    (e) => {
      if (e.button != null && e.button !== 0) return; // only left click
      fire(e);
    },
    [fire],
  );

  const onTouchEnd = useCallback(
    (e) => {
      // In iOs sometimes delay or skip click → execute directly
      e.preventDefault(); // hinder possible ghost click.
      lastTouchTs.current = Date.now();
      fire(e);
    },
    [fire],
  );

  const onClick = useCallback(
    (e) => {
      // Skip syentethic click comes after touch
      if (Date.now() - lastTouchTs.current < 500) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      fire(e);
    },
    [fire],
  );

  // iOS + pointer supported pointer; or touch. outside iOS: click
  return useMemo(() => {
    if (isIOS)
      return supportsPointer
        ? { onPointerUp, onClick }
        : { onTouchEnd, onClick };
    return { onClick };
  }, [onPointerUp, onTouchEnd, onClick]);
}
