import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedYearlyReturn, { YearlyReturn } from '../../components/YearlyReturnComponent';
import {Provider} from 'react-redux';
import * as ActionTypes from '../../redux/actionTypes';

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

//******************************************************************************

describe('YearlyReturn Component - non-connected REACT (shallow rendering)', () => {
  let setup;

  beforeAll(() => {
    
    setup = ({ isLoading, errMsg, yearlyReturn }) => {
      const props = {
        fetchYearlyReturn: jest.fn(),
        yearlyReturn: {
          isLoading: isLoading,
          errMsg: errMsg,
          yearlyReturn: yearlyReturn
        }
      };
    
      const enzymeWrapper = shallow(<YearlyReturn {...props} />);
    
      return { props, enzymeWrapper };
    }
  });

  describe('when fetching data or at initial state', () => {

    it('renders self and subcomponents', () => {
      const { enzymeWrapper } = setup({
        isLoading: true, 
        errMsg: null,
        yearlyReturn: ""
      });
  
      expect(enzymeWrapper.length).toEqual(1);
      expect(enzymeWrapper.find('p').text()).toBe('Loading...');
  
    });

    it('calls fetchYearlyReturn', () => {
      const { props } = setup({
        isLoading: true, 
        errMsg: null,
        yearlyReturn: ""
      });

      expect(props.fetchYearlyReturn).toHaveBeenCalled();
    });

  });

  describe('when data was successfully fetched', () => {

    it('renders self and subcomponents', () => {
      const { enzymeWrapper } = setup({
        isLoading: false,
        errMsg: null,
        yearlyReturn: "10" 
      });
  
      expect(enzymeWrapper.length).toEqual(1);
      expect(enzymeWrapper.find('p').text()).toBe('The yearly return for this validator is: 10 %');
  
    });

  });

  describe('when data failed to be fetched', () => {

    it('renders self and subcomponents', () => {
      const { enzymeWrapper } = setup({
        isLoading: false,
        errMsg: "error while fetching the data",
        yearlyReturn: "" 
      });
  
      expect(enzymeWrapper.length).toEqual(1);
      expect(enzymeWrapper.find('p').text()).toBe('error while fetching the data');
  
    });

  });
});

//******************************************************************************
describe('YearlyReturn Component - REACT+REDUX REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  
  const initialState = {
    yearlyReturn: {
      isLoading: true,
      errMsg: null,
      yearlyReturn: ""
    }
  };
  const mockStore = configureStore();
  let store, wrapper;

  beforeAll(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedYearlyReturn />
      </Provider>);
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('renders the connected component', () => {
    expect(wrapper.find(ConnectedYearlyReturn).length).toEqual(1);
  });

  it('has same props as the initial state', () => {
    expect(wrapper.find(YearlyReturn).prop('yearlyReturn')).toEqual(initialState.yearlyReturn);
  });

  it('sends actions on dispatching ', () => {
    let action
    store.dispatch({type: ActionTypes.REQUEST_Y_RETURN});
    action = store.getActions();
    expect(action[0].type).toBe("REQUEST_Y_RETURN");
});

});
