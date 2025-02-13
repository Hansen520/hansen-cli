/*
 * @Date: 2024-02-21 17:24:02
 * @Description: description
 */
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

function useInterval(fn: Function, time: number) {
  const ref = useRef(fn);

  // 同步执行一次
  useLayoutEffect(() => {
    ref.current = fn;
  });

  let cleanUpFnRef = useRef<Function>();

  const clean = useCallback(() => {
    cleanUpFnRef.current?.();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => ref.current(), time);

    cleanUpFnRef.current = () => {
      clearInterval(timer);
    };

    return clean;
  }, []);
}

export default useInterval;
