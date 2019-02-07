import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionTypes from '../redux/actionTypes';

const mapStateToProps = state => {
  return { yearlyReturn: state.yearlyReturn };
}

const mapDispactchToProps = dispatch => {
  return {
    fetchYearlyReturn: () => dispatch({type: ActionTypes.REQUEST_Y_RETURN}) 
  };
}

export class YearlyReturn extends Component {

  componentDidMount() { this.props.fetchYearlyReturn(); }

  render() {
    if (this.props.yearlyReturn.errMsg) { 
      return <p>{this.props.yearlyReturn.errMsg}</p>; 
    }
    if (this.props.yearlyReturn.isLoading) { 
      return <p>Loading...</p>; 
    }

    return (
      <p>The yearly return for this validator is: {this.props.yearlyReturn.yearlyReturn} %</p>
    );
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(YearlyReturn);

YearlyReturn.protoType = {
  yearlyReturn: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    yearlyReturn: PropTypes.string.isRequired
  }),
  fetchYearlyReturn: PropTypes.func.isRequired
};