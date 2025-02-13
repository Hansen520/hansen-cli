/*
 * @Date: 2024-02-22 10:27:56
 * @Description: description
 */
import {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";

const countContext = createContext<number>(0);

interface CccProps1 extends HTMLAttributes<HTMLDivElement> {
  clickHandler: MouseEventHandler<HTMLDivElement>;
  clickHandler1: (e: MouseEvent<HTMLDivElement>) => void;
}

type CccProps = PropsWithChildren<{
  content: ReactNode;
  color: CSSProperties["color"];
  styles?: CSSProperties;
}>;

function Ccc(props: CccProps & CccProps1) {
  return (
    <div onClick={props.clickHandler} onChange={props.clickHandler1}>
      ccc, {props.content}
      {props.children}
    </div>
  );
}

function TypescriptTest() {
  const ref = useRef<HTMLDivElement>(null);

  const fn = useCallback<() => number>(() => {
    return 666;
  }, []);

  const obj = useMemo<{ aaa: number }>(() => {
    return {
      aaa: 123,
    };
  }, []);

  const count = useContext<number>(countContext);

  return (
    <div>
      <div ref={ref}>refTs</div>
      <Ccc
        clickHandler={(e) => {
          console.log(e.cancelable);
        }}
        clickHandler1={(e) => {
          console.log(e.altKey);
        }}
        placeholder="a"
        content="123"
        color="orange"
        styles={{ backgroundColor: "red" }}
      >
        123
      </Ccc>
      TypescriptTest
    </div>
  );
}

export default TypescriptTest;
