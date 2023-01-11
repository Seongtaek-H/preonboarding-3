import { useCallback, useRef, useEffect } from 'react';

export const useDebounce = (
  func: () => void,
  delay: number,
  inputValue: string
) => {
  const timeoutId = useRef<NodeJS.Timeout>();
  const callback = useRef(func);

  useEffect(() => {
    callback.current = func;
  }, [func]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      callback.current();
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  useEffect(() => clear, [clear]);

  useEffect(() => run, [inputValue, run]);

  return clear;
};
