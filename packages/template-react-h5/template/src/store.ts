import { init, RematchDispatch, RematchRootState, Models } from '@rematch/core';

import { home } from '@/models/home';
import { global } from '@/models/global';

export interface RootModel extends Models<RootModel> {

  global: typeof global;
  home: typeof home;
}
const models: RootModel = {
  global,
  home,
};

const store = init({
  models,
});

export type State = keyof RootModel;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
export default store;
