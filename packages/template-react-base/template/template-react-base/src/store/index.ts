/*
 * @Date: 2025-02-12 09:40:03
 * @Description: description
 */
import { configureStore } from '@reduxjs/toolkit'
import counter from './home';

export const store =  configureStore({
  reducer: {
    counter
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch