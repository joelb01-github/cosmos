import { ChainSize } from './chainSizeReducer';
import { YearlyReturn } from './yearlyReturnReducer';
import { AvReward } from './avRewardReducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// from connected-react-router
export const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  chainSize: ChainSize,
  avReward: AvReward,
  yearlyReturn: YearlyReturn
});