const debounceHandler = <T extends string[]>(
  fn: (...args: T) => void,
  delay: number = 500
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: T) => {
    clearTimeout(timeoutId!);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounceHandler;
