import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import counter from './home';
import comments from './comments';

export const store =  configureStore({
  reducer: {
    counter,
    comments
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
