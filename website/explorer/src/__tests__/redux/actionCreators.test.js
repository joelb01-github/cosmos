import { fetchChainSize, fetchAvReward, fetchYearlyReturn, fetchAPI } from '../../redux/actionCreators';
import { put, call } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import * as ActionTypes from '../../redux/actionTypes';

// ************ AvReward ********************

describe('fetchAvReward saga test', () => {
  const json = { av_reward: '2' };
  const AV_REWARD = '/average_reward';

  describe('with a successful fetch', () => {
    const it = sagaHelper(fetchAvReward());

    it('should call fetch API', result => {
      expect(result).toEqual(call(fetchAPI, AV_REWARD));
      return json;
    });

    it('should call the success action', result => {
      expect(result).toEqual(put({
        type: ActionTypes.RECEIVE_AV_REWARD, 
        payload: json.av_reward}));
    });

    it('should perform no further work', result => {
      expect(result).not.toBeDefined();
    });

  });

  describe('with a failed fetch', () => {
    const it = sagaHelper(fetchAvReward());
    const error = new Error("404 Not Found");

    it('should call fetch API', result => {
      expect(result).toEqual(call(fetchAPI, AV_REWARD));
      return error;
    });

    it('should call the failure action', result => {
      expect(result).toEqual(put({
        type: ActionTypes.FAILED_AV_REWARD, 
        payload: error.message}));
    });

    it('should perform no further work', result => {
      expect(result).not.toBeDefined();
    });

  });

});

// ************ YearlyReturn ********************

describe('fetchYearlyReturn saga test', () => {
  const json = { y_return: '10' };
  const Y_RETURN = '/yearly_return';

  describe('with a successful fetch', () => {
    const it = sagaHelper(fetchYearlyReturn());

    it('should call fetch API', result => {
      expect(result).toEqual(call(fetchAPI, Y_RETURN));
      return json;
    });

    it('should call the success action', result => {
      expect(result).toEqual(put({
        type: ActionTypes.RECEIVE_Y_RETURN, 
        payload: json.y_return}));
    });

    it('should perform no further work', result => {
      expect(result).not.toBeDefined();
    });

  });

  describe('with a failed fetch', () => {
    const it = sagaHelper(fetchYearlyReturn());
    const error = new Error("404 Not Found");

    it('should call fetch API', result => {
      expect(result).toEqual(call(fetchAPI, Y_RETURN));
      return error;
    });

    it('should call the failure action', result => {
      expect(result).toEqual(put({
        type: ActionTypes.FAILED_Y_RETURN, 
        payload: error.message}));
    });

    it('should perform no further work', result => {
      expect(result).not.toBeDefined();
    });

  });

});

// ************ ChainSize ********************

describe('fetchChainSize saga test', () => {
  const json = { chain_size: '256' };
  const CHAIN_SIZE = '/chain_size';

  describe('with a successful fetch', () => {
    const it = sagaHelper(fetchChainSize());

    it('should call fetch API', result => {
      expect(result).toEqual(call(fetchAPI, CHAIN_SIZE));
      return json;
    });

    it('should call the success action', result => {
      expect(result).toEqual(put({
        type: ActionTypes.RECEIVE_CHAIN_SIZE, 
        payload: json.chain_size}));
    });

    it('should perform no further work', result => {
      expect(result).not.toBeDefined();
    });

  });

  describe('with a failed fetch', () => {
    const it = sagaHelper(fetchChainSize());
    const error = new Error("404 Not Found");

    it('should call fetch API', result => {
      expect(result).toEqual(call(fetchAPI, CHAIN_SIZE));
      return error;
    });

    it('should call the failure action', result => {
      expect(result).toEqual(put({
        type: ActionTypes.FAILED_CHAIN_SIZE, 
        payload: error.message}));
    });

    it('should perform no further work', result => {
      expect(result).not.toBeDefined();
    });

  });

});