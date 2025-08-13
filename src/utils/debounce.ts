function debounce<T, A extends any[]>(
  this: T,
  callback: (this: T, ...args: A) => any,
  delay: number
): (...args: A) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: T, ...args: A) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay);
  };
}

export default debounce;
