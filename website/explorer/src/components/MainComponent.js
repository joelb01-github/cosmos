import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChainSize from './ChainSizeComponent';
import AvReward from './AvRewardComponent';
import YearlyReturn from './YearlyReturnComponent';

class Main extends Component {

  render() {
    return (
      <div>
        <ChainSize />
        <AvReward />
        <YearlyReturn />
      </div>
    );
  }

}

export default Main;

Main.protoType = {
  ChainSize: PropTypes.element
}