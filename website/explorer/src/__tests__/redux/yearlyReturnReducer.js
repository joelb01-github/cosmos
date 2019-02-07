import { YearlyReturn } from '../../redux/yearlyReturnReducer';
import * as ActionTypes from '../../redux/actionTypes';

describe('yearlyReturn reducer', () => {
  it('should return the initial state', () => {
    expect(YearlyReturn(undefined, {}))
    .toEqual({
      isLoading: true,
      errMsg: null,
      yearlyReturn: ""
    });
  });

  it('should handle REQUEST_Y_RETURN', () => {
    expect(YearlyReturn({}, {
      type: ActionTypes.REQUEST_Y_RETURN
    }))
    .toEqual({
      isLoading: true, 
      errMsg: null,
      yearlyReturn: ""
    });
  });

  it('should handle RECEIVE_Y_RETURN', () => {
    expect(YearlyReturn({}, {
      type: ActionTypes.RECEIVE_Y_RETURN,
      payload: "data" 
    }))
    .toEqual({
      isLoading: false,
      errMsg: null,
      yearlyReturn: "data" 
    });
  });

  it('should handle FAILED_Y_RETURN', () => {
    expect(YearlyReturn({}, {
      type: ActionTypes.FAILED_Y_RETURN,
      payload: "error message"
    }))
    .toEqual({
      isLoading: false,
      errMsg: "error message",
      yearlyReturn: "" 
    });
  });
});