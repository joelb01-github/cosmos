import * as ActionTypes from './actionTypes';
import { call, put, takeEvery, all } from 'redux-saga/effects'
import fetch from 'cross-fetch';

const API = 'https://private-cc47d-cosmosexplorer.apiary-mock.com';
const CHAIN_SIZE = '/chain_size';
const AV_REWARD = '/average_reward';
const Y_RETURN = '/yearly_return';

// ********** AvReward *******************

function* watchFetchAvReward() {
  yield takeEvery(ActionTypes.REQUEST_AV_REWARD, fetchAvReward)
};

export function* fetchAvReward() {
  try {
    const json = yield call(fetchAPI, AV_REWARD);
    yield put({type: ActionTypes.RECEIVE_AV_REWARD, payload: json.av_reward});
  } catch (error) {
    yield put({type: ActionTypes.FAILED_AV_REWARD, payload: error.message});
  }
};

// ********** YearlyReturn *******************

function* watchFetchYearlyReturn() {
  yield takeEvery(ActionTypes.REQUEST_Y_RETURN, fetchYearlyReturn)
};

export function* fetchYearlyReturn() {
  try {
    const json = yield call(fetchAPI, Y_RETURN);
    yield put({type: ActionTypes.RECEIVE_Y_RETURN, payload: json.y_return});
  } catch (error) {
    yield put({type: ActionTypes.FAILED_Y_RETURN, payload: error.message});
  }
};

// ********** ChainSize *******************

function* watchFetchChainSize() {
  yield takeEvery(ActionTypes.REQUEST_CHAIN_SIZE, fetchChainSize)
};

export function* fetchChainSize() {
  try {
    const json = yield call(fetchAPI, CHAIN_SIZE);
    yield put({type: ActionTypes.RECEIVE_CHAIN_SIZE, payload: json.chain_size});
  } catch (error) {
    yield put({type: ActionTypes.FAILED_CHAIN_SIZE, payload: error.message});
  }
};

// *********** ADMIN *********************
export function* rootSaga() {
  yield all([
    watchFetchChainSize(),
    watchFetchAvReward(),
    watchFetchYearlyReturn()
  ]);
};

export const fetchAPI =  async (endpoint) => {
  const result = await fetch(API + endpoint);
  const json = await result.json();
  return json;
};