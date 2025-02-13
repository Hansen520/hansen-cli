import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, AppStore, useAppSelector, useAppDispatch } from '@/store';

export default (): [RootState, AppDispatch] => {
  // const dispatch = useAppDispatch<AppDispatch>();
  const state = useAppSelector((state: RootState) => state);
  return [state, useAppDispatch()];
};