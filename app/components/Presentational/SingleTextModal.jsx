import React from 'react';
import { Button } from './button.jsx';
import { SingleTextModalContainer } from '../containers/SingleTextModalContainer.jsx';
import { Modal } from './Modal.jsx';
import { Input } from './forms/Input.jsx';

export class SingleTextModal extends React.Component {
  render() {
    return (
      <Modal
        isDisplayed={this.props.isDisplayed}
        toggle={this.props.toggle}
      >
        <form className="input-container">
          <Input
            labelText={this.props.labelText}
            type="text"
            value={this.props.inputValue}
            isVisible={true}
            handleChange={this.props.handleChange}
            handleKeyPress={this.props.handleKeyPress}
            autoFocus={true}
          />
          <Button onClick={this.props.handleSubmit} text={this.props.buttonText} />
        </form>
      </Modal>
    );
  }
}