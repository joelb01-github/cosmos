import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedAvReward, { AvReward } from '../../components/AvRewardComponent';
import {Provider} from 'react-redux';
import * as ActionTypes from '../../redux/actionTypes';

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

//******************************************************************************

describe('AvReward Component - non-connected REACT (shallow rendering)', () => {
  let setup;

  beforeAll(() => {
    
    setup = ({ isLoading, errMsg, avReward }) => {
      const props = {
        fetchAvReward: jest.fn(),
        avReward: {
          isLoading: isLoading,
          errMsg: errMsg,
          avReward: avReward
        }
      };
    
      const enzymeWrapper = shallow(<AvReward {...props} />);
    
      return { props, enzymeWrapper };
    }
  });

  describe('when fetching data or at initial state', () => {

    it('renders self and subcomponents', () => {
      const { enzymeWrapper } = setup({
        isLoading: true, 
        errMsg: null,
        avReward: ""
      });
  
      expect(enzymeWrapper.length).toEqual(1);
      expect(enzymeWrapper.find('p').text()).toBe('Loading...');
  
    });

    it('calls fetchAvReward', () => {
      const { props } = setup({
        isLoading: true, 
        errMsg: null,
        avReward: ""
      });

      expect(props.fetchAvReward).toHaveBeenCalled();
    });

  });

  describe('when data was successfully fetched', () => {

    it('renders self and subcomponents', () => {
      const { enzymeWrapper } = setup({
        isLoading: false,
        errMsg: null,
        avReward: "10" 
      });
  
      expect(enzymeWrapper.length).toEqual(1);
      expect(enzymeWrapper.find('p').text()).toBe('The average reward for this validator is: 10 %');
  
    });

  });

  describe('when data failed to be fetched', () => {

    it('renders self and subcomponents', () => {
      const { enzymeWrapper } = setup({
        isLoading: false,
        errMsg: "error while fetching the data",
        avReward: "" 
      });
  
      expect(enzymeWrapper.length).toEqual(1);
      expect(enzymeWrapper.find('p').text()).toBe('error while fetching the data');
  
    });

  });
});

//******************************************************************************
describe('AvReward Component - REACT+REDUX REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  
  const initialState = {
    avReward: {
      isLoading: true,
      errMsg: null,
      avReward: ""
    }
  };
  const mockStore = configureStore();
  let store, wrapper;

  beforeAll(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedAvReward />
      </Provider>);
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('renders the connected component', () => {
    expect(wrapper.find(ConnectedAvReward).length).toEqual(1);
  });

  it('has same props as the initial state', () => {
    expect(wrapper.find(AvReward).prop('avReward')).toEqual(initialState.avReward);
  });

  it('sends actions on dispatching ', () => {
    let action
    store.dispatch({type: ActionTypes.REQUEST_AV_REWARD});
    action = store.getActions();
    expect(action[0].type).toBe("REQUEST_AV_REWARD");
  });

});
