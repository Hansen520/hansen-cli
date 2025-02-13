/*
 * @Date: 2024-02-21 16:00:16
 * @Description: description
 */
import { useState } from "react";
import { produce } from 'immer';

function State() {
  const [obj, setObj] = useState({
    a: {
      c: {
        e: 0,
        f: 0,
      },
      d: 0,
    },
    b: 0,
  });
  return (
    <div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          
          setObj(produce(obj, (obj) => {
            obj.a.c.e++;
            obj.a.d--
          }));
        }}
      >
        加+减-
      </div>
      <div>{JSON.stringify(obj)}</div>
    </div>
  );
}

export default State;
