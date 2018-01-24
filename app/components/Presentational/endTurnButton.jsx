import React from 'react';
import { Button } from './button.jsx';
import { Constants } from '../../other/Constants.js';

export class EndTurnButton extends React.Component {
  render() {
    if (!this.props.isDisplayed) {
      return null;
    }
    return (
      <Button
        text={Constants.endTurnButtonString}
        id="endTurnButton"
        onClick={this.props.endTurn}
      />
    )
  }
}