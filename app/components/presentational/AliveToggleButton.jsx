import React from 'react';
import { Button } from './button.jsx';

export class AliveToggleButton extends React.Component {
  render() {
    return (
      <div className="aliveDead button-container">
        <Button
          onClick={this.props.toggleAliveDead}
          text={this.props.isAlive ? "revive" : "kill"}
        />
      </div>
    );
  }
}