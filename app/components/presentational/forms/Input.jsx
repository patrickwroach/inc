import React from 'react';

export class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <p>
        {this.props.labelText}
        <input
          onChange={this.props.handleChange}
          onKeyPress={this.props.handleKeyPress}
          type={this.props.type}
          min={this.props.min}
          placeholder={this.props.placeholder}
        />
      </p>
    );
  }
}