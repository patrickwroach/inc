import React from 'react';
import { Button } from './button.jsx';
import { SingleNumberModalContainer } from '../containers/SingleNumberModalContainer.jsx';
import { Modal } from './Modal.jsx';
import { Input } from './forms/Input.jsx';

export class SingleNumberModal extends React.Component {
  render() {
    return (
      <Modal
        isDisplayed={this.props.isDisplayed}
        toggle={this.props.toggle}
      >
        <form className="input-container">
          <Input
            labelText={this.props.labelText}
            type="number"
            value={this.props.inputValue}
            isVisible={true}
            handleChange={this.props.handleChange}
            handleKeyPress={this.props.handleKeyPress}
            autoFocus={true}
          />
          <Button addClass="submit" onClick={this.props.handleSubmit} text={this.props.buttonText} />
        </form>
      </Modal>
    );
  }
}