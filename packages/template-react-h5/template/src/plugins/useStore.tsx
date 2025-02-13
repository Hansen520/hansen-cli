/*
 * @Date: 2023-12-11 10:33:32
 * @Description: description
 */
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';

export default (): [RootState, Dispatch] => {
  const dispatch = useDispatch<Dispatch>();
  const state = useSelector((state: RootState) => state);
  return [state, dispatch];
};


