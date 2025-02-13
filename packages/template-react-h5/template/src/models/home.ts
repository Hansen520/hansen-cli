/*
 * @Date: 2023-11-29 09:15:03
 * @Description: description
 */
import { createModel } from '@rematch/core';
import { get } from 'lodash-es';
import { RootModel } from '@/store';
import server from '@/services/home';

export const home = createModel<RootModel>()({
  state: {
    // 采矿权信息概览数据
    miningPermissionInfo: {} as any as {
      mineTotal: number;
      mtZeroMonthTotal: number;
      ltThreeMonthTotal: number;
    },
    // 储量信息数量
    mineReservesCount: [] as any as {
      holdingResourceQuality: number;
      holdingResourceVolume: number;
      miningQuality: number;
      miningVolume: number;
    },
    // 储量信息
    mineReservesInfo: [] as any as {
      miningData: number;
      holdingData: number;
      dataName: string;
    }[],
    // 设备数量
    allDevice: {} as any as { noOnLine: number; onLine: number; total: number },
    // 设备数总列表
    mineDeviceQueryList: {} as any as {
      rows: [],
      total: number
    }
  },
  reducers: {
    update(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    
  }),
});
