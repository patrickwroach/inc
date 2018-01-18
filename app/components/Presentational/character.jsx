import React from 'react';
import { Button } from './button.jsx';
import { SingleTextModalContainer } from '../containers/SingleTextModalContainer.jsx';
import { Constants } from '../../other/Constants.js';

export class Character extends React.Component {
  render() {
    var charNameDisplay = null;
    if (this.props.id === 'new-round' && this.props.initPosition === 0) {
      charNameDisplay = (
        <div className="char-name">
          <h1>
            <Button id = "start-round-button" text={Constants.startRoundButtonString} onClick={this.props.handleStartRound} />
          </h1>
        </div>
      );
    } else {
      charNameDisplay = (
        <div className="char-name">
          <Button text="&#10006;" addClass="remove "  onClick={this.props.handleRemoveCharacter} />
          <h1>
            {this.props.name}
            <span className="edit-pen" onClick={this.props.toggleNameEdit}>{String.fromCharCode(9999)}</span>
          </h1>
        </div>
      );
    }
    
    return (
      <div className={`char-bar${this.props.hp <= 0 ? ' dead' : ' alive'}`}>
        {charNameDisplay}
        <div className="aliveDead button-container ">
          <Button onClick={this.props.toggleAliveDead} text={this.props.hp <= 0 ? 'revive' : ' kill'} />
        </div>

        <div className="hp-count">
          <div className="hp">
            <h2>{this.props.hp}/{this.props.hpMax}</h2>
          </div>
          <div className="hp-toggles">
            <Button onClick={() => this.props.handleAddHp(1)} text="+1"  />
            <Button onClick={() => this.props.handleAddHp(+this.props.inputHp)} text="+"  />
            <input
              onChange={this.props.handleInputHp}
              type="number"
              min="1"
              placeholder="5"
              onFocus={(e) => e.target.placeholder = ""}
              className="inputToggle"
            />
            <Button onClick={() => this.props.handleAddHp(-this.props.inputHp)} text="-"  />
            <Button onClick={() => this.props.handleAddHp(-1)} text="-1" />
          </div>
        </div>
        
        <SingleTextModalContainer
          isOpen = {this.props.isNameEditModalOpen}
          toggle = {this.props.toggleNameEdit}
          onSubmit = {this.props.handleSubmitName}
          labelText = {Constants.editNameLabelString}
          inputValue = {this.props.name}
          buttonText = {Constants.editNameButtonString}
        />
      </div>
    );
  }
}


