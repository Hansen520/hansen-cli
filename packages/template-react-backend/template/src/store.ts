import { createStore } from '@ice/store';
import global from '@/models/global';
import basic from '@/models/basic';
import test from '@/models/test';

export default createStore({ global, basic, test });
