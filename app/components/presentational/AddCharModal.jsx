import React from 'react';
import { Button } from './button.jsx';
import { Constants } from '../../other/Constants.js';
import { Modal } from './Modal.jsx';
import { Input } from './forms/Input.jsx';

export class AddCharModal extends React.Component {
  focusNameInput() {
    this.nameInput.focus();
  }

  render() {
    return (
      <Modal
        id="addCharModal"
        isDisplayed={this.props.isDisplayed}
        toggle={this.props.toggleAddCharModal}
      >
        <h2> Add a character to the Encounter </h2>
        <Button addClass={this.props.selectedType + ' ' + "PCbox"} text="PC" onClick={this.props.handleNewPC} />
        <Button addClass={this.props.selectedType + ' ' + "NPCbox"} text="NPC" onClick={this.props.handleNewNPC} />
        <Button addClass={this.props.selectedType + ' ' + "Groupbox"} text="Group" onClick={this.props.handleNewGroup} />
        <form id="char-wiz-form" className="input-container">
          <Input
            ref={node => this.nameInput = node}
            labelText="Name"
            type="text"
            isVisible={true}
            handleChange={this.props.handleNewName}
            handleKeyPress={this.props.handleKeyPress}
            autoFocus={true}
          />
          <Input
            labelText={Constants.initLabelString}
            type="number"
            isVisible={true}
            handleChange={this.props.handleNewInit}
            handleKeyPress={this.props.handleKeyPress}
            placeholder="0"
          />
          <Input
            labelText="Hit Points"
            type="number"
            isVisible={this.props.hpVis}
            handleChange={this.props.handleNewHp}
            handleKeyPress={this.props.handleKeyPress}
            placeholder="33"
            min="1"
          />
          <Input
            labelText="How many?"
            type="number"
            isVisible={this.props.amountVis}
            handleChange={this.props.handleNewAmount}
            handleKeyPress={this.props.handleKeyPress}
            placeholder="4"
            min="2"
          />
        </form>
        <br />
        <Button addClass="submit" text="Add Character(s)" onClick={this.props.handleSubmit} />
      </Modal>
    );
  }
}