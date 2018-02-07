import React from 'react';
import { Constants } from '../../other/Constants.js';
import { SingleNumberModal } from '../presentational/SingleNumberModal.jsx'

export class SingleNumberModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.inputValue
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleKeyPress(e) {
    if (e.key == Constants.enterKey) {
      this.props.onSubmit(this.state.inputValue);
    }
  }
	
  handleChange(e) {
    const newValue = parseInt(e.target.value);
    this.setState({ inputValue: newValue });
  }
  
  handleSubmit(e) {
    this.props.onSubmit(this.state.inputValue);
  }
  
  render() {
    return (
      <SingleNumberModal
        isDisplayed={this.props.isOpen}
        toggle = {this.props.toggle}
        inputValue = {this.state.inputValue}
        handleChange = {this.handleChange}
        handleKeyPress = {this.handleKeyPress}
        handleSubmit = {this.handleSubmit}
        buttonText = {this.props.buttonText}
        labelText = {this.props.labelText}
      />
    );
  }
}