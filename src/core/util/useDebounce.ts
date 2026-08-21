import { useCallback, useEffect, useRef } from 'react';

// biome-ignore lint/suspicious/noExplicitAny: ARGS are any
export function useDebounce<ARGS extends any[]>(
  callback: (...args: ARGS) => void,
  postpone: number = 300,
) {
  const argsRef = useRef<ARGS>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: exception
  useEffect(() => cleanup, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: exception
  return useCallback(
    (...args: ARGS) => {
      argsRef.current = args;
      cleanup();
      timeout.current = setTimeout(() => {
        if (argsRef.current) {
          callback(...argsRef.current);
        }
      }, postpone);
    },
    [callback, postpone],
  );
}
