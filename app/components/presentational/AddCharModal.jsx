import React from 'react';
import { Button } from './button.jsx';
import { Constants } from '../../other/Constants.js';

export class AddCharModal extends React.Component {
  render() {
    var amountInput = null;
    if (this.props.amountVis) {
      amountInput = (
        <form id="Group-entries">
          <p id="amount-entry">
            How many?
              <input onChange={this.props.handleNewAmount}
              onKeyPress={this.props.handleKeyPress}
              type="number"
              min="2"
              placeholder="2"
            />
          </p>
        </form>
      );
    }

    var hpInput = null;
    if (this.props.hpVis) {
      hpInput = (
        <form id="NPC-entries">
          <p id="hp-entry">
            Hit Points
              <input onChange={this.props.handleNewHp}
              onKeyPress={this.props.handleKeyPress}
              type="number"
              placeholder="1"
            />
          </p>
        </form>
      );
    }
    return (
      <div id="addCharModal" className="modal">
        <div className="choice-container">
          <Button id="closer" text="&#10006;" onClick={this.props.toggleAddCharModal} />
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
          </form>
          {hpInput}
          {amountInput}
          <br />
          <Button addClass="submit" text="Add Character(s)" onClick={this.props.handleSubmit} />
        </div>
      </div>
    );
  }
}