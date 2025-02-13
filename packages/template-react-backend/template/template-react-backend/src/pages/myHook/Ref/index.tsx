/*
 * @Date: 2024-02-21 15:42:38
 * @Description: description
 */
import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle } from 'react';

interface RefProps {
  abc: () => void;
}

const ChildrenComponent: ForwardRefRenderFunction<RefProps> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState()


  useImperativeHandle(ref, () => {
    return {
      abc() {
        inputRef.current?.focus();
        setTimeout(() => {
          // axios.get('https://mock.mengxuegu.com/mock/6333f762fc3600383bca1eff/shme/muck/dispose').then(response => {
          //   setState(response.data)
          // })
          console.table('异步调用');
        }, 1000);
        
      }
    }
  }, [inputRef])

  return (
    <div>
      <input type="text" ref={inputRef} />
      {JSON.stringify(state)}
    </div>
  );
};

const HansenComponent = forwardRef(ChildrenComponent);

function UseRef() {
  const ref = useRef<RefProps>(null);
  useEffect(() => {
    ref.current?.abc();
  }, [])
  
  return (
    <div>
      <HansenComponent ref={ref} />
    </div>
  );
}

export default UseRef;
