/*
 * @Date: 2025-02-11 17:42:51
 * @Description: description
 */
// store/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CommentState {
  
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    
  } as CommentState,
  reducers: {
  },
  
});

export const {  } = counterSlice.actions;

export default counterSlice.reducer;
