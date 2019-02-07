import * as ActionTypes from './actionTypes';

export const AvReward = (state = {
  isLoading: true,
  errMsg: null,
  avReward: ""
}, action) => {
  switch(action.type) {

    case ActionTypes.REQUEST_AV_REWARD:
      return {...state,
        isLoading: true, 
        errMsg: null,
        avReward: ""
      };

    case ActionTypes.RECEIVE_AV_REWARD:
      return {...state,
        isLoading: false,
        errMsg: null,
        avReward: action.payload 
      };

    case ActionTypes.FAILED_AV_REWARD:
      return {...state,
        isLoading: false,
        errMsg: action.payload,
        avReward: "" 
      };

    default:
      return state;
  }
}