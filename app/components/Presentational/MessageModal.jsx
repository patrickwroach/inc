import React from 'react';
import { Modal } from './Modal.jsx';

export class MessageModal extends React.Component {
  render() {
    return (
      <Modal
        toggle={this.props.toggle}
        isDisplayed={this.props.isDisplayed}
      >
        <h3>{this.props.text}</h3>
      </Modal>
    );
  }
}