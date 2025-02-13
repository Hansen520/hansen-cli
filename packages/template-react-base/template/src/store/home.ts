/*
 * @Date: 2025-02-11 17:42:51
 * @Description: description
 */
// store/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface CounterState {
  value: number;
}

/* 写了一个计数的功能 */
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  } as CounterState,
  reducers: {
    increment: state => {
      // Redux Toolkit 允许我们在 reducers 中直接写 'mutating' 逻辑。
      // 它并不会真的改变状态，因为它是基于 immer 库的，它会返回一个新状态。
      state.value += 1;
    },
    decrement: state => {
      console.log(state, 26);
      state.value -= 1;
      // 可以在这里写请求方法
      axios.get('https://www.baidu.com').finally(() => {
        console.log('请求完成');
        state.value -= 1;
      })
    },
    // 使用 'payload' 参数来传递一个值
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },

  },
});
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
