import React from 'react';
import { Constants } from '../../other/Constants.js';

export class InitBar extends React.Component {
  render() {
    return (
      <h3 className="init-number">
        {Constants.initLabelString} {this.props.init}
        <span className="edit-pen" onClick={this.props.toggleInitEdit}>
          {String.fromCharCode(9999)}
        </span>
      </h3>
    );
  }
}