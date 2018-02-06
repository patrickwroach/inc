import React from 'react';
import { Button } from './button.jsx';
import { Constants } from '../../other/Constants.js';
import { Modal } from './Modal.jsx';
import { Input } from './forms/Input.jsx';

export class AddCharModal extends React.Component {
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
          <p>
            Name:
              <input type="text"
              onChange={this.props.handleNewName}
              onKeyPress={this.props.handleKeyPress}
              autoFocus
            />
          </p>
          <p>
            Initiative
              <input type="number"
              placeholder="0"
              onChange={this.props.handleNewInit}
              onKeyPress={this.props.handleKeyPress}
            />
          </p>
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