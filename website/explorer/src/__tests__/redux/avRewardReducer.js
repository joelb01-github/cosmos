import { AvReward } from '../../redux/avRewardReducer';
import * as ActionTypes from '../../redux/actionTypes';

describe('avReward reducer', () => {
  it('should return the initial state', () => {
    expect(AvReward(undefined, {}))
    .toEqual({
      isLoading: true,
      errMsg: null,
      avReward: ""
    });
  });

  it('should handle REQUEST_AV_REWARD', () => {
    expect(AvReward({}, {
      type: ActionTypes.REQUEST_AV_REWARD
    }))
    .toEqual({
      isLoading: true, 
      errMsg: null,
      avReward: ""
    });
  });

  it('should handle RECEIVE_AV_REWARD', () => {
    expect(AvReward({}, {
      type: ActionTypes.RECEIVE_AV_REWARD,
      payload: "payload" 
    }))
    .toEqual({
      isLoading: false,
      errMsg: null,
      avReward: "payload" 
    });
  });

  it('should handle FAILED_AV_REWARD', () => {
    expect(AvReward({}, {
      type: ActionTypes.FAILED_AV_REWARD,
      payload: "error message"
    }))
    .toEqual({
      isLoading: false,
      errMsg: "error message",
      avReward: "" 
    });
  });
});