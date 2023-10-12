/**
 *
 * @param {function} callback - 실행할 함수
 * @param {number} delay - 지연시간
 * @returns
 */
const setThrottle = <T>(callback: (...args: unknown[]) => T, delay: number) => {
  let throttle: NodeJS.Timeout | null = null;
  return (...args: unknown[]) => {
    if (throttle) return;
    throttle = setTimeout(() => {
      callback(...args);
      throttle = null;
    }, delay);
  };
};

export default setThrottle;
