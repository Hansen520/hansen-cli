import { memo, useEffect, useState, useCallback, useMemo } from "react";

function Aaa() {
  const [, setNum] = useState(1);

  const [count, setCount] = useState(2);

  useEffect(() => {
    setInterval(() => {
      setNum(Math.random());
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCount(Math.random());
    }, 2000);
  }, []);

  // 每一次的function都是新创建的， 所以用useCallback它的作用就是当 deps 数组不变的时候，始终返回同一个 function，当 deps 变的时候，才把 function 改为新传入的
  const bbbCallback = useCallback(() => {}, []);

  // useMemo 也是和 memo 打配合的，只不过它保存的不是函数，而是值
  const count2 = useMemo(() => {
    return count * 10;
}, [count]);

  return (
    <div>
      <MemoBbb count={count2} callback={bbbCallback}></MemoBbb>
    </div>
  );
}

interface BbbProps {
  count: number;
  callback: Function; // 回调函数
}

function Bbb(props: BbbProps) {
  console.log("bbb render");

  return <h2>{props.count}</h2>;
}
const MemoBbb = memo(Bbb);

export default Aaa;
