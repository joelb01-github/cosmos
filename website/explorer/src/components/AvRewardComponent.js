import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionTypes from '../redux/actionTypes';

const mapStateToProps = state => {
  return { avReward: state.avReward };
}

const mapDispactchToProps = dispatch => {
  return {
    fetchAvReward: () => dispatch({type: ActionTypes.REQUEST_AV_REWARD}) 
  };
}

export class AvReward extends Component {

  componentDidMount() { this.props.fetchAvReward(); }

  render() {
    if (this.props.avReward.errMsg) { 
      return <p>{this.props.avReward.errMsg}</p>; 
    }
    if (this.props.avReward.isLoading) { 
      return <p>Loading...</p>; 
    }

    return (
      <p>The average reward for this validator is: {this.props.avReward.avReward} %</p>
    );
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(AvReward);

AvReward.protoType = {
  avReward: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    avReward: PropTypes.string.isRequired
  }),
  fetchAvReward: PropTypes.func.isRequired
};