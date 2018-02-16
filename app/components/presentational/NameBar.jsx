import React from 'react';
import { Button } from './button.jsx';

export class NameBar extends React.Component {
  render() {
    return (
      <div className="group-name-bar">
        <Button
          text="&#10006;"
          addClass="remove "
          onClick={this.props.handleRemoveInitGroup}
        />
        <div className="char-name">
          <h1>
            {this.props.name}
            <span className="edit-pen" onClick={this.props.toggleNameEdit}>
              {String.fromCharCode(9999)}
            </span>
          </h1>
        </div>
        <div className="button-container">
          <Button
            text={this.props.toggleButtonText}
            id="expand"
            onClick={this.props.toggleGroup}
          />
        </div>
      </div>
    );

  }
}