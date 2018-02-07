import React from 'react';

export class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  focus() {
    this.theInput.focus();
  }
  
  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <p>
        {this.props.labelText}
        <input
          ref={input => this.theInput = input}
          onChange={this.props.handleChange}
          onKeyPress={this.props.handleKeyPress}
          type={this.props.type}
          min={this.props.min}
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
        />
      </p>
    );
  }
}