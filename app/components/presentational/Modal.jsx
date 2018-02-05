import React from 'react';
import { Button } from './button.jsx';

export class Modal extends React.Component {
  render() {
    if (!this.props.isDisplayed) {
      return null;
    }
    return (
      <div className="modal">
        <div className="choice-container">
          <Button id="closer" text="&#10006;" onClick={this.props.toggle} />
          {this.props.children}
        </div>
      </div>
    );
  }
}