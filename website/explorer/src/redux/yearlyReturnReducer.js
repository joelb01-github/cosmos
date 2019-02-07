import * as ActionTypes from './actionTypes';

export const YearlyReturn = (state = {
  isLoading: true,
  errMsg: null,
  yearlyReturn: ""
}, action) => {
  switch(action.type) {

    case ActionTypes.REQUEST_Y_RETURN:
      return {...state,
        isLoading: true, 
        errMsg: null,
        yearlyReturn: ""
      };

    case ActionTypes.RECEIVE_Y_RETURN:
      return {...state,
        isLoading: false,
        errMsg: null,
        yearlyReturn: action.payload 
      };

    case ActionTypes.FAILED_Y_RETURN:
      return {...state,
        isLoading: false,
        errMsg: action.payload,
        yearlyReturn: "" 
      };

    default:
      return state;
  }
}